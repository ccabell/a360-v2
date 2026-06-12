# Global Library — Multi-Tenant Frontend: Technical Brief

**Date:** 2026-06-12  
**Audience:** Frontend/platform engineers planning the multi-tenant build  
**Purpose:** Orientation document — what this app is, what's being built into it, and what the multi-tenant layer needs to support before that content goes live.

---

## 1. What This Application Is

`a360-v2` is the **Global Library (GL) frontend** — a Next.js 15 App Router application that serves as the intelligence and research layer for A360's medical aesthetics platform. It is NOT a patient-facing product and NOT a practice management tool. It is a **clinician and practitioner research tool** backed by a curated product knowledge base.

The core premise: a clinician asks an unscripted question ("What is the optimal Botox dosing for a full-face case?") and gets back a cited, evidence-grounded answer with FDA label badges, PubMed references, and manufacturer training video links — the same way OpenEvidence works for pharma, but built specifically for medical aesthetics.

**The knowledge base (the Global Library) contains:**
- 378 products across the aesthetics catalog (neurotoxins, fillers, devices, skin care)
- Product facts, dosing ranges, FDA indications, contraindications, relationships, concerns
- Dossiers compiled per product (prose knowledge documents)
- Evidence links: FDA labels, PubMed studies, manufacturer IFUs, YouTube training videos
- ~530K vector-embedded chunks across YouTube (202K), PubMed (37K), Podcasts (202K), Industry (88K) corpora

**Two Supabase projects power it:**
- **Agent Manager** (`aejskvmpembryunnbgrk`) — structured data: products, evidence_links, agent_reference_docs, agent registry, runs, evals
- **CMS** (`gjqicqldjgvrwmtkliie`) — vector corpora: the searchable knowledge chunks

---

## 2. Current Application State

The app is built and running. Key surfaces that exist today:

| Module | Status | Notes |
|--------|--------|-------|
| Research/Evidence tab (M6) | Built, mock data | The main chat UI — prose answers + citation cards + YouTube panel |
| Citation rendering | Built | Inline `[N]` badges, color-coded by authority tier (FDA=amber, PubMed=emerald, Manufacturer=blue, Journal=violet) |
| SSE streaming protocol | Built | Client already handles `status → sources → token → citations → done` events |
| `lib/retrieval/post-process.ts` | Built | Citation resolver: maps `[src_N]` markers to display `[1][2][3]` with full metadata |
| `lib/types/retrieval.ts` | Built | All TypeScript types: `RetrievedSource`, `ResearchCitation`, `ResearchEvent`, `SourceLocator` |
| Grounding components | Built | `GroundedAnswer`, `SourcePill` — render retrieved sources correctly |

**What is NOT real yet:** The research chat is wired to mock data. Phase 3 (currently being planned) replaces the mock with a real hybrid vector+FTS retrieval route. One import swap in `research-chat.tsx` is the cutover point.

---

## 3. What Is Being Built (Active Phases)

### Phase 1 — Citations (COMPLETE)
Backfilled real URLs into `evidence_links`:
- All 29 FDA label rows now have `accessdata.fda.gov` URLs
- 3 PubMed rows have `pubmed.ncbi.nlm.nih.gov` URLs (11 gap — trade journals not in CrossRef, need manual)
- YouTube: 1 of 6 has a timestamp deep-link; 5 pending CMS transcript match
- `page_number INT` column added to `evidence_links` for page-level citation locators

### Phase 2 — Dossier Batch (IN PROGRESS)
Compiling knowledge documents for 20 core demo products across 3 lenses:
- **sales_education** (primary) — how to discuss, present, position
- **gateway_posture** (clinical) — clinical framing, FDA indications, safety
- **clinical** — mechanism, dosing, evidence

Each product produces rows in `agent_reference_docs` (the prose chunks the LLM uses to answer questions) and populates:
- `item_concerns` — patient-language concerns each product addresses
- `item_body_areas` — anatomy coverage
- `aliases` — what patients call it vs. clinical terms
- `does_not_solve` — explicit scope limits (feeds pairing logic later)

A `source_registry` and `ingestion_queue` are being logged for every source encountered during compilation (no ingestion yet — that's Phase 4).

### Phase 3 — Retrieval Wiring (PLANNING NOW — demo blocker)
Replaces the mock research stream with real retrieval. Builds:

1. **`POST /api/retrieval/search`** — Next.js API route that:
   - Embeds the query with ada-002
   - Runs hybrid search (vector + FTS) against `agent_reference_docs` and `evidence_links` in Agent Manager Supabase
   - Fuses results with Reciprocal Rank Fusion (RRF)
   - Queries CMS Supabase for related `manufacturer_youtube_transcript` matches
   - Assembles an LLM prompt with labeled context blocks (`[src_N] (FDA label — BOTOX, p.12) {snippet}`)
   - Streams SSE events via Vercel AI SDK `streamText` using `claude-sonnet-4-6` via Vercel AI Gateway

2. **`lib/retrieval/stream.ts`** — thin client wrapper that calls the route and yields `ResearchEvent` objects matching the mock's exact `AsyncGenerator` signature

3. **Hard cutover** — one import change in `research-chat.tsx` line 12; mock files stay on disk

**Demo success criterion:** An unscripted Botox/Neurotoxins question renders prose with at least one amber FDA badge and one green PubMed badge from the real DB.

---

## 4. The Retrieval Data Flow (for UI architects)

```
User question (text)
    ↓
POST /api/retrieval/search
    ↓
Embed query → ada-002
    ↓
Parallel hybrid search:
  ├─ Agent Manager: agent_reference_docs (vector + FTS, by offering_id/category)
  ├─ Agent Manager: evidence_links (by offering_id match from above)
  └─ CMS: manufacturer_youtube_transcript (vector + FTS, video corpus)
    ↓
RRF fusion → ranked RetrievedSource[] (default finalK=8)
    ↓
LLM prompt (claude-sonnet-4-6, temp ≤ 0.3):
  - System: citation discipline rules
  - Context blocks: [src_1] (corpus — title) {snippet} × N
  - Instruction: cite every factual claim with [src_N] markers
    ↓
SSE stream → client:
  status event → "Searching knowledge base..."
  sources event → RetrievedSource[] (shown in sources panel immediately)
  token events → prose tokens (streamed word by word)
  citations event → resolved ResearchCitation[] (final numbered list)
  done event
    ↓
Post-processor: resolves [src_N] markers → display [1][2][3]
    ↓
UI renders: prose + inline colored badges + citation cards + YouTube thumbnails
```

**Join key throughout:** `offering_id` — the link between `agent_reference_docs`, `evidence_links`, and `gl_products`. This is not claim-level matching; it is product-level. The LLM handles claim-to-citation attribution via `[src_N]` markers.

---

## 5. Citation Authority Tiers (UI color system)

The UI encodes source authority visually. Multi-tenant build must preserve this system:

| Tier | Color | Source values | Example |
|------|-------|--------------|---------|
| FDA | Amber / `#F59E0B` | `fda_label` | BOTOX Prescribing Information 2023 |
| Manufacturer | Blue / `#3B82F6` | `ifu`, `manufacturer`, `youtube` | Allergan Training Manual |
| Research (PubMed) | Emerald / `#10B981` | `pubmed` | Carruthers et al., J Cosm Derm 2022 |
| Journal | Violet / `#8B5CF6` | `journal`, `industry` | J Drugs Derm — Sequencing Consensus |

The `ResearchCitation` type carries `authorityTier: AuthorityTier` — the UI maps this to color; do not hardcode source strings in rendering logic.

---

## 6. What Multi-Tenancy Needs to Support

### 6a. Users and Roles

The platform will serve multiple user types across sessions. At minimum, plan for:

| Role | Access | Can save output? | Notes |
|------|--------|-----------------|-------|
| **Admin / A360 team** | Full — all products, all agents, raw data | Yes | Config, review, enrichment |
| **Tester** | Scoped — assigned products or agent set | Yes — saves go to a review queue | Explicit test mode; outputs flagged |
| **Clinician (practitioner)** | Their practice's catalog + GL knowledge base | Yes — saves go to their session history | Core end-user persona |
| **Practice admin** | Practice-level config, reports | Yes | Manages clinician access |

The testing workflow is important: users will run agents and research queries **deliberately as tests** and need to save, annotate, and review the outputs. This is not just passive usage — it's an evaluation and QA layer baked into the product.

### 6b. Session and Output Persistence

Every AI interaction in this app produces output that needs to be save-able:
- **Research chat answers** — full conversation thread (question + prose + citations) saveable to a named session
- **Agent run outputs** — JSON outputs from any agent (TCP plans, email sequences, coaching reports)
- **Citation snapshots** — the specific `evidence_links` rows that backed a given answer (not just the prose)
- **Test annotations** — a tester should be able to rate an output (thumbs up/down, free-text note, flag for review) without leaving the page

**Storage target:** Agent Manager Supabase. Tables to plan for:
- `saved_sessions` — user, session name, timestamp, question, answer_prose, resolved_citations[]
- `agent_run_outputs` — user, agent_id, input_hash, raw_output JSON, annotation, review_status
- `output_annotations` — user, output_id, rating, note, flagged_for_review, created_at

### 6c. Tenant / Practice Isolation

The GL data is shared (global), but practice-level configuration overrides it via `pl_products` (practice catalog with custom pricing, catalog gates). Multi-tenant means:
- A practice sees the global product knowledge + their practice-specific pricing/catalog
- Query logic: `COALESCE(pl_products.price, gl_products.msrp)` — practice overrides global
- A clinician at Practice A cannot see Practice B's saved sessions, annotations, or run history
- **RLS (Row-Level Security) is currently disabled on Supabase** — this is a known critical gap (Phase 12). The multi-tenant build should assume RLS will be enabled and build tenant-scoped queries from day one, so the RLS policies can be dropped in cleanly.

### 6d. Agent Runner Surface

Beyond the research chat, the UI will surface individual agents that users can run on demand. Each agent:
- Has a defined input form (the assembled context — product, patient, practice)
- Executes against the agent registry (`a360_agents` table, 42 rows)
- Produces a structured JSON output (validated against output schema)
- Should display output in a structured card (not raw JSON) with evidence_refs visible
- Should allow the user to save/annotate the result

The UI should treat every agent run as a first-class object: saved, reviewable, comparable to prior runs of the same agent on the same input. This is the eval loop.

### 6e. Demo Mode vs. Live Mode

The June 22 demo uses a **fixed set of 20 products** against real data. Post-demo, the catalog expands. The UI needs to know which mode it's in:

- **Demo mode:** 20 products, Botox/Neurotoxins as primary test case, no run logging required
- **Live mode:** Full catalog, full logging (`retrieval_runs`, `retrieval_run_chunks`, `citation_violations`), RLS active

Use a practice-level config flag (`demo_mode: boolean`) rather than a build flag — this lets a practice graduate from demo to live without a redeploy.

---

## 7. What the UI Must Be Ready For (Summary Checklist)

- [ ] **Auth:** User login tied to a practice (tenant). One user can belong to one practice.
- [ ] **Role gating:** Tester role can see a "Test Mode" banner and annotation controls not visible to clinicians.
- [ ] **Saved sessions:** Any research chat can be saved with a name; sessions are user-scoped and practice-scoped.
- [ ] **Output annotation:** Inline rating + note on every agent output and research answer.
- [ ] **Agent runner page:** Select agent → provide inputs → run → view structured output → save/annotate.
- [ ] **Practice catalog filter:** Research and agent runs are scoped to the practice's product catalog (the 20 demo products, or whatever `pl_products` returns for this tenant).
- [ ] **Citation persistence:** Saved sessions must snapshot the exact `evidence_links` rows that backed the answer (not just the prose) — these are the auditable citations.
- [ ] **Demo mode badge:** When `demo_mode = true`, a visible banner or badge makes it clear the session is in demo state.
- [ ] **No PHI storage:** Nothing in saved sessions should contain patient data. Research chat is product/procedure-level only. Agent runs that do contain patient context (future) use anonymized patient tokens, not names.
- [ ] **RLS-ready data access:** All queries should include tenant scoping even before RLS is enforced, so enabling RLS is non-breaking.

---

## 8. Technology Stack (this app)

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15, App Router |
| Language | TypeScript |
| UI | MUI v7 (Material UI) |
| State | Zustand |
| Forms | React Hook Form |
| DB client | `@supabase/supabase-js` (two clients: Agent Manager + CMS) |
| AI | Vercel AI SDK, `streamText`, Vercel AI Gateway (`"anthropic/claude-sonnet-4-6"`) |
| Auth | TBD — plan for Supabase Auth (native to the DB) or Clerk |
| Deployment | Vercel |

---

## 9. The Immediate Demo Target (June 22)

Before multi-tenancy is complete, there is a hard demo deadline. The demo is single-tenant (one practice, internal users). Build multi-tenancy in a way that does not block the demo — the research chat, citation UI, and Phase 3 retrieval wiring are the critical path. Multi-tenancy sits on top of a working product, not under it.

Demo success = unscripted Botox question → prose + amber FDA badge + green PubMed badge → all from real DB.

---

*Last updated: 2026-06-12*  
*Owner: A360 Innovation team*  
*Related docs: `RETRIEVAL_SERVICE.md`, `CHAT_CITATION_UI_SPEC.md`, `A360_SYSTEM_MAP.md`, `GL_GSD_ROADMAP.md`*
