import { kv } from "@vercel/kv";

// ── Types ──────────────────────────────────────────────────────────

export interface Subscriber {
  email: string;
  confirmed: boolean;
  subscribedAt: string;
  confirmedAt?: string;
  confirmationToken: string;
  unsubscribeToken: string;
}

// ── Storage backend detection ──────────────────────────────────────

const HAS_KV = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const KV_KEY = "subscribers:list";

// ── File-based fallback (wiped on redeploy, but site works) ────────

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

// ── Token generator ────────────────────────────────────────────────

function generateToken(): string {
  return Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
}

// ── Unified API ────────────────────────────────────────────────────

async function kvLoadStore(): Promise<Subscriber[]> {
  try {
    return (await kv.get<Subscriber[]>(KV_KEY)) || [];
  } catch (e) {
    console.error("KV load error, falling back to empty:", e);
    return [];
  }
}

async function kvSaveStore(subscribers: Subscriber[]): Promise<void> {
  await kv.set(KV_KEY, subscribers);
}

async function loadStore(): Promise<Subscriber[]> {
  if (HAS_KV) return kvLoadStore();
  return fileLoadStore();
}

async function saveStore(subscribers: Subscriber[]): Promise<void> {
  if (HAS_KV) {
    await kvSaveStore(subscribers);
  } else {
    fileSaveStore(subscribers);
  }
}

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
  return {
    total: subscribers.length,
    confirmed: subscribers.filter((s) => s.confirmed).length,
  };
}
