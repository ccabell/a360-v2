import { NextRequest, NextResponse } from "next/server";
import { listAgentOutputs } from "@/lib/api/ops-store";

export const dynamic = "force-dynamic";

/**
 * GET /api/patients/[id]/agent-outputs
 * All agent outputs for this patient from the ops store.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const outputs = await listAgentOutputs(id);
    return NextResponse.json(outputs);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to load agent outputs: ${message}` },
      { status: 502 },
    );
  }
}
