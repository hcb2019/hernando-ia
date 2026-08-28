# Especificação de consentimento de publicidade — v1

**Atualizado:** 28/08/2026

- Finalidade: entrega e medição de publicidade via Adcash.
- Base legal: consentimento (LGPD art. 7º, I).
- Opções: `advertising_accepted` e `advertising_declined`; nenhuma é pré-marcada.
- Antes do aceite: o script `https://acscdn.com/script/aclib.js` não está presente no HTML nem é inserido no DOM.
- Após aceite: o script é inserido em `document.head` e executa AutoTag na zona `yk8y5vn9qo`.
- Prova: endpoint `/api/consent` registra ação, timestamp, IP, User-Agent e versão `advertising-v1` no consent ledger.
- Revogação: botão “Gerenciar publicidade” grava recusa e recarrega a página; o script não volta a carregar.
- Prazo: até revogação ou 12 meses; nova escolha é solicitada após o prazo.
- Acesso: a recusa não limita o conteúdo do site.
