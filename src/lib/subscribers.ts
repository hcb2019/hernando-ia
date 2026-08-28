import Redis from "ioredis";

// ── Types ──────────────────────────────────────────────────────────

export interface Subscriber {
  email: string;
  confirmed: boolean;
  subscribedAt: string;
  confirmedAt?: string;
  confirmationToken: string;
  unsubscribeToken: string;
}

// ── Consent Record (LGPD Art. 8, §2) ──────────────────────────────

export interface ConsentRecord {
  email?: string;
  action: "subscribe" | "confirm" | "unsubscribe" | "advertising_accepted" | "advertising_declined";
  timestamp: string;
  ip: string;
  userAgent: string;
  version: string;
}

// ── Redis client (Redis Cloud via TCP) ─────────────────────────────

const REDIS_URL = process.env.REDIS_URL;
let redis: Redis | null = null;
let redisFailed = false;

function getRedis(): Redis | null {
  if (!REDIS_URL || redisFailed) return null;
  if (!redis) {
    try {
      redis = new Redis(REDIS_URL, {
        lazyConnect: true,
        maxRetriesPerRequest: 1,
        connectTimeout: 3000,
        commandTimeout: 3000,
        retryStrategy: () => null, // no retries
      });
    } catch (e) {
      console.error("Redis init error:", e);
      redisFailed = true;
      return null;
    }
  }
  return redis;
}

const SUBSCRIBERS_KEY = "subscribers:list";
const CONSENT_LOG_KEY = "consent:log";

// ── File-based fallback ────────────────────────────────────────────

import { readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from "fs";
import { join } from "path";

const DATA_DIR = process.env.VERCEL
  ? "/tmp"
  : join(process.cwd(), "data");
const SUBSCRIBERS_FILE = join(DATA_DIR, "subscribers.json");

function ensureDataDir(): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

function fileLoadStore(): Subscriber[] {
  ensureDataDir();
  if (!existsSync(SUBSCRIBERS_FILE)) return [];
  try {
    return JSON.parse(readFileSync(SUBSCRIBERS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function fileSaveStore(subscribers: Subscriber[]): void {
  ensureDataDir();
  writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

// ── Token generator ───────────────────────────────────────────────

function generateToken(): string {
  return Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
}

// ── Unified load/save ─────────────────────────────────────────────

export async function loadStore(): Promise<Subscriber[]> {
  const r = getRedis();
  if (r) {
    try {
      const raw = await r.get(SUBSCRIBERS_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
      return [];
    } catch (e) {
      console.error("Redis load error, falling back to file:", e);
      redisFailed = true;
    }
  }
  return fileLoadStore();
}

export async function saveStore(subscribers: Subscriber[]): Promise<void> {
  const r = getRedis();
  if (r) {
    try {
      await r.set(SUBSCRIBERS_KEY, JSON.stringify(subscribers));
      return;
    } catch (e) {
      console.error("Redis save error, falling back to file:", e);
      redisFailed = true;
    }
  }
  fileSaveStore(subscribers);
}

// ── Consent Log (LGPD Art. 8, §2) ─────────────────────────────────

const CONSENT_LOG_FILE = join(DATA_DIR, "consent-log.jsonl");

export async function recordConsent(record: ConsentRecord): Promise<void> {
  const r = getRedis();
  if (r) {
    try {
      await r.lpush(CONSENT_LOG_KEY, JSON.stringify(record));
      return;
    } catch (e) {
      console.error("Consent log error:", e);
    }
  }
  // File-based fallback
  ensureDataDir();
  appendFileSync(CONSENT_LOG_FILE, JSON.stringify(record) + "\n");
}

// ── Public API ────────────────────────────────────────────────────

export async function subscribe(
  email: string
): Promise<{ subscriber: Subscriber; isNew: boolean }> {
  const subscribers = await loadStore();

  const existing = subscribers.find((s) => s.email === email);
  if (existing) {
    if (!existing.confirmed) {
      existing.confirmed = true;
      existing.confirmedAt = new Date().toISOString();
      await saveStore(subscribers);
    }
    return { subscriber: existing, isNew: false };
  }

  const subscriber: Subscriber = {
    email,
    confirmed: false,  // Double opt-in: só confirma após clicar link no email
    subscribedAt: new Date().toISOString(),
    confirmedAt: undefined,
    confirmationToken: generateToken(),
    unsubscribeToken: generateToken(),
  };

  subscribers.push(subscriber);
  await saveStore(subscribers);
  return { subscriber, isNew: true };
}

export async function confirmSubscription(
  token: string
): Promise<Subscriber | null> {
  const subscribers = await loadStore();
  const sub = subscribers.find((s) => s.confirmationToken === token);
  if (!sub) return null;
  sub.confirmed = true;
  sub.confirmedAt = new Date().toISOString();
  await saveStore(subscribers);
  return sub;
}

export async function unsubscribe(
  token: string
): Promise<Subscriber | null> {
  const subscribers = await loadStore();
  const idx = subscribers.findIndex((s) => s.unsubscribeToken === token);
  if (idx === -1) return null;
  const [removed] = subscribers.splice(idx, 1);
  await saveStore(subscribers);
  return removed;
}

export async function getConfirmedSubscribers(): Promise<Subscriber[]> {
  const subscribers = await loadStore();
  return subscribers.filter((s) => s.confirmed);
}

export async function getAllSubscribers(): Promise<Subscriber[]> {
  return loadStore();
}

export async function getSubscriberCount(): Promise<{
  total: number;
  confirmed: number;
}> {
  const subscribers = await loadStore();
  return { total: subscribers.length, confirmed: subscribers.filter((s) => s.confirmed).length };
}
