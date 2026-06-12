import { NextRequest, NextResponse } from "next/server";
import { getTranscript } from "@/lib/prompt-runner";
import { logActivity } from "@/lib/activity";

export const dynamic = "force-dynamic";

/**
 * GET /api/transcripts/[id]
 * Full transcript record incl. transcript_raw (server-side proxy).
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const transcript = await getTranscript(id);
    await logActivity({ type: "transcript.viewed", entityType: "transcript", entityId: id });
    return NextResponse.json(transcript);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to load transcript: ${message}` },
      { status: 502 },
    );
  }
}
