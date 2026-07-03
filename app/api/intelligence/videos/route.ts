import { NextRequest, NextResponse } from "next/server";
import { getTubeVideos } from "@/lib/tube/server";

export const dynamic = "force-dynamic";

export interface IntelVideo {
  videoId: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  channel: string | null;
  blurb: string | null;
}

const STOP = new Set([
  "what", "whats", "the", "for", "and", "of", "to", "in", "with", "how", "do", "does",
  "are", "is", "a", "an", "best", "approach", "patient", "patients", "who", "wants",
  "minimal", "downtime", "evidence", "say", "says", "about", "compare", "comparison",
  "considerations", "safety", "complex", "treat", "treatment", "treating", "between",
  "can", "should", "when", "which", "this", "that", "from", "using", "use", "their",
]);

/**
 * POST /api/intelligence/videos — related video Intelligence for a query, drawn
 * from the CURATED, tagged A360 Tube list (lib/tube/data/videos.json) — not the
 * raw transcript corpus. Tag-aware keyword ranking. Quota-free (local JSON).
 */
export async function POST(req: NextRequest) {
  const { query } = (await req.json().catch(() => ({}))) as { query?: string };
  const q = (query ?? "").toLowerCase();
  const kws = [
    ...new Set(q.replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter((w) => w.length >= 4 && !STOP.has(w))),
  ];
  if (kws.length === 0) return NextResponse.json({ videos: [] });

  const scored = getTubeVideos()
    .map((v) => {
      const title = v.title.toLowerCase();
      const tags = [...v.treatments, ...v.concerns, ...v.anatomy].join(" ").toLowerCase();
      const summary = (v.summary ?? "").toLowerCase();
      let score = 0;
      for (const k of kws) {
        if (title.includes(k)) score += 4;
        else if (tags.includes(k)) score += 3;
        else if (summary.includes(k)) score += 1;
      }
      if (v.tagged) score += 0.5; // prefer enriched, on-topic records
      return { v, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);

  const videos: IntelVideo[] = scored.map(({ v }) => ({
    videoId: v.id,
    title: v.title,
    url: v.url,
    thumbnailUrl: `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
    channel: v.channel,
    blurb: v.summary ? v.summary.slice(0, 140) : null,
  }));

  return NextResponse.json({ videos });
}
