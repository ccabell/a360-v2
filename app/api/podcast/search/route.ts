import { NextRequest, NextResponse } from "next/server";
import { searchTranscripts } from "@/lib/podcast/search";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get("q")?.trim() ?? "";
  if (!q) {
    return NextResponse.json({ error: "Missing query param `q`" }, { status: 400 });
  }
  const limit = Math.min(Number(searchParams.get("limit")) || 20, 50);

  const results = await searchTranscripts(q, limit);
  return NextResponse.json({ query: q, results });
}
