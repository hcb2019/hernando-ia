import { getBlogPost, getBlogPosts, getRelatedPosts } from "@/lib/blog";
import { t, formatDate, type Lang, LANGUAGES } from "@/lib/translations";
import { generateBlogPostMeta, JSONLD } from "@/lib/seo";
import { getSubscriberCount } from "@/lib/subscribers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import NewsletterForm from "@/components/blog/newsletter-form";
import LanguageToggle from "@/components/blog/language-toggle";
import ShareButton from "@/components/blog/share-button";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

function parseLang(raw: string | string[] | undefined): Lang {
  if (typeof raw === "string") {
    const found = LANGUAGES.find((l) => l.code === raw);
    if (found) return found.code;
  }
  return "pt";
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sp = await searchParams;
  const lang = parseLang(sp.lang);
  const post = getBlogPost(slug, lang);
  if (!post) return { title: "Post não encontrado | Hernando.ia" };

  return generateBlogPostMeta(post, lang);
}

export function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const lang = parseLang(sp.lang);

  const post = getBlogPost(slug, lang);

  if (!post) notFound();

  const formattedDate = formatDate(post.date, lang);
  const articleJSONLD = JSONLD.article(post, lang);
  const breadcrumbJSONLD = JSONLD.breadcrumbList([
    { name: "Home", url: "https://hernandoia.com" },
    { name: t("blog_title", lang), url: "https://hernandoia.com/blog" },
    { name: post.title, url: `https://hernandoia.com/blog/${slug}` },
  ]);
  const relatedPosts = getRelatedPosts(slug, post.tags, 3);
  const allPosts = getBlogPosts(lang).filter(p => p.slug !== slug);

  const { total: subscriberCount } = getSubscriberCount();
  const displayCount = subscriberCount >= 1000
    ? (subscriberCount / 1000).toFixed(1) + "K"
    : String(subscriberCount);

  return (
    <div className="min-h-screen bg-[#08081a]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJSONLD) }}
      />

      {/* Grid background */}
      <div className="fixed inset-0 grid-bg opacity-[0.03] pointer-events-none" />

      <main className="relative max-w-3xl mx-auto px-4 sm:px-8 py-24">
        {/* Top bar: back + language toggle */}
        <div className="flex items-center justify-between mb-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/30">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <span className="text-white/10">/</span>
            <Link
              href={`/blog${lang !== "pt" ? `?lang=${lang}` : ""}`}
              className="hover:text-accent transition-colors"
            >
              Blog
            </Link>
            <span className="text-white/10">/</span>
            <span className="text-white/50 line-clamp-1 max-w-[200px]">{post.title}</span>
          </nav>
          <Suspense fallback={null}>
            <LanguageToggle currentLang={lang} />
          </Suspense>
        </div>

        {/* Header */}
        <header className="mb-12">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full border border-accent/20 text-accent/70 bg-accent/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl font-bold glow-text mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-white/40">
            <time dateTime={post.date}>{formattedDate}</time>
            <span className="text-white/20">·</span>
            <span>{post.readingTime} {t("min_read", lang)}</span>
            {post.sponsored && (
              <>
                <span className="text-white/20">·</span>
                <span className="text-accent/70 font-medium">
                  {t("sponsored_label", lang)}
                </span>
              </>
            )}
            {post.premium && (
              <>
                <span className="text-white/20">·</span>
                <span className="text-accent font-medium">
                  {t("premium_label", lang)}
                </span>
              </>
            )}
          </div>
        </header>

        {/* Premium gate */}
        {post.premium && (
          <div className="glass p-6 mb-10 glow-border text-center">
            <p className="text-lg font-semibold text-accent mb-2">
              {t("premium_title", lang)}
            </p>
            <p className="text-white/50 text-sm mb-4">
              {t("premium_body", lang)}
            </p>
            <button className="px-5 py-2 rounded-lg bg-accent text-[#08081a] font-semibold text-sm hover:bg-accent/90 transition-colors">
              {t("premium_button", lang)}
            </button>
          </div>
        )}

        {/* Article content */}
        <article className="prose-custom">
          <div
            className="text-white/80 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </article>

        {/* Related Posts */}
        {(relatedPosts.length > 0 || allPosts.length > 0) && (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="text-xl font-bold mb-8">
              {t("related_posts", lang) || "Leia também"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(relatedPosts.length > 0 ? relatedPosts : allPosts.slice(0, 3)).map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}${lang !== "pt" ? `?lang=${lang}` : ""}`}
                  className="block p-4 border border-border hover:border-accent/30 transition-colors group"
                >
                  <p className="text-xs text-white/30 mb-1">{related.date}</p>
                  <h3 className="text-sm font-semibold text-white/70 group-hover:text-accent transition-colors line-clamp-2 mb-2">
                    {related.title}
                  </h3>
                  <p className="text-xs text-white/40 line-clamp-2">{related.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Sponsor disclosure */}
        {post.sponsored && (
          <div className="mt-12 glass p-4 text-center">
            <p className="text-xs text-white/30">
              {t("sponsor_disclosure", lang)}{" "}
              <a
                href="/sponsorship"
                className="text-accent/50 hover:text-accent transition-colors"
              >
                {t("sponsor_policy", lang)}
              </a>
            </p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 glass p-8 text-center glow-border">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-border bg-white/[0.03]">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/50">
              Junte-se a{" "}
              <strong className="text-white font-bold">{displayCount}</strong> leitores
            </span>
          </div>
          <h2 className="text-xl font-bold mb-2">
            {t("liked_article", lang)}
          </h2>
          <p className="text-white/50 text-sm mb-4">
            {t("liked_sub", lang)}
          </p>
          <div className="flex items-center justify-center gap-3 text-xs text-white/40 mb-5">
            <span>📰 Curadoria semanal</span>
            <span className="text-white/15">•</span>
            <span>🧠 Análise sem hype</span>
            <span className="text-white/15">•</span>
            <span>🎁 Conteúdo exclusivo</span>
          </div>
          <NewsletterForm />
        </div>

        {/* Product CTA */}
        <section className="mt-12 border-2 border-accent/20 bg-accent/5 p-8 text-center">
          <span className="text-xs uppercase tracking-[0.15em] text-accent font-medium">
            FERRAMENTA EXCLUSIVA
          </span>
          <h2 className="text-2xl font-bold mt-3 mb-3">
            Quer um Claude Code que pensa como engenheiro de elite?
          </h2>
          <p className="text-white/60 text-sm max-w-xl mx-auto mb-6">
            Transforme seu agente de IA em um dev sênior com 20 skills profissionais em português — debugging, TDD, arquitetura, code review e muito mais.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="text-3xl font-bold text-accent">GRÁTIS</span>
            <span className="text-sm text-white/40 line-through">R$147</span>
            <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded font-medium">
              OPEN SOURCE
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <code className="bg-black/30 border border-white/10 rounded px-3 py-1.5 text-xs text-accent font-mono">
              npx @hernandoia/claude-code-skills
            </code>
          </div>
          <Link
            href="/produtos/claude-code-skills"
            className="inline-flex items-center gap-2 mt-3 bg-accent/10 border border-accent/30 text-accent font-bold uppercase tracking-tighter px-6 py-2 text-xs hover:bg-accent/20 transition-colors"
          >
            INSTALAR AGORA →
          </Link>
          <p className="text-xs text-white/30 mt-2">
            20 skills. 1 comando. Grátis para sempre.
          </p>
        </section>

        {/* Share Section */}
        <section className="mt-12 glass p-6 text-center glow-border">
          <h3 className="text-sm font-semibold text-white/60 mb-3">
            Compartilhe este artigo
          </h3>
          <div className="flex items-center justify-center">
            <ShareButton />
          </div>
        </section>
      </main>
    </div>
  );
}

// ── Simple markdown-to-HTML renderer (server-side) ─────────────────

function renderMarkdown(md: string): string {
  let html = md;

  // Headings
  html = html.replace(
    /^#### (.+)$/gm,
    '<h4 class="text-lg font-semibold mt-8 mb-3 text-white/80">$1</h4>'
  );
  html = html.replace(
    /^### (.+)$/gm,
    '<h3 class="text-xl font-medium mt-10 mb-4 text-white/80">$1</h3>'
  );
  html = html.replace(
    /^## (.+)$/gm,
    '<h2 class="text-2xl font-semibold mt-12 mb-5 text-white/90">$1</h2>'
  );
  html = html.replace(
    /^# (.+)$/gm,
    '<h1 class="text-4xl font-bold mt-14 mb-6 glow-text">$1</h1>'
  );

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-surface px-1.5 py-0.5 rounded text-sm font-mono text-accent">$1</code>'
  );

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-accent hover:underline decoration-accent/50 underline-offset-4">$1</a>'
  );

  // Images
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="rounded-lg my-8 max-w-full" loading="lazy" />'
  );

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-10 border-border" />');

  // Blockquotes
  html = html.replace(
    /^> (.+)$/gm,
    '<blockquote class="border-l-4 border-accent/50 pl-4 my-6 italic text-white/60">$1</blockquote>'
  );

  // Unordered lists
  html = html.replace(/((?:^- .+\n?)+)/gm, (match) => {
    const items = match
      .split("\n")
      .filter((line) => line.startsWith("- "))
      .map((line) => `<li>${line.slice(2)}</li>`)
      .join("");
    return `<ul class="my-4 ml-6 list-disc text-white/70 space-y-1">${items}</ul>`;
  });

  // Ordered lists
  html = html.replace(/((?:^\d+\. .+\n?)+)/gm, (match) => {
    const items = match
      .split("\n")
      .filter((line) => /^\d+\. /.test(line))
      .map((line) => `<li>${line.replace(/^\d+\. /, "")}</li>`)
      .join("");
    return `<ol class="my-4 ml-6 list-decimal text-white/70 space-y-1">${items}</ol>`;
  });

  // Code blocks (fenced)
  html = html.replace(/```[\s\S]*?```/g, (match) => {
    const code = match.replace(/```\w*\n?/, "").replace(/```$/, "");
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return `<pre class="bg-surface border border-border rounded-lg p-4 my-6 overflow-x-auto text-sm font-mono text-white/80"><code>${escaped}</code></pre>`;
  });

  // Paragraphs
  const lines = html.split("\n");
  const result: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      result.push("");
      continue;
    }
    if (/^<[a-zA-Z]/.test(trimmed)) {
      result.push(line);
      continue;
    }
    result.push(`<p class="my-4 leading-relaxed text-white/70">${line}</p>`);
  }

  return result.join("\n");
}
