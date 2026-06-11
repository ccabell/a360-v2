import { NextRequest, NextResponse } from "next/server";
import { getPatient } from "@/lib/prompt-runner";

export const dynamic = "force-dynamic";

/**
 * GET /api/patients/[id]
 * Patient detail with nested transcripts (server-side proxy).
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const patient = await getPatient(id);
    return NextResponse.json(patient);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to load patient: ${message}` },
      { status: 502 },
    );
  }
}
