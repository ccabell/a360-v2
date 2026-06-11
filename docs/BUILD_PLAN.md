# Agent Manager — Build Plan

Task list for building the Agent Manager UI in a360-v2.
Requirements: `REQUIREMENTS_v2.md`. Data model: `DATA_SOURCES_v2.md`. Retrieval: `RETRIEVAL_SERVICE.md`.

**Status**: Ready to build
**Last Updated**: 2026-06-11

---

## Prerequisites (do first)

- [ ] **P1. Reconcile DATA_SOURCES.md** — Add superseded banner to v1 `DATA_SOURCES.md` (file was locked during cleanup). Delete or rename to `DATA_SOURCES_v1_SUPERSEDED.md`.
- [ ] **P2. Point migration at correct DB** — `supabase/migrations/20260611_agent_manager_tables.sql` header says GL Supabase (`wvpgmawrizwkmvfnwqfl`) but v2 uses Agent Manager Supabase (`aejskvmpembryunnbgrk`). Update the comment and run the migration against the correct project.
- [ ] **P3. Wire Supabase clients** — Verify `.env.local` has all three Supabase connections. Ensure `lib/supabase.ts` creates clients for Agent Manager + CMS + PR. Test connectivity.
- [ ] **P4. Update API_CONTRACT.md** — Add `podcast` and `industry` to `CitationSourceType`. Add `PodcastMetadata` and `IndustryMetadata` shapes. Add `schemaVersion` to `AgentResponse`. Add error envelope. Add `startSeconds` to YouTube metadata. Add bidirectional citation validation note.
- [ ] **P5. Create agent_documents table** — Document registry for playbooks/references/evidence (see CONTEXT_ASSEMBLY.md). `doc_type`, `task_tags`, `agent_keys`, `content`, `token_count`. Playbooks loaded whole by task tag, not searched.

---

## Phase 1: Shared Components (build before pages)

The manager needs UI primitives that don't exist in the current component inventory.

- [ ] **1.1 DataTable component** — Sortable, filterable table for registry views (65+ rows). Column definitions, sort state, filter inputs, pagination. Use shadcn Table + custom header controls.
- [ ] **1.2 Tabs component** — shadcn Tabs for agent detail (Config / Tools / Test / Versions / Runs).
- [ ] **1.3 Dialog component** — Modal for create agent, confirm promote, etc.
- [ ] **1.4 Select component** — Agent selector (playground), model selector (editor), status selector (filters).
- [ ] **1.5 Toast/notification component** — Success/error feedback for save, promote, delete actions.
- [ ] **1.6 CodeEditor component** — Monospace textarea with line numbers for prompt editing. Monaco is ideal but heavy; start with a styled textarea, swap in Monaco later if needed.
- [ ] **1.7 JSONViewer component** — Collapsible JSON tree for run outputs and schema inspection.

---

## Phase 2: Agent Registry (R1)

The entry point. List all agents, filter, create new ones.

- [ ] **2.1 Route setup** — Add `/dashboard/agents` route and sidebar nav entry ("Agent Manager" with Settings icon).
- [ ] **2.2 Agent list page** — DataTable showing: name, status badge, category, runtime type, active version, health indicators. Wire to `listAgents()` API client.
- [ ] **2.3 Status summary bar** — Card row above table: total agents, active count, draft count, deprecated count.
- [ ] **2.4 Create agent dialog** — Dialog with form: name, key (auto-slug from name), category, runtime type, description. POST to Agent Manager Supabase.
- [ ] **2.5 Filter/search** — Status multi-select, category filter, runtime type filter, text search on name/description.

---

## Phase 3: Agent Detail & Version Management (R2, R3)

Edit an agent, manage versions, edit prompts.

- [ ] **3.1 Agent detail page** — `/dashboard/agents/[id]` with tabbed layout: Overview, Config, Tools, Versions, Runs.
- [ ] **3.2 Overview tab** — Agent metadata display/edit: name, description, category, status, created date, active version summary.
- [ ] **3.3 Config tab (prompt editor)** — System prompt (CodeEditor), model selector, temperature/max_tokens/max_tool_rounds sliders, citation_required toggle, output schema editor (CodeEditor for JSON).
- [ ] **3.4 Versions tab** — Version history list: semver, status badge (draft/candidate/active/archived), created date, notes. "Create New Version" button. Promote button with confirmation dialog.
- [ ] **3.5 Version diff view** — Side-by-side comparison of two versions (prompt text diff, tool changes, schema changes). Should priority.
- [ ] **3.6 Save as version** — Save current config state as new immutable version with notes field.

---

## Phase 4: Tool Registry & Assignment (R4)

Manage what tools agents can use.

- [ ] **4.1 Tools tab on agent detail** — Checklist of all available tools. Toggle enable/disable per tool for this agent version.
- [ ] **4.2 Tool detail panel** — Click a tool to see: description, tables accessed (data lineage), data source, parameter schema.
- [ ] **4.3 Per-agent tool config** — Optional per-tool parameters (field filters, max results). Should priority.
- [ ] **4.4 Tool registry page** — `/dashboard/agents/tools` — standalone list of all 17+ tools. Create custom tool form (with domain allowlist for implementation URL).

---

## Phase 5: Test Playground (R7)

Run agents and see results.

- [ ] **5.1 Test tab on agent detail** — Inline test panel. Input: text area for paste, or select transcript from Prompt Runner dropdown.
- [ ] **5.2 Run execution** — POST to appropriate runtime endpoint based on `runtime_type`. Display: formatted output, citations (per citation pipeline), token usage, duration, tool calls.
- [ ] **5.3 Citation display** — Render citations using existing InlineCitationBadge + ReferenceCard components. Deep links to PubMed/YouTube/etc.
- [ ] **5.4 Version comparison** — Run same input against two versions side-by-side. Should priority.

---

## Phase 6: Corpus Dashboard (R5)

Live status of all data sources.

- [ ] **6.1 Corpus dashboard page** — `/dashboard/agents/corpus` — live counts from all three Supabase projects.
- [ ] **6.2 Source cards** — Card per corpus: YouTube (videos + chunks), PubMed (articles + chunks), Podcasts (shows + episodes + chunks), Industry Articles (chunks). Show count, threshold indicator (green/red).
- [ ] **6.3 Health indicators** — Green/red dots per service: Agent Manager Supabase, CMS Supabase, Prompt Runner API. Latency display.
- [ ] **6.4 Unified stats** — Total indexed chunks, total tagged records, vocab terms count.

---

## Phase 7: Run Logs (R8)

Execution history and debugging.

- [ ] **7.1 Runs tab on agent detail** — List of runs for this agent: status, duration, token count, created date.
- [ ] **7.2 Run detail view** — Full input, output (JSONViewer), citations, errors, retrieval set (if logged).
- [ ] **7.3 Run list page** — `/dashboard/agents/runs` — all runs across all agents. Filter by agent, status, date range.
- [ ] **7.4 Workflow run view** — Step-by-step chain: show each step's agent, input, output, citations in sequence. Should priority.

---

## Phase 8: Workflow Builder (R6)

Multi-step agent chains.

- [ ] **8.1 Workflow list page** — `/dashboard/agents/workflows` — list all workflows with name, step count, mode.
- [ ] **8.2 Workflow editor** — Ordered list of steps. Each step: select agent, define input mapping (`$extracted.concerns`), output variable name.
- [ ] **8.3 Conditional steps** — Toggle skip conditions based on prior output. Should priority.
- [ ] **8.4 Workflow templates** — Pre-built chains: extraction -> research -> email, consultation -> TCP -> reach.

---

## Phase 9: Eval & Quality (R9)

Agent quality tracking.

- [ ] **9.1 Eval results on agent detail** — Score history chart, per-version breakdown.
- [ ] **9.2 Eval gate on promote** — Warning dialog when promoting a version with low eval scores. Should priority.
- [ ] **9.3 Inline eval** — Run evaluation on a completed run from the run detail view.

---

## Phase 10: Polish & Integration

- [ ] **10.1 Auth gate** — Add Vercel password protection before playground/run logs go live (PHI requirement).
- [ ] **10.2 Error envelope** — Implement error responses per RETRIEVAL_SERVICE.md §12 across all API calls.
- [ ] **10.3 Runtime adapter stub** — Define the adapter interface (input: normalized request; output: AgentResponse or error). Implement for `prompt_runner` runtime as first adapter.
- [ ] **10.4 SSE prep** — Design API endpoints as SSE-capable even if v1 is request/response.

---

## Build order recommendation

**Start with**: Phase 1 (shared components) + Phase 2 (registry) — this gives you the entry point and the table/dialog/select primitives everything else needs.

**Then**: Phase 3 (detail/versions) + Phase 4 (tools) — the core editing experience.

**Then**: Phase 5 (playground) + Phase 6 (corpus dashboard) — testing and monitoring.

**Defer**: Phase 7-9 (runs/workflows/eval) — these build on top of a working agent lifecycle.

**Critical path**: P2 (migration) -> P3 (Supabase clients) -> 2.1-2.2 (route + list) -> 3.1-3.3 (detail + editor) -> 5.1-5.2 (playground).

---

## What NOT to build

- No Pulse integration (retired)
- No Mid-Stream sync (read-only)
- No migration from `a360_agents` / `ie_agents` — fresh start
- No drag-and-drop workflow builder — ordered list is sufficient
- No full RBAC — Vercel password protection is sufficient for internal tool
- No real-time streaming in v1 — design for it, don't implement yet
