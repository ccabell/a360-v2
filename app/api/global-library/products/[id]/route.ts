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
        .select(
          "*, manufacturer:manufacturers(id,name)"
        )
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

      agentSupabase
        .from("evidence_links")
        .select("id, label, url, source_type, evidence_tier, notes")
        .eq("offering_id", id)
        .order("evidence_tier", { ascending: true }),

      agentSupabase
        .from("item_body_areas")
        .select("body_area:body_areas(id,name)")
        .eq("offering_id", id),

      agentSupabase
        .from("item_concerns")
        .select("concern:concerns(id,name)")
        .eq("offering_id", id),

      agentSupabase
        .from("item_relationships")
        .select("relationship_type, notes, related:offerings!item_relationships_related_offering_id_fkey(id,name)")
        .eq("offering_id", id),
    ]);

  if (productRes.error) {
    return NextResponse.json({ error: productRes.error.message }, { status: 404 });
  }

  // content is stored as JSONB — it may be a raw string or wrapped
  let fuelContent: string | null = null;
  if (fuelRes.data?.content) {
    const raw = fuelRes.data.content;
    fuelContent = typeof raw === "string" ? raw : JSON.stringify(raw);
    // Strip surrounding quotes if the JSONB was stored as a JSON string
    if (fuelContent.startsWith('"') && fuelContent.endsWith('"')) {
      try {
        fuelContent = JSON.parse(fuelContent) as string;
      } catch {
        // leave as-is
      }
    }
  }

  return NextResponse.json({
    product: productRes.data,
    fuel: fuelRes.data
      ? {
          status: fuelRes.data.status,
          updated_at: fuelRes.data.updated_at,
          schema_version: fuelRes.data.schema_version,
          content: fuelContent,
        }
      : null,
    evidence: evidenceRes.data ?? [],
    anatomy: (anatomyRes.data ?? []).map((r: { body_area: { id: string; name: string } | null }) => r.body_area).filter(Boolean),
    concerns: (concernsRes.data ?? []).map((r: { concern: { id: string; name: string } | null }) => r.concern).filter(Boolean),
    relationships: relRes.data ?? [],
  });
}
