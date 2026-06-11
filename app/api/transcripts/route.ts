import { NextRequest, NextResponse } from "next/server";
import { listTranscripts } from "@/lib/prompt-runner";

export const dynamic = "force-dynamic";

/**
 * GET /api/transcripts?limit=&offset=
 * Proxy to Prompt Runner for transcript list (used by playground transcript selector).
 */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const limit = Number(sp.get("limit") ?? 50);
  const offset = Number(sp.get("offset") ?? 0);

  try {
    const result = await listTranscripts({ limit, offset });
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
