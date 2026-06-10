import { NextResponse } from "next/server";

export async function GET() {
  // Show all KV/Redis/Storage-related env vars
  const wanted = [
    "KV_URL", "KV_REST_API_URL", "KV_REST_API_TOKEN", "KV_REST_API_READ_ONLY_TOKEN",
    "REDIS_URL", "REDIS_REST_URL", "REDIS_REST_TOKEN", "REDIS_REST_READ_ONLY_TOKEN",
    "STORAGE_URL", "STORAGE_REST_API_URL", "STORAGE_REST_API_TOKEN",
    "RESEND_API_KEY",
  ];

  const vars: Record<string, string> = {};
  for (const k of wanted) {
    const v = process.env[k];
    vars[k] = v ? `${v.substring(0, 18)}...` : "MISSING";
  }

  return NextResponse.json({
    vars,
    vercelEnv: process.env.VERCEL_ENV || "unknown",
    region: process.env.VERCEL_REGION || "unknown",
  });
}
