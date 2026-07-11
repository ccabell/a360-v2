/**
 * Commits feed (plan §3c): server-side GitHub API over every repo named in the
 * portfolio registry. Requires a server-only fine-grained PAT in GITHUB_TOKEN;
 * without it the feed reports unavailable and the UI shows a setup hint.
 * Results are cached in-process for 15 minutes.
 */

export interface RepoCommit {
  repo: string;
  sha: string;
  message: string;
  author: string;
  date: string; // ISO
  url: string;
}

export interface CommitsFeed {
  available: boolean;
  /** repos that returned commits */
  commits: RepoCommit[];
  /** repos the token couldn't reach (404/403) */
  unreachable: string[];
  fetchedAt: string;
}

const CACHE_TTL_MS = 15 * 60 * 1000;
let cache: { key: string; feed: CommitsFeed; at: number } | null = null;

export function githubToken(): string | undefined {
  return process.env.GITHUB_TOKEN || undefined;
}

async function fetchRepoCommits(
  repo: string,
  sinceIso: string,
  token: string,
): Promise<RepoCommit[] | null> {
  const res = await fetch(
    `https://api.github.com/repos/${repo}/commits?since=${encodeURIComponent(sinceIso)}&per_page=25`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    },
  );
  if (!res.ok) return null;
  const rows = (await res.json()) as Array<{
    sha: string;
    html_url: string;
    commit: {
      message: string;
      author?: { name?: string; date?: string } | null;
    };
  }>;
  return rows.map((r) => ({
    repo,
    sha: r.sha.slice(0, 7),
    message: r.commit.message.split("\n")[0],
    author: r.commit.author?.name ?? "unknown",
    date: r.commit.author?.date ?? "",
    url: r.html_url,
  }));
}

/** Last `days` of commits across `repos` (deduped, newest first). */
export async function recentCommits(
  repos: string[],
  days = 7,
): Promise<CommitsFeed> {
  const token = githubToken();
  const unique = [...new Set(repos.filter(Boolean))].sort();
  const key = `${unique.join(",")}|${days}`;
  if (!token) {
    return { available: false, commits: [], unreachable: [], fetchedAt: "" };
  }
  if (cache && cache.key === key && Date.now() - cache.at < CACHE_TTL_MS) {
    return cache.feed;
  }

  const since = new Date(Date.now() - days * 86400_000).toISOString();
  const results = await Promise.allSettled(
    unique.map((repo) => fetchRepoCommits(repo, since, token)),
  );

  const commits: RepoCommit[] = [];
  const unreachable: string[] = [];
  results.forEach((r, i) => {
    if (r.status === "fulfilled" && r.value) commits.push(...r.value);
    else unreachable.push(unique[i]);
  });
  commits.sort((a, b) => (a.date < b.date ? 1 : -1));

  const feed: CommitsFeed = {
    available: true,
    commits,
    unreachable,
    fetchedAt: new Date().toISOString(),
  };
  cache = { key, feed, at: Date.now() };
  return feed;
}
