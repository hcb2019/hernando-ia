import Link from "next/link";
import BlogCard from "@/components/blog/blog-card";
import NewsletterForm from "@/components/blog/newsletter-form";
import ScrollReveal from "@/components/ui/scroll-reveal";
import type { BlogPost } from "@/lib/blog";

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const displayPosts = posts.slice(0, 6);

  return (
    <section className="relative py-32 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="mb-20">
            <span className="text-xs uppercase tracking-[0.15em] text-[--muted-foreground] font-medium">
              BLOG
            </span>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.85] mt-4 mb-6">
              ULTIMOS{" "}
              <span className="text-[--accent]">ARTIGOS</span>
            </h2>
            <p className="text-lg text-[--muted-foreground] max-w-xl">
              Projetos, automações e aprendizados sobre IA na prática.
              Bastidores de produtos que estou construindo.
            </p>
          </div>
        </ScrollReveal>

        {displayPosts.length > 0 ? (
          <div className="grid gap-px bg-[--border] sm:grid-cols-2 lg:grid-cols-3">
            {displayPosts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 100}>
                <div className="bg-[--background]">
                  <BlogCard post={post} index={i} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-[--border]">
            <p className="text-[--muted-foreground] text-lg">
              Nenhum artigo ainda. Em breve conteudo sobre IA e engenharia.
            </p>
          </div>
        )}

        {/* View all link */}
        {posts.length > 6 && (
          <ScrollReveal delay={400}>
            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-tighter border-2 border-[--border] px-6 py-3 hover:bg-[--foreground] hover:text-[--background] hover:border-[--foreground] transition-all"
              >
                VER TODOS OS ARTIGOS ({posts.length}) →
              </Link>
            </div>
          </ScrollReveal>
        )}

        {/* Newsletter CTA */}
        <ScrollReveal delay={300}>
          <div className="mt-20 border-2 border-[--border] p-8 sm:p-10">
            <div className="max-w-2xl mx-auto text-center">
              <span className="text-xs uppercase tracking-[0.15em] text-[--muted-foreground] font-medium">
                FIQUE POR DENTRO
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tighter mt-4 mb-4">
                RECEBA INSIGHTS DE IA DIRETO NO SEU EMAIL
              </h3>
              <p className="text-[--muted-foreground] mb-6">
                Entre para a newsletter e receba conteudo exclusivo, acesso antecipado
                a novos projetos e recursos curados de engenharia de IA. Sem spam.
              </p>
              <NewsletterForm />
              <p className="text-xs text-[--muted-foreground]/40 mt-4">
                Ao assinar voce concorda com nossa politica de privacidade.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
