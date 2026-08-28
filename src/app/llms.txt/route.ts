import { getBlogPosts } from "@/lib/blog";
import { SITE } from "@/lib/seo";

// llms.txt — AI discoverability standard (https://llmstxt.org/)
// Provides a concise, machine-readable summary for LLMs, AI crawlers, and search engines.

export async function GET() {
  const posts = getBlogPosts().filter((post) => !post.noindex);

  const lines = [
    `# ${SITE.name}`,
    `> ${SITE.description}`,
    "",
    "## Site Structure",
    `- Home: ${SITE.url}`,
    `- Blog: ${SITE.url}/blog`,
    `- GitHub: https://github.com/hcb2019`,
    `- Instagram: https://instagram.com/hernando.ia`,
    "",
    "## Blog Posts",
    ...posts.map(
      (post) =>
        `- [${post.date}] ${post.title}: ${SITE.url}/blog/${post.slug} — ${post.excerpt}`
    ),
    "",
    "## Optional",
    `- Full content: ${SITE.url}/llms-full.txt`,
    `- Sitemap: ${SITE.url}/sitemap.xml`,
    `- RSS: ${SITE.url}/rss.xml`,
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
