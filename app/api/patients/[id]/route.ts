import { NextRequest, NextResponse } from "next/server";
import { getPatient } from "@/lib/api/ops-store";
import { logActivity } from "@/lib/activity";

export const dynamic = "force-dynamic";

/**
 * GET /api/patients/[id]
 * Full patient detail from ops store: patient + consultations (with
 * transcript + verified extraction each) + patient_intelligence view.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const detail = await getPatient(id);
    await logActivity({ type: "patient.viewed", entityType: "patient", entityId: id });

    // Map to the shape PatientWorkspace expects (backward-compat with
    // Prompt Runner types) while also exposing the richer ops store data.
    const response = {
      ...detail,
      // Fields the existing UI reads
      dob: detail.birth_date,
      prior_visits: null,
      // Flatten consultations into the "transcripts" list the UI expects,
      // enriched with consultation metadata
      transcripts: detail.consultations.map((c) => ({
        id: c.transcript?.id ?? c.id,
        consultation_id: c.id,
        consult_number: c.consult_number ?? 1,
        transcript_date: c.started_at ?? c.created_at,
        duration_minutes: c.duration_minutes ?? 0,
        clinic: "",
        transcript_summary: c.transcript?.transcript_summary ?? c.details ?? "",
        consult_type: c.consult_type ?? "consultation",
        created_at: c.created_at,
        // Full data for new components
        transcript_raw: c.transcript?.transcript_raw ?? null,
        extraction: c.extraction ?? null,
      })),
      // New ops store fields (for new components Abhishek builds)
      intelligence: detail.intelligence,
    };

    return NextResponse.json(response);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to load patient: ${message}` },
      { status: 502 },
    );
  }
}
