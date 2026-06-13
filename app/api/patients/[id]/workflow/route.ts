import { NextRequest, NextResponse } from "next/server";
import { getCachedWorkflow } from "@/lib/api/agent-service";

export const dynamic = "force-dynamic";

/**
 * GET /api/patients/[id]/workflow
 * Cached orchestrator output from the agent service.
 * Uses GET /workflows/cached/{patient_id} — never triggers the live
 * ~4-min orchestrator on stage.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const result = await getCachedWorkflow(id);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to load cached workflow: ${message}` },
      { status: 502 },
    );
  }
}
