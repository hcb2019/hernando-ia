import { getBlogPosts, getAllTags } from "@/lib/blog";
import BlogCard from "@/components/blog/blog-card";
import NewsletterForm from "@/components/blog/newsletter-form";
import LanguageToggle from "@/components/blog/language-toggle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Hernando.ia",
  description:
    "Reflexões sobre engenharia de IA, startups e construção do futuro. Tutoriais, insights e bastidores de produtos reais.",
  openGraph: {
    title: "Blog | Hernando.ia",
    description: "Insights de engenharia de IA, tutoriais e histórias de produtos.",
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-[#08081a]">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg opacity-[0.03] pointer-events-none" />

      <main className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-24">
        {/* Top bar: language toggle */}
        <div className="flex justify-end mb-6">
          <LanguageToggle />
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold glow-text mb-4">Blog</h1>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Mergulhos profundos em engenharia de IA, construção de startups e as
            ferramentas que moldam o futuro. Escrito por Hernando.
          </p>
        </div>

        {/* Tag filters */}
        {tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tags.map(({ tag, count }) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full border border-accent/20 text-accent/70 bg-accent/5 cursor-pointer hover:bg-accent/10 transition-colors"
              >
                {tag} ({count})
              </span>
            ))}
          </div>
        )}

        {/* Posts grid */}
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/40 text-xl mb-4">Nenhum post ainda.</p>
            <p className="text-white/30">
              O blog está sendo configurado. Volte em breve para o primeiro artigo!
            </p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-20 glass p-8 sm:p-10 glow-border">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest text-accent/70 font-medium">
              Fique por dentro
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-3 mb-3">
              Receba insights de IA direto no seu email
            </h2>
            <p className="text-white/50 mb-6">
              Entre para a newsletter e receba conteúdo exclusivo, acesso antecipado
              a novos projetos e recursos curados de engenharia de IA.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Sponsorship footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-white/20">
            Interessado em patrocinar?{" "}
            <a
              href="mailto:hernando@hernando.ia"
              className="text-accent/40 hover:text-accent transition-colors"
            >
              Entre em contato
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
