import { NextResponse } from "next/server";

export async function GET() {
  const vars: Record<string, string> = {};
  const wanted = [
    "KV_URL",
    "KV_REST_API_URL",
    "KV_REST_API_TOKEN",
    "KV_REST_API_READ_ONLY_TOKEN",
    "STORAGE_URL",
    "STORAGE_REST_API_URL",
    "STORAGE_REST_API_TOKEN",
    "RESEND_API_KEY",
  ];
  for (const k of wanted) {
    const v = process.env[k];
    vars[k] = v ? `${v.substring(0, 12)}...` : "MISSING";
  }

  return NextResponse.json({
    env: vars,
    vercelEnv: process.env.VERCEL_ENV || "unknown",
    region: process.env.VERCEL_REGION || "unknown",
  });
}
