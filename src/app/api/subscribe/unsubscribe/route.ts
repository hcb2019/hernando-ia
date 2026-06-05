import { NextRequest, NextResponse } from "next/server";
import { unsubscribe } from "@/lib/subscribers";
import { SITE } from "@/lib/seo";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${SITE.url}/blog?unsubscribed=error`);
  }

  const sub = unsubscribe(token);
  if (sub) {
    return NextResponse.redirect(`${SITE.url}/blog?unsubscribed=success`);
  }

  return NextResponse.redirect(`${SITE.url}/blog?unsubscribed=error`);
}
