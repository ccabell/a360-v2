/**
 * Deterministic keyword tagging + title normalisation for the academy corpus.
 * Fully traceable: a video/segment is tagged with a topic only when one of the
 * topic's keywords appears in the text. No model judgement is involved here.
 */

import { TOPICS } from "./taxonomy";
import type { Topic } from "./types";

/**
 * Restore a readable title from the corpus's sanitised filename/title.
 * The corpus replaces `|`→`｜`, `'`→`_`, `:`→`：`, `/`→`⧸` etc. We map the most
 * common artifacts back to plain ASCII for display.
 */
export function normaliseTitle(raw: string): string {
  return raw
    .replace(/＂/g, '"')
    .replace(/｜/g, "|")
    .replace(/：/g, ":")
    .replace(/⧸/g, "/")
    .replace(/_s\b/g, "'s")
    .replace(/_t\b/g, "'t")
    .replace(/_re\b/g, "'re")
    .replace(/_m\b/g, "'m")
    .replace(/_ve\b/g, "'ve")
    .replace(/_ll\b/g, "'ll")
    .replace(/_d\b/g, "'d")
    // `_Word_` quote pairs → 'Word'
    .replace(/_([A-Za-z][^_]*?)_/g, "'$1'")
    .replace(/\s+/g, " ")
    .trim();
}

/** URL/route-safe slug from a title. */
export function slugify(raw: string): string {
  return normaliseTitle(raw)
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Lowercased, padded text for word-ish boundary matching. */
function prep(text: string): string {
  return " " + text.toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ") + " ";
}

function keywordHits(haystack: string, keyword: string): number {
  const needle = " " + keyword.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() + " ";
  if (needle.trim() === "") return 0;
  let count = 0;
  let idx = haystack.indexOf(needle);
  while (idx !== -1) {
    count++;
    idx = haystack.indexOf(needle, idx + 1);
  }
  return count;
}

export interface TopicScore {
  topic: Topic;
  score: number;
}

/**
 * Score every topic for a piece of text. `titleWeight` boosts matches that
 * occur in the title (strong signal) vs body text.
 */
export function scoreTopics(
  bodyText: string,
  titleText: string
): TopicScore[] {
  const body = prep(bodyText);
  const title = prep(titleText);
  const scores: TopicScore[] = [];

  for (const topic of TOPICS) {
    let score = 0;
    for (const kw of topic.keywords) {
      score += keywordHits(title, kw) * 8; // title hits weigh heavily
      score += keywordHits(body, kw) * 1;
    }
    if (score > 0) scores.push({ topic, score });
  }

  scores.sort((a, b) => b.score - a.score);
  return scores;
}

/** Score topics for a single segment (body only, lighter). */
export function scoreSegmentTopics(segmentText: string): TopicScore[] {
  const body = prep(segmentText);
  const scores: TopicScore[] = [];
  for (const topic of TOPICS) {
    let score = 0;
    for (const kw of topic.keywords) {
      score += keywordHits(body, kw);
    }
    if (score > 0) scores.push({ topic, score });
  }
  scores.sort((a, b) => b.score - a.score);
  return scores;
}
