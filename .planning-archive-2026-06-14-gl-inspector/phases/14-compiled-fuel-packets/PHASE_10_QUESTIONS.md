# Phase 10: Agent Fuel Compilation — Questions for Chris

Answer inline or annotate. Anything left blank = Claude's discretion.

**Context:** Phase 10 compiles everything from Phases 4-9 into denormalized runtime packets in `agent_fuel_documents`. One compact packet per entity so runtime agents never assemble 30 fields across 10 tables.

**Note:** This phase is more technical than content-driven. Questions focus on architecture, not clinical content. Podcast mining is less relevant here — this is about how agents consume the intelligence you've built.

---

## 1. Fuel Packet Architecture

### Q1.1 — What entity types need fuel packets?

- **A.** Products only — one fuel packet per offering
- **B.** Products + concerns — fuel for both entity types
- **C.** Products + concerns + combinations + care plans (full coverage)

**Recommended:** C (each entity type serves a different agent use case)

### Q1.2 — What format for fuel packets?

- **A.** Markdown — human-readable, LLM-friendly, easy to inspect
- **B.** Structured JSON — machine-parseable, consistent, typed
- **C.** Hybrid — markdown prose sections + JSON metadata header

**Recommended:** C (agents need both: structured data for routing/filtering + prose for generation context)

### Q1.3 — How big should a single fuel packet be?

Context window matters — agents load fuel packets at runtime.

- **A.** Compact — under 2K tokens per packet (multiple packets can be loaded)
- **B.** Medium — 2-5K tokens per packet (rich context, fewer concurrent loads)
- **C.** Full — 5-10K tokens per packet (everything an agent could need in one load)
- **D.** Adaptive — compact for simple queries, full for deep research

**Recommended:** B (enough to be useful without consuming the agent's context budget)

---

## 2. Packet Contents

### Q2.1 — What should a product fuel packet contain?

Which intelligence layers roll up into a product's runtime packet?

- [ ] Product identity (name, category, manufacturer, aliases)
- [ ] Clinical summary (indications, mechanism, onset, duration, contraindications)
- [ ] Concerns addressed + does_not_solve
- [ ] Body areas
- [ ] Evidence summary (top evidence_links with URLs)
- [ ] Pairing intelligence (canonical/common pairs from Phase 6)
- [ ] Timing rules (cadence, same-session rules from Phase 7)
- [ ] Staff talking points (from Phase 8 combinations)
- [ ] Care plan role (which plans this product appears in, from Phase 9)
- [ ] Sales education highlights (benefit framing, objection handling)

**Recommended:** All checked, but at summary depth — the fuel packet points to full dossiers, not duplicates them

### Q2.2 — What should a concern fuel packet contain?

- [ ] Concern identity (name, category, aliases, cluster membership)
- [ ] Patient language phrases (from Phase 5)
- [ ] Products that address this concern (with relevance tier)
- [ ] Products that DON'T solve this concern
- [ ] Recommended treatment arc (from Phase 9 care plans)
- [ ] Common patient questions about this concern

**Recommended:** All checked

### Q2.3 — What should a combination fuel packet contain?

- [ ] Combination identity (product A + product B, package name if exists)
- [ ] One-line positioning
- [ ] A-solves / A-doesn't / B-adds
- [ ] Timing/sequencing
- [ ] Staff close language
- [ ] Top 3 objection responses
- [ ] Do-not-say list
- [ ] Maintenance story

**Recommended:** All checked (this IS the Phase 8 combination intelligence template)

---

## 3. Recompile Triggers

### Q3.1 — When should fuel packets be recompiled?

- **A.** Manual — recompile on demand when Chris requests
- **B.** On source change — any update to underlying data triggers recompile for affected entities
- **C.** Scheduled — nightly/weekly batch recompile of all packets
- **D.** Versioned — new version on every source change, old versions retained

**Recommended:** D (versioning is cheap in Supabase and provides audit trail)

### Q3.2 — What source changes should trigger recompile?

- [ ] Evidence link added/updated for an offering
- [ ] Dossier doc (agent_reference_docs) updated
- [ ] Pairing (item_relationships) added/changed
- [ ] Concern mapping (item_concerns) changed
- [ ] Timing rule updated
- [ ] Care plan module updated

**Recommended:** All checked, but as a "dirty flag" system — mark packets as stale, recompile in batch

---

## 4. Runtime Access Pattern

### Q4.1 — How do agents load fuel packets at runtime?

- **A.** Direct Supabase query — agent queries `agent_fuel_documents` by entity type + ID
- **B.** API endpoint — backend serves fuel packets with caching
- **C.** Pre-loaded — agent loads relevant fuel packets at session start based on context

**Recommended:** A for now (direct query is simplest; caching layer can come later)

### Q4.2 — Should fuel packets support "evidence packs" alongside?

The GL_GSD_ROADMAP says: "runtime agents retrieve one packet + optionally one evidence pack, nothing else."

- **A.** Yes — separate evidence_pack document type with full citations for deep dives
- **B.** No — evidence summaries in the fuel packet are sufficient
- **C.** Yes, but only for clinical lens queries (sales_education doesn't need evidence depth)

**Recommended:** C

---

## 5. Deliverables

### Q5.1 — What should Phase 10 produce?

- **A.** Compiled fuel packets for all enriched entities + a recompile script
- **B.** Above + a fuel packet schema/template doc + coverage report
- **C.** Above + runtime query helpers (TypeScript functions for loading packets by entity)

**Recommended:** C

### Q5.2 — Should Phase 10 run incrementally alongside earlier phases?

The GL_GSD_ROADMAP says it "can run incrementally" as upstream phases complete.

- **A.** Yes — compile packets for each entity as its upstream data becomes available
- **B.** No — wait until all upstream phases (4-9) complete, then batch compile
- **C.** Hybrid — compile product packets now (Phase 4-5 data ready), defer combination/care-plan packets until those phases complete

**Recommended:** C

---

## 6. Open-Ended

### Q6.1 — How do current agents (the 42 in a360_agents) consume data today?

Understanding the current access pattern helps design fuel packets that agents can actually use.

### Q6.2 — Are there agent performance issues today related to data loading?

(e.g., agents timing out because they query too many tables, or agents producing poor output because they lack context)

### Q6.3 — Should fuel packets be optimized for a specific model's context window?

(e.g., Haiku 4.5 has smaller context than Opus — should packets have a "lite" variant?)

---

*Phase: 10-agent-fuel-compilation*
*Questions generated: 2026-06-13*
*This phase is more technical than content-driven — podcast mining is less relevant here.*
