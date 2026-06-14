# Non-PubMed Journal Discovery: Triage & Ingestion Plan

**Phase:** 11 — Source Framework & v1.1 Close-Out
**Status:** Triage document — ingestion SQL is NOT executed in Phase 11
**Purpose:** Document the non-PubMed journal discovery dataset, classify it per SOURCE_CLASSIFICATION.md, and map ingestion steps to ENRICHMENT_PIPELINE.md. This is the first concrete dataset ready to flow through the enrichment pipeline.

---

## 1. Discovery Summary

Two discovery passes found 301 non-PubMed peer-reviewed journal articles relevant to A360's 18 demo products.

### Pass 1: Crossref/OpenAlex Metadata (238 records)

| Metric | Value |
|--------|-------|
| Records found | 238 |
| A/B quality candidates queued | 193 |
| Discovery surfaces | Crossref (154), OpenAlex (84) |
| New source_registry rows | 4 |

**Quality tier breakdown:**

| Tier | Records |
|------|---------|
| A | 124 |
| B | 69 |
| C | 38 |
| D | 7 |

**Journal breakdown:**

| Journal | Records |
|---------|---------|
| Aesthetic Surgery Journal Open Forum | 87 |
| Journal of Aesthetic Nursing | 60 |
| Aesthetic Plastic Surgery | 57 |
| Aesthetic Medicine | 15 |
| PRS Global Open | 7 |
| JPRAS Open | 6 |
| Journal of Clinical and Cosmetic Dermatology | 5 |
| Cosmetic Surgery and Medicine | 1 |

All open access CC-BY licensed.

### Pass 2: Direct Publisher Crawl (63 records)

| Metric | Value |
|--------|-------|
| Records found | 63 |
| A/B quality candidates queued | 33 |
| Publisher sources crawled | 3 (2 blocked: HTTP 403) |

**Quality tier breakdown:**

| Tier | Records |
|------|---------|
| A | 22 |
| B | 11 |
| C | 12 |
| D | 18 |

**Source breakdown:**

| Source | Records |
|--------|---------|
| Aesthetic Medicine | 36 |
| SKIN: The Journal of Cutaneous Medicine | 19 |
| Journal of Clinical Dermatology & Therapy | 8 |

---

## 2. Phase 12-14 Relevance

These articles map directly to upcoming fuel doc phases:

| Dossier Use Bucket | Pass 1 | Pass 2 | Total | Phase Relevance |
|--------------------|--------|--------|-------|-----------------|
| clinical_gateway_source | 136 | 26 | 162 | All phases — primary clinical evidence |
| safety_floor | 100 | 20 | 120 | All phases — contraindication/complication data |
| sales_education_support | 72 | 30 | 102 | Phase 12-13 — benefit framing, objection handling |
| structured_taxonomy_support | 76 | 13 | 89 | Phase 14 — taxonomy and classification data |
| source_only_reference | 61 | 17 | 78 | Reference-only, not direct fuel content |
| timing_maintenance | 50 | 14 | 64 | Phase 12 — treatment interval evidence |
| combination_observation | 27 | 9 | 36 | Phase 12 — directly feeds combination fuel docs |

**Key highlights:**

- **36 articles tagged `combination_observation`** — directly feeds Phase 12 combination fuel docs
- **120 tagged `safety_floor`** — contraindication/complication data for what-not-to-say guardrails
- **64 tagged `timing_maintenance`** — treatment interval evidence for timing guidance
- **162 tagged `clinical_gateway_source`** — primary clinical evidence for all fuel doc types

---

## 3. Classification per SOURCE_CLASSIFICATION.md

These are peer-reviewed journal articles from recognized aesthetics journals. They sit between PubMed (highest authority) and trade publications in authority.

| Attribute | Value |
|-----------|-------|
| Source type | Peer-reviewed journal (non-PubMed-indexed) |
| Layer | Production |
| Authoritative for | Clinical evidence, safety data, technique, comparative outcomes |
| Citation format | `[Author, Journal, Year]` with DOI |
| Can appear in evidence_links.url? | Yes (DOI URL) |
| Can appear in source_reference? | Yes (DOI citation) |
| Can appear in production prose? | Yes |

**Authority note:** Most are open-access CC-BY, making them freely citable. Aesthetic Surgery Journal Open Forum (87 records) and Aesthetic Plastic Surgery (57 records) are established journals in the field. Aesthetic Medicine is classified as industry/trade — useful for sales education and trend context, not sole clinical authority.

---

## 4. SQL Artifacts (Prepared, Not Executed)

All SQL files are at `supabase/source-discovery/`:

### Pass 1 (nonpubmed/)

| File | Purpose | Row Count |
|------|---------|-----------|
| `nonpubmed_source_registry_inserts.sql` | 4 new source_registry rows | 4 |
| `nonpubmed_ingestion_queue_inserts.sql` | A/B quality candidates for ingestion | 193 |
| `nonpubmed_quality_triage.csv` | Full triage spreadsheet for Chris review | 238 |
| `nonpubmed_discovery_results.json` | Raw discovery results | 238 |

### Pass 2 (publisher-crawl/)

| File | Purpose | Row Count |
|------|---------|-----------|
| `publisher_crawl_source_registry_inserts.sql` | Publisher source_registry rows | 3 |
| `publisher_crawl_ingestion_queue_inserts.sql` | A/B quality candidates for ingestion | 33 |
| `publisher_crawl_quality_triage.csv` | Full triage spreadsheet for Chris review | 63 |
| `publisher_crawl_results.json` | Raw crawl results | 63 |

**Total SQL-queued A/B candidates:** 226 (193 + 33)

---

## 5. Ingestion Steps (Following ENRICHMENT_PIPELINE.md)

When Chris is ready to ingest these articles, the steps follow the enrichment pipeline:

### Step 1 — Register sources

Execute `nonpubmed_source_registry_inserts.sql` and `publisher_crawl_source_registry_inserts.sql` to register 7 journal sources in `source_registry`.

### Step 2 — Queue articles

Execute `nonpubmed_ingestion_queue_inserts.sql` and `publisher_crawl_ingestion_queue_inserts.sql` to queue 226 Tier A/B articles in `ingestion_queue`.

### Step 3 — Chris reviews A/B candidates

Chris reviews the triage CSVs (`nonpubmed_quality_triage.csv`, `publisher_crawl_quality_triage.csv`) and approves or rejects each candidate.

### Step 4 — Chunk approved articles

Approved articles are chunked per ENRICHMENT_PIPELINE.md Step 3 (paragraph-level chunks with section context, DOI citation per chunk).

### Step 5 — Embed into vector DB

Chunks embedded into CMS Supabase vector collection per ENRICHMENT_PIPELINE.md Step 4. Decision: reuse existing `match_pubmed_articles()` or create a new `match_journal_articles()` RPC — deferred to Phase 12.

### Step 6 — Mark affected fuel docs

Any fuel docs referencing the same products as the newly ingested articles are flagged for review.

---

## 6. What Is NOT Done in Phase 11

- SQL files are **NOT executed** — they are documented and ready for Chris to execute when ready
- Articles are **NOT chunked or embedded** — that is post-ingestion pipeline work
- No vector collection changes are made
- No fuel docs are regenerated
- The triage CSVs are **NOT reviewed by Chris yet** — this document identifies and organizes the data for his review

---

## 7. Blocked Sources (Require Manual Handling)

Two publisher sources returned HTTP 403 during the crawl:

| Source | URL | Workaround |
|--------|-----|------------|
| Journal of Clinical and Cosmetic Dermatology | sciforschenonline.org | Browser/manual download or API access |
| Journal of Aesthetic Nursing | magonlinelibrary.com | Browser/manual download or subscription |

If these journals are still important, Chris can manually download articles and feed them through the enrichment pipeline as regular source documents.

---

## 8. Related Documents

- **ENRICHMENT_PIPELINE.md** — the repeatable loop these articles will flow through
- **SOURCE_CLASSIFICATION.md** — classification and citation format for peer-reviewed journals
- `supabase/source-discovery/nonpubmed/` — Pass 1 discovery artifacts
- `supabase/source-discovery/publisher-crawl/` — Pass 2 publisher crawl artifacts

---

*Created: Phase 11-03*
