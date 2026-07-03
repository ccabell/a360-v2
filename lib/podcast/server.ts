/**
 * Server-side data loaders for the Podcast Navigator.
 *
 * All queries hit the RAG Supabase (`gjqicqldjgvrwmtkliie`) directly.
 * Results are cached via Next.js ISR (revalidate).
 */
import { createClient } from "@supabase/supabase-js";
import type { PodcastShow, PodcastEpisode, PodcastStats } from "./types";

const rag = createClient(
  process.env.RAG_SUPABASE_URL ?? "https://placeholder.supabase.co",
  process.env.RAG_SUPABASE_KEY ?? "placeholder",
);

export async function getPodcastStats(): Promise<PodcastStats> {
  const [showsRes, episodesRes, transcribedRes, chunksRes, tagsRes] =
    await Promise.all([
      rag.from("podcast_shows").select("id", { count: "exact", head: true }),
      rag.from("podcast_episodes").select("id", { count: "exact", head: true }),
      rag
        .from("podcast_episodes")
        .select("id", { count: "exact", head: true })
        .not("transcript_text", "is", null),
      rag.from("podcast_chunks").select("id", { count: "exact", head: true }),
      rag
        .from("library_tags")
        .select("id", { count: "exact", head: true })
        .eq("source_type", "podcast"),
    ]);

  const episodes = episodesRes.count ?? 0;
  return {
    shows: showsRes.count ?? 0,
    episodes,
    transcribed: transcribedRes.count ?? 0,
    chunks: chunksRes.count ?? 0,
    tags: tagsRes.count ?? 0,
    hoursEstimate: Math.round(episodes * 0.55), // ~33 min avg episode
  };
}

export async function getPodcastShows(opts?: {
  category?: string;
  sort?: "episodes" | "name" | "latest";
}): Promise<PodcastShow[]> {
  let query = rag
    .from("podcast_shows")
    .select(
      "id, name, host, description, rss_url, website_url, category, artwork_url, episode_count, latest_episode_date",
    );

  if (opts?.category) query = query.eq("category", opts.category);

  switch (opts?.sort) {
    case "name":
      query = query.order("name", { ascending: true });
      break;
    case "latest":
      query = query.order("latest_episode_date", { ascending: false, nullsFirst: false });
      break;
    default:
      query = query.order("episode_count", { ascending: false });
  }

  const { data } = await query;
  return (data as PodcastShow[]) ?? [];
}

export async function getPodcastShow(id: string): Promise<PodcastShow | null> {
  const { data } = await rag
    .from("podcast_shows")
    .select(
      "id, name, host, description, rss_url, website_url, category, artwork_url, episode_count, latest_episode_date",
    )
    .eq("id", id)
    .single();
  return (data as PodcastShow) ?? null;
}

export async function getShowEpisodes(
  showId: string,
  opts?: { limit?: number; offset?: number; search?: string },
): Promise<PodcastEpisode[]> {
  const limit = opts?.limit ?? 50;
  const offset = opts?.offset ?? 0;

  let query = rag
    .from("podcast_episodes")
    .select(
      "id, title, published_date, duration_seconds, enclosure_url, description, summary, speakers, guests, is_vectorized, show_id, source_file",
    )
    .eq("show_id", showId)
    .order("published_date", { ascending: false, nullsFirst: false })
    .range(offset, offset + limit - 1);

  if (opts?.search) {
    query = query.textSearch("fts_episode", opts.search, { type: "websearch" });
  }

  const { data } = await query;
  return (data as PodcastEpisode[]) ?? [];
}

/** Batch-fetch tags for a list of episode IDs. Returns a map of episodeId → tags[]. */
export async function getEpisodeTagsBatch(
  episodeIds: string[],
): Promise<Map<string, { tag_type: string; tag_value: string }[]>> {
  if (episodeIds.length === 0) return new Map();

  const { data } = await rag
    .from("library_tags")
    .select("source_id, tag_type, tag_value")
    .eq("source_type", "podcast")
    .in("source_id", episodeIds);

  const map = new Map<string, { tag_type: string; tag_value: string }[]>();
  for (const row of (data ?? []) as { source_id: string; tag_type: string; tag_value: string }[]) {
    const arr = map.get(row.source_id) ?? [];
    arr.push({ tag_type: row.tag_type, tag_value: row.tag_value });
    map.set(row.source_id, arr);
  }
  return map;
}

/** Get aggregated top tags for a show (by counting across its episodes). */
export async function getShowTags(
  showId: string,
  limit = 20,
): Promise<{ tag_type: string; tag_value: string; count: number }[]> {
  // Get all episode IDs for this show
  const { data: eps } = await rag
    .from("podcast_episodes")
    .select("id")
    .eq("show_id", showId);
  if (!eps || eps.length === 0) return [];

  const epIds = eps.map((e: { id: string }) => e.id);

  // Fetch tags for all episodes (in batches if needed)
  const batchSize = 200;
  const allTags: { tag_type: string; tag_value: string }[] = [];
  for (let i = 0; i < epIds.length; i += batchSize) {
    const batch = epIds.slice(i, i + batchSize);
    const { data } = await rag
      .from("library_tags")
      .select("tag_type, tag_value")
      .eq("source_type", "podcast")
      .in("source_id", batch);
    if (data) allTags.push(...(data as { tag_type: string; tag_value: string }[]));
  }

  // Aggregate
  const counts = new Map<string, { tag_type: string; tag_value: string; count: number }>();
  for (const t of allTags) {
    const key = `${t.tag_type}:${t.tag_value}`;
    const existing = counts.get(key);
    if (existing) existing.count++;
    else counts.set(key, { ...t, count: 1 });
  }

  return Array.from(counts.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export async function getPodcastEpisode(id: string): Promise<PodcastEpisode | null> {
  const { data: ep } = await rag
    .from("podcast_episodes")
    .select(
      "id, show_id, title, published_date, duration_seconds, enclosure_url, description, transcript_text, summary, speakers, guests, source_file, is_vectorized",
    )
    .eq("id", id)
    .single();

  if (!ep) return null;

  // Get show info
  const { data: show } = await rag
    .from("podcast_shows")
    .select("name, category, artwork_url")
    .eq("id", (ep as PodcastEpisode).show_id)
    .single();

  return {
    ...(ep as PodcastEpisode),
    show_name: (show as PodcastShow | null)?.name ?? undefined,
    show_category: (show as PodcastShow | null)?.category ?? undefined,
    show_artwork_url: (show as PodcastShow | null)?.artwork_url ?? undefined,
  };
}

export async function getEpisodeChunks(episodeId: string) {
  const { data } = await rag
    .from("podcast_chunks")
    .select("id, chunk_index, chunk_text")
    .eq("episode_id", episodeId)
    .order("chunk_index", { ascending: true });
  return data ?? [];
}

export async function getEpisodeTags(episodeId: string) {
  const { data } = await rag
    .from("library_tags")
    .select("tag_type, tag_value")
    .eq("source_type", "podcast")
    .eq("source_id", episodeId);
  return data ?? [];
}

export async function getTopTags(opts?: { tagType?: string; limit?: number }) {
  const limit = opts?.limit ?? 50;

  let query = rag
    .from("library_tags")
    .select("tag_type, tag_value")
    .eq("source_type", "podcast");

  if (opts?.tagType) query = query.eq("tag_type", opts.tagType);

  const { data } = await query.limit(5000);
  if (!data) return [];

  // Aggregate counts client-side
  const counts = new Map<string, { tag_type: string; tag_value: string; count: number }>();
  for (const row of data as { tag_type: string; tag_value: string }[]) {
    const key = `${row.tag_type}:${row.tag_value}`;
    const existing = counts.get(key);
    if (existing) {
      existing.count++;
    } else {
      counts.set(key, { tag_type: row.tag_type, tag_value: row.tag_value, count: 1 });
    }
  }

  return Array.from(counts.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export async function getTrendingTopics() {
  const { data } = await rag
    .from("podcast_topic_trends")
    .select("*")
    .order("mention_count", { ascending: false })
    .limit(50);
  return data ?? [];
}
