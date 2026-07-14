# Enrichment Pipeline: Repeatable Source-to-Fuel Loop

**Phase:** 11 — Source Framework & v1.1 Close-Out
**Status:** Governing document — follow this pipeline for all enrichment tasks in v1.2+
**Requirement:** SRCE-03

---

## 1. Pipeline Overview

The enrichment pipeline is a repeatable loop, not a one-time build. Every new source (IFU, PubMed paper, manufacturer video, YouTube channel, industry article) follows the same 5-step path from raw material to searchable evidence to fuel doc content.

```
[New Source] --> Classify --> Chunk --> Vector DB --> Mark Fuel Stale --> Regenerate
     ^                                                                     |
     +----------------------- Add more sources ----------------------------+
```

The loop runs continuously as new sources are discovered. Each iteration adds evidence depth to the system without requiring architectural changes.

---

## 2. Step 1 — Add Source

### What triggers the pipeline

- Chris discovers a new manufacturer IFU or training document
- A new PubMed paper is published on an existing product
- A new YouTube channel with manufacturer content is identified
- A new industry article or society guideline is released
- Podcast corpus mining surfaces an idea that needs published backup
- Non-PubMed journal discovery identifies new peer-reviewed articles (see JOURNAL_DISCOVERY_INGESTION.md)

### Input/Output

- **Input:** Raw source material (PDF, URL, video, document)
- **Output:** Source registered with type classification

---

## 3. Step 2 — Classify

Apply SOURCE_CLASSIFICATION.md decision tree:

1. Identify source type (FDA, PubMed, manufacturer, industry, YouTube, podcast, etc.)
2. Determine layer (production vs research-only)
3. Determine what the source is authoritative for
4. Record citation format per Citation Format Reference table

**Routing rules:**

- If **podcast/research-only**: follow PODCAST_WORKFLOW.md (extract idea, find published backup)
- If **production-citable**: proceed to Step 3

### Output

Source classified with type, layer, authority scope, and citation format.

### Reference

- SOURCE_CLASSIFICATION.md — full classification matrix and decision tree
- PODCAST_WORKFLOW.md — sub-workflow for podcast-type sources (Steps 1-7)

---

## 4. Step 3 — Chunk into Citable Units

Break the source into chunks that can be individually cited and searched.

### Chunking strategy by source type

| Source Type | Chunking Approach | Typical Chunks per Source |
|-------------|-------------------|--------------------------|
| PubMed | Abstract + key findings | 1-3 per paper |
| FDA label | Section-based (indications, dosing, warnings, contraindications) | 4-6 per label |
| IFU | Section-based (technique, storage, reconstitution, warnings) | 3-5 per document |
| YouTube | Transcript chunks with timestamps (start_seconds, end_seconds) | 5-15 per video |
| Industry articles | Paragraph-level chunks with section context | 3-8 per article |
| Manufacturer training | Topic-based (product handling, injection technique, patient selection) | 3-6 per document |

### Required metadata per chunk

Every chunk must carry:

- **Source metadata:** type, title, author/manufacturer, year, URL
- **Citation data:** PMID, DOI, page number, timestamp — whatever applies per citation format (see SOURCE_CLASSIFICATION.md Citation Format Reference)
- **Offering association:** which `gl_products` product does this relate to?

### Output

Array of citable chunks with metadata, ready for embedding.

---

## 5. Step 4 — Make Searchable (Vector DB)

Embed chunks and store in the appropriate vector collection.

### Storage location

CMS Supabase project `gjqicqldjgvrwmtkliie` hosts vector collections.

### Existing collections

| Source Type | RPC Function | Chunk Count |
|-------------|-------------|-------------|
| PubMed | `match_pubmed_articles()` | ~37K |
| Podcasts | `match_podcast_chunks()` | ~202K |
| YouTube | `match_youtube_transcripts()` | ~148K |
| Industry articles | `match_industry_articles()` | ~87K |

### New collections needed

| Source Type | Proposed RPC | Status |
|-------------|-------------|--------|
| Manufacturer data (IFUs, training, clinical) | `match_manufacturer_docs()` | Not built — see MANUFACTURER_DATA_ACCESS.md |
| Non-PubMed journal articles | Reuse `match_pubmed_articles()` or new collection | Decision deferred to Phase 12 |

### Retrieval requirements

Each embedded chunk must be retrievable by:

- **Semantic search** (vector similarity)
- **Product filter** (offering_id or product name)
- **Source type filter** (to retrieve only FDA sources, only PubMed, etc.)

### Output

Chunks embedded and searchable via RPC functions.

---

## 6. Step 5 — Mark Affected Fuel Docs for Review

When new source data is added for a product:

1. Identify which fuel documents reference that product (query `gl_agent_fuel_documents` by offering_id)
2. Mark those fuel docs as `needs_review: true` (or equivalent stale flag — design in Phase 14)
3. Record what changed: "New PubMed paper added for Sculptra — fuel doc may need updated clinical evidence"

This does NOT automatically regenerate fuel docs. It flags them for the next regeneration cycle. Regeneration is a human-reviewed process (Phase 12-14 work).

### Output

Affected fuel docs flagged for review.

---

## 7. Concrete Walkthrough — Adding a New Galderma IFU

Walk through the full pipeline with a real example.

### Step 1 — Add

Chris obtains the Restylane Lyft Instructions for Use (PDF) from Galderma.

### Step 2 — Classify

- **Source type:** Manufacturer Clinical Data
- **Layer:** Production
- **Authoritative for:** product-specific technique, reconstitution, storage, injection depths, patient selection
- **Citation format:** `[Galderma, Restylane Lyft IFU, 2024]`

### Step 3 — Chunk

Break IFU into sections:

| Chunk | Content | Metadata |
|-------|---------|----------|
| 1 | Indications | source_type=manufacturer_ifu, manufacturer=Galderma, product=Restylane Lyft, year=2024, page_ref=p.1 |
| 2-3 | Injection Technique (multi-chunk — detailed) | same metadata, page_ref=p.3-7 |
| 4 | Reconstitution/Storage | same metadata, page_ref=p.8 |
| 5 | Warnings/Precautions | same metadata, page_ref=p.9-10 |
| 6-7 | Clinical Studies | same metadata, page_ref=p.11-14 |

Each chunk carries: source_type, manufacturer, product, year, page_ref.

### Step 4 — Vector DB

Embed chunks into manufacturer data collection. Associate with Restylane Lyft offering_id. Searchable via `match_manufacturer_docs()` RPC (to be created — see MANUFACTURER_DATA_ACCESS.md).

### Step 5 — Mark stale

Query `gl_agent_fuel_documents WHERE offering_id = {restylane_lyft_id}`. Flag any existing fuel docs for review.

---

## 8. Concrete Walkthrough — Adding a New YouTube Channel

### Step 1 — Add

Identify Allergan Aesthetics official YouTube channel.

### Step 2 — Classify

- **Source type:** YouTube (manufacturer channel)
- **Layer:** Production
- **Authoritative for:** product demonstrations, technique education
- **Citation format:** `[Allergan Aesthetics, "{title}", {year}]` + URL with timestamp

### Step 3 — Chunk

Transcribe videos. Break into topic-based chunks with start_seconds/end_seconds timestamps.

Each chunk carries: source_type=youtube_manufacturer, channel=Allergan Aesthetics, video_title, year, url with timestamp.

### Step 4 — Vector DB

Embed into manufacturer data collection (or existing YouTube collection via `match_youtube_transcripts()`). Associate with relevant offering_ids.

### Step 5 — Mark stale

Flag affected fuel docs for review.

---

## 9. What This Pipeline Does NOT Do

- Does **NOT** auto-generate fuel docs (that is Phase 12-14 work, requiring human review)
- Does **NOT** execute SQL (sources are vector-searchable, not SQL inserts)
- Does **NOT** replace PODCAST_WORKFLOW.md for podcast sources (that workflow is a prerequisite sub-loop within Step 2)
- Does **NOT** build the Evidence Ask UI (separate workstream, out of scope)
- Does **NOT** implement practice-level source overrides (post-v1.2)
- Does **NOT** build the `needs_review` stale flag mechanism (design deferred to Phase 14)

---

## 10. Related Documents

- **SOURCE_CLASSIFICATION.md** — Source type classification, practical per-source guidance, and citation formats
- **EVIDENCE_MODEL.md** — Two-layer model, anonymous ID scheme, contamination definition
- **PODCAST_WORKFLOW.md** — Sub-workflow for podcast-type sources (7-step process)
- **MANUFACTURER_DATA_ACCESS.md** — How manufacturer data is made searchable for agents at runtime
- **JOURNAL_DISCOVERY_INGESTION.md** — First concrete dataset (301 non-PubMed articles) ready to flow through this pipeline

---

*Created: Phase 11-03*
*Requirement: SRCE-03*
