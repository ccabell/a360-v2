# A360 v2 — Agent Manager + Intelligence Platform

Internal tool for managing, testing, and monitoring A360 agents. Built on Next.js 16, React 19, shadcn/ui, Tailwind v4, and three Supabase projects.

**Live**: https://a360-v2.vercel.app
**Last Updated**: 2026-06-11

---

## Documentation Index

Read in this order:

### Architecture & Data
| Doc | What it tells you | Status |
|-----|-------------------|--------|
| `DATA_SOURCES_v2.md` | **Source of truth.** Three Supabase projects + Prompt Runner. 529K vectorized chunks. No legacy. | Active |
| `DATA_SOURCE_MAP.md` | Complete inventory: every table, API endpoint, tool, and type mapped to context layers | Active |
| `LAYERED_CONTEXT_MODEL.md` | Six-layer context assembly model: Task, Procedural, Domain, Situational, Practice, Evidence. Layer recipes, entity resolution, precedence rules. | Active |
| `RETRIEVAL_ARCHITECTURE.md` | Key architectural decisions: retrieval-born citations, deep-link offsets, cross-corpus fusion, query rewriting | Active |
| `RETRIEVAL_SERVICE.md` | Full retrieval service spec: request/response schemas, fusion logic, SSE protocol, run logging, eval hooks | Active |
| `CONTEXT_ASSEMBLY.md` | Three retrieval patterns: SQL for exact, playbooks for procedural, RAG for unknown. Document registry. | Active |
| `API_CONTRACT.md` | Agent response JSON schema, citation objects, validation rules | Active — needs v2 updates (see RETRIEVAL_SERVICE.md §9) |

### Requirements & Build
| Doc | What it tells you | Status |
|-----|-------------------|--------|
| `REQUIREMENTS_v2.md` | **Active requirements.** 12 requirement groups aligned with v2 data model. | Active |
| `BUILD_PLAN.md` | Phased task list for building the Agent Manager UI | Active |
| `REQUIREMENTS.md` | Original requirements — references v1 data (65 agents, GL coverage %). | Superseded by REQUIREMENTS_v2.md |

### Design
| Doc | What it tells you | Status |
|-----|-------------------|--------|
| `PAGE_DESIGNS.md` | Page designs for practitioner-facing pages (Chat, RAG, TCP, Reach, Agent Tester, CI) | Active |
| `PAGE_DESIGN_TEMPLATE.md` | Template for writing new page designs | Active |
| `COMPONENT_INVENTORY.md` | Available shadcn components + citation components | Active — needs manager components added |
| `DESIGN_INDEX.md` | Design system reference (colors, typography, spacing) | Active |
| `DESIGN_QUICK_REFERENCE.md` | Quick styling reference | Active |

### Integration
| Doc | What it tells you | Status |
|-----|-------------------|--------|
| `INTEGRATION_DIAGRAM.md` | Data flow diagrams. Written Dify-centric — read with R12 (runtime-agnostic) in mind. | Active with caveats |

### Superseded
| Doc | What it tells you | Status |
|-----|-------------------|--------|
| `DATA_SOURCES.md` | v1 GL Supabase tables, agent fuel. **Do not build against this.** | Superseded by DATA_SOURCES_v2.md |

---

## Quick Start

```bash
# Install
npm install

# Set up env (copy template, fill in Supabase + API keys)
cp .env.local.example .env.local

# Dev server
npm run dev
# -> http://localhost:3000/dashboard
```

### Environment Variables Needed

| Var | Source |
|-----|--------|
| `NEXT_PUBLIC_AGENT_SUPABASE_URL` | Agent Manager Supabase (`aejskvmpembryunnbgrk`) |
| `AGENT_SUPABASE_SERVICE_KEY` | Agent Manager Supabase service key |
| `NEXT_PUBLIC_CMS_SUPABASE_URL` | CMS Supabase (`gjqicqldjgvrwmtkliie`) |
| `CMS_SUPABASE_SERVICE_KEY` | CMS Supabase service key |
| `NEXT_PUBLIC_PR_SUPABASE_URL` | Prompt Runner Supabase (`ksutsaiogmicgaarocba`) |
| `PR_SUPABASE_SERVICE_KEY` | Prompt Runner Supabase service key |

---

## What's Built

### Practitioner-Facing Pages (functional)
- `/dashboard` — Overview with stats
- `/dashboard/chat` — AI chat with citations
- `/dashboard/rag` — Knowledge base search
- `/dashboard/tcp` — Treatment care planning
- `/dashboard/patients` — Live patient list from Prompt Runner

### Agent Manager Pages
- `/dashboard/agents` — Agent registry with filters, create dialog (built)
- `/dashboard/agents/[id]` — Agent detail with tabs: Overview, Config, Tools (interactive toggles), Test (playground), Versions (built)
- `/dashboard/agents/tools` — Tool registry with DataTable, detail dialogs, create form (built)
- `/dashboard/agents/corpus` — Corpus dashboard with live counts (Phase 6 — next)
- `/dashboard/agents/workflows` — Workflow builder (Phase 8)
- `/dashboard/agents/runs` — Run logs (Phase 7)

See `BUILD_PLAN.md` for the full task list.

---

## Key Architectural Decisions

1. **Citations born at retrieval time** — LLM never writes metadata, only cites retrieval IDs. Post-processor resolves to Citation objects. Hallucinated citations are structurally impossible.
2. **Fresh database** — No legacy `a360_agents` or agent fuel. Agent Manager Supabase is the single source of truth for agent definitions.
3. **Runtime-agnostic** — 6 runtime types supported. UI is a control plane, not an executor.
4. **Prompt Runner reads from Manager** — Manager owns definitions, PR executes. PR's agent CRUD is frozen.
5. **PHI requires auth** — Playground and run logs contain transcript data. Basic auth required before shipping.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.9 |
| UI | React 19.2.4, shadcn/ui, Tailwind CSS v4 |
| State | React state (Zustand available) |
| Database | Supabase PostgreSQL (3 projects) |
| API | Prompt Runner on Railway |
| AI | Vercel AI SDK |
| Deployment | Vercel |
