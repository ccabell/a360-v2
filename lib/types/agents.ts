// =============================================================================
// Agent Manager — Domain Types
// Matches Agent Manager Supabase schema: agents, agent_versions
// =============================================================================

/** Runtime that executes this agent */
export type AgentRuntimeType =
  | "prompt_runner"     // Railway — extraction, coaching, cross-sell, email
  | "claude_tool_use"   // Direct Claude API with tool calling
  | "openai_agents_sdk" // OpenAI Agents SDK
  | "dify_workflow"     // Dify Cloud workflow
  | "custom_fastapi"    // GLobal agent_service or custom
  | "bedrock"           // AWS Bedrock agents

/** Agent status lifecycle */
export type AgentStatus = "draft" | "active" | "deprecated"

/** Agent category */
export type AgentCategory =
  | "extraction"
  | "coaching"
  | "sales"
  | "marketing"
  | "intelligence"
  | "clinical"
  | "gl_population"
  | "reach"
  | "runtime"
  | "evaluation"

/** Agent type (how it's invoked) */
export type AgentType = "builtin" | "webhook" | "bedrock" | "prompt_template" | "dify"

// --- Core Agent ---

export interface Agent {
  id: string
  agent_key: string
  name: string
  description: string | null
  category: AgentCategory
  type: AgentType
  status: AgentStatus
  model: string | null
  execution_target: string | null
  gl_data_sources: Record<string, any> | null
  owner: string | null
  active_version_id: string | null
  created_at: string
  updated_at: string
}

// --- Agent Version (immutable snapshot) ---

export type VersionStatus = "draft" | "candidate" | "active" | "archived"

export interface AgentVersion {
  id: string
  agent_id: string
  agent_key: string
  version: string // semver e.g. "1.0.0"
  status: VersionStatus
  prompt_text: string | null
  model: string | null
  model_params: ModelParams | null
  fuel_contract: Record<string, any> | null
  input_schema: Record<string, any> | null
  output_schema: Record<string, any> | null
  guardrail_config: Record<string, any> | null
  knowledge_config: VersionKnowledgeConfig | null
  created_at: string
}

/** Model parameters stored in agent_versions.model_params */
export interface ModelParams {
  temperature?: number
  max_tokens?: number
  max_tool_rounds?: number
}

/** @deprecated Use ModelParams — kept for agent management UI compatibility */
export type AgentConstraints = ModelParams

/** Knowledge config on agent_versions — includes tool list */
export interface VersionKnowledgeConfig {
  tools?: string[]
  [key: string]: unknown
}

// --- Layer Recipe (populates knowledge_config on agent_versions) ---
// See docs/LAYERED_CONTEXT_MODEL.md for full specification

export interface LayerRecipe {
  layers: {
    task: true
    procedural?: {
      task_tags: string[]
      load_mode: "whole" | "sections"
    }
    domain?: {
      depth: "full" | "thin" | "filters_only"
      include_guardrails: boolean
      include_relationships: boolean
      include_anatomy: boolean
      taxonomy_walk: boolean
    }
    situational?: {
      include: ("patient" | "extraction" | "opportunities" | "transcript" | "run_history")[]
    }
    practice?: {
      include: ("catalog" | "pricing" | "tone" | "preferences" | "compliance" | "send_windows")[]
      override_domain: boolean
    }
    evidence?: {
      enabled: boolean
      corpora?: string[]
      filters?: {
        patient_safe?: boolean
      }
      trigger: "always" | "on_demand" | "if_claim_needs_citing"
    }
  }
}

// --- Tools ---

export interface ToolDef {
  id: string
  tool_key: string
  name: string
  description: string
  parameters_schema: Record<string, any>
  tables_accessed: string[]
  implementation_url: string | null
  data_source: "gl_supabase" | "cms_supabase" | "prompt_runner" | "external"
  created_at: string
}

/** Tool binding = tool + per-agent config */
export interface ToolBinding {
  tool_key: string
  enabled: boolean
  config?: Record<string, any> // per-agent overrides (field filters, max results, etc.)
}

// --- Workflows ---

export type WorkflowMode = "autonomous" | "workflow"

export interface Workflow {
  id: string
  name: string
  description: string | null
  mode: WorkflowMode
  steps: WorkflowStep[]
  created_at: string
  updated_at: string
}

export interface WorkflowStep {
  order: number
  agent_key: string
  input_mapping: Record<string, string> // "$extracted.concerns" → "concerns"
  output_key: string
  condition?: string // optional skip condition
}

// --- Runs ---

export type RunStatus = "pending" | "running" | "completed" | "failed" | "cancelled"

export interface AgentRun {
  id: string
  agent_id: string
  version_id: string | null
  workflow_id: string | null
  workflow_step: number | null
  input: Record<string, any>
  output: Record<string, any> | null
  citations: AgentCitation[]
  status: RunStatus
  duration_ms: number | null
  token_count: number | null
  error: string | null
  created_at: string
}

// --- Citations ---

export type CitationSourceType =
  | "pubmed"
  | "youtube"
  | "podcast"
  | "fda_label"
  | "manufacturer_web"
  | "gl_product"
  | "gl_fuel_document"
  | "transcript"
  | "agent_output"
  | "internal_doc"

export interface AgentCitation {
  id: string
  run_id: string
  source_type: CitationSourceType
  source_id: string
  title: string
  snippet: string
  url: string | null
  field: string | null
  confidence: number | null
}

// --- Eval Results ---

export interface EvalResult {
  id: string
  run_id: string
  agent_id: string
  evaluator: string // "deepeval" | "human" | "llm_judge"
  score: number
  criteria: Record<string, any>
  notes: string | null
  created_at: string
}
