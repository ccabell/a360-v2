/**
 * Build-time generator for the Tim Pearce Injector Academy.
 *
 * Pulls the full `youtube_tim_pearce` corpus, cleans the VTT rolling-caption
 * noise, stitches per-video transcripts (preserving per-segment timestamps),
 * tags every video + segment against the taxonomy, derives chapters and cited
 * key-points, builds the reference-topic index with podcast corroboration, and
 * writes everything as committed JSON under lib/academy/data/.
 *
 * The running app reads ONLY this baked JSON. Re-run when the corpus changes:
 *   npx tsx scripts/academy/generate-academy-data.ts
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import {
  cleanSegmentText,
  stitchSegments,
} from "../../lib/academy/clean-transcript";
import { MODULES, TOPICS, TOPIC_BY_ID } from "../../lib/academy/taxonomy";
import {
  normaliseTitle,
  slugify,
  scoreTopics,
  scoreSegmentTopics,
} from "../../lib/academy/tag";
import type {
  AcademyIndex,
  Chapter,
  KeyPoint,
  PodcastCitation,
  TopicCitation,
  TopicEntry,
  TranscriptSegment,
  VideoDetail,
  VideoSummary,
} from "../../lib/academy/types";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const RAG_URL = process.env.RAG_SUPABASE_URL;
const RAG_KEY = process.env.RAG_SUPABASE_KEY;
if (!RAG_URL || !RAG_KEY) {
  console.error("Missing RAG_SUPABASE_URL / RAG_SUPABASE_KEY in .env.local");
  process.exit(1);
}
const db = createClient(RAG_URL, RAG_KEY);

const DATA_DIR = path.join(process.cwd(), "lib", "academy", "data");
const VIDEO_DIR = path.join(DATA_DIR, "videos");

// Real YouTube ids, resolved by matching the channel dump to DB titles
// (scripts/resolve-tim-pearce-video-ids.py). Keyed by raw DB video_title.
const VIDEO_ID_MAP: Record<string, { video_id: string }> = (() => {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, "video_id_map.json"), "utf-8"),
    );
  } catch {
    return {};
  }
})();

interface RawChunk {
  filename: string;
  video_title: string;
  chunk_index: number;
  chunk_text: string;
  start_time: number;
  end_time: number;
}

/** Substantial lesson threshold: >= 4 cleaned segments AND >= 180s. */
function isLessonLike(segmentCount: number, duration: number): boolean {
  return segmentCount >= 4 && duration >= 180;
}

async function fetchAllChunks(): Promise<RawChunk[]> {
  const all: RawChunk[] = [];
  const pageSize = 1000;
  let from = 0;
  for (;;) {
    const { data, error } = await db
      .from("youtube_tim_pearce")
      .select("filename, video_title, chunk_index, chunk_text, start_time, end_time")
      .order("filename", { ascending: true })
      .order("chunk_index", { ascending: true })
      .range(from, from + pageSize - 1);
    if (error) throw new Error(`Fetch failed: ${error.message}`);
    if (!data || data.length === 0) break;
    for (const r of data) {
      all.push({
        filename: r.filename as string,
        video_title: r.video_title as string,
        chunk_index: r.chunk_index as number,
        chunk_text: r.chunk_text as string,
        start_time: Number(r.start_time),
        end_time: Number(r.end_time),
      });
    }
    process.stdout.write(`\r  fetched ${all.length} chunks...`);
    if (data.length < pageSize) break;
    from += pageSize;
  }
  process.stdout.write("\n");
  return all;
}

/** Group chunks by filename, ordered by start_time. */
function groupByVideo(chunks: RawChunk[]): Map<string, RawChunk[]> {
  const map = new Map<string, RawChunk[]>();
  for (const c of chunks) {
    if (!map.has(c.filename)) map.set(c.filename, []);
    map.get(c.filename)!.push(c);
  }
  for (const arr of map.values()) {
    arr.sort((a, b) => a.start_time - b.start_time || a.chunk_index - b.chunk_index);
  }
  return map;
}

/**
 * Derive chapters by grouping consecutive segments whose dominant topic is
 * stable. Labels come from the topic title; first chapter is "Introduction".
 */
function deriveChapters(
  segments: TranscriptSegment[]
): Chapter[] {
  if (segments.length === 0) return [];
  const chapters: Chapter[] = [];
  // Target ~6-10 chapters: bucket segments and label by dominant topic.
  const targetChapters = Math.min(
    10,
    Math.max(3, Math.round(segments.length / 6))
  );
  const bucketSize = Math.ceil(segments.length / targetChapters);

  for (let b = 0; b < segments.length; b += bucketSize) {
    const bucket = segments.slice(b, b + bucketSize);
    const joined = bucket.map((s) => s.text).join(" ");
    const topScores = scoreSegmentTopics(joined);
    const label =
      b === 0
        ? "Introduction"
        : topScores.length > 0
          ? TOPIC_BY_ID.get(topScores[0].topic.id)!.title
          : `Part ${chapters.length + 1}`;
    // Avoid duplicate consecutive chapter labels.
    if (chapters.length > 0 && chapters[chapters.length - 1].label === label) {
      continue;
    }
    chapters.push({
      start: bucket[0].start,
      label,
      segmentIndex: bucket[0].i,
    });
  }
  return chapters;
}

/**
 * Pull cited key-points: pick the highest-signal segments (most topic-keyword
 * hits) and surface a trimmed sentence from each, anchored to its timestamp.
 * Every key-point is a verbatim excerpt of cleaned transcript — no invention.
 */
function deriveKeyPoints(segments: TranscriptSegment[]): KeyPoint[] {
  const scored = segments
    .map((s) => {
      const hits = scoreSegmentTopics(s.text).reduce((acc, x) => acc + x.score, 0);
      return { seg: s, hits };
    })
    .filter((x) => x.hits > 0 && x.seg.text.length > 80)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 8)
    .sort((a, b) => a.seg.start - b.seg.start);

  return scored.map(({ seg }) => ({
    text: firstSentences(seg.text, 220),
    start: seg.start,
    segmentIndex: seg.i,
  }));
}

/** Take whole sentences up to ~maxLen chars. */
function firstSentences(text: string, maxLen: number): string {
  const clean = text.trim();
  if (clean.length <= maxLen) return capitalise(clean);
  const slice = clean.slice(0, maxLen);
  const lastStop = Math.max(
    slice.lastIndexOf("."),
    slice.lastIndexOf("?"),
    slice.lastIndexOf("!")
  );
  const out = lastStop > 60 ? slice.slice(0, lastStop + 1) : slice + "…";
  return capitalise(out);
}

function capitalise(s: string): string {
  return s.length ? s[0].toUpperCase() + s.slice(1) : s;
}

async function main() {
  console.log("=== Tim Pearce Academy — data generation ===\n");

  fs.mkdirSync(VIDEO_DIR, { recursive: true });

  console.log("1/5  Fetching corpus from youtube_tim_pearce...");
  const chunks = await fetchAllChunks();
  console.log(`  ${chunks.length} chunks fetched.`);

  const byVideo = groupByVideo(chunks);
  console.log(`  ${byVideo.size} distinct videos.\n`);

  console.log("2/5  Cleaning + stitching transcripts, tagging...");
  const summaries: VideoSummary[] = [];
  const details: VideoDetail[] = [];
  let totalSegments = 0;
  let totalDuration = 0;
  const usedSlugs = new Set<string>();

  for (const [filename, vchunks] of byVideo) {
    const rawTitle = vchunks[0].video_title;
    const title = normaliseTitle(rawTitle);
    let slug = slugify(rawTitle);
    if (!slug) slug = "video";
    while (usedSlugs.has(slug)) slug = slug + "-2";
    usedSlugs.add(slug);

    // Clean each segment, then stitch (removing boundary overlap).
    const cleanedTexts = vchunks.map((c) => cleanSegmentText(c.chunk_text));
    const { perSegmentText, text: transcript } = stitchSegments(cleanedTexts);

    const segments: TranscriptSegment[] = [];
    vchunks.forEach((c, i) => {
      const segText = perSegmentText[i];
      if (!segText || segText.trim().length === 0) return;
      segments.push({
        i: segments.length,
        start: Math.round(c.start_time),
        end: Math.round(c.end_time),
        text: segText,
      });
    });

    if (segments.length === 0) continue;

    const duration = Math.round(vchunks[vchunks.length - 1].end_time);
    totalSegments += segments.length;
    totalDuration += duration;

    // Tag the whole video.
    const topicScores = scoreTopics(transcript, title);
    const topics = topicScores.slice(0, 6).map((t) => t.topic.id);
    const moduleScores = new Map<string, number>();
    for (const ts of topicScores) {
      const m = ts.topic.module;
      moduleScores.set(m, (moduleScores.get(m) ?? 0) + ts.score);
    }
    const modulesRanked = [...moduleScores.entries()].sort((a, b) => b[1] - a[1]);
    const modules = modulesRanked.map((m) => m[0]);
    const primaryModule = modules[0] ?? "anatomy";

    const isLesson = isLessonLike(segments.length, duration);
    const excerpt = firstSentences(transcript, 280);

    const summary: VideoSummary = {
      slug,
      title,
      filename,
      duration,
      segmentCount: segments.length,
      topics,
      modules,
      primaryModule,
      isLesson,
      youtubeId: VIDEO_ID_MAP[rawTitle]?.video_id ?? null,
      excerpt,
    };
    summaries.push(summary);

    const chapters = deriveChapters(segments);
    const keyPoints = deriveKeyPoints(segments);

    details.push({
      ...summary,
      segments,
      chapters,
      keyPoints,
      transcript,
      related: [], // filled after all videos are known
    });
  }

  console.log(`  ${summaries.length} videos processed.`);
  console.log(`  ${totalSegments} cleaned segments, ${Math.round(totalDuration / 3600)}h total.\n`);

  // Related videos: shared topics, prefer same primary module, prefer lessons.
  console.log("3/5  Computing related videos...");
  const bySlug = new Map(details.map((d) => [d.slug, d]));
  for (const d of details) {
    const tset = new Set(d.topics);
    const scored = details
      .filter((o) => o.slug !== d.slug)
      .map((o) => {
        let s = o.topics.filter((t) => tset.has(t)).length * 2;
        if (o.primaryModule === d.primaryModule) s += 1;
        if (o.isLesson) s += 1;
        return { slug: o.slug, s };
      })
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 6);
    d.related = scored.map((x) => x.slug);
  }

  // Build reference-topic entries (citations aggregated across all videos).
  console.log("4/5  Building reference-topic index...");
  const topicEntries: TopicEntry[] = [];
  for (const topic of TOPICS) {
    const citations: TopicCitation[] = [];
    for (const d of details) {
      // Only consider videos tagged with this topic, to keep entries focused.
      if (!d.topics.includes(topic.id)) continue;
      for (const seg of d.segments) {
        const scores = scoreSegmentTopics(seg.text);
        const hit = scores.find((s) => s.topic.id === topic.id);
        if (!hit) continue;
        citations.push({
          videoSlug: d.slug,
          videoTitle: d.title,
          youtubeId: d.youtubeId,
          start: seg.start,
          end: seg.end,
          segmentIndex: seg.i,
          text: firstSentences(seg.text, 320),
          score: hit.score + (d.title.toLowerCase().includes(topic.title.toLowerCase()) ? 3 : 0),
        });
      }
    }
    citations.sort((a, b) => b.score - a.score || a.start - b.start);

    // Related topics: those sharing the most videos.
    const myVideos = new Set(
      details.filter((d) => d.topics.includes(topic.id)).map((d) => d.slug)
    );
    const relatedScores = new Map<string, number>();
    for (const other of TOPICS) {
      if (other.id === topic.id) continue;
      const overlap = details.filter(
        (d) => d.topics.includes(topic.id) && d.topics.includes(other.id)
      ).length;
      if (overlap > 0) relatedScores.set(other.id, overlap);
    }
    const related = [...relatedScores.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map((x) => x[0]);

    topicEntries.push({
      topic,
      citations: citations.slice(0, 40),
      podcast: [],
      related,
    });
    void myVideos;
  }

  // Podcast corroboration (best-effort; non-blocking).
  console.log("5/5  Pulling podcast corroboration (best-effort)...");
  await attachPodcastCorroboration(topicEntries);

  // ── Write everything ─────────────────────────────────────────────────────
  summaries.sort((a, b) => b.segmentCount - a.segmentCount);

  const index: AcademyIndex = {
    generatedAt: new Date().toISOString(),
    stats: {
      videos: summaries.length,
      lessons: summaries.filter((s) => s.isLesson).length,
      segments: totalSegments,
      totalDurationSeconds: totalDuration,
      topics: TOPICS.length,
      modules: MODULES.length,
    },
    modules: MODULES,
    topics: TOPICS,
    videos: summaries,
  };

  fs.writeFileSync(path.join(DATA_DIR, "index.json"), JSON.stringify(index));
  fs.writeFileSync(
    path.join(DATA_DIR, "topics.json"),
    JSON.stringify(topicEntries)
  );

  // Compact segment-level search index (one row per segment) for global search.
  // We keep a trimmed text field; the API ranks by query token hits.
  const searchRows: Array<[string, string, number, string]> = [];
  for (const d of details) {
    for (const seg of d.segments) {
      // Skip very short fragments to keep the index lean and useful.
      if (seg.text.length < 40) continue;
      searchRows.push([d.slug, d.title, seg.start, seg.text]);
    }
  }
  fs.writeFileSync(
    path.join(DATA_DIR, "search-segments.json"),
    JSON.stringify(searchRows)
  );
  console.log(`  search-segments.json ${searchRows.length} segment rows`);
  for (const d of details) {
    fs.writeFileSync(
      path.join(VIDEO_DIR, `${d.slug}.json`),
      JSON.stringify(d)
    );
  }

  console.log("\n=== DONE ===");
  console.log(`  index.json         ${summaries.length} videos`);
  console.log(`  topics.json        ${topicEntries.length} topics`);
  console.log(`  videos/*.json      ${details.length} files`);
  console.log(`  lessons            ${index.stats.lessons}`);
  console.log(`  segments           ${index.stats.segments}`);
  console.log(`  total duration     ${(totalDuration / 3600).toFixed(1)}h`);

  // Validation
  if (summaries.length !== 408) {
    console.warn(
      `\n  ⚠ Expected 408 videos, got ${summaries.length}. Investigate before shipping.`
    );
  } else {
    console.log("\n  ✓ 408 videos — matches expected corpus size.");
  }
  void bySlug;
}

/**
 * For each topic, pull podcast chunks that mention the topic's strongest
 * keywords, then resolve episode title / show name via the episodes + shows
 * tables. Schema: podcast_chunks(episode_id) → podcast_episodes(id, title,
 * show_id, enclosure_url) → podcast_shows(id, name, host).
 * Best-effort: failures are logged and skipped, never fatal.
 */
async function attachPodcastCorroboration(entries: TopicEntry[]) {
  // Cache episode + show lookups across topics.
  const epCache = new Map<
    string,
    { title: string; showId: string | null; url: string | null }
  >();
  const showCache = new Map<string, string | null>();

  async function resolveEpisode(episodeId: string) {
    if (epCache.has(episodeId)) return epCache.get(episodeId)!;
    const { data } = await db
      .from("podcast_episodes")
      .select("title, show_id, enclosure_url")
      .eq("id", episodeId)
      .limit(1)
      .maybeSingle();
    const rec = {
      title: (data?.title as string) ?? "Aesthetics podcast episode",
      showId: (data?.show_id as string) ?? null,
      url: (data?.enclosure_url as string) ?? null,
    };
    epCache.set(episodeId, rec);
    return rec;
  }
  async function resolveShow(showId: string | null) {
    if (!showId) return null;
    if (showCache.has(showId)) return showCache.get(showId)!;
    const { data } = await db
      .from("podcast_shows")
      .select("name")
      .eq("id", showId)
      .limit(1)
      .maybeSingle();
    const name = (data?.name as string) ?? null;
    showCache.set(showId, name);
    return name;
  }

  for (const entry of entries) {
    try {
      const seen = new Set<string>();
      const cites: PodcastCitation[] = [];
      // Try the two strongest keywords for breadth.
      for (const kw of entry.topic.keywords.slice(0, 2)) {
        if (cites.length >= 3) break;
        const escaped = kw.replace(/[%_\\]/g, "\\$&");
        const { data, error } = await db
          .from("podcast_chunks")
          .select("episode_id, chunk_text")
          .ilike("chunk_text", `%${escaped}%`)
          .limit(6);
        if (error || !data) continue;
        for (const row of data) {
          if (cites.length >= 3) break;
          const epId = row.episode_id as string;
          const key = epId + "|" + String(row.chunk_text).slice(0, 40);
          if (seen.has(epId)) continue; // one chunk per episode for variety
          seen.add(epId);
          const ep = await resolveEpisode(epId);
          const show = await resolveShow(ep.showId);
          cites.push({
            episodeTitle: cleanEpisodeTitle(ep.title),
            showName: show,
            start: null,
            text: cleanSegmentText(String(row.chunk_text).slice(0, 320)),
            url: ep.url,
          });
          void key;
        }
      }
      entry.podcast = cites;
      process.stdout.write(
        `\r  ${entry.topic.id}: ${cites.length} podcast refs        `
      );
    } catch {
      // non-blocking
    }
  }
  process.stdout.write("\n");
}

/** Strip leading sanitisation junk from podcast episode titles. */
function cleanEpisodeTitle(t: string): string {
  return t.replace(/^[._\s]+/, "").trim() || "Aesthetics podcast episode";
}

main().catch((err) => {
  console.error("\nGeneration failed:", err);
  process.exit(1);
});
