import { readFileSync, existsSync, readdirSync, mkdirSync } from 'fs'
import { join } from 'path'

// ── Types ──────────────────────────────────────────────────────────

export interface BlogPost {
  title: string
  slug: string
  date: string
  excerpt: string
  tags: string[]
  readingTime: number
  /** Whether this post has sponsored / affiliate content */
  sponsored?: boolean
  /** Whether this is premium/gated content */
  premium?: boolean
}

export interface BlogPostWithContent extends BlogPost {
  content: string
}

// ── Frontmatter parser ────────────────────────────────────────────

const FRONTMATTER_RE = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(FRONTMATTER_RE)
  if (!match) {
    return { data: {}, content: raw }
  }
  const [, frontmatterBlock, content] = match
  const data: Record<string, unknown> = {}
  for (const line of frontmatterBlock.split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    let value: unknown = line.slice(colonIdx + 1).trim()

    // Parse YAML-like arrays: [a, b, c]
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    }
    // Parse YAML-like booleans
    if (value === 'true') value = true
    if (value === 'false') value = false
    // Parse numbers
    if (typeof value === 'string' && /^-?\d+(\.\d+)?$/.test(value)) {
      value = Number(value)
    }
    // Strip quotes from strings
    if (typeof value === 'string') {
      value = value.replace(/^["']|["']$/g, '')
    }

    data[key] = value
  }
  return { data, content }
}

function estimateReadingTime(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

function extractExcerpt(content: string, maxLen = 160): string {
  // Strip markdown syntax roughly
  const plain = content
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~`>#]/g, '')
    .replace(/\n+/g, ' ')
    .trim()

  if (plain.length <= maxLen) return plain
  return plain.slice(0, maxLen).replace(/\s+\S*$/, '') + '…'
}

// ── Core utilities ────────────────────────────────────────────────

const BLOG_DIR = join(process.cwd(), 'src', 'content', 'blog')

function ensureBlogDir(): void {
  if (!existsSync(BLOG_DIR)) {
    mkdirSync(BLOG_DIR, { recursive: true })
  }
}

export function getBlogPosts(): BlogPost[] {
  ensureBlogDir()
  const files = readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f))

  const posts: BlogPost[] = []

  for (const file of files) {
    const raw = readFileSync(join(BLOG_DIR, file), 'utf-8')
    const { data, content } = parseFrontmatter(raw)
    const slug = file.replace(/\.mdx?$/, '')

    posts.push({
      title: String(data.title ?? slug),
      slug,
      date: String(data.date ?? new Date().toISOString().split('T')[0]),
      excerpt: String(data.excerpt ?? extractExcerpt(content)),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      readingTime:
        typeof data.readingTime === 'number'
          ? data.readingTime
          : estimateReadingTime(content),
      sponsored: data.sponsored === true,
      premium: data.premium === true,
    })
  }

  // Sort newest first
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return posts
}

export function getBlogPost(slug: string): BlogPostWithContent | null {
  ensureBlogDir()
  const candidates = [`.mdx`, `.md`].map((ext) => join(BLOG_DIR, `${slug}${ext}`))
  const filePath = candidates.find((p) => existsSync(p))

  if (!filePath) return null

  const raw = readFileSync(filePath, 'utf-8')
  const { data, content } = parseFrontmatter(raw)

  return {
    title: String(data.title ?? slug),
    slug,
    date: String(data.date ?? new Date().toISOString().split('T')[0]),
    excerpt: String(data.excerpt ?? extractExcerpt(content)),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTime:
      typeof data.readingTime === 'number'
        ? data.readingTime
        : estimateReadingTime(content),
    sponsored: data.sponsored === true,
    premium: data.premium === true,
    content,
  }
}

/**
 * Returns all unique tags across blog posts, sorted by frequency (descending).
 */
export function getAllTags(): { tag: string; count: number }[] {
  const posts = getBlogPosts()
  const tagMap = new Map<string, number>()

  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1)
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Returns blog posts filtered by a specific tag.
 */
export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getBlogPosts().filter((post) => post.tags.includes(tag))
}
