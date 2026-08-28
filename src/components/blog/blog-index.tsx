"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { BlogPost } from "@/lib/blog";
import { t, type Lang } from "@/lib/translations";
import BlogCard from "@/components/blog/blog-card";
import NewsletterForm from "@/components/blog/newsletter-form";
import SubscribeBanner from "@/components/blog/subscribe-banner";
import LanguageToggle from "@/components/blog/language-toggle";
import TagFilterBar from "@/components/blog/tag-filter-bar";

interface TagCount {
  tag: string;
  count: number;
}

interface BlogIndexData {
  lang: Lang;
  activeTag: string | null;
  posts: BlogPost[];
  tags: TagCount[];
  totalPosts: number;
}

interface BlogIndexProps {
  initialPosts: BlogPost[];
  initialTags: TagCount[];
}

const DEFAULT_DATA = (posts: BlogPost[], tags: TagCount[]): BlogIndexData => ({
  lang: "pt",
  activeTag: null,
  posts,
  tags,
  totalPosts: posts.length,
});

function parseLang(raw: string | null): Lang {
  return raw === "en" || raw === "es" ? raw : "pt";
}

export default function BlogIndex({ initialPosts, initialTags }: BlogIndexProps) {
  const searchParams = useSearchParams();
  const lang = parseLang(searchParams.get("lang"));
  const tag = searchParams.get("tag")?.trim() || null;
  const [filteredData, setFilteredData] = useState<BlogIndexData>(() => DEFAULT_DATA(initialPosts, initialTags));
  const isDefaultFilter = lang === "pt" && !tag;
  const data = isDefaultFilter ? DEFAULT_DATA(initialPosts, initialTags) : filteredData;

  useEffect(() => {
    if (isDefaultFilter) return;

    const controller = new AbortController();
    const params = new URLSearchParams({ lang });
    if (tag) params.set("tag", tag);

    fetch(`/api/blog-index?${params.toString()}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("Blog filter failed"))))
      .then((nextData: BlogIndexData) => setFilteredData(nextData))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error("Unable to load blog filter", error);
      });

    return () => controller.abort();
  }, [initialPosts, initialTags, isDefaultFilter, lang, tag]);

  const { posts, tags, totalPosts, activeTag } = data;

  return (
    <>
      <div className="flex justify-end mb-6">
        <LanguageToggle currentLang={lang} />
      </div>

      <SubscribeBanner />

      <div className="text-center mb-16">
        <h1 className="text-5xl sm:text-6xl font-bold glow-text mb-4">{t("blog_title", lang)}</h1>
        <p className="text-white/50 max-w-xl mx-auto text-lg">{t("blog_subtitle", lang)}</p>
      </div>

      {tags.length > 0 && (
        <TagFilterBar tags={tags} activeTag={activeTag} totalPosts={totalPosts} lang={lang} />
      )}

      {activeTag && (
        <p className="text-center text-sm text-white/40 -mt-4 mb-8">
          Mostrando {posts.length} {posts.length === 1 ? "post" : "posts"} com{" "}
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

      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => <BlogCard key={post.slug} post={post} index={index} lang={lang} />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-white/40 text-xl mb-4">{t("no_posts_title", lang)}</p>
          <p className="text-white/30">{t("no_posts_sub", lang)}</p>
        </div>
      )}

      <div className="mt-20 glass p-8 sm:p-10 glow-border">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest text-accent/70 font-medium">{t("newsletter_tag", lang)}</span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-3 mb-3">{t("newsletter_title", lang)}</h2>
          <p className="text-white/50 mb-6">{t("newsletter_sub", lang)}</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-white/20">
          {t("sponsor_cta", lang)} {" "}
          <a href="mailto:contato@hernandoia.com" className="text-accent/40 hover:text-accent transition-colors">
            {t("sponsor_link", lang)}
          </a>
        </p>
      </div>
    </>
  );
}
