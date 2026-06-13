import { NextRequest, NextResponse } from "next/server";
import { listPatients } from "@/lib/api/ops-store";

export const dynamic = "force-dynamic";

/**
 * GET /api/patients?limit=&offset=&q=
 * Reads from the ops store (Supabase uedajrdzcjfrmbiznflf).
 */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const limit = Number(sp.get("limit") ?? 50);
  const offset = Number(sp.get("offset") ?? 0);
  const q = sp.get("q") ?? undefined;

  try {
    const result = await listPatients({ limit, offset, q });
    // Map ops store fields to the shape PatientsTable expects
    const mapped = result.data.map((p) => ({
      ...p,
      dob: p.birth_date,
      prior_visits: null,
    }));
    return NextResponse.json({ data: mapped, total: result.total });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to load patients: ${message}` },
      { status: 502 },
    );
  }
}
