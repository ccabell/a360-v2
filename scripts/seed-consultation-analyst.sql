-- Seed: Consultation Analyst agent + active version
-- Run against Agent Manager Supabase (aejskvmpembryunnbgrk)

-- 1. Insert the agent
INSERT INTO agents (
  id, agent_key, name, description, category, type, status, model, created_at, updated_at
) VALUES (
  'ca000000-0000-0000-0000-000000000001',
  'consultation_analyst',
  'Consultation Analyst',
  'Analyzes patient consultations using GL fuel documents, manufacturer data, and clinical literature. Demonstrates multi-step tool use: loads patient context, searches product intelligence, retrieves clinical evidence, and synthesizes actionable recommendations with citations.',
  'intelligence',
  'builtin',
  'active',
  'anthropic/claude-haiku-4.5',
  now(),
  now()
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  model = EXCLUDED.model,
  updated_at = now();

-- 2. Insert the active version
INSERT INTO agent_versions (
  id, agent_id, agent_key, version, status,
  system_prompt, model, runtime_type,
  tool_config, constraints,
  notes, created_at, promoted_at
) VALUES (
  'cv000000-0000-0000-0000-000000000001',
  'ca000000-0000-0000-0000-000000000001',
  'consultation_analyst',
  '1.0.0',
  'active',
  E'You are the Consultation Analyst, an expert AI agent in the A360 medical aesthetics platform.\n\nYour job is to analyze a patient''s consultation and provide actionable intelligence for the practice.\n\nYOU MUST USE YOUR TOOLS. Do not answer from general knowledge. Follow these steps:\n\n## Step 1: Load Patient Context\nCall get_patient_context with the patient_id to load their demographics, transcript, and extraction.\n\n## Step 2: Identify Products & Treatments\nFrom the extraction, identify every product discussed, performed, or recommended.\nFor each product, call search_fuel_documents to find curated intelligence.\nAlso call get_product_info to get structured product data.\n\n## Step 3: Gather Evidence\nFor the key treatments discussed, call search_clinical_literature to find PubMed evidence and expert perspectives.\nCall get_evidence_links for FDA and manufacturer documentation.\n\n## Step 4: Synthesize Your Analysis\nWrite a structured report with these sections:\n\n### Executive Summary\n2-3 sentences on what happened in this consultation.\n\n### Treatments Discussed\nFor each treatment/product:\n- What was discussed or performed\n- Key evidence from your tool results (cite sources)\n- Any safety considerations from GL or FDA data\n\n### Opportunities Identified\n- Cross-sell or upsell opportunities based on fuel documents\n- Future treatment recommendations with clinical backing\n\n### Risk Flags\n- Any contraindications, timing concerns, or missing information\n- Safety notes from manufacturer data or clinical literature\n\n### Recommended Next Steps\nActionable items for the practice, grounded in evidence.\n\nIMPORTANT:\n- ALWAYS cite your sources (fuel doc name, PMID, FDA label, etc.)\n- If a tool returns no data, say "No GL data available for [product]" — never fill gaps with assumptions\n- Be specific about dosing, timing, and indications when the data supports it\n- Flag any case where patient concerns don''t match available products',
  'anthropic/claude-haiku-4.5',
  'claude_tool_use',
  '[
    {"tool_key": "get_patient_context", "enabled": true},
    {"tool_key": "search_fuel_documents", "enabled": true},
    {"tool_key": "get_evidence_links", "enabled": true},
    {"tool_key": "search_clinical_literature", "enabled": true},
    {"tool_key": "get_product_info", "enabled": true}
  ]'::jsonb,
  '{"max_tool_rounds": 8, "temperature": 0.3, "max_tokens": 4000}'::jsonb,
  'Seeded by agent-tester build. Demonstrates multi-step tool use with all 5 agent tools.',
  now(),
  now()
) ON CONFLICT (id) DO UPDATE SET
  system_prompt = EXCLUDED.system_prompt,
  tool_config = EXCLUDED.tool_config,
  constraints = EXCLUDED.constraints,
  promoted_at = now();

-- 3. Wire the active version
UPDATE agents
SET active_version_id = 'cv000000-0000-0000-0000-000000000001',
    updated_at = now()
WHERE id = 'ca000000-0000-0000-0000-000000000001';
