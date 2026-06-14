// =============================================================================
// Fuel Doc Types — Agent Fuel Document template system
// Three document types: combination, product, concern
// Discriminated union on fuel_type
// =============================================================================

export type FuelDocType = "combination" | "product" | "concern"

export type ReviewStatus = "draft" | "in_review" | "approved" | "active"

// --- Base fields shared across all fuel doc types ---

export interface FuelDocBase {
  id: string
  fuel_type: FuelDocType
  template_version: string // default "1.0"
  product_name: string // display name — existing column in gl_agent_fuel_documents
  source_type: string // existing column — maps to fuel_type conceptually, kept for backwards compat
  reference_id: string | null // FK to gl_product_relationships, gl_products, or gl_concerns
  review_status: ReviewStatus
  audience: string[] // default ["agent", "staff"]
  patient_safe: boolean // default false
  last_reviewed: string | null
  reviewed_by: string | null
  content: Record<string, any> // JSONB content — typed per fuel_type below
  metadata: Record<string, any> | null
  created_at: string
  updated_at: string | null
}

// --- Template 1: Combination fuel doc content ---

export interface CombinationContent {
  patient_facing_name: string
  one_line_positioning: string
  package_goal: string
  ideal_candidate: string
  not_ideal_candidate: string
  concern_tags: string[]
  why_together: string
  a_solves: string
  a_does_not_solve: string
  b_adds: string
  clinical_rationale: string
  patient_education_summary: string
  staff_close: string
  staff_talking_points: string
  do_not_say: {
    universal: string[]
    pair_specific: string[]
    practice_specific: string[]
  }
  top_objections: Array<{
    objection_type: string
    patient_says: string
    handling_language: string
    do_not_say_in_response: string
  }>
  sequencing_note: string
  timing_note: string
  downtime_note: string
  same_session_ok: boolean | null
  maintenance_story: string
  rebooking_trigger: string
  next_visit_prompt: string
  source_support_summary: string
  evidence_level: string
}

// --- Template 2: Product fuel doc content ---

export interface ProductContent {
  product_name: string
  category: string
  mechanism_summary: string
  patient_explanation: string
  fda_indications: string[]
  off_label_common: string[]
  contraindications: string[]
  does_not_solve: string
  key_talking_points: string[]
  patient_faq: Array<{
    question: string
    answer: string
  }>
  differentiators: string
  do_not_say: string[]
  do_not_claim: string[]
  treatment_cadence: string
  onset_time: string
  duration: string
  downtime_summary: string
  source_support_summary: string
  evidence_level: string
}

// --- Template 3: Concern fuel doc content ---

export interface ConcernContent {
  concern_name: string
  concern_cluster_id: string | null
  patient_language: string[]
  underlying_cause: string
  patient_explanation: string
  what_helps: string[]
  what_does_not_help: string[]
  treatment_sequence: string
  expected_timeline: string
  realistic_expectations: string
  consultation_language: string
  staff_talking_points: string[]
  do_not_say: string[]
  do_not_promise: string[]
  source_support_summary: string
  evidence_level: string
}

// --- Practice-level-only fields (no GL fallback) ---

export interface SopFields {
  pre_treatment_checklist: string[]
  consent_requirements: string[]
  post_treatment_instructions: string[]
  follow_up_protocol: string
  emergency_protocol: string
  documentation_requirements: string[]
}

export interface PreferenceFields {
  pricing_notes: string
  preferred_brands: string[]
  scheduling_notes: string
  staff_assignment: string
  room_requirements: string
  inventory_notes: string
}

// --- Discriminated union types ---

export type CombinationFuelDoc = FuelDocBase & {
  fuel_type: "combination"
  content: CombinationContent
}

export type ProductFuelDoc = FuelDocBase & {
  fuel_type: "product"
  content: ProductContent
}

export type ConcernFuelDoc = FuelDocBase & {
  fuel_type: "concern"
  content: ConcernContent
}

export type FuelDoc = CombinationFuelDoc | ProductFuelDoc | ConcernFuelDoc

// --- Practice-level override row ---

export interface PracticeFuelDocOverride {
  id: string
  gl_fuel_doc_id: string
  practice_id: string
  content: Partial<CombinationContent | ProductContent | ConcernContent>
  sop: SopFields | null
  preferences: PreferenceFields | null
  review_status: ReviewStatus
  updated_at: string
  created_at: string
}

// --- Resolved fuel doc (post-COALESCE) ---

export interface ResolvedFuelDoc extends FuelDocBase {
  sop: SopFields | null
  preferences: PreferenceFields | null
  has_practice_override: boolean
}

// --- Helper: create empty content object for a given type ---

export function createEmptyContent(type: FuelDocType): CombinationContent | ProductContent | ConcernContent {
  if (type === "combination") {
    const content: CombinationContent = {
      patient_facing_name: "",
      one_line_positioning: "",
      package_goal: "",
      ideal_candidate: "",
      not_ideal_candidate: "",
      concern_tags: [],
      why_together: "",
      a_solves: "",
      a_does_not_solve: "",
      b_adds: "",
      clinical_rationale: "",
      patient_education_summary: "",
      staff_close: "",
      staff_talking_points: "",
      do_not_say: {
        universal: [],
        pair_specific: [],
        practice_specific: [],
      },
      top_objections: [],
      sequencing_note: "",
      timing_note: "",
      downtime_note: "",
      same_session_ok: null,
      maintenance_story: "",
      rebooking_trigger: "",
      next_visit_prompt: "",
      source_support_summary: "",
      evidence_level: "",
    }
    return content
  }

  if (type === "product") {
    const content: ProductContent = {
      product_name: "",
      category: "",
      mechanism_summary: "",
      patient_explanation: "",
      fda_indications: [],
      off_label_common: [],
      contraindications: [],
      does_not_solve: "",
      key_talking_points: [],
      patient_faq: [],
      differentiators: "",
      do_not_say: [],
      do_not_claim: [],
      treatment_cadence: "",
      onset_time: "",
      duration: "",
      downtime_summary: "",
      source_support_summary: "",
      evidence_level: "",
    }
    return content
  }

  // type === "concern"
  const content: ConcernContent = {
    concern_name: "",
    concern_cluster_id: null,
    patient_language: [],
    underlying_cause: "",
    patient_explanation: "",
    what_helps: [],
    what_does_not_help: [],
    treatment_sequence: "",
    expected_timeline: "",
    realistic_expectations: "",
    consultation_language: "",
    staff_talking_points: [],
    do_not_say: [],
    do_not_promise: [],
    source_support_summary: "",
    evidence_level: "",
  }
  return content
}
