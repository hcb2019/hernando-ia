import type { Metadata } from "next";
import Link from "next/link";
import { SITE, generatePageMeta } from "@/lib/seo";
import Navbar from "@/components/layout/navbar";

// ── Types ───────────────────────────────────────────────────────────────

interface Skill {
  icon: string;
  name: string;
  description: string;
  highlight?: boolean;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface FAQItem {
  question: string;
  answer: string;
}

// ── Data ────────────────────────────────────────────────────────────────

const skillCategories: SkillCategory[] = [
  {
    title: "Engenharia",
    skills: [
      { icon: "🔍", name: "diagnostico", description: "Debugging sistemático com 10 métodos de investigação" },
      { icon: "🧪", name: "tdd", description: "Test-driven development completo com cobertura inteligente" },
      { icon: "📋", name: "entrevista-com-docs", description: "Alinhamento + documentação + ADRs em um fluxo" },
      { icon: "🏗️", name: "melhorar-arquitetura", description: "Análise de arquitetura com relatório detalhado" },
      { icon: "📄", name: "para-prd", description: "Sintetiza PRDs direto da conversa com stakeholders" },
      { icon: "🎯", name: "para-issues", description: "Quebra planos em issues verticais e executáveis" },
      { icon: "🔄", name: "triagem", description: "Máquina de estado de issues com priorização automática" },
      { icon: "🗺️", name: "visao-geral", description: "Overview completo de codebase em minutos" },
    ],
  },
  {
    title: "Domínio Técnico",
    skills: [
      { icon: "🐘", name: "postgresql-boas-praticas", description: "Otimização de queries, índices e schema Postgres" },
      { icon: "🤖", name: "avaliacao-avancada-ia", description: "Avaliação rigorosa de LLMs com métricas reais" },
      { icon: "📦", name: "contexto-em-arquivos", description: "Engenharia de contexto para agentes de IA" },
      { icon: "⚡", name: "prototipo", description: "Prototipagem rápida com iteração guiada" },
    ],
  },
  {
    title: "Produtividade",
    skills: [
      { icon: "🕳️", name: "modo-caverna", description: "Reduz consumo de tokens em até 75%" },
      { icon: "🤝", name: "passar-bastao", description: "Handoff limpo entre agentes com contexto preservado" },
      { icon: "📊", name: "fluxo-gsd", description: "Gestão de projetos integrada ao Claude Code" },
      { icon: "🔧", name: "criar-skill", description: "Crie suas próprias skills com o meta-framework incluso" },
    ],
  },
  {
    title: "Diferencial BR",
    skills: [
      { icon: "🇧🇷", name: "humanizador-pt-br", description: "Remove traços de IA do português — naturalidade total 🔥", highlight: true },
      { icon: "💼", name: "comunicacao-interna", description: "Comunicação corporativa no padrão brasileiro" },
    ],
  },
  {
    title: "Segurança",
    skills: [
      { icon: "🛡️", name: "protetor-git", description: "Bloqueia comandos git perigosos automaticamente" },
      { icon: "✅", name: "setup-pre-commit", description: "Hooks de pre-commit inteligentes com validação" },
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Isso funciona com Claude Code, Cursor, Windsurf e OpenCode?",
    answer: "Sim! As skills foram desenvolvidas e testadas principalmente no Claude Code, mas são compatíveis com qualquer ferramenta que use o formato de agent skills do Claude — incluindo Cursor, Windsurf e OpenCode. A instalação é a mesma em todas as plataformas.",
  },
  {
    question: "Preciso saber programar para usar?",
    answer: "Sim. Esse produto é para desenvolvedores que já programam e querem dar um salto de produtividade e qualidade com IA. Se você ainda não programa, as skills não vão fazer mágica — mas se você já é dev, elas transformam seu fluxo de trabalho.",
  },
  {
    question: "Tem garantia?",
    answer: "Sim! 7 dias de garantia incondicional. Se as skills não melhorarem seu fluxo de trabalho, você recebe 100% do valor de volta. Sem perguntas, sem burocracia.",
  },
  {
    question: "Como recebo as skills?",
    answer: "Imediatamente após a compra, você recebe um email com o link para baixar o pacote completo. É um arquivo .zip com as 20 skills organizadas por categoria. Instalação em menos de 2 minutos — arrasta pra pasta, reinicia o Claude Code e pronto.",
  },
  {
    question: "Isso não são só prompts disfarçados?",
    answer: "Não. Skills são workflows de engenharia completos — com máquinas de estado, validações, documentação integrada e cadeias de raciocínio. Enquanto prompts são frases mágicas que funcionam às vezes, skills são metodologias reproduzíveis baseadas em engenharia de software real.",
  },
  {
    question: "Funciona no Brasil? Tem contexto de PIX, CPF, LGPD?",
    answer: "Sim! Esse é justamente o grande diferencial. As skills incluem contexto brasileiro real: validação de CPF/CNPJ, integração com PIX, conformidade com LGPD, comunicação corporativa no padrão BR e integração com ferramentas como Jira e Trello usadas em times brasileiros.",
  },
];

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Pacote de Skills para Claude Code — Desenvolvedor Brasileiro",
  description:
    "20 skills profissionais em português para transformar seu Claude Code em um engenheiro de elite — com contexto brasileiro. Inclui skills de engenharia, domínio técnico, produtividade, diferencial BR e segurança.",
  sku: "SKILLS-CC-BR-20",
  brand: {
    "@type": "Brand",
    name: "Hernando.ia",
  },
  offers: {
    "@type": "Offer",
    url: `${SITE.url}/produtos/claude-code-skills`,
    priceCurrency: "BRL",
    price: "147.00",
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Person",
      name: "Hernando",
      url: SITE.url,
    },
  },
  inLanguage: "pt-BR",
  category: "Software",
};

const breadcrumbJSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Produtos", item: `${SITE.url}/#products` },
    { "@type": "ListItem", position: 3, name: "Claude Code Skills", item: `${SITE.url}/produtos/claude-code-skills` },
  ],
};

// ── Page Metadata ──────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMeta({
    title: "Pacote de Skills para Claude Code — Desenvolvedor Brasileiro",
    description:
      "20 skills profissionais em português para Claude Code, Cursor, Windsurf e OpenCode. Engenharia de software de verdade com contexto brasileiro: PIX, CPF, LGPD. Curadoria Nando.",
    path: "/produtos/claude-code-skills",
    ogImage: "/api/og?title=Pacote+de+Skills+Claude+Code",
    type: "website",
    lang: "pt",
  });
}

// ── Page Component ─────────────────────────────────────────────────────

export default function ClaudeCodeSkillsPage() {
  return (
    <div className="min-h-screen bg-[#08081a]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJSONLD) }}
      />

      {/* Grid background + ambient glow */}
      <div className="fixed inset-0 grid-bg opacity-[0.03] pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[--accent] opacity-[0.02] blur-[180px] pointer-events-none" />

      <Navbar />

      <main className="relative">
        {/* ═══════════ HERO SECTION ═══════════ */}
        <section className="relative pt-24 pb-20 px-6 sm:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[--accent]/30 bg-[--accent]/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-[--accent] animate-pulse" />
              <span className="text-xs uppercase tracking-[0.2em] text-[--accent] font-bold">
                PRIMEIRO DO BRASIL
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold glow-text mb-6 leading-[1.05]">
              Pare de gerar código lixo.
              <br />
              <span className="text-[--accent]">
                Aprenda engenharia de software de verdade
              </span>
              <br />
              com Claude Code.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[--muted-foreground] max-w-2xl mx-auto mb-10 leading-relaxed">
              20 skills profissionais em português para transformar seu Claude Code
              em um engenheiro de elite — com contexto brasileiro.
            </p>

            {/* Price + CTA */}
            <div className="flex flex-col items-center gap-6">
              {/* Pricing — GRÁTIS */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl text-[--muted-foreground] line-through">R$147</span>
                  <span className="text-5xl sm:text-6xl font-bold text-[--accent] glow-text">GRÁTIS</span>
                </div>
                <span className="text-sm text-[--muted-foreground]">
                  Código aberto (MIT) • Instalação em 1 comando
                </span>

                {/* Open source badge */}
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[--accent]/10 border border-[--accent]/20">
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-[--accent]">
                    🎉 OPEN SOURCE — 20 skills profissionais
                  </span>
                </div>
              </div>

              {/* CTA — Install command */}
              <div className="inline-flex items-center gap-3 bg-black/40 border border-[--border] rounded px-5 py-4 font-mono text-base sm:text-lg text-[--accent] max-w-full overflow-x-auto">
                <span className="select-none text-[--muted-foreground]">$</span>
                <span>npx @hernandoia/claude-code-skills</span>
              </div>

              {/* Social proof */}
              <p className="text-xs text-[--muted-foreground]/60 mt-2">
                ⭐ GitHub • 📖 Código aberto • 🇧🇷 100% PT-BR • 🔄 Atualizações gratuitas
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ SKILLS TABLE SECTION ═══════════ */}
        <section className="py-24 px-6 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold glow-text mb-4">
                O que você vai receber
              </h2>
              <p className="text-lg text-[--muted-foreground] max-w-xl mx-auto">
                20 skills organizadas por categoria. Cada uma é um workflow de
                engenharia completo — não são prompts.
              </p>
            </div>

            <div className="space-y-12">
              {skillCategories.map((category) => (
                <div key={category.title}>
                  <h3 className="text-lg uppercase tracking-[0.2em] text-[--accent] font-bold mb-5 border-b border-[--border] pb-3">
                    {category.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`p-4 border border-[--border] bg-[--background]/50 transition-all hover:border-[--accent]/40 hover:bg-[--accent]/[0.02] ${
                          skill.highlight
                            ? "ring-1 ring-[--accent]/30 border-[--accent]/40"
                            : ""
                        }`}
                      >
                        <span className="text-2xl mb-2 block">{skill.icon}</span>
                        <code className="text-xs font-mono text-[--accent]/80 block mb-1.5">
                          /{skill.name}
                        </code>
                        <p className="text-sm text-[--muted-foreground] leading-relaxed">
                          {skill.description}
                        </p>
                        {skill.highlight && (
                          <span className="inline-block mt-2 text-[10px] uppercase tracking-[0.12em] text-[--accent] font-bold">
                            ★ EXCLUSIVO
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ WHY THIS PRODUCT ═══════════ */}
        <section className="py-24 px-6 sm:px-8 border-t border-[--border]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold glow-text mb-4">
                Por que esse produto é diferente
              </h2>
              <p className="text-lg text-[--muted-foreground] max-w-xl mx-auto">
                Não é mais um pacote de prompts. É metodologia de engenharia com
                contexto real do mercado brasileiro.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="p-8 border-2 border-[--border] bg-[--background]/30 flex flex-col gap-4 transition-all hover:border-[--accent]/30">
                <span className="text-3xl">⚙️</span>
                <h3 className="text-xl font-bold uppercase tracking-tighter">
                  Não é prompt — é metodologia
                </h3>
                <p className="text-sm text-[--muted-foreground] leading-relaxed flex-grow">
                  Skills são workflows completos com máquinas de estado, validações
                  e cadeias de raciocínio. Não são frases mágicas que funcionam
                  "às vezes". São processos de engenharia reproduzíveis.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-8 border-2 border-[--border] bg-[--background]/30 flex flex-col gap-4 transition-all hover:border-[--accent]/30">
                <span className="text-3xl">🇧🇷</span>
                <h3 className="text-xl font-bold uppercase tracking-tighter">
                  Contexto brasileiro real
                </h3>
                <p className="text-sm text-[--muted-foreground] leading-relaxed flex-grow">
                  Validação de CPF/CNPJ, integração com PIX, conformidade com
                  LGPD, comunicação corporativa no padrão brasileiro, e
                  compatibilidade com ferramentas como Jira e Trello.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-8 border-2 border-[--border] bg-[--background]/30 flex flex-col gap-4 transition-all hover:border-[--accent]/30">
                <span className="text-3xl">🏆</span>
                <h3 className="text-xl font-bold uppercase tracking-tighter">
                  Baseado em engenharia de elite
                </h3>
                <p className="text-sm text-[--muted-foreground] leading-relaxed flex-grow">
                  Metodologia inspirada em Matt Pocock e na comunidade
                  open-source de engenharia de software. Skills que pensam como
                  engenheiro, não como gerador de texto.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ TESTIMONIALS ═══════════ */}
        <section className="py-24 px-6 sm:px-8 border-t border-[--border]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold glow-text mb-4">
                Quem testou, aprovou
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Testimonial 1 */}
              <div className="p-8 border border-[--border] bg-[--background]/30">
                <div className="flex items-center gap-1 mb-4">
                  {Array(5).fill(null).map((_, i) => (
                    <span key={i} className="text-[--accent] text-lg">★</span>
                  ))}
                </div>
                <blockquote className="text-base leading-relaxed text-[--foreground]/80 mb-6 italic">
                  "Finalmente skills que pensam como engenheiro, não como
                  gerador de texto. A metodologia por trás de cada uma é o que
                  faz a diferença."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[--accent]/20 flex items-center justify-center font-bold text-sm text-[--accent]">
                    MP
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Estilo Matt Pocock</p>
                    <p className="text-xs text-[--muted-foreground]">Engineering Methodology</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="p-8 border border-[--border] bg-[--background]/30">
                <div className="flex items-center gap-1 mb-4">
                  {Array(5).fill(null).map((_, i) => (
                    <span key={i} className="text-[--accent] text-lg">★</span>
                  ))}
                </div>
                <blockquote className="text-base leading-relaxed text-[--foreground]/80 mb-6 italic">
                  "O humanizador-pt-br sozinho já pagou o pacote. Meus textos
                  finalmente soam naturais — sem aquele cheiro de IA que todo
                  mundo percebe."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[--accent]/20 flex items-center justify-center font-bold text-sm text-[--accent]">
                    RS
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Dev Fullstack BR</p>
                    <p className="text-xs text-[--muted-foreground]">São Paulo, Brasil</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section className="py-24 px-6 sm:px-8 border-t border-[--border]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold glow-text mb-4">
                Perguntas Frequentes
              </h2>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  className="group border border-[--border] bg-[--background]/30"
                >
                  <summary className="px-6 py-5 cursor-pointer flex items-center justify-between gap-4 text-left font-semibold text-[--foreground]/90 hover:text-[--accent] transition-colors">
                    {item.question}
                    <span className="text-[--muted-foreground] group-open:rotate-45 transition-transform text-lg">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-sm text-[--muted-foreground] leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ BOTTOM CTA / CHECKOUT ═══════════ */}
        <section
          id="comprar"
          className="py-24 px-6 sm:px-8 border-t border-[--border]"
        >
          <div className="max-w-2xl mx-auto text-center">
            {/* Urgency badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[--accent]/40 bg-[--accent]/10 mb-8">
              <span className="text-xs uppercase tracking-[0.15em] text-[--accent] font-bold">
                🎁 OPEN SOURCE — GRATUITO
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold glow-text mb-6">
              Pronto para parar de gerar
              <br />
              <span className="text-[--accent]">código lixo?</span>
            </h2>

            <p className="text-lg text-[--muted-foreground] mb-10 max-w-lg mx-auto leading-relaxed">
              20 skills profissionais em português. Contexto brasileiro real.
              Metodologia de engenharia de elite. E o humanizador-pt-br que
              sozinho já vale o pacote.
            </p>

            {/* Price — GRÁTIS */}
            <div className="flex flex-col items-center gap-3 mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-xl text-[--muted-foreground] line-through">
                  R$147
                </span>
                <span className="text-6xl sm:text-7xl font-bold text-[--accent] glow-text">
                  GRÁTIS
                </span>
              </div>
              <span className="text-sm text-[--muted-foreground]">
                Código aberto (MIT) • 59 arquivos • 20 skills
              </span>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[--accent]/10 border border-[--accent]/20">
                <span className="text-xs font-bold uppercase tracking-[0.1em] text-[--accent]">
                  🎉 OPEN SOURCE — COMUNIDADE
                </span>
              </div>
            </div>

            {/* Install Command */}
            <div className="mb-8">
              <p className="text-sm text-[--muted-foreground] mb-4 uppercase tracking-[0.15em]">
                Instalação em 1 comando
              </p>
              <div className="inline-flex items-center gap-3 bg-black/40 border border-[--border] rounded px-5 py-4 font-mono text-base text-[--accent] max-w-full overflow-x-auto">
                <span className="select-none text-[--muted-foreground]">$</span>
                <span>npx @hernandoia/claude-code-skills</span>
              </div>
              <p className="text-xs text-[--muted-foreground]/50 mt-3">
                Requer Node.js ≥ 16 • Também disponível via curl
              </p>
            </div>

            {/* Also available via curl */}
            <div className="mb-8">
              <p className="text-xs text-[--muted-foreground] mb-2">Ou via curl:</p>
              <div className="inline-flex items-center gap-3 bg-black/40 border border-[--border] rounded px-4 py-2 font-mono text-xs text-[--muted-foreground] max-w-full overflow-x-auto">
                <span className="select-none text-[--muted-foreground]">$</span>
                <span>curl -fsSL https://hernandoia.com/install.sh | bash</span>
              </div>
            </div>

            {/* GitHub badge */}
            <a
              href="https://github.com/hcb2019/claude-code-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[--border] text-sm text-[--muted-foreground] hover:text-[--accent] hover:border-[--accent]/30 transition-all mb-4"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              Ver no GitHub
            </a>

            {/* Open-source note */}
            <p className="text-xs text-[--muted-foreground]/40 max-w-md mx-auto leading-relaxed">
              Código aberto (MIT) • 59 arquivos • 20 skills • 100% PT-BR 
              <br />Quer suporte premium ou skills customizadas?{" "}
              <a href="mailto:hernando@hernando.ia" className="text-[--accent]/70 hover:text-[--accent] underline underline-offset-2">Fale comigo</a>
            </p>
          </div>
        </section>

        {/* ═══════════ BACK TO HOME ═══════════ */}
        <div className="text-center pb-24 pt-8">
          <Link
            href="/"
            className="text-sm text-[--muted-foreground] hover:text-[--accent] transition-colors underline underline-offset-4"
          >
            ← Voltar para Hernando.ia
          </Link>
        </div>
      </main>
    </div>
  );
}
