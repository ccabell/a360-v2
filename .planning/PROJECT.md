# A360 Global Library — Project

## Vision

OpenEvidence for aesthetic medicine. Every clinical claim backed by cited, linkable data that providers can tap to verify what the system says.

## Core Product

The A360 Global Library (GL) is a structured knowledge system for aesthetic medicine that:
- Populates `agent_reference_docs`, `evidence_links`, `agent_fuel_documents` in Supabase project `aejskvmpembryunnbgrk`
- Organizes content by lens (clinical, sales_education, deep_product) and entity type (category, product, concern)
- Backs every clinical claim with a provenance row in `evidence_links`
- Powers the Research/Evidence tab (M6) in a360-v2 — the OpenEvidence-style citation UI

## Architecture Principles

### Gateway Posture (locked — GATEWAY_POSTURE_ADDENDUM.md)
- A360 is a gateway to data, not an authority
- Clinical lens: characterize in ranges + point to source for exact protocol
- Safety floor (contraindications, black box warnings) is the ONE place we assert authoritatively
- Precise dosing tables are GONE — replaced by range characterizations + `[FDA/DailyMed →]` pointers

### Sales Education Priority (locked — SALES_EDUCATION_PRIORITY_ADDENDUM.md)
- `sales_education` is the PRIMARY lens — deepest compile effort, no liability ceiling
- Key sections: combination_therapy, cost_benefit, benefit_framing, objection_reframes, maintenance_story

## Current State (2026-06-13)

**Phases 1-5 complete.** 5 phases executed (18 plans total). Phase 6 (pairing-engine) in progress.

### Research/Evidence Tab (Phases 1-3)
- POST `/api/research/chat` streams grounded prose via direct Anthropic SDK (claude-haiku-4.5)
- Real DB retrieval: `evidence_links` (PubMed + FDA) + `agent_reference_docs`
- Citation cards render with clickable deep links to `pubmed.ncbi.nlm.nih.gov` and `accessdata.fda.gov`
- Corpus diversity: PubMed sources guaranteed alongside FDA via reserved-slot merging
- PubMed gap FIXED (2026-06-13): corpus diversity logic + direct Anthropic key replaced AI Gateway fallback

### Source Infrastructure (Phase 4)
- source_registry: 43 active, 14 retired, 0 review (fully triaged)
- ingestion_queue: 92 approved/ingested, 10 rejected, 0 queued
- 17 offerings with FDA evidence_links, 0 null URLs

### Concern Language (Phase 5)
- 593 aliases across 48 concerns (minimum 4 per concern)
- 4 concern clusters: Tired Appearance, Lower-Face Heaviness, Post-Weight-Loss Laxity, Angry/Mean Resting Expression
- Concern-first routing live: "I look tired" → 8 products across 3 mechanisms

### Enrichment Coverage
- 136 agent_reference_docs (18 offerings × 3 lenses)
- 184 evidence_links (72 FDA, 78 PubMed, 25 IFU, 7 YouTube)
- 139 item_concerns (32 offerings), 212 item_body_areas (32 offerings)
- 1 agent_fuel_document (Botox only — fuel compilation is Phase 10)

## Demo Deadline

June 22, 2026 — Boulevard CEO/CTO meeting. M6 Evidence tab is a LIVE lane — real retrieval, real citations, unscripted questions.

## Database

Supabase project: `aejskvmpembryunnbgrk`

Key tables:
- `agent_reference_docs` — dossier prose (lens/doc_type/version/status)
- `evidence_links` — provenance backbone (doi, pmid, url, snippet, authority_rank)
- `agent_fuel_documents` — compiled agent-loadable packets
- `item_relationships` — pairing data

## Content Corpus (PRIMARY enrichment source)

The CMS Supabase (`gjqicqldjgvrwmtkliie`) holds 630K+ vectorized, searchable chunks:

| Source | Records | Chunks | Tagged | RPC Function |
|--------|---------|--------|--------|-------------|
| Podcasts | 8,688 episodes / 31 shows | ~202K | 100% | `match_podcast_chunks()` |
| YouTube | 3,984 videos | ~148K | 64% | `match_youtube_transcripts()` |
| PubMed | 23,581 articles | ~37K | 99% | `match_pubmed_articles()` |
| Industry | ~750 articles | ~87K | 100% | `match_industry_articles()` |

**Corpus-first principle (locked 2026-06-13):**
- Every enrichment phase MUST query the corpus BEFORE generating content
- The LLM's job is to synthesize and structure what experts said, not generate from training data
- Podcast data is the richest source for pairings, timing, combinations, patient education, and staff training
- Workflow: generate questions → mine corpus → combine AI synthesis → feed into planning

## Non-Negotiables

- No PHI in any code, comments, fixtures, or examples
- Tenant isolation on all queries
- Corpus-first: never rely on LLM knowledge alone when 630K expert chunks exist
- Citations for providers only (clinical + deep_product lens) — not patient-facing (sales_education)
- YouTube timestamps must be preserved (currently discarded at ingestion — known gap)
