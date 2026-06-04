"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { LANGUAGES, type Lang } from "@/lib/translations";

interface LanguageToggleProps {
  currentLang: Lang;
}

export default function LanguageToggle({ currentLang }: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function switchLang(lang: Lang) {
    const params = new URLSearchParams(searchParams.toString());
    if (lang === "pt") {
      params.delete("lang"); // PT is default, no need for ?lang=pt
    } else {
      params.set("lang", lang);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="flex items-center gap-1">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLang(lang.code)}
          className={`text-xs px-2 py-1 rounded font-medium transition-colors ${
            currentLang === lang.code
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
