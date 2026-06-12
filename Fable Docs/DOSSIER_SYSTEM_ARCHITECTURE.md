# A360 Knowledge Dossier System — Architecture & Schema (v2, real schema)

Compiles the corpora (podcasts, YouTube, PubMed) + structured taxonomy + clinical PDFs into curated, agent-loadable intelligence. **This version targets the live database `aejskvmpembryunnbgrk` and uses the tables that already exist** — it does NOT create a parallel `gl_dossier_*` structure. The redesign already contains native homes for the dossier system; this spec is a population strategy, not a new schema.

Companion: `DOSSIER_COMPILE_PIPELINE.md` · `DOSSIER_TEMPLATES.md` · `CLAUDE_CODE_DB_MIGRATION_INSTRUCTIONS.md`.

---

## 1. The Big Correction — Dossiers map to existing tables

| Dossier concept (v1 spec) | v1 invented table | **Real table that already does this** |
|---|---|---|
| Dossier narrative content (the 3-lens prose an agent loads) | `gl_dossier_sections` | **`agent_reference_docs`** (`content_md`, `doc_type`, `audience`, `status`, attaches to offering/category/concern) |
| Provenance manifest (graded source backing) | `gl_dossier_provenance` | **`evidence_links`** (`source`, `pmid`, `doi`, `chunk_id`, `authority_rank`, `snippet`, `verified_by`) — already populated (42 rows) |
| Compact agent packet (one-per-product/pairing) | (the "fuel" idea) | **`agent_fuel_documents`** (`fuel_type` incl `pairing_fuel`/`comparison_fuel`/`education_fuel`, jsonb `content`, `status`) |
| Pairing whitelist + clinical pairing language | `gl_fact_tables` (pairing) | **`item_relationships`** (`relationship_type`, `clinical_rationale`, `timing_guidance`, `same_session_ok`, `patient_education_text`, `staff_talking_points`) |
| Incompatibilities / alternatives / avoidance | `gl_fact_tables` | **`global_item_incompatibilities`**, **`global_alternatives`**, **`global_avoidance_guidance`** (all empty, scaffolded) |
| Hard comparison / dosing tables | `gl_fact_tables` | structured columns on `products`/`services` + `agent_fuel_documents` (comparison_fuel) |

**So the dossier system is: populate `agent_reference_docs` (the narrative), back every claim with `evidence_links` (the provenance), compile compact `agent_fuel_documents` (the runtime packet), and fill `item_relationships` + the `global_*` tables (the relationship facts).** Almost nothing new gets created.

---

## 2. Two small additive changes (the only schema edits)

Everything else exists. Two columns are needed; both are additive, nullable, non-breaking.

```sql
-- (A) The lens axis. audience (patient/provider/staff/public) and doc_type
--     (deep_dive_playbook/clinical_summary/...) are already orthogonal and in use.
--     The clinical / sales_education / deep_product split is a THIRD axis. One enum column.
CREATE TYPE knowledge_lens AS ENUM ('clinical', 'sales_education', 'deep_product');
ALTER TABLE public.agent_reference_docs
  ADD COLUMN IF NOT EXISTS lens knowledge_lens;

-- (B) Category->product inheritance link (Botox dossier "extends" Neurotoxins dossier).
ALTER TABLE public.agent_reference_docs
  ADD COLUMN IF NOT EXISTS extends_doc_id uuid REFERENCES public.agent_reference_docs(id);
```

That's the entire core migration. No new tables for the dossier system. (One optional anatomy column + one optional view below.)

---

## 3. How a dossier is represented (concretely)

A "Botox dossier" is **not one row** — it's a set of `agent_reference_docs` rows for the same `offering_id`, one per (lens x doc_type) the templates define, plus the `evidence_links` that back them, plus a compiled `agent_fuel_documents` packet for fast runtime load.

Example — the Botox dossier becomes:

```
agent_reference_docs rows (offering_id = botox):
  lens=clinical,        doc_type=clinical_summary,    audience=provider  content_md="...mechanism, candidacy, safety..."
  lens=clinical,        doc_type=technique_guide,     audience=provider  content_md="...injection planes, dosing zones..."
  lens=sales_education, doc_type=patient_education,    audience=patient   content_md="...what to expect, cost<->benefit..."
  lens=sales_education, doc_type=faq,                  audience=patient   content_md="...objection reframes..."
  lens=deep_product,    doc_type=deep_dive_playbook,   audience=provider  content_md="...differentiation, evidence..."
  extends_doc_id -> the Neurotoxins category clinical_summary (inheritance)

evidence_links rows (offering_id = botox):
  field_name="onset_time"  source=fda_label  authority_rank=1  snippet="..."  -> backs the clinical claims
  field_name="safety"      source=pubmed     pmid=...  authority_rank=2
  ... (provenance for every asserted claim)

agent_fuel_documents row (offering_id = botox):
  fuel_type=product_fuel  content={compact JSON packet distilled from the above}  status=active
```

The **`agent_reference_docs`** rows are the human-readable, reviewable dossier (what you edit and approve). The **`agent_fuel_documents`** packet is the compiled, compact thing agents actually load at runtime (your GL Enrichment doc's "one packet, not 30 fields" principle). The **`evidence_links`** are the audit/upgrade layer — never loaded at runtime, but they let any dossier claim be traced or upgraded to a live citation.

---

## 4. The Three Lenses -> `lens` + `audience`

| Lens (`lens` col) | Typical `audience` | Typical `doc_type` | Loaded by |
|---|---|---|---|
| `clinical` | provider | clinical_summary, technique_guide, protocol | SalesCoach, TCP chain, voice card, planning agents |
| `sales_education` | patient (some staff) | patient_education, faq, category_overview | Reach, email copy, consult prep, objection handling |
| `deep_product` | provider | deep_dive_playbook | evidence chat, comparisons, product specialist |

The cost<->benefit value-education content lives in `lens=sales_education, doc_type=patient_education` — a first-class section per the templates, framing (never prices; prices come from `agent_pricing` at runtime).

---

## 5. Provenance via `evidence_links` (the citation answer, now native)

Dossiers carry provenance, not inline citations — and `evidence_links` already IS the provenance table. Every asserted claim in an `agent_reference_docs` body gets one or more `evidence_links` rows for that `offering_id`, graded by `authority_rank` and tagged with `source` (fda_label/pubmed/youtube/podcast/ifu/llm_inference) + `pmid`/`doi`/`chunk_id`/`snippet`.

Authority mapping (use the existing `authority_rank` smallint; lower = higher authority):
```
1 = fda_label / ifu        (regulatory primary)
2 = pubmed (peer_reviewed)
3 = manufacturer            (official manufacturer content)
4 = textbook                (the uploaded clinical manuals)
5 = clinical_consensus
6 = podcast / youtube       (field_practice — color & framing only, never safety)
```
Rule unchanged: a **clinical-lens safety claim may only rest on `authority_rank <= 4`** (never podcast/youtube alone). Compile validation enforces this against `evidence_links.source` + `authority_rank`.

Because `evidence_links.chunk_id` points at the CMS vector chunk, a dossier claim can be **upgraded to a live citation** by the RAG layer on demand — distilled belief (the dossier) and citable evidence (the corpus) are the same well. No inline citations needed in `content_md`.

---

## 6. Optional convenience view (read-only, no risk)

```sql
CREATE OR REPLACE VIEW v_offering_dossier AS
SELECT ard.offering_id, o.kind, ard.lens, ard.doc_type, ard.audience,
       ard.title, ard.content_md, ard.status, ard.version, ard.extends_doc_id
FROM agent_reference_docs ard
JOIN offerings o ON o.id = ard.offering_id
WHERE ard.status = 'active';
```
Agents/UI can `SELECT ... WHERE offering_id = ? AND lens = ?`. Purely additive; create only if useful.

---

## 7. Entity coverage maps onto existing entity tables

| Dossier entity class | Attaches via | Source rows |
|---|---|---|
| Product (Botox, Voluma) | `agent_reference_docs.offering_id` -> products(33) | the product offerings |
| Category (Neurotoxins, HA Fillers) | `agent_reference_docs.category_id` -> categories(17) | the category rows |
| Concern (volume loss, laxity) | `agent_reference_docs.concern_id` -> concerns(39) | the concern rows |
| Anatomy (midface, jawline) | optional `body_area_id` col, or global doc | body_areas(64) |
| Clinical-planning (proportion, aging face) | standalone docs (offering/category/concern null) | n/a |
| Commercial (memberships, packages) | standalone docs | n/a |

`agent_reference_docs` has `offering_id`, `category_id`, `concern_id` but NOT `body_area_id`. For first-class anatomy attachment, optional additive column:
```sql
ALTER TABLE public.agent_reference_docs
  ADD COLUMN IF NOT EXISTS body_area_id uuid REFERENCES public.body_areas(id);
```
Recommended for symmetry; flagged optional in the migration.

---

## 8. Consumption rule (load dossier vs. search vectors)

| Situation | Use |
|---|---|
| Named, known entity surfaced in conversation | **Load the `agent_fuel_documents` packet** (compact) or the `agent_reference_docs` lens (full) by `offering_id`/`category_id` |
| Comparison/relationship between known entities | **Query `item_relationships` / `global_alternatives` / `global_item_incompatibilities`** |
| Open or novel practitioner question | **RAG** over CMS vectors with citations |
| Covered entity but deeper than the dossier | Dossier first, RAG to extend, cite the new chunks |
| Anything safety (contraindications, do-not-claim) | Dossier `clinical` lens + `compliance_rules` + `global_avoidance_guidance` — never RAG alone |

One-liner: *Load the dossier when the entity is named and known; search the corpus when the question is open or exceeds the dossier; never let safety content come from search alone.*

---

## 9. Agent-pack wiring (corrected)

- `tier_builder`, `pairing_advisor`, voice `recommendation_card` -> load `agent_fuel_documents` packets (`product_fuel`/`pairing_fuel`) instead of assembling raw fields.
- `pairing_advisor` whitelist -> `item_relationships` rows (approved pairings) + their `agent_fuel_documents` (pairing_fuel). Absence = rejection.
- compliance gates -> `compliance_rules` + `global_avoidance_guidance` + the clinical lens.
- evidence chat (M6) -> RAG over CMS, can upgrade a dossier claim via `evidence_links.chunk_id`.
- Coverage sprint and dossier compile are the same job: fill `agent_reference_docs` + `evidence_links` + `item_relationships` + `agent_fuel_documents` + `global_*` for the 20 demo offerings.

---

## 10. Security flag (address before external exposure)

All 27 tables have **RLS disabled** — anyone with the anon key can read/write every row. Acceptable for a fresh internal prototype; NOT acceptable before a Boulevard data-room link or any public surface. Do not blanket-enable (locks out the app). Policy-aware RLS is a separate deliberate step — see the migration instructions. Ref: https://supabase.com/docs/guides/database/postgres/row-level-security
