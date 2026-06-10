import { NextResponse } from "next/server";

export async function GET() {
  // Scan ALL env vars for anything KV/Redis/Upstash related
  const matches: Record<string, string> = {};
  const allKeys = Object.keys(process.env);

  for (const k of allKeys) {
    const upper = k.toUpperCase();
    if (
      upper.includes("KV") ||
      upper.includes("REDIS") ||
      upper.includes("UPSTASH") ||
      upper.includes("STORAGE")
    ) {
      const v = process.env[k];
      matches[k] = v ? `${v.substring(0, 15)}...` : "EMPTY";
    }
  }

  return NextResponse.json({
    matched: matches,
    totalEnvVars: allKeys.length,
    vercelEnv: process.env.VERCEL_ENV || "unknown",
    region: process.env.VERCEL_REGION || "unknown",
  });
}
