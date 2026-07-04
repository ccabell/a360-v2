# Product Surfaces: What's Real vs Scaffolding

**Date:** 2026-06-14

This project contains two real products and a lot of scaffolding. This doc separates them.

---

## Product A: Consultation Intelligence (Beats 1 + 2)

**What it does:** Shows patient consultations with AI-extracted intelligence and post-consultation agent reports.

**Value prop for buyer:** "We transform every consultation into structured intelligence — what was discussed, what was recommended, what the patient's concerns were, and what to do next."

### Frontend Pages

| Page | Status | Data source |
|------|--------|-------------|
| `/dashboard/patients` | **LIVE — real data** | Ops Supabase `patients` table |
| `/dashboard/patients/[id]` | **LIVE — real data** | Ops Supabase (patients, consultations, transcripts, extractions, agent_outputs, patient_intelligence) |

### What the Patient Workspace Shows

When you click a patient:

1. **Patient info card** — demographics, DOB, sex, medical history, patient summary
2. **Consultation selector** — buttons for each consultation with date, duration, type
3. **"Verified extraction" badge** — shows when extraction has `is_verified = true`
4. **Evidence-anchored view** — side-by-side layout:
   - Left: transcript with highlighted evidence spans
   - Right: extracted fields (offerings, concerns, goals, next steps, signals)
   - Click a fact → scrolls to highlighted evidence in transcript
   - Click a highlight → scrolls to the corresponding extracted field
5. **Intelligence rollup** — aggregated opportunities from verified extractions
6. **Post-Consultation Intelligence** — "Run Post-Consultation Analysis" button:
   - Stepper animation showing analysis progress
   - Renders agent report: Executive Summary, Package Recommendation, Clinical Evidence (confidence meters, PMID chips), Next Steps (checklist)
   - PMID chips link to pubmed.ncbi.nlm.nih.gov
7. **Agent outputs panel** — raw agent output display

### API Routes

| Route | Method | What it does |
|-------|--------|-------------|
| `/api/patients` | GET | List active patients (paginated, searchable) |
| `/api/patients/[id]` | GET | Get patient + consultations + transcripts + extractions + intelligence |
| `/api/patients/[id]/agent-outputs` | GET | Get all agent outputs for a patient |
| `/api/patients/[id]/workflow` | POST | Trigger post-consultation analysis |

### Key Components

- `PatientWorkspace` — main container (`components/patients/patient-workspace.tsx`)
- `ConsultationIntelligence` — evidence-anchored view with fact-click-to-scroll
- `TranscriptViewer` — transcript display with highlight support
- `ExtractionCard` — extraction output display
- `AgentReport` — post-consultation intelligence report
- `AgentOutputsPanel` — raw agent output display

---

## Product B: Evidence Ask (Beat 3)

**What it does:** Clinical Q&A with grounded citations from PubMed, podcasts, YouTube, FDA labels, and GL dossiers.

**Value prop for buyer:** "Ask anything about aesthetic medicine — every answer is grounded in peer-reviewed evidence, FDA labels, and expert sources."

### Frontend Pages

| Page | Status | Data source |
|------|--------|-------------|
| `/ask` | **LIVE — real data** | Agent Manager Supabase + RAG service + Claude |
| `/embed/ask` | **LIVE — real data** | Same as /ask, chrome-less embed |
| `/dashboard/research` | **LIVE — real data** | Same pipeline, dashboard context |

### What Evidence Ask Shows

1. **Ask interface** — input with suggestion tabs (Compare, Safety, Pairing, Timing, Value)
2. **Streaming answer** — SSE-streamed response with inline citation markers
3. **Citation cards** — source type (PubMed, YouTube, podcast, FDA, etc.), clickable links
4. **Out-of-scope handling** — off-topic queries get honest decline with suggested topics
5. **Rate limiting** — session (10/hr) and IP (30/day) limits
6. **Caching** — identical questions within 24hr serve cached responses

### API Routes

| Route | Method | What it does |
|-------|--------|-------------|
| `/api/ask` | POST | Public evidence ask with rate limiting, caching, decline logic |
| `/api/research/chat` | POST | Internal research chat (no rate limiting) |
| `/api/ask/event` | POST | Log UI events (ask, answer_complete, citation_click) |
| `/api/ask/feedback` | POST | Log up/down feedback on citations |

### Data Flow

```
User question
  → isInScope() check (AESTHETICS_TERMS list)
  → If out-of-scope: honest decline with nearestTopics()
  → If in-scope:
      → RAG Search Service (4 corpora, 550K chunks)
      + GL/FDA query (evidence_links + agent_reference_docs)
      → Merge & deduplicate (regulatory floor first)
      → Claude (haiku-4-5) generates grounded answer
      → Stream to client as SSE
```

### Known Bug (as of 2026-06-14)

`/api/research/chat` returns **500 error** on off-topic queries instead of graceful decline. The `/api/ask` route handles this correctly. Root cause: unhandled edge case when sources are empty and the answer generation path is entered.

---

## Scaffolding Pages (Hardcoded / Fake Data)

These pages exist in the nav but are NOT part of the demo. All use hardcoded static data.

| Page | What's fake | Should it be in nav? |
|------|------------|---------------------|
| `/dashboard` (overview) | Consult volume, goals, recent consults, opportunities — all static arrays in `page.tsx` lines 30-57 | Remove or add "Sample Data" badge |
| `/dashboard/consultation` | Recent analyses with fake IDs and KPI scores | Remove from nav |
| `/dashboard/reach` | Campaign types with fake reach numbers | Remove from nav |
| `/dashboard/tcp` | Treatment plans — fully hardcoded 3-tier plans | Remove from nav |
| `/dashboard/chat` | Mock citations with fake PubMed IDs, setTimeout fake delay | Remove from nav |
| `/dashboard/rag` | Mock search results | Remove from nav |

### Dev/Internal Pages

| Page | Purpose | Keep? |
|------|---------|-------|
| `/dashboard/agents` | Agent registry browser | Keep — reads real data from Agent Manager |
| `/dashboard/agent-tester` | Playground for testing | Keep — dev tool |
| `/dashboard/components` | Component gallery | Keep — dev tool |
| `/dashboard/theme` | Theme preview | Keep — dev tool |
| `/dashboard/history` | Saved outputs | Keep — reads real data |

---

## Testing Surfaces (Prompt Runner)

These routes connect to the Prompt Runner Railway API for extraction testing. They are NOT part of the buyer demo.

| Route / File | Purpose | Status |
|-------------|---------|--------|
| `/api/runs` | List/get extraction runs from Prompt Runner | Testing tool |
| `/api/transcripts` | List/get transcripts from Prompt Runner | Testing tool |
| `/api/playground` | Send prompts to Prompt Runner for execution | Testing tool |
| `lib/prompt-runner.ts` | HTTP client to Railway API | Testing infrastructure |

**These should be clearly separated from demo paths** — either moved to a `/testing` route group or removed from the main nav.
