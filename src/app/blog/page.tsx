import { getBlogPosts, getAllTags } from '@/lib/blog'
import BlogCard from '@/components/blog/blog-card'
import NewsletterForm from '@/components/blog/newsletter-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Hernando.ia',
  description:
    'Thoughts on AI engineering, startups, and building the future. Tutorials, insights, and product stories.',
  openGraph: {
    title: 'Blog | Hernando.ia',
    description: 'AI engineering insights, tutorials, and product stories.',
  },
}

export default function BlogPage() {
  const posts = getBlogPosts()
  const tags = getAllTags()

  return (
    <div className="min-h-screen bg-[#08081a]">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg opacity-[0.03] pointer-events-none" />

      <main className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold glow-text mb-4">
            Blog
          </h1>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Deep dives into AI engineering, startup building, and the tools shaping
            the future. Written by Hernando.
          </p>
        </div>

        {/* Tag filters */}
        {tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tags.map(({ tag, count }) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full border border-accent/20 text-accent/70 bg-accent/5"
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
            <p className="text-white/40 text-xl mb-4">No posts yet.</p>
            <p className="text-white/30">
              The blog is being set up. Check back soon for the first post!
            </p>
          </div>
        )}

        {/* Monetization: Newsletter CTA */}
        <div className="mt-20 glass p-8 sm:p-10 glow-border">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest text-accent/70 font-medium">
              Stay in the loop
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-3 mb-3">
              Get AI insights straight to your inbox
            </h2>
            <p className="text-white/50 mb-6">
              Join the newsletter for exclusive content, early access to new projects,
              and curated AI engineering resources.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Sponsorship footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-white/20">
            Interested in sponsoring?{' '}
            <a
              href="mailto:sponsor@hernando.ia"
              className="text-accent/40 hover:text-accent transition-colors"
            >
              Get in touch
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
