export type Lang = "pt" | "en" | "es";

type TranslationDict = Record<string, Record<Lang, string>>;

/**
 * All UI strings used in blog pages, indexed by key with PT/EN/ES variants.
 * Usage: t("back_to_blog", "en") → "← Back to blog"
 */
const dict: TranslationDict = {
  // ── Blog list page ──────────────────────────────────────────────
  blog_title: {
    pt: "Blog",
    en: "Blog",
    es: "Blog",
  },
  blog_subtitle: {
    pt: "Mergulhos profundos em engenharia de IA, construção de startups e as ferramentas que moldam o futuro. Escrito por Hernando.",
    en: "Deep dives into AI engineering, startup building, and the tools shaping the future. Written by Hernando.",
    es: "Inmersiones profundas en ingeniería de IA, construcción de startups y las herramientas que moldean el futuro. Escrito por Hernando.",
  },
  no_posts_title: {
    pt: "Nenhum post ainda.",
    en: "No posts yet.",
    es: "Aún no hay publicaciones.",
  },
  no_posts_sub: {
    pt: "O blog está sendo configurado. Volte em breve para o primeiro artigo!",
    en: "The blog is being set up. Check back soon for the first article!",
    es: "El blog se está configurando. ¡Vuelve pronto para el primer artículo!",
  },
  newsletter_tag: {
    pt: "Fique por dentro",
    en: "Stay in the loop",
    es: "Mantente al día",
  },
  newsletter_title: {
    pt: "Receba insights de IA direto no seu email",
    en: "Get AI insights straight to your inbox",
    es: "Recibe insights de IA directamente en tu email",
  },
  newsletter_sub: {
    pt: "Entre para a newsletter e receba conteúdo exclusivo, acesso antecipado a novos projetos e recursos curados de engenharia de IA.",
    en: "Join the newsletter and get exclusive content, early access to new projects, and curated AI engineering resources.",
    es: "Únete a la newsletter y recibe contenido exclusivo, acceso anticipado a nuevos proyectos y recursos curados de ingeniería de IA.",
  },
  sponsor_cta: {
    pt: "Interessado em patrocinar?",
    en: "Interested in sponsoring?",
    es: "¿Interesado en patrocinar?",
  },
  sponsor_link: {
    pt: "Entre em contato",
    en: "Get in touch",
    es: "Contáctanos",
  },

  // ── Blog post page ──────────────────────────────────────────────
  back_to_blog: {
    pt: "← Voltar ao blog",
    en: "← Back to blog",
    es: "← Volver al blog",
  },
  related_posts: {
    pt: "Leia também",
    en: "Read also",
    es: "Lee también",
  },
  min_read: {
    pt: "min de leitura",
    en: "min read",
    es: "min de lectura",
  },
  sponsored_label: {
    pt: "Patrocinado",
    en: "Sponsored",
    es: "Patrocinado",
  },
  premium_label: {
    pt: "Premium",
    en: "Premium",
    es: "Premium",
  },
  premium_title: {
    pt: "Conteúdo Premium",
    en: "Premium Content",
    es: "Contenido Premium",
  },
  premium_body: {
    pt: "Este é um artigo premium. Assine para desbloquear o conteúdo completo.",
    en: "This is a premium article. Subscribe to unlock the full content.",
    es: "Este es un artículo premium. Suscríbete para desbloquear el contenido completo.",
  },
  premium_button: {
    pt: "Desbloquear com Assinatura",
    en: "Unlock with Subscription",
    es: "Desbloquear con Suscripción",
  },
  liked_article: {
    pt: "Gostou deste artigo?",
    en: "Enjoyed this article?",
    es: "¿Te gustó este artículo?",
  },
  liked_sub: {
    pt: "Assine a newsletter para receber mais insights de engenharia de IA direto no seu email.",
    en: "Subscribe to the newsletter for more AI engineering insights straight to your inbox.",
    es: "Suscríbete a la newsletter para más insights de ingeniería de IA directamente en tu email.",
  },
  sponsor_disclosure: {
    pt: "Este post contém conteúdo patrocinado ou afiliado.",
    en: "This post contains sponsored or affiliate content.",
    es: "Esta publicación contiene contenido patrocinado o de afiliados.",
  },
  sponsor_policy: {
    pt: "Saiba mais sobre nossa política de patrocínio.",
    en: "Learn more about our sponsorship policy.",
    es: "Conoce más sobre nuestra política de patrocinio.",
  },

  // ── Blog card ───────────────────────────────────────────────────
  card_read_more: {
    pt: "Ler mais →",
    en: "Read more →",
    es: "Leer más →",
  },
};

/**
 * Resolve a translation key for the given language.
 * Falls back to Portuguese if the key is missing.
 */
export function t(key: string, lang: Lang): string {
  const entry = dict[key];
  if (!entry) {
    console.warn(`[i18n] Missing translation key: "${key}"`);
    return key;
  }
  return entry[lang] ?? entry["pt"];
}

/**
 * Format a date string for the given language.
 */
export function formatDate(dateStr: string, lang: Lang): string {
  const date = new Date(dateStr);
  const locales: Record<Lang, string> = {
    pt: "pt-BR",
    en: "en-US",
    es: "es-ES",
  };
  return date.toLocaleDateString(locales[lang] ?? "pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Valid language codes.
 */
export const LANGUAGES = [
  { code: "pt" as const, label: "PT" },
  { code: "en" as const, label: "EN" },
  { code: "es" as const, label: "ES" },
];
