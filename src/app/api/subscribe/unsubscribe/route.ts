import { NextRequest, NextResponse } from "next/server";
import { unsubscribe, recordConsent } from "@/lib/subscribers";
import { SITE } from "@/lib/seo";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${SITE.url}/blog?unsubscribed=error`);
  }

  const sub = await unsubscribe(token);
  if (sub) {
    await recordConsent({
      email: sub.email,
      action: "unsubscribe",
      timestamp: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
      version: "1.0",
    });
    return NextResponse.redirect(`${SITE.url}/blog?unsubscribed=success`);
  }

  return NextResponse.redirect(`${SITE.url}/blog?unsubscribed=error`);
}
