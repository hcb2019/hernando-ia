import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "Agente de IA Hermes — Assistente Inteligente para Empresas",
  description: "Automatize atendimento, integre WhatsApp e Instagram, responda clientes 24h por dia. O Hermes é um agente de IA que trabalha para o seu negócio.",
  openGraph: {
    title: "Hermes Agent — Inteligência Artificial que Trabalha para Sua Empresa",
    description: "Atendimento automático, integração com WhatsApp e Instagram, respostas inteligentes 24h. Sem robô genérico — um agente que entende seu negócio.",
    images: ["/og-hermes.png"],
  },
};

interface Capability {
  icon: string;
  title: string;
  description: string;
}

interface UseCase {
  emoji: string;
  title: string;
  problem: string;
  solution: string;
}

const capabilities: Capability[] = [
  {
    icon: "💬",
    title: "Atendimento Automático no WhatsApp",
    description: "Responde clientes automaticamente no WhatsApp — individual ou em grupos. Identifica o que é relevante pro seu negócio e ignora o resto. Zero spam, zero resposta fora de contexto.",
  },
  {
    icon: "📸",
    title: "Instagram Inteligente",
    description: "Responde comentários automaticamente com palavras-chave do seu nicho. Transforma seguidores em clientes sem precisar de uma pessoa olhando a tela o dia todo.",
  },
  {
    icon: "🔗",
    title: "Integração com Seus Sistemas",
    description: "Conecta com Google Agenda, planilhas, sistemas de pagamento, e-mail. O agente centraliza tudo que sua empresa já usa em um lugar só.",
  },
  {
    icon: "🧠",
    title: "Aprende Seu Negócio",
    description: "Não é um robô genérico. O Hermes é configurado com as regras, produtos, preços e tom de voz da SUA empresa. Parece que é você respondendo.",
  },
  {
    icon: "🌐",
    title: "Sites Profissionais",
    description: "Cria landing pages e sites completos automaticamente — com design premium, fotos reais e integração com WhatsApp. Do zero ao ar em horas.",
  },
  {
    icon: "📊",
    title: "Relatórios e Análise",
    description: "Gera relatórios do que os clientes mais perguntam, horários de pico, produtos mais pedidos. Dados reais pra tomar decisões melhores.",
  },
];

const useCases: UseCase[] = [
  {
    emoji: "🐾",
    title: "Pet Shop",
    problem: "Mensagens a toda hora: 'Tem banho amanhã?', 'Quanto custa a tosa?', 'Aceita cartão?'. A dona não dá conta de responder enquanto atende os animais.",
    solution: "Hermes entra no WhatsApp e responde automaticamente sobre horários, preços e serviços. Se a pergunta for complexa, encaminha pra dona. O resto ele resolve sozinho.",
  },
  {
    emoji: "💉",
    title: "Clínica de Estética",
    problem: "Pacientes perguntam a mesma coisa 20 vezes por dia: preço do botox, como agendar, qual procedimento é melhor. A recepcionista passa o dia copiando e colando.",
    solution: "Hermes responde sobre cada procedimento com as informações certas, envia link de agendamento e até manda fotos de antes/depois. A recepcionista volta a ser recepcionista.",
  },
  {
    emoji: "⚖️",
    title: "Escritório de Advocacia",
    problem: "Potenciais clientes chegam a qualquer hora. Se ninguém responde, vão pro próximo. Mas o advogado não pode parar de atender pra ficar no WhatsApp.",
    solution: "Hermes faz a triagem: pergunta área do direito, urgência, cidade. Se for caso pra agendar, já manda o link da agenda. Se não for, explica por que. O advogado só fala com quem realmente importa.",
  },
  {
    emoji: "🍣",
    title: "Restaurante",
    problem: "'Tá aberto hoje?', 'Faz entrega?', 'Tem opção vegana?'. O garçom para de atender as mesas pra responder WhatsApp.",
    solution: "Hermes responde cardápio, horários, taxa de entrega automaticamente. Se quiser fazer pedido, manda o link. O garçom cuida de quem está no salão.",
  },
];

export default function HermesAgentPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-zinc-100">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-950 text-sm text-zinc-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Agente de IA para Empresas
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Um assistente de IA que{" "}
            <span className="text-emerald-400">trabalha</span> para o seu
            negócio
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10">
            Atendimento automático no WhatsApp e Instagram. Integração com seus
            sistemas. Respostas inteligentes 24 horas por dia. Sem robô
            genérico — um agente que entende o que você vende.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5521920032747"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar no WhatsApp
            </a>
            <Link
              href="#como-funciona"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors"
            >
              Como funciona
              <span className="text-zinc-600">↓</span>
            </Link>
          </div>
        </section>

        {/* O que faz */}
        <section id="como-funciona" className="py-20 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">O que o Hermes faz</h2>
          <p className="text-zinc-400 text-center max-w-xl mx-auto mb-16">
            Não é um chatbot genérico. É um agente configurado especificamente
            para o SEU negócio — com suas regras, seus produtos, seu jeito de
            falar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950 hover:border-zinc-800 transition-colors"
              >
                <div className="text-3xl mb-4">{cap.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{cap.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Exemplos reais */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Na prática
          </h2>
          <p className="text-zinc-400 text-center max-w-xl mx-auto mb-16">
            Como diferentes negócios usam o Hermes no dia a dia
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{uc.emoji}</span>
                  <h3 className="font-semibold text-lg">{uc.title}</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-red-400 uppercase tracking-wide font-medium">
                      Problema
                    </span>
                    <p className="text-zinc-400 text-sm mt-1">{uc.problem}</p>
                  </div>
                  <div>
                    <span className="text-xs text-emerald-400 uppercase tracking-wide font-medium">
                      Solução com Hermes
                    </span>
                    <p className="text-zinc-300 text-sm mt-1">{uc.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Como começar */}
        <section className="py-20 px-6 max-w-3xl mx-auto text-center">
          <div className="p-8 rounded-2xl border border-emerald-900/50 bg-emerald-950/20">
            <h2 className="text-2xl font-bold mb-4">Como começa</h2>
            <div className="grid grid-cols-3 gap-6 text-center mb-8 mt-8">
              <div>
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-black font-bold flex items-center justify-center mx-auto mb-3">
                  1
                </div>
                <p className="text-sm text-zinc-300 font-medium">Conversa rápida</p>
                <p className="text-xs text-zinc-500 mt-1">Entendo seu negócio em 15 minutos</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-black font-bold flex items-center justify-center mx-auto mb-3">
                  2
                </div>
                <p className="text-sm text-zinc-300 font-medium">Configuração</p>
                <p className="text-xs text-zinc-500 mt-1">Preparo o agente pro seu contexto</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-black font-bold flex items-center justify-center mx-auto mb-3">
                  3
                </div>
                <p className="text-sm text-zinc-300 font-medium">No ar</p>
                <p className="text-xs text-zinc-500 mt-1">Seu agente começa a trabalhar</p>
              </div>
            </div>
            <a
              href="https://wa.me/5521920032747"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-colors mt-4"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
              Quero um agente para minha empresa
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Preciso saber programar ou instalar alguma coisa?",
                a: "Não. Eu faço toda a instalação e configuração. Você só precisa me dizer como seu negócio funciona.",
              },
              {
                q: "O agente funciona no meu WhatsApp ou preciso de um número novo?",
                a: "O ideal é um número dedicado para o agente (um chip pré-pago de R$30 resolve). Assim as respostas saem com o número da sua empresa, não de um número estranho.",
              },
              {
                q: "O agente responde no grupo de WhatsApp?",
                a: "Sim. Ele entra no seu grupo e responde apenas quando a pergunta for relacionada ao seu negócio. Futebol, política e conversa aleatória ele ignora.",
              },
              {
                q: "E se surgir uma pergunta que o agente não souber responder?",
                a: "Ele não inventa resposta. Se não souber, encaminha pra você ou avisa que vai verificar. Zero alucinação.",
              },
              {
                q: "Quanto custa?",
                a: "O investimento depende da complexidade do seu negócio. Agende uma conversa que em 15 minutos te passo um valor exato — sem compromisso.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group border border-zinc-900 rounded-xl bg-zinc-950"
              >
                <summary className="px-6 py-4 cursor-pointer font-medium text-zinc-200 group-open:text-emerald-400 transition-colors list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-zinc-600 group-open:rotate-45 transition-transform text-lg">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-4 text-zinc-400 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="pb-32 px-6 text-center">
          <p className="text-zinc-500 text-sm mb-4">Não perca mais vendas por falta de resposta</p>
          <a
            href="https://wa.me/5521920032747"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 text-black font-semibold text-lg hover:bg-emerald-400 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
            </svg>
            Falar no WhatsApp
          </a>
        </section>
      </main>
    </>
  );
}
