# Claude Code Instructions — Dossier Schema Migration & Population (v2, real DB)

Exact, copy-pasteable instructions for Claude Code to extend `aejskvmpembryunnbgrk` for the dossier system and populate it safely. Follow in order. **Read every STOP gate — do not skip them.**

**Target DB**: Supabase project `aejskvmpembryunnbgrk` (the fresh CORE database for this project).
**NOT** the v1 GL project `wvpgmawrizwkmvfnwqfl` and **NOT** the CMS vector project. The dossier prose/provenance/packets live in `aejskvmpembryunnbgrk`; the corpora vectors are read from the CMS project during compile.
**Access**: the Supabase MCP server is authorized against this project (verified — schema readable). Prefer MCP tools (`apply_migration`, `execute_sql`) over raw psql so changes are tracked.
**Migration history**: currently EMPTY (schema was built untracked). From here on, every DDL change goes through `apply_migration` so it IS tracked.
**Principle**: additive only. We ADD two columns (+ optional third) and POPULATE existing tables. We do NOT create the old `gl_dossier_*` tables (the redesign already has native homes), and we do NOT alter/drop existing columns.

---

## STEP 0 — Preflight (verify before touching anything)

```
1. Confirm the MCP Supabase connection targets project_id = aejskvmpembryunnbgrk.
2. Run Supabase:list_tables (verbose=false) and confirm you see the 27 tables incl
   agent_reference_docs, evidence_links, agent_fuel_documents, item_relationships,
   global_item_incompatibilities, global_alternatives, global_avoidance_guidance.
3. Confirm agent_reference_docs currently has 0 rows (we're populating it fresh).
```

**STOP GATE 0**: Confirm with Chris you are on `aejskvmpembryunnbgrk`. Do not proceed until confirmed.

---

## STEP 1 — Write the migration (do not apply yet)

The dossier system needs only column additions. Prepare this as a named migration via `apply_migration` (name: `0001_dossier_columns`). Content:

```sql
-- 0001_dossier_columns  (additive only; no table creation, no drops)

-- (A) lens axis on agent_reference_docs
DO $$ BEGIN
  CREATE TYPE knowledge_lens AS ENUM ('clinical','sales_education','deep_product');
EXCEPTION WHEN duplicate_object THEN null; END $$;

ALTER TABLE public.agent_reference_docs
  ADD COLUMN IF NOT EXISTS lens knowledge_lens;

-- (B) category->product inheritance
ALTER TABLE public.agent_reference_docs
  ADD COLUMN IF NOT EXISTS extends_doc_id uuid REFERENCES public.agent_reference_docs(id);

-- (C) OPTIONAL but recommended: first-class anatomy attachment
ALTER TABLE public.agent_reference_docs
  ADD COLUMN IF NOT EXISTS body_area_id uuid REFERENCES public.body_areas(id);

-- index for the agent-load path
CREATE INDEX IF NOT EXISTS idx_aref_lens_entity
  ON public.agent_reference_docs (lens, offering_id, category_id, concern_id);
```

Optional convenience view (separate migration `0002_dossier_view`, only if wanted):
```sql
CREATE OR REPLACE VIEW public.v_offering_dossier AS
SELECT ard.offering_id, o.kind, ard.lens, ard.doc_type, ard.audience,
       ard.title, ard.content_md, ard.status, ard.version, ard.extends_doc_id
FROM public.agent_reference_docs ard
JOIN public.offerings o ON o.id = ard.offering_id
WHERE ard.status = 'active';
```

**STOP GATE 1**: Show Chris the migration. Do NOT apply. Wait for "apply it."

---

## STEP 2 — Apply the migration

```
1. Verify the columns don't already exist (information_schema.columns for agent_reference_docs).
2. apply_migration(name='0001_dossier_columns', query=<the SQL above>).
3. Re-read agent_reference_docs schema; confirm lens + extends_doc_id (+ body_area_id) present.
```

**STOP GATE 2**: Report columns added. Do not populate until Chris confirms.

---

## STEP 3 — Populate ONE dossier (calibration)

Do NOT batch. Compile + insert exactly ONE dossier (neurotoxins category) so Chris inspects shape first. Run the Dossier Compiler master prompt (DOSSIER_COMPILE_PIPELINE.md §0) for entity_class=category, entity_key=neurotoxins.

Insert pattern (one transaction via execute_sql):
```sql
-- resolve category id
-- SELECT id FROM categories WHERE lower(name) LIKE '%neurotoxin%';  -> :cat_id

-- clinical_summary row
INSERT INTO agent_reference_docs
  (category_id, lens, doc_type, audience, title, content_md, status, version)
VALUES (:cat_id, 'clinical','clinical_summary','provider','Neurotoxins — Clinical Summary',
        :content_md_clinical, 'draft', 1);

-- sales_education + deep_product rows similarly...

-- provenance for each asserted claim (offering_id null for a category; attach to category via
-- a claim referencing member offerings, or record category-level evidence with field_name)
INSERT INTO evidence_links
  (offering_id, field_name, source, pmid, chunk_id, snippet, authority_rank)
VALUES (:a_member_offering, 'class_safety','pubmed', :pmid, :chunk_id, :snippet, 2);

-- compiled packet
INSERT INTO agent_fuel_documents (category_id, fuel_type, content, status, version)
VALUES (:cat_id, 'category_fuel', :packet_jsonb, 'draft', 1);
```

**Validation queries (report results to Chris):**
```sql
-- Every clinical doc has backing evidence? (heuristic: evidence exists for the entity)
SELECT ard.id, ard.lens, ard.doc_type,
       (SELECT count(*) FROM evidence_links el
         WHERE el.offering_id = ANY (
           SELECT offering_id FROM item_categories WHERE category_id = ard.category_id)) AS ev_count
FROM agent_reference_docs ard
WHERE ard.category_id = :cat_id AND ard.lens='clinical';
-- clinical docs with ev_count = 0 => FAIL.

-- No personal names leaked?
SELECT id, lens, doc_type FROM agent_reference_docs
WHERE content_md ~ '\m(Dr\.?|Doctor)\s+[A-Z][a-z]+'
  AND (category_id = :cat_id);
-- expect zero rows.

-- Safety claims only on authority_rank <= 4?
SELECT field_name, source, authority_rank FROM evidence_links
WHERE authority_rank > 4 AND field_name ILIKE '%safety%'
  AND offering_id = ANY (SELECT offering_id FROM item_categories WHERE category_id = :cat_id);
-- expect zero rows.
```

**STOP GATE 3**: Present the inserted dossier + the three validation results. Chris reviews actual prose + checks. Do not compile more until approved.

---

## STEP 4 — Batch population (only after calibration approved)

Compile in dependency order (DOSSIER_COMPILE_PIPELINE.md §1: categories -> products -> concerns ->
anatomy -> clinical-planning -> commercial -> relationships/fuel).

Rules:
- One dossier = one transaction. Never wrap multiple dossiers together.
- Resumable via compile_manifest.json; idempotent: before insert, check
  `SELECT id FROM agent_reference_docs WHERE COALESCE(offering_id,category_id,concern_id)=? AND lens=? AND doc_type=? AND version=?`.
- Run the three validation queries after every insert; log failures, never auto-approve.
- All inserts land status='draft'. Nothing reaches 'active' from Claude Code.
- Categories first, then PAUSE for review before products (inheritance via extends_doc_id).
- After categories approved, set product extends_doc_id:
```sql
UPDATE agent_reference_docs child
SET extends_doc_id = parent.id
FROM agent_reference_docs parent
WHERE child.offering_id IN (:product_offering_ids)
  AND parent.category_id = :parent_cat_id
  AND parent.lens = child.lens
  AND parent.doc_type = child.doc_type
  AND parent.status = 'active';
```
- Use the Batch API for the compile (claim-card) step; DB inserts serial/cheap.

---

## STEP 5 — Relationships & global tables

Populate `item_relationships` for the demo pairings (one row per pair; offering_a_id/offering_b_id,
relationship_type, clinical_rationale, timing_guidance, same_session_ok, patient_education_text,
staff_talking_points, source_reference). Optionally add a `pairing_fuel` agent_fuel_documents row
linked via item_relationship_id.

Populate `global_item_incompatibilities`, `global_alternatives`, `global_avoidance_guidance` from the
clinical evidence (incompatibility_type/similarity_type/avoidance_type + reason + source).

Validate: every item_relationships row has clinical_rationale and a source_reference before approval.

---

## STEP 6 — Approval path (no Claude Code writes to 'active')

Approval happens via a human-reviewed UI reading `WHERE status='draft'`. On approval: flip status to
'active', set approved_by/approved_at, flip the matching agent_fuel_documents to 'active'. If Chris
explicitly asks Claude Code to approve a specific reviewed dossier, that is a single named-row UPDATE —
never a bulk `UPDATE ... SET status='active'`.

---

## STEP 7 — RLS (separate, deliberate; only when Chris says so)

All 27 tables have RLS DISABLED — anyone with the anon key can read/write every row. Fine for an
internal prototype today; must be fixed before any external/data-room exposure. DO NOT blanket-enable
(enabling without policies blocks the app). When Chris is ready, apply policy-aware RLS, e.g. per table:
```sql
ALTER TABLE public.agent_reference_docs ENABLE ROW LEVEL SECURITY;
-- service role full access (server/agents use service key):
CREATE POLICY svc_all ON public.agent_reference_docs FOR ALL TO service_role USING (true) WITH CHECK (true);
-- authenticated read of active global content only:
CREATE POLICY read_active ON public.agent_reference_docs FOR SELECT TO authenticated
  USING (status = 'active' AND practice_id IS NULL);
-- (repeat the shape per table; practice-scoped tables add practice_id = auth practice check)
```
Present the full policy set to Chris before applying. Ref:
https://supabase.com/docs/guides/database/postgres/row-level-security

---

## Hard Rules for Claude Code (restate every session)

1. **`aejskvmpembryunnbgrk` only.** Not the v1 GL project, not the CMS project. Corpora are READ from
   CMS during compile; dossier prose/provenance/packets are WRITTEN to aejskvmpembryunnbgrk.
2. **Additive only.** Add columns + populate. No new gl_dossier_* tables. No alter/drop of existing columns.
3. **Every DDL via apply_migration** (named, tracked — history starts now). No dashboard edits.
4. **One dossier per transaction.** Idempotent check-before-insert. Resumable via manifest.
5. **Nothing reaches 'active' from Claude Code** except an explicit, single-row, Chris-named update.
6. **Run validation after every insert**: clinical doc with zero backing evidence_links, a leaked
   name, or a safety claim on authority_rank > 4 is a FAIL — log it, don't approve.
7. **STOP at every gate.** Calibrate on one dossier before batch. Pause after categories before products.
8. **No PHI in these tables.** Global-library content only; never copy transcript/patient data into a dossier.
9. **RLS is untouched** until Chris explicitly requests the policy-aware migration.
10. Post a short status to Slack #a360-status after meaningful work (hub convention).
