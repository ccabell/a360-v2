-- =============================================================================
-- Agent Manager Tables — extends existing a360_agents + a360_agent_versions
-- Run against GL Supabase (wvpgmawrizwkmvfnwqfl)
-- =============================================================================

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
  data_source TEXT NOT NULL DEFAULT 'gl_supabase'
    CHECK (data_source IN ('gl_supabase', 'cms_supabase', 'prompt_runner', 'external')),
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_agent_tools_key ON agent_tools(tool_key);

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
  agent_id      UUID REFERENCES a360_agents(id),
  version_id    UUID,
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
      'pubmed', 'youtube', 'podcast', 'fda_label', 'manufacturer_web',
      'gl_product', 'gl_fuel_document', 'transcript', 'agent_output', 'internal_doc'
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
  agent_id    UUID REFERENCES a360_agents(id),
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
  -- GL Supabase tools
  ('get_product',               'Get Product',               'Fetch a product by name or ID from the Global Library',           ARRAY['gl_products', 'gl_product_facts', 'gl_product_content'], 'gl_supabase'),
  ('list_products',             'List Products',             'List/filter products from the Global Library',                    ARRAY['gl_products'],                                           'gl_supabase'),
  ('get_product_relationships', 'Get Product Relationships', 'Fetch complementary/alternative/sequential product pairings',     ARRAY['gl_product_relationships'],                              'gl_supabase'),
  ('get_product_concerns',      'Get Product Concerns',      'Fetch concern mappings with treatment_role',                      ARRAY['gl_product_concerns', 'gl_concerns'],                    'gl_supabase'),
  ('get_product_anatomy',       'Get Product Anatomy',       'Fetch anatomy area mappings with specificity',                    ARRAY['gl_product_anatomy', 'gl_anatomy_areas'],                'gl_supabase'),
  ('get_fuel_document',         'Get Fuel Document',         'Fetch pre-compiled agent fuel (pairing, product, concern fuel)',   ARRAY['gl_agent_fuel_documents'],                               'gl_supabase'),
  ('get_product_guardrails',    'Get Product Guardrails',    'Fetch safety rules (contraindications, do-not-claim)',            ARRAY['gl_product_guardrails'],                                 'gl_supabase'),

  -- CMS Supabase tools (RAG search)
  ('search_pubmed',             'Search PubMed',             'Semantic search across 2,559 articles (37K chunks)',              ARRAY['pubmed_articles_vectorized'],                            'cms_supabase'),
  ('search_youtube',            'Search YouTube',            'Semantic search across 2,548 manufacturer videos (223K chunks)',  ARRAY['manufacturer_youtube_transcript'],                       'cms_supabase'),
  ('search_podcasts',           'Search Podcasts',           'Semantic search across 8,688 episodes (202K chunks)',             ARRAY['podcast_transcripts_vectorized'],                        'cms_supabase'),
  ('search_internal_docs',      'Search Internal Docs',      'Semantic search across A360 internal documentation (15K chunks)', ARRAY['a360_internal_doc_chunks'],                              'cms_supabase'),

  -- Prompt Runner tools
  ('run_extraction',            'Run Extraction',            'Execute Pass 1/2 extraction on a transcript',                    ARRAY['ie_transcripts', 'ie_runs', 'ie_extractions'],           'prompt_runner'),
  ('get_transcript',            'Get Transcript',            'Fetch a consultation transcript by ID',                          ARRAY['ie_transcripts'],                                        'prompt_runner'),
  ('get_run',                   'Get Run',                   'Fetch a run with extraction outputs',                            ARRAY['ie_runs', 'ie_extractions'],                             'prompt_runner'),
  ('get_opportunities',         'Get Opportunities',         'Fetch extracted opportunities for a run',                        ARRAY['ie_opportunities'],                                      'prompt_runner'),

  -- External tools
  ('search_fda',                'Search FDA Labels',         'Search FDA regulatory data (drug labels, 510k, PMA)',            ARRAY['fda_labels'],                                            'external'),
  ('search_manufacturer_web',   'Search Manufacturer Sites', 'Search manufacturer web content (4,538 pages)',                  ARRAY['pages'],                                                 'external')
ON CONFLICT (tool_key) DO NOTHING;
