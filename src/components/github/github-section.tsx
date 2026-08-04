"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, animate } from "framer-motion";
import Image from "next/image";
import {
  getGithubUser,
  getGithubRepos,
  getGithubActivity,
  computeStats,
  eventLabel,
  type GitHubUser,
  type GitHubRepo,
  type GitHubEvent,
  type GitHubStats,
} from "@/lib/github";
import { Star, GitFork, GitCommit, GitPullRequest, CircleDot, MessageSquare, Tag, Plus, Dot } from "lucide-react";

// ── Props ───────────────────────────────────────────────────────────────

interface GitHubSectionProps {
  initialUser: GitHubUser | null;
  initialRepos: GitHubRepo[];
  initialStats: GitHubStats;
}

// ── PT-BR event labels ──────────────────────────────────────────────────

function eventLabelPT(type: string): string {
  const labels: Record<string, string> = {
    PushEvent: "Commit em",
    WatchEvent: "Favoritou",
    ForkEvent: "Fork de",
    CreateEvent: "Criou",
    PullRequestEvent: "PR em",
    IssuesEvent: "Issue em",
    IssueCommentEvent: "Comentou em",
    ReleaseEvent: "Release de",
    DeleteEvent: "Removeu",
    PublicEvent: "Publicou",
    MemberEvent: "Colaborador em",
    GollumEvent: "Editou wiki de",
  };
  return labels[type] ?? eventLabel(type);
}

// ── Sub-components ──────────────────────────────────────────────────────

function AnimatedCounter({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-5xl md:text-7xl font-bold tabular-nums leading-[0.8]">
        {display}
      </span>
      <span className="text-xs uppercase tracking-[0.12em] text-[--muted-foreground]">
        {label}
      </span>
    </div>
  );
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f7df1e", Python: "#3572a5",
  Rust: "#dea584", Go: "#00add8", Swift: "#f05138", Kotlin: "#a97bff",
  Java: "#b07219", HTML: "#e34c26", CSS: "#563d7c", Shell: "#89e051",
  Ruby: "#701516", C: "#555555", "C++": "#f34b7d", "C#": "#178600",
};

function langColor(lang: string | null): string {
  if (!lang) return "var(--muted-foreground)";
  return LANG_COLORS[lang] ?? "var(--accent)";
}

function tempoRelativo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffSec = Math.floor((now - then) / 1000);
  if (diffSec < 60) return "agora mesmo";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}min`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay}d`;
  const diffMonth = Math.floor(diffDay / 30);
  return `${diffMonth}mes`;
}

// ── Fallbacks ────────────────────────────────────────────────────────────

const LAST_RESORT_USER: GitHubUser = {
  login: "hcb2019",
  id: 223763838,
  name: "Hernando Candido Begnami",
  avatar_url: "https://avatars.githubusercontent.com/u/223763838?v=4",
  html_url: "https://github.com/hcb2019",
  company: null,
  blog: "",
  location: null,
  bio: null,
  twitter_username: null,
  public_repos: 1,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: "",
  updated_at: "",
};

const LAST_RESORT_STATS: GitHubStats = { repos: 1, stars: 0, followers: 0, forks: 0 };
const LAST_RESORT_REPOS: GitHubRepo[] = [];
const LAST_RESORT_EVENTS: GitHubEvent[] = [];

// ── Animation variants ──────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

// ── Main component ──────────────────────────────────────────────────────

export default function GitHubSection({
  initialUser,
  initialRepos,
  initialStats,
}: GitHubSectionProps) {
  const [user, setUser] = useState<GitHubUser | null>(initialUser ?? LAST_RESORT_USER);
  const [repos, setRepos] = useState<GitHubRepo[]>(initialRepos);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [stats, setStats] = useState<GitHubStats>(initialStats);
  const [loading, setLoading] = useState(!initialUser);

  const useFallback = useCallback(() => {
    setUser(LAST_RESORT_USER);
    setRepos(LAST_RESORT_REPOS);
    setEvents(LAST_RESORT_EVENTS);
    setStats(LAST_RESORT_STATS);
    setLoading(false);
  }, []);

  const fetchData = useCallback(async () => {
    const timeout = setTimeout(() => useFallback(), 4000);
    try {
      const [userData, reposData, eventsData] = await Promise.all([
        getGithubUser(),
        getGithubRepos(10),
        getGithubActivity(6),
      ]);
      clearTimeout(timeout);
      setUser(userData);
      setRepos(reposData);
      setEvents(eventsData);
      const repoAgg = computeStats(reposData);
      setStats({
        repos: userData.public_repos,
        stars: repoAgg.stars,
        followers: userData.followers,
        forks: repoAgg.forks,
      });
    } catch {
      clearTimeout(timeout);
      useFallback();
    } finally {
      setLoading(false);
    }
  }, [useFallback]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading && !user) {
    return <section className="w-full py-32 px-4" />;
  }

  const u = user!;
  const s = stats;

  return (
    <section className="w-full py-32 px-4" id="github">
      <motion.div
        className="mx-auto max-w-5xl"
        variants={containerVariants}
        initial="visible"
        animate="visible"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="mb-16">
          <span className="text-xs uppercase tracking-[0.15em] text-[--muted-foreground] font-medium">
            GITHUB
          </span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.85] mt-4 mb-4">
            ATIVIDADE{" "}
            <span className="text-[--accent]">OPEN SOURCE</span>
          </h2>
          <p className="text-lg text-[--muted-foreground] max-w-2xl">
            Contribuicoes open-source e projetos publicos
          </p>
        </motion.div>

        {/* Profile card */}
        <motion.div
          variants={itemVariants}
          className="border-2 border-[--border] p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-8"
        >
          <div className="relative flex-shrink-0">
            <Image
              src={u.avatar_url}
              alt={`${u.login} avatar`}
              width={80}
              height={80}
              className="border-2 border-[--border]"
            />
          </div>
          <div className="text-center sm:text-left flex-1">
            <a
              href={u.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold uppercase tracking-tighter hover:text-[--accent] transition-colors"
            >
              {u.name ?? u.login}
            </a>
            <p className="text-[--muted-foreground] text-sm mt-1">@{u.login}</p>
            {u.bio && (
              <p className="text-sm mt-2 max-w-lg leading-relaxed text-[--muted-foreground]">
                {u.bio}
              </p>
            )}
          </div>
        </motion.div>

        {/* Stats — large, decorative */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[--border] mb-8"
        >
          <div className="bg-[--background] p-6">
            <AnimatedCounter value={s.repos} label="REPOSITORIOS" />
          </div>
          <div className="bg-[--background] p-6">
            <AnimatedCounter value={s.stars} label="ESTRELAS" />
          </div>
          <div className="bg-[--background] p-6">
            <AnimatedCounter value={s.followers} label="SEGUIDORES" />
          </div>
          <div className="bg-[--background] p-6">
            <AnimatedCounter value={s.forks} label="FORKS" />
          </div>
        </motion.div>

        {/* Repos */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="text-lg font-bold uppercase tracking-tighter mb-4">
            REPOSITORIOS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[--border]">
            {repos.slice(0, 6).map((repo) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[--background] p-5 group block hover:bg-[--muted] transition-colors duration-300"
                variants={itemVariants}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-sm uppercase tracking-tighter truncate group-hover:text-[--accent] transition-colors">
                    {repo.name}
                  </h4>
                  <span className="flex items-center gap-1 text-xs text-[--muted-foreground] flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    {repo.stargazers_count}
                  </span>
                </div>
                {repo.description && (
                  <p className="text-xs text-[--muted-foreground] mt-1.5 line-clamp-2 leading-relaxed">
                    {repo.description}
                  </p>
                )}
                <div className="flex items-center gap-4 mt-3 text-xs">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 flex-shrink-0"
                        style={{ backgroundColor: langColor(repo.language) }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="text-[--muted-foreground] flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    {repo.forks_count}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Recent activity */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-bold uppercase tracking-tighter mb-4">
            ATIVIDADE RECENTE
          </h3>
          <div className="space-y-2">
            {events.length === 0 && (
              <p className="text-sm text-[--muted-foreground] py-8 text-center">
                Nenhuma atividade recente. Os dados sao atualizados automaticamente.
              </p>
            )}
            {events.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className="border border-[--border] p-3 flex items-center gap-3 text-sm"
              >
                <div className="w-8 h-8 border border-[--border] flex items-center justify-center flex-shrink-0">
                  {event.type === "PushEvent" ? (
                    <GitCommit className="w-3.5 h-3.5 text-[--accent]" />
                  ) : event.type === "WatchEvent" ? (
                    <Star className="w-3.5 h-3.5 text-[--accent]" />
                  ) : event.type === "ForkEvent" ? (
                    <GitFork className="w-3.5 h-3.5 text-[--accent]" />
                  ) : event.type === "CreateEvent" ? (
                    <Plus className="w-3.5 h-3.5 text-[--accent]" />
                  ) : event.type === "PullRequestEvent" ? (
                    <GitPullRequest className="w-3.5 h-3.5 text-[--accent]" />
                  ) : event.type === "IssuesEvent" ? (
                    <CircleDot className="w-3.5 h-3.5 text-[--accent]" />
                  ) : event.type === "IssueCommentEvent" ? (
                    <MessageSquare className="w-3.5 h-3.5 text-[--accent]" />
                  ) : event.type === "ReleaseEvent" ? (
                    <Tag className="w-3.5 h-3.5 text-[--accent]" />
                  ) : (
                    <Dot className="w-3.5 h-3.5 text-[--accent]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[--foreground] font-medium">
                    {eventLabelPT(event.type)}{" "}
                  </span>
                  <a
                    href={`https://github.com/${event.repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[--accent] hover:underline font-medium"
                  >
                    {event.repo.name.split("/")[1] ?? event.repo.name}
                  </a>
                </div>
                <span className="text-xs text-[--muted-foreground] flex-shrink-0">
                  {tempoRelativo(event.created_at)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="mt-10 text-center">
          <a
            href={`https://github.com/${u.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[--border] text-sm font-bold uppercase tracking-tighter hover:bg-[--foreground] hover:text-[--background] transition-all"
          >
            VER PERFIL NO GITHUB →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
