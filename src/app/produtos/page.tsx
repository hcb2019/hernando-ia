import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "Produtos Digitais — Ferramentas de IA para Produtividade e Performance | Hernando.ia",
  description:
    "Conheça os produtos Hernando.ia: skills para Claude Code, agente de IA Hermes para empresas, e ArenaBite — nutrição tática com IA para atletas.",
  openGraph: {
    title: "Produtos Hernando.ia — IA que Trabalha pra Você",
    description:
      "Skills, agentes de IA e apps de performance. Ferramentas construídas com engenharia de elite, entregues como produto.",
  },
};

interface Product {
  href: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  price: string;
  accent: string;
  badge?: string;
}

const products: Product[] = [
  {
    href: "/produtos/claude-code-skills",
    icon: "⚡",
    title: "Claude Code Skills",
    tagline: "Transforme seu agente em um dev sênior",
    description:
      "20 skills profissionais que turbinam seu Claude Code com debugging sistemático, TDD, análise de arquitetura, PRDs automáticos e mais.",
    price: "GRÁTIS · Open Source",
    accent: "cyan",
    badge: "MAIS BAIXADO",
  },
  {
    href: "/produtos/hermes-agent",
    icon: "🤖",
    title: "Hermes Agent",
    tagline: "Um funcionário de IA que nunca dorme",
    description:
      "Agente de IA que atende WhatsApp e Instagram automaticamente, cria sites, analisa mercado e integra com seus sistemas. Para empresas que querem escalar sem contratar.",
    price: "Sob consulta",
    accent: "emerald",
    badge: "SERVIÇO GERENCIADO",
  },
  {
    href: "/produtos/arenabite",
    icon: "🥗",
    title: "ArenaBite",
    tagline: "Nutrição tática com IA para atletas",
    description:
      "Scanner de refeição por foto em 3 segundos + timeline preditiva do que comer e quando. Para Beach Tennis, Futevôlei, CrossFit e Corrida.",
    price: "Grátis · PRO R$19,90/mês",
    accent: "lime",
    badge: "NOVO",
  },
];

// ── Accent color map ────────────────────────────────────────────────────

const accentStyles: Record<string, { border: string; bg: string; text: string; badge: string; glow: string }> = {
  cyan: {
    border: "border-cyan-900/50",
    bg: "bg-cyan-950/10",
    text: "text-cyan-400",
    badge: "bg-cyan-400 text-black",
    glow: "shadow-[0_0_30px_-10px_rgba(6,182,212,0.15)]",
  },
  emerald: {
    border: "border-emerald-900/50",
    bg: "bg-emerald-950/10",
    text: "text-emerald-400",
    badge: "bg-emerald-400 text-black",
    glow: "shadow-[0_0_30px_-10px_rgba(52,211,153,0.15)]",
  },
  lime: {
    border: "border-lime-900/50",
    bg: "bg-lime-950/10",
    text: "text-lime-400",
    badge: "bg-lime-400 text-black",
    glow: "shadow-[0_0_30px_-10px_rgba(163,230,53,0.15)]",
  },
};

export default function ProdutosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-zinc-100">
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-950 text-sm text-zinc-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-[--accent] animate-pulse" />
            Produtos Digitais
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Ferramentas de IA que{" "}
            <span className="text-[#DFE104]">trabalham</span> pra você
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Skills, agentes e apps. Cada produto resolve um problema real —
            com engenharia de elite, entregue como produto digital.
          </p>
        </section>

        {/* Products Grid */}
        <section className="pb-32 px-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => {
              const s = accentStyles[product.accent];
              return (
                <Link
                  key={product.href}
                  href={product.href}
                  className={`group relative p-8 rounded-2xl border ${s.border} ${s.bg} hover:border-zinc-700 transition-all duration-300 ${s.glow}`}
                >
                  {product.badge && (
                    <span
                      className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${s.badge}`}
                    >
                      {product.badge}
                    </span>
                  )}
                  <div className="text-3xl mb-4">{product.icon}</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                    {product.title}
                  </h3>
                  <p className={`text-sm font-medium mb-3 ${s.text}`}>
                    {product.tagline}
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <div className="pt-4 border-t border-zinc-800">
                    <span className="text-xs text-zinc-500 font-medium">
                      {product.price}
                    </span>
                    <span className={`ml-2 text-xs ${s.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                      Ver detalhes →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="pb-32 px-6 text-center">
          <div className="max-w-xl mx-auto p-8 rounded-2xl border border-zinc-900 bg-zinc-950">
            <h2 className="text-xl font-bold mb-2">
              Não encontrou o que precisa?
            </h2>
            <p className="text-zinc-400 text-sm mb-6">
              Todos os produtos podem ser adaptados pro seu contexto.
              Me chama que a gente conversa.
            </p>
            <a
              href="https://wa.me/55219920032747"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#DFE104] text-black font-semibold hover:bg-[#c9cc00] transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
              Falar no WhatsApp
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
