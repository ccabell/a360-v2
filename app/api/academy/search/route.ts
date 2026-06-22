import { NextRequest, NextResponse } from "next/server";
import { searchCorpus } from "@/lib/academy/search";

export const dynamic = "force-dynamic";

/**
 * GET /api/academy/search?q=<query>&limit=<n>
 *
 * Keyword search over the baked Tim Pearce corpus. Returns timestamped segment
 * hits (deep-linkable), matching reference topics, and matching video titles.
 */
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim();
  const limitRaw = parseInt(req.nextUrl.searchParams.get("limit") ?? "40", 10);
  const limit = Number.isFinite(limitRaw)
    ? Math.min(80, Math.max(1, limitRaw))
    : 40;

  if (!q) {
    return NextResponse.json({
      query: "",
      terms: [],
      segments: [],
      topics: [],
      videos: [],
      total: 0,
    });
  }

  const results = searchCorpus(q, limit);
  return NextResponse.json(results);
}
