import { NextRequest, NextResponse } from "next/server";
import { getCachedWorkflow } from "@/lib/api/agent-service";

export const dynamic = "force-dynamic";

/**
 * GET /api/patients/[id]/workflow
 * Cached orchestrator output from the agent service.
 * Returns { agent_key, status, report_text, latency_ms, created_at }.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const result = await getCachedWorkflow(id);
    return NextResponse.json({
      agent_key: result.agent_key,
      status: result.status,
      report_text: result.result.text,
      latency_ms: result.latency_ms,
      created_at: result.created_at,
      is_demo_canonical: result.is_demo_canonical,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    // 404 from agent service = no cached workflow for this patient
    if (message.includes("404")) {
      return NextResponse.json(
        { error: "No cached workflow for this patient", report_text: null },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: `Failed to load cached workflow: ${message}` },
      { status: 502 },
    );
  }
}
