import type { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { Camera, GitFork, BriefcaseBusiness, Mail, ArrowRight, Globe, Shield } from "lucide-react";

export const metadata: Metadata = generatePageMeta({
  title: "Sobre Hernando",
  description:
    "Projetos, automações e conteúdos sobre inteligência artificial na prática. Um espaço criado por Hernando Candido para testar, construir e compartilhar IA de forma simples.",
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
              Projetos, automações e IA na prática.
            </p>
          </header>

          <div className="prose-custom text-white/70 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4">
                Quem sou
              </h2>
              <p>
                Sou Hernando Candido, criador do Hernando.ia. Aqui eu transformo
                curiosidade em projetos: testo ferramentas, crio automações e
                compartilho o que descubro sobre inteligência artificial de um jeito
                direto.
              </p>
              <p>
                O foco é simples: tirar a IA da conversa e levar para algo que
                possa ser usado, melhorado e compartilhado. Aqui você encontra
                projetos próprios, testes e aprendizados reais do caminho.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4">
                O que eu faço
              </h2>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  Crio e testo projetos com inteligência artificial
                </li>
                <li>
                  Desenvolvo e mantenho o ecossistema Hernando.ia (blog,
                  newsletter, produtos)
                </li>
                <li>
                  Produzo conteúdo sobre IA, tecnologia e o processo de construir
                  projetos
                </li>
                <li>
                  Registro aprendizados, testes e ajustes de forma aberta
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4">
                Projetos
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="https://github.com/hcb2019/claude-code-skills"
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
                  href="https://github.com/hcb2019/arenabite"
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
                  href="https://github.com/hcb2019/hernando-ia"
                  className="block p-4 border border-border hover:border-accent/30 transition-colors group"
                >
                  <h3 className="text-sm font-semibold text-white/70 group-hover:text-accent transition-colors mb-1">
                    Hernando.ia
                  </h3>
                  <p className="text-xs text-white/40">
                    Site pessoal, blog e cérebro digital. Next.js + Tailwind v4
                    + AI-powered content pipeline.
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
                <li className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-accent" />
                  <a
                    href="https://instagram.com/hernando.ia"
                    className="text-accent hover:underline decoration-accent/50 underline-offset-4"
                    target="_blank"
                    rel="me"
                  >
                    Instagram @hernando.ia
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <GitFork className="w-4 h-4 text-accent" />
                  <a
                    href="https://github.com/hcb2019"
                    className="text-accent hover:underline decoration-accent/50 underline-offset-4"
                    target="_blank"
                    rel="me"
                  >
                    GitHub @hcb2019
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <BriefcaseBusiness className="w-4 h-4 text-accent" />
                  <a
                    href="https://www.linkedin.com/in/hernandoia"
                    className="text-accent hover:underline decoration-accent/50 underline-offset-4"
                    target="_blank"
                    rel="me"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent" />
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
                Contato
              </h2>
              <p>
                Quer acompanhar projetos, trocar uma ideia ou conhecer o que estou
                construindo com IA?
              </p>
              <a
                href="mailto:contato@hernandoia.com"
                className="inline-flex items-center gap-2 mt-3 bg-accent/10 border border-accent/30 text-accent font-bold uppercase tracking-tighter px-6 py-2 text-xs hover:bg-accent/20 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                ENVIAR EMAIL
              </a>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
