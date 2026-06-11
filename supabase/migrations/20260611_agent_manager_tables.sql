-- =============================================================================
-- Agent Manager Tables — fresh schema for Agent Manager Supabase
-- Run against Agent Manager Supabase (aejskvmpembryunnbgrk)
-- =============================================================================

-- ---------------------------------------------------------------------------
-- agents: core agent definitions (replaces a360_agents in fresh DB)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS agents (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_key         TEXT NOT NULL UNIQUE,
  name              TEXT NOT NULL,
  description       TEXT,
  category          TEXT NOT NULL DEFAULT 'extraction'
    CHECK (category IN (
      'extraction', 'coaching', 'sales', 'marketing', 'intelligence',
      'clinical', 'gl_population', 'reach', 'runtime', 'evaluation'
    )),
  type              TEXT NOT NULL DEFAULT 'builtin'
    CHECK (type IN ('builtin', 'webhook', 'bedrock', 'prompt_template', 'dify')),
  status            TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'active', 'deprecated')),
  model             TEXT,
  active_version_id UUID,  -- FK added after agent_versions exists
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_agents_key ON agents(agent_key);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
CREATE INDEX IF NOT EXISTS idx_agents_category ON agents(category);

-- ---------------------------------------------------------------------------
-- agent_versions: immutable version snapshots
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS agent_versions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id          UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  agent_key         TEXT NOT NULL,
  version           TEXT NOT NULL,  -- semver e.g. "1.0.0"
  status            TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'candidate', 'active', 'archived')),
  system_prompt     TEXT,
  model             TEXT,
  runtime_type      TEXT NOT NULL DEFAULT 'prompt_runner'
    CHECK (runtime_type IN (
      'prompt_runner', 'claude_tool_use', 'openai_agents_sdk',
      'dify_workflow', 'custom_fastapi', 'bedrock'
    )),
  tool_config       JSONB DEFAULT '[]',
  source_policies   JSONB DEFAULT '{}',
  output_schema     JSONB,
  constraints       JSONB DEFAULT '{"temperature": 0.3, "max_tokens": 4096, "max_tool_rounds": 5, "citation_required": true}',
  knowledge_config  JSONB,
  notes             TEXT,
  created_by        TEXT,
  promoted_at       TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_agent_versions_agent ON agent_versions(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_versions_status ON agent_versions(status);

-- Now add the FK from agents.active_version_id -> agent_versions.id
ALTER TABLE agents
  ADD CONSTRAINT fk_agents_active_version
  FOREIGN KEY (active_version_id) REFERENCES agent_versions(id);

-- ---------------------------------------------------------------------------
-- agent_tools: registry of tools agents can use
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS agent_tools (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_key    TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  description TEXT,
  parameters_schema JSONB DEFAULT '{}',
  tables_accessed   TEXT[] DEFAULT '{}',
  implementation_url TEXT,
  data_source TEXT NOT NULL DEFAULT 'agent_supabase'
    CHECK (data_source IN ('agent_supabase', 'cms_supabase', 'prompt_runner', 'external')),
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_agent_tools_key ON agent_tools(tool_key);

-- ---------------------------------------------------------------------------
-- agent_documents: playbooks, references, evidence docs (CONTEXT_ASSEMBLY.md)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS agent_documents (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  doc_type      TEXT NOT NULL CHECK (doc_type IN ('playbook', 'reference', 'evidence')),
  task_tags     TEXT[] DEFAULT '{}',
  agent_keys    TEXT[] DEFAULT '{}',
  version       TEXT,
  token_count   INT,
  content       TEXT,
  storage_path  TEXT,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_agent_documents_tags ON agent_documents USING GIN(task_tags);
CREATE INDEX IF NOT EXISTS idx_agent_documents_agents ON agent_documents USING GIN(agent_keys);

-- ---------------------------------------------------------------------------
-- agent_workflows: multi-step agent chains
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS agent_workflows (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  description TEXT,
  mode        TEXT NOT NULL DEFAULT 'workflow'
    CHECK (mode IN ('autonomous', 'workflow')),
  steps       JSONB NOT NULL DEFAULT '[]',
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- agent_runs: execution log for every agent invocation
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS agent_runs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id      UUID REFERENCES agents(id),
  version_id    UUID REFERENCES agent_versions(id),
  workflow_id   UUID REFERENCES agent_workflows(id),
  workflow_step INT,
  input         JSONB DEFAULT '{}',
  output        JSONB,
  status        TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'running', 'completed', 'failed', 'cancelled')),
  duration_ms   INT,
  token_count   INT,
  error         TEXT,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_agent_runs_agent ON agent_runs(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_runs_workflow ON agent_runs(workflow_id);
CREATE INDEX IF NOT EXISTS idx_agent_runs_status ON agent_runs(status);
CREATE INDEX IF NOT EXISTS idx_agent_runs_created ON agent_runs(created_at DESC);

-- ---------------------------------------------------------------------------
-- agent_citations: source references from agent outputs
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS agent_citations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id      UUID NOT NULL REFERENCES agent_runs(id) ON DELETE CASCADE,
  source_type TEXT NOT NULL
    CHECK (source_type IN (
      'pubmed', 'youtube', 'podcast', 'industry',
      'fda_label', 'manufacturer', 'practice',
      'gl_product', 'transcript', 'agent_output', 'internal_doc'
    )),
  source_id   TEXT NOT NULL,
  title       TEXT NOT NULL,
  snippet     TEXT,
  url         TEXT,
  field       TEXT,
  confidence  REAL,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_agent_citations_run ON agent_citations(run_id);
CREATE INDEX IF NOT EXISTS idx_agent_citations_source ON agent_citations(source_type);

-- ---------------------------------------------------------------------------
-- eval_results: evaluation scores per agent run
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS eval_results (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id      UUID NOT NULL REFERENCES agent_runs(id) ON DELETE CASCADE,
  agent_id    UUID REFERENCES agents(id),
  evaluator   TEXT NOT NULL DEFAULT 'llm_judge',
  score       REAL NOT NULL,
  criteria    JSONB DEFAULT '{}',
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_eval_results_run ON eval_results(run_id);
CREATE INDEX IF NOT EXISTS idx_eval_results_agent ON eval_results(agent_id);

-- ---------------------------------------------------------------------------
-- Seed agent_tools with known tools from the platform
-- ---------------------------------------------------------------------------
INSERT INTO agent_tools (tool_key, name, description, tables_accessed, data_source) VALUES
  -- Agent Manager Supabase tools (structured data)
  ('get_product',               'Get Product',               'Fetch a product by name or ID from the Global Library',           ARRAY['gl_products', 'gl_product_facts', 'gl_product_content'], 'agent_supabase'),
  ('list_products',             'List Products',             'List/filter products from the Global Library',                    ARRAY['gl_products'],                                           'agent_supabase'),
  ('get_product_relationships', 'Get Product Relationships', 'Fetch complementary/alternative/sequential product pairings',     ARRAY['gl_product_relationships'],                              'agent_supabase'),
  ('get_product_concerns',      'Get Product Concerns',      'Fetch concern mappings with treatment_role',                      ARRAY['gl_product_concerns', 'gl_concerns'],                    'agent_supabase'),
  ('get_product_anatomy',       'Get Product Anatomy',       'Fetch anatomy area mappings with specificity',                    ARRAY['gl_product_anatomy', 'gl_anatomy_areas'],                'agent_supabase'),
  ('get_fuel_document',         'Get Fuel Document',         'Fetch pre-compiled agent fuel (pairing, product, concern fuel)',   ARRAY['gl_agent_fuel_documents'],                               'agent_supabase'),
  ('get_product_guardrails',    'Get Product Guardrails',    'Fetch safety rules (contraindications, do-not-claim)',            ARRAY['gl_product_guardrails'],                                 'agent_supabase'),
  ('load_playbook',             'Load Playbook',             'Load agent playbook/reference documents by task tag',             ARRAY['agent_documents'],                                       'agent_supabase'),

  -- CMS Supabase tools (RAG search)
  ('search_pubmed',             'Search PubMed',             'Semantic search across 23K articles (37K chunks)',                ARRAY['pubmed_articles_vectorized'],                            'cms_supabase'),
  ('search_youtube',            'Search YouTube',            'Semantic search across 3,894 manufacturer videos (202K chunks)',  ARRAY['manufacturer_youtube_transcript'],                       'cms_supabase'),
  ('search_podcasts',           'Search Podcasts',           'Semantic search across 8,688 episodes (202K chunks)',             ARRAY['podcast_chunks'],                                        'cms_supabase'),
  ('search_industry',           'Search Industry Articles',  'Semantic search across 88K industry article chunks',             ARRAY['industry_article_chunks'],                               'cms_supabase'),

  -- Prompt Runner tools
  ('run_extraction',            'Run Extraction',            'Execute Pass 1/2 extraction on a transcript',                    ARRAY['ie_transcripts', 'ie_runs', 'ie_extractions'],           'prompt_runner'),
  ('get_transcript',            'Get Transcript',            'Fetch a consultation transcript by ID',                          ARRAY['ie_transcripts'],                                        'prompt_runner'),
  ('get_run',                   'Get Run',                   'Fetch a run with extraction outputs',                            ARRAY['ie_runs', 'ie_extractions'],                             'prompt_runner'),
  ('get_opportunities',         'Get Opportunities',         'Fetch extracted opportunities for a run',                        ARRAY['ie_opportunities'],                                      'prompt_runner'),

  -- External tools
  ('search_fda',                'Search FDA Labels',         'Search FDA regulatory data (drug labels, 510k, PMA)',            ARRAY['fda_labels'],                                            'external'),
  ('search_manufacturer_web',   'Search Manufacturer Sites', 'Search manufacturer web content',                               ARRAY['pages'],                                                 'external')
ON CONFLICT (tool_key) DO NOTHING;
