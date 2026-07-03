import { NextRequest, NextResponse } from "next/server";
import { getPodcastShow, getShowEpisodes, getEpisodeTagsBatch } from "@/lib/podcast/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const url = req.nextUrl;
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 50), 200);
  const offset = Number(url.searchParams.get("offset") ?? 0);
  const includeTags = url.searchParams.get("tags") !== "false";

  const [show, episodes] = await Promise.all([
    getPodcastShow(id),
    getShowEpisodes(id, { limit, offset }),
  ]);

  if (!show) {
    return NextResponse.json({ error: "Show not found" }, { status: 404 });
  }

  let tagsById: Record<string, { tag_type: string; tag_value: string }[]> = {};
  if (includeTags && episodes.length > 0) {
    const tagMap = await getEpisodeTagsBatch(episodes.map((e) => e.id));
    for (const [epId, tags] of tagMap) {
      tagsById[epId] = tags;
    }
  }

  return NextResponse.json({ show, episodes, tagsById });
}
