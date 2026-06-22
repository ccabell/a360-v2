/**
 * Keyword search over the baked academy corpus.
 *
 * Runs server-side against `search-segments.json` (one row per cleaned ~60s
 * segment) plus the topic/module index. Pure, deterministic scoring — no LLM,
 * no live DB. Every result carries the data needed to deep-link to the exact
 * second: `/dashboard/academy/lesson/<slug>?t=<start>`.
 */

import fs from "fs";
import path from "path";
import { getIndex } from "./server";
import type { Topic, VideoSummary } from "./types";

const DATA_DIR = path.join(process.cwd(), "lib", "academy", "data");

/** Raw search row: [slug, title, startSeconds, cleanedText]. */
type SearchRow = [string, string, number, string];

let _rows: SearchRow[] | null = null;

function getRows(): SearchRow[] {
  if (!_rows) {
    _rows = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, "search-segments.json"), "utf8")
    ) as SearchRow[];
  }
  return _rows;
}

/** A single transcript-moment hit. */
export interface SegmentHit {
  slug: string;
  videoTitle: string;
  /** Resolved YouTube id of the parent video (for thumbnails), or null. */
  youtubeId: string | null;
  start: number;
  /** Cleaned text with the matched window highlighted (snippet). */
  snippet: string;
  /** Whole-segment text (for context / RAG). */
  text: string;
  score: number;
  /** Topic ids of the parent video (for filter chips). */
  topics: string[];
  primaryModule: string;
}

export interface SearchResults {
  query: string;
  terms: string[];
  /** Best segment moments, deep-linkable. */
  segments: SegmentHit[];
  /** Reference topics whose title/keywords match the query. */
  topics: Topic[];
  /** Videos whose title matches the query. */
  videos: VideoSummary[];
  total: number;
}

const STOP = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "is", "are",
  "be", "with", "how", "what", "when", "why", "do", "does", "can", "i", "you",
  "it", "this", "that", "at", "as", "by", "from", "about",
]);

/** Tokenise a query into meaningful lower-case terms. */
export function tokenize(q: string): string[] {
  return Array.from(
    new Set(
      q
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, " ")
        .split(/\s+/)
        .filter((t) => t.length > 1 && !STOP.has(t))
    )
  );
}

/** Escape a string for safe use inside a RegExp. */
function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Build a snippet centred on the first matched term, with <mark> wrappers
 * around each matched term. Returns ~280 chars of context.
 */
function makeSnippet(text: string, terms: string[]): string {
  const lower = text.toLowerCase();
  let firstAt = -1;
  for (const t of terms) {
    const at = lower.indexOf(t);
    if (at !== -1 && (firstAt === -1 || at < firstAt)) firstAt = at;
  }
  const radius = 140;
  let start = firstAt === -1 ? 0 : Math.max(0, firstAt - radius);
  let end = Math.min(text.length, start + radius * 2);
  // snap to word boundaries
  if (start > 0) {
    const sp = text.indexOf(" ", start);
    if (sp !== -1 && sp - start < 30) start = sp + 1;
  }
  if (end < text.length) {
    const sp = text.lastIndexOf(" ", end);
    if (sp !== -1 && end - sp < 30) end = sp;
  }
  let snippet = text.slice(start, end).trim();
  if (start > 0) snippet = "… " + snippet;
  if (end < text.length) snippet = snippet + " …";

  // Highlight matched terms (longest first to avoid nested marks).
  const ordered = [...terms].sort((a, b) => b.length - a.length);
  for (const t of ordered) {
    snippet = snippet.replace(
      new RegExp(`(?<!<mark>)\\b(${escapeRe(t)})`, "gi"),
      "<mark>$1</mark>"
    );
  }
  return snippet;
}

/**
 * Run a keyword search across segments, topics and video titles.
 *
 * Scoring (per segment):
 *  - +3 per distinct query term present in the segment text
 *  - +5 if the segment's video TITLE contains a term (title relevance)
 *  - +4 bonus when ALL terms co-occur in the same segment (phrase-ish match)
 *  - small length normalisation so long rambling segments don't dominate
 */
export function searchCorpus(query: string, limit = 40): SearchResults {
  const terms = tokenize(query);
  const index = getIndex();

  if (terms.length === 0) {
    return { query, terms, segments: [], topics: [], videos: [], total: 0 };
  }

  // Lookup maps for enriching hits with topic/module metadata.
  const bySlug = new Map(index.videos.map((v) => [v.slug, v]));

  const rows = getRows();
  const hits: SegmentHit[] = [];

  for (const [slug, title, start, text] of rows) {
    const lowerText = text.toLowerCase();
    const lowerTitle = title.toLowerCase();
    let matched = 0;
    let score = 0;
    for (const t of terms) {
      const inText = lowerText.includes(t);
      const inTitle = lowerTitle.includes(t);
      if (inText) {
        matched++;
        score += 3;
      }
      if (inTitle) score += 5;
    }
    if (matched === 0) continue;
    if (matched === terms.length && terms.length > 1) score += 4; // all terms co-occur
    // Mild length normalisation (favour focused segments).
    score = score * (1 + 200 / (200 + text.length));

    const v = bySlug.get(slug);
    hits.push({
      slug,
      videoTitle: title,
      youtubeId: v?.youtubeId ?? null,
      start,
      snippet: makeSnippet(text, terms),
      text,
      score,
      topics: v?.topics ?? [],
      primaryModule: v?.primaryModule ?? "",
    });
  }

  hits.sort((a, b) => b.score - a.score);
  const segments = hits.slice(0, limit);

  // Topic matches: title or keyword contains a term.
  const topics = index.topics
    .filter((tp) =>
      terms.some(
        (t) =>
          tp.title.toLowerCase().includes(t) ||
          tp.blurb.toLowerCase().includes(t) ||
          tp.keywords.some((k) => k.toLowerCase().includes(t))
      )
    )
    .slice(0, 8);

  // Video-title matches (distinct from segment hits — quick navigation).
  const videos = index.videos
    .filter((v) => terms.some((t) => v.title.toLowerCase().includes(t)))
    .sort((a, b) => b.segmentCount - a.segmentCount)
    .slice(0, 8);

  return {
    query,
    terms,
    segments,
    topics,
    videos,
    total: hits.length,
  };
}
