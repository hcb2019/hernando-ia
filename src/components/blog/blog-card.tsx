import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { title, slug, date, excerpt, tags, readingTime, sponsored, premium } = post;

  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group card-invert transition-colors duration-300 border border-[--border] h-full">
      <Link href={`/blog/${slug}`} className="block p-6 h-full">
        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-[--muted-foreground] mb-3 card-invert-muted">
          <time dateTime={date}>{formattedDate}</time>
          <span className="text-[--border]">-</span>
          <span>{readingTime} min leitura</span>
          {sponsored && (
            <>
              <span className="text-[--border]">-</span>
              <span className="text-[--accent] font-medium text-[10px] uppercase tracking-wider">Patrocinado</span>
            </>
          )}
          {premium && (
            <>
              <span className="text-[--border]">-</span>
              <span className="text-[--accent] font-bold text-[10px] uppercase tracking-wider">Premium</span>
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
          LER MAIS →
        </div>
      </Link>
    </article>
  );
}
