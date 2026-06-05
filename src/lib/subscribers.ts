import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import crypto from "crypto";

// ── Types ──────────────────────────────────────────────────────────

export interface Subscriber {
  email: string;
  confirmed: boolean;
  subscribedAt: string;
  confirmedAt?: string;
  confirmationToken: string;
  unsubscribeToken: string;
}

interface SubscriberStore {
  subscribers: Subscriber[];
  lastUpdated: string;
}

// ── Storage ────────────────────────────────────────────────────────

const DATA_DIR = join(process.cwd(), "data");
const SUBSCRIBERS_FILE = join(DATA_DIR, "subscribers.json");

function ensureDataDir(): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadStore(): SubscriberStore {
  ensureDataDir();
  if (!existsSync(SUBSCRIBERS_FILE)) {
    return { subscribers: [], lastUpdated: new Date().toISOString() };
  }
  try {
    const raw = readFileSync(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { subscribers: [], lastUpdated: new Date().toISOString() };
  }
}

function saveStore(store: SubscriberStore): void {
  ensureDataDir();
  store.lastUpdated = new Date().toISOString();
  writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(store, null, 2));
}

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// ── Public API ─────────────────────────────────────────────────────

export function subscribe(email: string): Subscriber {
  const store = loadStore();

  // Check if already subscribed
  const existing = store.subscribers.find((s) => s.email === email);
  if (existing) {
    return existing; // Already subscribed, don't create duplicate
  }

  const subscriber: Subscriber = {
    email,
    confirmed: false,
    subscribedAt: new Date().toISOString(),
    confirmationToken: generateToken(),
    unsubscribeToken: generateToken(),
  };

  store.subscribers.push(subscriber);
  saveStore(store);
  return subscriber;
}

export function confirmSubscription(token: string): Subscriber | null {
  const store = loadStore();
  const sub = store.subscribers.find((s) => s.confirmationToken === token);
  if (!sub) return null;

  sub.confirmed = true;
  sub.confirmedAt = new Date().toISOString();
  saveStore(store);
  return sub;
}

export function unsubscribe(token: string): Subscriber | null {
  const store = loadStore();
  const sub = store.subscribers.find((s) => s.unsubscribeToken === token);
  if (!sub) return null;

  store.subscribers = store.subscribers.filter((s) => s.unsubscribeToken !== token);
  saveStore(store);
  return sub;
}

export function getConfirmedSubscribers(): Subscriber[] {
  const store = loadStore();
  return store.subscribers.filter((s) => s.confirmed);
}

export function getAllSubscribers(): Subscriber[] {
  const store = loadStore();
  return store.subscribers;
}

export function getSubscriberCount(): { total: number; confirmed: number } {
  const store = loadStore();
  return {
    total: store.subscribers.length,
    confirmed: store.subscribers.filter((s) => s.confirmed).length,
  };
}
