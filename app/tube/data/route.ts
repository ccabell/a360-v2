import { NextResponse } from "next/server";
import { getTubeVideos, truncateSummary } from "@/lib/tube/server";
import type { TubeCardVideo } from "@/lib/tube/types";

export const dynamic = "force-static";

/**
 * GET /tube/data — the slimmed card payload for the Explore grid, baked at
 * build time and served with a long-lived Cache-Control so repeat visits to
 * /tube/explore hit cache instead of re-downloading the ~1.6 MB video list.
 */
export function GET() {
  const videos = getTubeVideos();

  // Slim payload for the client: drop unused fields (url, audience, tagged,
  // hasTranscript) and truncate summaries — the full video list is ~1.6 MB.
  const cardVideos: TubeCardVideo[] = videos.map((v) => ({
    id: v.id,
    title: v.title,
    channel: v.channel,
    contentType: v.contentType,
    treatments: v.treatments,
    anatomy: v.anatomy,
    concerns: v.concerns,
    patientSafe: v.patientSafe,
    chunkCount: v.chunkCount,
    summary: truncateSummary(v.summary),
    publishedAt: v.publishedAt,
  }));

  return NextResponse.json(cardVideos, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400",
    },
  });
}
