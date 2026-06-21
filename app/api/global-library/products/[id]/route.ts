import { NextResponse } from "next/server";
import { agentSupabase } from "@/lib/supabase";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const [productRes, fuelRes, evidenceRes, anatomyRes, concernsRes, relRes] =
    await Promise.all([
      agentSupabase
        .from("products")
        .select("*, manufacturer:manufacturers(id,name)")
        .eq("id", id)
        .single(),

      agentSupabase
        .from("agent_fuel_documents")
        .select("id, fuel_type, status, content, updated_at, schema_version")
        .eq("offering_id", id)
        .eq("fuel_type", "product_fuel")
        .order("updated_at", { ascending: false })
        .limit(1)
        .single(),

      // evidence_links: source, source_reference, url, snippet, authority_rank
      agentSupabase
        .from("evidence_links")
        .select("id, source, source_reference, url, snippet, authority_rank")
        .eq("offering_id", id)
        .order("authority_rank", { ascending: true }),

      agentSupabase
        .from("item_body_areas")
        .select("body_area:body_areas(id,name)")
        .eq("offering_id", id),

      agentSupabase
        .from("item_concerns")
        .select("concern:concerns(id,name)")
        .eq("offering_id", id),

      // item_relationships: offering_a_id / offering_b_id, join products for name
      agentSupabase
        .from("item_relationships")
        .select("relationship_type, clinical_rationale, timing_guidance, pairing_tier, offering_b_id")
        .eq("offering_a_id", id)
        .eq("is_active", true),
    ]);

  if (productRes.error) {
    return NextResponse.json({ error: productRes.error.message }, { status: 404 });
  }

  // Resolve related product names from offering_b_ids
  const relatedIds = (relRes.data ?? []).map((r) => r.offering_b_id).filter(Boolean);
  let relatedProducts: Array<{ id: string; name: string; brand_name: string | null }> = [];
  if (relatedIds.length > 0) {
    const { data } = await agentSupabase
      .from("products")
      .select("id, name, brand_name")
      .in("id", relatedIds);
    relatedProducts = data ?? [];
  }
  const relatedMap = Object.fromEntries(relatedProducts.map((p) => [p.id, p]));

  const relationships = (relRes.data ?? []).map((r) => ({
    relationship_type: r.relationship_type as string,
    clinical_rationale: r.clinical_rationale as string | null,
    timing_guidance: r.timing_guidance as string | null,
    pairing_tier: r.pairing_tier as string | null,
    related: relatedMap[r.offering_b_id]
      ? {
          id: r.offering_b_id as string,
          name: (relatedMap[r.offering_b_id].brand_name ?? relatedMap[r.offering_b_id].name) as string,
        }
      : null,
  }));

  // Parse fuel content from JSONB
  let fuelContent: string | null = null;
  if (fuelRes.data?.content) {
    const raw = fuelRes.data.content;
    fuelContent = typeof raw === "string" ? raw : JSON.stringify(raw);
    if (fuelContent.startsWith('"') && fuelContent.endsWith('"')) {
      try { fuelContent = JSON.parse(fuelContent) as string; } catch { /* leave */ }
    }
  }

  // Normalize anatomy / concerns (Supabase may return array or object for joined tables)
  const anatomy = (anatomyRes.data ?? [])
    .map((r) => { const ba = r.body_area; return Array.isArray(ba) ? ba[0] ?? null : ba; })
    .filter(Boolean);

  const concerns = (concernsRes.data ?? [])
    .map((r) => { const c = r.concern; return Array.isArray(c) ? c[0] ?? null : c; })
    .filter(Boolean);

  return NextResponse.json({
    product: productRes.data,
    fuel: fuelRes.data
      ? { status: fuelRes.data.status, updated_at: fuelRes.data.updated_at, content: fuelContent }
      : null,
    evidence: evidenceRes.data ?? [],
    anatomy,
    concerns,
    relationships,
  });
}
