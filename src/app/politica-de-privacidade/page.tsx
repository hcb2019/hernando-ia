import type { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";

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
              Última atualização: 29 de junho de 2026
            </p>
          </header>

          <div className="prose-custom text-white/70 space-y-6 text-sm leading-relaxed">
            {/* TL;DR */}
            <section className="border border-border p-6 mb-10">
              <h2 className="text-lg font-semibold text-white/90 mb-3">
                📋 Resumo (TL;DR)
              </h2>
              <ul className="space-y-2 text-white/60">
                <li>📧 Coletamos <strong className="text-white/80">apenas seu email</strong> quando você assina a newsletter</li>
                <li>🍪 <strong className="text-white/80">Não usamos</strong> cookies de rastreamento, analytics, nem anúncios</li>
                <li>🔒 Seus dados <strong className="text-white/80">nunca</strong> são vendidos ou compartilhados com terceiros para marketing</li>
                <li>✉️ Você pode pedir acesso, correção ou exclusão:{" "}
                  <a href="mailto:contato@hernandoia.com" className="text-accent hover:underline">
                    contato@hernandoia.com
                  </a>
                </li>
                <li>🌍 Armazenamos dados nos <strong className="text-white/80">EUA</strong> (Vercel, Redis Cloud, Resend)</li>
                <li>⚖️ Base legal: <strong className="text-white/80">seu consentimento</strong> (Art. 7º, I da LGPD)</li>
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
                      <td className="py-2 pr-4">Nenhum dado pessoal</td>
                      <td className="py-2">—</td>
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
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-white/50">
                <strong>Não compartilhamos</strong> seus dados com terceiros para fins de
                marketing, publicidade ou qualquer finalidade comercial. Não vendemos dados.
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
                    <tr>
                      <td className="py-2 pr-4">Logs de acesso</td>
                      <td className="py-2 pr-4">Até 1 hora</td>
                      <td className="py-2">Padrão Vercel/Cloudflare</td>
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
                Este site <strong>não utiliza cookies não-essenciais</strong>. Não usamos:
              </p>
              <ul className="list-disc ml-6 mt-3 space-y-1 text-white/50">
                <li>Google Analytics ou qualquer serviço de analytics</li>
                <li>Pixel do Facebook/Instagram ou rastreadores de redes sociais</li>
                <li>Cookies de publicidade ou remarketing</li>
              </ul>
              <p className="mt-4 text-white/50">
                O único cookie possível é o de sessão da Cloudflare, de natureza
                estritamente técnica e necessária para proteção contra bots.
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
