# A360 Agent Manager — Requirements

High-level requirements for the Agent Manager control plane.

---

## R1. Agent Registry

| ID | Requirement | Priority |
|----|------------|----------|
| R1.1 | View all 65 registered agents with status, category, runtime type, active version | Must |
| R1.2 | Filter/search agents by status (draft/active/deprecated), category, runtime type | Must |
| R1.3 | Create new agent definitions (name, key, category, type, description) | Must |
| R1.4 | Edit agent metadata (description, category, status, model) | Must |
| R1.5 | Show agent health: has active version, has fuel docs, has eval results | Should |
| R1.6 | Bulk status view: how many agents are active vs draft vs deprecated | Should |

---

## R2. Version Management

| ID | Requirement | Priority |
|----|------------|----------|
| R2.1 | View version history per agent (semver, status, created date, notes) | Must |
| R2.2 | Create new version: system prompt, model, runtime type, tool config, output schema | Must |
| R2.3 | Promote version: draft → candidate → active (sets `active_version_id` on agent) | Must |
| R2.4 | Archive/rollback: revert to a previous version | Must |
| R2.5 | Diff view: compare two versions side-by-side (prompt, tools, schema changes) | Should |
| R2.6 | Version notes: record why a version was created or promoted | Should |

---

## R3. Prompt Editor

| ID | Requirement | Priority |
|----|------------|----------|
| R3.1 | Edit system prompt with syntax highlighting / monospace editor | Must |
| R3.2 | Select model/provider (Claude Sonnet, Claude Opus, GPT-4o, etc.) | Must |
| R3.3 | Set constraints: temperature, max_tokens, max_tool_rounds | Must |
| R3.4 | Toggle citation_required, approval_required flags | Must |
| R3.5 | Define output JSON schema (structured output contract) | Should |
| R3.6 | Template variables: support `{patient_age}`, `{concerns}` etc. in prompts | Should |

---

## R4. Tool Registry & Assignment

| ID | Requirement | Priority |
|----|------------|----------|
| R4.1 | View all available tools (17 seeded) with description, tables accessed, data source | Must |
| R4.2 | Assign tools to agent versions (checklist: enable/disable per tool) | Must |
| R4.3 | Per-agent tool configuration: field filters, max results, custom params | Should |
| R4.4 | Show which tables each tool reads/writes (data lineage visibility) | Must |
| R4.5 | Create custom tools (name, description, parameter schema, implementation URL) | Should |
| R4.6 | Tool usage stats: which agents use which tools, how often called | Nice |

---

## R5. Data Source Visibility

| ID | Requirement | Priority |
|----|------------|----------|
| R5.1 | Show all data sources: GL Supabase tables, CMS Supabase tables, Prompt Runner endpoints, local files | Must |
| R5.2 | Per-source: row count, last updated, which agents consume it | Must |
| R5.3 | Source policies per agent version: which tables/fields this agent can access | Should |
| R5.4 | Coverage dashboard: what % of products have facts, relationships, anatomy, concerns, fuel docs | Should |
| R5.5 | Highlight known blockers: 14% anatomy, 16% relationships, 13% concerns | Should |

---

## R6. Workflow Builder

| ID | Requirement | Priority |
|----|------------|----------|
| R6.1 | Define multi-step workflows: ordered list of agent steps | Must |
| R6.2 | Wire step outputs to next step inputs (input mapping: `$extracted.concerns`) | Must |
| R6.3 | Two modes: autonomous (model picks tools) vs workflow (explicit step order) | Must |
| R6.4 | Conditional steps: skip based on prior output (e.g., skip PubMed if low-risk) | Should |
| R6.5 | Workflow templates: pre-built chains (extraction→research→email, etc.) | Should |
| R6.6 | Visual step display showing data flow between agents | Nice |

---

## R7. Test Playground

| ID | Requirement | Priority |
|----|------------|----------|
| R7.1 | Select an agent or workflow to test | Must |
| R7.2 | Input: paste text, select transcript from Prompt Runner, or enter structured JSON | Must |
| R7.3 | Run agent and display output with formatted JSON | Must |
| R7.4 | Show citations returned by the agent with source links | Must |
| R7.5 | Show token usage, duration, tool calls made | Should |
| R7.6 | Compare outputs: run same input against two versions side-by-side | Should |
| R7.7 | Save test cases for regression testing | Nice |

---

## R8. Run Logs & History

| ID | Requirement | Priority |
|----|------------|----------|
| R8.1 | List all agent runs with status, agent, duration, token count | Must |
| R8.2 | Filter runs by agent, workflow, status, date range | Must |
| R8.3 | View run detail: full input, output, citations, errors | Must |
| R8.4 | View workflow run: see each step's input/output in chain | Should |
| R8.5 | Export run data (JSON) | Nice |

---

## R9. Evaluation & Quality

| ID | Requirement | Priority |
|----|------------|----------|
| R9.1 | View eval results per agent: scores over time, by version | Must |
| R9.2 | Link to DeepEval / Accuracy project results | Should |
| R9.3 | Run inline evaluation from a completed run | Should |
| R9.4 | Score trends: is this agent getting better or worse across versions | Should |
| R9.5 | Quality gates: warn before promoting a version with low eval scores | Nice |

---

## R10. Citations & Provenance

| ID | Requirement | Priority |
|----|------------|----------|
| R10.1 | Every tool returns structured source objects (source_type, source_id, title, snippet, url) | Must |
| R10.2 | Agent output must reference only retrieved source IDs (no hallucinated citations) | Must |
| R10.3 | Citations logged to `agent_citations` table per run | Must |
| R10.4 | Citation viewer: click to see source detail (PubMed article, YouTube timestamp, GL product) | Should |
| R10.5 | Citation coverage: % of claims in output that have backing evidence | Nice |

---

## R11. Credentials & Connectivity

| ID | Requirement | Priority |
|----|------------|----------|
| R11.1 | Store all connection credentials in env vars (GL Supabase, CMS Supabase, Prompt Runner, LLM keys) | Must |
| R11.2 | Health check dashboard: can we reach GL Supabase? CMS Supabase? Prompt Runner? | Must |
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

---

## Non-Requirements (Explicitly Out of Scope)

| What | Why |
|------|-----|
| Auth / RBAC | Not needed yet — internal tool, Vercel preview URL |
| Real-time streaming | First version is request/response |
| Visual drag-and-drop workflow builder | Ordered list is sufficient |
| Replacing Prompt Runner runtime | Manager stores definitions, Prompt Runner executes |
| Replacing Dify | Dify is one runtime option, not replaced |
| Mid-Stream integration | Mid-Stream is read-only from Claude Code |
| Patient data display | PHI rules — no patient data in the Manager UI |

---

## Success Criteria

The Agent Manager is working when you can:

1. Open the UI, see all 65 agents with their status and active version
2. Click an agent, edit its prompt, add/remove tools, save as new version
3. Promote a version to active
4. Define the 4-step workflow: transcript → extraction → PubMed research → followup email
5. Run that workflow in the playground and see structured output with citations
6. View the run log showing each step's input, output, and sources
7. Check connectivity to GL Supabase, CMS Supabase, and Prompt Runner from the health dashboard
