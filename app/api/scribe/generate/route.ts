import { NextRequest, NextResponse } from "next/server";
import { resolveScribe } from "@/lib/scribe/generate";
import type { ScribeGenerateRequest } from "@/lib/scribe/types";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * POST /api/scribe/generate
 * Body: { patientId, consultationId?, recordTypes[], style }
 * Returns the transcript segments + the requested clinical records.
 * Cached-first (deterministic, stage-safe); live generation only for
 * patients without a hand-authored fixture.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Partial<ScribeGenerateRequest>;

  if (!body.patientId || !Array.isArray(body.recordTypes) || body.recordTypes.length === 0) {
    return NextResponse.json(
      { error: "patientId and at least one recordType are required" },
      { status: 400 },
    );
  }

  try {
    const result = await resolveScribe({
      patientId: body.patientId,
      consultationId: body.consultationId,
      noteStyle: body.noteStyle ?? body.recordTypes[0],
      recordTypes: body.recordTypes,
      style: body.style ?? { length: "standard", format: "paragraph" },
    });
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
