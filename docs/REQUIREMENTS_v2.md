# A360 Agent Manager — Requirements (v2)

Rewritten against the v2 data model (DATA_SOURCES_v2.md). No legacy references.
Supersedes the original REQUIREMENTS.md which referenced v1 tables and counts.

**Status**: Active
**Last Updated**: 2026-06-11

---

## Source of Truth

- **Agent definitions**: Agent Manager Supabase (`aejskvmpembryunnbgrk`) — the Manager owns agent definitions
- **Content corpora**: CMS Supabase (`gjqicqldjgvrwmtkliie`) — 529K vectorized chunks
- **Transcripts/Runs**: Prompt Runner Supabase via Railway API (`ksutsaiogmicgaarocba`)
- **Retrieval pipeline**: See `RETRIEVAL_SERVICE.md` and `RETRIEVAL_ARCHITECTURE.md`

No `a360_agents`. No `gl_agent_fuel_documents`. No GL Supabase (`wvpgmawrizwkmvfnwqfl`). Fresh database.

---

## R1. Agent Registry

| ID | Requirement | Priority |
|----|------------|----------|
| R1.1 | View all agents registered in Agent Manager Supabase with status, category, runtime type, active version | Must |
| R1.2 | Filter/search agents by status (draft/active/deprecated), category, runtime type | Must |
| R1.3 | Create new agent definitions (name, key, category, type, description) | Must |
| R1.4 | Edit agent metadata (description, category, status, model) | Must |
| R1.5 | Show agent health: has active version, has been tested, has eval results | Should |
| R1.6 | Bulk status view: how many agents are active vs draft vs deprecated | Should |

**Note**: Agent count starts at zero in the fresh DB. The registry grows as agents are created through this UI.

---

## R2. Version Management

| ID | Requirement | Priority |
|----|------------|----------|
| R2.1 | View version history per agent (semver, status, created date, notes) | Must |
| R2.2 | Create new version: system prompt, model, runtime type, tool config, output schema | Must |
| R2.3 | Promote version: draft -> candidate -> active (sets `active_version_id` on agent) | Must |
| R2.4 | Archive/rollback: revert to a previous version | Must |
| R2.5 | Diff view: compare two versions side-by-side (prompt, tools, schema changes) | Should |
| R2.6 | Version notes: record why a version was created or promoted | Should |

---

## R3. Prompt Editor

| ID | Requirement | Priority |
|----|------------|----------|
| R3.1 | Edit system prompt with syntax highlighting / monospace editor | Must |
| R3.2 | Select model/provider (Claude Sonnet, Claude Opus, Haiku, GPT-4o, etc.) | Must |
| R3.3 | Set constraints: temperature, max_tokens, max_tool_rounds | Must |
| R3.4 | Toggle citation_required, approval_required flags | Must |
| R3.5 | Define output JSON schema (structured output contract) | Should |
| R3.6 | Template variables: support `{patient_age}`, `{concerns}` etc. in prompts | Should |

---

## R4. Tool Registry & Assignment

| ID | Requirement | Priority |
|----|------------|----------|
| R4.1 | View all available tools with description, tables accessed, data source (see seeded tools in migration) | Must |
| R4.2 | Assign tools to agent versions (checklist: enable/disable per tool) | Must |
| R4.3 | Per-agent tool configuration: field filters, max results, custom params | Should |
| R4.4 | Show which tables each tool reads/writes (data lineage visibility) | Must |
| R4.5 | Create custom tools (name, description, parameter schema, implementation URL) — domain-allowlisted to prevent SSRF | Should |
| R4.6 | Tool usage stats: which agents use which tools, how often called | Nice |

**Seeded tools** (17): defined in `supabase/migrations/20260611_agent_manager_tables.sql` — GL product tools, CMS RAG search tools, Prompt Runner tools, external search tools.

---

## R5. Data Source Visibility (Corpus Dashboard)

| ID | Requirement | Priority |
|----|------------|----------|
| R5.1 | Show all data sources: Agent Manager Supabase, CMS Supabase (4 corpora), Prompt Runner API | Must |
| R5.2 | Per-source: row/chunk count, last updated, health status | Must |
| R5.3 | Corpus dashboard with live counts from all three Supabase projects (see DATA_SOURCES_v2.md §4) | Must |
| R5.4 | Health indicators: green/red per service with latency threshold (< 2s) | Should |
| R5.5 | Chunk count thresholds: YouTube > 200K, PubMed > 35K, Podcast > 200K, Industry > 80K | Should |

---

## R6. Workflow Builder

| ID | Requirement | Priority |
|----|------------|----------|
| R6.1 | Define multi-step workflows: ordered list of agent steps | Must |
| R6.2 | Wire step outputs to next step inputs (input mapping: `$extracted.concerns`) | Must |
| R6.3 | Two modes: autonomous (model picks tools) vs workflow (explicit step order) | Must |
| R6.4 | Conditional steps: skip based on prior output (e.g., skip PubMed if low-risk) | Should |
| R6.5 | Workflow templates: pre-built chains (extraction -> research -> email, etc.) | Should |
| R6.6 | Visual step display showing data flow between agents | Nice |

---

## R7. Test Playground

| ID | Requirement | Priority |
|----|------------|----------|
| R7.1 | Select an agent or workflow to test | Must |
| R7.2 | Input: paste text, select transcript from Prompt Runner, or enter structured JSON | Must |
| R7.3 | Run agent and display output with formatted JSON | Must |
| R7.4 | Show citations returned by the agent with source links (per RETRIEVAL_SERVICE.md citation pipeline) | Must |
| R7.5 | Show token usage, duration, cost estimate, tool calls made | Should |
| R7.6 | Compare outputs: run same input against two versions side-by-side | Should |
| R7.7 | Save test cases for regression testing | Nice |

**PHI note**: Playground pulls transcripts which contain patient data. Before this ships, add Vercel password protection or equivalent auth gate. Transcripts in an unauthenticated preview URL is not acceptable.

---

## R8. Run Logs & History

| ID | Requirement | Priority |
|----|------------|----------|
| R8.1 | List all agent runs with status, agent, duration, token count | Must |
| R8.2 | Filter runs by agent, workflow, status, date range | Must |
| R8.3 | View run detail: full input, output, citations, errors, retrieval set | Must |
| R8.4 | View workflow run: see each step's input/output in chain | Should |
| R8.5 | Export run data (JSON) | Nice |

**PHI note**: Run logs contain transcript input/output. Same auth requirement as R7.

---

## R9. Evaluation & Quality

| ID | Requirement | Priority |
|----|------------|----------|
| R9.1 | View eval results per agent: scores over time, by version | Must |
| R9.2 | Link to DeepEval / Accuracy project results | Should |
| R9.3 | Run inline evaluation from a completed run | Should |
| R9.4 | Score trends: is this agent getting better or worse across versions | Should |
| R9.5 | Quality gates: warn before promoting a version with low eval scores | Should |

**Promoted from Nice to Should**: for a platform generating clinical treatment recommendations, eval gates before promotion are important.

---

## R10. Citations & Provenance

| ID | Requirement | Priority |
|----|------------|----------|
| R10.1 | Citations born at retrieval time — LLM cites retrieval IDs only, post-processor resolves to metadata (see RETRIEVAL_SERVICE.md §1, §8) | Must |
| R10.2 | Bidirectional validation: cited IDs must be subset of retrieved set; unreferenced [N] markers stripped and logged as violations | Must |
| R10.3 | Citations logged to `agent_citations` table per run | Must |
| R10.4 | Citation viewer: click to see source detail with deep links (PubMed URL, YouTube timestamp, PDF page) | Should |
| R10.5 | Citation coverage: % of retrieved sources that were cited in output | Nice |

**Confidence display**: derived from retrieval scores, not LLM self-report. Display as relevance indicator, never as "% confident."

---

## R11. Credentials & Connectivity

| ID | Requirement | Priority |
|----|------------|----------|
| R11.1 | Store all connection credentials in env vars: `NEXT_PUBLIC_AGENT_SUPABASE_URL`, `NEXT_PUBLIC_CMS_SUPABASE_URL`, `NEXT_PUBLIC_PR_SUPABASE_URL`, LLM keys | Must |
| R11.2 | Health check dashboard: can we reach Agent Manager Supabase? CMS Supabase? Prompt Runner API? | Must |
| R11.3 | Connection status indicator in UI (green/red per service) | Should |
| R11.4 | Env var template (`.env.local.example`) with all required keys documented | Done |

---

## R12. Runtime Agnostic

| ID | Requirement | Priority |
|----|------------|----------|
| R12.1 | Each agent version has a `runtime_type` field | Must |
| R12.2 | Supported runtimes: prompt_runner, claude_tool_use, openai_agents_sdk, dify_workflow, custom_fastapi, bedrock | Must |
| R12.3 | Playground routes test execution to the correct runtime based on `runtime_type` | Must |
| R12.4 | UI does not depend on any single runtime — it's a control plane, not an executor | Must |
| R12.5 | Runtime adapter interface: normalized request in, `AgentResponse` or error envelope out, citation passthrough, token/duration metrics (see RETRIEVAL_SERVICE.md §12) | Must |

---

## Non-Requirements (Explicitly Out of Scope for v1)

| What | Why |
|------|-----|
| Full RBAC | Not needed yet — internal tool. But basic auth (Vercel password) IS required before run logs/playground exist (PHI). |
| Real-time streaming in v1 playground | First version is request/response. Design the API as SSE for future use. |
| Visual drag-and-drop workflow builder | Ordered list is sufficient |
| Replacing Prompt Runner runtime | Manager stores definitions, PR executes. Manager is source of truth; PR reads from it. |
| Replacing Dify | Dify is one runtime option, not replaced |
| Mid-Stream integration | Mid-Stream is read-only from Claude Code |

---

## Agent Definition Ownership

**Decision**: The Agent Manager database is the single source of truth for agent definitions. Prompt Runner reads agent definitions from the Manager DB at execution time. PR's own agent CRUD (`POST/PATCH/DELETE /agents` writing `ie_agents`) is frozen — no new agents created there.

---

## Success Criteria

The Agent Manager is working when you can:

1. Open the UI, see all agents registered in the Manager DB with their status and active version
2. Create a new agent, edit its prompt, add/remove tools, save as new version
3. Promote a version to active (with eval gate warning if scores are low)
4. Define a multi-step workflow: transcript -> extraction -> PubMed research -> followup email
5. Run that workflow in the playground and see structured output with retrieval-sourced citations
6. View the run log showing each step's input, output, retrieval set, and validated citations
7. Check connectivity to Agent Manager Supabase, CMS Supabase, and Prompt Runner from the health dashboard
8. Corpus dashboard shows live chunk counts from all three Supabase projects
