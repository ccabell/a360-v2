/**
 * Retrieval for the A360 Podcast Navigator AI chat.
 *
 * Hybrid search: episode-level FTS + chunk keyword matching.
 * Deduplicates to ONE source per episode (best chunk).
 */
import { createClient } from "@supabase/supabase-js";
import type { PodcastSource } from "./types";

const rag = createClient(
  process.env.RAG_SUPABASE_URL ?? "https://placeholder.supabase.co",
  process.env.RAG_SUPABASE_KEY ?? "placeholder",
);

const STOP = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "is", "are",
  "be", "with", "how", "what", "when", "why", "do", "does", "can", "i", "you",
  "it", "this", "that", "at", "as", "by", "from", "about", "should", "my",
  "your", "if", "we", "they", "their", "our", "has", "have", "had", "was",
  "were", "been", "being", "would", "could", "will", "just", "also", "like",
  "really", "very", "much", "know", "think", "going", "get", "got", "one",
  "want", "said", "say", "see", "look", "make", "take", "come", "give",
  "tell", "me", "us", "him", "her",
]);

function tokenize(q: string): string[] {
  return Array.from(
    new Set(
      q
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, " ")
        .split(/\s+/)
        .filter((t) => t.length > 2 && !STOP.has(t)),
    ),
  ).sort((a, b) => b.length - a.length);
}

/**
 * Retrieve grounded, deep-linkable podcast sources for a question.
 *
 * Strategy:
 * 1. Episode-level full-text search (catches names, titles, fuzzy matches)
 * 2. Chunk-level keyword search (catches in-transcript mentions)
 * 3. Deduplicate to 1 best chunk per episode
 * 4. Enrich with show names
 */
export async function retrievePodcastSources(
  question: string,
  max = 12,
): Promise<PodcastSource[]> {
  const terms = tokenize(question);
  if (terms.length === 0) return [];

  // --- Step 1: Episode-level search ---
  // Try FTS first, then fall back to ilike on title for typo tolerance
  const { data: ftsEpisodes } = await rag
    .from("podcast_episodes")
    .select("id, title, show_id, summary")
    .textSearch("fts_episode", question, { type: "websearch" })
    .limit(20);

  let matchedEpisodes = ftsEpisodes ?? [];

  // If FTS on fts_episode found nothing, try FTS on title with individual terms.
  // FTS is word-boundary-aware, so "ross" matches "Terri Ross" but not "cross".
  // This handles cases where the user misspells a name (Teri→Terri) but gets
  // the surname right.
  if (matchedEpisodes.length === 0 && terms.length > 0) {
    const allHits: Map<string, { ep: { id: string; title: string; show_id: string; summary: string | null }; hits: number }> = new Map();

    for (const term of terms) {
      if (term.length < 3) continue;
      const { data } = await rag
        .from("podcast_episodes")
        .select("id, title, show_id, summary")
        .textSearch("title", term)
        .limit(20);
      for (const ep of data ?? []) {
        const existing = allHits.get(ep.id);
        if (existing) existing.hits++;
        else allHits.set(ep.id, { ep, hits: 1 });
      }
    }

    // Re-score: boost episodes where title words fuzzy-match the query terms.
    // Handles "Teri" matching "Terri" (edit distance 1).
    const queryWords = question.toLowerCase().split(/\s+/).filter((w) => w.length >= 3 && !STOP.has(w));

    function fuzzyMatch(a: string, b: string): boolean {
      if (a === b) return true;
      if (Math.abs(a.length - b.length) > 1) return false;
      // Allow 1 character difference (insertion, deletion, or substitution)
      let diffs = 0;
      let i = 0, j = 0;
      while (i < a.length && j < b.length) {
        if (a[i] !== b[j]) {
          diffs++;
          if (diffs > 1) return false;
          if (a.length > b.length) i++;
          else if (b.length > a.length) j++;
          else { i++; j++; }
        } else { i++; j++; }
      }
      return diffs + (a.length - i) + (b.length - j) <= 1;
    }

    matchedEpisodes = [...allHits.values()]
      .map((h) => {
        const titleWords = h.ep.title.toLowerCase().split(/[\s\-_:,()#]+/).filter((w) => w.length >= 2);

        let score = h.hits;
        let fuzzyHits = 0;

        for (const qw of queryWords) {
          if (titleWords.some((tw) => fuzzyMatch(qw, tw))) {
            score += 3;
            fuzzyHits++;
          }
        }

        // Big boost if ALL query words fuzzy-match in the title
        if (fuzzyHits === queryWords.length && queryWords.length > 1) {
          score += 15;
        }

        return { ...h, score };
      })
      .sort((a, b) => b.score - a.score)
      .map((h) => h.ep)
      .slice(0, 20);
  }

  // Collect episode IDs from matched episodes
  const ftsEpIds = new Set(
    matchedEpisodes.map((e: { id: string }) => e.id),
  );

  // --- Step 2: Chunk-level keyword search ---
  const orFilter = terms.map((t) => `chunk_text.ilike.%${t}%`).join(",");
  const { data: chunks } = await rag
    .from("podcast_chunks")
    .select("id, episode_id, chunk_index, chunk_text")
    .or(orFilter)
    .limit(300);

  type ChunkRow = {
    id: string;
    episode_id: string;
    chunk_index: number;
    chunk_text: string;
  };

  // Also fetch chunks from FTS-matched episodes (they may have relevant content)
  let ftsChunks: ChunkRow[] = [];
  if (ftsEpIds.size > 0) {
    const { data } = await rag
      .from("podcast_chunks")
      .select("id, episode_id, chunk_index, chunk_text")
      .in("episode_id", [...ftsEpIds].slice(0, 20))
      .limit(200);
    ftsChunks = (data ?? []) as ChunkRow[];
  }

  // Merge all chunks, dedup by id
  const allChunkMap = new Map<string, ChunkRow>();
  for (const c of [...((chunks ?? []) as ChunkRow[]), ...ftsChunks]) {
    if (!allChunkMap.has(c.id)) allChunkMap.set(c.id, c);
  }
  const allChunks = [...allChunkMap.values()];

  if (allChunks.length === 0 && ftsEpIds.size === 0) return [];

  // --- Step 3: Get episode + show info ---
  const allEpIds = [
    ...new Set([
      ...allChunks.map((c) => c.episode_id),
      ...ftsEpIds,
    ]),
  ];

  const { data: episodes } = await rag
    .from("podcast_episodes")
    .select("id, title, show_id, summary")
    .in("id", allEpIds.slice(0, 200));

  const showIds = [
    ...new Set((episodes ?? []).map((e: { show_id: string }) => e.show_id)),
  ];
  const { data: shows } = await rag
    .from("podcast_shows")
    .select("id, name")
    .in("id", showIds);

  const showMap = new Map(
    (shows ?? []).map((s: { id: string; name: string }) => [s.id, s.name]),
  );
  const epMap = new Map(
    (episodes ?? []).map(
      (e: { id: string; title: string; show_id: string; summary: string | null }) => [
        e.id,
        {
          title: e.title,
          showName: showMap.get(e.show_id) ?? "Unknown Show",
          summary: e.summary,
          isFtsHit: ftsEpIds.has(e.id),
        },
      ],
    ),
  );

  // --- Step 4: Score chunks, pick best per episode ---
  const minMatch = terms.length >= 3 ? 2 : 1;

  // Score each chunk
  const scored = allChunks
    .map((c) => {
      const lower = c.chunk_text.toLowerCase();
      const ep = epMap.get(c.episode_id);
      const title = (ep?.title ?? "").toLowerCase();
      const matched = terms.filter((t) => lower.includes(t)).length;

      let score = matched;
      // Bonus for all terms co-occurring
      if (matched === terms.length && terms.length > 1) score += 3;
      // Bonus for title match
      score += terms.filter((t) => title.includes(t)).length * 3;
      // Bonus for FTS-matched episode
      if (ep?.isFtsHit) score += 2;

      return { c, ep, score, matched };
    })
    .filter((x) => x.matched >= minMatch || x.ep?.isFtsHit)
    .sort((a, b) => b.score - a.score);

  // Pick best chunk per episode (deduplicate)
  const bestByEpisode = new Map<
    string,
    { chunk: (typeof allChunks)[0]; ep: (typeof epMap extends Map<string, infer V> ? V : never) | undefined; score: number }
  >();

  for (const { c, ep, score } of scored) {
    const existing = bestByEpisode.get(c.episode_id);
    if (!existing || score > existing.score) {
      bestByEpisode.set(c.episode_id, { chunk: c, ep, score });
    }
  }

  // For FTS-matched episodes, use summary as the source text.
  // The summary mentions the person/topic by name and gives the LLM
  // the context it needs to answer.
  // Score based on how many query terms fuzzy-match the title.
  for (const epId of ftsEpIds) {
    const ep = epMap.get(epId);
    if (ep && ep.summary) {
      const summaryText = ep.summary.replace(/^#\s*summary\s*/i, "").trim();
      const titleWords = ep.title.toLowerCase().split(/[\s\-_:,()#]+/).filter((w: string) => w.length >= 2);
      const queryWords = question.toLowerCase().split(/\s+/).filter((w) => w.length >= 3 && !STOP.has(w));

      let ftsScore = 5; // base score for being an FTS match
      let fuzzyHits = 0;
      for (const qw of queryWords) {
        if (titleWords.some((tw: string) => {
          if (qw === tw) return true;
          if (Math.abs(qw.length - tw.length) > 1) return false;
          let diffs = 0, i = 0, j = 0;
          while (i < qw.length && j < tw.length) {
            if (qw[i] !== tw[j]) { diffs++; if (diffs > 1) return false; if (qw.length > tw.length) i++; else if (tw.length > qw.length) j++; else { i++; j++; } } else { i++; j++; }
          }
          return diffs + (qw.length - i) + (tw.length - j) <= 1;
        })) {
          ftsScore += 3;
          fuzzyHits++;
        }
      }
      if (fuzzyHits === queryWords.length && queryWords.length > 1) ftsScore += 20;

      const existing = bestByEpisode.get(epId);
      if (!existing || ftsScore > existing.score) {
        bestByEpisode.set(epId, {
          chunk: {
            id: `fts-${epId}`,
            episode_id: epId,
            chunk_index: 0,
            chunk_text: `${ep.title}\n\n${summaryText}`,
          },
          ep,
          score: ftsScore,
        });
      }
    }
  }

  // Sort by score, build output
  const sorted = [...bestByEpisode.values()].sort((a, b) => b.score - a.score);

  const out: PodcastSource[] = [];
  for (const { chunk, ep } of sorted) {
    const showName = ep?.showName ?? "Unknown Show";
    out.push({
      id: `S${out.length + 1}`,
      title: ep?.title ?? "Untitled Episode",
      showName,
      text: chunk.chunk_text,
      episodeId: chunk.episode_id,
      chunkIndex: chunk.chunk_index,
      url: `/podcast/episodes/${chunk.episode_id}`,
      meta: showName,
    });
    if (out.length >= max) break;
  }
  return out;
}
