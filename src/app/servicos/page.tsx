import { generatePageMeta, SITE } from "@/lib/seo";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = generatePageMeta({
  title: "Serviços",
  description:
    "Implementação de agentes de IA, consultoria e mentoria para devs e empresas. Conhecimento é grátis — implementação é comigo.",
  path: "/servicos",
  ogImage: "/api/og?title=Servi%C3%A7os",
});

const packages = [
  {
    emoji: "⚡",
    title: "Claude Code PRO",
    price: "R$ 497",
    recurrence: "pagamento único",
    ideal: "Devs que querem Claude Code configurado profissionalmente",
    includes: [
      "Instalação e configuração completa",
      "5 skills customizadas pro seu stack",
      "1 sessão de onboarding (1h)",
      "Suporte por 7 dias via WhatsApp",
    ],
    accent: "accent",
    badge: null,
    whatsappMsg:
      "Olá! Quero o pacote Claude Code PRO. Meu stack principal é: [descreva]. Pode me passar os próximos passos?",
  },
  {
    emoji: "🤖",
    title: "Agente de IA no Seu Negócio",
    price: "R$ 1.497",
    recurrence: "pagamento único",
    ideal: "Pequenas empresas, clínicas, escritórios",
    includes: [
      "Diagnóstico de processos automatizáveis",
      "Implementação de 1 agente autônomo",
      "Integração com APIs, planilhas, email",
      "Documentação + treinamento da equipe",
      "Suporte por 15 dias",
    ],
    accent: "yellow",
    badge: "MAIS VENDIDO",
    whatsappMsg:
      "Olá! Quero o pacote Agente de IA no Meu Negócio. Meu segmento é: [descreva]. Podemos conversar sobre o diagnóstico?",
  },
  {
    emoji: "🧠",
    title: "Mentoria IA Elite",
    price: "R$ 997",
    recurrence: "/mês",
    ideal: "Devs seniors, tech leads, empreendedores",
    includes: [
      "4 sessões de 1h (semanais)",
      "Revisão de código e arquitetura",
      "Acesso ao grupo VIP (WhatsApp)",
      "Skills exclusivas mensais",
    ],
    accent: "accent",
    badge: "RECORRENTE",
    whatsappMsg:
      "Olá! Quero a Mentoria IA Elite. Meu objetivo principal é: [descreva]. Tem vaga disponível esse mês?",
  },
];

const faqs = [
  {
    q: "Você faz projeto sob demanda que não está nos pacotes?",
    a: "Sim. Se sua necessidade não se encaixa em nenhum pacote, me chama no WhatsApp ou DM do Instagram que a gente desenha um escopo personalizado.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "50% na entrada, 50% na entrega. Aceito PIX e cartão de crédito. Para a mentoria, a cobrança é mensal.",
  },
  {
    q: "Quanto tempo leva cada pacote?",
    a: "Claude Code PRO: 3 a 5 dias. Agente de IA: 7 a 14 dias (dependendo da complexidade). Mentoria: sessões semanais, sem prazo fixo.",
  },
  {
    q: "E se eu não gostar do resultado?",
    a: "Garantia de 7 dias após a entrega. Se não estiver satisfeito, devolvo 100% do valor. Risco zero.",
  },
  {
    q: "Você atende empresa grande?",
    a: "Atendo empresas de até 50 funcionários nos pacotes padrão. Acima disso, faço proposta personalizada — me chama que a gente conversa.",
  },
  {
    q: "Preciso ter conhecimento técnico?",
    a: "Não. O pacote de Agente de IA inclui treinamento da equipe. O Claude Code PRO é voltado pra devs, então ajuda ter familiaridade com terminal.",
  },
];

export default function ServicosPage() {
  return (
    <div className="bg-[#08081a] min-h-screen text-[--foreground] relative">
      {/* Grid overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-4 max-w-5xl mx-auto">
        {/* ── Hero ── */}
        <section className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium">
            SERVIÇOS
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4 glow-text leading-tight">
            Conhecimento é Grátis.
            <br />
            <span className="text-[--yellow]">Implementação</span> é Comigo.
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto mb-8">
            Você tem acesso à mesma informação que eu. A diferença é que eu{" "}
            <strong className="text-white/80">EXECUTO</strong>. Enquanto você
            fica 3 semanas tentando configurar, eu entrego funcionando em dias.
          </p>
          <a
            href="#planos"
            className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent font-bold uppercase tracking-tighter px-6 py-2 text-xs hover:bg-accent/20 transition-colors"
          >
            VER PLANOS ↓
          </a>
        </section>

        {/* ── Philosophy ── */}
        <section className="mb-20">
          <h2 className="text-center text-2xl font-bold mb-10">
            Por Que Esse Modelo Funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "1",
                title: "Informação é Commodity",
                body: "Todo mundo tem ChatGPT, YouTube, Google. Saber o que fazer não é mais diferencial — é o básico.",
              },
              {
                num: "2",
                title: "Execução é o Gargalo",
                body: "Pessoas e empresas têm preguiça de implementar. 90% compram curso e nunca aplicam. Esse é o valor real.",
              },
              {
                num: "3",
                title: "Você Paga Pelo Resultado",
                body: "Não paga por horas. Não paga por promessa. Paga pelo sistema funcionando. Sem enrolação.",
              },
            ].map((item) => (
              <div key={item.num} className="glass p-6 glow-border text-center">
                <span className="text-3xl font-bold text-accent/40 mb-3 block">
                  {item.num}
                </span>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Packages ── */}
        <section id="planos" className="mb-20">
          <h2 className="text-center text-2xl font-bold mb-4">Planos</h2>
          <p className="text-center text-white/40 text-sm mb-10">
            Escolha o que faz sentido agora. Sem contrato, sem letra miúda.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => {
              const isYellow = pkg.accent === "yellow";
              const accentClass = isYellow
                ? "text-[--yellow]"
                : "text-accent";
              const borderClass = isYellow
                ? "border-[--yellow]/20"
                : "border-accent/20";
              const bgClass = isYellow
                ? "bg-[--yellow]/5"
                : "bg-accent/5";

              return (
                <div
                  key={i}
                  className={`relative glass p-6 glow-border flex flex-col ${borderClass}`}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <span
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.15em] font-bold px-3 py-0.5 ${
                        isYellow
                          ? "bg-[--yellow] text-black"
                          : "bg-accent text-black"
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  )}

                  <span className="text-3xl mb-3">{pkg.emoji}</span>
                  <h3 className="text-xl font-bold mb-1">{pkg.title}</h3>
                  <div className="mb-3">
                    <span className={`text-3xl font-bold ${accentClass}`}>
                      {pkg.price}
                    </span>
                    <span className="text-white/30 text-sm ml-1">
                      {pkg.recurrence}
                    </span>
                  </div>
                  <p className="text-white/40 text-xs mb-4 leading-relaxed">
                    {pkg.ideal}
                  </p>

                  {/* Includes */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {pkg.includes.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-white/70"
                      >
                        <span className={accentClass + " mt-0.5 flex-shrink-0"}>
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={`https://wa.me/5521920032747?text=${encodeURIComponent(pkg.whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 w-full font-bold uppercase tracking-tighter px-4 py-2.5 text-xs transition-colors ${
                      isYellow
                        ? "bg-[--yellow]/10 border border-[--yellow]/30 text-[--yellow] hover:bg-[--yellow]/20"
                        : "bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20"
                    }`}
                  >
                    {pkg.title === "Mentoria IA Elite"
                      ? "QUERO MENTORIA →"
                      : pkg.title === "Agente de IA no Seu Negócio"
                        ? "QUERO AUTOMATIZAR →"
                        : "QUERO CONFIGURAR →"}
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-20">
          <h2 className="text-center text-2xl font-bold mb-10">Dúvidas Frequentes</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="glass p-5 glow-border cursor-pointer group"
              >
                <summary className="font-medium text-sm flex items-center justify-between list-none">
                  {faq.q}
                  <span className="text-accent/50 text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-white/50 text-sm mt-3 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="text-center glass p-10 glow-border">
          <h2 className="text-2xl font-bold mb-3">
            Não Sabe Qual Pacote Escolher?
          </h2>
          <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
            Me chama no WhatsApp ou DM do Instagram. Em 5 minutos de conversa eu
            te digo qual caminho faz mais sentido — sem compromisso.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://wa.me/5521920032747?text=Olá!%20Quero%20entender%20qual%20pacote%20faz%20mais%20sentido%20pra%20mim."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[--yellow]/10 border border-[--yellow]/30 text-[--yellow] font-bold uppercase tracking-tighter px-6 py-2.5 text-xs hover:bg-[--yellow]/20 transition-colors"
            >
              CHAMAR NO WHATSAPP →
            </a>
            <a
              href="https://instagram.com/hernando.ia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent font-bold uppercase tracking-tighter px-6 py-2.5 text-xs hover:bg-accent/20 transition-colors"
            >
              @HERNANDO.IA →
            </a>
          </div>
        </section>

        {/* ── JSON-LD ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Serviços de IA — Hernando.ia",
              provider: {
                "@type": "Person",
                name: "Hernando",
                url: SITE.url,
              },
              serviceType: "Implementação de Inteligência Artificial",
              areaServed: "Brasil",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Pacotes de Serviço",
                itemListElement: packages.map((pkg) => ({
                  "@type": "Offer",
                  name: pkg.title,
                  description: pkg.ideal,
                  price: pkg.price.replace("R$ ", "").replace("/mês", ""),
                  priceCurrency: "BRL",
                })),
              },
            }),
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
