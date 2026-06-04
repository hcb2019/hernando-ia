"use client";

import { useState } from "react";

const languages = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
] as const;

type Lang = (typeof languages)[number]["code"];

export default function LanguageToggle() {
  const [active, setActive] = useState<Lang>("pt");

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setActive(lang.code)}
          className={`text-xs px-2 py-1 rounded font-medium transition-colors ${
            active === lang.code
              ? "bg-[--accent] text-[#09090B]"
              : "text-[--muted] hover:text-[--foreground]"
          }`}
          aria-label={`Idioma: ${lang.label}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
