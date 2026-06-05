"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Email inválido. Tente novamente.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Inscrição realizada!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Erro ao inscrever. Tente novamente.");
      }
    } catch {
      setStatus("error");
      setMessage("Erro de conexão. Tente novamente mais tarde.");
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          type="email"
          placeholder="SEU@EMAIL.COM"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error" || status === "success") setStatus("idle");
          }}
          disabled={status === "loading"}
          className="flex-1 px-4 py-4 bg-transparent border-b-2 border-[--border] text-[--foreground] placeholder:text-[--muted] text-sm font-bold uppercase tracking-tighter focus:outline-none focus:border-[--accent] transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-8 py-4 bg-[--accent] text-[--accent-foreground] font-bold uppercase tracking-tighter text-sm hover:scale-105 active:scale-95 transition-all whitespace-nowrap disabled:opacity-50 disabled:hover:scale-100"
        >
          {status === "loading" ? "ENVIANDO..." : "ASSINAR"}
        </button>
      </form>

      {/* Status messages */}
      {message && (
        <p
          className={`text-sm text-center mt-3 ${
            status === "success"
              ? "text-green-400"
              : status === "error"
                ? "text-red-400"
                : "text-[--muted]"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
