"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/#filosofia", label: "FILOSOFIA" },
  { href: "/#projetos", label: "PROJETOS" },
  { href: "/blog", label: "BLOG" },
  { href: "/newsletter", label: "NEWSLETTER" },
  { href: "/produtos/claude-code-skills", label: "SKILLS" },
  { href: "/produtos/hermes-agent", label: "AGENTE" },
  { href: "/servicos", label: "SERVIÇOS" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* ── Navbar bar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div
          className="mx-auto px-4 sm:px-6 h-16 flex items-center justify-between max-w-[95vw]
          bg-[--background]/70 backdrop-blur-xl border-b border-white/10"
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={close}
            className="flex items-center gap-2.5 text-lg font-bold uppercase tracking-tighter shrink-0"
          >
            <img
              src="/logo.png"
              srcSet="/logo.png 1x, /logo@2x.png 2x"
              alt="Hernando.ia"
              className="w-7 h-7 md:w-8 md:h-8"
            />
            <span className="hidden md:inline">
              <span className="text-[--accent]">HERNANDO</span>
              <span className="text-[--muted-foreground]">.IA</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium uppercase tracking-[0.1em] text-[--muted-foreground] hover:text-[--foreground] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger button — mobile only */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            <div className="w-5 h-3.5 relative flex flex-col justify-between">
              <span
                className={`block h-[2px] w-full bg-white rounded-full transition-all duration-300 origin-center ${
                  open ? "rotate-45 translate-y-[5px]" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-full bg-white rounded-full transition-all duration-300 ${
                  open ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-full bg-white rounded-full transition-all duration-300 origin-center ${
                  open ? "-rotate-45 -translate-y-[5px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* ── Mobile menu overlay ── */}
      {/* Overlay backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-400 md:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      />

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-[min(85vw,380px)] bg-[--background] border-l border-white/10 flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel header */}
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <Link
            href="/"
            onClick={close}
            className="flex items-center gap-2.5 text-lg font-bold uppercase tracking-tighter"
          >
            <img
              src="/logo.png"
              srcSet="/logo.png 1x, /logo@2x.png 2x"
              alt="Hernando.ia"
              className="w-7 h-7"
            />
            <span>
              <span className="text-[--accent]">HERNANDO</span>
              <span className="text-[--muted-foreground]">.IA</span>
            </span>
          </Link>
        </div>

        {/* Navigation links */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="flex flex-col">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="group flex items-center justify-between py-4 border-b border-white/[0.06] text-base font-semibold uppercase tracking-[0.08em] text-white/70 hover:text-white transition-colors"
                style={{
                  transitionDelay: open ? `${i * 50}ms` : "0ms",
                  transform: open ? "translateX(0)" : "translateX(24px)",
                  opacity: open ? 1 : 0,
                  transition: `all 0.35s ease ${open ? i * 0.05 : 0}s`,
                }}
              >
                <span>{link.label}</span>
                <span className="text-white/15 text-sm group-hover:text-[--accent] transition-colors">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Panel footer */}
        <div className="px-6 py-4 border-t border-white/10 shrink-0">
          <a
            href="https://instagram.com/hernando.ia"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="text-xs text-white/30 hover:text-[--accent] transition-colors"
          >
            @hernando.ia
          </a>
        </div>
      </div>
    </>
  );
}
