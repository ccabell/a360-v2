/**
 * Retrieval for the Academy AI tutor.
 *
 * Deterministic, fast, server-only. Pulls the most relevant cleaned transcript
 * segments (the citable spine) plus podcast corroboration from matching topics.
 * Every retrieved item carries a deep-link target so the model's citations can
 * jump to the exact video + second.
 */

import { searchCorpus, tokenize } from "./search";
import { getAllTopicEntries, getIndex } from "./server";

/** A retrieved source the model may cite. */
export interface ChatSource {
  /** Citation id used in the prompt + answer markers, e.g. "S1". */
  id: string;
  kind: "video" | "podcast";
  /** Display title (video title or podcast episode). */
  title: string;
  /** Cleaned source text the model must ground on. */
  text: string;
  /** Deep-link target for video sources. */
  slug?: string;
  start?: number;
  /** Secondary label (show name for podcasts, formatted time for videos). */
  meta?: string;
  /** External listen url for podcast sources, if any. */
  url?: string | null;
}

/** Map a topic id from a video's tags to a human topic title. */
function topicTitle(id: string): string | undefined {
  return getIndex().topics.find((t) => t.id === id)?.title;
}

/**
 * Retrieve grounded sources for a question.
 *
 * @param question Free-text user question.
 * @param opts.maxVideo Max transcript segments to return (default 8).
 * @param opts.maxPodcast Max podcast corroboration chunks (default 3).
 */
export function retrieveForChat(
  question: string,
  opts: { maxVideo?: number; maxPodcast?: number } = {}
): ChatSource[] {
  const maxVideo = opts.maxVideo ?? 8;
  const maxPodcast = opts.maxPodcast ?? 3;
  const terms = tokenize(question);
  if (terms.length === 0) return [];

  const sources: ChatSource[] = [];

  // 1. Video transcript segments — the citable spine.
  const { segments } = searchCorpus(question, maxVideo);
  segments.forEach((seg, i) => {
    const mins = Math.floor(seg.start / 60);
    const secs = String(seg.start % 60).padStart(2, "0");
    const topic = seg.topics.map(topicTitle).filter(Boolean)[0];
    sources.push({
      id: `S${i + 1}`,
      kind: "video",
      title: seg.videoTitle,
      text: seg.text,
      slug: seg.slug,
      start: seg.start,
      meta: `${mins}:${secs}${topic ? ` · ${topic}` : ""}`,
    });
  });

  // 2. Podcast corroboration from topics whose keywords match the question.
  if (maxPodcast > 0) {
    const termSet = new Set(terms);
    const scored: { score: number; podcast: ChatSource }[] = [];
    const seen = new Set<string>();
    for (const entry of getAllTopicEntries()) {
      // Does this topic relate to the question?
      const topicHit =
        terms.some(
          (t) =>
            entry.topic.title.toLowerCase().includes(t) ||
            entry.topic.keywords.some((k) => k.toLowerCase().includes(t))
        ) ||
        entry.topic.keywords.some((k) =>
          k
            .toLowerCase()
            .split(/\s+/)
            .some((w) => termSet.has(w))
        );
      if (!topicHit) continue;
      for (const p of entry.podcast) {
        const key = p.episodeTitle + "|" + p.text.slice(0, 40);
        if (seen.has(key)) continue;
        seen.add(key);
        // Score podcast chunk by query-term overlap in its text.
        const lower = p.text.toLowerCase();
        const overlap = terms.filter((t) => lower.includes(t)).length;
        scored.push({
          score: overlap,
          podcast: {
            id: "", // assigned after sort
            kind: "podcast",
            title: p.episodeTitle,
            text: p.text,
            meta: p.showName ?? "Aesthetics podcast",
            url: p.url,
          },
        });
      }
    }
    scored
      .sort((a, b) => b.score - a.score)
      .slice(0, maxPodcast)
      .forEach((s, i) => {
        s.podcast.id = `P${i + 1}`;
        sources.push(s.podcast);
      });
  }

  return sources;
}
