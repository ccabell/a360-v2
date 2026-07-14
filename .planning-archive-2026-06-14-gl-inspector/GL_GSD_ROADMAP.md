# Global Library — Full GSD Roadmap

The entirety of the GL project, phased for GSD planning. Each phase below is intended to become its own GSD phase folder (CONTEXT → RESEARCH → PLANs → VALIDATION). Phases 01–03 bracket the June 22 demo; everything after is sequenced by dependency, not by calendar.

The shape of the whole project in one line: **product intelligence → concern language → pairings → timing → combinations → care plans → compiled agent fuel → hardening & scale.** Each layer feeds the next; none should be started before its dependency is reviewable.

---

## In flight / demo-critical

### Phase 01 — citations  *(IN EXECUTION)*
Fix evidence_links data gaps (PubMed PMIDs, FDA URLs, YouTube timestamps) + compile-pipeline locator capture.
**Depends on:** nothing. **Status:** plans 01-01..03 written, executing.

### Phase 02 — dossier-batch  *(EXECUTING NEXT — this is the batch you're about to run)*
20 products × 3 lenses (sales_education primary, gateway posture on clinical) + **source logging addendum** + **structured emission addendum** (item_concerns, item_body_areas, aliases, does_not_solve).
**Depends on:** nothing (runs parallel to 01). **Deliverables:** 20 reviewable dossiers; populated concern/anatomy/alias layers; source_registry + ingestion_queue map; TAXONOMY_ADDITIONS + STRUCTURED_COVERAGE reports.
**Success criteria:** every product has ≥1 doc per lens in agent_reference_docs; no product with zero item_concerns / item_body_areas; FDA-indicated mappings all label-backed; Chris has reviewed taxonomy additions.

### Phase 03 — retrieval-wiring  *(DEMO BLOCKER — plan immediately)*
Wire the M6 Research/Evidence tab from mock data to real evidence_links + agent_reference_docs. Build the minimal retrieval route per RETRIEVAL_SERVICE.md: question → retrieval → RetrievedSource objects → existing citation UI.
**Depends on:** 01 (clean citation data), 02 (real dossier content to retrieve).
**Success criteria:** unscripted Botox/Neurotoxins question in the live UI renders prose with clickable PubMed + FDA citations from the real DB. This is the demo.

> **June 22 demo = Phases 01 + 02 + 03 complete.** Everything below is post-demo.

---

## Post-demo: the intelligence build-out (dependency order)

### Phase 04 — source-ingestion
Walk the map Phase 02 captured: review source_registry (status='review'), verify rights_class, promote to active, bulk-ingest ingestible sources (FDA/DailyMed public domain; CC-BY society journals; manufacturer-permitted) into the CMS vector corpus through the existing ingestion pipeline. Includes the laser journal and everything discovery logged.
**Depends on:** 02 (the captured registry). **Runs parallel to** 05.
**Success criteria:** ingestion_queue items either ingested or explicitly rejected with reason; corpus searchable; next compile finds new sources in-corpus.

### Phase 05 — concern-language
Mine the 122 consultation transcripts, Sales Excellence Framework, and coaching playbooks for real patient language at scale. Massively expand `aliases`; add legitimate missing concerns; build the concern-cluster groupings from the enrichment doc (tired look, lower-face heaviness, post-weight-loss laxity...). This is the layer the enrichment doc calls the missing piece behind better sales content.
**Depends on:** 02 (taxonomy conventions established). **Runs parallel to** 04.
**Success criteria:** every concern has ≥3 patient-language aliases; concern clusters defined; concern-first routing demo-able ("I look tired" → candidate mechanisms → products).

### Phase 06 — pairing-engine
The dedicated `item_relationships` build. Generate within-catalog pairing candidates, run each through the 8-gate legitimacy test (concern, mechanism, limitation, timing, safety, commercial, patient clarity, source support), score, tier (canonical/common/conditional/compatible_only/do_not_market/rejected), and emit draft relationship rows with clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points. Human review gates publication.
**Depends on:** 02 (product intelligence + does_not_solve), 05 (concern routing). **Key input:** does_not_solve — "what A doesn't solve" is "why B joins."
**Success criteria:** all 190 possible pairs among 20 products explicitly tiered (most rejected — that's correct); canonical/common pairs reviewed; zero forced pairings.

### Phase 07 — timing-rules
Promote timing from prose to queryable data: product-level cadence (largely exists in products interval columns — audit + fill), category-level patterns, relationship-level same-day/staged rules (extends Phase 06 rows), event-timing logic (weddings, vacations). Commercial default: same-day when clinically feasible, always with staging exceptions + provider-assessment language.
**Depends on:** 02, 06. **Schema note:** decide here whether relationship timing fields suffice or a small gl_timing_rules table is warranted (GSD research question).
**Success criteria:** booking-logic agent can answer "can these be same-day?" and "work backward from a date 10 weeks out" from structured data alone.

### Phase 08 — combination-intelligence
Deep content for the canonical/common pairings that survived Phase 06: the full Combination Intelligence Template (package name, one-line positioning, A-solves/A-doesn't/B-adds, staff close, objection handling, do-not-say). The "Full Face Refresh" layer.
**Depends on:** 06, 07. **Success criteria:** every canonical pairing has reviewed combination content in agent_reference_docs/agent_fuel_documents; spot-check passes the "would trained staff actually say this" test.

### Phase 09 — care-plan-modules
Concern-based phased plans (foundation → corrective → optimization → maintenance) assembled from product intelligence + pairings + timing. The long-arc "sell care through education" layer.
**Depends on:** 05, 06, 07, 08. **Success criteria:** top ~10 concern clusters each have a reviewable care-plan module an agent can personalize.

### Phase 10 — agent-fuel-compilation
Compile everything into denormalized runtime packets in agent_fuel_documents: product_fuel, pairing_fuel (combination), concern fuel, education fuel — one compact packet per entity so runtime agents never assemble 30 fields across 10 tables. Define recompile triggers (source row changes → packet rebuild).
**Depends on:** all of 04–09 (compiles per-entity as upstream phases complete — can run incrementally).
**Success criteria:** every published entity has a current, versioned fuel packet; runtime agents retrieve one packet + optionally one evidence pack, nothing else.

---

## Hardening & scale

### Phase 11 — review-and-governance
Formalize the human-review workflow the enrichment doc specifies: review statuses beyond draft/active (needs_medical_review, needs_commercial_review, needs_compliance_review), reviewer routing, versioning rules (never overwrite approved without a new version), and the safety/compliance auto-flagger (unsupported claims, unsafe timing, forced pairings, generic fluff).
**Depends on:** content volume from 02–09 making ad-hoc review untenable. Can start lightweight earlier.

### Phase 12 — security-hardening (RLS)
Policy-aware RLS across all 30 tables (currently disabled — flagged critical). Tenant model → policies → enable. **Hard gate: must complete before any external/data-room/Boulevard-technical access to the database.** Pulls forward immediately if Boulevard diligence touches the DB.
**Depends on:** nothing technically; sequenced post-demo unless external access pulls it forward.

### Phase 13 — services-expansion
Re-add the 14 services (BBL HERO, Halo, Morpheus8 Face/Body, etc.) through the now-proven pipeline: dossiers + structured emission + pairings + timing + fuel. Services get the device-mechanism storytelling treatment (thin public evidence, rich crafted education, honest cleared-vs-approved framing).
**Depends on:** 02–10 proven on products.

### Phase 14 — catalog-scale-out
Expand beyond the 20-product core toward the 378-product industry catalog, in commercially-prioritized tranches (top 50 first, per the enrichment doc). Same pipeline, now industrialized: the marginal cost per product should be low because sources are in-corpus (04) and the taxonomy/templates are stable.
**Depends on:** everything above; this is the compounding payoff.

---

## Dependency map

```
01 citations ─────────────┐
02 dossier-batch ─────────┼──► 03 retrieval-wiring ──► [JUNE 22 DEMO]
        │
        ├──► 04 source-ingestion ──────────────┐
        ├──► 05 concern-language ──┐           │
        └──► 06 pairing-engine ◄───┘           ├──► 10 fuel-compilation
                  │                            │
                  ├──► 07 timing-rules ─┐      │
                  └──► 08 combination ◄─┴──────┤
                            │                  │
                            └──► 09 care-plans─┘
                                       
11 governance / 12 RLS (gate for external access) / 13 services / 14 scale-out
```

## Suggested GSD planning order (what to draft next, in tandem with executing 02)

1. **Phase 03 context+plans now** — it's the remaining demo blocker and has a written spec (RETRIEVAL_SERVICE.md) to plan against.
2. **Phase 06 context next** — pairings are the highest-value post-demo phase and the 8-gate test needs translating into a concrete plan while the enrichment doc is fresh.
3. **Phases 04 + 05 contexts** — both are parallel-safe, well-bounded, and their inputs (registry, transcripts) already exist.
4. Phases 07–10 plan themselves more easily once 06's schema decisions are made — draft contexts only, hold plans.
5. Keep 12 (RLS) as a written, ready-to-pull-forward phase — the trigger is "Boulevard touches the DB," not a date.
