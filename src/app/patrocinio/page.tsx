import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Patrocine o Blog | Hernando.ia",
  description:
    "Anuncie para um público qualificado de engenheiros de IA, founders e profissionais tech. Posts patrocinados, newsletter e parcerias.",
};

export default function PatrocinioPage() {
  return (
    <div className="min-h-screen bg-[#08081a]">
      <div className="fixed inset-0 grid-bg opacity-[0.03] pointer-events-none" />
      <Navbar />

      <main className="relative max-w-3xl mx-auto px-4 sm:px-8 pt-24 pb-24">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.15em] text-accent font-medium">
            MONETIZAÇÃO
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold glow-text mt-4 mb-4 leading-tight">
            Patrocine o Blog
          </h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Alcance um público altamente qualificado de engenheiros de IA,
            founders de startups e profissionais de tecnologia no Brasil.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Leitores", value: "2K+" },
            { label: "Newsletter", value: "2" },
            { label: "Instagram", value: "1.3K" },
            { label: "Posts/mês", value: "90+" },
          ].map((m) => (
            <div
              key={m.label}
              className="glass p-4 text-center glow-border"
            >
              <div className="text-2xl font-bold text-accent">{m.value}</div>
              <div className="text-xs text-white/40 mt-1">{m.label}</div>
            </div>
          ))}
          <p className="col-span-full text-xs text-white/20 text-center mt-2">
            * Métricas em crescimento. Dados de junho/2026.
          </p>
        </div>

        {/* Plans */}
        <h2 className="text-2xl font-bold mb-8">Formatos de Patrocínio</h2>

        <div className="space-y-6 mb-16">
          {/* Post Patrocinado */}
          <div className="glass p-6 glow-border">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-bold text-accent">
                  Post Patrocinado
                </h3>
                <p className="text-white/50 text-sm mt-2 max-w-lg">
                  Um artigo completo sobre sua empresa, produto ou serviço,
                  escrito no tom editorial do blog. Publicado na home, blog e
                  compartilhado no Instagram.
                </p>
                <ul className="text-white/40 text-sm mt-3 space-y-1">
                  <li>- 1 post dedicado com sua marca</li>
                  <li>- Imagem e links com nofollow patrocinado</li>
                  <li>- Divulgação no Instagram @hernando.ia</li>
                  <li>- Permanece no ar permanentemente</li>
                </ul>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">R$ 497</span>
                <p className="text-xs text-white/30">post único</p>
              </div>
            </div>
          </div>

          {/* Pacote Mensal */}
          <div className="glass p-6 glow-border border-accent/30">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-accent">
                    Pacote Mensal
                  </h3>
                  <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded">
                    RECOMENDADO
                  </span>
                </div>
                <p className="text-white/50 text-sm mt-2 max-w-lg">
                  4 posts patrocinados por mês + menção na newsletter semanal.
                  Presença contínua para construir autoridade de marca.
                </p>
                <ul className="text-white/40 text-sm mt-3 space-y-1">
                  <li>- 4 posts patrocinados/mês</li>
                  <li>- Menção na newsletter (2K+ leitores)</li>
                  <li>- Destaque na home por 7 dias cada</li>
                  <li>- Stories no Instagram</li>
                  <li>- Relatório de métricas mensal</li>
                </ul>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">R$ 1.497</span>
                <p className="text-xs text-white/30">/mês</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="glass p-6 glow-border">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-bold text-accent">
                  Menção na Newsletter
                </h3>
                <p className="text-white/50 text-sm mt-2 max-w-lg">
                  Sua marca na newsletter semanal do Hernando.ia, lida por
                  profissionais de tecnologia e IA.
                </p>
                <ul className="text-white/40 text-sm mt-3 space-y-1">
                  <li>- 1 menção com link na newsletter</li>
                  <li>- Até 100 palavras sobre seu produto</li>
                  <li>- Envio para lista completa</li>
                </ul>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">R$ 297</span>
                <p className="text-xs text-white/30">por edição</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="glass p-8 text-center glow-border">
          <h2 className="text-xl font-bold mb-3">Vamos conversar?</h2>
          <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
            Mande um email contando sobre sua empresa e o que você quer
            divulgar. Respondo em até 24h.
          </p>
          <a
            href="mailto:hernando@hernando.ia?subject=Patroc%C3%ADnio%20Hernando.ia"
            className="inline-flex items-center gap-2 bg-accent text-[#08081a] font-bold px-6 py-3 text-sm hover:bg-accent/90 transition-colors"
          >
            hernando@hernando.ia →
          </a>
          <p className="text-xs text-white/20 mt-4">
            Ou chama no Instagram{" "}
            <a
              href="https://instagram.com/hernando.ia"
              className="text-accent/50 hover:text-accent"
            >
              @hernando.ia
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
