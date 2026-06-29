import { NextRequest, NextResponse } from "next/server";
import { confirmSubscription, unsubscribe, recordConsent, type ConsentRecord } from "@/lib/subscribers";
import { SITE } from "@/lib/seo";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${SITE.url}/blog?subscribed=error`);
  }

  // Check if this is a confirm or unsubscribe request
  const path = request.nextUrl.pathname;

  if (path.includes("unsubscribe")) {
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

  // Confirm subscription
  const sub = await confirmSubscription(token);
  if (sub) {
    await recordConsent({
      email: sub.email,
      action: "confirm",
      timestamp: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
      version: "1.0",
    });
    return NextResponse.redirect(`${SITE.url}/blog?subscribed=success`);
  }

  return NextResponse.redirect(`${SITE.url}/blog?subscribed=error`);
}
