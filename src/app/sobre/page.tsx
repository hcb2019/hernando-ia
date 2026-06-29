import type { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";

export const metadata: Metadata = generatePageMeta({
  title: "Sobre Hernando",
  description:
    "AI Engineer, empreendedor e criador do Hernando.ia. Conheça minha trajetória em IA, startups e construção de produtos digitais.",
  path: "/sobre",
  ogImage: "/images/og-default.png",
});

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#08081a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-24 pb-24">
          <header className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold glow-text mb-4">
              Sobre Hernando
            </h1>
            <p className="text-white/50 text-lg">
              AI Engineer, empreendedor e criador do ecossistema Hernando.ia
            </p>
          </header>

          <div className="prose-custom text-white/70 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4">
                Quem sou
              </h2>
              <p>
                Sou engenheiro de IA com mais de 10 anos de experiência em
                tecnologia. Construo produtos digitais, automatizo processos
                complexos e escrevo sobre o que aprendo no caminho.
              </p>
              <p>
                Minha missão é transformar inteligência artificial em
                ferramentas que funcionam no mundo real — não em PowerPoint.
                Cada projeto que construo nasce de uma necessidade concreta:
                automatizar o repetitivo, escalar o que funciona e eliminar o
                que não agrega.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4">
                O que eu faço
              </h2>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  Crio agentes de IA autônomos para negócios reais
                </li>
                <li>
                  Desenvolvo e mantenho o ecossistema Hernando.ia (blog,
                  newsletter, produtos)
                </li>
                <li>
                  Produzo conteúdo sobre IA, engenharia de software e
                  empreendedorismo
                </li>
                <li>
                  Consultoria em automação e implementação de IA para empresas
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4">
                Projetos
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/produtos/claude-code-skills"
                  className="block p-4 border border-border hover:border-accent/30 transition-colors group"
                >
                  <h3 className="text-sm font-semibold text-white/70 group-hover:text-accent transition-colors mb-1">
                    Claude Code Skills
                  </h3>
                  <p className="text-xs text-white/40">
                    20 skills profissionais open source para agentes de IA.
                    Debugging, TDD, arquitetura e muito mais.
                  </p>
                </Link>
                <Link
                  href="/produtos/arenabite"
                  className="block p-4 border border-border hover:border-accent/30 transition-colors group"
                >
                  <h3 className="text-sm font-semibold text-white/70 group-hover:text-accent transition-colors mb-1">
                    ArenaBite
                  </h3>
                  <p className="text-xs text-white/40">
                    App de nutrição inteligente para atletas. IA que entende
                    seu treino e adapta sua alimentação.
                  </p>
                </Link>
                <Link
                  href="/produtos/hermes-agent"
                  className="block p-4 border border-border hover:border-accent/30 transition-colors group"
                >
                  <h3 className="text-sm font-semibold text-white/70 group-hover:text-accent transition-colors mb-1">
                    Hermes Agent
                  </h3>
                  <p className="text-xs text-white/40">
                    Agente de IA autônomo. Executa tarefas, gerencia
                    servidores, posta conteúdo e opera 24/7.
                  </p>
                </Link>
                <Link
                  href="/blog"
                  className="block p-4 border border-border hover:border-accent/30 transition-colors group"
                >
                  <h3 className="text-sm font-semibold text-white/70 group-hover:text-accent transition-colors mb-1">
                    Blog
                  </h3>
                  <p className="text-xs text-white/40">
                    Artigos sobre engenharia de IA, startups, ferramentas e o
                    futuro da tecnologia.
                  </p>
                </Link>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4">
                Onde me encontrar
              </h2>
              <ul className="space-y-2">
                <li>
                  📸{" "}
                  <a
                    href="https://instagram.com/hernando.ia"
                    className="text-accent hover:underline decoration-accent/50 underline-offset-4"
                    target="_blank"
                    rel="me"
                  >
                    Instagram @hernando.ia
                  </a>
                </li>
                <li>
                  🐙{" "}
                  <a
                    href="https://github.com/hcb2019"
                    className="text-accent hover:underline decoration-accent/50 underline-offset-4"
                    target="_blank"
                    rel="me"
                  >
                    GitHub @hcb2019
                  </a>
                </li>
                <li>
                  💼{" "}
                  <a
                    href="https://www.linkedin.com/in/hernandoia"
                    className="text-accent hover:underline decoration-accent/50 underline-offset-4"
                    target="_blank"
                    rel="me"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  ✉️{" "}
                  <a
                    href="mailto:contato@hernandoia.com"
                    className="text-accent hover:underline decoration-accent/50 underline-offset-4"
                  >
                    contato@hernandoia.com
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4">
                Contrate
              </h2>
              <p>
                Precisa de um engenheiro de IA pra implementar agentes
                autônomos, automatizar processos ou dar consultoria estratégica?
              </p>
              <Link
                href="/servicos"
                className="inline-flex items-center gap-2 mt-3 bg-accent/10 border border-accent/30 text-accent font-bold uppercase tracking-tighter px-6 py-2 text-xs hover:bg-accent/20 transition-colors"
              >
                VER PLANOS →
              </Link>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
