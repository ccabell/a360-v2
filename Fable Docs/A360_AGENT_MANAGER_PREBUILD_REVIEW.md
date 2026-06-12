# A360 Agent Manager — Pre-Build Review (Conversation Record)

Decisions and findings from the 2026-06-11 architecture review of the Agent Manager documentation package (12 docs). Recorded so nothing lives only in chat history.

**Status**: Findings accepted in principle; execution pending
**Companion docs**: A360_SYSTEM_MAP.md, RETRIEVAL_SERVICE.md

---

## Findings (priority order)

### 1. Two conflicting sources of truth
DATA_SOURCES_v2.md declares a fresh start (new Agent Manager Supabase `aejskvmpembryunnbgrk`, "no legacy agents, no old GL Supabase, no agent fuel") while REQUIREMENTS.md is written against the v1 world (65 agents in `a360_agents`, GL coverage metrics, GL env vars, "see all 65 agents" success criteria). **Action**: archive DATA_SOURCES.md v1 with a superseded banner; rewrite REQUIREMENTS.md against v2 before any build.

### 2. Page designs don't cover the Agent Manager
REQUIREMENTS defines 12 requirement groups (registry, versions, prompt editor, tools, data sources, workflows, playground, run logs, eval, citations, connectivity, runtime routing). PAGE_DESIGNS covers 6 practitioner-facing product pages (Chat, RAG, TCP, Reach, Agent Tester, Consultation Intelligence). Only Agent Tester overlaps, thinly. **Action**: seven manager page designs needed (registry list+detail, version history+diff, prompt editor, tool assignment, workflow builder, run logs+detail, corpus/health dashboard). Decide explicitly whether the repo is the manager, the product, or both.

### 3. API contract is response-only
No request schema (message + what context?), no error envelope (only "no results" is defined), no schema_version, no conversation-history representation for multi-turn. CitationSourceType lacks podcast/industry; Supabase metadata enum is bound to v1 tables. Validation script misses inline [n] with no citation object (checks one direction only).

### 4. The runtime adapter is the actual product and is unspecified
R12 (runtime-agnostic: prompt_runner, claude_tool_use, openai_agents_sdk, dify_workflow, custom_fastapi, bedrock) has no adapter interface. Each runtime returns different shapes; the normalization layer (native response → AgentResponse + error envelope + citation passthrough + usage metrics) is the core abstraction and the hard engineering. README/INTEGRATION_DIAGRAM are Dify-centric, contradicting R12. **Action**: one-page adapter contract; every runtime implements it.

### 5. Citation integrity must be enforcement, not aspiration
R10.2 ("no hallucinated citations") has no mechanism. Enforce in the adapter layer: collect source IDs returned by tool calls during the run; validate output citations ⊆ retrieved set; strip violations and log. Gives R10.5 (citation coverage) nearly free.

### 6. Confidence display
LLM-self-reported 0–1 confidence rendered as "98% confident" next to clinical claims is uncalibrated, decorative, and a diligence flag. Either define computation (retrieval similarity for retrieved facts) or remove the percentage from UI.

### 7. PHI contradiction
Non-requirements say "no patient data in the Manager UI," but R7.2 (playground pulls transcripts) and R8.3 (full run input/output) make the run log a PHI store — behind an unauthenticated Vercel preview URL with auth explicitly out of scope. **Action before run logs exist**: minimal auth (Vercel password protection / Clerk) or transcript redaction at the adapter boundary.

### 8. Agent definition ownership ambiguous
"Manager stores definitions, Prompt Runner executes" — but the PR API exposes its own agent CRUD writing `ie_agents`. Two writable registries, no sync. **Action**: pick one — PR reads manager DB at execution, manager pushes on promote, or PR agent CRUD frozen.

### Smaller items
Eval gates (R9.5) promoted from Nice → Should for clinical content; per-agent/version cost rollups added to run metrics; "17 seeded tools" undefined in v2 docs — document the tool registry schema; custom tools with arbitrary implementation URLs are an SSRF vector — allowlist domains; guardrails (`gl_product_guardrails`) vanished from the v2 fresh-start table list — decide where contraindication/claims enforcement lives in the new schema.

## Agreed order of operations

1. Reconcile REQUIREMENTS with DATA_SOURCES_v2; archive v1
2. Decide agent-definition source of truth + PR sync model
3. Extend API contract (request schema, error envelope, schema_version, citation types, bidirectional validation)
4. Write the runtime adapter interface doc
5. Resolve PHI/auth before run logs exist
6. Build missing shared components (Table, Select, Tabs, Dialog, Monaco, JSON viewer, diff)
7. Write the 7 manager page designs
8. Implement citation enforcement in the adapter
