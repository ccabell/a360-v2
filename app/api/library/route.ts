import { NextResponse } from "next/server";
import { agentSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// fuel_type → display category (order drives the index grouping).
const CATEGORY: Record<string, { label: string; order: number }> = {
  product_fuel: { label: "Products", order: 1 },
  concern_fuel: { label: "Concerns", order: 2 },
  anatomy_fuel: { label: "Anatomy", order: 3 },
  pairing_fuel: { label: "Pairings", order: 4 },
  category_fuel: { label: "Categories", order: 5 },
  coaching_fuel: { label: "Sales coaching", order: 6 },
  reach_fuel: { label: "Marketing", order: 7 },
};

export interface LibraryItem {
  id: string;
  title: string;
  fuelType: string;
  category: string;
  order: number;
  targetType: string | null;
  updatedAt: string | null;
}

function titleCase(s: string): string {
  return s.replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();
}

/** GET /api/library — the full fuel-document index, titled and categorized. */
export async function GET() {
  const { data: docs, error } = await agentSupabase
    .from("agent_fuel_documents")
    .select("id, fuel_type, target_type, target_id, doc_key, updated_at")
    .order("updated_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 502 });

  const [products, concerns, areas, cats, rels] = await Promise.all([
    agentSupabase.from("products").select("id, name"),
    agentSupabase.from("concerns").select("id, name"),
    agentSupabase.from("body_areas").select("id, name"),
    agentSupabase.from("categories").select("id, name"),
    agentSupabase.from("item_relationships").select("id, offering_a_id, offering_b_id"),
  ]);

  const pMap = new Map((products.data ?? []).map((r) => [r.id, r.name as string]));
  const cMap = new Map((concerns.data ?? []).map((r) => [r.id, r.name as string]));
  const aMap = new Map((areas.data ?? []).map((r) => [r.id, r.name as string]));
  const catMap = new Map((cats.data ?? []).map((r) => [r.id, r.name as string]));
  const relMap = new Map((rels.data ?? []).map((r) => [r.id, r]));

  function titleFor(d: { target_type: string | null; target_id: string | null; doc_key: string | null }): string {
    const t = d.target_id ?? "";
    switch (d.target_type) {
      case "offering": return pMap.get(t) ?? "Product";
      case "concern": return cMap.get(t) ?? "Concern";
      case "body_area": return aMap.get(t) ?? "Anatomy region";
      case "category": return catMap.get(t) ?? "Category";
      case "item_relationship": {
        const r = relMap.get(t);
        if (r) return `${pMap.get(r.offering_a_id) ?? "?"} × ${pMap.get(r.offering_b_id) ?? "?"}`;
        return "Pairing";
      }
      default:
        return titleCase((d.doc_key ?? "Document").split("::").pop() ?? "Document");
    }
  }

  const items: LibraryItem[] = (docs ?? []).map((d) => {
    const cat = CATEGORY[d.fuel_type] ?? { label: titleCase(d.fuel_type), order: 99 };
    return {
      id: d.id,
      title: titleFor(d),
      fuelType: d.fuel_type,
      category: cat.label,
      order: cat.order,
      targetType: d.target_type,
      updatedAt: d.updated_at,
    };
  });

  return NextResponse.json({ items });
}
