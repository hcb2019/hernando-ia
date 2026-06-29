# Plano de Implementação — LGPD Compliance hernandoia.com

> **Para Hermes:** Execute este plano task por task. Cada task é independente e commitável.

**Goal:** Adequar o hernandoia.com à LGPD (Lei 13.709/2018) corrigindo 5 gaps: double opt-in na newsletter, registro de consentimento, endpoint DSAR, runbook de incidentes, e DPA de operadores.

**Arquitetura:** Modificações no fluxo de newsletter (subscribe → confirm → welcome), novo endpoint DSAR, logging de incidentes em `.lgpd/`. Stack: Next.js 15 App Router, Redis (ioredis), Resend (email), TypeScript.

**Tech Stack:** Next.js 15, TypeScript, Redis (ioredis), Resend API

---

## Task 1: Double Opt-In — Mudar `subscribe()` para NÃO auto-confirmar

**Objetivo:** Alterar `src/lib/subscribers.ts` para que `subscribe()` crie o assinante com `confirmed: false` e retorne o token de confirmação. A confirmação só acontece quando o usuário clica no link do email.

**Arquivos:**
- Modificar: `src/lib/subscribers.ts:116-143`

**Step 1: Alterar a função `subscribe()`**

```typescript
// src/lib/subscribers.ts — dentro de subscribe()
// Mudar de confirmed: true para confirmed: false
const subscriber: Subscriber = {
  email,
  confirmed: false,  // ← ERA true, agora false (double opt-in)
  subscribedAt: new Date().toISOString(),
  confirmedAt: undefined,  // ← não definido até confirmar
  confirmationToken: generateToken(),
  unsubscribeToken: generateToken(),
};
```

**Step 2: Atualizar a API route para enviar email de confirmação**

```typescript
// src/app/api/subscribe/route.ts — substituir welcome email por confirmation email
const confirmUrl = `${SITE.url}/api/subscribe/confirm?token=${sub.confirmationToken}`;
const htmlBody = `
  <div style="max-width:600px;margin:0 auto;font-family:system-ui,sans-serif;background:#08081a;color:#e0e0e0;padding:40px 20px;border-radius:8px">
    <h1 style="color:#00e5ff;font-size:24px;margin-bottom:16px">HERNANDO<span style="color:#888">.IA</span></h1>
    <h2 style="color:#fff;font-size:20px;margin-bottom:24px">Confirme sua inscrição</h2>
    <p style="color:#aaa;font-size:15px;line-height:1.6;margin-bottom:24px">
      Clique no botão abaixo para confirmar sua inscrição na newsletter da <strong>Hernando.ia</strong>.
    </p>
    <a href="${confirmUrl}" style="display:inline-block;background:#00e5ff;color:#08081a;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:15px">
      CONFIRMAR INSCRIÇÃO
    </a>
    <p style="color:#666;font-size:12px;margin-top:24px">
      Se você não se inscreveu, ignore este email.
    </p>
  </div>`;
```

**Step 3: Mudar a mensagem de retorno da API**

```typescript
// No final da route, mudar de "Inscrição confirmada" para:
return NextResponse.json({
  message: "Email de confirmação enviado! Verifique sua caixa de entrada.",
  subscriberCount: 0,
});
```

**Verificação:**
- `POST /api/subscribe` com email novo → retorna "Email de confirmação enviado"
- Assinante no Redis tem `confirmed: false`
- Email contém link com `confirmationToken`

**Commit:**
```bash
git add src/lib/subscribers.ts src/app/api/subscribe/route.ts
git commit -m "lgpd: enable double opt-in — subscribers must confirm via email

- subscribe() now creates unconfirmed subscribers (confirmed: false)
- API sends confirmation email instead of welcome email
- User only confirmed after clicking email link (Art. 8, §2 LGPD)"
```

---

## Task 2: Registrar Consentimento (timestamp + IP + versão)

**Objetivo:** Salvar registro de consentimento imutável quando usuário confirma. Isso comprova o consentimento (Art. 8º, §2º).

**Arquivos:**
- Modificar: `src/lib/subscribers.ts`
- Criar: `.lgpd/consent/consent-log-spec.md`

**Step 1: Adicionar interface ConsentRecord**

```typescript
// src/lib/subscribers.ts — após a interface Subscriber
export interface ConsentRecord {
  email: string;
  action: "subscribe" | "confirm" | "unsubscribe";
  timestamp: string;
  ip: string;
  userAgent: string;
  version: string; // versão da política de privacidade
}

const CONSENT_LOG_KEY = "consent:log";
```

**Step 2: Adicionar função `recordConsent()`**

```typescript
export async function recordConsent(record: ConsentRecord): Promise<void> {
  const r = getRedis();
  if (r) {
    try {
      await r.lpush(CONSENT_LOG_KEY, JSON.stringify(record));
      return;
    } catch (e) {
      console.error("Consent log error, falling back to file:", e);
    }
  }
  // File fallback
  const logPath = join(DATA_DIR, "consent-log.jsonl");
  ensureDataDir();
  appendFileSync(logPath, JSON.stringify(record) + "\n");
}
```

**Step 3: Chamar `recordConsent()` na rota de subscribe**

```typescript
// src/app/api/subscribe/route.ts — após subscribe() bem-sucedido
import { recordConsent } from "@/lib/subscribers";

const consent: ConsentRecord = {
  email: email.toLowerCase().trim(),
  action: "subscribe",
  timestamp: new Date().toISOString(),
  ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
  userAgent: request.headers.get("user-agent") || "unknown",
  version: "1.0",
};
await recordConsent(consent);
```

**Step 4: Chamar `recordConsent()` na confirmação**

```typescript
// src/app/api/subscribe/confirm/route.ts — após confirmSubscription() bem-sucedido
if (sub) {
  await recordConsent({
    email: sub.email,
    action: "confirm",
    timestamp: new Date().toISOString(),
    ip: request.headers.get("x-forwarded-for") || "unknown",
    userAgent: request.headers.get("user-agent") || "unknown",
    version: "1.0",
  });
}
```

**Verificação:**
- Inscrever email → log tem entrada `action: "subscribe"`
- Clicar link de confirmação → log tem entrada `action: "confirm"`
- `redis-cli LRANGE consent:log 0 -1` mostra os registros

**Commit:**
```bash
git add src/lib/subscribers.ts src/app/api/subscribe/route.ts src/app/api/subscribe/confirm/route.ts
git commit -m "lgpd: add consent record — timestamp, IP, version (Art. 8, §2)"
```

---

## Task 3: Página DSAR — Direitos do Titular

**Objetivo:** Criar formulário simples para que titulares exerçam direitos do Art. 18 (acesso, correção, exclusão, portabilidade).

**Arquivos:**
- Criar: `src/app/api/dsar/route.ts`
- Já existe: `src/app/politica-de-privacidade/page.tsx` (link para DSAR nos direitos)

**Step 1: Criar endpoint DSAR**

```typescript
// src/app/api/dsar/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAllSubscribers, loadStore, saveStore, type Subscriber } from "@/lib/subscribers";

export async function POST(request: NextRequest) {
  try {
    const { email, action } = await request.json();

    if (!email || !action) {
      return NextResponse.json({ error: "Email e ação são obrigatórios" }, { status: 400 });
    }

    const validActions = ["access", "delete", "portability", "correct"];
    if (!validActions.includes(action)) {
      return NextResponse.json({ error: "Ação inválida" }, { status: 400 });
    }

    // Find subscriber
    const subscribers = await loadStore();
    const idx = subscribers.findIndex((s: Subscriber) => s.email === email.toLowerCase().trim());
    
    if (idx === -1) {
      return NextResponse.json({ 
        message: "Nenhum dado encontrado para este email. Se existia, já foi removido." 
      });
    }

    const sub = subscribers[idx];

    switch (action) {
      case "access":
        return NextResponse.json({
          email: sub.email,
          subscribedAt: sub.subscribedAt,
          confirmedAt: sub.confirmedAt,
          confirmed: sub.confirmed,
        });

      case "delete":
        subscribers.splice(idx, 1);
        await saveStore(subscribers);
        return NextResponse.json({ message: "Dados removidos com sucesso." });

      case "portability":
        return NextResponse.json({
          email: sub.email,
          subscribedAt: sub.subscribedAt,
          confirmed: sub.confirmed,
        });

      case "correct":
        const { newEmail } = await request.json();
        if (newEmail) {
          sub.email = newEmail.toLowerCase().trim();
          await saveStore(subscribers);
          return NextResponse.json({ message: "Email atualizado com sucesso." });
        }
        return NextResponse.json({ error: "newEmail é obrigatório para correção" }, { status: 400 });

      default:
        return NextResponse.json({ error: "Ação não implementada" }, { status: 400 });
    }
  } catch (err) {
    console.error("DSAR error:", err);
    return NextResponse.json(
      { error: `Erro: ${err instanceof Error ? err.message : "desconhecido"}` },
      { status: 500 }
    );
  }
}
```

**Verificação:**
- `POST /api/dsar` com `{email, action: "access"}` → retorna dados
- `POST /api/dsar` com `{email, action: "delete"}` → remove e confirma
- Email não encontrado → mensagem informativa

**Commit:**
```bash
git add src/app/api/dsar/route.ts
git commit -m "lgpd: add DSAR endpoint — access, delete, portability, correct (Art. 18)"
```

---

## Task 4: Runbook de Resposta a Incidentes

**Objetivo:** Criar runbook documentado em `.lgpd/incidents/` para atender Art. 48 (notificar ANPD em 3 dias úteis).

**Arquivos:**
- Criar: `.lgpd/incidents/runbook.md`
- Criar: `.lgpd/incidents/log.md`

**Step 1: Criar runbook**

Arquivo `.lgpd/incidents/runbook.md`:

```markdown
# Runbook de Resposta a Incidentes — hernandoia.com

## Papéis

| Papel | Responsável | Contato |
|---|---|---|
| Encarregado (DPO) | Hernando Candido | contato@hernandoia.com |
| Técnico | Hernando Candido | contato@hernandoia.com |

## Gatilhos

Qualquer evento que comprometa:
- Confidencialidade (acesso não autorizado)
- Integridade (alteração não autorizada)
- Disponibilidade (perda de acesso) 
de dados pessoais de assinantes da newsletter.

## Fluxo de Resposta

### T0 — Detecção (0-1h)
1. Identificar fonte do incidente (log Vercel, alerta Redis, notificação Resend)
2. Registrar no log de incidentes (log.md)
3. Classificar severidade: Baixa / Média / Alta / Crítica

### T+1h — Contenção
1. Isolar sistema afetado (revogar chaves, pausar serviço)
2. Preservar evidências (logs, snapshots)
3. Avaliar escopo: quantos titulares afetados?

### T+3h — Notificação (prazo legal: 3 dias úteis)
1. Notificar ANPD via https://www.gov.br/anpd/pt-br/canais_atendimento
2. Notificar titulares afetados por email
3. Conteúdo mínimo da notificação (Art. 48, §1º):
   - Natureza dos dados afetados
   - Informações sobre os titulares envolvidos
   - Riscos identificados
   - Medidas tomadas ou em andamento
   - Contato do encarregado

### T+24h — Remediação
1. Corrigir vulnerabilidade
2. Restaurar sistemas
3. Testar correção

### T+72h — Post-mortem
1. Documentar lições aprendidas
2. Atualizar runbook se necessário
3. Arquivar evidências por 5 anos (Res. ANPD 15/2024)

## Contatos de Emergência

| Serviço | Contato |
|---|---|
| Vercel | dashboard + support@vercel.com |
| Cloudflare | dashboard + support |
| Redis Cloud | dashboard + support |
| Resend | dashboard + support@resend.com |
| ANPD | https://www.gov.br/anpd |
```

**Step 2: Criar log vazio**

```markdown
# Log de Incidentes — hernandoia.com

> Registro mantido por 5 anos (Art. 10, Res. ANPD 15/2024)

| Data | ID | Severidade | Descrição | Titulares Afetados | ANPD Notificada | Status |
|---|---|---|---|---|---|---|
| — | — | — | Nenhum incidente registrado | 0 | N/A | — |
```

**Commit:**
```bash
git add .lgpd/incidents/
git commit -m "lgpd: add incident response runbook + log (Art. 48, Res. 15/2024)"
```

---

## Task 5: Documentar DPAs de Operadores

**Objetivo:** Documentar status de DPA com cada operador (Vercel, Cloudflare, Resend, Redis Cloud).

**Arquivos:**
- Criar: `.lgpd/vendors/dpa-status.md`

**Step 1: Criar documento**

```markdown
# Status de DPA — Operadores

| Operador | Serviço | DPA? | Link | Ação |
|---|---|---|---|---|
| Vercel Inc. | Hospedagem | ✅ Padrão (ToS) | https://vercel.com/legal/dpa | Verificado 06/2026 |
| Cloudflare Inc. | CDN, DNS | ✅ Padrão (ToS) | https://www.cloudflare.com/cloudflare-customer-dpa | Verificado 06/2026 |
| Resend | Email transacional | ⚠️ Padrão (ToS) | https://resend.com/legal/dpa | Solicitar cópia assinada |
| Redis Cloud | Banco de dados | ⚠️ Padrão (ToS) | Portal do provedor | Solicitar cópia assinada |

## Ações Pendentes

- [ ] Solicitar DPA assinado do Resend (email: support@resend.com)
- [ ] Solicitar DPA assinado do Redis Cloud (via portal)
```

**Commit:**
```bash
git add .lgpd/vendors/
git commit -m "lgpd: document operator DPA status (Art. 39 LGPD)"
```

---

## Task 6: Atualizar STATUS.md e ROPA.md

**Objetivo:** Finalizar documentação de conformidade.

**Arquivos:**
- Modificar: `.lgpd/STATUS.md`
- Criar: `.lgpd/ROPA.md`

**Step 1: Atualizar STATUS.md**

Marcar fases como concluídas:
- F3 — Privacy policy → ✅
- F5 — Newsletter consent → ✅
- F6 — DSAR workflow → ✅
- F7 — Encarregado → ✅
- F9 — Transferência intl → ✅
- F11 — Incident response → ✅

**Step 2: Criar ROPA.md (Registro de Operações)**

```markdown
# ROPA — Registro de Operações de Tratamento (Art. 37)

| # | Operação | Dados | Finalidade | Base Legal | Operadores | Transferência |
|---|---|---|---|---|---|---|
| 1 | Newsletter signup | Email | Coleta de inscrição | Consentimento (Art. 7, I) | Redis Cloud (US) | Sim (EUA) |
| 2 | Confirmation email | Email, token | Double opt-in | Obrigação legal (Art. 8, §2) | Resend (US) | Sim (EUA) |
| 3 | Newsletter sending | Email | Envio semanal | Consentimento (Art. 7, I) | Resend (US) | Sim (EUA) |
| 4 | Web Vitals | Métricas anônimas | Performance | Legítimo interesse (Art. 7, IX) | Vercel (US) | Sim (EUA) |
| 5 | Access logs | IP (efêmero) | Segurança | Legítimo interesse (Art. 7, IX) | Vercel, Cloudflare | Sim (Global) |
| 6 | DSAR requests | Email | Direitos do titular | Obrigação legal (Art. 18) | Redis Cloud (US) | Sim (EUA) |
| 7 | Consent log | Email, IP, timestamp | Comprovação | Obrigação legal (Art. 8, §2) | Redis Cloud (US) | Sim (EUA) |

**Controlador:** Hernando Candido (pessoa física)
**Encarregado:** Hernando Candido — contato@hernandoia.com
**Data:** 29/06/2026
```

**Commit:**
```bash
git add .lgpd/
git commit -m "lgpd: finalize ROPA + update STATUS (all phases complete)"
```

---

## 📋 Ordem de Execução

| # | Task | Tempo | Impacto |
|---|---|---|---|
| 1 | Double opt-in | 10min | 🔴 P0 — risco legal |
| 2 | Consent record | 5min | 🔴 P0 — comprovação |
| 3 | DSAR endpoint | 15min | 🟡 P1 — direito do titular |
| 4 | Incident runbook | 5min | 🟡 P1 — Art. 48 |
| 5 | DPA status | 5min | 🟢 P2 — documentação |
| 6 | ROPA final | 3min | 🟢 P2 — registro |

**Tempo total:** ~40 minutos para conformidade completa.
