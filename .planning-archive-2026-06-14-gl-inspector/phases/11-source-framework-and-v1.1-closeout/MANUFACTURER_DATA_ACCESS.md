# Manufacturer Data Access: Agent Runtime Search Design

**Phase:** 11 — Source Framework & v1.1 Close-Out
**Status:** Design document — implementation in future phases
**Requirement:** SRCE-04

---

## 1. Problem Statement

Agents need to answer product-specific questions that go beyond what fuel docs cover:

- "What is the reconstitution ratio for Sculptra?"
- "What injection depth does the Restylane Lyft IFU specify for cheek augmentation?"
- "What are the storage requirements for Daxxify?"
- "What clinical trial data supports Vollure XC for nasolabial folds?"

Fuel docs (Phase 12-14) cover common cases. Agent tools search manufacturer data at runtime for the long tail — specific IFU references, precise dosing tables, storage requirements, technique details that would bloat fuel docs if included exhaustively.

---

## 2. Data Sources

Manufacturer data encompasses:

| Source Type | Description | Authoritative For |
|-------------|-------------|-------------------|
| Instructions for Use (IFUs) | Official product usage documents | Technique, dosing, reconstitution, storage, warnings |
| Package Inserts (PIs) | Regulatory documents (overlap with FDA labels) | Indications, contraindications, adverse events |
| Manufacturer Training Materials | Videos, slide decks, technique guides | Injection technique, product handling, patient selection |
| Clinical Study Reports | Manufacturer-sponsored trials | Efficacy data, patient outcomes, study populations |
| Product Education Content | Marketing-adjacent but factual content | Mechanisms, benefits, differentiators |

Per SOURCE_CLASSIFICATION.md, all of these are production-citable for product education and technique guidance.

---

## 3. Access Pattern

The target access pattern for agents:

```
Agent receives question about product X
  --> Agent calls tool: search_manufacturer_data(product_id, query)
  --> Tool searches manufacturer data vector collection
  --> Returns top-K chunks with source metadata + citation info
  --> Agent synthesizes answer with proper citation format
```

This follows the same pattern as existing RPCs in CMS Supabase (`gjqicqldjgvrwmtkliie`):

| Existing RPC | Source Type | Chunk Count |
|-------------|-------------|-------------|
| `match_pubmed_articles()` | PubMed papers | ~37K |
| `match_podcast_chunks()` | Podcast transcripts | ~202K |
| `match_youtube_transcripts()` | YouTube videos | ~148K |
| `match_industry_articles()` | Industry articles | ~87K |

Manufacturer data search is the next collection in this pattern.

---

## 4. Required Infrastructure (Not Built Yet)

### 4a. Vector collection for manufacturer data

**Location:** CMS Supabase project `gjqicqldjgvrwmtkliie`

**Table:** `manufacturer_chunks` (or similar)

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| offering_id | uuid | FK to gl_products — which product this chunk relates to |
| source_type | text | `ifu`, `pi`, `training`, `clinical_study`, `education` |
| manufacturer | text | Allergan, Galderma, Evolus, Revance, etc. |
| document_title | text | e.g., "Restylane Lyft IFU" |
| year | integer | Publication/revision year |
| chunk_text | text | The actual text content of this chunk |
| chunk_embedding | vector | Embedding for semantic search |
| page_ref | text | Page number or section reference (nullable) |
| url | text | Source URL if available (nullable) |
| created_at | timestamptz | When chunk was ingested |

### 4b. RPC function

```sql
match_manufacturer_docs(
  query_embedding vector,
  match_threshold float,
  match_count int,
  offering_id_filter uuid DEFAULT NULL
)
```

Returns: ranked chunks ordered by similarity, filtered by offering_id when provided.

### 4c. Agent tool wrapper

| Property | Value |
|----------|-------|
| Tool name | `search_manufacturer_data` |
| Input | product name or offering_id, natural language query |
| Output | ranked chunks with citation metadata |
| Registration | Agent tool registry in A360 platform |

---

## 5. Current State

### What exists today

- CMS Supabase has `match_podcast_chunks()`, `match_pubmed_articles()`, `match_youtube_transcripts()`, and `match_industry_articles()` — manufacturer data follows the same pattern
- 87K industry article chunks are already embedded and searchable
- Chris is gathering manufacturer documents (IFUs, training materials) in parallel

### What does NOT exist

- No `manufacturer_chunks` table or collection
- No `match_manufacturer_docs()` RPC
- No agent tool wrapper for manufacturer search
- No chunked manufacturer data (documents exist but are not chunked/embedded)

---

## 6. Implementation Phases

This document defines the DESIGN. Implementation happens in later phases:

| Step | What | When | Dependency |
|------|------|------|------------|
| Chris gathers IFUs/training docs | Manual collection | In parallel now | None |
| Create `manufacturer_chunks` table + RPC | Schema + function creation | Phase 12 prep or standalone task | Documents gathered |
| Chunk + embed documents per ENRICHMENT_PIPELINE.md | Processing pipeline | After documents collected | Table created |
| Register agent tool | Platform integration | After chunks searchable | RPC working |

---

## 7. Interim Access (Before Full Implementation)

Until the manufacturer data vector collection exists, agents can:

1. **Reference fuel docs** — which synthesize manufacturer data as part of their content (Phase 12-14 output)
2. **Reference evidence_links with source='manufacturer'** — existing rows from Phase 2 dossier compilation (25 IFU evidence_links already in DB)
3. **Reference FDA labels via existing evidence_links** — overlap with manufacturer PIs (72 FDA evidence_links already in DB)

This is sufficient for Phase 12-13 fuel doc generation. Full runtime search (SRCE-04 complete) enhances agent capability but is not a blocker for fuel doc creation.

---

## 8. Related Documents

- **ENRICHMENT_PIPELINE.md** — Steps 3-4 describe how manufacturer data is chunked and embedded
- **SOURCE_CLASSIFICATION.md** — Manufacturer data classification and citation formats
- **Phase 12 ROADMAP entry** — Chris manufacturer doc population running in parallel

---

*Created: Phase 11-03*
*Requirement: SRCE-04*
