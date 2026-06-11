// =============================================================================
// Data Source Types — GL Supabase + CMS Supabase + Prompt Runner
// Reference types for the data the Agent Manager can access
// =============================================================================

// --- GL Products (gl_products) ---

export interface GLProduct {
  id: string
  name: string
  brand: string | null
  manufacturer: string | null
  category: string | null
  subcategory: string | null
  fda_status: string | null
  description: string | null
  active_ingredients: string | null
  created_at: string
  updated_at: string
}

// --- GL Product Facts (gl_product_facts) ---

export interface GLProductFact {
  id: string
  product_id: string
  field_key: string
  value: string
  authority_level: "fda" | "manufacturer" | "clinical_consensus" | "practitioner_opinion"
  source_ref: string | null
  created_at: string
}

// --- GL Agent Fuel Documents (gl_agent_fuel_documents) ---

export interface GLAgentFuelDocument {
  id: string
  product_name: string
  source_type: string
  content: string
  metadata: Record<string, any> | null
  created_at: string
}

// --- GL Product Relationships (gl_product_relationships) ---

export interface GLProductRelationship {
  id: string
  product_a_id: string
  product_b_id: string
  relationship_type: "complementary" | "alternative" | "sequential" | "contraindicated"
  evidence: string | null
  created_at: string
}

// --- IE Transcripts (ie_transcripts) ---

export interface IETranscript {
  id: string
  practice_id: string | null
  consultation_type: string | null
  transcript_text: string
  duration_seconds: number | null
  created_at: string
}

// --- IE Runs (ie_runs) ---

export interface IERun {
  id: string
  transcript_id: string
  status: string
  extraction_outputs: Record<string, any> | null
  prompt_set_id: string | null
  created_at: string
}

// --- IE Opportunities (ie_opportunities) ---

export interface IEOpportunity {
  id: string
  run_id: string
  opportunity_type: "primary" | "secondary" | "future"
  product_name: string | null
  description: string | null
  stage: string | null
  confidence: number | null
  created_at: string
}

// --- CMS: Podcast Chunks ---

export interface PodcastChunk {
  id: string
  episode_title: string
  show_name: string
  chunk_text: string
  chunk_index: number
  similarity?: number
}

// --- CMS: YouTube Chunks ---

export interface YouTubeChunk {
  id: string
  video_title: string
  channel_name: string
  chunk_text: string
  chunk_index: number
  similarity?: number
}

// --- CMS: PubMed Chunks ---

export interface PubMedChunk {
  id: string
  article_title: string
  authors: string | null
  journal: string | null
  year: number | null
  chunk_text: string
  similarity?: number
}
