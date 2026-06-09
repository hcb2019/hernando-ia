import { getSubscriberCount } from "@/lib/subscribers";
import { generatePageMeta } from "@/lib/seo";
import { SITE } from "@/lib/seo";
import NewsletterForm from "@/components/blog/newsletter-form";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";

// ── SSR: always fetch fresh subscriber count ────────────────────────
export const dynamic = "force-dynamic";

// ── SEO Metadata ────────────────────────────────────────────────────
export const metadata: Metadata = generatePageMeta({
  title: "Newsletter | Hernando.ia",
  description:
    "IA aplicada, agentes autônomos e o futuro do desenvolvimento de software. Toda quarta-feira, 10h. Assine a newsletter do Hernando.ia e receba curadoria semanal sem hype.",
  path: "/newsletter",
  ogImage: "/api/og?title=Newsletter+Hernando.ia&subtitle=IA+sem+hype%2C+toda+quarta",
});

// ── Helpers ─────────────────────────────────────────────────────────

function formatCount(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return String(n);
}

// ── JSON-LD Organization Schema ─────────────────────────────────────
const organizationJSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Newsletter Hernando.ia",
  url: `${SITE.url}/newsletter`,
  description:
    "Newsletter semanal sobre inteligência artificial aplicada, agentes autônomos e desenvolvimento de software. Toda quarta-feira, 10h.",
  parentOrganization: {
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
  },
  author: {
    "@type": "Person",
    name: SITE.author.name,
    url: SITE.author.url,
    email: SITE.author.email,
    jobTitle: SITE.author.jobTitle,
    sameAs: SITE.author.sameAs,
  },
  sameAs: SITE.author.sameAs,
  inLanguage: "pt-BR",
};

// ── Benefits ────────────────────────────────────────────────────────
const BENEFITS = [
  {
    icon: "🔍",
    title: "Curadoria semanal",
    description:
      "As notícias mais relevantes de IA, selecionadas a dedo. Filtramos o ruído para você focar no que importa.",
  },
  {
    icon: "🧠",
    title: "Análise com opinião",
    description:
      "Visão de engenheiro, não de hype. Análise técnica e pragmática do que funciona e do que é só promessa.",
  },
  {
    icon: "🛠️",
    title: "Dicas práticas",
    description:
      "Tutoriais, truques e ferramentas sobre agentes, automação, Claude Code, LLMs e engenharia de software.",
  },
  {
    icon: "🚀",
    title: "Acesso antecipado",
    description:
      "Seja o primeiro a conhecer novos produtos, conteúdos exclusivos e oportunidades para assinantes.",
  },
];

// ── Page ────────────────────────────────────────────────────────────

export default function NewsletterPage() {
  const { total, confirmed } = getSubscriberCount();
  const displayCount = formatCount(confirmed || total);
  const rawCount = confirmed || total;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJSONLD),
        }}
      />

      <Navbar />

      <main className="min-h-screen bg-[#08081a]">
        {/* Grid background */}
        <div className="fixed inset-0 grid-bg opacity-[0.03] pointer-events-none" />

        {/* ═══ Hero Section ═══ */}
        <section className="relative pt-32 pb-20 px-4 sm:px-8 text-center">
          {/* Glow orb behind hero */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[--accent] opacity-[0.04] blur-[120px] pointer-events-none" />

          <div className="relative max-w-3xl mx-auto">
            {/* Badge */}
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-[--accent] font-medium border border-[--accent]/30 bg-[--accent]/5 px-4 py-1.5 mb-6">
              Toda quarta-feira, 10h
            </span>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold glow-text mb-6 leading-[1.05]">
              Newsletter
              <br />
              <span className="text-[--accent]">Hernando.ia</span>
            </h1>

            <p className="text-white/50 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
              IA aplicada, agentes autônomos e o futuro do desenvolvimento de
              software. Curadoria semanal sem hype — direto ao ponto, toda
              quarta.
            </p>

            {/* Subscriber count badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[--border] bg-white/[0.03]">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/60">
                <strong className="text-white font-bold tabular-nums">
                  {displayCount}
                </strong>{" "}
                {rawCount === 1 ? "leitor inscrito" : "leitores inscritos"}
              </span>
            </div>

            {/* Subscription form */}
            <NewsletterForm />

            <p className="text-xs text-white/20 mt-4">
              Sem spam. Cancele quando quiser. Uma edição por semana.
            </p>
          </div>
        </section>

        {/* ═══ Stats Section ═══ */}
        <section className="relative py-16 px-4 sm:px-8 border-y-2 border-[--border] bg-[--accent]">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <span className="block text-4xl sm:text-5xl font-bold tabular-nums text-[--accent-foreground]">
                {displayCount}
              </span>
              <span className="block text-xs uppercase tracking-[0.2em] text-[--accent-foreground]/60 mt-2">
                {rawCount === 1 ? "Leitor" : "Leitores"}
              </span>
            </div>
            <div>
              <span className="block text-4xl sm:text-5xl font-bold tabular-nums text-[--accent-foreground]">
                1×
              </span>
              <span className="block text-xs uppercase tracking-[0.2em] text-[--accent-foreground]/60 mt-2">
                Por semana
              </span>
            </div>
            <div>
              <span className="block text-4xl sm:text-5xl font-bold tabular-nums text-[--accent-foreground]">
                100%
              </span>
              <span className="block text-xs uppercase tracking-[0.2em] text-[--accent-foreground]/60 mt-2">
                Sem hype
              </span>
            </div>
          </div>
        </section>

        {/* ═══ What You Get Section ═══ */}
        <section className="relative py-24 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-[--accent] font-medium">
                O que você recebe
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold glow-text mt-3 mb-4">
                Conteúdo que vale seu tempo
              </h2>
              <p className="text-white/40 max-w-lg mx-auto">
                Toda quarta-feira, uma edição curada com o que realmente importa
                no mundo da IA.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {BENEFITS.map((benefit) => (
                <div
                  key={benefit.title}
                  className="glass p-6 glow-border group hover:border-[--accent]/30 transition-colors"
                >
                  <span className="text-3xl mb-3 block">{benefit.icon}</span>
                  <h3 className="text-lg font-bold mb-2 text-white/90">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Past Editions Section ═══ */}
        <section className="relative py-24 px-4 sm:px-8 border-t border-[--border]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-[--accent] font-medium">
                Arquivo
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold glow-text mt-3 mb-4">
                Últimas edições
              </h2>
            </div>

            {/* Placeholder for future editions */}
            <div className="glass p-12 glow-border text-center max-w-lg mx-auto">
              <span className="text-5xl mb-4 block">📬</span>
              <h3 className="text-xl font-bold mb-3 text-white/80">
                A primeira edição está sendo preparada
              </h3>
              <p className="text-white/40 mb-6">
                Estamos preparando conteúdo de qualidade para você. Assine agora
                para receber a edição de estreia em primeira mão!
              </p>
              <NewsletterForm />
            </div>
          </div>
        </section>

        {/* ═══ Footer CTA ═══ */}
        <section className="relative py-24 px-4 sm:px-8 border-t border-[--border] bg-white/[0.02]">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-[--accent] font-medium">
              Não fique de fora
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold glow-text mt-3 mb-4">
              Junte-se a{" "}
              <span className="text-[--accent]">{displayCount}</span> leitores
            </h2>
            <p className="text-white/40 text-lg mb-10">
              Que recebem IA sem hype toda quarta-feira.
            </p>

            <div className="glass p-8 glow-border max-w-md mx-auto">
              <NewsletterForm />
            </div>

            <p className="text-xs text-white/20 mt-6">
              Junte-se a {displayCount} {rawCount === 1 ? "leitor" : "leitores"}{" "}
              que já assinam. Privacidade em primeiro lugar.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
