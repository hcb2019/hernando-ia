# STATUS.md — Auditoria LGPD hernandoia.com

**Data:** 2026-06-29
**Pipeline:** B (Legacy — site em produção, auditado e em retrofit)
**Versão:** 1.0.0

## Estado Atual

| Fase | Status |
|---|---|
| F0 — Setup .lgpd/ | ✅ Concluído |
| F1 — Data mapping | ✅ Concluído |
| F2 — Legal basis | ✅ Concluído |
| F3 — Privacy policy | ⏸ Aguardando aprovação |
| F4 — Cookies | ✅ (sem cookies não-essenciais) |
| F5 — Newsletter consent | ⚠️ Precisa double opt-in |
| F6 — DSAR workflow | ❌ Pendente |
| F7 — Encarregado | ❌ Pendente |
| F8 — ROPA | ⏸ Draft pronto |
| F9 — Transferência intl | ⚠️ Precisa DPA de operadores |
| F10 — RIPD | ⬜ Não necessário (baixo risco) |
| F11 — Incident response | ❌ Pendente |

## Dados Coletados

| Dado | Finalidade | Base Legal | Operador | País |
|---|---|---|---|---|
| Email | Newsletter | Consentimento (Art. 7º, I) | Redis Cloud | US |
| Email | Envio de newsletter | Consentimento | Resend | US |
| IP (logs) | Segurança | Legítimo interesse (Art. 7º, IX) | Vercel | US |
| IP (logs) | CDN/Segurança | Legítimo interesse | Cloudflare | Global |

## Próximos Passos (Prioridade)

1. 🔴 Publicar política de privacidade em `/politica-de-privacidade`
2. 🔴 Adicionar double opt-in na newsletter
3. 🟡 Designar encarregado (Art. 41)
4. 🟡 Criar página DSAR (direitos do titular)
5. 🟢 Assinar DPA com Resend e Redis Cloud
6. 🟢 Implementar plano de resposta a incidentes
