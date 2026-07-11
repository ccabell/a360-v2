/**
 * Decisions feed (plan §3c): the top entries of A360_Hub's JOURNAL.md,
 * fetched at request time from the hub's private GitHub remote. Requires
 * GITHUB_TOKEN (same PAT as the commits feed) with access to HUB_REPO.
 * Cached in-process for 15 minutes.
 */

import { githubToken } from "@/lib/portfolio/github";

const HUB_REPO = process.env.HUB_JOURNAL_REPO || "ccabell/a360-hub";

export interface JournalEntry {
  /** The `## ` heading, e.g. "2026-07-11 — A360 Command Center planned". */
  heading: string;
  /** First bullet lines under the heading (markdown, trimmed). */
  bullets: string[];
}

export interface JournalFeed {
  available: boolean;
  repo: string;
  entries: JournalEntry[];
}

const CACHE_TTL_MS = 15 * 60 * 1000;
let cache: { feed: JournalFeed; at: number } | null = null;

function parseJournal(markdown: string, limit: number): JournalEntry[] {
  const entries: JournalEntry[] = [];
  let current: JournalEntry | null = null;
  for (const line of markdown.split("\n")) {
    if (line.startsWith("## ")) {
      if (entries.length >= limit) break;
      current = { heading: line.slice(3).trim(), bullets: [] };
      entries.push(current);
    } else if (current && line.trim().startsWith("- ") && current.bullets.length < 4) {
      current.bullets.push(line.trim().slice(2));
    }
  }
  return entries;
}

export async function journalEntries(limit = 12): Promise<JournalFeed> {
  const token = githubToken();
  if (!token) return { available: false, repo: HUB_REPO, entries: [] };
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.feed;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${HUB_REPO}/contents/JOURNAL.md`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.raw+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        cache: "no-store",
      },
    );
    if (!res.ok) return { available: false, repo: HUB_REPO, entries: [] };
    const markdown = await res.text();
    const feed: JournalFeed = {
      available: true,
      repo: HUB_REPO,
      entries: parseJournal(markdown, limit),
    };
    cache = { feed, at: Date.now() };
    return feed;
  } catch {
    return { available: false, repo: HUB_REPO, entries: [] };
  }
}
