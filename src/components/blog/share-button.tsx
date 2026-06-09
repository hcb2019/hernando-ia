"use client";

import { useState } from "react";

interface ShareButtonProps {
  label?: string;
}

export default function ShareButton({ label = "Copiar link" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback silently
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-white/[0.05] text-sm text-white/60 hover:text-white hover:border-white/30 transition-colors"
      aria-label="Copiar link do artigo"
    >
      {copied ? (
        <>
          <span className="text-green-400">✓</span>
          <span>Copiado!</span>
        </>
      ) : (
        <>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
