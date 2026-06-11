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
  prompt_file: string | null
  gl_data_sources: Record<string, any> | null
  url: string | null
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
  system_prompt: string | null
  model: string | null
  runtime_type: AgentRuntimeType
  tool_config: ToolBinding[]
  source_policies: Record<string, string[]> // table → allowed fields
  output_schema: Record<string, any> | null
  constraints: AgentConstraints
  knowledge_config: Record<string, any> | null
  fuel_contract: Record<string, any> | null
  eval_profile: string | null
  guardrail_config: Record<string, any> | null
  notes: string | null
  created_by: string | null
  promoted_at: string | null
  created_at: string
}

export interface AgentConstraints {
  max_tool_rounds?: number
  citation_required?: boolean
  approval_required?: boolean
  temperature?: number
  max_tokens?: number
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
