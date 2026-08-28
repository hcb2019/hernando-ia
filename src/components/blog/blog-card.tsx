"use client";

import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { t, formatDate, type Lang } from "@/lib/translations";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  lang?: Lang;
}

export default function BlogCard({ post, lang = "pt" }: BlogCardProps) {
  const { title, slug, date, excerpt, tags, readingTime, sponsored, premium, image } = post;

  const formattedDate = formatDate(date, lang);
  const langParam = lang !== "pt" ? `?lang=${lang}` : "";

  return (
    <article className="group card-invert transition-all duration-300 border border-[--border] h-full hover:border-[--accent]/30">
      <Link href={`/blog/${slug}${langParam}`} className="block h-full">
        {/* Image */}
        {image && (
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[--background] via-transparent to-transparent opacity-60" />
          </div>
        )}

        <div className="p-6">
          {/* Meta row */}
          <div className="flex items-center gap-3 text-xs text-[--muted-foreground] mb-3 card-invert-muted">
            <time dateTime={date}>{formattedDate}</time>
            <span className="text-[--border]">-</span>
            <span>{readingTime} {t("min_read", lang)}</span>
            {sponsored && (
              <>
                <span className="text-[--border]">-</span>
                <span className="text-[--accent] font-medium text-[10px] uppercase tracking-wider">
                  {t("sponsored_label", lang)}
                </span>
              </>
            )}
            {premium && (
              <>
                <span className="text-[--border]">-</span>
                <span className="text-[--accent] font-bold text-[10px] uppercase tracking-wider">
                  {t("premium_label", lang)}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold uppercase tracking-tighter leading-tight mb-2 card-invert-text group-hover:text-[--accent-foreground] transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-[--muted-foreground] leading-relaxed mb-4 line-clamp-2 card-invert-muted">
            {excerpt}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-[0.06em] px-2 py-0.5 border border-[--border]/50 text-[--muted-foreground]/60"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-[10px] text-[--muted-foreground]/40 self-center">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Read more */}
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-tighter text-[--muted-foreground] group-hover:text-[--accent-foreground] transition-colors">
            <span>{t("card_read_more", lang)}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
