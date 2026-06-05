import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { SITE } from "@/lib/seo";

// llms-full.txt — Full content version for AI training/context
// Includes the complete text of all blog posts for LLM ingestion.

export async function GET() {
  const posts = getBlogPosts();

  const sections: string[] = [
    `# ${SITE.name} — Full Content`,
    `> ${SITE.description}`,
    "",
    `Author: ${SITE.author.name} (${SITE.author.jobTitle})`,
    `URL: ${SITE.url}`,
    "",
    "---",
    "",
  ];

  for (const post of posts) {
    const full = getBlogPost(post.slug) as { title: string; date: string; excerpt: string; content: string; tags: string[] } | null;
    if (!full) continue;

    sections.push(
      `## ${full.title}`,
      `Date: ${full.date}`,
      `Tags: ${full.tags.join(", ")}`,
      `URL: ${SITE.url}/blog/${post.slug}`,
      "",
      full.content,
      "",
      "---",
      ""
    );
  }

  return new Response(sections.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
