---
phase: 15-runtime-stabilization
plan: 01
subsystem: api
tags: [claude-api, ai-sdk, sse, streaming, agent-runtime, supabase, tools]

requires:
  - phase: none
    provides: "existing lib/api/agents.ts, lib/api/runs.ts, lib/supabase.ts, lib/types/agents.ts"
provides:
  - "POST /api/agent-runner SSE endpoint for real agent execution"
  - "Five tool implementations against live Supabase and Railway data sources"
  - "executeAgentRun orchestrator with run persistence"
affects: [15-02-page-rewrite, 16-trace-contract, 17-inspector-ui]

tech-stack:
  added: []
  patterns: ["AI SDK v6 tool() + jsonSchema() pattern", "stopWhen(stepCountIs(N)) for multi-step tool use", "Structured error returns from tools (never throw)"]

key-files:
  created:
    - lib/agent-runtime/tools.ts
    - lib/agent-runtime/executor.ts
    - app/api/agent-runner/route.ts
  modified: []

key-decisions:
  - "AI SDK v6 uses stopWhen(stepCountIs(N)) instead of maxSteps — adapted from plan's maxSteps specification"
  - "AI SDK v6 tool-call uses 'input' field (not 'args'), tool-result uses 'output' field (not 'result') — adapted stream iteration accordingly"
  - "tool-error is a distinct stream part type in AI SDK v6 — handled separately from tool-result failures"

patterns-established:
  - "Agent runtime tool pattern: tool() + jsonSchema() from ai SDK, structured error objects on failure"
  - "SSE streaming pattern for agent runs: ReadableStream with JSON-encoded events"
  - "Run persistence pattern: createRun at start, updateRun with structured output or structured error in finally block"

requirements-completed: [RUN-01, RUN-02, RUN-03, RUN-04, RUN-05]

duration: 7min
completed: 2026-06-14
---

# Phase 15 Plan 01: Agent Runtime Backend Summary

**Real agent execution backend with five tool implementations, Claude streaming via AI SDK v6, and run persistence to Supabase**

## Performance

- **Duration:** 7 min
- **Started:** 2026-06-14T16:50:51Z
- **Completed:** 2026-06-14T16:58:19Z
- **Tasks:** 2
- **Files created:** 3

## Accomplishments
- Five tool implementations (get_patient_context, search_fuel_documents, get_evidence_links, search_clinical_literature, get_product_info) querying real Supabase and Railway data
- Executor orchestrating full agent run lifecycle: load agent/version, create run record, build tools, stream Claude API response, persist run with structured output or structured error
- SSE streaming POST endpoint at /api/agent-runner returning token, tool_call, tool_result, tool_error, and done events

## Task Commits

Each task was committed atomically:

1. **Task 1: Create tool implementations** - `901eafe` (feat)
2. **Task 2: Create executor and API route** - `804a08d` (feat)

## Files Created/Modified
- `lib/agent-runtime/tools.ts` - Five tool implementations with buildTools() filter by ToolBinding config
- `lib/agent-runtime/executor.ts` - executeAgentRun orchestrator with run persistence and error handling
- `app/api/agent-runner/route.ts` - SSE streaming POST endpoint

## Decisions Made
- AI SDK v6 renamed maxSteps to stopWhen(stepCountIs(N)) — adapted from plan specification
- AI SDK v6 changed tool-call field from args to input, tool-result from result to output — adapted stream iteration
- tool-error is a distinct stream part type in v6 (not just an error case of tool-result) — added dedicated handler

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] AI SDK v6 API changes from plan specification**
- **Found during:** Task 2 (executor build verification)
- **Issue:** Plan specified `maxSteps`, `part.textDelta`, `part.args`, `part.result` — all renamed in AI SDK v6
- **Fix:** Used `stopWhen(stepCountIs(N))`, `part.text`, `part.input`, `part.output`, and `tool-error` case
- **Files modified:** lib/agent-runtime/executor.ts
- **Verification:** `npx next build` passes type check
- **Committed in:** 804a08d (Task 2 commit)

**2. [Rule 3 - Blocking] Tool registry type mismatch**
- **Found during:** Task 1 (tools build verification)
- **Issue:** `ReturnType<typeof tool>` resolved to `Tool<never, never>` — incompatible with parameterized tools
- **Fix:** Used `ReturnType<typeof tool<any, any>>` for registry type
- **Files modified:** lib/agent-runtime/tools.ts
- **Verification:** `npx next build` passes type check
- **Committed in:** 901eafe (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Both fixes necessary for type-safe compilation with AI SDK v6. No scope creep.

## Issues Encountered
None beyond the AI SDK v6 API changes documented above.

## User Setup Required
None - no external service configuration required. Runtime uses existing environment variables (ANTHROPIC_API_KEY, AGENT_SUPABASE_SERVICE_KEY, CMS_SUPABASE_SERVICE_KEY, PROMPT_RUNNER_API_KEY).

## Next Phase Readiness
- Agent runtime backend complete and type-checked
- POST /api/agent-runner ready for consumption by Plan 02 (page rewrite)
- Phase 16 trace infrastructure can extend the executor's emit pattern

---
*Phase: 15-runtime-stabilization*
*Completed: 2026-06-14*
