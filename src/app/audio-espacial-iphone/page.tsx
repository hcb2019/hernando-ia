import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Check,
  ChevronRight,
  CircleCheck,
  ExternalLink,
  Info,
  Settings,
  SlidersHorizontal,
  Video,
  Wind,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { generatePageMeta, SITE } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta({
  title: "Como ativar Áudio Espacial no iPhone",
  description:
    "Passo a passo para ativar Áudio Espacial na câmera do iPhone, reduzir ruído de vento e editar a voz no vídeo. Veja os iPhones compatíveis.",
  path: "/audio-espacial-iphone",
  ogImage: "/images/iphone-audio-espacial-guia.png",
  tags: [
    "áudio espacial iPhone",
    "como reduzir ruído vídeo iPhone",
    "áudio espacial câmera iPhone",
    "mixagem de áudio iPhone",
    "iPhone 16",
  ],
});

const APPLE_DOCS = "https://support.apple.com/guide/iphone/change-sound-recording-options-iph31c1ca6c7/ios";

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Como ativar Áudio Espacial na câmera do iPhone",
  description:
    "Guia para ativar Áudio Espacial nas configurações da câmera, gravar um vídeo e ajustar o som no app Fotos quando disponível.",
  url: `${SITE.url}/audio-espacial-iphone`,
  image: `${SITE.url}/images/iphone-audio-espacial-guia.png`,
  step: [
    {
      "@type": "HowToStep",
      name: "Abrir as configurações da câmera",
      text: "Abra Ajustes, toque em Câmera e depois em Gravar Som.",
    },
    {
      "@type": "HowToStep",
      name: "Selecionar Áudio Espacial",
      text: "Em Gravar Som, escolha Áudio Espacial.",
    },
    {
      "@type": "HowToStep",
      name: "Gravar e editar",
      text: "Grave o vídeo normalmente. Depois, abra o vídeo no app Fotos e procure Mixagem de Áudio, se disponível no aparelho e no vídeo.",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quais iPhones gravam vídeo com Áudio Espacial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Segundo o Guia do Usuário do iPhone da Apple, iPhone 16 ou posterior usa Áudio Espacial para gravar vídeo. Modelos anteriores gravam em estéreo.",
      },
    },
    {
      "@type": "Question",
      name: "Áudio Espacial remove todo o ruído do vídeo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não. Em iPhone 16 ou posterior, a Apple informa redução automática de ruído de vento ao gravar em Áudio Espacial ou Estéreo. Para destacar a voz, você pode procurar Mixagem de Áudio no app Fotos, quando o recurso estiver disponível.",
      },
    },
  ],
};

const steps = [
  {
    number: "1",
    title: "Abra os Ajustes",
    text: "No iPhone, entre em Ajustes e toque em Câmera.",
    Icon: Settings,
  },
  {
    number: "2",
    title: "Entre em Gravar Som",
    text: "Dentro de Câmera, toque em Gravar Som e escolha Áudio Espacial.",
    Icon: Camera,
  },
  {
    number: "3",
    title: "Grave o vídeo",
    text: "Abra a Câmera e grave normalmente. A captação já será feita com a opção escolhida.",
    Icon: Video,
  },
  {
    number: "4",
    title: "Ajuste a voz depois",
    text: "No app Fotos, abra o vídeo e toque em Editar. Se aparecer Mixagem de Áudio, teste a opção Studio para priorizar a voz.",
    Icon: SlidersHorizontal,
  },
];

export default function AudioEspacialIphonePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-[#08081a] pt-20">
        <div className="fixed inset-0 grid-bg opacity-[0.025] pointer-events-none" />

        <section className="relative overflow-hidden border-b border-[--border] px-4 py-14 sm:px-8 sm:py-20">
          <div className="relative mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_.72fr] lg:items-center">
            <div>
              <Link href="/" className="mb-8 inline-flex items-center gap-2 text-xs text-white/45 hover:text-[--accent]">
                Hernando.ia
                <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                Dicas de iPhone
              </Link>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[--accent]">Chegou pelo Reels?</p>
              <h1 className="max-w-3xl text-4xl font-bold leading-[0.96] tracking-[-0.05em] text-white sm:text-6xl">
                Grave vídeos no iPhone com áudio mais limpo.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/55 sm:text-lg">
                Ative o Áudio Espacial, reduza ruído de vento e aprenda onde ajustar a voz depois da gravação.
              </p>
            </div>
            <div className="relative mx-auto w-full max-w-[360px] overflow-hidden border border-[--border] bg-white/[0.03]">
              <Image
                src="/images/iphone-audio-espacial-guia.png"
                alt="Pessoa gravando vídeo com a câmera de um iPhone em ambiente externo"
                width={1024}
                height={1792}
                priority
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="relative border-b border-[--border] bg-[--accent] px-4 py-7 text-[--accent-foreground] sm:px-8">
          <div className="mx-auto flex max-w-5xl gap-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.6} />
            <p className="text-sm leading-6 sm:text-base">
              Importante: Áudio Espacial não apaga todos os barulhos. No iPhone 16 ou posterior, a Apple informa redução automática de ruído de vento ao gravar em Áudio Espacial ou Estéreo.
            </p>
          </div>
        </section>

        <section className="relative px-4 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-9 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[--accent]">Passo a passo</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">Ative em menos de um minuto.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {steps.map(({ number, title, text, Icon }) => (
                <article key={number} className="border border-[--border] bg-white/[0.02] p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-[--accent]">{number}</span>
                    <Icon className="h-6 w-6 text-[--accent]" strokeWidth={1.4} />
                  </div>
                  <h3 className="mt-8 text-xl font-bold tracking-[-0.03em] text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/55">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-y border-[--border] bg-white/[0.025] px-4 py-14 sm:px-8">
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
            <div>
              <Wind className="h-8 w-8 text-[--accent]" strokeWidth={1.4} />
              <h2 className="mt-5 text-2xl font-bold tracking-[-0.04em] text-white">Para reduzir ruído de vento</h2>
              <p className="mt-3 text-sm leading-6 text-white/55">
                Deixe Áudio Espacial ou Estéreo selecionado em Gravar Som. Em iPhone 16 ou posterior, a redução de vento é automática por padrão. Se você preferir ouvir mais o ambiente, procure a opção de redução de vento nas mesmas configurações.
              </p>
            </div>
            <div>
              <SlidersHorizontal className="h-8 w-8 text-[--accent]" strokeWidth={1.4} />
              <h2 className="mt-5 text-2xl font-bold tracking-[-0.04em] text-white">Para destacar sua voz</h2>
              <p className="mt-3 text-sm leading-6 text-white/55">
                Depois de gravar, abra o vídeo no app Fotos e toque em Editar. Quando Mixagem de Áudio estiver disponível, teste Studio. Ele pode ajudar a priorizar a voz e diminuir sons do ambiente.
              </p>
            </div>
          </div>
        </section>

        <section className="relative px-4 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="border border-[--accent]/45 bg-[--accent]/10 p-7 sm:p-10">
              <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[--accent]">Compatibilidade</p>
                  <h2 className="mt-3 text-3xl font-bold tracking-[-0.045em] text-white">Funciona no iPhone 16 ou posterior.</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
                    A Apple informa que esses modelos usam Áudio Espacial para gravar vídeo. Modelos anteriores continuam gravando em estéreo. A disponibilidade de Mixagem de Áudio depende do modelo, da versão do iOS e do vídeo gravado.
                  </p>
                </div>
                <CircleCheck className="h-12 w-12 shrink-0 text-[--accent]" strokeWidth={1.3} />
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-t border-[--border] px-4 py-14 text-center sm:px-8 sm:py-18">
          <div className="mx-auto max-w-2xl">
            <Check className="mx-auto h-9 w-9 text-[--accent]" strokeWidth={1.4} />
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.045em] text-white sm:text-4xl">Pronto. Agora faz um teste em um lugar com vento.</h2>
            <p className="mt-4 text-white/55">
              Grave alguns segundos, escute com fones e compare antes e depois. Esse é o jeito mais fácil de perceber a diferença.
            </p>
            <a
              href={APPLE_DOCS}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 border border-[--accent] bg-[--accent] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black hover:bg-transparent hover:text-[--accent]"
            >
              Ver instrução oficial da Apple
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
