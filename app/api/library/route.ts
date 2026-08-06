import { NextResponse } from "next/server";
import { agentSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// doc_type → display category (order drives the index grouping).
// Source: agent_reference_docs, the successor to agent_fuel_documents after
// GL-V3-Checkpoint's fuel-triage close-out (2026-08-06) — see
// decisions/agent-consumption-contract.md and decisions/fuel-knowledge-model-rethink-closed.md.
const CATEGORY: Record<string, { label: string; order: number }> = {
  deep_dive_playbook: { label: "Products", order: 1 },
  concern_reference: { label: "Concerns", order: 2 },
  anatomy_reference: { label: "Anatomy", order: 3 },
  category_overview: { label: "Categories", order: 4 },
  technique_guide: { label: "Techniques", order: 5 },
  clinical_summary: { label: "Clinical summaries", order: 6 },
  patient_education: { label: "Patient education", order: 7 },
  faq: { label: "FAQ", order: 8 },
  objection_handling: { label: "Sales coaching", order: 9 },
  sales_intelligence: { label: "Sales coaching", order: 9 },
  training_material: { label: "Sales coaching", order: 9 },
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

/** GET /api/library — the full agent-reference-doc index, titled and categorized. */
export async function GET() {
  const { data: docs, error } = await agentSupabase
    .from("agent_reference_docs")
    .select("id, doc_type, title, offering_id, updated_at")
    .order("updated_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 502 });

  const items: LibraryItem[] = (docs ?? []).map((d) => {
    const cat = CATEGORY[d.doc_type] ?? { label: titleCase(d.doc_type), order: 99 };
    return {
      id: d.id,
      title: d.title ?? "Untitled",
      fuelType: d.doc_type,
      category: cat.label,
      order: cat.order,
      targetType: d.offering_id ? "offering" : null,
      updatedAt: d.updated_at,
    };
  });

  return NextResponse.json({ items });
}
