import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { t, formatDate, type Lang } from "@/lib/translations";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  lang?: Lang;
}

export default function BlogCard({ post, lang = "pt" }: BlogCardProps) {
  const { title, slug, date, excerpt, tags, readingTime, sponsored, premium } = post;

  const formattedDate = formatDate(date, lang);
  const langParam = lang !== "pt" ? `?lang=${lang}` : "";

  return (
    <article className="group card-invert transition-colors duration-300 border border-[--border] h-full">
      <Link href={`/blog/${slug}${langParam}`} className="block p-6 h-full">
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
        <h3 className="text-lg font-bold uppercase tracking-tighter leading-tight mb-2 card-invert-text group-hover:text-[--accent-foreground]">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-[--muted-foreground] leading-relaxed mb-4 line-clamp-2 card-invert-muted">
          {excerpt}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-[0.08em] px-2.5 py-1 border border-[--border] text-[--muted-foreground]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Read more */}
        <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-tighter text-[--muted-foreground] group-hover:text-[--accent-foreground] transition-colors">
          {t("card_read_more", lang)}
        </div>
      </Link>
    </article>
  );
}
