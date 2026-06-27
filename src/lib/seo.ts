import type { Metadata } from "next";
import type { BlogPost, BlogPostWithContent } from "./blog";

// ── Site Constants ────────────────────────────────────────────────────

export const SITE = {
  name: "Hernando.ia",
  url: "https://hernandoia.com",
  titleTemplate: "%s | Hernando.ia",
  description:
    "Hernando.ia — Engenheiro de IA, empreendedor e criador. Blog, portfolio e cerebro digital sobre inteligência artificial, startups e alavancagem.",
  keywords: [
    "inteligência artificial",
    "AI engineer",
    "engenharia de IA",
    "startups",
    "SaaS",
    "machine learning",
    "LLM",
    "agentes de IA",
    "empreendedorismo tech",
    "Brasil",
    "portfolio",
    "blog tech",
  ],
  locale: "pt_BR",
  ogImage: "/images/og-default.png",
  twitterHandle: "@hernandoia",
  author: {
    name: "Hernando",
    email: "hernando@hernando.ia",
    url: "https://hernandoia.com",
    jobTitle: "AI Engineer & Entrepreneur",
    sameAs: [
      "https://instagram.com/hernando.ia",
      "https://github.com/hcb2019",
      "https://www.linkedin.com/in/hernandoia",
    ],
  },
} as const;

// ── Metadata Helpers ───────────────────────────────────────────────────

interface PageMeta {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  lang?: "pt" | "en" | "es";
  noindex?: boolean;
}

/**
 * Generate consistent metadata for any page.
 * Automatically adds canonical, alternates (hreflang), OG, Twitter, and robots.
 */
export function generatePageMeta({
  title,
  description,
  path = "",
  ogImage,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
  lang = "pt",
  noindex = false,
}: PageMeta): Metadata {
  const url = path ? `${SITE.url}${path}` : SITE.url;
  const imageUrl = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${SITE.url}${ogImage}`
    : `${SITE.url}${SITE.ogImage}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    authors: [{ name: SITE.author.name, url: SITE.author.url }],
    creator: SITE.author.name,
    publisher: SITE.author.name,
    keywords: [...SITE.keywords],
    category: "Technology",
    metadataBase: new URL(SITE.url),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: lang === "pt" ? "pt_BR" : lang === "es" ? "es_ES" : "en_US",
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(tags && { tags }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      ...(SITE.twitterHandle.startsWith("@") && {
        creator: SITE.twitterHandle,
        site: SITE.twitterHandle,
      }),
    },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
  };
}

/**
 * Generate metadata specifically for blog posts.
 */
export function generateBlogPostMeta(
  post: BlogPostWithContent,
  lang: "pt" | "en" | "es" = "pt"
): Metadata {
  const path = `/blog/${post.slug}`;
  const langSuffix = lang !== "pt" ? `?lang=${lang}` : "";
  const fullPath = `${path}${langSuffix}`;

  // Dynamic OG image per post
  const ogImageUrl = `/api/og?title=${encodeURIComponent(post.title)}&date=${encodeURIComponent(post.date)}&tags=${encodeURIComponent(post.tags.slice(0, 4).join(","))}`;

  return generatePageMeta({
    title: post.title,
    description: post.excerpt,
    path: fullPath,
    ogImage: ogImageUrl,
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
    lang,
  });
}

/**
 * JSON-LD structured data generators
 */
export const JSONLD = {
  website() {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      inLanguage: "pt-BR",
      author: {
        "@type": "Person",
        name: SITE.author.name,
        url: SITE.author.url,
        email: SITE.author.email,
        jobTitle: SITE.author.jobTitle,
        sameAs: SITE.author.sameAs,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE.url}/blog?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    };
  },

  person() {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: SITE.author.name,
      url: SITE.author.url,
      email: SITE.author.email,
      jobTitle: SITE.author.jobTitle,
      sameAs: SITE.author.sameAs,
      image: `${SITE.url}/images/profile.jpg`,
    };
  },

  article(post: BlogPostWithContent, lang: "pt" | "en" | "es" = "pt") {
    const url = `${SITE.url}/blog/${post.slug}`;
    const langSuffix = lang !== "pt" ? `?lang=${lang}` : "";
    // Use the post's actual image, or fall back to dynamic OG image
    const imageUrl = post.image
      ? post.image
      : `${SITE.url}/api/og?title=${encodeURIComponent(post.title)}&date=${encodeURIComponent(post.date)}&tags=${encodeURIComponent(post.tags.slice(0, 4).join(","))}`;
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      url: `${url}${langSuffix}`,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        "@type": "Person",
        name: SITE.author.name,
        url: SITE.author.url,
      },
      publisher: {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
      },
      image: imageUrl,
      inLanguage: lang === "pt" ? "pt-BR" : lang === "es" ? "es" : "en",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${url}${langSuffix}`,
      },
    };
  },

  breadcrumbList(items: { name: string; url: string }[]) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    };
  },
};
