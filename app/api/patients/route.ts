import { NextRequest, NextResponse } from "next/server";
import { listPatients, getPatient } from "@/lib/prompt-runner";

export const dynamic = "force-dynamic";

/**
 * GET /api/patients?limit=&offset=&q=&enrich=1
 * Server-side proxy to the Prompt Runner /patients endpoint.
 * With enrich=1, each patient is augmented (in parallel) with a lightweight
 * per-patient summary: transcript count, first visit description, consult type,
 * and the first transcript id (for the list's Start-extraction / View-transcript
 * actions). Keeps the upstream API and N+1 fan-out on the server.
 */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const limit = Number(sp.get("limit") ?? 50);
  const offset = Number(sp.get("offset") ?? 0);
  const q = sp.get("q") ?? undefined;
  const enrich = sp.get("enrich") === "1";

  try {
    const result = await listPatients({ limit, offset, q });

    if (!enrich) return NextResponse.json(result);

    const data = await Promise.all(
      result.data.map(async (p) => {
        try {
          const detail = await getPatient(p.id);
          const ts = detail.transcripts ?? [];
          const first = ts[0];
          return {
            ...p,
            transcript_count: ts.length,
            visit_description: first?.transcript_summary ?? null,
            consult_type: first?.consult_type ?? null,
            first_transcript_id: first?.id ?? null,
          };
        } catch {
          return {
            ...p,
            transcript_count: 0,
            visit_description: null,
            consult_type: null,
            first_transcript_id: null,
          };
        }
      }),
    );

    return NextResponse.json({ data, total: result.total });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to load patients: ${message}` },
      { status: 502 },
    );
  }
}
