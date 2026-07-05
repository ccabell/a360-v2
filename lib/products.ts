import { agentSupabase } from "@/lib/supabase";
import type { ProductCard, ProductEvidence } from "@/lib/types/products";

export interface ProductsResult {
  products: ProductCard[];
  /** Non-null when the product list couldn't be loaded — surfaced to the user. */
  error: string | null;
}

type EvidenceRow = ProductEvidence & { offering_id: string };

/**
 * Loads the V1 Global Library product cards with their clinical evidence
 * attached. Evidence (`evidence_links`) is fetched in one pass and grouped onto
 * each card by `offering_id` (== product id). An evidence-fetch failure is
 * non-fatal: cards still render, just without citations.
 */
export async function getProductCards(): Promise<ProductsResult> {
  try {
    const [cardsRes, evidenceRes] = await Promise.all([
      agentSupabase.from("v_gl_v1_product_card").select("*").order("name"),
      agentSupabase
        .from("evidence_links")
        .select(
          "id, offering_id, source, field_name, claim_text, snippet, url, pmid, doi, source_reference, authority_rank",
        )
        .order("authority_rank", { ascending: true, nullsFirst: false }),
    ]);

    if (cardsRes.error) return { products: [], error: cardsRes.error.message };

    const byOffering = new Map<string, ProductEvidence[]>();
    for (const { offering_id, ...evidence } of (evidenceRes.data ?? []) as EvidenceRow[]) {
      const list = byOffering.get(offering_id);
      if (list) list.push(evidence);
      else byOffering.set(offering_id, [evidence]);
    }

    const rows = (cardsRes.data ?? []) as Omit<ProductCard, "evidence">[];
    const products: ProductCard[] = rows.map((c) => ({
      ...c,
      evidence: byOffering.get(c.id) ?? [],
    }));
    return { products, error: null };
  } catch (err) {
    return {
      products: [],
      error: err instanceof Error ? err.message : "Failed to load products.",
    };
  }
}
