# Roadmap: A360 Citations Infrastructure

## Overview

Fix the evidence_links data gaps and wire the compile pipeline to always capture citation locators, enabling the OpenEvidence-style Research/Evidence tab (M6) to render real clickable citations by June 22, 2026.

## Phases

- [ ] **Phase 1: citations** - Fix evidence_links data gaps + update compile pipeline for real clickable citations

## Phase Details

### Phase 1: citations
**Goal**: Make citations work end-to-end in the Research/Evidence tab by fixing the evidence_links data gaps (pmid null, url empty, no page_number column, YouTube timestamps discarded) and wiring the compile pipeline to always capture citation locators going forward.
**Depends on**: Nothing
**Canonical refs**:
- `HANDOFF_CITATIONS.md`
- `Fable Docs/RETRIEVAL_SERVICE.md`
- `Fable Docs/DOSSIER_COMPILE_PIPELINE.md`
**Success Criteria** (what must be TRUE):
  1. All existing PubMed evidence_links rows have pmid populated and url set to `https://pubmed.ncbi.nlm.nih.gov/{pmid}/`
  2. evidence_links table has page_number column; FDA source rows have it populated
  3. FDA prescribing info PDFs are in Supabase Storage with accessible URLs in evidence_links
  4. YouTube CMS chunks have start_seconds/end_seconds captured (not discarded)
  5. Compile pipeline always captures pmid, doi, url, page_number on new evidence_links inserts
  6. Research/Evidence tab renders clickable "View on PubMed" and "Open FDA label · p.N" links for at least Botox/Neurotoxins content
**Plans**: TBD

**Pre-decided (locked from prior session):**
- Citation rendering: numbered chips `[1][2]` with source panel. Already built in M6.
- FDA linking: ingest PDFs to Supabase Storage + page_number field
- Prose wiring: LLM cites `[src_N]` at query time; post-processor resolves. No IDs in content_md.
- PubMed: CrossRef API (DOI → PMID) → construct pubmed URL
- YouTube: always cite with `?t={startSeconds}s` deep link
- Podcasts: no citation links in v1
- Audience: provider-only (clinical + deep_product lens); sales_education = no PubMed footnotes
