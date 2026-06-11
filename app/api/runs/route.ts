import { NextRequest, NextResponse } from "next/server";
import { listRuns } from "@/lib/prompt-runner";

export const dynamic = "force-dynamic";

/**
 * GET /api/runs?transcriptId=&limit=
 * Runs for a transcript (server-side proxy). transcript_id filter is honored upstream.
 */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const transcriptId = sp.get("transcriptId") ?? undefined;
  const limit = Number(sp.get("limit") ?? 100);

  try {
    const result = await listRuns({ transcriptId, limit });
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to load runs: ${message}` },
      { status: 502 },
    );
  }
}
