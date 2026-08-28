import type { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { ClipboardList, Mail, ShieldBan, Lock, Globe, Scale } from "lucide-react";

export const metadata: Metadata = generatePageMeta({
  title: "Política de Privacidade",
  description:
    "Como o Hernando.ia coleta, usa e protege seus dados pessoais, em conformidade com a LGPD (Lei 13.709/2018).",
  path: "/politica-de-privacidade",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#08081a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-24 pb-24">
          <header className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold glow-text mb-4">
              Política de Privacidade
            </h1>
            <p className="text-white/40 text-sm">
              Última atualização: 28 de agosto de 2026
            </p>
          </header>

          <div className="prose-custom text-white/70 space-y-6 text-sm leading-relaxed">
            {/* TL;DR */}
            <section className="border border-border p-6 mb-10">
              <h2 className="text-lg font-semibold text-white/90 mb-3 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-accent" />
                Resumo (TL;DR)
              </h2>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent/60 flex-shrink-0" />
                  Coletamos <strong className="text-white/80">apenas seu email</strong> quando você assina a newsletter
                </li>
                <li className="flex items-center gap-2">
                  <ShieldBan className="w-4 h-4 text-accent/60 flex-shrink-0" />
                  A publicidade da <strong className="text-white/80">Adcash</strong> só é ativada se você aceitar
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-accent/60 flex-shrink-0" />
                  Não vendemos seus dados pessoais. A publicidade é opcional e pode ser recusada ou revogada
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent/60 flex-shrink-0" />
                  Você pode pedir acesso, correção ou exclusão:{" "}
                  <a href="mailto:contato@hernandoia.com" className="text-accent hover:underline">
                    contato@hernandoia.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-accent/60 flex-shrink-0" />
                  Armazenamos dados nos <strong className="text-white/80">EUA</strong> (Vercel, Redis Cloud, Resend)
                </li>
                <li className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-accent/60 flex-shrink-0" />
                  Base legal: <strong className="text-white/80">seu consentimento</strong> (Art. 7º, I da LGPD)
                </li>
              </ul>
            </section>

            {/* 1. Quem somos */}
            <section>
              <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4">
                1. Quem somos
              </h2>
              <p>
                <strong>Hernando Candido</strong> (pessoa física), operando o site{" "}
                <strong>hernandoia.com</strong>. Este documento explica como tratamos seus
                dados pessoais, em cumprimento à{" "}
                <strong>
                  Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD)
                </strong>
                .
              </p>
            </section>

            {/* 2. Dados coletados */}
            <section>
              <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4">
                2. Quais dados coletamos
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 pr-4 text-white/60 text-xs uppercase">Situação</th>
                      <th className="py-2 pr-4 text-white/60 text-xs uppercase">Dados</th>
                      <th className="py-2 text-white/60 text-xs uppercase">Finalidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Newsletter</td>
                      <td className="py-2 pr-4">Endereço de e-mail</td>
                      <td className="py-2">Envio da newsletter semanal</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Navegação</td>
                      <td className="py-2 pr-4">Preferência de publicidade, IP e identificadores online</td>
                      <td className="py-2">Registrar sua escolha e, se autorizada, entregar publicidade</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3. Uso */}
            <section>
              <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4">
                3. Como usamos seus dados
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 pr-4 text-white/60 text-xs uppercase">Finalidade</th>
                      <th className="py-2 pr-4 text-white/60 text-xs uppercase">Dado</th>
                      <th className="py-2 text-white/60 text-xs uppercase">Base Legal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Newsletter</td>
                      <td className="py-2 pr-4">Email</td>
                      <td className="py-2">Consentimento (Art. 7º, I)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Comprovação</td>
                      <td className="py-2 pr-4">Email + timestamp</td>
                      <td className="py-2">Obrigação legal (Art. 8º, §2º)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Segurança</td>
                      <td className="py-2 pr-4">IP (efêmero)</td>
                      <td className="py-2">Legítimo interesse (Art. 7º, IX)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Publicidade</td>
                      <td className="py-2 pr-4">Preferência, IP e identificadores online</td>
                      <td className="py-2">Consentimento (Art. 7º, I)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. Compartilhamento */}
            <section>
              <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4">
                4. Com quem compartilhamos
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 pr-4 text-white/60 text-xs uppercase">Operador</th>
                      <th className="py-2 pr-4 text-white/60 text-xs uppercase">Serviço</th>
                      <th className="py-2 pr-4 text-white/60 text-xs uppercase">Dados</th>
                      <th className="py-2 text-white/60 text-xs uppercase">País</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Vercel Inc.</td>
                      <td className="py-2 pr-4">Hospedagem</td>
                      <td className="py-2 pr-4">IP (efêmero)</td>
                      <td className="py-2">EUA</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Cloudflare Inc.</td>
                      <td className="py-2 pr-4">CDN, segurança</td>
                      <td className="py-2 pr-4">IP (efêmero)</td>
                      <td className="py-2">Global</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Redis Cloud</td>
                      <td className="py-2 pr-4">Banco de dados</td>
                      <td className="py-2 pr-4">Email</td>
                      <td className="py-2">EUA</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Resend</td>
                      <td className="py-2 pr-4">Envio de email</td>
                      <td className="py-2 pr-4">Email</td>
                      <td className="py-2">EUA</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Adcash</td>
                      <td className="py-2 pr-4">Entrega e medição de publicidade</td>
                      <td className="py-2 pr-4">IP, identificadores online e dados de navegação, somente após opt-in</td>
                      <td className="py-2">Conforme a infraestrutura do fornecedor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-white/50">
                Não vendemos seus dados. Quando você autoriza publicidade, a Adcash trata dados
                necessários para entregar e medir anúncios conforme a própria política de privacidade.
              </p>
            </section>

            {/* 5. Transferência intl */}
            <section>
              <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4">
                5. Transferência internacional (Art. 33)
              </h2>
              <p>
                Seus dados são processados em servidores nos <strong>Estados Unidos</strong> e
                em <strong>borda global (Cloudflare)</strong>. Garantimos:
              </p>
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <li>Operadores com certificação SOC 2, ISO 27001 ou equivalente</li>
                <li>Criptografia em trânsito (TLS 1.3) em todas as comunicações</li>
                <li>Compromisso de notificar você em caso de incidente</li>
              </ul>
            </section>

            {/* 6. Retenção */}
            <section>
              <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4">
                6. Por quanto tempo guardamos
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 pr-4 text-white/60 text-xs uppercase">Dado</th>
                      <th className="py-2 pr-4 text-white/60 text-xs uppercase">Período</th>
                      <th className="py-2 text-white/60 text-xs uppercase">Base</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Email (newsletter)</td>
                      <td className="py-2 pr-4">Até você cancelar</td>
                      <td className="py-2">Consentimento revogável</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Registro de consentimento</td>
                      <td className="py-2 pr-4">5 anos</td>
                      <td className="py-2">Art. 8º, §2º + Res. 15/2024</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Logs de acesso</td>
                      <td className="py-2 pr-4">Até 1 hora</td>
                      <td className="py-2">Padrão Vercel/Cloudflare</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Escolha de publicidade</td>
                      <td className="py-2 pr-4">Até a revogação ou por até 12 meses</td>
                      <td className="py-2">Comprovação e gestão do consentimento</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 7. Direitos */}
            <section>
              <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4">
                7. Seus direitos (Art. 18)
              </h2>
              <ol className="list-decimal ml-6 space-y-2">
                <li><strong>Confirmação</strong> da existência de tratamento</li>
                <li><strong>Acesso</strong> aos seus dados</li>
                <li><strong>Correção</strong> de dados incompletos ou desatualizados</li>
                <li><strong>Anonimização, bloqueio ou eliminação</strong> de dados desnecessários</li>
                <li><strong>Portabilidade</strong> dos dados a outro fornecedor</li>
                <li><strong>Eliminação</strong> dos dados tratados com consentimento</li>
                <li><strong>Informação</strong> sobre compartilhamento com terceiros</li>
                <li><strong>Revogação</strong> do consentimento a qualquer momento</li>
              </ol>
              <p className="mt-4">
                Para exercer qualquer direito:{" "}
                <a href="mailto:contato@hernandoia.com" className="text-accent hover:underline">
                  contato@hernandoia.com
                </a>
                . Respondemos em até <strong>15 dias</strong>.
              </p>
            </section>

            {/* 8. Cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4">
                8. Cookies
              </h2>
              <p>
                Usamos cookies e tecnologias semelhantes estritamente necessários para o site funcionar.
                A Adcash, usada para publicidade, só é carregada após seu <strong>consentimento explícito</strong>.
              </p>
              <p className="mt-4 text-white/50">
                Você pode recusar sem perder o acesso ao conteúdo. Para revogar uma escolha já feita,
                use o botão <strong>“Gerenciar publicidade”</strong> disponível no site; a revogação vale
                no próximo carregamento de página. Consulte também a{" "}
                <a className="text-accent hover:underline" href="https://adcash.com/legal/" target="_blank" rel="noreferrer">
                  política da Adcash
                </a>
                .
              </p>
            </section>

            {/* 9. Segurança */}
            <section>
              <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4">
                9. Segurança
              </h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>Criptografia em trânsito: HTTPS via TLS 1.3</li>
                <li>Acesso restrito: apenas o controlador acessa o banco</li>
                <li>Monitoramento: logs de acesso para detecção de anomalias</li>
              </ul>
            </section>

            {/* 10. Mudanças */}
            <section>
              <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4">
                10. Mudanças nesta política
              </h2>
              <p>
                Alterações materiais serão comunicadas por{" "}
                <strong>e-mail aos assinantes</strong> com pelo menos 7 dias de antecedência.
                A versão atualizada sempre estará em{" "}
                <code className="text-accent text-xs bg-surface px-1 py-0.5 rounded">
                  /politica-de-privacidade
                </code>
                .
              </p>
            </section>

            {/* 11. Encarregado */}
            <section className="border border-accent/20 bg-accent/5 p-6 mt-10">
              <h2 className="text-lg font-semibold text-white/90 mb-2">
                11. Encarregado (DPO)
              </h2>
              <p className="text-white/70">
                <strong>Hernando Candido</strong>
              </p>
              <p>
                <a href="mailto:contato@hernandoia.com" className="text-accent hover:underline">
                  contato@hernandoia.com
                </a>
              </p>
              <p className="text-white/40 text-xs mt-2">
                Resposta em até 3 dias úteis. Canal preferencial: email.
              </p>
            </section>

            <p className="text-white/30 text-xs mt-12 pt-8 border-t border-border">
              Esta política está em conformidade com a Lei nº 13.709/2018 (LGPD) e
              resoluções da ANPD aplicáveis. Versão 1.0.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
