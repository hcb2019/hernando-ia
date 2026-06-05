import { getBlogPosts } from "@/lib/blog";
import { SITE } from "@/lib/seo";

// RSS 2.0 feed for blog aggregation and AI crawlers

export async function GET() {
  const posts = getBlogPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE.url}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${SITE.author.email} (${SITE.author.name})</author>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE.name} — Blog</title>
    <description>${SITE.description}</description>
    <link>${SITE.url}/blog</link>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <webMaster>${SITE.author.email} (${SITE.author.name})</webMaster>
    <generator>Next.js</generator>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
