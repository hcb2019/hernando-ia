import { NextRequest, NextResponse } from "next/server";
import { getConfirmedSubscribers } from "@/lib/subscribers";

/**
 * GET /api/subscribers/export
 * 
 * Retorna lista de assinantes confirmados para consumo programático.
 * Protegido por token compartilhado (NEWSLETTER_EXPORT_TOKEN).
 * 
 * Uso: curl -H "Authorization: Bearer TOKEN" https://hernandoia.com/api/subscribers/export
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const expectedToken = process.env.NEWSLETTER_EXPORT_TOKEN;

  if (!expectedToken) {
    return NextResponse.json(
      { error: "Export token not configured on server" },
      { status: 500 }
    );
  }

  if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const subscribers = await getConfirmedSubscribers();

    // Retorna apenas dados necessários (não expõe tokens internos)
    const safe = subscribers.map((s) => ({
      email: s.email,
      subscribedAt: s.subscribedAt,
      confirmedAt: s.confirmedAt,
      unsubscribeToken: s.unsubscribeToken,
    }));

    return NextResponse.json({
      count: safe.length,
      subscribers: safe,
      exportedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Export error:", err);
    return NextResponse.json(
      { error: "Failed to export subscribers" },
      { status: 500 }
    );
  }
}
