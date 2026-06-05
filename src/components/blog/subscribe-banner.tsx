"use client";

import { useSearchParams } from "next/navigation";

/**
 * Shows a success/error banner when redirected from subscription confirmation.
 * Reads ?subscribed=success|error and ?unsubscribed=success|error from URL.
 */
export default function SubscribeBanner() {
  const searchParams = useSearchParams();
  const subscribed = searchParams.get("subscribed");
  const unsubscribed = searchParams.get("unsubscribed");

  if (subscribed === "success") {
    return (
      <div className="mb-8 p-4 rounded-lg border border-green-500/30 bg-green-500/10 text-green-400 text-center">
        ✅ Inscrição confirmada! Você receberá a próxima newsletter no seu email.
      </div>
    );
  }

  if (subscribed === "error") {
    return (
      <div className="mb-8 p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-center">
        ❌ Link de confirmação inválido ou expirado. Tente se inscrever novamente.
      </div>
    );
  }

  if (unsubscribed === "success") {
    return (
      <div className="mb-8 p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-center">
        Sua inscrição foi cancelada. Sentiremos sua falta!
      </div>
    );
  }

  return null;
}
