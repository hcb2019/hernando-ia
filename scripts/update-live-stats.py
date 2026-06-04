#!/usr/bin/env python3
"""
Update hernando.ia live stats from external APIs.
- GitHub: public API (with optional GITHUB_TOKEN for private repos)
- Instagram: Graph API for insights + Basic Display API as fallback
Writes to src/data/live-stats.json.
"""

import json
import os
import sys
import urllib.request
import urllib.error
from datetime import datetime, timezone

# ── Config ──────────────────────────────────────────────────────────

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(PROJECT_ROOT, "src", "data", "live-stats.json")
GITHUB_USER = "hcb2019"
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")

# Tokens from .instagram.env
ENV_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".instagram.env")
IG_TOKEN = ""
FB_TOKEN = ""
FB_IG_BUSINESS_ID = "17841480126870717"  # Hernando.ia Instagram Business Account

if os.path.exists(ENV_FILE):
    with open(ENV_FILE) as f:
        for line in f:
            if line.startswith("IG_TOKEN="):
                IG_TOKEN = line.split("=", 1)[1].strip()
            elif line.startswith("FB_TOKEN="):
                FB_TOKEN = line.split("=", 1)[1].strip()
            elif line.startswith("GITHUB_TOKEN="):
                if not GITHUB_TOKEN:
                    GITHUB_TOKEN = line.split("=", 1)[1].strip()

# ── GitHub helpers ──────────────────────────────────────────────────

def gh_request(path):
    url = f"https://api.github.com{path}"
    req = urllib.request.Request(url)
    req.add_header("Accept", "application/vnd.github.v3+json")
    req.add_header("User-Agent", "hernando-ia-live-stats/1.0")
    if GITHUB_TOKEN:
        req.add_header("Authorization", f"Bearer {GITHUB_TOKEN}")
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        print(f"  GitHub API error {e.code} for {path}", file=sys.stderr)
        return None
    except Exception as e:
        print(f"  GitHub fetch failed: {e}", file=sys.stderr)
        return None

def fetch_github():
    print("[GitHub] Fetching user profile...")
    user = gh_request(f"/users/{GITHUB_USER}")
    if not user:
        return None, None, None

    print(f"  -> {user.get('login')}: {user.get('public_repos')} repos, {user.get('followers')} followers")

    repo_path = "/user/repos?sort=pushed&per_page=20&type=all" if GITHUB_TOKEN else f"/users/{GITHUB_USER}/repos?sort=pushed&per_page=20&type=public"
    print("[GitHub] Fetching repos...")
    repos = gh_request(repo_path)
    if repos is None:
        repos = []

    repos = [r for r in repos if not r.get("fork", False)]

    stats = {"repos": len(repos), "stars": 0, "followers": user.get("followers", 0), "forks": 0}
    for r in repos:
        stats["stars"] += r.get("stargazers_count", 0)
        stats["forks"] += r.get("forks_count", 0)

    print(f"  -> {stats['repos']} repos, {stats['stars']} stars, {stats['forks']} forks")

    slim_repos = []
    for r in repos[:10]:
        slim_repos.append({
            "name": r["name"],
            "full_name": r["full_name"],
            "html_url": r["html_url"],
            "description": r.get("description"),
            "language": r.get("language"),
            "stargazers_count": r.get("stargazers_count", 0),
            "forks_count": r.get("forks_count", 0),
            "updated_at": r.get("updated_at"),
        })

    slim_user = {
        "login": user["login"],
        "name": user.get("name"),
        "avatar_url": user["avatar_url"],
        "html_url": user["html_url"],
        "bio": user.get("bio"),
        "location": user.get("location"),
        "public_repos": user["public_repos"],
        "followers": user["followers"],
        "following": user["following"],
    }

    return slim_user, slim_repos, stats

# ── Instagram: Graph API (insights + stats) ─────────────────────────

def fetch_instagram_graph():
    """Fetch Instagram stats via Graph API with FB token (includes reach)."""
    if not FB_TOKEN:
        return None

    print("[Instagram Graph] Fetching via Graph API...")
    try:
        # Get profile stats
        url = f"https://graph.facebook.com/v22.0/{FB_IG_BUSINESS_ID}?fields=id,username,followers_count,media_count&access_token={FB_TOKEN}"
        req = urllib.request.Request(url)
        req.add_header("User-Agent", "hernando-ia-live-stats/1.0")
        with urllib.request.urlopen(req, timeout=15) as resp:
            profile = json.loads(resp.read().decode())

        if "error" in profile:
            print(f"  Graph profile error: {profile['error']['message']}", file=sys.stderr)
            return None

        followers = profile.get("followers_count", 0)
        posts = profile.get("media_count", 0)
        username = profile.get("username", "?")

        # Get reach insights (28 days)
        reach = 0
        try:
            url2 = f"https://graph.facebook.com/v22.0/{FB_IG_BUSINESS_ID}/insights?metric=reach&period=days_28&access_token={FB_TOKEN}"
            req2 = urllib.request.Request(url2)
            req2.add_header("User-Agent", "hernando-ia-live-stats/1.0")
            with urllib.request.urlopen(req2, timeout=15) as resp2:
                insights = json.loads(resp2.read().decode())
            if "data" in insights:
                for m in insights["data"]:
                    if m["name"] == "reach":
                        reach = sum(v.get("value", 0) for v in m.get("values", []))
        except Exception as e:
            print(f"  Reach fetch failed: {e}", file=sys.stderr)

        print(f"  -> @{username}: {followers} followers, {posts} posts, {reach:,} reach (28d)")

        return {
            "followers": followers,
            "posts": posts,
            "reach_28d": reach,
            "account_type": "MEDIA_CREATOR",
        }
    except Exception as e:
        print(f"  Graph API failed: {e}", file=sys.stderr)
        return None

def fetch_instagram_basic():
    """Fallback: Basic Display API (followers + media count only, no insights)."""
    if not IG_TOKEN:
        return None

    print("[Instagram Basic] Fetching as fallback...")
    try:
        url = f"https://graph.instagram.com/me?fields=id,username,account_type,media_count,followers_count&access_token={IG_TOKEN}"
        req = urllib.request.Request(url)
        req.add_header("User-Agent", "hernando-ia-live-stats/1.0")
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())

        if "error" in data:
            print(f"  Basic API error: {data['error']['message']}", file=sys.stderr)
            return None

        followers = data.get("followers_count", 0)
        posts = data.get("media_count", 0)
        print(f"  -> @{data.get('username')}: {followers} followers, {posts} posts")

        return {
            "followers": followers,
            "posts": posts,
            "account_type": data.get("account_type", "unknown"),
        }
    except Exception as e:
        print(f"  Basic API failed: {e}", file=sys.stderr)
        return None

# ── Main ────────────────────────────────────────────────────────────

def load_existing():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    return {"github": {}, "instagram": {}, "updated_at": None}

def main():
    now = datetime.now(timezone.utc).isoformat()
    existing = load_existing()
    existing_ig = existing.get("instagram", {})
    result = {"updated_at": now}

    # ── GitHub ──
    user, repos, stats = fetch_github()
    if user and stats:
        result["github"] = {
            "user": user,
            "repos": repos,
            "stats": stats,
            "events": [],
            "updated_at": now,
        }
        print(f"[GitHub] OK: {stats['repos']} repos, {stats['stars']}*, {stats['followers']} followers")
    else:
        print("[GitHub] Using existing data")
        result["github"] = existing.get("github", {})
        result["github"]["updated_at"] = existing.get("github", {}).get("updated_at")

    # ── Instagram ──
    # Try Graph API first (has reach), fallback to Basic Display API
    ig_data = fetch_instagram_graph()
    if not ig_data:
        ig_data = fetch_instagram_basic()

    if ig_data:
        # Map reach_28d to reach_30d for site compatibility
        reach = ig_data.pop("reach_28d", 0)
        result["instagram"] = {
            **ig_data,
            "reach_30d": reach if reach > 0 else existing_ig.get("reach_30d", 0),
            "updated_at": now,
        }
        print(f"[Instagram] OK: {ig_data['followers']} followers, {ig_data['posts']} posts, {reach:,} reach")
    else:
        print("[Instagram] Keeping existing data")
        result["instagram"] = existing_ig

    # ── Write ──
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, "w") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"\nLive stats written to {DATA_FILE}")
    gh = result.get("github", {}).get("stats", {})
    ig = result.get("instagram", {})
    print(f"  GitHub: {gh.get('stars', '?')}*, {gh.get('repos', '?')} repos")
    print(f"  Instagram: {ig.get('followers', '?')} followers, {ig.get('posts', '?')} posts, reach={ig.get('reach_30d', 0):,}")

    return 0

if __name__ == "__main__":
    sys.exit(main())
