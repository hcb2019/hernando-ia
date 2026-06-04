import type { MDXComponents } from 'mdx/types'

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold mt-12 mb-6 glow-text">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white/90">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-medium mt-8 mb-3 text-white/80">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-relaxed text-white/70">{children}</p>
  ),
  a: ({ children, href }) => (
    <a href={href} className="text-accent hover:underline decoration-accent/50 underline-offset-4">
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="my-4 ml-6 list-disc text-white/70 space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-6 list-decimal text-white/70 space-y-1">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-accent/50 pl-4 my-6 italic text-white/60">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="bg-surface px-1.5 py-0.5 rounded text-sm font-mono text-accent">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-surface border border-border rounded-lg p-4 my-6 overflow-x-auto text-sm font-mono text-white/80">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-10 border-border" />,
  img: ({ src, alt }) => (
    <img src={src} alt={alt} className="rounded-lg my-8 max-w-full" />
  ),
}

export function useMDXComponents(): MDXComponents {
  return components
}
