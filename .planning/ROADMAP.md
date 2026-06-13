# Roadmap: A360 Citations Infrastructure

## Overview

Fix the evidence_links data gaps and wire the compile pipeline to always capture citation locators, enabling the OpenEvidence-style Research/Evidence tab (M6) to render real clickable citations by June 22, 2026.

## Phases

- [x] **Phase 1: citations** - Fix evidence_links data gaps + update compile pipeline for real clickable citations (completed 2026-06-12)
- [x] **Phase 2: dossier-batch** - Compile dossiers for 20 demo products with structured intelligence emission and source capture (completed 2026-06-12)
- [ ] **Phase 3: retrieval-wiring** - Wire Research/Evidence tab from mock data to real evidence_links + agent_reference_docs (demo deliverable)
- [x] **Phase 4: source-ingestion** - Triage source_registry, ensure FDA source document links, verify evidence_links URLs (completed 2026-06-13)
- [x] **Phase 5: concern-language** - Mine 122 transcripts + coaching playbooks for real patient language; expand aliases; build concern clusters (completed 2026-06-13)

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
**Plans:** 3/3 plans complete

Plans:
- [x] 01-01-PLAN.md — Schema migration (page_number column) + PubMed PMID backfill + YouTube timestamp backfill
- [x] 01-02-PLAN.md — FDA Access Data URL research + FDA URL backfill for 47 evidence_links rows
- [x] 01-03-PLAN.md — Compile pipeline doc update + demo verification checkpoint

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
**Plans:** 6/6 plans complete

Plans:
- [x] 02-01-PLAN.md — Schema migration (does_not_solve column) + authority_rank backfill + product list discovery
- [x] 02-02-PLAN.md — Compile 6 remaining category dossiers (HA Fillers, Biostimulators, Energy/RF, Energy/Laser, Skincare Actives, Body Contouring)
- [x] 02-03-PLAN.md — Compile HA Filler product dossiers (Juvederm family, Restylane family, RHA, Skinvive)
- [x] 02-04-PLAN.md — Compile Biostimulator + Body Contouring product dossiers (Sculptra, Radiesse, Kybella, CoolSculpting)
- [x] 02-05-PLAN.md — Compile Energy/RF + Energy/Laser + Skincare Actives + Dysport product dossiers
- [x] 02-06-PLAN.md — End-of-batch reports (STRUCTURED_COVERAGE, TAXONOMY_ADDITIONS, SOURCE CAPTURE REPORT with top-10 OA papers)

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
**Plans:** 4 plans

Plans:
- [x] 03-01-PLAN.md — Wave 0 prep: add AI_GATEWAY_API_KEY to env example + verify Botox IDs and evidence_links/dossier data
- [x] 03-02-PLAN.md — Retrieval engine: lib/retrieval/sources.ts (real DB -> RetrievedSource) + app/api/research/chat SSE route (streamText + resolveCitations)
- [x] 03-03-PLAN.md — Client cutover: lib/retrieval/stream.ts + swap mock import in research-chat.tsx + flip page badge to Live
- [ ] 03-04-PLAN.md — End-to-end live UI verification: unscripted Botox question with clickable PubMed + FDA citations (SC-2 to SC-5)

---

### Phase 4: source-ingestion
**Goal**: Triage the source_registry map from Phase 02 (review -> active or rejected), ensure all products link to their FDA source documents via evidence_links, and download FDA PDFs to Supabase Storage for link stability. CMS vector corpus writes are out of scope (separate project).
**Depends on**: Phase 2 (the captured registry)
**Canonical refs**:
- `.planning/phases/02-dossier-batch/BATCH_SOURCE_LOGGING_ADDENDUM.md`
- `.planning/phases/02-dossier-batch/AESTHETIC_DERMATOLOGY_JOURNAL_REGISTRY.md`
- `.planning/phases/04-source-ingestion/04-RESEARCH.md`
- `GL_GSD_ROADMAP.md`
**Success Criteria** (what must be TRUE):
  1. All source_registry rows with status='review' triaged to either 'active' or 'rejected' with reason
  2. ingestion_queue items either ingested (FDA) or explicitly rejected with reason
  3. Every product with an FDA regulatory source has a working evidence_links URL
  4. FDA PDFs stored in Supabase Storage (or fallback to accessdata.fda.gov URLs documented)
  5. Rights classification documented for each source category (public_domain, CC-BY, manufacturer-permitted, restricted)
**Plans:** 2/2 plans complete

Plans:
- [x] 04-01-PLAN.md — Audit live DB state + triage source_registry and ingestion_queue (deduplicate, promote, reject)
- [x] 04-02-PLAN.md — Download FDA PDFs to Supabase Storage + backfill evidence_links FDA URLs for Phase 2 products

---

### Phase 5: concern-language
**Goal**: Mine the 122 consultation transcripts, Sales Excellence Framework, and coaching playbooks for real patient language at scale. Massively expand aliases; add legitimate missing concerns; build concern-cluster groupings (tired look, lower-face heaviness, post-weight-loss laxity). This is the layer that enables concern-first routing ("I look tired" -> candidate mechanisms -> products).
**Depends on**: Phase 2 (taxonomy conventions established)
**Canonical refs**:
- `GL_GSD_ROADMAP.md`
- `.planning/phases/02-dossier-batch/STRUCTURED_EMISSION_ADDENDUM.md`
- `.planning/phases/05-concern-language/05-RESEARCH.md`
**Success Criteria** (what must be TRUE):
  1. Every concern has >=3 patient-language aliases
  2. Concern clusters defined and documented (tired look, lower-face heaviness, etc.)
  3. Concern-first routing demo-able: "I look tired" -> candidate mechanisms -> products
  4. Missing concerns added with proper taxonomy integration
  5. Aliases sourced from real transcript language (not LLM-generated guesses)
**Plans:** 3/3 plans complete

Plans:
- [x] 05-01-PLAN.md — DB prep: execute outstanding Phase 2 SQL + verify aliases schema + create concern_clusters tables + add missing concerns
- [x] 05-02-PLAN.md — Mine 122 transcripts for patient concern language + emit alias SQL + execute and verify >=3 aliases per concern
- [x] 05-03-PLAN.md — Populate 4 concern clusters + run routing demo query + generate TAXONOMY_ADDITIONS_P5.md report
