import { NextRequest, NextResponse } from "next/server";
import { recordConsent } from "@/lib/subscribers";

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    if (action !== "advertising_accepted" && action !== "advertising_declined") {
      return NextResponse.json({ error: "Preferência inválida" }, { status: 400 });
    }

    await recordConsent({
      action,
      timestamp: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
      version: "advertising-v1",
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Não foi possível registrar a preferência" }, { status: 400 });
  }
}
