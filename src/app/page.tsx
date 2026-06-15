import { readFileSync, existsSync } from "fs";
import { join } from "path";
import HeroSection from "@/components/hero/hero-section";
import AboutSection from "@/components/about/about-section";
import PhilosophySection from "@/components/philosophy/philosophy-section";
import ProjectsSection from "@/components/projects/projects-section";
import GithubSection from "@/components/github/github-section";
import BlogSection from "@/components/blog/blog-section";
import ProductsSection from "@/components/products/products-section";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { getBlogPosts } from "@/lib/blog";
import Marquee from "react-fast-marquee";

// ── ISR: revalidate every hour so live-stats.json updates propagate ──────
export const revalidate = 3600;

// ── Types ───────────────────────────────────────────────────────────────

interface LiveStats {
  github?: {
    user?: {
      login: string;
      name?: string | null;
      avatar_url: string;
      html_url: string;
      bio?: string | null;
      location?: string | null;
      public_repos: number;
      followers: number;
      following: number;
    };
    repos?: Array<{
      id?: number;
      name: string;
      full_name: string;
      html_url: string;
      description?: string | null;
      language?: string | null;
      stargazers_count: number;
      forks_count: number;
      updated_at: string;
    }>;
    stats?: {
      repos: number;
      stars: number;
      followers: number;
      forks: number;
    };
    events?: Array<{
      id: string;
      type: string;
      actor: { login: string; avatar_url: string };
      repo: { name: string; url: string };
      payload: Record<string, unknown>;
      created_at: string;
    }>;
  };
  instagram?: {
    followers: number;
    posts: number;
    reach_30d: number;
  };
}

// ── Helpers ─────────────────────────────────────────────────────────────

function formatCount(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return String(n);
}

function formatReach(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1000) return Math.round(n / 1000) + "K";
  return String(n);
}

// ── Data loader ─────────────────────────────────────────────────────────

function loadLiveStats(): LiveStats {
  const statsPath = join(process.cwd(), "src", "data", "live-stats.json");
  if (!existsSync(statsPath)) return {};
  try {
    const raw = readFileSync(statsPath, "utf-8");
    return JSON.parse(raw) as LiveStats;
  } catch {
    return {};
  }
}

// ── Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const posts = getBlogPosts();
  const stats = loadLiveStats();

  // ── Dynamic values from live-stats ────────────────────────────────

  const igFollowers = stats.instagram?.followers ?? 0;
  const igPosts = stats.instagram?.posts ?? 0;
  const igReach = stats.instagram?.reach_30d ?? 0;
  const ghRepoCount = stats.github?.stats?.repos ?? 0;

  const heroFollowers = formatCount(igFollowers);
  const heroProjects = String(ghRepoCount) + "+";
  const heroYears = "10+";

  // Map live-stats repos to GitHubRepo shape
  const ghRepos =
    stats.github?.repos?.map((r, i) => ({
      id: i + 1,
      name: r.name,
      full_name: r.full_name,
      html_url: r.html_url,
      description: r.description ?? null,
      fork: false,
      language: r.language ?? null,
      stargazers_count: r.stargazers_count,
      watchers_count: r.stargazers_count,
      forks_count: r.forks_count,
      open_issues_count: 0,
      topics: [],
      visibility: "public" as const,
      pushed_at: r.updated_at,
      updated_at: r.updated_at,
      created_at: r.updated_at,
      homepage: null,
    })) ?? [];

  const ghUser = stats.github?.user
    ? {
        login: stats.github.user.login,
        id: 0,
        name: stats.github.user.name ?? stats.github.user.login,
        avatar_url: stats.github.user.avatar_url,
        html_url: stats.github.user.html_url,
        company: null,
        blog: "",
        location: stats.github.user.location ?? null,
        bio: stats.github.user.bio ?? null,
        twitter_username: null,
        public_repos: stats.github.user.public_repos,
        public_gists: 0,
        followers: stats.github.user.followers,
        following: stats.github.user.following,
        created_at: "",
        updated_at: "",
      }
    : null;

  const ghStats = stats.github?.stats ?? {
    repos: 0,
    stars: 0,
    followers: 0,
    forks: 0,
  };

  // ── Dynamic marquee items ─────────────────────────────────────────

  const marqueeItems = [
    { value: formatCount(igFollowers), label: "SEGUIDORES IG" },
    { value: String(ghRepoCount), label: "PROJETOS ATIVOS" },
    { value: heroYears, label: "ANOS DE XP" },
    { value: "AI", label: "ENGINEER" },
    { value: "BR", label: "BRASIL" },
    { value: String(igPosts), label: "POSTS IG" },
    { value: formatReach(igReach), label: "ALCANCE 30D" },
  ];

  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          followers={heroFollowers}
          projects={heroProjects}
          yearsXP={heroYears}
        />

        {/* Stats Marquee — dynamic from live-stats */}
        <section className="border-y-2 border-[--border] py-6 bg-[--accent]">
          <Marquee speed={80} gradient={false} autoFill>
            {marqueeItems.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-8">
                <span className="text-3xl md:text-4xl font-bold tabular-nums text-[--accent-foreground]">
                  {item.value}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-[--accent-foreground]/70">
                  {item.label}
                </span>
                <span className="text-2xl text-[--accent-foreground]/30 mx-4">✦</span>
              </span>
            ))}
          </Marquee>
        </section>

        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>

        <div className="section-divider" />
        <PhilosophySection />
        <div className="section-divider" />

        <ProjectsSection
          instagramFollowers={igFollowers}
          instagramPosts={igPosts}
          instagramReach={igReach}
        />

        <GithubSection
          initialUser={ghUser}
          initialRepos={ghRepos}
          initialStats={ghStats}
        />

        <BlogSection posts={posts} />
        <div className="section-divider" />
        <ProductsSection />
      </main>
      <Footer />
    </>
  );
}
