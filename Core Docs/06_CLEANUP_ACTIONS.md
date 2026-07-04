# Cleanup Actions & Recommendations

**Date:** 2026-06-14

Prioritized list of actions to focus this project on what matters.

---

## Immediate (This Week)

### 1. Remove Dead Supabase Connection (PR only)

**Files to change:** `lib/supabase.ts`, `.env.local.example`

- Delete `prSupabase` export (zero queries anywhere — PR accessed via HTTP API)
- Remove `NEXT_PUBLIC_PR_SUPABASE_URL`, `PR_SUPABASE_SERVICE_KEY` from `.env.local.example`
- **Keep `cmsSupabase`** — not wired yet, but agents will use it to enrich responses with YouTube, podcast, and PubMed content. This is on the roadmap.

**Result:** 3 active Supabase connections: Ops (patient data), Agent Manager (evidence + platform), CMS (content corpus for agent enrichment). Only PR is truly dead.

### 2. Fix the 500 Error on Off-Topic Queries

**File:** `app/api/research/chat/route.ts`

The `/api/ask` route has proper out-of-scope handling. The `/api/research/chat` route crashes. Likely needs the same empty-sources guard.

### 3. Write a Project CLAUDE.md

The repo has a CLAUDE.md but it may not cover the current state. Add or update with:

```
This is the A360 buyer demo. Two products:

Product A — Consultation Intelligence:
  Backend: Ops Supabase (uedajrdzcjfrmbiznflf)
  Pages: /dashboard/patients, /dashboard/patients/[id]
  
Product B — Evidence Ask:
  Backend: Agent Manager Supabase (aejskvmpembryunnbgrk) + RAG Service
  Pages: /ask, /embed/ask, /dashboard/research

Only 2 Supabase connections. Do not add more.
Do not add hardcoded data to scaffolding pages.
Do not build new scaffolding pages.
Extraction data is pre-populated in Ops Supabase, not fetched from Prompt Runner at runtime.
```

---

## Short-Term (This Sprint)

### 4. Hide Scaffolding Pages from Demo Nav

The 6 hardcoded pages (overview, consultation, reach, tcp, chat, rag) dilute the demo. Options:
- **Option A:** Add `DEMO_MODE` env var — when set, hide scaffolding links from sidebar
- **Option B:** Remove scaffolding links entirely, keep pages accessible by direct URL for dev
- **Option C:** Add visible "Sample Data" badge to each scaffolding page

### 5. Separate Testing Routes

Move Prompt Runner proxy routes out of the main API namespace:
- `/api/runs` → `/api/internal/runs` (or remove)
- `/api/transcripts` → `/api/internal/transcripts` (or remove)  
- `/api/playground` → `/api/internal/playground` (or remove)

Or just delete them — you can use Prompt Runner directly for extraction testing.

### 6. Make Evidence Retrieval Dynamic

**File:** `lib/retrieval/sources.ts`

Replace hardcoded `BOTOX_OFFERING_ID` with dynamic product detection:
1. Extract product name from query
2. Look up offering_id in a products table or mapping
3. Query evidence_links for that product

This unblocks Evidence Ask for all product families, not just Botox.

---

## Data Work (Ongoing)

### 7. Populate More Demo Patients (Ops Supabase)

**Current:** 3/20 patients are demo-ready (have consultation + transcript + extraction + agent outputs)

**Target:** 10/20 patients demo-ready

**Method:**
1. Create consultation + transcript records (synthetic or from Prompt Runner)
2. Create verified extraction records (run through PR or manually compose)
3. Run post-consultation workflow (or manually insert agent_output records)
4. Ensure diversity: different treatments, concerns, demographics

### 8. Extend Evidence Coverage (Agent Manager Supabase)

**Current:** evidence_links and agent_reference_docs only cover Botox/neurotoxins

**Target:** Top 10 product families covered

**Priority order:**
1. Dermal fillers (Juvederm, Restylane)
2. Biostimulators (Sculptra, Radiesse)
3. Energy devices (Morpheus8, Halo, BBL)
4. Body contouring (CoolSculpting, Emsculpt)
5. Skin resurfacing (microneedling, chemical peels)

---

## Architecture Principles Going Forward

1. **Three Supabase connections** — Ops (patient data) + Agent Manager (evidence + platform) + CMS (content corpus for agent enrichment). PR is dead — remove it.
2. **CMS currently accessed via RAG service** — agents will also query CMS directly for YouTube/podcast/PubMed enrichment when that work is wired
3. **No runtime Prompt Runner dependency** — extraction data is pre-populated
4. **No hardcoded demo data in production pages** — if a page can't show real data, don't show the page
5. **Evidence retrieval must be dynamic** — no hardcoded product IDs in query logic
