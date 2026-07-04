/**
 * Retrieval for the A360 Video Navigator AI chat.
 *
 * Keyword search over the full YouTube aesthetics transcript corpus
 * (`manufacturer_youtube_transcript`). Returns deep-linkable sources (real video
 * + exact second) the model must ground on — mirroring the Pearce tutor.
 *
 * (Semantic search via the ada-002 `match_youtube_transcripts` RPC is available
 * but requires a working OpenAI key to embed the query; keyword search needs no
 * embedding and yields the same timestamped citations.)
 */
import { createClient } from "@supabase/supabase-js";
import { channelLabel } from "./channels";

export interface TubeSource {
  id: string;
  title: string;
  channel: string;
  text: string;
  videoId: string;
  start: number;
  url: string;
  meta: string;
}

const rag = createClient(
  process.env.RAG_SUPABASE_URL ?? "https://placeholder.supabase.co",
  process.env.RAG_SUPABASE_KEY ?? "placeholder",
);

/** Format seconds as m:ss (or h:mm:ss). Exported for the watch page's Moments list. */
export function fmt(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const STOP = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "is", "are", "be",
  "with", "how", "what", "when", "why", "do", "does", "can", "i", "you", "it", "this",
  "that", "at", "as", "by", "from", "about", "should", "my", "your", "if", "we",
]);

/** Tokenize a message into scoring terms (specific/long terms first). Exported for conversation-memory term merging in the chat route. */
export function tokenize(q: string): string[] {
  return Array.from(
    new Set(
      q.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter((t) => t.length > 2 && !STOP.has(t)),
    ),
  ).sort((a, b) => b.length - a.length); // specific (long) terms first
}

interface Row {
  video_id: string | null;
  video_title: string | null;
  start_time: number | null;
  chunk_text: string | null;
  manufacturer_name: string | null;
}

/** Title + channel for any corpus video by id (for the in-app watch page). */
export async function getVideoMetaById(
  id: string,
): Promise<{ title: string; channel: string } | null> {
  const { data } = await rag
    .from("manufacturer_youtube_transcript")
    .select("video_title,manufacturer_name")
    .eq("video_id", id)
    .limit(1);
  const r = data?.[0] as { video_title: string | null; manufacturer_name: string | null } | undefined;
  if (!r) return null;
  return { title: (r.video_title ?? "Untitled").trim() || "Untitled", channel: channelLabel(r.manufacturer_name) };
}

/** Merge + dedupe rows by video_id + start_time (corpus has duplicate rows). */
function dedupeRows(rows: Row[]): Row[] {
  const seen = new Set<string>();
  const out: Row[] = [];
  for (const r of rows) {
    const key = `${r.video_id}:${r.start_time}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(r);
  }
  return out;
}

/**
 * Per-term ILIKE candidate retrieval (original path, kept as fallback for
 * environments where the FTS RPC/migration isn't available, or when the RPC
 * yields nothing).
 */
async function retrieveByIlike(terms: string[], videoId?: string): Promise<Row[]> {
  // Query per term (most-specific/longest first, capped at 6) so a common word
  // can't flood the pool before scoring — each term gets its own slice.
  const queryTerms = terms.slice(0, 6);
  const results = await Promise.all(
    queryTerms.map((t) => {
      let q = rag
        .from("manufacturer_youtube_transcript")
        .select("video_id,video_title,start_time,chunk_text,manufacturer_name")
        .ilike("chunk_text", `%${t}%`);
      if (videoId) q = q.eq("video_id", videoId);
      return q.limit(120);
    }),
  );

  const rows: Row[] = [];
  for (const { data, error } of results) {
    if (error || !Array.isArray(data)) continue;
    rows.push(...(data as Row[]));
  }
  return dedupeRows(rows);
}

/**
 * Retrieve grounded, deep-linkable sources for a question (keyword + scoring).
 *
 * When `videoId` is given, results are scoped to that video (for the
 * watch-page "Ask about this video" chat) and the per-video diversification
 * cap below is skipped since every result already shares one video.
 */
export async function retrieveTubeSources(
  question: string,
  max = 12,
  videoId?: string,
): Promise<TubeSource[]> {
  const terms = tokenize(question);
  if (terms.length === 0) return [];

  // Primary path: Postgres full-text search (stemmed, DB-side pre-ranked).
  // The RPC unions a ts_rank-ordered co-occurrence pool with LIMITed per-term
  // pools, deduped server-side. Falls back to the per-term ILIKE path on RPC
  // error or zero rows.
  let data: Row[] = [];
  const { data: ftsRows, error: ftsError } = await rag.rpc("search_youtube_transcripts_fts", {
    terms: terms.slice(0, 6),
    video_filter: videoId ?? null,
    per_term: 120,
    max_rows: 500,
  });
  if (!ftsError && Array.isArray(ftsRows)) {
    data = dedupeRows(
      (ftsRows as { video_id: string | null; video_title: string | null; start_time: number | null; chunk_text: string | null; manufacturer_name: string | null }[]).map(
        (r) => ({
          video_id: r.video_id,
          video_title: r.video_title,
          start_time: r.start_time,
          chunk_text: r.chunk_text,
          manufacturer_name: r.manufacturer_name,
        }),
      ),
    );
  }
  if (data.length === 0) {
    data = await retrieveByIlike(terms, videoId);
  }
  if (data.length === 0) return [];

  // Score by distinct-term overlap; bonus when all terms co-occur.
  // When scoped to one video, a single-term match is enough — the video scope
  // already constrains relevance, and zero sources is the worse failure.
  const minMatch = !videoId && terms.length >= 3 ? 2 : 1; // drop single-common-word noise
  const scored = data
    .map((r) => {
      const lower = (r.chunk_text ?? "").toLowerCase();
      const title = (r.video_title ?? "").toLowerCase();
      const matched = terms.filter((t) => lower.includes(t)).length;
      let score = matched;
      if (matched === terms.length && terms.length > 1) score += 2;
      // Title relevance bonus — a tear-trough video about tear troughs ranks up.
      score += terms.filter((t) => title.includes(t)).length * 2;
      return { r, score, matched };
    })
    .filter((x) => x.r.video_id && x.r.chunk_text && x.matched >= minMatch)
    .sort((a, b) => b.score - a.score);

  // Diversify across videos (max 3 moments per video) — skipped when scoped
  // to a single video, since the cap would otherwise throttle results to 3.
  const perVideo = new Map<string, number>();
  const out: TubeSource[] = [];
  for (const { r } of scored) {
    const vid = r.video_id as string;
    if (!videoId) {
      const n = perVideo.get(vid) ?? 0;
      if (n >= 3) continue;
      perVideo.set(vid, n + 1);
    }
    const start = Math.max(0, Math.floor(Number(r.start_time) || 0));
    const ch = channelLabel(r.manufacturer_name);
    out.push({
      id: `S${out.length + 1}`,
      title: (r.video_title ?? "Untitled").trim() || "Untitled",
      channel: ch,
      text: r.chunk_text as string,
      videoId: vid,
      start,
      // Stay in-app: link to the Navigator's own player at the cited second.
      url: `/tube/${vid}?t=${start}`,
      meta: `${ch} · ${fmt(start)}`,
    });
    if (out.length >= max) break;
  }
  return out;
}

/**
 * Evenly-spaced "Moments" for a video's watch page — a lightweight preview of
 * what's covered without running the full chat. Returns [] (never throws)
 * when the video has no transcript chunks, so the caller can just skip the
 * section.
 */
export async function getVideoMoments(
  videoId: string,
  max = 8,
): Promise<{ start: number; label: string }[]> {
  const { data, error } = await rag
    .from("manufacturer_youtube_transcript")
    .select("start_time,chunk_text")
    .eq("video_id", videoId)
    .order("start_time", { ascending: true })
    .limit(400);
  if (error || !Array.isArray(data) || data.length === 0) return [];

  const rows = data as { start_time: number | null; chunk_text: string | null }[];
  const n = rows.length;
  const count = Math.min(max, n);

  // Evenly-spaced indices across the ordered chunk list.
  const indices = new Set<number>();
  for (let i = 0; i < count; i++) {
    indices.add(count === 1 ? 0 : Math.round((i * (n - 1)) / (count - 1)));
  }

  return Array.from(indices)
    .sort((a, b) => a - b)
    .map((idx) => {
      const r = rows[idx];
      const start = Math.max(0, Math.floor(Number(r.start_time) || 0));
      const text = (r.chunk_text ?? "").replace(/\s+/g, " ").trim();
      let label = text.slice(0, 140);
      if (text.length > 140) {
        const lastSpace = label.lastIndexOf(" ");
        label = (lastSpace > 0 ? label.slice(0, lastSpace) : label) + "…";
      }
      return { start, label };
    });
}
