import { NextResponse } from "next/server";
import { agentSupabase } from "@/lib/supabase";

export async function GET() {
  const { data: products, error: prodError } = await agentSupabase
    .from("products")
    .select(
      "id, name, brand_name, kind, regulatory_status, is_active, description, indications, fda_approved_areas, manufacturer_id"
    )
    .eq("is_active", true)
    .order("name");

  if (prodError) {
    return NextResponse.json({ error: prodError.message }, { status: 500 });
  }

  // Agent-intelligence coverage per product — agent_fuel_documents was archived
  // wholesale by GL-V3-Checkpoint's fuel-triage close-out (2026-08-06); the live
  // successor is agent_reference_docs (offering-scoped rows only here).
  const { data: fuelDocs } = await agentSupabase
    .from("agent_reference_docs")
    .select("offering_id, status, updated_at")
    .not("offering_id", "is", null);

  // Evidence link counts per product
  const { data: evidenceLinks } = await agentSupabase
    .from("evidence_links")
    .select("offering_id");

  // Anatomy counts per product
  const { data: anatomy } = await agentSupabase
    .from("item_body_areas")
    .select("offering_id");

  // Concern counts per product
  const { data: concerns } = await agentSupabase
    .from("item_concerns")
    .select("offering_id");

  // Manufacturers
  const { data: manufacturers } = await agentSupabase
    .from("manufacturers")
    .select("id, name");

  const mfrMap = Object.fromEntries((manufacturers ?? []).map((m) => [m.id, m.name]));

  // An offering can have several agent_reference_docs rows (deep_dive_playbook,
  // technique_guide, etc.) — prefer an 'active' one; otherwise fall back to the
  // most recently updated row so the badge still reflects real coverage.
  const fuelMap: Record<string, { offering_id: string; status: string; updated_at: string }> = {};
  for (const f of fuelDocs ?? []) {
    const existing = fuelMap[f.offering_id];
    if (!existing || (f.status === "active" && existing.status !== "active") ||
        (f.status === existing.status && f.updated_at > existing.updated_at)) {
      fuelMap[f.offering_id] = f;
    }
  }

  const evidenceCount: Record<string, number> = {};
  (evidenceLinks ?? []).forEach((e) => {
    evidenceCount[e.offering_id] = (evidenceCount[e.offering_id] ?? 0) + 1;
  });

  const anatomyCount: Record<string, number> = {};
  (anatomy ?? []).forEach((a) => {
    anatomyCount[a.offering_id] = (anatomyCount[a.offering_id] ?? 0) + 1;
  });

  const concernCount: Record<string, number> = {};
  (concerns ?? []).forEach((c) => {
    concernCount[c.offering_id] = (concernCount[c.offering_id] ?? 0) + 1;
  });

  const enriched = (products ?? []).map((p) => ({
    ...p,
    manufacturer_name: mfrMap[p.manufacturer_id] ?? null,
    fuel_status: fuelMap[p.id]?.status ?? null,
    fuel_updated_at: fuelMap[p.id]?.updated_at ?? null,
    evidence_count: evidenceCount[p.id] ?? 0,
    anatomy_count: anatomyCount[p.id] ?? 0,
    concern_count: concernCount[p.id] ?? 0,
  }));

  return NextResponse.json(enriched);
}
