# Roadmap: A360 Global Library

## Milestones

- [x] **v1.0 Foundation** - Phases 01-07 (shipped 2026-06-13)
- [ ] **v1.1 Pipeline Integrity & Data Strategy** - Phases 08-10 (in progress)
- [ ] **v1.2 Evidence Sources & Agent Fuel** - Phases 11-14 + 11.1 (planned — source framework, fuel doc templates & UI, combination fuel, concern fuel, compiled packets)
- [ ] **v2.0 Agent Runtime Inspector** - Phases 15-19 (planned — runtime stabilization, trace contract, inspector UI, output viewer, demo mode)

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

### v1.1 Pipeline Integrity & Data Strategy (Complete)

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
**Plans:** 2/2 plans complete

Plans:
- [x] 10-01-PLAN.md — Contamination audit of 37 review cards + Sculptra tier re-evaluation + Chris light-revision feedback
- [x] 10-02-PLAN.md — Regenerate all three 06-02 SQL files from clean review cards + update EXECUTION_MANIFEST.json

---

### v1.2 Evidence Sources & Agent Fuel

**Milestone Goal:** Build the evidence source framework and agent fuel intelligence layer. Sources and fuel are separate concepts: sources are raw authoritative material (IFUs, FDA labels, PubMed, manufacturer data, industry articles) searchable in vector DBs; fuel is curated agent-ready intelligence derived from sources. Agents use tools at runtime to search sources for edge cases beyond fuel doc coverage. Framework supports ongoing enrichment as new data is added.

#### Phase 11: source-framework-and-v1.1-closeout
**Goal**: Get the evidence source infrastructure right — source types classified with what each is good for, enrichment pipeline documented as repeatable loop. Close v1.1 carry-forward items.
**Depends on**: Phase 10 (v1.1 complete)
**Requirements**: SRCE-01, SRCE-02, SRCE-03, SRCE-04, CFRW-01
**Success Criteria** (what must be TRUE):
  1. SOURCE_CLASSIFICATION.md revised: source types classified with practical guidance on what each is good for (FDA=safety/dosing, PubMed=clinical evidence, manufacturer=product education, industry=context/trends, podcasts=research only)
  2. Citation format defined per source type (PubMed: PMID/DOI, YouTube: URL+timestamp, IFU: page reference, etc.)
  3. Enrichment pipeline documented as repeatable loop: add source → classify → chunk → vector DB → mark affected fuel docs for review
  4. Manufacturer data accessible and searchable for agent tools at runtime
  5. All v1.1 carry-forward items resolved (PAIR-01 verified, EVID-03 browser test, TIMING_REVIEW.md closed, SQL manifest executed)

Plans:
- [x] 11-01-PLAN.md — v1.1 close-out: verify PAIR-01, EVID-03 browser test, TIMING_REVIEW.md closure, SQL manifest execution
- [x] 11-02-PLAN.md — Source classification update: revise SOURCE_CLASSIFICATION.md with practical source-type guidance + citation formats
- [x] 11-03-PLAN.md — Enrichment pipeline design: repeatable loop for ingesting new sources into vector DBs

---

#### Phase 11.1: fuel-doc-templates-and-management-ui (INSERTED)
**Goal**: Build expanded fuel doc templates (combination, concern, product) with logically grouped fields — including SOPs, preferences, room requirements — and a simple internal management UI for creating, viewing, editing, and managing fuel doc templates and content. Templates define the MD file structure that agents consume; UI sits on top for internal use now, iterates into product later. Promotes backlog 999.1.
**Depends on**: Phase 11 (source framework established)
**Requirements**: FUEL-TPL-01, FUEL-TPL-02, FUEL-UI-01, FUEL-UI-02, FUEL-SER-01, FUEL-INT-01
**Success Criteria** (what must be TRUE):
  1. Fuel doc templates defined for 3 document types (combination, concern, product) with logically grouped field sections
  2. Templates include operational fields (SOPs, preferences, room requirements) alongside clinical/intelligence fields
  3. Internal management UI allows CRUD operations on fuel doc templates and content
  4. Practice-level override support (COALESCE pattern) wired into UI
  5. Template system produces MD files consumable by agents
  6. UI deployable as internal tool (not production-facing yet)
**Plans:** 3/3 plans complete

Plans:
- [x] 11.1-01-PLAN.md — Types + data access layer + markdown serializer (foundation)
- [x] 11.1-02-PLAN.md — API routes + sidebar entry + migration SQL
- [x] 11.1-03-PLAN.md — List page with DataTable, create dialog, filters, badges
- [ ] 11.1-04-PLAN.md — Detail page with 6 tabs + visual verification checkpoint

---

#### Phase 12: combination-fuel-documents
**Goal**: Enrich the 16 existing pairing fuel docs in `gl_agent_fuel_documents` with corpus-grounded content. Fuel docs are what agents should say — sources are what backs it up. Use PubMed + manufacturer data + corpus as research inputs.
**Depends on**: Phase 11 (source framework), Phase 6 (pairings), Phase 7 (timing). Chris manufacturer doc population running in parallel.
**Requirements**: COMBO-01, COMBO-02, COMBO-03, COMBO-04, COMBO-05
**Success Criteria** (what must be TRUE):
  1. Every canonical/common pairing has enriched fuel doc with corpus-grounded content (why together, how to explain, timing, what not to say, patient questions, evidence backing)
  2. Content sounds like what trained staff would actually say — education tone, not sales pitch
  3. What-not-to-say populated for every combination
  4. Fuel doc schema supports practice-level overrides (COALESCE pattern)
  5. Unified JSON format across all 16 fuel docs

Plans:
- [x] 12-01-PLAN.md — Fuel doc schema: unify 2 existing JSON formats, define template, design practice-override structure
- [ ] 12-02-PLAN.md — Content generation: mine corpus + generate fuel doc content for canonical/common pairings
- [ ] 12-03-PLAN.md — Review queue assembly + Chris review checkpoint

---

#### Phase 13: concern-fuel-documents
**Goal**: Build concern-based fuel docs for top 10 concern clusters. Same approach as Phase 12 — corpus-grounded, practical, enrichable later.
**Depends on**: Phase 12 (combination content to reference), Phase 5 (concern clusters), Phase 7 (timing)
**Requirements**: CARE-01, CARE-02, CARE-03, CARE-04
**Success Criteria** (what must be TRUE):
  1. 10 concern clusters each have a fuel doc with treatment arc (what patients say, what's happening, options that help, options that don't, timeline, evidence)
  2. Treatment arcs grounded in corpus evidence, not LLM-invented
  3. Documents reference Phase 12 combination fuel where applicable
  4. In-scope and out-of-scope treatment boundaries defined per concern

Plans:
- [ ] 13-01-PLAN.md — Prioritize top 10 concern clusters + corpus mining for treatment arc patterns
- [ ] 13-02-PLAN.md — Content generation: concern fuel docs for top 10 clusters
- [ ] 13-03-PLAN.md — Review queue + Chris review checkpoint

---

#### Phase 14: compiled-fuel-packets
**Goal**: Compile all intelligence into denormalized runtime packets (2-5K tokens each). Derived caches, not canonical sources — must remain traceable. Framework allows recompilation as new data is added.
**Depends on**: Phases 12-13. Can start incrementally (product packets first).
**Requirements**: FUEL-01, FUEL-02, FUEL-03, FUEL-04, FUEL-05
**Success Criteria** (what must be TRUE):
  1. Every enriched entity has a versioned fuel packet
  2. Single-packet retrieval pattern: one packet + optional evidence pack
  3. Recompile triggers defined: new source or fuel update marks packet stale
  4. All packets within 2-5K token budget
  5. Framework allows recompilation as new data enters the system

Plans:
- [ ] 14-01-PLAN.md — Packet schema + recompile trigger mapping + stale-flag mechanism
- [ ] 14-02-PLAN.md — Product packets (18 products) + concern packets (10 clusters)
- [ ] 14-03-PLAN.md — Combination packets + TypeScript query helpers + coverage report

---

### v2.0 Agent Runtime Inspector

**Milestone Goal:** Replace the 100% mock agent-tester page with a real in-project runtime (Next.js API routes + Supabase + Claude API). Every agent run emits structured trace events that stream live to an inspector UI and persist for replay. The page becomes a functional tool for running, observing, and demoing agents against real patient data.

#### Phase 15: runtime-stabilization
**Goal**: Make the existing agent-tester page actually work before adding trace infrastructure. Fix agent loading, prompt loading, output streaming, error handling, and run persistence so the tool is genuinely functional end-to-end.
**Depends on**: Phase 14 (compiled fuel packets provide runtime inputs)
**Requirements**: RUN-01, RUN-02, RUN-03, RUN-04, RUN-05
**Success Criteria** (what must be TRUE):
  1. Selecting an agent and clicking Run executes a real Claude API call using the agent's active version prompt from Agent Manager Supabase — no mock data, no pickScenario, no setTimeout
  2. Tool calls against real data sources (patient context from PR Supabase, fuel docs and evidence links from Agent Manager, clinical literature from CMS Supabase, product info from Agent Manager) succeed and return populated results
  3. When a tool fails, the run continues with remaining tools and the failed step is marked with a structured error message identifying what failed and why
  4. Every completed or failed run is saved to `agent_runs` in Agent Manager Supabase — the run is never lost
  5. A run never ends with only "No output generated" — a structured error always identifies which step failed, what completed successfully, and what action is recommended
**Plans:** 1/2 plans complete

Plans:
- [x] 15-01-PLAN.md — Backend runtime: API route + tool implementations + executor (SSE streaming, 5 tools, run persistence)
- [ ] 15-02-PLAN.md — Frontend page rewrite: agent/patient selectors + SSE consumer + live output display

---

#### Phase 16: trace-contract-and-persistence
**Goal**: Add the structured event contract that makes every run fully observable and replayable. Define the AgentRunEvent schema, create the `agent_run_events` and `agent_run_artifacts` tables, wire SSE emission throughout the runtime, and validate that completed runs replay correctly from stored events.
**Depends on**: Phase 15 (stable runtime to instrument)
**Requirements**: TRACE-01, TRACE-02, TRACE-03, TRACE-04, OBS-01, OBS-02
**Success Criteria** (what must be TRUE):
  1. Every major runtime step (run start, agent load, patient load, context build, tool call start/complete/fail, retrieval, model call, artifact creation, output save, run complete/fail) emits a structured AgentRunEvent with consistent schema
  2. Events stream to the browser over SSE and render as they arrive — the UI updates step-by-step without waiting for the final answer
  3. All events persist to `agent_run_events` and all artifacts to `agent_run_artifacts` in Agent Manager Supabase
  4. A completed run can be fully replayed from stored events without rerunning the model or any tools
  5. Run metrics are computable from stored events: total duration, time to first event, tool call count, success/fail counts, token usage, source count, artifact count
  6. Observable trace only — tool inputs/outputs, retrieved context, model-visible messages, generated tokens, artifacts, errors — no hidden chain-of-thought exposed
**Plans**: TBD

---

#### Phase 17: inspector-ui
**Goal**: Build the left-panel execution timeline and detail drawer that make the trace data readable and explorable. Each event is a card in a vertical timeline; clicking opens a multi-tab detail drawer with tool-specific readable views.
**Depends on**: Phase 16 (event schema and SSE stream defined)
**Requirements**: UI-01, UI-02, UI-03
**Success Criteria** (what must be TRUE):
  1. Left panel shows a live vertical timeline as events arrive — each step has a status icon (pending/running/success/fail/warning), step title, tool name where applicable, duration, and a one-line summary
  2. Clicking any timeline step opens a detail drawer with tabs: Summary, Input, Output, Sources, Raw JSON, Errors, Timing — populated from the event's stored data
  3. Tool calls render as readable cards (not raw JSON blobs) with tool-specific layouts: `get_patient_context` shows patient fields, `search_fuel_documents` shows result count and top items with source/fuel distinction, `get_evidence_links` shows citation list, `search_clinical_literature` shows CMS results with similarity scores, `get_product_info` shows product fields
  4. Timeline updates in real-time during a live run and shows final state after run completes
**Plans**: TBD
**UI hint**: yes

---

#### Phase 18: output-viewer
**Goal**: Build the universal output viewer that renders agent output in the most useful format for its content type — markdown, JSON, table, care plan, evidence list — with tabs for raw view, citation sources, and save status.
**Depends on**: Phase 17 (inspector UI provides the container)
**Requirements**: UI-04
**Success Criteria** (what must be TRUE):
  1. Agent output renders in the correct format detected from content type: markdown prose renders with formatting, JSON renders as collapsible tree, tabular data renders as a sortable table, care plan renders as structured sections, evidence list renders as citation cards with links
  2. Plain text fallback renders when content type cannot be detected
  3. Output tabs available: Rendered (formatted view), Raw (exact model output), Citations/Sources (list of sources the output draws from), Save status (whether output was persisted to agent_run_artifacts)
  4. Viewer works for both live streaming output and replayed historical runs
**Plans**: TBD
**UI hint**: yes

---

#### Phase 19: demo-mode
**Goal**: Add seeded demo scenarios, run mode selector (Live / Replay / Load Demo Run), and "why this matters" plain-English labels on major steps so non-engineer demo audiences can follow what the runtime is doing and why it matters.
**Depends on**: Phase 17 (inspector UI), Phase 18 (output viewer)
**Requirements**: DEMO-01, DEMO-02, DEMO-03
**Success Criteria** (what must be TRUE):
  1. Page includes at least one seeded demo scenario (Sofia Reyes + Consultation Analyst) that loads a known-good patient and agent with one click — no manual configuration required
  2. Run mode selector shows three options: Live (execute against real API), Replay (replay from stored events), Load Demo Run (load a pre-seeded demo run) — switching modes updates the UI accordingly
  3. Every major timeline step has a plain-English "why this matters" label visible in the detail drawer — labels explain the step's purpose for a non-engineer audience (e.g., "Loading the agent's trained behavior and prompt" not "fetching active_version_id")
  4. Demo mode can be run without provisioned patient data — seeded scenarios include all required context
**Plans**: TBD
**UI hint**: yes

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
| 08. execution-manifest-and-validation | v1.1 | 2/2 | Complete | 2026-06-14 |
| 09. podcast-data-strategy-and-evidence-provenance | v1.1 | 2/2 | Complete | 2026-06-14 |
| 10. pairing-sql-reconciliation | v1.1 | 2/2 | Complete | 2026-06-14 |
| 11. source-framework-and-v1.1-closeout | v1.2 | 3/3 | Complete   | 2026-06-14 |
| 11.1 fuel-doc-templates-and-management-ui | v1.2 | 3/4 | In Progress|  |
| 12. combination-fuel-documents | v1.2 | 1/3 | In Progress|  |
| 13. concern-fuel-documents | v1.2 | 0/3 | Not started | - |
| 14. compiled-fuel-packets | v1.2 | 0/3 | Not started | - |
| 15. runtime-stabilization | v2.0 | 1/2 | In Progress | - |
| 16. trace-contract-and-persistence | v2.0 | 0/? | Not started | - |
| 17. inspector-ui | v2.0 | 0/? | Not started | - |
| 18. output-viewer | v2.0 | 0/? | Not started | - |
| 19. demo-mode | v2.0 | 0/? | Not started | - |

---

## Backlog

#### ~~Phase 999.1: agent-fuel-document-management-ui~~ (PROMOTED -> Phase 11.1)
**Goal**: Build a template system for agent fuel documents with a practice-facing UI for managing them. Templates define the standard structure per document type (combination, concern, product); the UI sits on top so practices can view, edit, and override fuel docs without touching the database directly. This is the missing layer between the raw fuel doc data (Phases 12-14) and the agents that consume them.
**Key pieces**:
  1. Standardized fuel doc templates per document type (combination, concern, product) — defining sections like why-together, timing, what-not-to-say, patient questions, evidence backing
  2. CRUD UI for viewing/editing fuel docs with practice-level overrides (COALESCE pattern already designed in gl/pl schema)
  3. Review/approval workflow so practice edits go through QC before agents consume them
  4. Fuel docs become first-class managed entities rather than opaque DB rows
**Requirements**: TBD
**Plans:** 3/3 plans complete

Plans:
- [ ] TBD (promote with /gsd:review-backlog when ready)
