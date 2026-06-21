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

  // Fuel doc status per product
  const { data: fuelDocs } = await agentSupabase
    .from("agent_fuel_documents")
    .select("offering_id, status, updated_at")
    .eq("fuel_type", "product_fuel");

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
  const fuelMap = Object.fromEntries((fuelDocs ?? []).map((f) => [f.offering_id, f]));

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
