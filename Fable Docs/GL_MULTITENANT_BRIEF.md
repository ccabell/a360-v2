# Global Library — Multi-Tenant Frontend: Technical Brief

**Date:** 2026-06-12 (revised)
**Audience:** Frontend/platform engineers planning the multi-tenant build  
**Purpose:** Orientation document — what this app is, what's being built into it, and what the multi-tenant layer needs to support.

> **Correction note (revised after initial draft):** Three errors in the original version have been fixed: (1) UI stack is shadcn/ui, not MUI. (2) Phase 3 retrieval uses full-text search + claude-haiku-4-5, not vector/ada-002 — there is no pgvector infrastructure on Agent Manager Supabase. (3) Multi-tenancy scope is minimal for the demo: auth + activity view + save outputs. The heavier role/eval layer is post-demo.

---

## 1. What This Application Is

`a360-v2` is the **Global Library (GL) frontend** — a Next.js 15 App Router application that serves as the intelligence and research layer for A360's medical aesthetics platform. It is NOT a patient-facing product and NOT a practice management tool. It is a **clinician and practitioner research tool** backed by a curated product knowledge base.

The core premise: a clinician asks an unscripted question ("What is the optimal Botox dosing for a full-face case?") and gets back a cited, evidence-grounded answer with FDA label badges, PubMed references, and manufacturer training video links — the same way OpenEvidence works for pharma, but built for medical aesthetics.

**The knowledge base (the Global Library) contains:**
- 378 products across the aesthetics catalog (neurotoxins, fillers, devices, skin care)
- Product facts, dosing ranges, FDA indications, contraindications, relationships, concerns
- Dossiers compiled per product (prose knowledge documents)
- Evidence links: FDA labels, PubMed studies, manufacturer IFUs, YouTube training videos
- ~530K vector-embedded chunks in CMS Supabase across YouTube (202K), PubMed (37K), Podcasts (202K), Industry (88K) corpora

**Two Supabase projects power it:**
- **Agent Manager** (`aejskvmpembryunnbgrk`) — structured data: products, evidence_links, agent_reference_docs, agent registry, runs, evals. **No pgvector — FTS only here.**
- **CMS** (`gjqicqldjgvrwmtkliie`) — vector corpora: the searchable knowledge chunks with embeddings

---

## 2. Current Application State

The app is built and running. Key surfaces that exist today:

| Module | Status | Notes |
|--------|--------|-------|
| Research/Evidence tab | Built, mock data | Main chat UI — prose answers + citation cards + YouTube panel |
| Citation rendering | Built | Inline `[N]` badges, color-coded by authority tier |
| SSE streaming protocol | Built | Client handles `status → sources → token → citations → done` |
| `lib/retrieval/post-process.ts` | Built | Citation resolver: maps `[src_N]` markers to `[1][2][3]` display |
| `lib/types/retrieval.ts` | Built | All TypeScript types: `RetrievedSource`, `ResearchCitation`, `ResearchEvent`, `SourceLocator` |
| Grounding components | Built | `GroundedAnswer`, `SourcePill` — render retrieved sources correctly |

**What is NOT real yet:** The research chat is wired to mock data. Phase 3 replaces the mock with a real retrieval route. One import swap in `research-chat.tsx` is the cutover point.

---

## 3. What Is Being Built (Active Phases)

### Phase 1 — Citations (COMPLETE)
Backfilled real URLs into `evidence_links`:
- All FDA label rows have `accessdata.fda.gov` URLs
- PubMed rows with CrossRef-resolvable PMIDs have `pubmed.ncbi.nlm.nih.gov` URLs (trade journal DOIs not in CrossRef remain a manual gap)
- `page_number INT` column added to `evidence_links` for page-level citation locators

### Phase 2 — Dossier Batch (IN PROGRESS)
Compiling knowledge documents for 20 core demo products. Each product produces rows in `agent_reference_docs` (the prose the LLM uses to answer questions) and populates structured fields:
- `item_concerns` — patient-language concerns each product addresses
- `item_body_areas` — anatomy coverage
- `aliases` — patient names vs. clinical terms
- `does_not_solve` — explicit scope limits (feeds pairing logic later)

### Phase 3 — Retrieval Wiring (PLANNING — demo blocker)

**What the demo route actually builds** (corrected from the aspirational RETRIEVAL_SERVICE.md spec):

The Agent Manager Supabase has no pgvector/embedding infrastructure. Phase 3 uses **full-text search** against `agent_reference_docs` and `evidence_links`, not vector similarity. Vector search (CMS Supabase) is a post-demo upgrade.

1. **`POST /api/research/chat`** — SSE route that:
   - Runs Postgres FTS against `agent_reference_docs` (the prose dossier chunks)
   - Fetches `evidence_links` WHERE `offering_id` matches retrieved products
   - Assembles an LLM prompt with labeled context blocks (`[src_N] (FDA label — BOTOX, p.12) {snippet}`)
   - Streams SSE via Vercel AI SDK `streamText` using **`claude-haiku-4-5`** (speed + cost for demo)

2. **`lib/retrieval/stream.ts`** — client wrapper yielding `ResearchEvent` objects with the same `AsyncGenerator` signature as the mock

3. **Hard cutover** — one import change in `research-chat.tsx`; mock files stay on disk

**Demo success criterion:** An unscripted Botox/Neurotoxins question renders prose with at least one amber FDA badge and one green PubMed badge from the real DB.

**Post-demo retrieval upgrade path:** Add pgvector to Agent Manager (or route through CMS) → enable hybrid vector + FTS with RRF → upgrade model to `claude-sonnet-4-6`. The SSE protocol and UI are already built for this; only the route internals change.

---

## 4. The Retrieval Data Flow (demo version — FTS only)

```
User question (text)
    ↓
POST /api/research/chat
    ↓
Postgres FTS → agent_reference_docs (text search, by product/category)
    ↓
Fetch evidence_links WHERE offering_id IN (matched product IDs)
    ↓
LLM prompt (claude-haiku-4-5, temp ≤ 0.3):
  - Context blocks: [src_1] (fda_label — BOTOX, p.4) {snippet} × N
  - Instruction: cite every factual claim with [src_N] markers
    ↓
SSE stream → client:
  status → sources → token chunks → citations → done
    ↓
Post-processor: [src_N] → display [1][2][3] with ResearchCitation objects
    ↓
UI renders: prose + inline colored badges + citation cards
```

**Join key:** `offering_id` — links `agent_reference_docs`, `evidence_links`, and `gl_products`. Product-level join, not claim-level. The LLM handles claim attribution via `[src_N]` markers.

**Future upgrade (post-demo):**
```
POST /api/research/chat
    ↓
Embed query → ada-002 (or text-embedding-3-small)
    ↓
Hybrid: pgvector similarity + FTS → RRF fusion
    ↓
(rest of pipeline unchanged)
```

---

## 5. Citation Authority Tiers (UI color system — do not change)

| Tier | Color | Source values | Example |
|------|-------|--------------|---------|
| FDA | Amber / `#F59E0B` | `fda_label` | BOTOX Prescribing Information 2023 |
| Manufacturer | Blue / `#3B82F6` | `ifu`, `manufacturer`, `youtube` | Allergan Training Manual |
| Research (PubMed) | Emerald / `#10B981` | `pubmed` | Carruthers et al., J Cosm Derm 2022 |
| Journal | Violet / `#8B5CF6` | `journal`, `industry` | J Drugs Derm — Sequencing Consensus |

`ResearchCitation.authorityTier: AuthorityTier` drives color — do not hardcode source strings in rendering logic.

---

## 6. Multi-Tenancy — Minimal Scope (Demo + Near-Term)

**The goal is simple:** basic auth so multiple people can log in, see their own activity, and save outputs. This is a testing and evaluation environment, not a production multi-tenant SaaS. Keep it minimal.

### What to build for the demo (June 22)

- **Auth:** Supabase Auth (email/password or magic link). One user per account, tied to a practice slug. No role system needed yet — everyone is an internal tester.
- **Activity feed:** A simple list of the current user's past queries and saved outputs. "Here's what I ran today."
- **Save output:** A "Save" button on any research answer or agent result. Stores the question, prose answer, and the `evidence_links` row IDs that backed it. No annotation required at demo.

That's it for the demo. Three tables:
```sql
-- users managed by Supabase Auth (auth.users)

saved_outputs (
  id uuid primary key,
  user_id uuid references auth.users,
  practice_id text,            -- simple slug, e.g. 'a360-internal'
  output_type text,            -- 'research_chat' | 'agent_run'
  question text,
  answer_prose text,
  evidence_link_ids uuid[],    -- snapshot of what backed this answer
  created_at timestamptz default now()
)

-- That's the whole MVP. No agent_run_outputs, no annotations table yet.
```

### What to design for (post-demo, don't build yet)

These are the next layer — don't implement at demo, but don't make them impossible either:

- **Annotations:** thumbs up/down + free-text note on a saved output
- **Practice isolation:** multiple practices, each seeing only their own saved outputs and (eventually) their practice catalog
- **Tester role:** a banner + annotation controls visible only to internal testers
- **RLS:** Supabase Row-Level Security scoped by `practice_id`. Phase 12 on the roadmap. Write queries with `practice_id` in the WHERE clause from day one so enabling RLS is non-breaking.

### What NOT to build

- Role-based access control (for now — everyone is an internal tester)
- Agent runner page (the research chat is the only surface for the demo)
- `output_annotations` table (post-demo)
- Practice catalog overrides via `pl_products` (post-demo; the 20 demo products are global)

---

## 7. What the UI Must Be Ready For (Demo Checklist)

- [ ] **Auth:** Supabase Auth login. User has a `practice_id` (use `'a360-internal'` for now).
- [ ] **Activity view:** `/history` or sidebar panel — list of the current user's `saved_outputs`, sorted by `created_at` desc. Show question + timestamp + link to re-open.
- [ ] **Save button:** On the research chat answer, a "Save this answer" button. Writes one row to `saved_outputs`.
- [ ] **Evidence snapshot:** Saved output stores the `evidence_link_ids` array — not just prose. This is the auditable record.
- [ ] **No PHI:** Nothing in saved outputs contains patient data. Research chat is product/procedure-level only.
- [ ] **`practice_id` on all writes:** Even though it's one practice now, tag every row with `practice_id` so future isolation is additive, not a rewrite.

---

## 8. Technology Stack (actual)

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15, App Router |
| Language | TypeScript |
| UI components | **shadcn/ui** (not MUI — that was an error in the original brief) |
| State | Zustand |
| Forms | React Hook Form |
| DB client | `@supabase/supabase-js` (two clients: Agent Manager + CMS) |
| Auth | **Supabase Auth** |
| AI (demo) | Vercel AI SDK `streamText`, **`claude-haiku-4-5`** via Vercel AI Gateway |
| AI (post-demo) | Upgrade to `claude-sonnet-4-6`; same SDK |
| Deployment | Vercel |

---

## 9. The Immediate Demo Target (June 22)

The demo is single-tenant (internal A360 users). Build auth and save-output so the team can test and record results during the demo session. Everything else in this doc is post-demo scope.

**Demo success = unscripted Botox question → prose + amber FDA badge + green PubMed badge → saved to the user's history.**

Multi-tenancy sits on top of a working product, not under it. Do not let the auth/tenancy build delay Phase 3 retrieval wiring.

---

*Last updated: 2026-06-12 (revised — stack correction + scope reduction)*  
*Owner: A360 Innovation team*  
*Related docs: `RETRIEVAL_SERVICE.md`, `CHAT_CITATION_UI_SPEC.md`, `A360_SYSTEM_MAP.md`, `GL_GSD_ROADMAP.md`*
