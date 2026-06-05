import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { subscribe } from "@/lib/subscribers";
import { SITE } from "@/lib/seo";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Subscribe (handles duplicates gracefully)
    const sub = subscribe(email.toLowerCase().trim());

    if (sub.confirmed) {
      return NextResponse.json({
        message: "Você já está inscrito!",
        alreadySubscribed: true,
      });
    }

    // Send confirmation email via Resend
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json(
        { error: "Serviço de email não configurado. Tente novamente mais tarde." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const confirmUrl = `${SITE.url}/api/subscribe/confirm?token=${sub.confirmationToken}`;

    try {
      const { error } = await resend.emails.send({
        from: `Hernando.ia <newsletter@hernandoia.com>`,
        to: sub.email,
        subject: "Confirme sua inscrição — Hernando.ia",
        html: `
          <div style="max-width:600px;margin:0 auto;font-family:system-ui,sans-serif;background:#08081a;color:#e0e0e0;padding:40px 20px;border-radius:8px">
            <h1 style="color:#00e5ff;font-size:24px;margin-bottom:16px">HERNANDO<span style="color:#888">.IA</span></h1>
            <h2 style="color:#fff;font-size:20px;margin-bottom:24px">Confirme sua inscrição</h2>
            <p style="color:#aaa;font-size:15px;line-height:1.6;margin-bottom:24px">
              Você se inscreveu na newsletter da Hernando.ia — insights sobre IA, startups e engenharia direto no seu email.
              Clique no botão abaixo para confirmar:
            </p>
            <a href="${confirmUrl}" style="display:inline-block;background:#00e5ff;color:#08081a;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:0.05em">
              Confirmar Inscrição
            </a>
            <p style="color:#666;font-size:12px;margin-top:24px">
              Se você não se inscreveu, ignore este email.<br/>
              <a href="${SITE.url}/api/subscribe/unsubscribe?token=${sub.unsubscribeToken}" style="color:#ff2d55">Cancelar inscrição</a>
            </p>
          </div>
        `,
      });

      if (error) {
        console.error("Resend error:", JSON.stringify(error));
        // Check if domain is not verified
        const errMsg = typeof error === "object" && "message" in error
          ? String(error.message)
          : String(error);
        if (errMsg.includes("1010") || errMsg.includes("verify") || errMsg.includes("domain")) {
          return NextResponse.json(
            { error: "Sistema de email em configuração. Tente novamente em alguns minutos." },
            { status: 503 }
          );
        }
        return NextResponse.json(
          { error: "Erro ao enviar email de confirmação. Tente novamente." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: "Email de confirmação enviado! Verifique sua caixa de entrada.",
        requiresConfirmation: true,
      });
    } catch (sendError: unknown) {
      // Resend SDK throws on 403/domain-not-verified
      const errMsg = sendError instanceof Error ? sendError.message : String(sendError);
      console.error("Resend send error:", errMsg);
      if (errMsg.includes("1010") || errMsg.includes("verify") || errMsg.includes("domain")) {
        return NextResponse.json(
          { error: "Sistema de email em configuração. Tente novamente em alguns minutos." },
          { status: 503 }
        );
      }
      throw sendError; // re-throw for generic handler
    }
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json(
      { error: "Erro interno. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
