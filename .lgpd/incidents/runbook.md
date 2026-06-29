# Runbook de Resposta a Incidentes — hernandoia.com

**Art. 48 LGPD + Res. ANPD 15/2024**

## Papéis

| Papel | Responsável | Contato |
|---|---|---|
| Encarregado (DPO) | Hernando Candido | contato@hernandoia.com |
| Técnico | Hernando Candido | contato@hernandoia.com |

## Gatilhos

Qualquer evento que comprometa confidencialidade, integridade ou disponibilidade de dados pessoais de assinantes.

## Fluxo de Resposta

### T0 — Detecção (0-1h)
1. Identificar fonte (log Vercel, alerta Redis, notificação Resend)
2. Registrar em `log.md`
3. Classificar severidade: Baixa / Média / Alta / Crítica

### T+1h — Contenção
1. Isolar sistema afetado (revogar chaves, pausar serviço)
2. Preservar evidências (logs, snapshots)
3. Avaliar escopo: quantos titulares afetados?

### T+3h — Notificação (prazo legal: 3 dias úteis)
1. Notificar ANPD: https://www.gov.br/anpd/pt-br/canais_atendimento
2. Notificar titulares afetados por email
3. Conteúdo mínimo (Art. 48, §1º): natureza, titulares, riscos, medidas, contato do encarregado

### T+24h — Remediação
1. Corrigir vulnerabilidade
2. Restaurar sistemas
3. Testar correção

### T+72h — Post-mortem
1. Documentar lições aprendidas
2. Atualizar runbook se necessário
3. Arquivar evidências por 5 anos

## Contatos de Emergência

| Serviço | Contato |
|---|---|
| Vercel | Dashboard + support@vercel.com |
| Cloudflare | Dashboard |
| Redis Cloud | Dashboard |
| Resend | Dashboard + support@resend.com |
| ANPD | https://www.gov.br/anpd |
