import { NextRequest, NextResponse } from "next/server";
import { getAllSubscribers, loadStore, saveStore, type Subscriber } from "@/lib/subscribers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, action, newEmail } = body;

    if (!email || !action) {
      return NextResponse.json({ error: "Email e ação são obrigatórios" }, { status: 400 });
    }

    const validActions = ["access", "delete", "portability", "correct"];
    if (!validActions.includes(action)) {
      return NextResponse.json({ error: "Ação inválida. Válidas: access, delete, portability, correct" }, { status: 400 });
    }

    const subscribers = await loadStore();
    const normalizedEmail = email.toLowerCase().trim();
    const idx = subscribers.findIndex((s: Subscriber) => s.email === normalizedEmail);

    if (idx === -1) {
      return NextResponse.json({
        message: "Nenhum dado encontrado para este email. Se existia, já foi removido.",
      });
    }

    const sub = subscribers[idx];

    switch (action) {
      case "access":
        return NextResponse.json({
          email: sub.email,
          subscribedAt: sub.subscribedAt,
          confirmedAt: sub.confirmedAt || null,
          confirmed: sub.confirmed,
        });

      case "delete":
        subscribers.splice(idx, 1);
        await saveStore(subscribers);
        return NextResponse.json({ message: "Dados removidos com sucesso. Você não receberá mais nossos emails." });

      case "portability":
        return NextResponse.json({
          email: sub.email,
          subscribedAt: sub.subscribedAt,
          confirmed: sub.confirmed,
          confirmedAt: sub.confirmedAt || null,
        });

      case "correct":
        if (!newEmail || typeof newEmail !== "string") {
          return NextResponse.json({ error: "newEmail é obrigatório para correção" }, { status: 400 });
        }
        sub.email = newEmail.toLowerCase().trim();
        await saveStore(subscribers);
        return NextResponse.json({ message: "Email atualizado com sucesso." });

      default:
        return NextResponse.json({ error: "Ação não implementada" }, { status: 400 });
    }
  } catch (err) {
    console.error("DSAR error:", err);
    return NextResponse.json(
      { error: `Erro: ${err instanceof Error ? err.message : "desconhecido"}` },
      { status: 500 }
    );
  }
}
