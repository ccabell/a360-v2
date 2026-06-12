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

## Current State (2026-06-12)

**Phase 3 complete.** All 3 planned phases executed (14 plans total).

The Research/Evidence tab (`/dashboard/research`) is live:
- POST `/api/research/chat` streams grounded prose via AI gateway (claude-haiku-4.5)
- Real DB retrieval: `evidence_links` (PubMed + FDA) + `agent_reference_docs`
- Citation cards render with clickable deep links to `pubmed.ncbi.nlm.nih.gov` and `accessdata.fda.gov`
- Chip-to-card number mapping confirmed correct
- Known gap: PubMed cards don't surface in UI (FDA rows hold all `authority_rank` slots); `snippet` JSON renders raw — both deferred

## Demo Deadline

June 22, 2026 — Boulevard CEO/CTO meeting. M6 Evidence tab is a LIVE lane — real retrieval, real citations, unscripted questions.

## Database

Supabase project: `aejskvmpembryunnbgrk`

Key tables:
- `agent_reference_docs` — dossier prose (lens/doc_type/version/status)
- `evidence_links` — provenance backbone (doi, pmid, url, snippet, authority_rank)
- `agent_fuel_documents` — compiled agent-loadable packets
- `item_relationships` — pairing data

## Non-Negotiables

- No PHI in any code, comments, fixtures, or examples
- Tenant isolation on all queries
- Citations for providers only (clinical + deep_product lens) — not patient-facing (sales_education)
- YouTube timestamps must be preserved (currently discarded at ingestion — known gap)
