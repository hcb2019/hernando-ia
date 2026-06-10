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

// ── KV key ─────────────────────────────────────────────────────────

const SUBSCRIBERS_KEY = "subscribers:list";

function generateToken(): string {
  return Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
}

// ── Public API ─────────────────────────────────────────────────────

async function loadStore(): Promise<Subscriber[]> {
  try {
    const data = await kv.get<Subscriber[]>(SUBSCRIBERS_KEY);
    return data || [];
  } catch (e) {
    console.error("KV load error:", e);
    return [];
  }
}

async function saveStore(subscribers: Subscriber[]): Promise<void> {
  await kv.set(SUBSCRIBERS_KEY, subscribers);
}

export async function subscribe(
  email: string
): Promise<{ subscriber: Subscriber; isNew: boolean }> {
  const subscribers = await loadStore();

  // Check if already subscribed
  const existing = subscribers.find((s) => s.email === email);
  if (existing) {
    // If unconfirmed, auto-confirm now
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
    confirmationToken: generateToken(), // kept for legacy confirm links
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
