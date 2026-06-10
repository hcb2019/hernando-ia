import { NextRequest, NextResponse } from "next/server";
import { subscribe } from "@/lib/subscribers";
import { SITE } from "@/lib/seo";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Subscribe (handles duplicates gracefully, auto-confirms)
    const { subscriber: sub, isNew } = subscribe(email.toLowerCase().trim());

    if (!isNew) {
      return NextResponse.json({
        message: "Você já está inscrito! Primeira edição quarta-feira 10h. 🚀",
        alreadySubscribed: true,
      });
    }

    // Send welcome email via Resend (using fetch directly, not SDK)
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Serviço de email não configurado." },
        { status: 500 }
      );
    }

    const unsubscribeUrl = `${SITE.url}/api/subscribe/unsubscribe?token=${sub.unsubscribeToken}`;
    const htmlBody = `
      <div style="max-width:600px;margin:0 auto;font-family:system-ui,sans-serif;background:#08081a;color:#e0e0e0;padding:40px 20px;border-radius:8px">
        <h1 style="color:#00e5ff;font-size:24px;margin-bottom:16px">HERNANDO<span style="color:#888">.IA</span></h1>
        <h2 style="color:#fff;font-size:20px;margin-bottom:24px">🚀 Inscrição confirmada!</h2>
        <p style="color:#aaa;font-size:15px;line-height:1.6;margin-bottom:24px">
          Você agora faz parte da newsletter da <strong>Hernando.ia</strong> — IA aplicada, agentes autônomos e engenharia de software, sem hype.
        </p>
        <div style="background:#0d0d2b;border-left:3px solid #00e5ff;padding:16px 20px;margin-bottom:24px;border-radius:0 4px 4px 0">
          <p style="color:#e0e0e0;font-size:14px;margin:0;line-height:1.5">
            📬 <strong>Toda quarta-feira, 10h</strong> — uma edição nova na sua caixa de entrada.<br/>
            📝 Enquanto isso, tem <a href="${SITE.url}/blog" style="color:#00e5ff">conteúdo novo todo dia no blog</a>.
          </p>
        </div>
        <p style="color:#666;font-size:12px;margin-top:24px">
          Não quer mais receber? <a href="${unsubscribeUrl}" style="color:#ff2d55">Cancelar inscrição</a>
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
        subject: "🚀 Bem-vindo(a) à Hernando.ia!",
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
      message: "Inscrição confirmada! Primeira edição quarta-feira 10h. 🚀",
      subscriberCount: sub ? 1 : 0, // will be set by form refresh
    });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json(
      { error: `Erro: ${err instanceof Error ? err.message : "desconhecido"}` },
      { status: 500 }
    );
  }
}
