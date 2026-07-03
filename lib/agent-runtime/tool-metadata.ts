/**
 * Human-readable tool metadata for UI display.
 * Client-safe: no server env or Supabase imports — keep it that way so
 * client components (e.g. the Agent Tester) can import it directly.
 * Keys must match the executor's tool registry in ./tools.ts.
 */
export const TOOL_METADATA: Record<
  string,
  { label: string; description: string; icon: string }
> = {
  get_patient_context: {
    label: "Patient Context",
    description:
      "Loads patient demographics, consultation transcript, and extraction outputs",
    icon: "user",
  },
  search_fuel_documents: {
    label: "GL Fuel Docs",
    description:
      "Searches curated GL product intelligence, pairing guides, and treatment protocols",
    icon: "book",
  },
  get_evidence_links: {
    label: "Evidence Links",
    description:
      "Fetches FDA labels, PubMed citations, and manufacturer documentation",
    icon: "link",
  },
  search_clinical_literature: {
    label: "Clinical Literature",
    description:
      "Searches PubMed, YouTube, podcasts, and industry articles (all sources)",
    icon: "microscope",
  },
  search_podcast: {
    label: "Podcast Search",
    description:
      "Searches expert podcast discussions — patient language, clinical pearls, objection handling",
    icon: "mic",
  },
  search_youtube: {
    label: "YouTube Search",
    description:
      "Searches manufacturer training videos — technique protocols, injection demos",
    icon: "video",
  },
  get_product_info: {
    label: "Product Info",
    description:
      "Retrieves detailed product data, FDA status, and treatment relationships",
    icon: "package",
  },
  query_product_database: {
    label: "Product Database",
    description:
      "Broad search across all 425+ GL products by name, brand, or treatment area",
    icon: "database",
  },
};

export const ALL_TOOL_NAMES = Object.keys(TOOL_METADATA);
