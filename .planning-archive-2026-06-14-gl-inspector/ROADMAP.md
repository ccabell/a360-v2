# Roadmap: A360 Evidence Ask & Global Library

## Milestones

- [x] **v1.0 Citations & Retrieval / Foundation** - Phases 1-7 (shipped 2026-06-13)
- [x] **v1.1 Pipeline Integrity & Data Strategy** - Phases 08-10 (complete)
- [ ] **v1.2 Evidence Sources & Agent Fuel** - Phases 11-14 + 11.1 (planned)
- [ ] **v2.0 Heidi Evidence Clone + Agent Runtime Inspector** - Phases 4-7 (Evidence Ask, complete) + Phases 15-19 (Agent Runtime, in progress)

## Phases

<details>
<summary>v1.0 Citations & Retrieval (Phases 1-3) — SHIPPED 2026-06-12</summary>

### Phase 1: citations
**Goal**: Fix evidence_links data gaps (pmid null, url empty, no page_number column, YouTube timestamps missing) and update the compile pipeline to always capture citation locators going forward.
**Depends on**: Nothing
**Plans**: 3/3 complete

Plans:
- [x] 01-01: Schema migration (page_number column) + PubMed PMID backfill + YouTube timestamp backfill
- [x] 01-02: FDA Access Data URL research + FDA URL backfill for 47 evidence_links rows
- [x] 01-03: Compile pipeline doc update + demo verification checkpoint

---

### Phase 2: dossier-batch
**Goal**: Compile dossiers for 20 demo products with structured intelligence emission and source capture.
**Depends on**: Phase 1
**Plans**: 6/6 complete

Plans:
- [x] 02-01: Schema migration (does_not_solve column) + authority_rank backfill + product list discovery
- [x] 02-02: Compile 6 remaining category dossiers
- [x] 02-03: Compile HA Filler product dossiers
- [x] 02-04: Compile Biostimulator + Body Contouring product dossiers
- [x] 02-05: Compile Energy/RF + Energy/Laser + Skincare Actives + Dysport product dossiers
- [x] 02-06: End-of-batch reports

---

### Phase 3: retrieval-wiring
**Goal**: Wire the Research/Evidence tab from mock data to real evidence_links + agent_reference_docs.
**Depends on**: Phase 1, Phase 2
**Plans**: 4/4 complete

Plans:
- [x] 03-01: Wave 0 prep + env verification
- [x] 03-02: Retrieval engine: sources.ts + SSE route
- [x] 03-03: Client cutover: stream.ts + swap mock import
- [x] 03-04: End-to-end live UI verification

</details>

---

<details>
<summary>v1.0 Foundation (Phases 04-07) — SHIPPED 2026-06-13</summary>

### Phase 4: source-ingestion
**Goal**: Triage the source_registry map from Phase 2, ensure all products link to their FDA source documents via evidence_links.
**Depends on**: Phase 2
**Plans:** 2/2 plans complete

Plans:
- [x] 04-01-PLAN.md — Audit live DB state + triage source_registry and ingestion_queue
- [x] 04-02-PLAN.md — Download FDA PDFs to Supabase Storage + backfill evidence_links FDA URLs

---

### Phase 5: concern-language
**Goal**: Mine consultation transcripts and coaching playbooks for real patient language at scale.
**Depends on**: Phase 2
**Plans:** 3/3 plans complete

Plans:
- [x] 05-01-PLAN.md — DB prep + create concern_clusters tables + add missing concerns
- [x] 05-02-PLAN.md — Mine 122 transcripts for patient concern language + emit alias SQL
- [x] 05-03-PLAN.md — Populate 4 concern clusters + run routing demo query

---

### Phase 6: pairing-engine
**Goal**: Generate within-catalog pairing candidates, run through 8-gate legitimacy test, score, tier, and emit draft item_relationships rows.
**Depends on**: Phase 2, Phase 5
**Plans:** 5/5 plans complete

Plans:
- [x] 06-01-PLAN.md — Foundation: schema migration + PAIRING_RUBRIC.md
- [x] 06-02-PLAN.md — SQL pre-screen: enumerate all 153 pairs
- [x] 06-03-PLAN.md — Corpus-first 8-gate evaluation for all 153 pairs
- [x] 06-04-PLAN.md — DB emission: write + execute item_relationships INSERTs
- [x] 06-05-PLAN.md — Review artifacts + Chris review checkpoint

---

### Phase 7: timing-rules
**Goal**: Promote timing from prose to queryable data.
**Depends on**: Phase 2, Phase 6
**Plans:** 2/2 plans complete

Plans:
- [x] 07-01-PLAN.md — Schema migration + product cadence UPDATEs
- [x] 07-02-PLAN.md — Pair timing UPDATEs + TIMING_REVIEW.md

</details>

---

### v1.1 Pipeline Integrity & Data Strategy (Complete)

**Milestone Goal:** Fix operational gaps exposed during v1.0.

#### Phase 8: execution-manifest-and-validation
**Plans:** 2/2 complete
- [x] 08-01-PLAN.md — Build EXECUTION_MANIFEST.json
- [x] 08-02-PLAN.md — Create 7 phase validation SQL files

---

#### Phase 9: podcast-data-strategy-and-evidence-provenance
**Plans:** 2/2 complete
- [x] 09-01-PLAN.md — Evidence model documentation
- [x] 09-02-PLAN.md — PubMed URL backfill SQL

---

#### Phase 10: pairing-sql-reconciliation
**Plans:** 2/2 complete
- [x] 10-01-PLAN.md — Contamination audit
- [x] 10-02-PLAN.md — Regenerate SQL files from clean review cards

---

### v2.0 Heidi Evidence Clone (Complete)

**Milestone Goal:** Adapt Heidi Evidence Ask's proven UX patterns to A360's cool-tone brand — demo-ready by June 22, 2026.

#### Phase 4: answer-structure
**Requirements**: ANS-01, ANS-02, ANS-03, ANS-04
**Plans**: 2/2 complete

Plans:
- [x] 04-01-PLAN.md — KeyPointsCard + shared citation parser + KEY_POINTS extraction + h3 heading upgrade
- [x] 04-02-PLAN.md — MarkdownTable component + table detection in AnswerMessage + visual checkpoint

---

#### Phase 5: source-display
**Requirements**: SRC-01, SRC-02, SRC-03, SRC-04, SRC-05
**Plans**: 2/2 complete

Plans:
- [x] 05-01-PLAN.md — Tier color OKLch tokens + source count bar with View sources toggle
- [x] 05-02-PLAN.md — Reliable badge + category pill on citation cards

---

#### Phase 6: embed-and-analytics
**Requirements**: EMB-01, EMB-02, EMB-03, EMB-04, ANLY-01, ANLY-02, ANLY-03
**Plans**: 2/2 complete

Plans:
- [x] 06-01-PLAN.md — Analytics event instrumentation
- [x] 06-02-PLAN.md — CSP frame-ancestors hardening, Boulevard allowlist

---

#### Phase 7: trust-interaction-demo
**Requirements**: TRST-01, TRST-02, TRST-03, INTR-01, INTR-02, DEMO-01
**Plans**: 3/3 complete

Plans:
- [x] 07-01-PLAN.md — Trust surface audit
- [x] 07-02-PLAN.md — Interaction polish: follow-up pill A360 brand styling
- [x] 07-03-PLAN.md — DEMO-01 end-to-end acceptance test

---

### v1.2 Evidence Sources & Agent Fuel (In Progress)

**Milestone Goal:** Build the evidence source framework and agent fuel intelligence layer.

#### Phase 11: source-framework-and-v1.1-closeout
**Plans:** 3/3 complete
- [x] 11-01-PLAN.md — v1.1 close-out
- [x] 11-02-PLAN.md — Source classification update
- [x] 11-03-PLAN.md — Enrichment pipeline design

---

#### Phase 11.1: fuel-doc-templates-and-management-ui (INSERTED)
**Plans:** 4/4 complete
- [x] 11.1-01-PLAN.md — Types + data access layer + markdown serializer
- [x] 11.1-02-PLAN.md — API routes + sidebar entry + migration SQL
- [x] 11.1-03-PLAN.md — List page with DataTable, create dialog, filters
- [x] 11.1-04-PLAN.md — Detail page with 6 tabs

---

#### Phase 12: combination-fuel-documents
**Plans:** 2/3 in progress
- [x] 12-01-PLAN.md — Fuel doc schema unification
- [x] 12-02-PLAN.md — Content generation for canonical/common pairings
- [ ] 12-03-PLAN.md — Review queue assembly + Chris review checkpoint

---

#### Phase 13: concern-fuel-documents
**Plans:** 0/3 not started

#### Phase 14: compiled-fuel-packets
**Plans:** 0/3 not started

---

### v2.0 Agent Runtime Inspector (In Progress)

**Milestone Goal:** Replace mock agent-tester page with real in-project runtime.

#### Phase 15: runtime-stabilization
**Requirements**: RUN-01 through RUN-05
**Plans:** 1/2 in progress

Plans:
- [x] 15-01-PLAN.md — Backend runtime: API route + tool implementations + executor
- [ ] 15-02-PLAN.md — Frontend page rewrite

---

#### Phase 16-19: trace-contract, inspector-ui, output-viewer, demo-mode
**Status**: Not started

---

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 01. citations | v1.0 | 3/3 | Complete | 2026-06-12 |
| 02. dossier-batch | v1.0 | 6/6 | Complete | 2026-06-12 |
| 03. retrieval-wiring | v1.0 | 4/4 | Complete | 2026-06-12 |
| 04. source-ingestion | v1.0 | 2/2 | Complete | 2026-06-13 |
| 05. concern-language | v1.0 | 3/3 | Complete | 2026-06-13 |
| 06. pairing-engine | v1.0 | 5/5 | Complete | 2026-06-13 |
| 07. timing-rules | v1.0 | 2/2 | Complete | 2026-06-13 |
| 08. execution-manifest | v1.1 | 2/2 | Complete | 2026-06-14 |
| 09. podcast-data-strategy | v1.1 | 2/2 | Complete | 2026-06-14 |
| 10. pairing-reconciliation | v1.1 | 2/2 | Complete | 2026-06-14 |
| 11. source-framework | v1.2 | 3/3 | Complete | 2026-06-14 |
| 11.1 fuel-doc-templates | v1.2 | 4/4 | Complete | 2026-06-14 |
| 12. combination-fuel | v1.2 | 2/3 | In Progress | |
| 4. answer-structure | v2.0-EA | 2/2 | Complete | 2026-06-14 |
| 5. source-display | v2.0-EA | 2/2 | Complete | |
| 6. embed-analytics | v2.0-EA | 2/2 | Complete | |
| 7. trust-interaction | v2.0-EA | 3/3 | Complete | |
| 15. runtime-stabilization | v2.0-RT | 1/2 | In Progress | |
