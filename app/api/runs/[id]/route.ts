import { NextRequest, NextResponse } from "next/server";
import { getRun } from "@/lib/prompt-runner";
import { logActivity } from "@/lib/activity";

export const dynamic = "force-dynamic";

/**
 * GET /api/runs/[id]
 * Full run record incl. model, prompt versions, and structured outputs.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const run = await getRun(id);
    await logActivity({ type: "run.viewed", entityType: "run", entityId: id });
    return NextResponse.json(run);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to load run: ${message}` },
      { status: 502 },
    );
  }
}
