import { getAllTags, getBlogPosts } from "@/lib/blog";
import { generatePageMeta } from "@/lib/seo";
import BlogIndex from "@/components/blog/blog-index";
import Navbar from "@/components/layout/navbar";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMeta({
  title: "Blog — IA, Startups e Tecnologia",
  description:
    "Reflexões sobre engenharia de IA, startups e construção do futuro. Tutoriais, insights e bastidores de produtos reais.",
  path: "/blog",
});

// The canonical index is prerendered and revalidated hourly. Query filters run in BlogIndex on the client.
export const revalidate = 3600;

export default function BlogPage() {
  const initialPosts = getBlogPosts().filter((post) => !post.noindex);
  const initialTags = getAllTags();

  return (
    <div className="min-h-screen bg-[#08081a]">
      <div className="fixed inset-0 grid-bg opacity-[0.03] pointer-events-none" />
      <Navbar />
      <main className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 pt-24 pb-24">
        <Suspense fallback={null}>
          <BlogIndex initialPosts={initialPosts} initialTags={initialTags} />
        </Suspense>
      </main>
    </div>
  );
}
