# Roadmap: A360 Citations Infrastructure

## Overview

Fix the evidence_links data gaps and wire the compile pipeline to always capture citation locators, enabling the OpenEvidence-style Research/Evidence tab (M6) to render real clickable citations by June 22, 2026.

## Phases

- [ ] **Phase 1: citations** - Fix evidence_links data gaps + update compile pipeline for real clickable citations
- [ ] **Phase 2: dossier-batch** - Compile dossiers for 20 demo products with structured intelligence emission and source capture
- [ ] **Phase 3: retrieval-wiring** - Wire Research/Evidence tab from mock data to real evidence_links + agent_reference_docs (demo deliverable)

## Phase Details

### Phase 1: citations
**Goal**: Fix evidence_links data gaps (pmid null, url empty, no page_number column, YouTube timestamps missing) and update the compile pipeline to always capture citation locators going forward.
**Depends on**: Nothing
**Canonical refs**:
- `HANDOFF_CITATIONS.md`
- `Fable Docs/RETRIEVAL_SERVICE.md`
- `Fable Docs/DOSSIER_COMPILE_PIPELINE.md`
**Success Criteria** (what must be TRUE):
  1. All existing PubMed evidence_links rows have pmid populated and url set to `https://pubmed.ncbi.nlm.nih.gov/{pmid}/`
  2. evidence_links table has page_number column; row-level population deferred to v2
  3. FDA prescribing info PDFs are in Supabase Storage with accessible URLs in evidence_links
  4. YouTube CMS chunks have start_seconds/end_seconds captured (not discarded)
  5. Compile pipeline always captures pmid, doi, url, page_number on new evidence_links inserts
  6. Research/Evidence tab renders clickable "View on PubMed" and "Open FDA label · p.N" links for at least Botox/Neurotoxins content
**Plans:** 0/3 plans executed

Plans:
- [x] 01-01-PLAN.md — Schema migration (page_number column) + PubMed PMID backfill + YouTube timestamp backfill
- [ ] 01-02-PLAN.md — FDA Access Data URL research + FDA URL backfill for 47 evidence_links rows
- [ ] 01-03-PLAN.md — Compile pipeline doc update + demo verification checkpoint

---

### Phase 2: dossier-batch
**Goal**: Compile dossiers for the remaining ~20 demo products (beyond Botox/Neurotoxins already done) using the updated DOSSIER_COMPILE_PIPELINE.md (gateway posture + sales_education primary). Emit structured intelligence rows (item_concerns, item_body_areas, aliases, does_not_solve) alongside each compile. Log all reputable sources encountered to source_registry + ingestion_queue (log-only, no ingestion). Aggressively surface open-access journal articles (JCAD, Cureus, Dermatology and Therapy, ASJ) and flag top 10 highest-authority OA papers in SOURCE CAPTURE REPORT.
**Depends on**: Phase 1 (citations infrastructure must be in place for evidence_links to include pmid/url)
**Canonical refs**:
- `.planning/phases/02-dossier-batch/BATCH_SOURCE_LOGGING_ADDENDUM.md`
- `.planning/phases/02-dossier-batch/STRUCTURED_EMISSION_ADDENDUM.md`
- `.planning/phases/02-dossier-batch/AESTHETIC_DERMATOLOGY_JOURNAL_REGISTRY.md`
- `Fable Docs/DOSSIER_COMPILE_PIPELINE.md`
- `Fable Docs/DOSSIER_TEMPLATES.md`
**Success Criteria** (what must be TRUE):
  1. All ~20 remaining demo products have at least 3 dossier docs (clinical, sales_education, deep_product) inserted as status='draft'
  2. Every inserted doc has evidence_links with authority_rank and doi/pmid/url populated (no bare claims)
  3. item_concerns rows emitted for each product (all major concerns mapped with relevance tier)
  4. item_body_areas rows emitted for each product (zone-level specificity where clinically valid)
  5. aliases rows added for every concern/body-area (3-8 patient-language phrases per major concern)
  6. does_not_solve column populated for each product
  7. source_registry has new rows for every reputable source encountered (status='review')
  8. ingestion_queue has rows for ingestible-looking sources (OA/public_domain)
  9. SOURCE CAPTURE REPORT lists top 10 highest-authority OA papers (JCAD, Cureus, Dermatology and Therapy, ASJ) flagged for immediate Botox/Neurotoxins-related ingestion
**Plans:** 6 plans

Plans:
- [x] 02-01-PLAN.md — Schema migration (does_not_solve column) + authority_rank backfill + product list discovery
- [ ] 02-02-PLAN.md — Compile 6 remaining category dossiers (HA Fillers, Biostimulators, Energy/RF, Energy/Laser, Skincare Actives, Body Contouring)
- [ ] 02-03-PLAN.md — Compile HA Filler product dossiers (Juvederm family, Restylane family, RHA, Skinvive)
- [ ] 02-04-PLAN.md — Compile Biostimulator + Body Contouring product dossiers (Sculptra, Radiesse, Kybella, CoolSculpting)
- [ ] 02-05-PLAN.md — Compile Energy/RF + Energy/Laser + Skincare Actives + Dysport product dossiers
- [ ] 02-06-PLAN.md — End-of-batch reports (STRUCTURED_COVERAGE, TAXONOMY_ADDITIONS, SOURCE CAPTURE REPORT with top-10 OA papers)

**Pre-decided (locked from prior session):**
- Citation rendering: numbered chips `[1][2]` with source panel. Already built in M6.
- FDA linking: ingest PDFs to Supabase Storage + page_number field
- Prose wiring: LLM cites `[src_N]` at query time; post-processor resolves. No IDs in content_md.
- PubMed: CrossRef API (DOI -> PMID) -> construct pubmed URL
- YouTube: always cite with `?t={startSeconds}s` deep link
- Podcasts: no citation links in v1
- Audience: provider-only (clinical + deep_product lens); sales_education = no PubMed footnotes

---

### Phase 3: retrieval-wiring
**Goal**: Wire the M6 Research/Evidence tab from mock data to real evidence_links + agent_reference_docs. Build the minimal retrieval route per RETRIEVAL_SERVICE.md: question -> retrieval -> RetrievedSource objects -> existing citation UI. This is the demo deliverable — an unscripted Botox/Neurotoxins question in the live UI must render prose with clickable PubMed + FDA citations from the real DB.
**Depends on**: Phase 1 (clean citation data in evidence_links), Phase 2 (real dossier content in agent_reference_docs)
**Canonical refs**:
- `Fable Docs/RETRIEVAL_SERVICE.md`
- `lib/types/retrieval.ts`
- `components/citations/`
- `lib/mock/research-data.ts` (the mock this phase replaces)
**Success Criteria** (what must be TRUE):
  1. Research/Evidence tab reads from real evidence_links + agent_reference_docs, not mock data
  2. An unscripted Botox/Neurotoxins question renders a grounded prose response
  3. Response includes clickable "View on PubMed" links pointing to real pubmed.ncbi.nlm.nih.gov URLs
  4. Response includes at least one clickable FDA label link pointing to accessdata.fda.gov
  5. Citation chips `[1][2]` map correctly to source panel entries
  6. No mock data imports remain in the retrieval path
**Plans:** TBD
