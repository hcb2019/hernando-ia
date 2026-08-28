import { NextRequest, NextResponse } from "next/server";
import { getAllTags, getBlogPosts } from "@/lib/blog";
import type { Lang } from "@/lib/translations";

const ALLOWED_LANGUAGES = new Set<Lang>(["pt", "en", "es"]);

export function GET(request: NextRequest) {
  const rawLang = request.nextUrl.searchParams.get("lang") ?? "pt";
  const tag = request.nextUrl.searchParams.get("tag")?.trim() ?? "";

  if (!ALLOWED_LANGUAGES.has(rawLang as Lang) || tag.length > 100) {
    return NextResponse.json({ error: "Invalid blog filter." }, { status: 400 });
  }

  const lang = rawLang as Lang;
  const allPosts = getBlogPosts(lang).filter((post) => !post.noindex);
  const posts = tag ? allPosts.filter((post) => post.tags.includes(tag)) : allPosts;

  return NextResponse.json(
    {
      lang,
      activeTag: tag || null,
      posts,
      tags: getAllTags(lang),
      totalPosts: allPosts.length,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
