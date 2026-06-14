-- Phase 11.1: Fuel Doc Schema Migration
-- Purpose: Add structured columns to gl_agent_fuel_documents + create pl_agent_fuel_documents
-- Status: Reference — apply via Supabase dashboard or CLI when ready
-- Idempotent: All statements use IF NOT EXISTS / IF EXISTS checks

-- 1. Add new columns to gl_agent_fuel_documents (all nullable, no breaking changes)
ALTER TABLE gl_agent_fuel_documents
  ADD COLUMN IF NOT EXISTS fuel_type TEXT,
  ADD COLUMN IF NOT EXISTS template_version TEXT DEFAULT '1.0',
  ADD COLUMN IF NOT EXISTS reference_id UUID,
  ADD COLUMN IF NOT EXISTS review_status TEXT DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS audience JSONB DEFAULT '["agent", "staff"]'::jsonb,
  ADD COLUMN IF NOT EXISTS patient_safe BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS last_reviewed TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS reviewed_by TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- 2. Backfill fuel_type from source_type for existing rows
-- (Maps existing source_type values to the new fuel_type enum)
UPDATE gl_agent_fuel_documents
SET fuel_type = CASE
  WHEN source_type IN ('pairing_fuel', 'combination') THEN 'combination'
  WHEN source_type IN ('product_fuel', 'product') THEN 'product'
  WHEN source_type IN ('concern_fuel', 'concern') THEN 'concern'
  ELSE source_type
END
WHERE fuel_type IS NULL;

-- 3. Create practice-level override table
CREATE TABLE IF NOT EXISTS pl_agent_fuel_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gl_fuel_doc_id UUID NOT NULL REFERENCES gl_agent_fuel_documents(id) ON DELETE CASCADE,
  practice_id UUID NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  sop JSONB,
  preferences JSONB,
  review_status TEXT DEFAULT 'draft',
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(gl_fuel_doc_id, practice_id)
);

-- 4. Index for practice lookup performance
CREATE INDEX IF NOT EXISTS idx_pl_fuel_docs_practice
  ON pl_agent_fuel_documents(practice_id, gl_fuel_doc_id);

-- 5. Index for fuel_type filtering on GL table
CREATE INDEX IF NOT EXISTS idx_gl_fuel_docs_type
  ON gl_agent_fuel_documents(fuel_type);

-- 6. Index for review_status filtering
CREATE INDEX IF NOT EXISTS idx_gl_fuel_docs_status
  ON gl_agent_fuel_documents(review_status);
