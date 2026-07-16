# Phase 4: source-ingestion — Research

**Researched:** 2026-06-13
**Domain:** Source registry triage, rights classification, bulk ingestion into CMS vector corpus
**Confidence:** HIGH (schema fully inspected, SQL compile files read, canonical addendum docs read)

---

## Summary

Phase 2 (dossier-batch) instructed Claude Code to log every reputable source encountered during the 20-product compile into `source_registry` (status='review') and queue ingestible-looking sources in `ingestion_queue` (status='queued') — but explicitly deferred all actual ingestion. Phase 4 returns to that map: triage every 'review' row, adjudicate rights, promote worthy sources to 'active', and run the ingestible subset through the CMS ingestion pipeline into the vector corpus.

The schema is already fully deployed. Three tables exist in `aejskvmpembryunnbgrk`: `source_registry` (with the `ingestible` generated column as the rights gate), `ingestion_queue`, and `research_log`. The seed state is 13 rows added at migration time (via OVERNIGHT_REPORT_PASS2.md) plus rows added by each compile SQL file (02-02, 02-03, 02-04, 02-05). The exact live count is unknown until queried, but the compile SQL files account for approximately 50-70 source_registry entries and 15-25 ingestion_queue entries.

The "existing ingestion pipeline" referenced in the roadmap is NOT code in this repository — it refers to the external CMS Supabase pipeline (podcasts/YouTube/PubMed vectors) that lives outside a360-v2. The Phase 4 plan must either invoke that external pipeline or identify the practical substitute. For FDA labels and 510k PDFs specifically, the existing pattern in Phase 1 was: download PDF to Supabase Storage, set `url` in `evidence_links` — this is the concrete ingestion mechanism available within a360-v2 scope.

**Primary recommendation:** Triage source_registry by querying live DB, promote public_domain and confirmed open_access_cc_by sources to 'active', ingest FDA/510k PDFs to Supabase Storage + create evidence_links rows, and leave paywalled journal ingestion as deferred (cite-only pattern already works).

---

## Project Constraints (from CLAUDE.md)

- No PHI in code, comments, fixtures, or examples
- Tenant isolation on all queries
- No `SUPABASE_*` keys — use `GL_SUPABASE_*` (Supabase project `aejskvmpembryunnbgrk`)
- `ingestible` is a **generated column** — never include it in INSERT column lists (enforced in Phase 2 compile SQL — the key known pitfall)
- `source_registry` has no unique constraint on `name`; Phase 2 SQL uses `WHERE NOT EXISTS` deduplication pattern
- All writes land as draft/pending; nothing reaches 'active' from Claude Code without explicit promotion
- DB: Aurora PostgreSQL (Agent Manager Supabase) + CMS Supabase (vectors live there, not here)

---

## Current State of source_registry (from Phase 2 compile SQL)

### Seed rows (13, added_by='seed', status='active' — from migration 0003_source_registry)

| name | authority_rank | rights_class | ingestible |
|------|---------------|--------------|------------|
| FDA device/drug labels | 1 | public_domain | YES |
| DailyMed (NIH/NLM) | 1 | public_domain | YES |
| PMC open-access subset | 2 | open_access_cc_by | YES (per-article) |
| Aesthetic Surgery Journal Open Forum | 2 | open_access_cc_by | YES |
| PRS Global Open | 2 | open_access_cc_by | YES |
| JPRAS Open | 2 | open_access_cc_by | YES |
| Aesthetic Plastic Surgery | 2 | unknown | NO (per-article verify) |
| Journal of Cosmetic and Laser Therapy | 2 | unknown | NO |
| Dermatologic Surgery | 4 | paywalled | NO (cite-only) |
| JAAD | 4 | paywalled | NO (cite-only) |
| Lasers in Surgery and Medicine | 4 | paywalled | NO (cite-only) |
| Facial Plastic Surgery & Aesthetic Medicine | 4 | paywalled | NO (cite-only) |
| AAD/BAD/EADV Clinical Guidelines | 4 | society_guideline | NO (cite-only) |

### Discovery-added rows from Phase 2 compile SQL (all status='review', added_by='discovery')

These were inserted by 02-02, 02-03, 02-04, and 02-05 source-registry SQL files. Approximate count: 40-55 rows. Key ingestible subset:

**FDA regulatory (public_domain — all ingestible):**
- Juvederm Voluma XC Prescribing Information (NDA 125474)
- Juvederm Vollure XC Prescribing Information (NDA 125474/S-016)
- Skinvive by Juvederm FDA 510k K220481 (2023)
- Restylane Lyft FDA PMA P020023
- RHA Redensity FDA 510k K183782 (2020)
- Kybella FDA Label NDA 206333
- Sculptra Aesthetic FDA Label NDA 021195
- Sofwave Medical 510k K201789
- InMode 510k K192271 (Morpheus8)
- Ultherapy 510k K101445 (Merz)
- Lutronic Hollywood Spectra 510k K133029
- FDA Medical Device Safety Communication — Cryolipolysis PAH
- CoolSculpting Elite 510k Clearance Documentation

**Open access CC-BY (ingestible):**
- Journal of Clinical and Aesthetic Dermatology (JCAD) — open_access_cc_by
- Journal of Drugs in Dermatology (JDD) — open_access_cc_by (via 02-03)
- Clinical, Cosmetic and Investigational Dermatology (Dove) — open_access_cc_by
- Journal of Cutaneous and Aesthetic Surgery (Medknow) — open_access_cc_by
- Cureus — open_access_cc_by

**CC-BY-NC (NOT ingestible — commercial product restriction):**
- Dermatology and Therapy (Springer Adis)
- Saudi Pharmaceutical Journal

**Paywalled (NOT ingestible — cite-only):**
- Journal of Cosmetic Dermatology (Wiley)
- Annals of Plastic Surgery
- JAMA Dermatology
- Journal of the European Academy of Dermatology and Venereology (JEADV)
- Plastic and Reconstructive Surgery (PRS)
- Archives of Facial Plastic Surgery
- HIV Medicine
- Lasers in Surgery and Medicine (also in 02-05)
- Journal of Cosmetic and Laser Therapy
- Dermatologic Surgery (multiple variant names across compile batches)

---

## Rights Classification System

### The `ingestible` Generated Column (schema-enforced)

```sql
-- From SOURCE_REGISTRY_AND_DISCOVERY.md
ingestible BOOLEAN GENERATED ALWAYS AS (
  rights_class IN ('public_domain','open_access_cc_by','manufacturer_permitted')
) STORED
```

This is the gate. The three ingestible classes:

| rights_class | Rule | Example |
|---|---|---|
| public_domain | US government works, FDA publications | All FDA labels, 510k docs, DailyMed |
| open_access_cc_by | CC-BY license, free commercial reuse | JCAD, Cureus, PRS Global Open, JPRAS Open |
| manufacturer_permitted | Explicit permission/terms with manufacturer | None currently in registry |

**NOT ingestible (cite-only):**
- `open_access_cc_by_nc` — CC-BY-NC, commercial restriction applies to A360 as a commercial product
- `society_guideline` — free-to-read but copyrighted
- `paywalled` — subscription journals
- `unknown` — unclassified, must be adjudicated before ingestion

### Key rights adjudication facts (HIGH confidence, from SOURCE_REGISTRY_AND_DISCOVERY.md)

- FDA publications are CC0 / public domain — ingest freely, no restrictions
- CC-BY-NC journals (Dermatology and Therapy, Saudi Pharma) **cannot be ingested** into A360 because A360 is a commercial product; they are cite-only
- PMC Open Access Subset: per-article license must be verified (some CC-BY, some CC-BY-NC, some CC-BY-NC-ND) — cannot ingest the entire PMC; must filter by article license
- Journals marked 'unknown' need per-article verification before queuing

---

## Architecture: What "CMS Vector Corpus" Means

### Two Supabase Projects

A360 runs two distinct Supabase projects:

| Project | Purpose | Tables |
|---|---|---|
| `aejskvmpembryunnbgrk` (Agent Manager) | Structured taxonomy, dossiers, evidence metadata | `source_registry`, `ingestion_queue`, `agent_reference_docs`, `evidence_links`, `products`, `categories`, etc. |
| CMS Supabase (separate project) | Vector search corpus | `pubmed_articles_vectorized`, `manufacturer_youtube_transcript`, `podcast_chunks`, `industry_article_chunks` |

### The "existing ingestion pipeline"

The GL_GSD_ROADMAP.md and BATCH_SOURCE_LOGGING_ADDENDUM.md say "run through the existing ingestion pipeline into the CMS vectors." This pipeline is external to a360-v2. It is the system that populated:
- 23K PubMed articles (37K chunks) in `pubmed_articles_vectorized`
- 3,894 YouTube manufacturer videos (202K chunks) in `manufacturer_youtube_transcript`
- 8,688 podcast episodes (202K chunks) in `podcast_chunks`
- 88K industry article chunks in `industry_article_chunks`

This pipeline is referenced in `lib/supabase.ts` (via CMS Supabase client) and `agent_tools` seed data (tools like `search_pubmed`, `search_industry`) but the pipeline **code itself does not live in a360-v2**.

### What IS achievable within a360-v2 scope

Phase 1 established the concrete ingestion pattern for FDA labels:
1. Download PDF from accessdata.fda.gov URL
2. Upload to Supabase Storage (Agent Manager project) — path: `fda/{filename}.pdf`
3. Insert `evidence_links` row with `url` pointing to the Storage URL and `page_number` populated
4. Mark `ingestion_queue` row as `status='ingested'`

This pattern is what "ingest into corpus" means in practice for the documents queued in `ingestion_queue`. The vector chunk embedding step (CMS Supabase) is out of scope for this phase unless the CMS pipeline can be invoked — **this must be clarified in planning**.

**Confidence level on CMS pipeline invocability: LOW** — no code or API endpoint for it is visible in a360-v2.

---

## ingestion_queue Table Schema

From `SOURCE_REGISTRY_AND_DISCOVERY.md`:

```sql
CREATE TABLE public.ingestion_queue (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id       uuid REFERENCES public.source_registry(id),
  url             text NOT NULL,
  doi             text,
  title           text,
  rights_class    source_rights NOT NULL,     -- snapshot at queue time
  discovered_during text,                      -- which dossier compile surfaced it
  status          text DEFAULT 'queued' CHECK (status IN ('queued','approved','ingested','rejected')),
  queued_at       timestamptz DEFAULT now()
);
```

**Note:** The 02-04-source-registry.sql used slightly different column names (`source_registry_name`, `source_url`, `priority`). The actual live schema may differ from this spec — the live table must be inspected before writing INSERT statements.

**Note:** The 02-05-source-registry.sql used `source_registry_id` instead of `source_id`. Column naming inconsistency across the compile SQL files means the actual schema must be read from `information_schema` before any writes.

---

## Known Schema Pitfalls

### Pitfall 1: `ingestible` is a generated column
**What goes wrong:** INSERT fails with "column ingestible is not updatable"
**Prevention:** Never include `ingestible` in INSERT column lists. This was burned once in Phase 2 and documented in STATE.md: `source_registry.ingestible is a generated column — never include in INSERT column lists`.

### Pitfall 2: No unique constraint on `source_registry.name`
**What goes wrong:** Duplicate rows inserted across compile batches
**Prevention:** Use `WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = ...)` pattern (established in 02-03, 02-05 SQL). Do NOT use `ON CONFLICT DO NOTHING` without a constraint — it silently fails to check.

### Pitfall 3: `ingestion_queue` column name inconsistency
**What goes wrong:** Phase 2 SQL files used different column names — `source_id` vs `source_registry_id`, `url` vs `source_url`, no `priority` vs with `priority`
**Prevention:** Read `information_schema.columns` for `ingestion_queue` before writing any INSERT. The live schema is the authority; the design doc is aspirational.

### Pitfall 4: CC-BY-NC is NOT ingestible
**What goes wrong:** Dermatology and Therapy (major open-access journal) appears "open access" but is CC-BY-NC. A360 is commercial — NC restriction applies. Ingesting it would be a rights violation.
**Prevention:** rights_class = 'open_access_cc_by_nc' must map to ingestible=false. The generated column handles this correctly once rights_class is set accurately.

### Pitfall 5: Duplicate source_registry rows across compile batches
**What goes wrong:** Multiple compile batches (02-02, 02-03, 02-04, 02-05) each inserted source_registry rows. Without a unique constraint, some journal names appear multiple times with slightly different data (e.g., "Dermatologic Surgery" appears in both 02-04 and 02-05, "Plastic and Reconstructive Surgery" appears in both 02-02 and 02-03 with different name variants).
**Prevention:** Phase 4 Wave 0 must query for duplicates and deduplicate before proceeding.

### Pitfall 6: FDA PDF URLs may be stale
**What goes wrong:** FDA prescribing information PDFs at `accessdata.fda.gov` are updated when new supplements are approved. A URL like `125474s012lbl.pdf` captures a specific supplement version. Newer supplement may exist.
**Prevention:** Verify each FDA URL is still live before ingesting. Use the NDA search to confirm the latest supplement.

---

## Ingestion Priority Order

Per `BATCH_SOURCE_LOGGING_ADDENDUM.md` and `AESTHETIC_DERMATOLOGY_JOURNAL_REGISTRY.md`:

### Tier 1: Immediate — Public Domain FDA Documents
All are rights-clear, directly relevant to demo products, small file count, known URLs:
1. FDA labels for Juvederm Voluma XC, Vollure XC, Skinvive 510k
2. Restylane Lyft PMA, RHA Redensity 510k
3. Kybella FDA Label NDA 206333
4. Sculptra Aesthetic FDA Label NDA 021195
5. Morpheus8 510k K192271, Sofwave 510k K201789, Ultherapy 510k K101445, Hollywood Spectra 510k K133029
6. FDA Safety Communication: PAH/Cryolipolysis

### Tier 2: High Value — Open Access CC-BY Journals
These require per-article ingestion (not whole-journal), from specific articles already queued:
1. JCAD articles (confirmed CC-BY via PMC)
2. JDD articles (OA via JDD Online and PMC — per 02-03 SQL)
3. Cureus articles
4. Clinical, Cosmetic and Investigational Dermatology (Dove Press)
5. Journal of Cutaneous and Aesthetic Surgery (Medknow)
6. ASJ Open Forum articles (already seed row, status='active')

### Tier 3: Adjudication Required — `unknown` rights_class
These need per-article license check before any ingestion:
1. Aesthetic Plastic Surgery (hybrid — some CC-BY, some paywalled)
2. Journal of Cosmetic and Laser Therapy (hybrid)
3. Regular Aesthetic Surgery Journal (distinct from Open Forum)

### NOT for ingestion (cite-only, document in rejection reason):
- All `paywalled` rows: JAMA Dermatology, J Cosm Derm, PRS, Ann Plast Surg, Derm Surg, JEADV, etc.
- All `open_access_cc_by_nc` rows: Dermatology and Therapy, Saudi Pharma Journal
- All `society_guideline` rows: AAD/BAD/EADV Clinical Guidelines

---

## What Phase 4 Plans Must Cover

Based on the ROADMAP.md success criteria and the research above, Phase 4 needs these functional work units:

### 1. Source Registry Triage
- Query live `source_registry WHERE status='review'` — get the actual count and list
- Deduplicate any name-collision rows
- For each 'review' row: adjudicate rights_class (confirm or correct the best-guess), promote to 'active' or 'retired'

### 2. Ingestion Queue Preparation
- Query live `ingestion_queue WHERE status='queued'`
- Verify column schema via `information_schema`
- Approve rows that pass the ingestible gate

### 3. FDA/Regulatory Document Ingestion
- For each public_domain queued item: download PDF, upload to Supabase Storage, create/update evidence_links, mark ingestion_queue as 'ingested'
- Verify URLs are still live before download

### 4. OA Journal Article Ingestion
- For each CC-BY queued item: fetch article (PMC API or direct URL), process, store
- Mark ingestion_queue as 'ingested'

### 5. Rejection Pass
- For each paywalled / CC-BY-NC row in ingestion_queue: update status='rejected' with reason
- Document rejection reason on each row

### 6. Corpus Verification
- After ingestion: verify ingested sources are searchable / findable
- Run test query to confirm next compile would find them

---

## What the Planner Must Decide (Open Questions)

### Q1: What does "ingested into CMS vector corpus" actually mean for Phase 4?
**What we know:** The external CMS Supabase pipeline (23K PubMed, 202K YouTube chunks, etc.) is the vector search layer. Phase 2 used it read-only.
**What's unclear:** Whether Phase 4 can write to CMS Supabase (embed new docs, create new chunk rows) or whether "ingestion" means Supabase Storage upload + evidence_links only.
**Recommendation:** Clarify with Chris. If CMS writes are in scope, a separate research pass is needed. If storage + evidence_links is the scope, that's fully plannable from existing code.

### Q2: How many live rows are actually in source_registry and ingestion_queue?
**What we know:** SQL files were written; it's unclear which were actually executed against the live DB.
**What's unclear:** Whether all five compile SQL files (02-02 through 02-05 source-registry files) were run, and whether the earlier migrated seed rows (0003_source_registry) are present.
**Recommendation:** Wave 0 of planning MUST query the live DB as the first task. Don't assume the SQL files were executed.

### Q3: Are the FDA PDF URLs in ingestion_queue still valid?
**What we know:** URLs were set at compile time (2026-06-12). FDA Access Data URLs are generally stable.
**What's unclear:** Whether any FDA labels have been updated since (new supplement versions).
**Recommendation:** HTTP HEAD check on each URL in Wave 0 before attempting download.

---

## Standard Stack for This Phase

| Component | Tool | Notes |
|---|---|---|
| DB reads/writes | Supabase MCP (`mcp__supabase__*`) | Already established pattern for all phases |
| File storage | Supabase Storage (Agent Manager project) | FDA PDFs; pattern from Phase 1 |
| Schema inspection | `information_schema.columns` via Supabase | Required before writes (pitfall 3) |
| FDA PDF fetch | Direct HTTP GET to accessdata.fda.gov | Public domain, no auth |
| PMC article fetch | NCBI E-utilities API (`eutils.ncbi.nlm.nih.gov/entrez/eutils/`) | Free, no key required for low-volume |
| Rights verification | Per-article PMC license check | Filter by `article-type` and `license` in PMC XML |

---

## Code Examples

### Query source_registry review rows
```sql
-- Confidence: HIGH — matches the schema from SOURCE_REGISTRY_AND_DISCOVERY.md
SELECT id, name, publisher, source_kind, authority_rank, rights_class, ingestible, status, added_by
FROM source_registry
WHERE status = 'review'
ORDER BY authority_rank ASC, name ASC;
```

### Query ingestion_queue queued items
```sql
-- Note: column names must be verified via information_schema first
SELECT iq.*, sr.name as source_name, sr.rights_class, sr.ingestible
FROM ingestion_queue iq
LEFT JOIN source_registry sr ON sr.id = iq.source_id   -- or source_registry_id
WHERE iq.status = 'queued'
ORDER BY sr.authority_rank ASC;
```

### Detect duplicate source_registry names
```sql
SELECT name, COUNT(*) as n
FROM source_registry
GROUP BY name
HAVING COUNT(*) > 1
ORDER BY n DESC;
```

### Verify ingestion_queue column schema
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'ingestion_queue'
ORDER BY ordinal_position;
```

### Promote source to active after rights verification
```sql
-- Update rights_class if it was 'unknown' and is now confirmed, then promote
UPDATE source_registry
SET rights_class = 'open_access_cc_by',  -- or whatever confirmed class
    status = 'active'
WHERE id = '<uuid>'
  AND status = 'review';
-- Note: ingestible updates automatically (generated column)
```

### Reject ingestion_queue item
```sql
UPDATE ingestion_queue
SET status = 'rejected',
    notes = 'Journal is paywalled — commercial subscription required; cite-only per rights gate'
WHERE id = '<uuid>';
```

---

## Environment Availability

| Dependency | Required By | Available | Notes |
|---|---|---|---|
| Supabase MCP | All DB operations | YES | Used in all prior phases |
| `aejskvmpembryunnbgrk` (Agent Manager) | source_registry, ingestion_queue | YES | Live DB, confirmed in all Phase 2+3 plans |
| Supabase Storage | FDA PDF upload | YES | Used in Phase 1 for FDA label PDFs |
| accessdata.fda.gov | FDA label download | YES (public) | Public domain, no auth |
| CMS Supabase vector DB | Corpus write (if in scope) | UNKNOWN | Not verified — see Open Question Q1 |
| NCBI E-utilities API | PMC article fetch | YES (public) | Rate limit: 3 req/sec without API key, 10/sec with key |

---

## Sources

### Primary (HIGH confidence)
- `.planning/phases/02-dossier-batch/BATCH_SOURCE_LOGGING_ADDENDUM.md` — the authoritative spec for source logging during Phase 2; defines Phase 4 setup
- `.planning/phases/02-dossier-batch/AESTHETIC_DERMATOLOGY_JOURNAL_REGISTRY.md` — journal authority rankings and rights classification
- `Fable Docs/Ingestion Pipeline/SOURCE_REGISTRY_AND_DISCOVERY.md` — schema definitions for source_registry, ingestion_queue, research_log; rights gate design
- `supabase/compile_sql/02-02-source-registry.sql` through `02-05-source-registry.sql` — actual rows inserted into source_registry and ingestion_queue during Phase 2
- `OVERNIGHT_REPORT_PASS2.md` — confirms migrations 0003-0006 were applied; 13 seed rows verified present
- `Fable Docs/_ A360 - Global Library Source Analysis.md` — comprehensive rights analysis of all source types

### Secondary (MEDIUM confidence)
- `STATE.md` — accumulated decisions including "ingestible is a generated column" pitfall
- `Fable Docs/DOSSIER_COMPILE_PIPELINE.md` — ingestion pipeline context and CMS vector project references
- `lib/retrieval/sources.ts` — confirms CMS vector tables exist and are read-only from this codebase
- `ROADMAP.md` — Phase 4 success criteria (the five must-be-true statements)

---

## Metadata

**Confidence breakdown:**
- Source registry state: HIGH — SQL files inspected directly; schema confirmed from multiple sources
- Rights classification rules: HIGH — SOURCE_REGISTRY_AND_DISCOVERY.md is the canonical spec, fully read
- Ingestion pipeline scope: LOW — "existing ingestion pipeline" refers to external CMS system not visible in repo; Q1 must be resolved before planning ingestion tasks
- ingestion_queue schema: MEDIUM — spec exists but column naming inconsistency across compile SQL files means live schema must be confirmed

**Research date:** 2026-06-13
**Valid until:** 2026-07-13 (schema stable; FDA URLs stable; rights classifications stable)
