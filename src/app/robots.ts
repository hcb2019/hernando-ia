import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Allow AI/search bots EXPLICITLY (must come before wildcard)
      // Cloudflare injects AI crawler blocks at the top of robots.txt.
      // If these bots are still blocked, disable "AI Crawlers Block" in
      // Cloudflare Dashboard: Security > Bots > AI Crawlers
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "Bytespider",
        allow: "/",
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
      {
        userAgent: "Diffbot",
        allow: "/",
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
      // ── Default: allow all, block API and Next.js internals
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
