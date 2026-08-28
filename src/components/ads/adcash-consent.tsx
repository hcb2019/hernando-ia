"use client";

import { useEffect, useSyncExternalStore } from "react";

const CONSENT_KEY = "hernandoia-advertising-consent-v1";
const ZONE_ID = "yk8y5vn9qo";
type ConsentChoice = "accepted" | "declined" | null;

type AdcashLibrary = {
  runAutoTag: (options: { zoneId: string }) => void;
};

declare global {
  interface Window {
    aclib?: AdcashLibrary;
  }
}

function runAutoTag() {
  window.aclib?.runAutoTag({ zoneId: ZONE_ID });
}

function loadAdcash() {
  if (window.aclib) {
    runAutoTag();
    return;
  }

  const existing = document.getElementById("aclib") as HTMLScriptElement | null;
  if (existing) {
    existing.addEventListener("load", runAutoTag, { once: true });
    return;
  }

  const script = document.createElement("script");
  script.id = "aclib";
  script.src = "https://acscdn.com/script/aclib.js";
  script.async = true;
  script.addEventListener("load", runAutoTag, { once: true });
  document.head.appendChild(script);
}

function getConsent(): ConsentChoice {
  const saved = localStorage.getItem(CONSENT_KEY);
  return saved === "accepted" || saved === "declined" ? saved : null;
}

function subscribeToConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("advertising-consent-updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("advertising-consent-updated", callback);
  };
}

function persistConsent(choice: Exclude<ConsentChoice, null>) {
  localStorage.setItem(CONSENT_KEY, choice);
  window.dispatchEvent(new Event("advertising-consent-updated"));
  void fetch("/api/consent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: `advertising_${choice}` }),
    keepalive: true,
  });
}

export default function AdcashConsent() {
  const choice = useSyncExternalStore(subscribeToConsent, getConsent, () => null);

  useEffect(() => {
    if (choice === "accepted") loadAdcash();
  }, [choice]);

  function accept() {
    persistConsent("accepted");
  }

  function decline() {
    persistConsent("declined");
  }

  function revoke() {
    persistConsent("declined");
    window.location.reload();
  }

  if (choice) {
    return (
      <button
        type="button"
        onClick={revoke}
        className="fixed bottom-3 left-3 z-[60] border border-border bg-background/95 px-3 py-2 text-xs text-white/70 shadow-lg backdrop-blur hover:text-white"
      >
        Gerenciar publicidade
      </button>
    );
  }

  return (
    <aside
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur sm:p-5"
      aria-label="Preferências de publicidade"
    >
      <p className="text-sm font-medium text-white">Publicidade e privacidade</p>
      <p className="mt-2 text-xs leading-relaxed text-white/65">
        Com sua autorização, usamos a Adcash para exibir publicidade e medir sua entrega.
        Você pode continuar sem publicidade ou mudar essa escolha quando quiser. Saiba mais na{" "}
        <a href="/politica-de-privacidade" className="text-accent underline underline-offset-2">
          Política de Privacidade
        </a>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={decline}
          className="border border-border px-4 py-2 text-xs font-medium text-white/80 hover:border-white/40 hover:text-white"
        >
          Continuar sem publicidade
        </button>
        <button
          type="button"
          onClick={accept}
          className="bg-accent px-4 py-2 text-xs font-semibold text-black hover:brightness-110"
        >
          Aceitar publicidade
        </button>
      </div>
    </aside>
  );
}
