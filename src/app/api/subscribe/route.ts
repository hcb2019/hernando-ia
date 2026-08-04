import { NextRequest, NextResponse } from "next/server";
import { subscribe, recordConsent, type ConsentRecord } from "@/lib/subscribers";
import { SITE } from "@/lib/seo";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Subscribe (handles duplicates gracefully)
    const { subscriber: sub, isNew } = await subscribe(email.toLowerCase().trim());

    // Record consent (LGPD Art. 8, §2)
    if (isNew) {
      const consent: ConsentRecord = {
        email: email.toLowerCase().trim(),
        action: "subscribe",
        timestamp: new Date().toISOString(),
        ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
        version: "1.0",
      };
      await recordConsent(consent);
    }

    if (!isNew) {
      return NextResponse.json({
        message: "Você já está inscrito! Primeira edição quarta-feira 10h.",
        alreadySubscribed: true,
      });
    }

    // Send CONFIRMATION email via Resend (double opt-in — LGPD Art. 8, §2)
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Serviço de email não configurado." },
        { status: 500 }
      );
    }

    const confirmUrl = `${SITE.url}/api/subscribe/confirm?token=${sub.confirmationToken}`;
    const htmlBody = `
      <div style="max-width:600px;margin:0 auto;font-family:system-ui,sans-serif;background:#08081a;color:#e0e0e0;padding:40px 20px;border-radius:8px">
        <h1 style="color:#00e5ff;font-size:24px;margin-bottom:16px">HERNANDO<span style="color:#888">.IA</span></h1>
        <h2 style="color:#fff;font-size:20px;margin-bottom:24px">Confirme sua inscrição</h2>
        <p style="color:#aaa;font-size:15px;line-height:1.6;margin-bottom:24px">
          Clique no botão abaixo para confirmar sua inscrição na newsletter da <strong>Hernando.ia</strong> — IA, engenharia e startups, toda quarta-feira 10h.
        </p>
        <a href="${confirmUrl}" style="display:inline-block;background:#00e5ff;color:#08081a;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:15px">
          CONFIRMAR INSCRIÇÃO
        </a>
        <p style="color:#666;font-size:12px;margin-top:24px">
          Se você não se inscreveu, ignore este email.
        </p>
      </div>`;

    const resendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hernando.ia <newsletter@hernandoia.com>",
        to: sub.email,
        subject: "Bem-vindo(a) a Hernando.ia!",
        html: htmlBody,
      }),
    });

    const resendData = await resendResp.json();

    if (!resendResp.ok) {
      console.error("Resend error:", JSON.stringify(resendData));
      const msg = resendData?.message || "Erro ao enviar email";
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    return NextResponse.json({
      message: "Email de confirmação enviado! Verifique sua caixa de entrada.",
    });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json(
      { error: `Erro: ${err instanceof Error ? err.message : "desconhecido"}` },
      { status: 500 }
    );
  }
}
