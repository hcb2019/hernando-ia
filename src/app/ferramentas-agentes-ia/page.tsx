import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot,
  CalendarDays,
  Check,
  ChevronRight,
  Code2,
  ExternalLink,
  Flame,
  Globe2,
  Mic,
  ShieldCheck,
  Terminal,
  UsersRound,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { generatePageMeta, SITE } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta({
  title: "Como instalar ferramentas para agentes de IA",
  description:
    "Guia simples para instalar e usar Pipecat, Cline, Postiz, CrewAI, Browser Use e Firecrawl com seu agente de IA.",
  path: "/ferramentas-agentes-ia",
  ogImage:
    "/api/og?title=Como+instalar+ferramentas+de+IA&subtitle=Passo+a+passo+para+quem+está+começando",
  tags: [
    "como instalar agentes de IA",
    "ferramentas de IA",
    "automação",
    "Cline",
    "CrewAI",
    "Browser Use",
  ],
});

type Tool = {
  name: string;
  oneLine: string;
  docs: string;
  installPrompt: string;
  usePrompt: string;
  Icon: typeof Bot;
};

const tools: Tool[] = [
  {
    name: "Pipecat",
    oneLine: "Cria agentes que conversam por voz em tempo real.",
    docs: "https://github.com/pipecat-ai/pipecat",
    installPrompt:
      "Quero instalar Pipecat para testar um agente de voz. Leia a documentação oficial, veja se meu computador ou VPS atende aos requisitos, crie um ambiente isolado e rode um exemplo mínimo. Explique cada etapa de forma simples. Antes de usar qualquer serviço pago, me mostre as opções e os custos.",
    usePrompt:
      "O Pipecat já está instalado. Me ajude a criar um agente que recebe minha voz, responde em português e funciona apenas em ambiente de teste. Me diga quais informações você precisa antes de começar.",
    Icon: Mic,
  },
  {
    name: "Cline",
    oneLine: "Coloca um agente de programação dentro do seu editor de código.",
    docs: "https://docs.cline.bot/getting-started/installing-cline",
    installPrompt:
      "Quero instalar o Cline no meu computador. Descubra qual editor eu uso, instale a extensão oficial e me guie para configurar um modelo de IA. Não altere nenhum arquivo de projeto antes de me mostrar o plano.",
    usePrompt:
      "Estou usando o Cline. Analise este projeto e me explique, em linguagem simples, como ele funciona. Depois, me sugira três melhorias pequenas. Não faça alterações sem minha aprovação.",
    Icon: Code2,
  },
  {
    name: "Postiz",
    oneLine: "Organiza e agenda conteúdo para redes sociais.",
    docs: "https://docs.postiz.com/quickstart",
    installPrompt:
      "Quero avaliar o Postiz para organizar conteúdo nas redes sociais. Leia a documentação oficial, veja se meu VPS tem Docker e recursos suficientes e me apresente um plano de instalação passo a passo. Não conecte nenhuma rede social sem minha autorização.",
    usePrompt:
      "O Postiz já está pronto. Me ensine a criar um calendário de testes com três posts. Não publique nada. Quero apenas deixar os posts salvos como rascunho para eu revisar.",
    Icon: CalendarDays,
  },
  {
    name: "CrewAI",
    oneLine: "Organiza vários agentes de IA trabalhando em uma tarefa.",
    docs: "https://docs.crewai.com/en/installation",
    installPrompt:
      "Quero instalar CrewAI do jeito mais simples possível. Verifique minha versão do Python, crie um ambiente isolado e siga a documentação oficial. Monte um exemplo pequeno com dois agentes e explique o que cada um faz. Nunca coloque chaves de API no código ou no Git.",
    usePrompt:
      "Quero usar CrewAI para pesquisar um tema e transformar a pesquisa em um resumo. Crie um fluxo simples com um agente pesquisador e outro revisor. Primeiro me mostre o plano e só depois execute.",
    Icon: UsersRound,
  },
  {
    name: "Browser Use",
    oneLine: "Permite que um agente navegue na web de forma controlada.",
    docs: "https://github.com/browser-use/browser-use",
    installPrompt:
      "Quero instalar Browser Use para testes seguros de navegação. Siga a documentação oficial, crie um ambiente isolado e faça uma demonstração apenas de leitura em um site público. Não faça login, não envie formulários e não use nenhuma senha.",
    usePrompt:
      "Use Browser Use apenas para pesquisar estas três páginas públicas e me devolver uma tabela com título, resumo e link. Não faça login, não clique em botões de compra e não envie dados.",
    Icon: Globe2,
  },
  {
    name: "Firecrawl",
    oneLine: "Extrai conteúdo público da web para pesquisa e bases de conhecimento.",
    docs: "https://docs.firecrawl.dev/contributing/self-host",
    installPrompt:
      "Quero avaliar Firecrawl para uma base de conhecimento. Leia o guia oficial de self-hosting, verifique os requisitos de Docker e recursos e me mostre a arquitetura mínima. Não faça coleta em massa e não tente contornar bloqueios de sites.",
    usePrompt:
      "Use Firecrawl apenas nestas URLs públicas para criar um resumo por página. Respeite os termos dos sites, limite a coleta às URLs que eu fornecer e me mostre o resultado antes de salvar qualquer dado.",
    Icon: Flame,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Como instalar ferramentas para agentes de IA",
  description:
    "Guia simples para usar um agente de programação na instalação e no primeiro teste de ferramentas de IA.",
  url: `${SITE.url}/ferramentas-agentes-ia`,
  step: [
    {
      "@type": "HowToStep",
      name: "Escolha uma ferramenta",
      text: "Comece pela ferramenta que resolve o problema que você tem agora.",
    },
    {
      "@type": "HowToStep",
      name: "Envie o prompt de instalação",
      text: "Copie o prompt da ferramenta e envie para seu agente de programação.",
    },
    {
      "@type": "HowToStep",
      name: "Faça um teste seguro",
      text: "Use o prompt de primeiro uso e só conecte contas ou dados reais depois de revisar.",
    },
  ],
};

function Prompt({ label, text }: { label: string; text: string }) {
  return (
    <div className="border border-[--border] bg-black/20 p-4">
      <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[--accent]">
        <Terminal className="h-3.5 w-3.5" strokeWidth={1.5} />
        {label}
      </div>
      <p className="text-sm leading-6 text-white/70">{text}</p>
    </div>
  );
}

export default function FerramentasAgentesIaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen bg-[#08081a] pt-20">
        <div className="fixed inset-0 grid-bg opacity-[0.025] pointer-events-none" />

        <section className="relative overflow-hidden border-b border-[--border] px-4 py-16 sm:px-8 sm:py-22">
          <div className="absolute -right-24 -top-40 h-[420px] w-[420px] rounded-full bg-[--accent] opacity-[0.07] blur-[120px]" />
          <div className="relative mx-auto max-w-5xl">
            <Link
              href="/"
              className="mb-9 inline-flex items-center gap-2 text-xs text-white/45 hover:text-[--accent]"
            >
              Hernando.ia
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              Ferramentas
            </Link>
            <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[--accent]">
                  Chegou pelo Reels?
                </p>
                <h1 className="max-w-3xl text-4xl font-bold leading-[0.96] tracking-[-0.05em] text-white sm:text-6xl">
                  Instale uma ferramenta de IA mesmo sem saber programar.
                </h1>
              </div>
              <p className="max-w-md text-base leading-7 text-white/55">
                Escolha uma ferramenta abaixo. Copie o prompt de instalação e envie para o seu agente de IA.
              </p>
            </div>
          </div>
        </section>

        <section className="relative border-b border-[--border] bg-white/[0.025] px-4 py-7 sm:px-8">
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
            {[
              ["1", "Escolha", "Comece por uma ferramenta."],
              ["2", "Instale", "Envie o primeiro prompt ao agente."],
              ["3", "Teste", "Use o segundo prompt em modo seguro."],
            ].map(([number, title, text]) => (
              <div key={number} className="flex gap-4">
                <span className="text-2xl font-bold text-[--accent]">{number}</span>
                <div>
                  <h2 className="text-sm font-semibold text-white">{title}</h2>
                  <p className="mt-1 text-sm leading-5 text-white/45">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative px-4 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
              Escolha pelo que você quer fazer.
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {tools.map((tool) => {
                const Icon = tool.Icon;
                return (
                  <article key={tool.name} className="border border-[--border] bg-white/[0.02] p-6">
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center border border-[--accent]/35 bg-[--accent]/10 text-[--accent]">
                          <Icon className="h-5 w-5" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold tracking-[-0.035em] text-white">{tool.name}</h3>
                          <p className="mt-1 text-sm text-white/50">{tool.oneLine}</p>
                        </div>
                      </div>
                      <a
                        href={tool.docs}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Abrir documentação oficial de ${tool.name}`}
                        className="text-white/40 hover:text-[--accent]"
                      >
                        <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                      </a>
                    </div>
                    <div className="mt-6 grid gap-3">
                      <Prompt label="1. Instalar" text={tool.installPrompt} />
                      <Prompt label="2. Usar depois de instalar" text={tool.usePrompt} />
                    </div>
                    <a
                      href={tool.docs}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[--accent] hover:text-white"
                    >
                      Abrir documentação oficial
                      <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative border-y border-[--border] bg-[--accent] px-4 py-12 text-[--accent-foreground] sm:px-8">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[auto_1fr] md:items-center">
            <ShieldCheck className="h-11 w-11" strokeWidth={1.3} />
            <div>
              <h2 className="text-2xl font-bold tracking-[-0.04em]">Antes de usar em contas reais</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-black/70 sm:text-base">
                Não envie senhas. Não exponha chaves de API. E não deixe o agente publicar, comprar ou conectar contas sem você confirmar.
              </p>
            </div>
          </div>
        </section>

        <section className="relative px-4 py-14 text-center sm:px-8 sm:py-18">
          <div className="mx-auto max-w-2xl">
            <Bot className="mx-auto h-9 w-9 text-[--accent]" strokeWidth={1.4} />
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.045em] text-white sm:text-4xl">
              Comece pequeno. Teste. Depois evolua.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/55">
              Você não precisa entender tudo antes. Só precisa pedir um plano, acompanhar a instalação e validar o primeiro teste.
            </p>
            <Link
              href="/blog"
              className="mt-8 inline-flex items-center gap-2 border border-[--accent] bg-[--accent] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black hover:bg-transparent hover:text-[--accent]"
            >
              Ver conteúdos de IA
              <Check className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
