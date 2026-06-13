-- 05-01-schema-clusters.sql
-- Create concern_clusters and concern_cluster_members tables
-- Purpose: Multi-mechanism experiential clusters (e.g., "Tired Appearance") that route
--          to multiple canonical concerns for concern-first product routing.
--
-- Supabase project: aejskvmpembryunnbgrk
-- Phase: 05-concern-language

-- Concern clusters: experiential, multi-mechanism descriptors
-- e.g., "Tired Appearance" routes to Tear Trough + Brow Ptosis + Volume Loss + Skin Quality
CREATE TABLE IF NOT EXISTS concern_clusters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  patient_phrase TEXT,          -- canonical example: "I look tired"
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS concern_cluster_members (
  cluster_id UUID REFERENCES concern_clusters(id) ON DELETE CASCADE,
  concern_id UUID REFERENCES concerns(id) ON DELETE CASCADE,
  mechanism_role TEXT CHECK (mechanism_role IN ('primary', 'contributing')),
  PRIMARY KEY (cluster_id, concern_id)
);
