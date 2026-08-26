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
  title: "6 ferramentas para agentes de IA",
  description:
    "Guia direto para instalar Pipecat, Cline, Postiz, CrewAI, Browser Use e Firecrawl usando seu próprio agente de IA.",
  path: "/ferramentas-agentes-ia",
  ogImage:
    "/api/og?title=6+ferramentas+para+agentes+de+IA&subtitle=Guia+direto+para+instalar+com+seu+agente",
  tags: [
    "agentes de IA",
    "ferramentas de IA",
    "automação",
    "Cline",
    "CrewAI",
    "Browser Use",
    "Firecrawl",
  ],
});

type Tool = {
  name: string;
  repo: string;
  description: string;
  use: string;
  goodFor: string;
  attention: string;
  prompt: string;
  docs: string;
  Icon: typeof Bot;
};

const tools: Tool[] = [
  {
    name: "Pipecat",
    repo: "pipecat-ai/pipecat",
    description: "Framework open source para agentes de voz e aplicações de IA em tempo real.",
    use: "Use quando seu agente precisa ouvir, responder por voz ou conversar em tempo real.",
    goodFor: "Atendimento por voz, assistentes de áudio e experiências multimodais.",
    attention: "Normalmente envolve provedor de voz, modelo de IA e infraestrutura para rodar com estabilidade.",
    prompt:
      "Quero criar um agente de voz com Pipecat. Leia a documentação oficial, avalie meu computador ou VPS, monte um ambiente isolado com uv e me entregue um exemplo mínimo funcionando. Antes de usar qualquer serviço pago, me mostre as opções e o custo.",
    docs: "https://github.com/pipecat-ai/pipecat",
    Icon: Mic,
  },
  {
    name: "Cline",
    repo: "cline/cline",
    description: "Agente de programação que trabalha dentro do editor e mostra cada alteração para você revisar.",
    use: "Use para criar, corrigir e entender projetos de código com assistência de IA.",
    goodFor: "Sites, automações, correção de bugs e tarefas de desenvolvimento.",
    attention: "Você precisa configurar um modelo de IA e acompanhar permissões, comandos e alterações de código.",
    prompt:
      "Quero instalar e configurar o Cline no meu editor. Identifique meu editor, instale a extensão oficial, me explique como conectar um provedor de modelo e deixe o modo de revisão ativado. Não altere nenhum projeto sem me mostrar o plano primeiro.",
    docs: "https://docs.cline.bot/getting-started/installing-cline",
    Icon: Code2,
  },
  {
    name: "Postiz",
    repo: "gitroomhq/postiz-app",
    description: "Ferramenta de agendamento e gestão de conteúdo para redes sociais, com opção de hospedar por conta própria.",
    use: "Use para organizar calendário, preparar posts e centralizar a publicação em redes sociais.",
    goodFor: "Times de conteúdo, rotina de posts e operação com várias redes.",
    attention: "A instalação própria pede Docker, banco de dados e conexão autorizada com cada rede social.",
    prompt:
      "Quero avaliar o Postiz para organizar posts nas redes sociais. Leia a documentação oficial de self-hosting, verifique se meu VPS tem Docker e recursos suficientes e me entregue um plano de instalação. Não publique nada e não conecte redes sem minha autorização.",
    docs: "https://docs.postiz.com/quickstart",
    Icon: CalendarDays,
  },
  {
    name: "CrewAI",
    repo: "crewAIInc/crewAI",
    description: "Framework em Python para organizar vários agentes de IA com funções e tarefas definidas.",
    use: "Use quando uma tarefa grande pode ser dividida entre pesquisa, análise, escrita e revisão.",
    goodFor: "Pesquisa estruturada, operações com múltiplos agentes e fluxos repetíveis.",
    attention: "Não substitui uma boa definição de processo. Você ainda precisa decidir o objetivo, os dados e quem aprova o resultado.",
    prompt:
      "Quero testar CrewAI em um projeto simples. Verifique minha versão do Python, crie um ambiente com uv, siga a instalação oficial e monte um exemplo pequeno com dois agentes. Explique onde entram as chaves de API e não coloque nenhuma chave no código ou no Git.",
    docs: "https://docs.crewai.com/en/installation",
    Icon: UsersRound,
  },
  {
    name: "Browser Use",
    repo: "browser-use/browser-use",
    description: "Biblioteca para dar acesso controlado à web para agentes de IA.",
    use: "Use quando o agente precisa navegar, ler páginas ou executar uma tarefa online permitida.",
    goodFor: "Pesquisa na web, testes de sites e automações guiadas no navegador.",
    attention: "Automação de navegador exige limites claros. Nunca entregue senhas ao agente e revise ações que enviam, publicam ou compram algo.",
    prompt:
      "Quero usar Browser Use no meu agente. Siga a documentação oficial com uv, conecte em um navegador de teste e faça uma demonstração segura apenas de leitura. Antes de permitir logins, envios ou compras, me peça confirmação explícita.",
    docs: "https://github.com/browser-use/browser-use",
    Icon: Globe2,
  },
  {
    name: "Firecrawl",
    repo: "firecrawl/firecrawl",
    description: "API para pesquisar, extrair e preparar conteúdo da web para fluxos de IA.",
    use: "Use quando você precisa transformar páginas em conteúdo mais fácil de pesquisar e processar.",
    goodFor: "Bases de conhecimento, pesquisa em escala e extração de conteúdo público.",
    attention: "A versão self-hosted é uma operação maior. Ela usa serviços de apoio e precisa respeitar termos dos sites e limites de acesso.",
    prompt:
      "Quero avaliar Firecrawl para extrair conteúdo público para uma base de conhecimento. Leia o guia oficial de self-hosting, confira os requisitos de Docker e recursos, e me apresente a arquitetura mínima. Não faça coleta em massa nem contorne bloqueios de sites.",
    docs: "https://docs.firecrawl.dev/contributing/self-host",
    Icon: Flame,
  },
];

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ferramentas para agentes de IA",
  description:
    "Guia em português para entender e instalar ferramentas de agentes de IA com apoio de um agente de programação.",
  url: `${SITE.url}/ferramentas-agentes-ia`,
  itemListElement: tools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.name,
    url: tool.docs,
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Preciso instalar todas as ferramentas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não. Escolha a ferramenta pelo problema. Cline ajuda a programar, Browser Use navega na web, CrewAI organiza múltiplos agentes, Postiz ajuda no calendário social, Pipecat trabalha com voz e Firecrawl extrai conteúdo da web.",
      },
    },
    {
      "@type": "Question",
      name: "Posso pedir para um agente de IA instalar essas ferramentas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. Diga o objetivo, peça para ele seguir a documentação oficial, criar um ambiente isolado e mostrar o plano antes de executar. Revise permissões, integrações, custos e qualquer ação externa.",
      },
    },
    {
      "@type": "Question",
      name: "Essas ferramentas são gratuitas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Grande parte é open source, mas o uso pode exigir computador ou VPS, modelos de IA, serviços de voz, banco de dados ou APIs. Confirme os custos e limites atuais na documentação oficial antes de colocar em produção.",
      },
    },
  ],
};

function PromptBox({ prompt }: { prompt: string }) {
  return (
    <div className="mt-6 border border-[--border] bg-black/20 p-4">
      <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[--accent]">
        <Terminal className="h-3.5 w-3.5" strokeWidth={1.5} />
        Prompt para copiar no seu agente
      </div>
      <p className="text-sm leading-6 text-white/75">{prompt}</p>
    </div>
  );
}

export default function FerramentasAgentesIaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen bg-[#08081a] pt-20">
        <div className="fixed inset-0 grid-bg opacity-[0.025] pointer-events-none" />

        <section className="relative overflow-hidden border-b border-[--border] px-4 py-18 sm:px-8 sm:py-24">
          <div className="absolute -right-24 -top-40 h-[420px] w-[420px] rounded-full bg-[--accent] opacity-[0.07] blur-[120px]" />
          <div className="relative mx-auto max-w-5xl">
            <Link
              href="/"
              className="mb-10 inline-flex items-center gap-2 text-xs text-white/45 hover:text-[--accent]"
            >
              Hernando.ia
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              Ferramentas
            </Link>
            <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[--accent]">
                  Guia rápido para agentes de IA
                </p>
                <h1 className="max-w-3xl text-4xl font-bold leading-[0.96] tracking-[-0.05em] text-white sm:text-6xl">
                  6 ferramentas que deixam seu agente mais capaz.
                </h1>
              </div>
              <p className="max-w-md text-base leading-7 text-white/55">
                Você não precisa instalar tudo. Escolha o problema, copie o prompt e peça para seu agente seguir a documentação oficial.
              </p>
            </div>
          </div>
        </section>

        <section className="relative border-b border-[--border] bg-white/[0.025] px-4 py-7 sm:px-8">
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
            {[
              ["1", "Escolha uma ferramenta", "Comece pelo problema que quer resolver."],
              ["2", "Copie o prompt", "Dê um objetivo claro para o seu agente."],
              ["3", "Revise antes de usar", "Confirme permissões, custos e integrações."],
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

        <section className="relative px-4 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
                Qual delas você precisa agora?
              </h2>
              <p className="mt-3 text-white/50">
                Leia em menos de um minuto. Depois, use o prompt pronto no Cline, Claude Code, Codex ou outro agente que você usa.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {tools.map((tool) => {
                const Icon = tool.Icon;
                return (
                  <article
                    key={tool.name}
                    className="group border border-[--border] bg-white/[0.02] p-6 transition-colors hover:border-[--accent]/60 hover:bg-white/[0.045]"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center border border-[--accent]/35 bg-[--accent]/10 text-[--accent]">
                          <Icon className="h-5 w-5" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold tracking-[-0.035em] text-white">{tool.name}</h3>
                          <p className="mt-0.5 font-mono text-[10px] text-white/35">{tool.repo}</p>
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
                    <p className="mt-5 text-sm leading-6 text-white/60">{tool.description}</p>
                    <dl className="mt-6 space-y-4 border-t border-[--border] pt-5 text-sm">
                      <div>
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[--accent]">Use se você quer</dt>
                        <dd className="mt-1 leading-6 text-white/70">{tool.use}</dd>
                      </div>
                      <div>
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[--accent]">Funciona bem para</dt>
                        <dd className="mt-1 leading-6 text-white/70">{tool.goodFor}</dd>
                      </div>
                      <div>
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">Atenção</dt>
                        <dd className="mt-1 leading-6 text-white/45">{tool.attention}</dd>
                      </div>
                    </dl>
                    <PromptBox prompt={tool.prompt} />
                    <a
                      href={tool.docs}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[--accent] hover:text-white"
                    >
                      Ver documentação oficial
                      <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative border-y border-[--border] bg-[--accent] px-4 py-14 text-[--accent-foreground] sm:px-8">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[auto_1fr] md:items-center">
            <ShieldCheck className="h-12 w-12" strokeWidth={1.3} />
            <div>
              <h2 className="text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Regra simples antes de instalar</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-black/70 sm:text-base">
                Peça um plano antes da execução. Não envie senhas, não exponha chaves de API e não deixe o agente publicar, comprar ou conectar contas sem sua confirmação.
              </p>
            </div>
          </div>
        </section>

        <section className="relative px-4 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[--accent]">Dúvidas rápidas</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-white">Antes de sair instalando</h2>
            </div>
            <div className="space-y-5">
              <div className="border-l-2 border-[--accent] pl-5">
                <h3 className="font-semibold text-white">Preciso de todas?</h3>
                <p className="mt-2 text-sm leading-6 text-white/55">Não. Comece com uma. Escolha pelo problema que você quer resolver agora.</p>
              </div>
              <div className="border-l-2 border-[--accent] pl-5">
                <h3 className="font-semibold text-white">Isso tem custo?</h3>
                <p className="mt-2 text-sm leading-6 text-white/55">Muitas são open source. Mesmo assim, podem exigir modelo de IA, API, VPS, banco de dados ou serviço de voz. Confirme os custos atuais antes de usar em produção.</p>
              </div>
              <div className="border-l-2 border-[--accent] pl-5">
                <h3 className="font-semibold text-white">Qual agente pode instalar?</h3>
                <p className="mt-2 text-sm leading-6 text-white/55">Um agente de programação com acesso ao terminal e ao projeto. O importante é pedir ambiente isolado, documentação oficial e um teste antes de liberar para uso real.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-t border-[--border] px-4 py-16 text-center sm:px-8">
          <div className="mx-auto max-w-2xl">
            <Bot className="mx-auto h-9 w-9 text-[--accent]" strokeWidth={1.4} />
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.045em] text-white sm:text-4xl">
              Agente não é mágica. É processo bem definido.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/55">
              Comece pequeno, teste em ambiente seguro e só depois conecte dados ou contas reais.
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
