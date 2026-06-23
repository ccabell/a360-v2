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

const CHANNEL_LABELS: Record<string, string> = {
  drtimpearce: "Dr Tim Pearce",
  drtimepearce: "Dr Tim Pearce",
  waveplasticsurgery: "Wave Plastic Surgery",
  aafe_tv: "AAFE",
  btlaestheticsint: "BTL Aesthetics",
  lumenisaesthetics: "Lumenis",
  erchoniaemea: "Erchonia",
  sciton: "Sciton",
  botoxcosmetic: "BOTOX Cosmetic",
  galdermaint: "Galderma",
  skinceuticals: "SkinCeuticals",
  revisionskincare: "Revision Skincare",
  inmodesolutions: "InMode",
  stevenweiner: "Dr Steven Weiner",
};
function channelLabel(c: string | null | undefined): string {
  if (!c) return "YouTube";
  return CHANNEL_LABELS[c] ?? c.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
function fmt(sec: number): string {
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

function tokenize(q: string): string[] {
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

/** Retrieve grounded, deep-linkable sources for a question (keyword + scoring). */
export async function retrieveTubeSources(question: string, max = 12): Promise<TubeSource[]> {
  const terms = tokenize(question);
  if (terms.length === 0) return [];

  // OR over the (specific-first) terms; pull a wide candidate pool to score.
  const orFilter = terms.map((t) => `chunk_text.ilike.%${t}%`).join(",");
  const { data, error } = await rag
    .from("manufacturer_youtube_transcript")
    .select("video_id,video_title,start_time,chunk_text,manufacturer_name")
    .or(orFilter)
    .limit(500);
  if (error || !Array.isArray(data)) return [];

  // Score by distinct-term overlap; bonus when all terms co-occur.
  const minMatch = terms.length >= 3 ? 2 : 1; // drop single-common-word noise
  const scored = (data as Row[])
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

  // Diversify across videos (max 3 moments per video).
  const perVideo = new Map<string, number>();
  const out: TubeSource[] = [];
  for (const { r } of scored) {
    const vid = r.video_id as string;
    const n = perVideo.get(vid) ?? 0;
    if (n >= 3) continue;
    perVideo.set(vid, n + 1);
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
