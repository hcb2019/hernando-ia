import { getBlogPosts } from "@/lib/blog";
import { SITE } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts().filter(p => !p.noindex);

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: post.date > new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0]
      ? "daily" as const
      : "weekly" as const,
    priority: 0.8,
    ...(post.image ? {
      images: [post.image],
    } : {}),
  }));

  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${SITE.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${SITE.url}/produtos`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE.url}/produtos/claude-code-skills`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE.url}/produtos/arenabite`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE.url}/newsletter`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE.url}/servicos`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE.url}/sobre`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE.url}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    ...blogEntries,
  ];
}
