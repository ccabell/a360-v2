# Roadmap: A360 Global Library

## Milestones

- [x] **v1.0 Foundation** - Phases 01-07 (shipped 2026-06-13)
- [ ] **v1.1 Pipeline Integrity & Data Strategy** - Phases 08-10 (in progress)
- [ ] **v2.0 Content Build-Out** - Phases 11+ (planned — combination intelligence, care plans, agent fuel)

---

## Phases

<details>
<summary>v1.0 Foundation (Phases 01-07) - SHIPPED 2026-06-13</summary>

### Phase 1: citations
**Goal**: Fix evidence_links data gaps (pmid null, url empty, no page_number column, YouTube timestamps missing) and update the compile pipeline to always capture citation locators going forward.
**Depends on**: Nothing
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
**Goal**: Compile dossiers for the remaining ~20 demo products using the updated DOSSIER_COMPILE_PIPELINE.md (gateway posture + sales_education primary). Emit structured intelligence rows (item_concerns, item_body_areas, aliases, does_not_solve). Log all reputable sources to source_registry + ingestion_queue.
**Depends on**: Phase 1
**Success Criteria** (what must be TRUE):
  1. All ~20 remaining demo products have at least 3 dossier docs (clinical, sales_education, deep_product) inserted as status='draft'
  2. Every inserted doc has evidence_links with authority_rank and doi/pmid/url populated (no bare claims)
  3. item_concerns rows emitted for each product
  4. item_body_areas rows emitted for each product
  5. aliases rows added for every concern/body-area
  6. does_not_solve column populated for each product
  7. source_registry has new rows for every reputable source encountered
  8. ingestion_queue has rows for ingestible-looking sources
  9. SOURCE CAPTURE REPORT lists top 10 highest-authority OA papers
**Plans:** 6/6 plans complete

Plans:
- [x] 02-01-PLAN.md — Schema migration (does_not_solve column) + authority_rank backfill + product list discovery
- [x] 02-02-PLAN.md — Compile 6 remaining category dossiers
- [x] 02-03-PLAN.md — Compile HA Filler product dossiers
- [x] 02-04-PLAN.md — Compile Biostimulator + Body Contouring product dossiers
- [x] 02-05-PLAN.md — Compile Energy/RF + Energy/Laser + Skincare Actives + Dysport product dossiers
- [x] 02-06-PLAN.md — End-of-batch reports (STRUCTURED_COVERAGE, TAXONOMY_ADDITIONS, SOURCE CAPTURE REPORT)

---

### Phase 3: retrieval-wiring
**Goal**: Wire the M6 Research/Evidence tab from mock data to real evidence_links + agent_reference_docs. Build the minimal retrieval route per RETRIEVAL_SERVICE.md. This is the demo deliverable.
**Depends on**: Phase 1, Phase 2
**Success Criteria** (what must be TRUE):
  1. Research/Evidence tab reads from real evidence_links + agent_reference_docs, not mock data
  2. An unscripted Botox/Neurotoxins question renders a grounded prose response
  3. Response includes clickable "View on PubMed" links pointing to real pubmed.ncbi.nlm.nih.gov URLs
  4. Response includes at least one clickable FDA label link pointing to accessdata.fda.gov
  5. Citation chips `[1][2]` map correctly to source panel entries
  6. No mock data imports remain in the retrieval path
**Plans:** 3/4 plans complete

Plans:
- [x] 03-01-PLAN.md — Wave 0 prep: add AI_GATEWAY_API_KEY to env example + verify Botox IDs and evidence_links/dossier data
- [x] 03-02-PLAN.md — Retrieval engine: lib/retrieval/sources.ts + app/api/research/chat SSE route
- [x] 03-03-PLAN.md — Client cutover: lib/retrieval/stream.ts + swap mock import + flip page badge to Live
- [ ] 03-04-PLAN.md — End-to-end live UI verification: unscripted Botox question with clickable PubMed + FDA citations

---

### Phase 4: source-ingestion
**Goal**: Triage the source_registry map from Phase 2, ensure all products link to their FDA source documents via evidence_links, and download FDA PDFs to Supabase Storage for link stability.
**Depends on**: Phase 2
**Success Criteria** (what must be TRUE):
  1. All source_registry rows with status='review' triaged to either 'active' or 'retired' with reason
  2. ingestion_queue items either ingested (FDA) or explicitly rejected with reason
  3. Every product with an FDA regulatory source has a working evidence_links URL
  4. FDA PDFs stored in Supabase Storage (or fallback to accessdata.fda.gov URLs documented)
  5. Rights classification documented for each source category
**Plans:** 2/2 plans complete

Plans:
- [x] 04-01-PLAN.md — Audit live DB state + triage source_registry and ingestion_queue
- [x] 04-02-PLAN.md — Download FDA PDFs to Supabase Storage + backfill evidence_links FDA URLs

---

### Phase 5: concern-language
**Goal**: Mine the 122 consultation transcripts, Sales Excellence Framework, and coaching playbooks for real patient language at scale. Massively expand aliases; add legitimate missing concerns; build concern-cluster groupings.
**Depends on**: Phase 2
**Success Criteria** (what must be TRUE):
  1. Every concern has >=3 patient-language aliases
  2. Concern clusters defined and documented (tired look, lower-face heaviness, etc.)
  3. Concern-first routing demo-able: "I look tired" -> candidate mechanisms -> products
  4. Missing concerns added with proper taxonomy integration
  5. Aliases sourced from real transcript language (not LLM-generated guesses)
**Plans:** 3/3 plans complete

Plans:
- [x] 05-01-PLAN.md — DB prep: execute outstanding Phase 2 SQL + verify aliases schema + create concern_clusters tables + add missing concerns
- [x] 05-02-PLAN.md — Mine 122 transcripts for patient concern language + emit alias SQL
- [x] 05-03-PLAN.md — Populate 4 concern clusters + run routing demo query + generate TAXONOMY_ADDITIONS_P5.md

---

### Phase 6: pairing-engine
**Goal**: Generate within-catalog pairing candidates, run each through the 8-gate legitimacy test, score, tier, and emit draft item_relationships rows with clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points. Human review gates publication.
**Depends on**: Phase 2, Phase 5
**Success Criteria** (what must be TRUE):
  1. All 153 pairs among 18 products explicitly tiered
  2. Canonical/common pairs reviewed by Chris
  3. Zero forced pairings — every pairing backed by clinical rationale
  4. Each relationship row has all 5 required fields
  5. 8-gate legitimacy test documented and applied consistently
**Plans:** 5/5 plans complete

Plans:
- [x] 06-01-PLAN.md — Foundation: schema migration (pairing_tier column) + does_not_solve backfill + PAIRING_RUBRIC.md
- [x] 06-02-PLAN.md — SQL pre-screen: enumerate all 153 pairs + compute concern overlap and limitation signals
- [x] 06-03-PLAN.md — Corpus-first 8-gate evaluation for all 153 pairs
- [x] 06-04-PLAN.md — DB emission: write + execute item_relationships INSERTs + QA validation report
- [x] 06-05-PLAN.md — Review artifacts (PAIRING_REVIEW.md + per-pair files) + Chris review checkpoint

---

### Phase 7: timing-rules
**Goal**: Promote timing from prose to queryable data. Add product-level cadence/downtime fields to gl_products and pair-level timing/staging/safety fields to item_relationships. Populate for 18 products and ~30 canonical/common pairs.
**Depends on**: Phase 2, Phase 6
**Success Criteria** (what must be TRUE):
  1. gl_products has 11 cadence/downtime columns populated for all 18 products
  2. item_relationships has 11 timing/staging/safety columns populated for ~30 canonical/common pairs
  3. Safety-critical rules flagged (safety_critical=true, timing_warning_level set) for all hard stops
  4. Booking-logic agent can answer "can these be same-day?" and "work backward from date" from structured data alone
  5. TIMING_REVIEW.md produced with safety-critical items for Chris review
**Plans:** 2/2 plans complete

Plans:
- [x] 07-01-PLAN.md — Schema migration (22 timing columns) + product cadence UPDATEs for 18 products
- [x] 07-02-PLAN.md — Pair timing UPDATEs for ~30 canonical/common pairs + TIMING_EVALUATION.md + TIMING_REVIEW.md

</details>

---

### v1.1 Pipeline Integrity & Data Strategy (In Progress)

**Milestone Goal:** Fix operational gaps exposed during v1.0 — validation harness, execution manifest, podcast data strategy, evidence provenance cleanup, and pairing SQL reconciliation — before building more content on a shaky foundation.

#### Phase 8: execution-manifest-and-validation
**Goal**: Inventory every SQL file across phases 01-07 in a single dependency-ordered manifest, then build idempotent validation files for each phase that assert pass/fail against live Supabase.
**Depends on**: Phases 01-07 (inspects their output)
**Requirements**: EXEC-01, EXEC-02, EXEC-03, VAL-01, VAL-02, VAL-03
**Success Criteria** (what must be TRUE):
  1. A single manifest file lists all SQL files across phases 01-07 in dependency order, with status (pending/applied/verified) and phase association
  2. Every completed phase (01-07) has a corresponding validation SQL file that returns PASS/FAIL against expected row counts, NULL violations, and orphan records
  3. Manifest includes pre-execution checklist and post-execution verification queries for each file
  4. SQL files that are out of sync with their source artifacts are flagged in the manifest
  5. Validation can be run idempotently against live Supabase — running twice produces the same result
  6. Batch content generation QC gate (uniqueness ratio >80%, 0 product name mismatches, evidence specificity check) is defined and documented for use in future phases
**Plans:** 2 plans

Plans:
- [x] 08-01-PLAN.md — Build EXECUTION_MANIFEST.json: dependency-ordered inventory of all SQL/TS artifacts across phases 01-07
- [x] 08-02-PLAN.md — Create 7 phase validation SQL files + batch QC gate (PASS/FAIL assertions for Supabase)

---

#### Phase 9: podcast-data-strategy-and-evidence-provenance
**Goal**: Define and document the two-layer evidence model (research layer vs production layer), implement anonymous identifiers for podcast-derived knowledge, and clean up existing evidence_links provenance gaps.
**Depends on**: Phase 8 (manifest establishes which SQL files exist to audit)
**Requirements**: POD-01, POD-02, POD-03, EVID-01, EVID-02, EVID-03
**Success Criteria** (what must be TRUE):
  1. Two-layer evidence model is documented: research layer (podcast-derived ideas with anonymous content hash IDs) and production layer (PubMed, FDA, society guidance, expert consensus) — no speaker names, show names, or episode IDs appear in any production-facing field
  2. Anonymous identifier scheme implemented — a podcast-sourced concept can be referenced by content hash alone, with no attribution to show/episode/speaker
  3. Workflow documented: podcast -> discover idea -> find PubMed/published backup -> save both layers
  4. Source classification matrix exists distinguishing research-only sources (podcast, conference, webinar) from production-citable sources (PubMed, FDA, society, expert consensus)
  5. 36 PubMed evidence_links rows with NULL url have url backfilled using their DOI
  6. Phase 3 plan 03-04 (live UI verification) completed — an unscripted question in the live UI renders real citations from real DB
**Plans:** 2/2 plans complete

Plans:
- [x] 09-01-PLAN.md — Evidence model documentation (EVIDENCE_MODEL.md, PODCAST_WORKFLOW.md, SOURCE_CLASSIFICATION.md)
- [x] 09-02-PLAN.md — PubMed URL backfill SQL + Phase 3 live UI verification (EVID-03)

---

#### Phase 10: pairing-sql-reconciliation
**Goal**: Audit all existing pairing SQL and review cards for podcast contamination, then regenerate the canonical/common INSERT file from Chris's reviewed cards with podcast attribution scrubbed from all production fields.
**Depends on**: Phase 9 (two-layer model defined before reconciliation can apply it)
**Requirements**: POD-04, PAIR-01, PAIR-02, PAIR-03
**Success Criteria** (what must be TRUE):
  1. All 37 review cards audited for podcast attribution (speaker, show, episode) in production fields — contamination findings documented
  2. 06-02-canonical-common-inserts.sql regenerated from Chris's approved pairing cards with no raw podcast references in any production field
  3. Sculptra pair tier decisions re-evaluated against Chris's actual feedback — any previous session's overcorrection is documented and corrected
  4. All 37 review cards confirmed clean: podcast-derived IDEAS preserved, podcast ATTRIBUTION removed from rationale/patient_education/staff_talking_points fields
**Plans:** 2 plans

Plans:
- [x] 09-01-PLAN.md — Evidence model documentation (EVIDENCE_MODEL.md, PODCAST_WORKFLOW.md, SOURCE_CLASSIFICATION.md)
- [x] 09-02-PLAN.md — PubMed URL backfill SQL + Phase 3 live UI verification (EVID-03)

---

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 01. citations | v1.0 | 3/3 | Complete | 2026-06-12 |
| 02. dossier-batch | v1.0 | 6/6 | Complete | 2026-06-12 |
| 03. retrieval-wiring | v1.0 | 3/4 | In progress | - |
| 04. source-ingestion | v1.0 | 2/2 | Complete | 2026-06-13 |
| 05. concern-language | v1.0 | 3/3 | Complete | 2026-06-13 |
| 06. pairing-engine | v1.0 | 5/5 | Complete | 2026-06-13 |
| 07. timing-rules | v1.0 | 2/2 | Complete | 2026-06-13 |
| 08. execution-manifest-and-validation | v1.1 | 2/2 | Complete    | 2026-06-14 |
| 09. podcast-data-strategy-and-evidence-provenance | v1.1 | 2/2 | Complete   | 2026-06-14 |
| 10. pairing-sql-reconciliation | v1.1 | 0/TBD | Not started | - |
