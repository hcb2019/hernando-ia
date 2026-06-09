"use client";

import Link from "next/link";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/#filosofia", label: "FILOSOFIA" },
  { href: "/#projetos", label: "PROJETOS" },
  { href: "/blog", label: "BLOG" },
  { href: "/newsletter", label: "NEWSLETTER" },
  { href: "/produtos/claude-code-skills", label: "SKILLS" },
  { href: "/servicos", label: "SERVIÇOS" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto px-6 h-16 flex items-center justify-between max-w-[95vw]
        bg-[--background]/70 backdrop-blur-xl border-b border-white/10">
        <Link
          href="/"
          className="text-lg font-bold uppercase tracking-tighter"
        >
          <span className="text-[--accent]">HERNANDO</span>
          <span className="text-[--muted-foreground]">.IA</span>
        </Link>
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
      </div>
    </nav>
  );
}
