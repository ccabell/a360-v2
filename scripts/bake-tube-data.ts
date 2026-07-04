/**
 * Bake the A360 Tube (Video Navigator) data from the curated `youtube_videos`
 * table on the RAG/CMS Supabase into lib/tube/data/*.json. The app reads only
 * the baked JSON — rerun this after the source table changes.
 *
 * Outputs:
 *   lib/tube/data/videos.json  — all videos (ordered by id for stable diffs)
 *   lib/tube/data/facets.json  — filter values with counts, sorted by count
 *   lib/tube/data/index.json   — generatedAt + corpus stats
 *
 * Run:
 *   npx tsx scripts/bake-tube-data.ts
 *
 * Env required (in .env.local): RAG_SUPABASE_URL + RAG_SUPABASE_KEY
 * (falls back to NEXT_PUBLIC_CMS_SUPABASE_URL + CMS_SUPABASE_SERVICE_KEY).
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { channelLabel } from "../lib/tube/channels";
import type { FacetValue, TubeFacets, TubeIndex, TubeVideo } from "../lib/tube/types";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const URL = process.env.RAG_SUPABASE_URL ?? process.env.NEXT_PUBLIC_CMS_SUPABASE_URL;
const KEY = process.env.RAG_SUPABASE_KEY ?? process.env.CMS_SUPABASE_SERVICE_KEY;
if (!URL || !KEY) {
  console.error("Missing env: RAG_SUPABASE_URL + RAG_SUPABASE_KEY (or CMS equivalents)");
  process.exit(1);
}
const rag = createClient(URL, KEY);

const DATA = path.join(process.cwd(), "lib", "tube", "data");

interface SourceRow {
  video_id: string;
  video_title: string | null;
  video_url: string | null;
  manufacturer_name: string | null;
  audience: string | null;
  content_type: string | null;
  treatments: string[] | null;
  anatomy_areas: string[] | null;
  concerns: string[] | null;
  summary: string | null;
  patient_safe: boolean | null;
  chunk_count: number | null;
  published_at: string | null;
}

async function fetchAll(): Promise<SourceRow[]> {
  const rows: SourceRow[] = [];
  const PAGE = 1000;
  for (let offset = 0; ; offset += PAGE) {
    const { data, error } = await rag
      .from("youtube_videos")
      .select(
        "video_id,video_title,video_url,manufacturer_name,audience,content_type," +
          "treatments,anatomy_areas,concerns,summary,patient_safe,chunk_count,published_at",
      )
      .order("video_id")
      .range(offset, offset + PAGE - 1);
    if (error) throw new Error(`youtube_videos fetch failed: ${error.message}`);
    if (!data?.length) break;
    rows.push(...(data as unknown as SourceRow[]));
    if (data.length < PAGE) break;
  }
  return rows;
}

/** "skin_laxity" -> "Skin Laxity" */
function titleCase(value: string): string {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function toVideo(r: SourceRow): TubeVideo {
  const chunkCount = r.chunk_count ?? 0;
  return {
    id: r.video_id,
    title: (r.video_title ?? "Untitled").trim() || "Untitled",
    url: r.video_url ?? `https://www.youtube.com/watch?v=${r.video_id}`,
    channel: r.manufacturer_name ?? "unknown",
    audience: r.audience,
    contentType: r.content_type,
    treatments: r.treatments ?? [],
    anatomy: r.anatomy_areas ?? [],
    concerns: r.concerns ?? [],
    summary: r.summary ?? "",
    patientSafe: r.patient_safe ?? false,
    tagged: Boolean(r.summary || r.treatments?.length || r.anatomy_areas?.length || r.concerns?.length),
    hasTranscript: chunkCount > 0,
    chunkCount,
    publishedAt: r.published_at,
  };
}

function facet(
  videos: TubeVideo[],
  pick: (v: TubeVideo) => string[],
  label: (value: string) => string = titleCase,
): FacetValue[] {
  const counts = new Map<string, number>();
  for (const v of videos) {
    for (const value of pick(v)) {
      if (!value) continue;
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, label: label(value), count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
}

async function main() {
  const rows = await fetchAll();
  console.log(`Fetched ${rows.length} videos from youtube_videos`);

  const videos = rows.map(toVideo);
  const withDate = videos.filter((v) => v.publishedAt).length;

  const facets: TubeFacets = {
    anatomy: facet(videos, (v) => v.anatomy),
    concerns: facet(videos, (v) => v.concerns),
    treatments: facet(videos, (v) => v.treatments),
    channels: facet(videos, (v) => (v.channel ? [v.channel] : []), channelLabel),
    contentTypes: facet(videos, (v) => (v.contentType ? [v.contentType] : [])),
    audiences: facet(videos, (v) => (v.audience ? [v.audience] : [])),
  };

  const index: TubeIndex = {
    generatedAt: new Date().toISOString(),
    stats: {
      videos: videos.length,
      tagged: videos.filter((v) => v.tagged).length,
      channels: facets.channels.length,
      withTranscript: videos.filter((v) => v.hasTranscript).length,
      anatomyAreas: facets.anatomy.length,
      concerns: facets.concerns.length,
      treatments: facets.treatments.length,
    },
  };

  fs.writeFileSync(path.join(DATA, "videos.json"), JSON.stringify(videos));
  fs.writeFileSync(path.join(DATA, "facets.json"), JSON.stringify(facets));
  fs.writeFileSync(path.join(DATA, "index.json"), JSON.stringify(index, null, 2));

  console.log(
    `Baked ${videos.length} videos (${withDate} with publishedAt), ` +
      `${facets.channels.length} channels, generatedAt=${index.generatedAt}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
