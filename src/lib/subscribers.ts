import { Redis } from "@upstash/redis";

// ── Types ──────────────────────────────────────────────────────────

export interface Subscriber {
  email: string;
  confirmed: boolean;
  subscribedAt: string;
  confirmedAt?: string;
  confirmationToken: string;
  unsubscribeToken: string;
}

// ── Redis client ──────────────────────────────────────────────────

const REDIS_URL = process.env.REDIS_URL;
let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (!REDIS_URL) return null;
  if (!redis) {
    // Parse token from redis://default:TOKEN@HOST:PORT
    const url = new URL(REDIS_URL);
    const token = url.password || url.username;
    redis = new Redis({
      url: `https://${url.hostname}`,
      token,
    });
  }
  return redis;
}

const SUBSCRIBERS_KEY = "subscribers:list";

// ── File-based fallback (when REDIS_URL is missing) ───────────────

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
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

async function loadStore(): Promise<Subscriber[]> {
  const r = getRedis();
  if (r) {
    try {
      const data = await r.get<Subscriber[]>(SUBSCRIBERS_KEY);
      return data || [];
    } catch (e) {
      console.error("Redis load error:", e);
      return [];
    }
  }
  return fileLoadStore();
}

async function saveStore(subscribers: Subscriber[]): Promise<void> {
  const r = getRedis();
  if (r) {
    await r.set(SUBSCRIBERS_KEY, subscribers);
  } else {
    fileSaveStore(subscribers);
  }
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
    confirmed: true,
    subscribedAt: new Date().toISOString(),
    confirmedAt: new Date().toISOString(),
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
