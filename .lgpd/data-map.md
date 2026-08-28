# Data Map — Inventário de Dados Pessoais

## 1. Newsletter

| Campo | Dado Pessoal? | Sensível? | Finalidade | Base Legal | Retenção |
|---|---|---|---|---|---|
| Email | Sim | Não | Envio de newsletter | Consentimento (Art. 7º, I) | Até revogação |
| subscribedAt | Sim (timestamp) | Não | Registro de consentimento | Obrigação legal (Art. 8º, §2º) | 5 anos |
| confirmedAt | Não (booleano) | — | Controle interno | Legítimo interesse | Até exclusão |
| confirmationToken | Não (hash) | — | Double opt-in | Obrigação legal | Até confirmação |
| unsubscribeToken | Não (hash) | — | Exercício de direito | Obrigação legal (Art. 18, §5º) | Permanente |

**Sistema:** Redis Cloud (Upstash?)
**Localização:** Estados Unidos
**Criptografia:** Em trânsito (TLS), em repouso (desconhecido)
**Acesso:** Apenas via API key no servidor

## 2. Logs de Acesso

| Campo | Dado Pessoal? | Finalidade | Base Legal | Retenção |
|---|---|---|---|---|
| IP | Sim | Segurança, diagnóstico | Legítimo interesse (Art. 7º, IX) | Padrão Vercel (~1h) |
| User-Agent | Não (técnico) | Debug | Legítimo interesse | Padrão Vercel |
| Timestamp | Não | Métricas | Legítimo interesse | Padrão Vercel |

**Sistema:** Vercel Serverless + Cloudflare
**Localização:** Global (Vercel: US, Cloudflare: edge global)
**Acesso:** Logs via dashboard

## 3. Web Vitals (desde 29/06/2026)

| Campo | Dado Pessoal? | Finalidade | Base Legal | Retenção |
|---|---|---|---|---|
| Métricas (LCP, INP, CLS) | Não | Performance | Legítimo interesse | Logs Vercel |
| Página visitada | Não (anônimo) | Performance | Legítimo interesse | Logs Vercel |

**Nota:** Dados 100% anônimos, sem IP, sem cookie, sem fingerprint.

## 4. Serviços de Terceiros

| Serviço | Dados Compartilhados | Finalidade | DPA? |
|---|---|---|---|
| Vercel | IP, logs | Hospedagem | Padrão (ToS) |
| Cloudflare | IP, DNS | CDN, Segurança | Padrão (ToS) |
| Resend | Email do assinante | Envio de newsletter | ❌ Pendente |
| Redis Cloud | Email do assinante | Armazenamento | ❌ Pendente |
| GitHub | Nenhum (só link) | Avatar | N/A |
| Instagram | Nenhum (só link) | Social proof | N/A |
| Adcash | IP, identificadores online e dados de navegação, após opt-in | Entrega e medição de publicidade | ⚠️ Verificar DPA/termos antes de renovação anual |
