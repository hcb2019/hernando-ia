"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface TagCount {
  tag: string;
  count: number;
}

interface TagFilterBarProps {
  tags: TagCount[];
  activeTag: string | null;
  totalPosts: number;
  lang: string;
}

const INITIAL_SHOW = 20;

export default function TagFilterBar({ tags, activeTag, totalPosts, lang }: TagFilterBarProps) {
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");

  const visibleTags = useMemo(() => {
    let filtered = tags;
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = tags.filter((t) => t.tag.toLowerCase().includes(q));
    }
    return expanded ? filtered : filtered.slice(0, INITIAL_SHOW);
  }, [tags, search, expanded]);

  const hiddenCount = tags.length - INITIAL_SHOW;

  return (
    <div className="space-y-3 mb-8">
      {/* Search + expand row */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search input */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <input
            type="text"
            placeholder="Filtrar tags..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (!expanded && e.target.value) setExpanded(true);
            }}
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-1.5 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-accent/40 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 text-xs"
              aria-label="Limpar busca"
            >
              ×
            </button>
          )}
        </div>

        {/* Expand button */}
        {hiddenCount > 0 && !search && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-accent/60 hover:text-accent transition-colors whitespace-nowrap"
          >
            {expanded ? "Recolher" : `+ ${hiddenCount} tags`}
          </button>
        )}
      </div>

      {/* Tags grid — compact 2-column on mobile */}
      <div className="flex flex-wrap gap-1.5">
        {/* "All" button */}
        <Link
          href={`/blog${lang !== "pt" ? `?lang=${lang}` : ""}`}
          className={`text-xs px-2.5 py-1 rounded-md border transition-colors font-medium ${
            !activeTag
              ? "border-accent bg-accent text-black"
              : "border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/60"
          }`}
        >
          Todos
          <span className="ml-1 opacity-50">{totalPosts}</span>
        </Link>

        {visibleTags.map(({ tag, count }) => {
          const isActive = activeTag === tag;
          const href = `/blog?tag=${encodeURIComponent(tag)}${lang !== "pt" ? `&lang=${lang}` : ""}`;
          return (
            <Link
              key={tag}
              href={href}
              className={`text-xs px-2.5 py-1 rounded-md border transition-colors font-medium ${
                isActive
                  ? "border-accent bg-accent text-black"
                  : "border-accent/15 text-accent/70 bg-accent/[0.03] hover:bg-accent/[0.08] hover:border-accent/30"
              }`}
            >
              {tag}
              <span className="ml-1 opacity-50">{count}</span>
              {isActive && <span className="ml-0.5">×</span>}
            </Link>
          );
        })}

        {/* Collapse button at end when expanded */}
        {expanded && hiddenCount > 0 && !search && (
          <button
            onClick={() => setExpanded(false)}
            className="text-xs px-2.5 py-1 rounded-md border border-white/[0.06] text-white/30 hover:text-white/60 hover:border-white/15 transition-colors"
          >
            Recolher
          </button>
        )}
      </div>
    </div>
  );
}
