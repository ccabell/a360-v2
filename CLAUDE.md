# CLAUDE.md — a360-v2 (A360 Buyer Demo + Intelligence App)

@AGENTS.md

---

## What This Project Is

**Two products in one Next.js app:**

- **Product A — Consultation Intelligence**: Patient workspace with AI-extracted consultation intelligence and post-consultation agent reports. Pages: `/dashboard/patients`, `/dashboard/patients/[id]`
- **Product B — Evidence Ask**: Clinical Q&A grounded in PubMed, FDA labels, podcasts, YouTube, and GL dossiers. Pages: `/ask`, `/embed/ask`, `/dashboard/research`

Tech: Next.js (App Router), shadcn/ui, Tailwind, Vercel AI Gateway (Claude haiku-4-5), SSE streaming.

**Reference docs**: `Core Docs/` folder has 7 detailed documents from the 2026-06-14 CTO assessment — infrastructure map, data audit, product surfaces, cleanup actions, GL strategy.

---

## Data Architecture (MANDATORY — read before writing any code)

### Rule: VERIFY SCHEMA BEFORE WRITING TYPES

**Before writing code or types against any Supabase project, run `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '...'` against the REAL database.** TypeScript types in the repo may be speculative. A migration file existing does NOT mean it ran. This has caused multiple failed sessions.

### Three Active Supabase Connections

| Connection | Project | ID | Purpose |
|---|---|---|---|
| **Ops Supabase** | A360 Ops | `uedajrdzcjfrmbiznflf` | Patients, consultations, transcripts, extractions, agent_outputs |
| **Agent Manager Supabase** | Global V3 | `aejskvmpembryunnbgrk` | Products, offerings, fuel docs, evidence_links, agent_reference_docs, compliance, ask_log |
| **CMS Supabase** | A360 Internal CMS | `gjqicqldjgvrwmtkliie` | 550K+ vectorized chunks (podcasts, YouTube, PubMed, industry). Accessed via RAG Search Service. |

### Env Vars

| Var | Points to |
|---|---|
| `OPS_SUPABASE_URL` / `OPS_SUPABASE_SERVICE_KEY` | A360 Ops (`uedajrdzcjfrmbiznflf`) |
| `NEXT_PUBLIC_AGENT_SUPABASE_URL` / `AGENT_SUPABASE_SERVICE_KEY` | Global V3 (`aejskvmpembryunnbgrk`) |
| `NEXT_PUBLIC_CMS_SUPABASE_URL` / `CMS_SUPABASE_SERVICE_KEY` | CMS (`gjqicqldjgvrwmtkliie`) |
| `RAG_SEARCH_URL` | RAG Search Service (Railway) |
| `AI_GATEWAY_API_KEY` | Vercel AI Gateway |

### RETIRED — Do NOT Use

- **Prompt Runner Supabase** (`ksutsaiogmicgaarocba`) — dead code in this project. PR is used for extraction testing only, accessed via Railway HTTP API, not Supabase.
- **Legacy Extraction Model DB** (`wvpgmawrizwkmvfnwqfl`) — the seed source we curated Ops/Global V3 from. Its `a360_agents` (65 rows) is the legacy registry, NOT the runtime. Do not connect a360-v2 to it.
- **Manus Agent Management** (`dqkuxaiyxfsbzfakojeb`) — empty Manus-generated shell. Ignore.

### Where Things Live

| Data | Database | Table(s) |
|---|---|---|
| Patient demographics | Ops | `patients` (20 rows, 3 demo-ready) |
| Consultations + transcripts | Ops | `consultations`, `consultation_transcripts` |
| Extraction outputs | Ops | `extractions` |
| Agent run outputs | Ops | `agent_outputs` |
| Agent definitions | Ops | `agents`, `agent_versions` |
| Product catalog | Global V3 | `products` (29), `offerings` (43), `aliases` (593) |
| Evidence citations | Global V3 | `evidence_links` (184) |
| Agent fuel documents | Global V3 | `agent_fuel_documents` (5) |
| Agent reference docs | Global V3 | `agent_reference_docs` (136) |
| Compliance rules | Global V3 | `compliance_rules` (19) |
| Ask log / caching | Global V3 | `ask_log` (435) |
| RAG corpus (550K chunks) | CMS | via RAG Search Service, not direct queries |

---

## Runtime Architecture

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

**The app does NOT run agents itself.** Agent execution happens externally (agent service). The app reads agent outputs from Ops Supabase. Do NOT build a second runtime in Next.js.

---

## Scaffolding Pages (Fake Data — Not Demo)

These pages exist but show hardcoded static data. Do NOT add more hardcoded pages. Do NOT present these as working features.

| Page | Status |
|---|---|
| `/dashboard` (overview) | Hardcoded stats |
| `/dashboard/consultation` | Hardcoded |
| `/dashboard/reach` | Hardcoded |
| `/dashboard/tcp` | Hardcoded |
| `/dashboard/chat` | Hardcoded mock |
| `/dashboard/rag` | Hardcoded mock |

---

## Data Depth (Honest Numbers as of 2026-06-14)

| What | Coverage | Impact |
|---|---|---|
| Demo-ready patients | 3/20 (15%) | Only Sofia Reyes, Amara Okafor, David Park have full consultation data |
| Evidence links | 184 rows (Botox/neurotoxins only) | Evidence Ask hardcodes Botox — needs to be dynamic |
| Fuel documents | 5 in Global V3, 29 in legacy DB | Most products have no fuel |
| Agent reference docs | 136 rows | Decent coverage |
| Product relationships | ~16% populated | Blocks stacking/pairing agents |
| Product anatomy | ~14% populated | Blocks body-part-aware answers |
| Product concerns | ~13% populated | Blocks concern matching |

**Direction: populate data, stop building new surfaces.**

---

## Key Files

| File | Purpose |
|---|---|
| `lib/supabase.ts` | Supabase client exports (ops, agentManager, cms) |
| `lib/api/ops-store.ts` | All Ops Supabase queries centralized |
| `lib/retrieval/sources.ts` | Evidence retrieval (currently hardcodes Botox) |
| `lib/retrieval/stream.ts` | SSE streaming for Evidence Ask |
| `lib/prompt-runner.ts` | Prompt Runner HTTP client (testing only) |
| `app/api/ask/route.ts` | Public Evidence Ask endpoint |
| `app/api/research/chat/route.ts` | Internal research chat |
| `app/api/patients/route.ts` | Patient list API |
| `Core Docs/` | 7 reference docs from 2026-06-14 assessment |

---

## Rules for This Project

1. **Three Supabase connections only.** Ops + Global V3 + CMS. Do not add more.
2. **Verify schema before writing types.** Query `information_schema.columns` on the real DB.
3. **No new scaffolding pages.** If it can't show real data, don't build it.
4. **No hardcoded demo data** in production pages.
5. **Evidence retrieval must be dynamic** — no hardcoded product IDs.
6. **Extraction data is pre-populated** in Ops Supabase, not fetched from Prompt Runner at runtime.
7. **Prompt Runner** is for extraction testing only — keep the HTTP client, remove the dead Supabase connection.
8. **Agents read from Global V3** (fuel docs, evidence, products) but agent definitions and runs live in **Ops**.
