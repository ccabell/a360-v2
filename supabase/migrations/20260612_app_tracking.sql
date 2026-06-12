-- a360-v2 demo: lean app tracking + light tenancy.
-- Applied to the agent/app Supabase (aejskvmpembryunnbgrk, "Global V3").
-- Additive, no RLS (server service-key only), app_ prefix to avoid collisions.
-- Intentionally NOT enterprise: no Supabase Auth, no memberships, no per-user RLS.
-- The frontend + shared-password gate are unchanged; tenant is derived from APP_MODE.

CREATE TABLE IF NOT EXISTS app_tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  kind TEXT NOT NULL DEFAULT 'internal' CHECK (kind IN ('internal','investor','practice')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS app_activity_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES app_tenants(id) ON DELETE SET NULL,
  user_ref TEXT,              -- optional actor label (no per-user auth yet)
  type TEXT NOT NULL,         -- e.g. 'patient.viewed', 'run.viewed', 'research.query'
  entity_type TEXT,           -- 'patient' | 'transcript' | 'run' | 'research' | ...
  entity_id TEXT,
  payload JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_app_activity_tenant ON app_activity_events(tenant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_app_activity_type ON app_activity_events(type);

INSERT INTO app_tenants (name, slug, kind) VALUES
  ('Internal', 'internal', 'internal'),
  ('Investor Demo', 'investor', 'investor')
ON CONFLICT (slug) DO NOTHING;
