import { getBlogPosts } from "@/lib/blog";
import { SITE } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts();

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: {
        pt: `${SITE.url}/blog/${post.slug}`,
        en: `${SITE.url}/blog/${post.slug}?lang=en`,
        es: `${SITE.url}/blog/${post.slug}?lang=es`,
      },
    },
  }));

  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          pt: SITE.url,
          en: `${SITE.url}?lang=en`,
          es: `${SITE.url}?lang=es`,
        },
      },
    },
    {
      url: `${SITE.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          pt: `${SITE.url}/blog`,
          en: `${SITE.url}/blog?lang=en`,
          es: `${SITE.url}/blog?lang=es`,
        },
      },
    },
    {
      url: `${SITE.url}/produtos/claude-code-skills`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          pt: `${SITE.url}/produtos/claude-code-skills`,
          en: `${SITE.url}/produtos/claude-code-skills?lang=en`,
          es: `${SITE.url}/produtos/claude-code-skills?lang=es`,
        },
      },
    },
    {
      url: `${SITE.url}/newsletter`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          pt: `${SITE.url}/newsletter`,
        },
      },
    },
    ...blogEntries,
  ];
}
