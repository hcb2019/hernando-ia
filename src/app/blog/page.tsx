import { getBlogPosts, getAllTags, getBlogPostsByTag } from "@/lib/blog";
import { t, formatDate, LANGUAGES, type Lang } from "@/lib/translations";
import { generatePageMeta } from "@/lib/seo";
import BlogCard from "@/components/blog/blog-card";
import NewsletterForm from "@/components/blog/newsletter-form";
import SubscribeBanner from "@/components/blog/subscribe-banner";
import Navbar from "@/components/layout/navbar";
import LanguageToggle from "@/components/blog/language-toggle";
import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMeta({
  title: "Blog | Hernando.ia",
  description:
    "Reflexões sobre engenharia de IA, startups e construção do futuro. Tutoriais, insights e bastidores de produtos reais.",
  path: "/blog",
});

function parseLang(raw: string | string[] | undefined): Lang {
  if (typeof raw === "string") {
    const found = LANGUAGES.find((l) => l.code === raw);
    if (found) return found.code;
  }
  return "pt";
}

interface BlogPageProps {
  searchParams: Promise<{ lang?: string; tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const lang = parseLang(params.lang);
  const activeTag = typeof params.tag === "string" ? params.tag : null;

  const allPosts = getBlogPosts(lang);
  const posts = activeTag ? getBlogPostsByTag(activeTag).filter(p => {
    // re-apply language filter since getBlogPostsByTag doesn't filter by lang
    if (lang === "pt") return !p.slug.endsWith(".en") && !p.slug.endsWith(".es");
    if (lang === "en") return p.slug.endsWith(".en") || (!p.slug.endsWith(".es") && allPosts.some(ap => ap.slug === p.slug + ".en"));
    if (lang === "es") return p.slug.endsWith(".es");
    return true;
  }) : allPosts;
  const tags = getAllTags(lang);

  return (
    <div className="min-h-screen bg-[#08081a]">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg opacity-[0.03] pointer-events-none" />

      <Navbar />

      <main className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 pt-24 pb-24">
        {/* Top bar: language toggle */}
        <div className="flex justify-end mb-6">
          <Suspense fallback={null}>
            <LanguageToggle currentLang={lang} />
          </Suspense>
        </div>

        {/* Subscription status banner */}
          <Suspense fallback={null}>
            <SubscribeBanner />
          </Suspense>

          {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold glow-text mb-4">
            {t("blog_title", lang)}
          </h1>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            {t("blog_subtitle", lang)}
          </p>
        </div>

        {/* Tag filters */}
        {tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {/* "All" button — clears filter */}
            <Link
              href={`/blog${lang !== "pt" ? `?lang=${lang}` : ""}`}
              className={`text-xs px-3 py-1 rounded-full border transition-colors font-medium ${
                !activeTag
                  ? "border-accent bg-accent text-black"
                  : "border-white/15 text-white/40 hover:border-white/30 hover:text-white/70"
              }`}
            >
              Todos ({allPosts.length})
            </Link>
            {tags.map(({ tag, count }) => {
              const isActive = activeTag === tag;
              const href = `/blog?tag=${encodeURIComponent(tag)}${lang !== "pt" ? `&lang=${lang}` : ""}`;
              return (
                <Link
                  key={tag}
                  href={href}
                  className={`text-xs px-3 py-1 rounded-full border transition-colors font-medium ${
                    isActive
                      ? "border-accent bg-accent text-black"
                      : "border-accent/20 text-accent/70 bg-accent/5 hover:bg-accent/10 hover:border-accent/40"
                  }`}
                >
                  {tag} ({count})
                  {isActive && <span className="ml-1 opacity-70">×</span>}
                </Link>
              );
            })}
          </div>
        )}

        {/* Active tag indicator */}
        {activeTag && (
          <p className="text-center text-sm text-white/40 mb-8">
            Mostrando {posts.length} {posts.length === 1 ? "post" : "posts"} com a tag{" "}
            <strong className="text-accent">{activeTag}</strong>
            {" — "}
            <Link
              href={`/blog${lang !== "pt" ? `?lang=${lang}` : ""}`}
              className="text-accent/60 hover:text-accent underline underline-offset-4 transition-colors"
            >
              limpar filtro
            </Link>
          </p>
        )}

        {/* Posts grid */}
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/40 text-xl mb-4">
              {t("no_posts_title", lang)}
            </p>
            <p className="text-white/30">{t("no_posts_sub", lang)}</p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-20 glass p-8 sm:p-10 glow-border">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest text-accent/70 font-medium">
              {t("newsletter_tag", lang)}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-3 mb-3">
              {t("newsletter_title", lang)}
            </h2>
            <p className="text-white/50 mb-6">{t("newsletter_sub", lang)}</p>
            <NewsletterForm />
          </div>
        </div>

        {/* Sponsorship footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-white/20">
            {t("sponsor_cta", lang)}{" "}
            <a
              href="mailto:hernando@hernando.ia"
              className="text-accent/40 hover:text-accent transition-colors"
            >
              {t("sponsor_link", lang)}
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
