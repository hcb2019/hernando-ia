import { NextResponse } from "next/server";

export async function GET() {
  const hasKey = !!process.env.RESEND_API_KEY;
  const keyPreview = process.env.RESEND_API_KEY
    ? `${process.env.RESEND_API_KEY.substring(0, 12)}...`
    : "NOT SET";

  return NextResponse.json({
    configured: hasKey,
    keyPrefix: keyPreview,
    env: process.env.NODE_ENV || "unknown",
  });
}
