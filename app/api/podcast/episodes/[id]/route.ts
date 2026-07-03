import { NextRequest, NextResponse } from "next/server";
import {
  getPodcastEpisode,
  getEpisodeChunks,
  getEpisodeTags,
} from "@/lib/podcast/server";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const [episode, chunks, tags] = await Promise.all([
    getPodcastEpisode(id),
    getEpisodeChunks(id),
    getEpisodeTags(id),
  ]);

  if (!episode) {
    return NextResponse.json({ error: "Episode not found" }, { status: 404 });
  }

  return NextResponse.json({ episode, chunks, tags });
}
