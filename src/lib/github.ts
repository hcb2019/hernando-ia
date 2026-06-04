/**
 * GitHub API utilities for Hernando.ia
 * Fetches user profile, public repos, and recent activity for hcb2019
 */

// ── Types ──────────────────────────────────────────────────────────────

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
  visibility: string;
  pushed_at: string;
  updated_at: string;
  created_at: string;
  homepage: string | null;
}

export interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: Record<string, unknown>;
  created_at: string;
}

export interface GitHubStats {
  repos: number;
  stars: number;
  followers: number;
  forks: number;
}

// ── Constants ──────────────────────────────────────────────────────────

const GITHUB_API = "https://api.github.com";
const USERNAME = "hcb2019";

// ── Helpers ────────────────────────────────────────────────────────────

function headers(): HeadersInit {
  const ghToken = process.env.GITHUB_TOKEN;
  const hdrs: HeadersInit = { Accept: "application/vnd.github.v3+json" };
  if (ghToken) {
    hdrs["Authorization"] = `Bearer ${ghToken}`;
  }
  return hdrs;
}

async function fetchGitHub<T>(path: string): Promise<T> {
  const url = `${GITHUB_API}${path}`;
  const res = await fetch(url, { headers: headers() });

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error("GitHub API rate limit exceeded. Try again later.");
    }
    if (res.status === 404) {
      throw new Error(`GitHub resource not found: ${path}`);
    }
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

// ── Public API ─────────────────────────────────────────────────────────

/**
 * Fetch the GitHub user profile for hcb2019.
 */
export async function getGithubUser(): Promise<GitHubUser> {
  return fetchGitHub<GitHubUser>(`/users/${USERNAME}`);
}

/**
 * Fetch public repositories for hcb2019, sorted by recently pushed.
 * @param limit Maximum number of repos to return (default 10)
 */
export async function getGithubRepos(limit = 10): Promise<GitHubRepo[]> {
  const repos = await fetchGitHub<GitHubRepo[]>(
    `/users/${USERNAME}/repos?sort=pushed&per_page=${limit}&type=public`,
  );
  return repos.filter((r) => !r.fork);
}

/**
 * Fetch recent public events for hcb2019.
 * @param limit Maximum number of events (default 10)
 */
export async function getGithubActivity(
  limit = 10,
): Promise<GitHubEvent[]> {
  return fetchGitHub<GitHubEvent[]>(
    `/users/${USERNAME}/events/public?per_page=${limit}`,
  );
}

/**
 * Compute aggregate stats from repos.
 */
export function computeStats(repos: GitHubRepo[]): GitHubStats {
  const stats: GitHubStats = { repos: 0, stars: 0, followers: 0, forks: 0 };

  for (const repo of repos) {
    stats.stars += repo.stargazers_count;
    stats.forks += repo.forks_count;
    stats.repos += 1;
  }

  return stats;
}

/**
 * Return a human-readable label for a GitHub event type.
 */
export function eventLabel(type: string): string {
  const labels: Record<string, string> = {
    PushEvent: "pushed to",
    CreateEvent: "created",
    DeleteEvent: "deleted",
    IssuesEvent: "updated an issue in",
    IssueCommentEvent: "commented on",
    PullRequestEvent: "opened a PR in",
    PullRequestReviewEvent: "reviewed a PR in",
    PullRequestReviewCommentEvent: "commented on a PR in",
    WatchEvent: "starred",
    ForkEvent: "forked",
    ReleaseEvent: "released",
    PublicEvent: "open-sourced",
    MemberEvent: "added a collaborator to",
    GollumEvent: "updated wiki for",
  };
  return labels[type] ?? type.replace("Event", "").toLowerCase();
}
