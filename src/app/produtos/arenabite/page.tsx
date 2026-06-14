import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "ArenaBite — Nutrição Tática com IA para Atletas | Hernando.ia",
  description:
    "Scanner IA do prato em 3 segundos + timeline preditiva do que comer e quando. Para Beach Tennis, Futevôlei, CrossFit, Corrida. App com plano gratuito.",
  openGraph: {
    title: "ArenaBite — Nutrição Tática com IA para Atletas",
    description:
      "Foto do prato vira análise nutricional em 3s. Timeline preditiva: o que comer e quando, pro seu esporte. App gratuito com scanner IA.",
    images: ["/og-arenabite.png"],
  },
};

// ── Types ───────────────────────────────────────────────────────────────

interface Step {
  number: string;
  title: string;
  description: string;
}

interface Sport {
  emoji: string;
  name: string;
  description: string;
}

interface Feature {
  emoji: string;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// ── Data ────────────────────────────────────────────────────────────────

const steps: Step[] = [
  {
    number: "01",
    title: "Conta seu esporte",
    description:
      "Em 60 segundos. Onboarding rápido pra entender como você treina e compete — modalidade, intensidade, frequência.",
  },
  {
    number: "02",
    title: "Recebe a timeline",
    description:
      "Sabe exatamente o que comer e quando — pré-treino, pós-prova, recovery. Sem achismo. A IA monta o plano tático baseado no seu esporte.",
  },
  {
    number: "03",
    title: "Escaneia a refeição",
    description:
      "Foto do prato. A IA analisa macros, calorias, proteína, carbo e gordura em 3 segundos — e te diz se aquilo serve pro seu objetivo.",
  },
  {
    number: "04",
    title: "Evolui de verdade",
    description:
      "Streaks, conquistas, radar de alimentação limpa e estatísticas. Performance virou jogo — e você está ganhando.",
  },
];

const sports: Sport[] = [
  {
    emoji: "🎾",
    name: "Beach Tennis",
    description:
      "Sets longos na areia exigem energia constante e hidratação inteligente.",
  },
  {
    emoji: "🏐",
    name: "Futevôlei",
    description:
      "Explosão, agilidade e recuperação entre os jogos da roda.",
  },
  {
    emoji: "🏐",
    name: "Vôlei de Praia",
    description:
      "Estratégia nutricional pra rallys intensos sob o sol.",
  },
  {
    emoji: "💪",
    name: "CrossFit",
    description:
      "WODs intensos exigem timing exato de proteína e carbo.",
  },
  {
    emoji: "🏃",
    name: "Corrida & Endurance",
    description:
      "Carga de carbo, hidratação e gel timing pra provas longas.",
  },
];

const features: Feature[] = [
  {
    emoji: "📸",
    title: "Scanner IA de Refeição",
    description:
      "Foto vira análise nutricional em 3 segundos. Macros, calorias e qualidade da refeição — sem digitar nada.",
  },
  {
    emoji: "⏱️",
    title: "Timeline Preditiva",
    description:
      "Sabe o que comer e quando — pré-treino, durante a prova, pós-jogo. O app monta a estratégia nutricional completa.",
  },
  {
    emoji: "🎯",
    title: "Metas por Esporte",
    description:
      "Macros calibrados pra sua modalidade. Beach Tennis não é CrossFit. Cada esporte tem sua estratégia.",
  },
  {
    emoji: "📊",
    title: "Estatísticas PRO",
    description:
      "Calorias diárias, evolução de macros, streak de consistência e radar de alimentação limpa — tudo no painel.",
  },
  {
    emoji: "🔔",
    title: "Alertas Inteligentes",
    description:
      "Notificações no momento exato: hora de comer, hidratar, recuperar. O app te lembra antes que o corpo cobre.",
  },
  {
    emoji: "🏆",
    title: "Conquistas & Streaks",
    description:
      "Gamificação real. Streak de dias limpos, badges de consistência. Performance virou jogo.",
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "Eu vivia improvisando antes de prova. Agora abro o app, sigo a timeline e simplesmente performo melhor. Mudou minha relação com comida.",
    author: "Marina S.",
    role: "Maratonista, sub-3h30",
  },
  {
    quote:
      "Jogava beach tennis e no segundo set caía. Achei que era condicionamento. Era nutrição errada. O ArenaBite me mostrou o que comer entre os sets.",
    author: "Pedro H.",
    role: "Beach Tennis, competitivo",
  },
  {
    quote:
      "Scanner de refeição é bizarro de rápido. Tiro foto do prato e em 3 segundos ele me diz se tá bom ou se preciso ajustar.",
    author: "Carla M.",
    role: "CrossFit, 5x semana",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "O que é o ArenaBite?",
    answer:
      "ArenaBite é um app de nutrição tática com IA para atletas. Ele entrega uma timeline diária com o que comer e quando, scanner de refeições por foto, alertas de timing e estratégia personalizada para Beach Tennis, Futevôlei, Vôlei de Praia, CrossFit e Corrida.",
  },
  {
    question: "Preciso pagar para usar?",
    answer:
      "Não. O plano Free é gratuito para sempre e inclui timeline diária do seu esporte, 5 scans de refeição por mês e alertas de timing nutricional. Se quiser scans ilimitados e estatísticas avançadas, o plano PRO custa R$19,90/mês.",
  },
  {
    question: "Como o scanner de refeição funciona?",
    answer:
      "Você tira uma foto do seu prato com a câmera do celular. Em 3 segundos, a IA identifica os alimentos, calcula calorias, proteína, carboidrato e gordura, e te diz se aquela refeição está alinhada com seu objetivo e momento do dia (pré-treino, pós-prova, etc).",
  },
  {
    question: "Quais esportes o ArenaBite cobre?",
    answer:
      "Beach Tennis, Futevôlei, Vôlei de Praia, CrossFit e Corrida/Endurance. Cada modalidade tem metas de macros, timing e estratégia nutricional específicos — não é plano genérico de dieta.",
  },
  {
    question: "Preciso de nutricionista além do app?",
    answer:
      "O ArenaBite é uma ferramenta de performance, não substitui acompanhamento médico. Ele te dá a estratégia nutricional tática baseada no seu esporte — o que comer e quando. Para dietas restritivas ou condições de saúde específicas, mantenha acompanhamento profissional.",
  },
  {
    question: "Posso cancelar o PRO a qualquer momento?",
    answer:
      "Sim. Sem fidelidade. Cancele quando quiser e seu plano volta para o Free automaticamente — você mantém seu histórico e dados.",
  },
];

// ── Page ─────────────────────────────────────────────────────────────────

export default function ArenaBitePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-zinc-100">
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-950 text-sm text-zinc-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Nutrição Tática com IA para Atletas
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Performance começa no{" "}
            <span className="text-emerald-400">prato certo</span>
            , na hora certa
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10">
            O ArenaBite te diz exatamente{" "}
            <strong className="text-zinc-200">o que comer</strong> e{" "}
            <strong className="text-zinc-200">quando comer</strong> pra cada
            treino, prova ou jogo. Foto do prato, IA analisa em 3 segundos,
            você performa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://arenabite.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-400 text-black font-semibold hover:bg-emerald-300 transition-colors"
            >
              Começar grátis
              <span className="text-black/60">→</span>
            </a>
            <a
              href="https://arenabite.lovable.app/calculadora"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors"
            >
              Testar calculadora grátis
              <span className="text-zinc-600">↓</span>
            </a>
          </div>
          <p className="text-xs text-zinc-600 mt-4">
            Sem cartão de crédito · Sem cadastro pra testar · Cancela quando
            quiser
          </p>
        </section>

        {/* ── Before / After ────────────────────────────────────────── */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="p-8 rounded-2xl border border-zinc-900 bg-zinc-950">
              <div className="text-3xl mb-4">😵‍💫</div>
              <h3 className="text-lg font-semibold text-red-400 mb-4">
                Antes do ArenaBite
              </h3>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-red-400 flex-shrink-0">✗</span>
                  &quot;Será que como banana ou pão antes do treino?&quot;
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 flex-shrink-0">✗</span>
                  Apps genéricos de calorias que ignoram seu esporte
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 flex-shrink-0">✗</span>
                  Cãibra, queda no segundo tempo, recuperação lenta
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 flex-shrink-0">✗</span>
                  Nutricionista esportivo custa R$400/mês
                </li>
              </ul>
            </div>
            {/* After */}
            <div className="p-8 rounded-2xl border border-emerald-900/50 bg-emerald-950/10">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">
                Com ArenaBite
              </h3>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex gap-2">
                  <span className="text-emerald-400 flex-shrink-0">✓</span>
                  Timeline define exatamente o que comer e quando
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400 flex-shrink-0">✓</span>
                  Scanner IA: foto do prato vira análise nutricional em 3s
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400 flex-shrink-0">✓</span>
                  Metas de macros calibradas pro SEU esporte
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400 flex-shrink-0">✓</span>
                  Grátis pra começar. PRO por R$19,90/mês
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Como Funciona ─────────────────────────────────────────── */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs text-emerald-400 uppercase tracking-[0.15em] font-medium mb-3">
              Como Funciona
            </p>
            <h2 className="text-3xl font-bold mb-4">
              4 passos. Zero complicação.
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Do onboarding ao scanner IA — em minutos você está comendo com
              estratégia de atleta.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950 hover:border-zinc-800 transition-colors"
              >
                <span className="text-3xl font-bold text-emerald-400/30">
                  {step.number}
                </span>
                <h3 className="font-semibold text-lg mt-3 mb-2">
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ──────────────────────────────────────────────── */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs text-emerald-400 uppercase tracking-[0.15em] font-medium mb-3">
              O Que Você Ganha
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Tudo que importa. Nada que atrapalha.
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Funcionalidades pensadas pra atleta — não pra dieta genérica.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950 hover:border-zinc-800 transition-colors"
              >
                <div className="text-3xl mb-4">{feat.emoji}</div>
                <h3 className="font-semibold text-lg mb-2">{feat.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Esportes ──────────────────────────────────────────────── */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs text-emerald-400 uppercase tracking-[0.15em] font-medium mb-3">
              Pro Seu Esporte
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Personalizado de verdade.
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Cada modalidade tem timing, terminologia e estratégia próprias.
              Nada de plano genérico.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {sports.map((sport) => (
              <div
                key={sport.name}
                className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950 text-center hover:border-emerald-900/50 hover:bg-emerald-950/5 transition-colors"
              >
                <div className="text-3xl mb-3">{sport.emoji}</div>
                <h3 className="font-semibold text-sm mb-2">{sport.name}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {sport.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pricing ───────────────────────────────────────────────── */}
        <section className="py-20 px-6 max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs text-emerald-400 uppercase tracking-[0.15em] font-medium mb-3">
              Planos
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Comece grátis. Evolua quando quiser.
            </h2>
            <p className="text-zinc-400">
              Sem pegadinha. O plano Free é gratuito pra sempre.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="p-8 rounded-2xl border border-zinc-900 bg-zinc-950">
              <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">
                Plano Free
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">R$0</span>
                <span className="text-zinc-500 text-sm ml-2">
                  Pra sempre
                </span>
              </div>
              <ul className="space-y-3 text-sm text-zinc-400 mb-8">
                <li className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  Timeline diária do seu esporte
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  Scanner IA (5 análises/mês)
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  Alertas de timing nutricional
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  Histórico básico
                </li>
              </ul>
              <a
                href="https://arenabite.lovable.app"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-6 py-3 rounded-xl border border-zinc-700 text-zinc-300 font-medium hover:border-zinc-600 hover:text-white transition-colors"
              >
                Começar grátis
              </a>
            </div>
            {/* PRO */}
            <div className="p-8 rounded-2xl border border-emerald-900/50 bg-emerald-950/10 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-400 text-black text-xs font-semibold">
                MAIS POPULAR
              </div>
              <p className="text-xs text-emerald-400 uppercase tracking-wide mb-2">
                Plano PRO
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">R$19,90</span>
                <span className="text-zinc-500 text-sm ml-2">/mês</span>
              </div>
              <p className="text-xs text-zinc-500 mb-6">
                Menos que uma marmita por mês.
              </p>
              <ul className="space-y-3 text-sm text-zinc-300 mb-8">
                <li className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  Tudo do plano Free
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  Scanner IA ilimitado
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  Estatísticas avançadas
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  Histórico completo
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  Conquistas e streaks PRO
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  Suporte prioritário
                </li>
              </ul>
              <a
                href="https://arenabite.lovable.app"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-6 py-3 rounded-xl bg-emerald-400 text-black font-semibold hover:bg-emerald-300 transition-colors"
              >
                Testar PRO grátis
              </a>
            </div>
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────────────────────── */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs text-emerald-400 uppercase tracking-[0.15em] font-medium mb-3">
              Quem Usa, Fala
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Atletas reais. Resultados reais.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-emerald-400 text-sm">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold">{t.author}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section className="py-20 px-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">
            Dúvidas? A gente responde.
          </h2>
          <p className="text-zinc-400 text-center mb-12">
            Tudo que você precisa saber antes de começar.
          </p>
          <div className="space-y-4">
            {faqItems.map((faq) => (
              <details
                key={faq.question}
                className="group border border-zinc-900 rounded-xl bg-zinc-950"
              >
                <summary className="px-6 py-4 cursor-pointer font-medium text-zinc-200 group-open:text-emerald-400 transition-colors list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-zinc-600 group-open:rotate-45 transition-transform text-lg">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-4 text-zinc-400 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Footer CTA ────────────────────────────────────────────── */}
        <section className="pb-32 px-6 text-center">
          <div className="max-w-xl mx-auto p-8 rounded-2xl border border-emerald-900/30 bg-emerald-950/10">
            <h2 className="text-2xl font-bold mb-3">
              Sua próxima prova começa agora.
            </h2>
            <p className="text-zinc-400 text-sm mb-8">
              Pare de comer no escuro. O ArenaBite monta sua estratégia
              nutricional em minutos — de graça.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://arenabite.lovable.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-400 text-black font-semibold text-lg hover:bg-emerald-300 transition-colors"
              >
                Começar grátis agora →
              </a>
            </div>
            <p className="text-xs text-zinc-600 mt-4">
              Disponível para iOS e Android · App gratuito com scanner IA
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
