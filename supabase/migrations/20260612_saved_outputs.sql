-- a360-v2 demo: saved research/agent outputs (hybrid multi-tenant scope — option C).
-- Applied to the agent/app Supabase (aejskvmpembryunnbgrk).
-- NO Supabase Auth yet (keep the shared-password gate); tenant derived from APP_MODE.
-- app_ prefix + tenant_id consistent with app_tenants/app_activity_events. No RLS.

CREATE TABLE IF NOT EXISTS app_saved_outputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES app_tenants(id) ON DELETE SET NULL,
  user_ref TEXT,                        -- optional actor label (no per-user auth yet)
  output_type TEXT NOT NULL DEFAULT 'research_chat'
    CHECK (output_type IN ('research_chat','agent_run','run_extraction')),
  title TEXT,
  question TEXT,
  answer_prose TEXT,
  citations JSONB DEFAULT '[]',          -- snapshot of resolved ResearchCitation[]
  evidence_link_ids UUID[] DEFAULT '{}', -- populated once Phase 3 wires real evidence_links
  payload JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_app_saved_outputs_tenant ON app_saved_outputs(tenant_id, created_at DESC);
