import { NextRequest, NextResponse } from "next/server";
import { listPatients } from "@/lib/prompt-runner";

export const dynamic = "force-dynamic";

/**
 * GET /api/patients?limit=&offset=&q=
 * Server-side proxy to the Prompt Runner /patients endpoint.
 * Keeps the upstream API (and any future auth/PHI controls) on the server.
 */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const limit = Number(sp.get("limit") ?? 50);
  const offset = Number(sp.get("offset") ?? 0);
  const q = sp.get("q") ?? undefined;

  try {
    const result = await listPatients({ limit, offset, q });
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to load patients: ${message}` },
      { status: 502 },
    );
  }
}
