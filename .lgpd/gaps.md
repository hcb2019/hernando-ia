# Gaps — Não-Conformidades

## 🔴 Críticas (risco de multa)

| # | Gap | Norma | Ação | Responsável |
|---|---|---|---|---|
| G1 | **Sem política de privacidade** | Art. 9º | Publicar em `/politica-de-privacidade` | Hernando |
| G2 | **Newsletter sem double opt-in** | Art. 8º, §2º (comprovação) | Adicionar email de confirmação | Dev |
| G3 | **Sem consentimento registrado** | Art. 8º, §2º | Salvar timestamp + token no Redis | Dev |
| G4 | **Sem encarregado/DPO** | Art. 41 | Designar e publicar contato | Hernando |
| G5 | **Sem processo DSAR** | Art. 18 | Criar página/email para requisições | Dev |

## 🟡 Altas

| # | Gap | Norma | Ação |
|---|---|---|---|
| G6 | Transferência intl não divulgada | Art. 33 | Listar na política |
| G7 | Sem DPA com operadores | Art. 39 | Solicitar DPA do Resend + Redis |
| G8 | Sem ROPA publicado | Art. 37 | Manter e publicar |
| G9 | Sem plano de incidentes | Art. 48 | Criar runbook |

## 🟢 Médias

| # | Gap | Norma | Ação |
|---|---|---|---|
| G10 | Sem banner de cookies | Art. 7º, I | Não crítico — site não usa cookies não-essenciais |
| G11 | Sem RIPD | Art. 38 | Não obrigatório — tratamento é baixo risco |
