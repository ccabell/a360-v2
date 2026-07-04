/**
 * Types for `v_gl_v1_product_card` — the V1 Global Library product card view.
 * `ProductCard.evidence` is not part of the view; it's joined on from
 * `evidence_links` in lib/products.ts before the card reaches the UI.
 */

export interface ProductQuant {
  unit: string;
  display: string;
  value_min: number | null;
  value_max: number | null;
}

export interface ProductConcern {
  id: string;
  name: string;
}

export interface ProductBodyArea {
  id: string;
  name: string;
  region: string | null;
}

export interface ProductPairing {
  partner_id: string;
  partner_name: string;
  relationship_type: string;
  pairing_tier: string;
  same_session_ok: boolean | null;
  patient_education_text: string | null;
  staff_talking_points: string | null;
}

export interface ProductPricing {
  price_per_unit: number | null;
  unit_label: string | null;
  typical_units_low: number | null;
  typical_units_high: number | null;
  typical_sessions: number | null;
  duration_months: number | null;
  notes: string | null;
}

/** One clinical citation backing a product's claims (from `evidence_links`). */
export interface ProductEvidence {
  id: string;
  /** pubmed | fda_label | ifu | youtube | llm_inference */
  source: string;
  field_name: string | null;
  claim_text: string | null;
  snippet: string | null;
  url: string | null;
  pmid: string | null;
  doi: string | null;
  source_reference: string | null;
  /** 1 = highest authority (FDA label, boxed warning); higher = weaker. */
  authority_rank: number | null;
}

export interface ProductCard {
  id: string;
  name: string;
  brand_name: string | null;
  generic_name: string | null;
  form: string | null;
  manufacturer: string | null;
  logo_path: string | null;
  categories: string[] | null;
  description: string | null;
  concerns: ProductConcern[] | null;
  body_areas: ProductBodyArea[] | null;
  fda_approved_areas: string[] | null;
  does_not_solve: string[] | null;
  onset_time: ProductQuant | null;
  duration_of_effect: ProductQuant | null;
  social_downtime: ProductQuant | null;
  min_retreatment_interval: ProductQuant | null;
  contraindications: string[] | null;
  side_effects: string[] | null;
  pricing: ProductPricing | null;
  pairings: ProductPairing[] | null;
  patient_education_md: string | null;
  faq_md: string | null;
  /** Clinical citations, joined on in lib/products.ts (not from the view). */
  evidence: ProductEvidence[];
}
