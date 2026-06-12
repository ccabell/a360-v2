/**
 * Backfill YouTube timestamp deep-links for evidence_links rows.
 *
 * What it does:
 *   1. Finds all evidence_links WHERE source='youtube' AND url NOT LIKE '%&t=%'
 *      (skips rows that already have a timestamp deep-link)
 *   2. For each row, extracts video_id from url, then matches snippet text
 *      against manufacturer_youtube_transcript (CMS Supabase) to find start_time
 *   3. Updates evidence_links.url to include ?t={start_time_int}s
 *   4. Prints a gap report for any rows where no transcript chunk was found
 *
 * Run:
 *   npx tsx scripts/backfill-youtube.ts
 *
 * Env required (in .env.local):
 *   NEXT_PUBLIC_AGENT_SUPABASE_URL + AGENT_SUPABASE_SERVICE_KEY  (evidence_links)
 *   NEXT_PUBLIC_CMS_SUPABASE_URL + CMS_SUPABASE_SERVICE_KEY      (manufacturer_youtube_transcript)
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const AGENT_URL = process.env.NEXT_PUBLIC_AGENT_SUPABASE_URL;
const AGENT_KEY = process.env.AGENT_SUPABASE_SERVICE_KEY;
const CMS_URL = process.env.NEXT_PUBLIC_CMS_SUPABASE_URL;
const CMS_KEY = process.env.CMS_SUPABASE_SERVICE_KEY;

if (!AGENT_URL || !AGENT_KEY || !CMS_URL || !CMS_KEY) {
  console.error(
    "Missing env vars. Required: NEXT_PUBLIC_AGENT_SUPABASE_URL, AGENT_SUPABASE_SERVICE_KEY, " +
      "NEXT_PUBLIC_CMS_SUPABASE_URL, CMS_SUPABASE_SERVICE_KEY"
  );
  process.exit(1);
}

const agentDb = createClient(AGENT_URL, AGENT_KEY);
const cmsDb = createClient(CMS_URL, CMS_KEY);

function extractVideoId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match?.[1] ?? null;
}

/**
 * Extract search tokens from a snippet string.
 * Snippet text is often a description (not verbatim transcript), so we extract
 * the most distinctive 1-3 word phrases to use as ILIKE search tokens.
 */
function extractSearchTokens(snippet: string): string[] {
  if (!snippet) return [];
  const tokens: string[] = [];

  // Strategy 1: Use first 20 chars (covers the start of verbatim snippets)
  const first20 = snippet.slice(0, 20).trim();
  if (first20.length >= 10) tokens.push(first20);

  // Strategy 2: Extract 2-word phrases from distinct nouns/terms
  // Split on whitespace, take consecutive pairs skipping common words
  const words = snippet.split(/\s+/).filter((w) => w.length > 3);
  if (words.length >= 2) {
    // Take a 2-word phrase from middle of snippet (tends to be most specific)
    const midIdx = Math.floor(words.length / 2);
    const phrase = words.slice(midIdx, midIdx + 2).join(" ");
    if (phrase.length >= 6 && !tokens.includes(phrase)) {
      tokens.push(phrase);
    }
  }

  return tokens;
}

async function findTranscriptChunk(
  videoId: string,
  snippet: string
): Promise<{ start_time: number; end_time: number } | null> {
  const tokens = extractSearchTokens(snippet);
  if (tokens.length === 0) return null;

  for (const token of tokens) {
    // Escape PostgREST ILIKE special chars (%, _, \)
    const escaped = token.replace(/[%_\\]/g, "\\$&");

    const { data, error } = await cmsDb
      .from("manufacturer_youtube_transcript")
      .select("start_time, end_time")
      .eq("video_id", videoId)
      .ilike("chunk_text", `%${escaped}%`)
      .order("start_time", { ascending: true })
      .limit(1);

    if (error) {
      console.warn(`  CMS query error for token "${token}":`, error.message);
      continue;
    }

    if (data && data.length > 0) {
      console.log(
        `  Matched token "${token}" → start_time ${data[0].start_time}`
      );
      return data[0] as { start_time: number; end_time: number };
    }
  }

  return null;
}

async function main() {
  console.log("=== YouTube Timestamp Backfill ===\n");

  // Fetch YouTube rows without timestamp deep-links
  const { data: ytRows, error: fetchErr } = await agentDb
    .from("evidence_links")
    .select("id, url, snippet")
    .eq("source", "youtube")
    .not("url", "ilike", "%&t=%");

  if (fetchErr) {
    console.error("Failed to fetch evidence_links:", fetchErr.message);
    process.exit(1);
  }

  const totalYoutube = ytRows?.length ?? 0;
  console.log(`YouTube rows without timestamp: ${totalYoutube}`);

  let timestamped = 0;
  let skipped = 0;
  const gapReport: Array<{
    id: string;
    videoId: string | null;
    snippet: string;
    reason: string;
  }> = [];

  for (const row of ytRows ?? []) {
    const videoId = extractVideoId(row.url as string);
    const snippet = (row.snippet as string) || "";

    console.log(`\nProcessing evidence_link ${(row.id as string).slice(0, 8)}...`);
    console.log(`  Video ID: ${videoId ?? "(not extractable)"}`);
    console.log(`  Snippet: ${snippet.slice(0, 60)}${snippet.length > 60 ? "..." : ""}`);

    if (!videoId) {
      console.log("  [SKIP] Could not extract video_id from URL");
      gapReport.push({
        id: row.id as string,
        videoId: null,
        snippet,
        reason: "Could not extract video_id from URL",
      });
      skipped++;
      continue;
    }

    if (!snippet) {
      console.log("  [SKIP] No snippet to match against");
      gapReport.push({
        id: row.id as string,
        videoId,
        snippet: "",
        reason: "No snippet text available",
      });
      skipped++;
      continue;
    }

    const chunk = await findTranscriptChunk(videoId, snippet);

    if (!chunk) {
      console.log(
        "  [SKIP] No transcript chunk match (video may not be in CMS)"
      );
      gapReport.push({
        id: row.id as string,
        videoId,
        snippet: snippet.slice(0, 60),
        reason: "No matching transcript chunk in CMS manufacturer_youtube_transcript",
      });
      skipped++;
      continue;
    }

    const startTimeInt = Math.round(chunk.start_time);
    const newUrl = `https://www.youtube.com/watch?v=${videoId}&t=${startTimeInt}s`;

    const { error: updateErr } = await agentDb
      .from("evidence_links")
      .update({ url: newUrl })
      .eq("id", row.id);

    if (updateErr) {
      console.error("  UPDATE failed:", updateErr.message);
      gapReport.push({
        id: row.id as string,
        videoId,
        snippet: snippet.slice(0, 60),
        reason: `Update error: ${updateErr.message}`,
      });
      skipped++;
    } else {
      console.log(`  Updated URL → ${newUrl}`);
      timestamped++;
    }
  }

  // Summary
  console.log("\n=== Summary ===");
  console.log(`Total YouTube rows: ${totalYoutube}`);
  console.log(`Timestamped: ${timestamped}`);
  console.log(`Skipped: ${skipped}`);

  if (gapReport.length > 0) {
    console.log("\n=== Gap Report ===");
    console.log(
      "Note: Most skipped rows are likely due to YouTube videos not yet ingested"
    );
    console.log("into the CMS manufacturer_youtube_transcript table.\n");
    for (const g of gapReport) {
      console.log(
        `  ID: ${g.id.slice(0, 8)} | Video: ${g.videoId ?? "unknown"} | Reason: ${g.reason}`
      );
    }
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
