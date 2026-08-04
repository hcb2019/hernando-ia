"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import {
  Film, Apple, Car, TrendingUp, Brain, Zap, UtensilsCrossed,
  Smartphone, Rocket, FolderGit2, type LucideIcon
} from "lucide-react";

// ── Props ───────────────────────────────────────────────────────────────

interface GitHubRepo {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface ProjectsSectionProps {
  repos: GitHubRepo[];
  instagramFollowers?: number;
  instagramPosts?: number;
  instagramReach?: number;
}

// ── Repo → project card mapping ──────────────────────────────────────────

interface ProjectMeta {
  Icon: LucideIcon;
  tags: string[];
  status: string;
  priority: number;
}

const PROJECT_META: Record<string, ProjectMeta> = {
  "ufokko": {
    Icon: Film,
    tags: ["FastAPI", "React", "MongoDB", "Marketplace"],
    status: "PRODUÇÃO",
    priority: 1,
  },
  "arenabite": {
    Icon: Apple,
    tags: ["Next.js", "TypeScript", "IA", "SaaS"],
    status: "EM DEV",
    priority: 2,
  },
  "gold-carbon": {
    Icon: Car,
    tags: ["Next.js", "TypeScript", "BYD", "Carbono"],
    status: "EM DEV",
    priority: 3,
  },
  "popularizei": {
    Icon: TrendingUp,
    tags: ["Next.js", "TypeScript", "IA", "Growth"],
    status: "EM DEV",
    priority: 4,
  },
  "hernando-ia": {
    Icon: Brain,
    tags: ["Next.js", "Tailwind", "Blog", "IA"],
    status: "ATIVO",
    priority: 5,
  },
  "claude-code-skills": {
    Icon: Zap,
    tags: ["Claude Code", "Python", "Skills", "Open Source"],
    status: "ATIVO",
    priority: 6,
  },
  "nutri-talita": {
    Icon: UtensilsCrossed,
    tags: ["Next.js", "Sanity", "CMS", "TypeScript"],
    status: "ATIVO",
    priority: 7,
  },
  "videomakers-app-antigo": {
    Icon: Smartphone,
    tags: ["React Native", "Expo", "Firebase", "Legado"],
    status: "ARQUIVADO",
    priority: 8,
  },
};

const DEFAULT_META: ProjectMeta = {
  Icon: FolderGit2,
  tags: ["Open Source"],
  status: "EM DEV",
  priority: 99,
};

function getProjectMeta(repo: GitHubRepo): ProjectMeta {
  if (PROJECT_META[repo.name.toLowerCase()]) {
    return PROJECT_META[repo.name.toLowerCase()];
  }
  for (const [key, meta] of Object.entries(PROJECT_META)) {
    if (repo.name.toLowerCase().includes(key) || key.includes(repo.name.toLowerCase())) {
      return meta;
    }
  }
  const tags = repo.language ? [repo.language] : [];
  return { ...DEFAULT_META, tags };
}

// ── Helpers ─────────────────────────────────────────────────────────────

function formatNumber(n: number): string {
  if (n >= 1000) {
    return (n / 1000).toFixed(n % 1000 >= 100 ? 1 : 0) + "K";
  }
  return String(n);
}

function formatReach(n: number): string {
  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(1) + "M";
  }
  if (n >= 1000) {
    return Math.round(n / 1000) + "K";
  }
  return String(n);
}

// ── Component ───────────────────────────────────────────────────────────

export default function ProjectsSection({
  repos,
  instagramFollowers = 1145,
  instagramPosts = 109,
  instagramReach = 292000,
}: ProjectsSectionProps) {
  const activeRepos = repos
    .filter((r) => getProjectMeta(r).status !== "ARQUIVADO")
    .sort((a, b) => getProjectMeta(a).priority - getProjectMeta(b).priority);

  const visibleRepos = activeRepos.slice(0, 9);

  return (
    <section id="projetos" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="mb-20">
            <span className="text-xs uppercase tracking-[0.15em] text-[--muted-foreground] font-medium">
              PROJETOS
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.85] mt-4 mb-6">
              O QUE ESTOU{" "}
              <span className="text-[--accent]">CONSTRUINDO</span>
            </h2>
            <p className="text-lg text-[--muted-foreground] max-w-2xl">
              Produtos e ferramentas que aplicam IA para resolver problemas reais —
              do mercado de vídeo à nutrição, do growth ao open source.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[--border]">
          {visibleRepos.map((repo, i) => {
            const meta = getProjectMeta(repo);
            const IconComponent = meta.Icon;
            return (
              <ScrollReveal key={repo.name} delay={i * 100}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[--background] p-8 flex flex-col gap-5 group card-invert transition-colors duration-300 block h-full"
                >
                  <div className="flex justify-end">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 border ${
                        meta.status === "PRODUÇÃO"
                          ? "border-[--accent] text-[--accent]"
                          : meta.status === "ARQUIVADO"
                            ? "border-[--border] text-[--muted-foreground]/40"
                            : "border-[--border] text-[--muted-foreground]"
                      }`}
                    >
                      {meta.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <IconComponent className="w-7 h-7 text-[--accent]" strokeWidth={1.5} />
                    <h3 className="text-xl font-bold uppercase tracking-tighter card-invert-text group-hover:text-[--accent-foreground]">
                      {repo.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </h3>
                  </div>

                  <p className="text-sm text-[--muted-foreground] leading-relaxed flex-grow card-invert-muted">
                    {repo.description || "Projeto em desenvolvimento."}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-[0.08em] px-2.5 py-1 border border-[--border] text-[--muted-foreground]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-[--muted-foreground] opacity-0 group-hover:opacity-100 transition-opacity">
                    {meta.status === "ARQUIVADO" ? "VER CÓDIGO →" : "VISITAR PROJETO →"}
                  </div>
                </a>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Instagram social proof */}
        <ScrollReveal delay={300}>
          <div className="mt-16 border-2 border-[--border] p-10 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
              <div className="text-center">
                <span className="text-5xl md:text-7xl font-bold tabular-nums leading-[0.8]">
                  {formatNumber(instagramFollowers)}
                </span>
                <p className="text-xs uppercase tracking-[0.12em] text-[--muted-foreground] mt-2">
                  Seguidores
                </p>
              </div>
              <div className="text-center">
                <span className="text-5xl md:text-7xl font-bold tabular-nums leading-[0.8]">
                  {instagramPosts}
                </span>
                <p className="text-xs uppercase tracking-[0.12em] text-[--muted-foreground] mt-2">
                  Posts
                </p>
              </div>
              <div className="text-center">
                <span className="text-5xl md:text-7xl font-bold tabular-nums leading-[0.8] text-[--accent]">
                  {formatReach(instagramReach)}
                </span>
                <p className="text-xs uppercase tracking-[0.12em] text-[--muted-foreground] mt-2">
                  Alcance/30d
                </p>
              </div>
            </div>
            <a
              href="https://instagram.com/hernando.ia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 border-2 border-[--border] text-[--foreground] text-sm font-bold uppercase tracking-tighter hover:bg-[--foreground] hover:text-[--background] transition-all"
            >
              SEGUIR @HERNANDO.IA
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
