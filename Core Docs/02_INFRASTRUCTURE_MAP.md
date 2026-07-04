# a360-v2 Infrastructure Map

**Date:** 2026-06-14

This documents every external service this app connects to and how data flows.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        a360-v2 (Next.js on Vercel)                  │
│                                                                     │
│  ┌──────────────────────┐    ┌──────────────────────────────────┐   │
│  │   Product A:          │    │   Product B:                     │   │
│  │   Consultation Intel  │    │   Evidence Ask                   │   │
│  │                       │    │                                  │   │
│  │   /dashboard/patients │    │   /ask, /embed/ask               │   │
│  │   /patients/[id]      │    │   /dashboard/research            │   │
│  │                       │    │                                  │   │
│  │   Reads from:         │    │   Reads from:                    │   │
│  │   Ops Supabase ───────│────│── Agent Manager Supabase         │   │
│  │                       │    │   + RAG Search Service           │   │
│  │                       │    │   + Vercel AI Gateway (Claude)   │   │
│  └──────────────────────┘    └──────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ HTTP POST /search
                                        ▼
                              ┌──────────────────────┐
                              │  RAG Search Service   │
                              │  (Railway)            │
                              │                       │
                              │  Reads from:          │
                              │  CMS Supabase         │
                              │  (550K+ chunks)       │
                              └──────────────────────┘
```

---

## Supabase Connections — What's Active vs Dead

### ACTIVE: Ops Supabase (`uedajrdzcjfrmbiznflf`)

**Purpose:** Patient and consultation data store. Powers Product A (Consultation Intelligence).

**Env vars:** `OPS_SUPABASE_URL`, `OPS_SUPABASE_SERVICE_KEY`

**Tables queried at runtime:**

| Table | Purpose | Key queries |
|-------|---------|-------------|
| `patients` | 20 demo patients with demographics | List active, search by name, get by ID |
| `consultations` | Consultation records per patient | Get all for a patient, ordered by date |
| `consultation_transcripts` | Full raw + enhanced transcripts | Get by consultation_id |
| `extractions` | 2-pass structured extraction outputs | Get verified by consultation_id |
| `agent_outputs` | Post-consultation agent reports | List all for a patient |
| `patient_intelligence` | VIEW: latest extraction + opportunities | Get by patient_id |
| `agents` | Agent definitions | List active agents |

**All queries centralized in:** `lib/api/ops-store.ts`

---

### ACTIVE: Agent Manager Supabase (`aejskvmpembryunnbgrk`)

**Purpose:** Evidence/content layer + agent platform. Powers Product B (Evidence Ask) + agent management.

**Env vars:** `NEXT_PUBLIC_AGENT_SUPABASE_URL`, `AGENT_SUPABASE_SERVICE_KEY`

**Tables queried at runtime (Evidence Ask):**

| Table | Purpose | Key queries |
|-------|---------|-------------|
| `evidence_links` | FDA labels, PubMed citations, YouTube links | Get by offering_id for regulatory floor |
| `agent_reference_docs` | Prose dossiers (clinical, product) | Get by offering_id/category for LLM context |
| `ask_log` | Question log with rate limiting + caching | Rate limit checks, cache lookups, activity log |
| `app_tenants` | Tenant slugs for multi-tenant | Resolve tenant_id |
| `app_saved_outputs` | Saved research answers | Save/list outputs |
| `app_activity_events` | Fire-and-forget activity log | Audit trail |

**Tables queried at runtime (Agent Platform — scaffolding pages):**

| Table | Purpose |
|-------|---------|
| `agents` | Agent definitions (CRUD) |
| `agent_versions` | Version history, promote/active |
| `agent_workflows` | Workflow definitions |
| `agent_runs` | Execution runs |
| `agent_citations` | Citations within runs |
| `agent_tools` | Tool/integration definitions |
| `eval_results` | Evaluation results |

---

### NOT YET WIRED: CMS Supabase (`gjqicqldjgvrwmtkliie`)

**This is the content corpus — 550K+ vectorized chunks. Currently accessed via RAG Search Service, but agents will query it directly for enrichment.**

This Supabase holds:
- PubMed: 22,623 articles / 37,376 chunks
- YouTube: 3,894 videos / 201,982 chunks
- Podcasts: 8,688 episodes / 202,382 chunks
- Industry: 87,923 chunks
- **Total: 550K+ vectorized chunks**

**Current state:** The `cmsSupabase` client is exported from `lib/supabase.ts` but not imported by any runtime code yet. Evidence Ask accesses this data through the RAG Search Service (Railway intermediary). One-time backfill script (`scripts/backfill-youtube.ts`) uses it directly.

**Planned usage:** Agents will query CMS Supabase directly to enrich responses with YouTube content, podcast insights, and PubMed evidence. This is on the roadmap — the connection should stay, but it's not wired yet.

**Status:** Keep the client. Wire it when agent enrichment work begins.

---

### DEAD CODE: PR Supabase (`ksutsaiogmicgaarocba`)

**Completely unused.** Zero queries anywhere. The Prompt Runner is accessed via Railway HTTP API (`lib/prompt-runner.ts`), not via direct Supabase connection.

**Recommendation:** Remove from `lib/supabase.ts` and `.env.local.example`. Keep the Prompt Runner HTTP client for extraction testing.

---

## Other External Services

### RAG Search Service (Railway)

**URL:** `RAG_SEARCH_URL` (default: `http://127.0.0.1:8100`, prod: Railway deploy)

**What it does:** 4-corpus vector search across PubMed, YouTube, podcast, industry articles

**Called by:** `lib/retrieval/sources.ts` → `searchRag()`

**Request:** `POST /search` with `{ query, top_k }`

**Response:** Array of `RagChunk` with text, source type, scores, metadata

**Reads from:** CMS Supabase (internally — this app doesn't need to know)

### Vercel AI Gateway (Claude)

**Used by:** `/api/ask` and `/api/research/chat` for LLM answer generation

**Model:** claude-haiku-4-5 via Vercel AI Gateway

### Prompt Runner (Railway) — Testing only

**URL:** `https://prompt-runner-production.up.railway.app`

**Client:** `lib/prompt-runner.ts`

**Used by:** `/api/runs`, `/api/transcripts`, `/api/playground` — extraction testing tools, NOT part of the buyer demo

**Recommendation:** Keep for testing but clearly separate from demo paths.

---

## Data Flow Summary

```
Product A (Consultation Intelligence):
  Browser → /api/patients → Ops Supabase → patients, consultations,
                                            transcripts, extractions,
                                            agent_outputs

Product B (Evidence Ask):
  Browser → /api/ask → Agent Manager Supabase (evidence_links, 
                        agent_reference_docs)
                      + RAG Search Service → CMS Supabase (550K chunks)
                      + Vercel AI Gateway (Claude)
                      → Merged, deduplicated, streamed as SSE
```
