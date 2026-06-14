import type { FuelDoc } from "@/lib/types/fuel-docs"
import {
  SAMPLE_COMBINATION,
  SAMPLE_PRODUCT,
  SAMPLE_CONCERN,
} from "@/lib/fuel-docs/sample-templates"

// =============================================================================
// Seed Fuel Docs
//
// Complete FuelDoc objects for use when the API is unavailable or the database
// is empty. These show what fully populated fuel docs look like in the UI.
// =============================================================================

export const SEED_FUEL_DOCS: FuelDoc[] = [
  {
    id: "seed-combination-botox-vollure",
    fuel_type: "combination",
    template_version: "1.0",
    product_name: "Botox Cosmetic + Juvederm Vollure XC",
    source_type: "combination",
    reference_id: null,
    review_status: "approved",
    audience: ["agent", "staff"],
    patient_safe: false,
    last_reviewed: "2026-06-14",
    reviewed_by: "A360 Team",
    content: SAMPLE_COMBINATION,
    metadata: { template_version: "1.0", fuel_type: "combination", seed: true },
    created_at: "2026-06-14T00:00:00Z",
    updated_at: "2026-06-14T00:00:00Z",
  },
  {
    id: "seed-product-botox-cosmetic",
    fuel_type: "product",
    template_version: "1.0",
    product_name: "Botox Cosmetic",
    source_type: "product",
    reference_id: null,
    review_status: "approved",
    audience: ["agent", "staff"],
    patient_safe: false,
    last_reviewed: "2026-06-14",
    reviewed_by: "A360 Team",
    content: SAMPLE_PRODUCT,
    metadata: { template_version: "1.0", fuel_type: "product", seed: true },
    created_at: "2026-06-14T00:00:00Z",
    updated_at: "2026-06-14T00:00:00Z",
  },
  {
    id: "seed-concern-volume-loss",
    fuel_type: "concern",
    template_version: "1.0",
    product_name: "Volume Loss",
    source_type: "concern",
    reference_id: null,
    review_status: "approved",
    audience: ["agent", "staff"],
    patient_safe: false,
    last_reviewed: "2026-06-14",
    reviewed_by: "A360 Team",
    content: SAMPLE_CONCERN,
    metadata: { template_version: "1.0", fuel_type: "concern", seed: true },
    created_at: "2026-06-14T00:00:00Z",
    updated_at: "2026-06-14T00:00:00Z",
  },
]
