import { NextRequest, NextResponse } from "next/server";
import { getPodcastShows } from "@/lib/podcast/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get("category") ?? undefined;
  const sort = (searchParams.get("sort") as "episodes" | "name" | "latest") ?? undefined;

  const shows = await getPodcastShows({ category, sort });
  return NextResponse.json(shows);
}
