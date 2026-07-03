import { NextResponse } from "next/server";
import { opsSupabase } from "@/lib/supabase";
import { CACHED_PATIENT_IDS } from "@/lib/scribe/fixtures";
import { CACHED_TCP_PATIENT_IDS } from "@/lib/tcp/fixtures";

export const dynamic = "force-dynamic";

export interface DemoPatientCard {
  id: string;
  name: string;
  age: number | null;
  sex: string | null;
  summary: string | null;
  consultationId: string | null;
  visitType: string | null;
  visitDescription: string | null;
  durationMinutes: number | null;
  /** Agent keys that have a stage-safe cached fixture for this patient. */
  stageReadyFor: string[];
}

/**
 * GET /api/demo-agents/patients — the shared patient picker (limited to 5).
 * Each card carries the patient summary plus the latest consultation's visit
 * type + description, and whether a stage-safe cached scribe fixture exists.
 */
export async function GET() {
  const { data: patients, error } = await opsSupabase
    .from("patients")
    .select("id, first_name, last_name, birth_date, biological_sex, patient_summary")
    .eq("is_active", true)
    .order("last_consultation_at", { ascending: false, nullsFirst: false })
    .limit(5);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  const ids = (patients ?? []).map((p) => p.id);
  const { data: consults } = ids.length
    ? await opsSupabase
        .from("consultations")
        .select("id, patient_id, consult_type, details, duration_minutes, started_at")
        .in("patient_id", ids)
        .order("started_at", { ascending: false })
    : { data: [] };

  // latest consultation per patient
  const latest = new Map<string, NonNullable<typeof consults>[number]>();
  for (const c of consults ?? []) {
    if (c.patient_id && !latest.has(c.patient_id)) latest.set(c.patient_id, c);
  }

  const cards: DemoPatientCard[] = (patients ?? []).map((p) => {
    const c = latest.get(p.id);
    const age = p.birth_date
      ? Math.floor(
          (Date.now() - new Date(p.birth_date).getTime()) / 3.15576e10,
        )
      : null;
    return {
      id: p.id,
      name: `${p.first_name} ${p.last_name}`,
      age,
      sex: p.biological_sex,
      summary: p.patient_summary,
      consultationId: c?.id ?? null,
      visitType: c?.consult_type ?? null,
      visitDescription: c?.details ?? null,
      durationMinutes: c?.duration_minutes ?? null,
      stageReadyFor: [
        ...(CACHED_PATIENT_IDS.includes(p.id) ? ["scribe"] : []),
        ...(CACHED_TCP_PATIENT_IDS.includes(p.id) ? ["tcp"] : []),
      ],
    };
  });

  return NextResponse.json({ data: cards });
}
