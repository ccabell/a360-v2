/**
 * Retrieval for the A360 Podcast Navigator AI chat.
 *
 * Hybrid search: semantic vector search (match_podcast_chunks RPC) +
 * episode-level FTS + chunk keyword matching.
 * Deduplicates to ONE source per episode (best chunk), then collapses
 * duplicate-ingested episodes by normalized title.
 */
import { createClient } from "@supabase/supabase-js";
import type { PodcastSource } from "./types";

const rag = createClient(
  process.env.RAG_SUPABASE_URL ?? "https://placeholder.supabase.co",
  process.env.RAG_SUPABASE_KEY ?? "placeholder",
);

/**
 * Strip ingestion-hash suffixes from titles, e.g. "_4881d08f91c7d8418c" or
 * "_actic371e8d3ceb95a0" (a title fragment + hex hash). Real titles don't end
 * in an underscore-joined 10+ char alphanumeric token.
 */
export function cleanTitle(title: string): string {
  return title.replace(/_[a-z0-9]{10,}$/i, "").trim();
}

/** Embed the query with OpenAI (matches the corpus's 1536-dim embeddings). */
async function embedQuery(q: string): Promise<number[] | null> {
  if (!process.env.OPENAI_API_KEY) return null;
  try {
    const res = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: "text-embedding-3-small", input: q }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: { embedding: number[] }[] };
    return json.data?.[0]?.embedding ?? null;
  } catch {
    return null;
  }
}

interface SemanticHit {
  chunk_id: string;
  episode_id: string;
  show_name: string | null;
  episode_title: string;
  chunk_text: string;
  chunk_index: number;
  similarity: number;
}

/** Vector search over podcast_chunks. Returns [] on any failure. */
async function semanticSearch(question: string): Promise<SemanticHit[]> {
  const embedding = await embedQuery(question);
  if (!embedding) return [];
  const { data, error } = await rag.rpc("match_podcast_chunks", {
    query_embedding: embedding,
    match_count: 24,
    match_threshold: 0.25,
  });
  if (error) return [];
  return (data as SemanticHit[]) ?? [];
}

const STOP = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "is", "are",
  "be", "with", "how", "what", "when", "why", "who", "whos", "where", "which",
  "do", "does", "can", "i", "you",
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

/** Word-level fuzzy match: equal, or 1 edit apart (Teri ↔ Terri). */
function fuzzyWordMatch(a: string, b: string): boolean {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
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

  // Typo corrections learned from fuzzy title matches (e.g. "teri" → "terri").
  const corrected = new Map<string, string>();
  // True when episode titles fuzzy-match EVERY query word (name lookup).
  let nameMatchMode = false;

  // Kick off semantic search in parallel with the keyword pipeline.
  const semanticPromise = semanticSearch(question);

  if (terms.length === 0) {
    return buildOutput(new Map(), await semanticPromise, max);
  }

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

    const scoredHits = [...allHits.values()].map((h) => {
      const titleWords = h.ep.title.toLowerCase().split(/[\s\-_:,()#]+/).filter((w) => w.length >= 2);

      let score = h.hits;
      let fuzzyHits = 0;

      for (const qw of queryWords) {
        const tw = titleWords.find((w) => fuzzyMatch(qw, w));
        if (tw) {
          score += 3;
          fuzzyHits++;
          // Remember the corpus spelling so chunk search can use it too.
          if (tw !== qw) corrected.set(qw, tw);
        }
      }

      // Big boost if ALL query words fuzzy-match in the title
      if (fuzzyHits === queryWords.length && queryWords.length > 1) {
        score += 15;
      }

      return { ...h, score, fuzzyHits };
    });

    // If some episodes match EVERY query word (e.g. "Terri Ross" for
    // "teri ross"), keep only those — partial hits like "Kate Ross" are
    // noise once a full-name match exists.
    const fullCoverage = scoredHits.filter(
      (h) => queryWords.length > 1 && h.fuzzyHits === queryWords.length,
    );
    nameMatchMode = fullCoverage.length > 0;

    matchedEpisodes = (fullCoverage.length > 0 ? fullCoverage : scoredHits)
      .sort((a, b) => b.score - a.score)
      .map((h) => h.ep)
      .slice(0, 20);
  }

  // --- Name-lookup detection (both FTS and fuzzy paths) ---
  // If some matched episodes' titles fuzzy-cover EVERY query word
  // ("Terri Ross…" for "teri ross"), this is a name/entity lookup: keep only
  // those episodes and harvest spelling corrections, so partial-surname hits
  // (Kate Ross, Ross Walker) drop out.
  const nameQueryWords = question.toLowerCase().split(/\s+/).filter((w) => w.length >= 3 && !STOP.has(w));
  if (nameQueryWords.length > 1 && matchedEpisodes.length > 0) {
    const covered = matchedEpisodes.filter((ep: { title: string }) => {
      const titleWords = ep.title.toLowerCase().split(/[\s\-_:,()#]+/).filter((w: string) => w.length >= 2);
      return nameQueryWords.every((qw) => {
        const tw = titleWords.find((w: string) => fuzzyWordMatch(qw, w));
        if (tw && tw !== qw) corrected.set(qw, tw);
        return !!tw;
      });
    });
    if (covered.length > 0) {
      matchedEpisodes = covered;
      nameMatchMode = true;
    }
  }

  // Collect episode IDs from matched episodes
  const ftsEpIds = new Set(
    matchedEpisodes.map((e: { id: string }) => e.id),
  );

  // --- Step 2: Chunk-level keyword search ---
  // FTS first (word-boundary, ALL terms required, GIN-indexed) so "teri ross"
  // can't match chunks that merely contain "across" or "Kate Ross". Each term
  // is OR-expanded with its typo correction: (teri | terri) & ross.
  const tsquery = terms
    .map((t) => {
      const fix = corrected.get(t);
      return fix ? `(${t} | ${fix})` : t;
    })
    .join(" & ");
  let { data: chunks } = await rag
    .from("podcast_chunks")
    .select("id, episode_id, chunk_index, chunk_text")
    .textSearch("chunk_text", tsquery, { config: "english" })
    .limit(150);

  // Recall fallback: substring OR match (old behavior) when strict FTS
  // finds nothing.
  if (!chunks || chunks.length === 0) {
    const orFilter = terms.map((t) => `chunk_text.ilike.%${t}%`).join(",");
    ({ data: chunks } = await rag
      .from("podcast_chunks")
      .select("id, episode_id, chunk_index, chunk_text")
      .or(orFilter)
      .limit(300));
  }

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

  if (allChunks.length === 0 && ftsEpIds.size === 0) {
    return buildOutput(new Map(), await semanticPromise, max);
  }

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

  // NOTE: some episodes have a null show_id; a null inside .in() makes
  // PostgREST reject the whole query ("invalid input syntax for type uuid"),
  // which used to break show attribution for ALL sources.
  const showIds = [
    ...new Set(
      (episodes ?? [])
        .map((e: { show_id: string | null }) => e.show_id)
        .filter((id): id is string => !!id),
    ),
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

  // Word-boundary matchers (substring matching made "ross" hit "across").
  // Each term also matches its typo-corrected corpus spelling.
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const termRes = terms.map((t) => {
    const fix = corrected.get(t);
    return new RegExp(`\\b(${esc(t)}${fix ? `|${esc(fix)}` : ""})\\b`, "i");
  });

  // Score each chunk
  const scored = allChunks
    .map((c) => {
      const ep = epMap.get(c.episode_id);
      const title = ep?.title ?? "";
      const matched = termRes.filter((re) => re.test(c.chunk_text)).length;

      let score = matched;
      // Bonus for all terms co-occurring
      if (matched === terms.length && terms.length > 1) score += 3;
      // Bonus for title match
      score += termRes.filter((re) => re.test(title)).length * 3;
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

  return buildOutput(
    bestByEpisode,
    await semanticPromise,
    max,
    nameMatchMode ? termRes : [],
  );
}

interface ChunkRow {
  id: string;
  episode_id: string;
  chunk_index: number;
  chunk_text: string;
}

/**
 * Merge keyword candidates with semantic hits, dedupe duplicate-ingested
 * episodes by normalized title, and build the final source list.
 */
function buildOutput(
  keywordBest: Map<
    string,
    { chunk: ChunkRow; ep?: { title: string; showName: string } | undefined; score: number }
  >,
  semanticHits: SemanticHit[],
  max: number,
  /**
   * When set (confident name/entity match), semantic hits must word-boundary
   * match every pattern — stops "who is teri ross" pulling in Kate Ross /
   * Ross Walker chunks that are merely embedding-adjacent.
   */
  mustMatch: RegExp[] = [],
): PodcastSource[] {
  const merged = new Map<
    string,
    { chunk: ChunkRow; title: string; showName: string; score: number }
  >();

  for (const [epId, { chunk, ep, score }] of keywordBest) {
    merged.set(epId, {
      chunk,
      title: ep?.title ?? "Untitled Episode",
      showName: ep?.showName ?? "Unknown Show",
      score,
    });
  }

  for (const hit of semanticHits) {
    if (mustMatch.length > 0 && !mustMatch.every((re) => re.test(hit.chunk_text))) {
      continue;
    }
    // Map cosine similarity (~0.25–0.65 for this corpus) onto the keyword
    // score scale (~1–25).
    const semScore = Math.max(0, hit.similarity - 0.2) * 20;
    const chunk: ChunkRow = {
      id: hit.chunk_id,
      episode_id: hit.episode_id,
      chunk_index: hit.chunk_index,
      chunk_text: hit.chunk_text,
    };
    const existing = merged.get(hit.episode_id);
    if (existing) {
      // Episode found by BOTH strategies — strong signal.
      if (semScore > existing.score) existing.chunk = chunk;
      existing.score = Math.max(existing.score, semScore) + 3;
      if (existing.showName === "Unknown Show" && hit.show_name)
        existing.showName = hit.show_name;
    } else {
      merged.set(hit.episode_id, {
        chunk,
        title: hit.episode_title,
        showName: hit.show_name ?? "Unknown Show",
        score: semScore,
      });
    }
  }

  // Collapse duplicate ingestions of the same episode (same title, different
  // row) — keep the highest-scoring copy.
  const byTitle = new Map<string, { chunk: ChunkRow; title: string; showName: string; score: number }>();
  for (const cand of merged.values()) {
    // Punctuation-insensitive: duplicate ingestions differ by colons etc.
    const key = cleanTitle(cand.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
    const existing = byTitle.get(key);
    if (!existing || cand.score > existing.score) byTitle.set(key, cand);
  }

  const sorted = [...byTitle.values()].sort((a, b) => b.score - a.score);

  const out: PodcastSource[] = [];
  for (const { chunk, title, showName } of sorted) {
    out.push({
      id: `S${out.length + 1}`,
      title: cleanTitle(title),
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
