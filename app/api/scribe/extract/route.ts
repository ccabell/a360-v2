import { NextRequest, NextResponse } from "next/server";
import { resolveExtraction } from "@/lib/scribe/extraction";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * POST /api/scribe/extract — light, real entity extraction from the transcript.
 * Body: { patientId, consultationId? }
 * Cached (source-linked) for hero patients; live Claude for the rest.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as {
    patientId?: string;
    consultationId?: string;
  };
  if (!body.patientId) {
    return NextResponse.json({ error: "patientId is required" }, { status: 400 });
  }
  try {
    const result = await resolveExtraction(body.patientId, body.consultationId);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Extraction failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
