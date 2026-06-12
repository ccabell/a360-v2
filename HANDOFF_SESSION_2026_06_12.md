# Session Handoff — 2026-06-12
## A360 Citations + GL Demo Infrastructure

---

## What Was Accomplished This Session

### 1. Phase 1 (citations) — PLANNED & EXECUTING
Three plans created, verified, and executing in Window 1:
- **01-01-PLAN.md** — Schema migration (`page_number INT` on `evidence_links`) + PubMed PMID backfill via CrossRef API + YouTube timestamp backfill via CMS snippet matching
- **01-02-PLAN.md** — FDA Access Data URL research + backfill 47 `fda_label` evidence_links rows
- **01-03-PLAN.md** — Add citation locator capture paragraph to `DOSSIER_COMPILE_PIPELINE.md` STEP 5 + human demo gate checkpoint

Wave 1 (01-01 + 01-02) runs in parallel. Wave 2 (01-03) is a human checkpoint.

**Env vars added to `.env.local`:**
```
NEXT_PUBLIC_AGENT_SUPABASE_URL=https://aejskvmpembryunnbgrk.supabase.co
AGENT_SUPABASE_SERVICE_KEY=<REDACTED — rotate in Supabase dashboard>
NEXT_PUBLIC_CMS_SUPABASE_URL=https://gjqicqldjgvrwmtkliie.supabase.co
CMS_SUPABASE_SERVICE_KEY=<REDACTED — rotate in Supabase dashboard>
```
⚠️ **ROTATE THESE KEYS** — they were shared in chat. Go to Supabase dashboard for both projects.

---

### 2. Phase 2 (dossier-batch) — PLANNING IN PROGRESS (Window 2)
Reference docs saved to `.planning/phases/02-dossier-batch/`:
- `BATCH_SOURCE_LOGGING_ADDENDUM.md` — log all sources to `source_registry` + `ingestion_queue` during compile (no ingestion yet)
- `STRUCTURED_EMISSION_ADDENDUM.md` — emit `item_concerns`, `item_body_areas`, `aliases`, `does_not_solve` alongside prose dossiers
- `AESTHETIC_DERMATOLOGY_JOURNAL_REGISTRY.md` — 45 journals, tiered by authority, OA flagged

Phase 2 planning was in progress when context limit was hit. Planning was running without a CONTEXT.md (user chose "continue without context" — the addendums are the locked decisions).

**Key Phase 2 decisions (locked):**
- 20 products × 3 lenses (sales_education primary, gateway posture on clinical)
- Source logging = log only, no ingestion during batch
- Emit: `item_concerns`, `item_body_areas`, `aliases`, `does_not_solve`
- No `item_relationships` in this batch
- Aggressively surface OA journal articles about Botox/Neurotoxins → flag top 10 in SOURCE CAPTURE REPORT
- End-of-batch reports: `STRUCTURED_COVERAGE.md` + `TAXONOMY_ADDITIONS.md`

---

### 3. Phase 3 (retrieval-wiring) — DISCUSS-PHASE IN PROGRESS (Window 3)
Phase 3 is the demo deliverable. Discuss-phase was running when context limit was hit.

**Decisions made so far in discuss-phase:**
| Question | Decision |
|----------|----------|
| LLM model | `claude-sonnet-4-6` via Vercel AI Gateway |
| Corpora | `agent_reference_docs` (prose) + `evidence_links` (citations), joined by `offering_id` |
| YouTube | Separate query for related videos row — NOT part of vector search retrieval path |
| Citation mechanism | LLM sees `evidence_links` as labeled context, writes `[src_N]` markers; post-processor resolves to display `[1][2][3]` |

**Decisions still pending in discuss-phase (when you resume):**
- Retrieval route shape: full `/api/retrieval/search` with vector search, lightweight server action, or keyword-only for demo?
- Streaming vs. non-streaming: real SSE stream or JSON response that UI tokenizes?
- Mock cutover strategy: hard cutover vs. env-var gate (`NEXT_PUBLIC_USE_REAL_RETRIEVAL`) vs. mock fallback?

---

### 4. Roadmap & Reference Docs
- **`.planning/ROADMAP.md`** — updated with Phase 1, 2, 3 (all goals + success criteria)
- **`.planning/GL_GSD_ROADMAP.md`** — full 14-phase GL roadmap (Phases 1–14 through scale-out)
- **`.planning/phases/04-source-ingestion/AESTHETIC_DERMATOLOGY_JOURNAL_REGISTRY.md`** — journal registry for Phase 4

**GL Roadmap assessment (my take):**
- Sequencing is correct overall
- Phase 3 planning should happen NOW (doing it) ✅
- Phase 12 (RLS/security) should be drafted as a ready-to-pull-forward phase — trigger is "Boulevard touches the DB"
- Phase 2 scope is large — may need 02a (prose + source logging) / 02b (structured emission) split

---

### 5. Chat Citation UI Spec — WRITTEN
**`Fable Docs/CHAT_CITATION_UI_SPEC.md`** — full spec for the clinician chat page including:

**Color system (authority tier → color):**
| Tier | Color | When |
|------|-------|------|
| FDA Label | Amber | `source = 'fda_label'`, `authority_rank = 1` |
| Manufacturer | Blue | `source = 'ifu'` or `'manufacturer'` or `'youtube'` |
| Research (PubMed) | Emerald | `source = 'pubmed'` |
| Journal | Violet | `source = 'journal'` or `'industry'` |

Inline `[N]` citation badges also pick up these colors.

**Components needed:**
- `reference-card.tsx` — UPDATE: add `authorityTier` prop + new color config
- `inline-citation-badge.tsx` — UPDATE: add tier-color variant
- `references-section.tsx` — UPDATE: group by tier (FDA → Manufacturer → Research)
- `related-videos.tsx` — NEW: YouTube row with thumbnails
- `suggested-questions.tsx` — NEW: 4 LLM-generated followup question cards

**Key type addition needed in `lib/types/retrieval.ts`:**
```typescript
export type AuthorityTier = 'fda' | 'manufacturer' | 'clinical' | 'journal';
// Add authorityTier: AuthorityTier to ResearchCitation interface
```

---

### 6. Codex Journal Index Prompt — WRITTEN
A full Codex prompt was written (in chat) to scan PubMed for OA articles about the 20 demo products across the priority journals (JCAD, Cureus, Dermatology and Therapy, ASJ, etc.) and output:
- `JOURNAL_COVERAGE_REPORT.md`
- `TOP_INGEST_CANDIDATES.md` (relevance 4-5, OA only, sorted)
- `source_registry_inserts.sql`
- `ingestion_queue_inserts.sql`

Output dir: `C:\Users\Chris\Downloads\journal-index\`
This hasn't been run yet. Run it in Codex when ready.

---

## Current State of All Windows

| Window | Task | Status |
|--------|------|--------|
| Window 1 | `/gsd:execute-phase 1` | EXECUTING — Wave 1 in progress |
| Window 2 | `/gsd:plan-phase 2` | PLANNING — in progress, no CONTEXT.md |
| Window 3 | `/gsd:discuss-phase 3` | DISCUSSING — 4 of 8 questions answered |

---

## What To Do Next (in priority order)

### Immediate
1. **Wait for Window 1 Wave 1** to complete, then review the gap report (CrossRef misses, FDA URL gaps). Fill in any manual FDA URLs Chris needs to provide.
2. **Window 3**: Complete the remaining discuss-phase questions:
   - Retrieval route shape (recommendation: lightweight server action for demo, not full vector search)
   - Streaming (recommendation: real SSE — UI already built for it)
   - Mock cutover (recommendation: env-var gate `NEXT_PUBLIC_USE_REAL_RETRIEVAL=true`)
3. **Window 2**: Let Phase 2 planning complete, review plans before executing

### After Window 3 discuss-phase is done
4. Run `/gsd:plan-phase 3` in a new window

### After Phase 1 execution completes
5. Phase 1 Wave 2: Review compile pipeline doc update, run demo gate (Botox clickable citations in live UI)

### After Phase 2 plans are ready
6. Execute Phase 2 — this is the big dossier batch. Expect multiple sessions.

### Parallel / when ready
7. Run the Codex journal index prompt to get `TOP_INGEST_CANDIDATES.md` — fast-track for demo citations from OA journals

---

## Key File Locations

| File | Purpose |
|------|---------|
| `.planning/ROADMAP.md` | Live roadmap (Phases 1–3 detailed) |
| `.planning/GL_GSD_ROADMAP.md` | Full 14-phase GL roadmap |
| `.planning/phases/01-citations/` | Phase 1 all plans + context + research + validation |
| `.planning/phases/02-dossier-batch/` | Phase 2 reference docs (addendums + journal registry) |
| `.planning/phases/03-retrieval-wiring/` | Phase 3 (empty — discuss-phase writing CONTEXT.md now) |
| `Fable Docs/CHAT_CITATION_UI_SPEC.md` | Full chat UI design spec with DB mapping |
| `Fable Docs/RETRIEVAL_SERVICE.md` | Authoritative retrieval architecture spec |
| `Fable Docs/DOSSIER_COMPILE_PIPELINE.md` | Compile pipeline (STEP 5 needs citation locator paragraph — Phase 1 Plan 03) |
| `.env.local` | Supabase service keys (ROTATE THEM) |

---

## Architecture Summary (for new context)

**The retrieval flow for the demo:**
```
User question
    ↓
Vector search → agent_reference_docs chunks (by offering_id/category)
    ↓
Fetch evidence_links WHERE offering_id = matched products
    ↓
LLM prompt: dossier chunks + labeled evidence_links as [src_1], [src_2]...
    ↓
LLM writes prose with [src_N] markers
    ↓
Post-processor resolves src_N → display [1][2][3] with ResearchCitation objects
    ↓
UI: prose with inline colored badges + citation cards + YouTube row + suggested questions
```

**Supabase projects:**
- `aejskvmpembryunnbgrk` — Agent Manager (evidence_links, agent_reference_docs, products, item_concerns, etc.)
- `gjqicqldjgvrwmtkliie` — CMS (manufacturer_youtube_transcript, vector corpus)

**Demo success criterion:**
> Unscripted Botox/Neurotoxins question in the live UI renders prose with clickable PubMed + FDA label citations from the real DB. At least one amber FDA badge and one green PubMed badge visible.

---

*Handoff written: 2026-06-12*  
*Continue with: `/gsd:execute-phase 1` (Window 1), `/gsd:plan-phase 2` (Window 2), `/gsd:discuss-phase 3` (Window 3)*
