/**
 * Full-text transcript search for the Podcast Navigator.
 *
 * Calls the `search_podcast_transcripts` RPC (GIN-indexed FTS over
 * podcast_chunks.chunk_text), then dedupes duplicate-ingested episodes by
 * normalized title — same approach as chat-retrieval.
 */
import { createClient } from "@supabase/supabase-js";
import { cleanTitle } from "./chat-retrieval";

const rag = createClient(
  process.env.RAG_SUPABASE_URL ?? "https://placeholder.supabase.co",
  process.env.RAG_SUPABASE_KEY ?? "placeholder",
);

export interface TranscriptSearchSnippet {
  chunk_index: number;
  /** ts_headline output — plain text with <mark>…</mark> around matches. */
  snippet: string;
}

export interface TranscriptSearchResult {
  episodeId: string;
  title: string;
  showId: string | null;
  showName: string | null;
  showArtworkUrl: string | null;
  publishedDate: string | null;
  durationSeconds: number | null;
  matchCount: number;
  snippets: TranscriptSearchSnippet[];
}

interface RpcRow {
  episode_id: string;
  episode_title: string;
  show_id: string | null;
  show_name: string | null;
  show_artwork_url: string | null;
  published_date: string | null;
  duration_seconds: number | null;
  match_count: number;
  snippets: TranscriptSearchSnippet[] | null;
}

export async function searchTranscripts(
  query: string,
  limit = 20,
): Promise<TranscriptSearchResult[]> {
  const { data, error } = await rag.rpc("search_podcast_transcripts", {
    search_query: query,
    // Over-fetch so dedupe still leaves `limit` results.
    max_episodes: limit * 2,
  });
  if (error || !data) return [];

  // Collapse duplicate ingestions (same title, different row) — keep the
  // copy with the most matches.
  const byTitle = new Map<string, RpcRow>();
  for (const row of data as RpcRow[]) {
    const key = cleanTitle(row.episode_title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
    const existing = byTitle.get(key);
    if (!existing || row.match_count > existing.match_count) {
      byTitle.set(key, row);
    }
  }

  return [...byTitle.values()].slice(0, limit).map((row) => ({
    episodeId: row.episode_id,
    title: cleanTitle(row.episode_title),
    showId: row.show_id,
    showName: row.show_name,
    showArtworkUrl: row.show_artwork_url,
    publishedDate: row.published_date,
    durationSeconds: row.duration_seconds,
    matchCount: row.match_count,
    snippets: row.snippets ?? [],
  }));
}
