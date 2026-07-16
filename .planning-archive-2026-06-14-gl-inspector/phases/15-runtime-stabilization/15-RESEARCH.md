# Phase 15: runtime-stabilization - Research

**Researched:** 2026-06-14
**Domain:** Next.js 16 API routes, Vercel AI SDK v6 tool calling, Supabase multi-project data access, SSE streaming
**Confidence:** HIGH (all claims verified against installed package source or in-project code)

---

## Summary

Phase 15 replaces the 100% mock agent-tester page with a real in-project runtime. The current page (`app/dashboard/agent-tester/page.tsx`) calls `pickScenario()` and a `setTimeout` — zero real execution. This phase must produce a functioning end-to-end runtime: load an agent + active version from Agent Manager Supabase, build tool bindings for five real data sources, execute via Claude API with tool calling, stream output over SSE, and persist every run to `agent_runs`.

The codebase already has all the components needed. The working SSE streaming pattern lives in `/api/research/chat/route.ts` using Vercel AI SDK v6 `streamText`. The Supabase data layer (`lib/api/agents.ts`, `lib/api/runs.ts`) already reads from `agents`, `agent_versions`, and `agent_runs`. The three Supabase clients (`agentSupabase`, `cmsSupabase`, `prSupabase`) are configured. The missing piece is a new `/api/agent-runner/route.ts` that wires these together with real tool implementations and proper error handling.

The most important architectural decision is already locked: this runtime lives entirely in-project — NOT the Railway Prompt Runner. The `lib/prompt-runner.ts` file and `/api/playground/route.ts` are the OLD pattern; Phase 15 replaces them for agent execution. Patient/transcript data in the current UI routes also proxies to Railway, but RUN-03 requires tool implementations that can query PR Supabase directly or continue to proxy — this choice must be made during planning.

**Primary recommendation:** Build `/api/agent-runner/route.ts` as a ReadableStream SSE endpoint matching the existing `/api/research/chat/route.ts` pattern, using `streamText` with tool calling from AI SDK v6, with five tool implementations querying real Supabase data. Use `jsonSchema` (not Zod) for tool input schemas since zod is a transitive dependency not in package.json.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

No CONTEXT.md exists for Phase 15. Constraints are drawn from STATE.md locked decisions and ROADMAP.md success criteria.

### Locked Decisions (from STATE.md)

- Runtime executes in-project — Next.js API routes + Supabase + Claude API on Vercel. No Prompt Runner dependency for agent execution.
- Three Supabase instances: Agent Manager (agent defs/versions/tools/runs), CMS (RAG vectorized content), PR Supabase (transcripts/patients).
- Current agent-tester page is 100% mock (pickScenario + setTimeout). Phase 15 replaces it entirely before adding trace infrastructure in Phase 16.
- lib/prompt-runner.ts is LEGACY — proxies to Railway. Should NOT be used for new runtime.
- /api/playground/route.ts is the OLD pattern to replace.

### Claude's Discretion

- How to implement patient context tool: direct prSupabase query vs. continued Railway API proxy
- Whether agent-runner route handles the page UI rewrite or just the API
- Exact SSE event schema emitted by the new route (Phase 16 will formalize, but Phase 15 needs something functional)
- Whether to implement all five tools in one route or split into sub-routes
- Error message format and structure for RUN-04 and RUN-05

### Deferred Ideas (OUT OF SCOPE — Phase 16+)

- Structured AgentRunEvent schema (Phase 16)
- agent_run_events and agent_run_artifacts tables (Phase 16)
- Run replay from stored events (Phase 16)
- Live inspector timeline UI (Phase 17)
- Output viewer (Phase 18)
- Demo mode / seeded scenarios (Phase 19)
- PHI/PII redaction (v2.1)
- Side-by-side run comparison (v2.1)
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| RUN-01 | Agent runtime executes in-project (Next.js API route + Supabase + Claude API) — no Prompt Runner dependency | New `/api/agent-runner/route.ts` using `streamText` from AI SDK v6. Working pattern in `/api/research/chat/route.ts`. |
| RUN-02 | Runtime loads agent definition and active version prompt from Agent Manager Supabase | `getAgent(id)` and `getVersion(versionId)` already exist in `lib/api/agents.ts`. Agent has `active_version_id`; version has `system_prompt`, `model`, `constraints`, `tool_config`. |
| RUN-03 | Runtime provides tools querying real data: patient context (PR Supabase), fuel docs (Agent Manager), evidence links (Agent Manager), clinical literature (CMS Supabase), product info (Agent Manager) | Five tool implementations needed. agentSupabase and cmsSupabase clients exist and used. prSupabase client defined but never used directly — patient data currently only via Railway API. Confirmed challenge. |
| RUN-04 | When a tool fails, runtime continues with remaining tools and marks failed step with structured error | AI SDK v6 `streamText` with `fullStream` exposes `tool-error` parts. Tools should catch internally and return structured error objects instead of throwing. |
| RUN-05 | Run never ends with only "No output generated" — structured error identifies which step failed, what completed, and recommended action | `onFinish` callback on `streamText` can inspect results; fallback error output written to run record if `text` is empty. |
</phase_requirements>

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `ai` (Vercel AI SDK) | 6.0.201 (installed) | `streamText` with tool calling, SSE streaming | Already used in `/api/research/chat/route.ts`; proven pattern in codebase |
| `@ai-sdk/anthropic` | 3.0.84 (installed) | `createAnthropic` provider | Already used; matches installed Claude models |
| `@supabase/supabase-js` | 2.108.1 (installed) | Query Agent Manager, CMS, PR Supabase | All three clients configured in `lib/supabase.ts` |
| `next` | 16.2.9 (installed) | App Router API routes, ReadableStream SSE | Project framework |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `jsonSchema` from `ai` | (bundled) | Tool input schema definitions without Zod | Use instead of Zod — Zod is transitive dep, not in package.json |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `jsonSchema` | `zod` + `zodSchema` | Zod works but is not a declared dependency; jsonSchema is portable and explicit |
| Custom ReadableStream SSE | `streamText.toTextStreamResponse()` | Custom stream gives more control for multi-event types; toTextStreamResponse() is fine for pure text streaming but we need to emit non-text events (tool results, run state) |
| Direct `prSupabase` queries | Railway API proxy pattern | Railway pattern already works; direct Supabase avoids Railway latency but requires knowing PR Supabase table schema |

**Installation:** No new packages needed. All required libraries are already installed.

---

## Architecture Patterns

### New Files This Phase

```
app/
  api/
    agent-runner/
      route.ts            ← NEW: SSE endpoint for in-project agent execution
  dashboard/
    agent-tester/
      page.tsx            ← REPLACE: remove mock, add real agent/patient selectors + SSE consumer
lib/
  agent-runtime/          ← NEW directory
    tools.ts              ← NEW: five tool implementations
    executor.ts           ← NEW: orchestrates streamText call with tools + run persistence
```

### Pattern 1: SSE Route Structure (follow existing /api/research/chat/route.ts)

**What:** New route at `/api/agent-runner` emits SSE events using a custom `ReadableStream<Uint8Array>`. The controller calls `emit()` for each significant event, then iterates `streamText.fullStream` to relay token deltas and tool call/result events.

**When to use:** Any time agent execution must stream to the browser with intermediate tool call visibility.

```typescript
// Source: /c/projects/a360-v2/app/api/research/chat/route.ts (established pattern)
export const dynamic = "force-dynamic";
export const maxDuration = 60;  // seconds — matches existing chat route

export async function POST(req: NextRequest) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (ev: unknown) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(ev)}\n\n`));
      try {
        // ... execution logic
      } finally {
        controller.close();
      }
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
```

### Pattern 2: AI SDK v6 Tool Calling

**What:** `streamText` accepts a `tools` object. Each tool has `description`, `inputSchema` (using `jsonSchema()`), and `execute`. The SDK calls `execute` automatically when Claude invokes the tool, and the result is fed back into the context.

**Critical AI SDK v6 change from v5:** Tool schema uses `inputSchema` not `parameters`. The `tool()` helper from `@ai-sdk/provider-utils` is re-exported from `ai`.

```typescript
// Source: verified against /c/projects/a360-v2/node_modules/@ai-sdk/provider-utils/dist/index.d.ts
import { streamText, tool, jsonSchema } from "ai";

const result = streamText({
  model: anthropic(agentVersion.model ?? "claude-haiku-4-5-20251001"),
  system: agentVersion.system_prompt ?? "",
  prompt: runInput.user_message,
  maxSteps: agentVersion.constraints?.max_tool_rounds ?? 5,
  temperature: agentVersion.constraints?.temperature ?? 0.3,
  maxOutputTokens: agentVersion.constraints?.max_tokens ?? 4096,
  tools: {
    get_patient_context: tool({
      description: "Fetch patient demographics and recent transcripts",
      inputSchema: jsonSchema<{ patient_id: string }>({
        type: "object",
        properties: { patient_id: { type: "string" } },
        required: ["patient_id"],
      }),
      execute: async ({ patient_id }) => getPatientContext(patient_id),
    }),
    // ... other tools
  },
});
```

### Pattern 3: fullStream Iteration for Tool Visibility

**What:** `streamText.fullStream` is an `AsyncIterableStream<TextStreamPart<TOOLS>>`. Iterating it exposes token deltas, tool-call events, tool-result events, and finish events. This is how Phase 15 can emit tool call progress to the browser even though Phase 16 will formalize the schema.

```typescript
// Source: verified against node_modules/ai/dist/index.d.ts — TextStreamPart types
for await (const part of result.fullStream) {
  if (part.type === "text-delta") {
    emit({ type: "token", text: part.text });
  } else if (part.type === "tool-call") {
    emit({ type: "tool_call", toolName: part.toolName, args: part.args });
  } else if (part.type === "tool-result") {
    emit({ type: "tool_result", toolName: part.toolName, result: part.result });
  } else if (part.type === "tool-error") {
    emit({ type: "tool_error", toolName: part.toolName, error: String(part.error) });
  }
}
```

### Pattern 4: Agent + Version Loading (already implemented)

**What:** `lib/api/agents.ts` already has `getAgent(id)` and `getVersion(versionId)`. The agent's `active_version_id` field points to the version to use. Version contains `system_prompt`, `model`, `constraints` (max_tokens, temperature, max_tool_rounds), and `tool_config` (array of `ToolBinding` = which tools are enabled for this agent).

```typescript
// Source: /c/projects/a360-v2/lib/api/agents.ts (existing code)
const agent = await getAgent(agentId);           // agents table
const version = await getVersion(agent.active_version_id);  // agent_versions table
// version.system_prompt → system prompt for Claude
// version.constraints → { temperature, max_tokens, max_tool_rounds }
// version.tool_config → ToolBinding[] (which tools this agent uses)
```

### Pattern 5: Run Persistence (already implemented)

**What:** `lib/api/runs.ts` has `createRun` and `updateRun` targeting `agent_runs` in agentSupabase. Create at start with `status: "running"`, update at end with final status, output, duration_ms.

```typescript
// Source: /c/projects/a360-v2/lib/api/runs.ts (existing code)
const run = await createRun({
  agent_id: agentId,
  version_id: version.id,
  input: { user_message, patient_id },
  status: "running",
});
// ... execute ...
await updateRun(run.id, {
  status: "completed",
  output: { text: fullText },
  duration_ms: Date.now() - startMs,
});
```

### Anti-Patterns to Avoid

- **Importing from `lib/prompt-runner.ts`**: This is the old Railway proxy. The new runtime must NOT call Railway for agent execution. (Patient data access may still use Railway for now — see pitfalls.)
- **Using `lib/prompt-runner.ts` `listAgents()`**: This returns Railway agents, not Agent Manager Supabase agents. Use `lib/api/agents.ts` `listAgents()`.
- **Zod as a direct dependency**: Not in package.json. Use `jsonSchema()` from `ai` for tool input schemas.
- **`parameters` field on tool**: AI SDK v6 uses `inputSchema`, not `parameters`. The v5 API is gone.
- **Throwing from tool `execute`**: Throwing causes the full stream to fail. Catch internally and return a structured error object so the run continues (RUN-04).
- **Relying on `toTextStreamResponse()`**: This method only emits text tokens. The agent-runner route needs to emit custom events (tool calls, status, run ID) — must use custom ReadableStream.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SSE streaming infrastructure | Custom chunked-transfer encoding | `ReadableStream<Uint8Array>` + `text/event-stream` headers | Already established in research/chat route — exact pattern to follow |
| Tool call orchestration | Manual tool dispatch loop | `streamText` with `tools` + `maxSteps` | AI SDK handles multi-turn tool calls, retries, result injection automatically |
| Agent definition loading | DB query inline in route | `getAgent()` + `getVersion()` from `lib/api/agents.ts` | Already implemented, tested, typed |
| Run persistence | Inline Supabase calls in route | `createRun()` + `updateRun()` from `lib/api/runs.ts` | Already implemented |
| Anthropic client creation | Direct `new Anthropic()` | `createAnthropic({ apiKey })` from `@ai-sdk/anthropic` | Matches AI SDK v6; already used in research/chat route |

**Key insight:** The research/chat route is a working blueprint. The agent-runner route is the same pattern plus tool calling and run persistence around it.

---

## Common Pitfalls

### Pitfall 1: PR Supabase Schema is Unknown
**What goes wrong:** `prSupabase` client is defined in `lib/supabase.ts` but never used anywhere in the codebase. All patient/transcript data currently flows through the Railway API. Direct Supabase queries will fail if table names differ from what's assumed.
**Why it happens:** The PR Supabase project (`ksutsaiogmicgaarocba`) is accessed "primarily via Railway API" per `DATA_SOURCES_v2.md`. The table schema for direct SQL access is not documented anywhere in the project.
**How to avoid:** For Phase 15, the patient context tool should proxy to the existing Railway API (same as current `/api/patients/[id]` route does) rather than hit PR Supabase directly. This meets RUN-03 (real patient data) without assuming an undocumented schema. Rename the implementation if needed but keep the data source working.
**Warning signs:** `prSupabase.from("patients")` — there is no evidence "patients" is the actual table name in that project; the Railway API calls an internal FastAPI that reads it.

### Pitfall 2: AI SDK v6 Tool Schema is `inputSchema` not `parameters`
**What goes wrong:** Every AI SDK tutorial and most training data uses `parameters: z.object({...})`. AI SDK v6 changed this to `inputSchema`. Using `parameters` will cause a TypeScript error and the tool will not be registered.
**Why it happens:** AI SDK v6 (`ai@6.0.201`) is installed — a major version with breaking changes vs. v5.
**How to avoid:** Use `inputSchema: jsonSchema<T>({...})` where `jsonSchema` is imported from `ai`. Verified against `node_modules/@ai-sdk/provider-utils/dist/index.d.ts`.
**Warning signs:** `Property 'parameters' does not exist on type 'Tool<...'` TypeScript error.

### Pitfall 3: Tool Throw vs. Structured Error Return
**What goes wrong:** If a tool's `execute` function throws, the entire `streamText` call may fail, producing "No output generated" — exactly what RUN-05 forbids.
**Why it happens:** AI SDK tool execution is async; an unhandled throw propagates up. The run fails rather than continuing with other tools.
**How to avoid:** Wrap every tool `execute` body in try/catch. Return a structured error object on failure: `{ error: true, tool: "get_patient_context", message: "Patient not found", completed: false }`. The model will see the tool result and can acknowledge the failure in its response.
**Warning signs:** `finishReason: "error"` in the stream with no partial output.

### Pitfall 4: Empty `active_version_id` on Agent
**What goes wrong:** The `agents` table has an `active_version_id` FK that can be `null` for `draft` agents. Calling `getVersion(null)` will throw.
**Why it happens:** Agents without a promoted version have no active version.
**How to avoid:** Check `agent.active_version_id` before loading the version. Return a clear error to the client: `"Agent has no active version — promote a version first"`. Guard this before any API call.
**Warning signs:** `getVersion` receiving `null` or `undefined`.

### Pitfall 5: maxDuration Must Match Vercel Tier
**What goes wrong:** Agent runs with multiple tool calls can exceed 30-60 seconds. If `maxDuration` is too low, Vercel silently terminates the route mid-stream.
**Why it happens:** Vercel's default timeout for Hobby/Pro tier differs. The existing routes use `export const maxDuration = 60`.
**How to avoid:** Set `export const maxDuration = 60` on the agent-runner route. For agents with many tool calls, document that this may be a constraint.
**Warning signs:** Stream terminates without a `done` event.

### Pitfall 6: CMS Supabase RPC Functions are Embedding-Required
**What goes wrong:** The CMS Supabase corpora (PubMed, YouTube, podcasts, industry) are accessed via RPC functions that require a pre-computed embedding vector: `match_pubmed_articles(query_embedding, match_count, match_threshold)`. The agent-runner cannot call these without first generating an embedding.
**Why it happens:** CMS uses pgvector for semantic search. The RPC pattern (`match_*`) requires an embedding, not a text query.
**How to avoid:** The clinical literature tool must either: (a) use a text-search fallback (full-text search on `chunk_text` without vector similarity), or (b) generate an embedding first using the Anthropic/OpenAI embedding API before calling the RPC. Option (b) is more accurate. The existing CMS Supabase RPC function names are: `match_youtube_transcripts`, `match_pubmed_articles` (verified from `DATA_SOURCES_v2.md`).
**Warning signs:** CMS tool returns empty results on any query.

### Pitfall 7: `agent_tester` Page Needs Agent + Patient Selectors
**What goes wrong:** The current page has a free-text prompt box — no agent selector, no patient selector. Real execution requires both an `agent_id` and optionally a `patient_id` (for tools that need patient context). The page must be rebuilt to expose these selectors.
**Why it happens:** The mock page only needed a prompt string. The real runtime needs structured inputs.
**How to avoid:** The page redesign should include: (1) agent dropdown populated from `GET /api/agents?status=active`, (2) optional patient selector populated from `GET /api/patients`, (3) a freeform user message field, (4) Run button that POSTs to `/api/agent-runner`. The existing `/api/agents` and `/api/patients` routes already return the right data.
**Warning signs:** Sending a run request without `agent_id` to the new route.

---

## Code Examples

### Tool Returning Structured Error on Failure
```typescript
// Source: pattern from RUN-04 requirement + AI SDK v6 verified types
execute: async ({ patient_id }) => {
  try {
    const data = await fetchPatientContext(patient_id);
    return { success: true, patient: data };
  } catch (err) {
    return {
      success: false,
      tool: "get_patient_context",
      error: err instanceof Error ? err.message : "Unknown error",
      recommendation: "Check that patient_id is valid and PR Supabase is reachable",
    };
  }
},
```

### Run Persistence with Error Fallback
```typescript
// Source: pattern derived from lib/api/runs.ts + RUN-05 requirement
const startMs = Date.now();
const run = await createRun({ agent_id, version_id: version.id, input, status: "running" });
let fullText = "";
let toolErrors: string[] = [];

try {
  const result = streamText({ ... });
  for await (const part of result.fullStream) {
    if (part.type === "text-delta") fullText += part.text;
    if (part.type === "tool-error") toolErrors.push(part.toolName);
    emit(part);  // relay to browser
  }
} catch (err) {
  // generation failed entirely
} finally {
  const hasOutput = fullText.trim().length > 0;
  await updateRun(run.id, {
    status: hasOutput ? "completed" : "failed",
    output: hasOutput
      ? { text: fullText }
      : {
          error: "No output generated",
          failed_tools: toolErrors,
          recommendation: "Check tool configurations and API key availability",
        },
    duration_ms: Date.now() - startMs,
  });
}
```

### Agent Loading with Guard
```typescript
// Source: lib/api/agents.ts pattern + RUN-02 requirement
const agent = await getAgent(agentId);
if (!agent.active_version_id) {
  return NextResponse.json(
    { error: "Agent has no active version. Promote a version first." },
    { status: 422 }
  );
}
const version = await getVersion(agent.active_version_id);
```

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `ANTHROPIC_API_KEY` or `AI_GATEWAY_API_KEY` | Claude API calls | Check `.env.local` | — | `/api/research/chat` has a deterministic fallback — same pattern applies |
| `NEXT_PUBLIC_AGENT_SUPABASE_URL` + `AGENT_SUPABASE_SERVICE_KEY` | Agent Manager queries | Confirmed in `.env.local` | agentSupabase project `aejskvmpembryunnbgrk` | None — blocking |
| `NEXT_PUBLIC_CMS_SUPABASE_URL` + `CMS_SUPABASE_SERVICE_KEY` | CMS RAG search tool | Unknown — not visible in `.env.local` excerpt | — | Skip clinical literature tool if not configured |
| `NEXT_PUBLIC_PR_SUPABASE_URL` + `PR_SUPABASE_SERVICE_KEY` | Patient context tool (direct) | Configured in env | — | Use Railway API proxy instead (already working) |
| `NEXT_PUBLIC_PROMPT_RUNNER_URL` + `PROMPT_RUNNER_API_KEY` | Patient/transcript tool via Railway | Currently used by all patient/transcript routes | — | — |

**Missing dependencies with no fallback:**
- `AGENT_SUPABASE_SERVICE_KEY` — required for agent loading and run persistence. Must be set.

**Missing dependencies with fallback:**
- `CMS_SUPABASE_SERVICE_KEY` — clinical literature tool can return empty results with a clear message if not configured.
- `ANTHROPIC_API_KEY` — deterministic fallback pattern exists in `/api/research/chat/route.ts`; can replicate if key is absent.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `parameters: z.object()` in tools | `inputSchema: jsonSchema({})` | AI SDK v6 | Tool definitions must use `inputSchema` |
| `model.doStream()` directly | `streamText()` from `ai` | AI SDK v4+ | Use SDK-level function, not model primitives |
| `/api/playground` proxying to Railway | `/api/agent-runner` in-project execution | Phase 15 | New route replaces old proxy for agent execution |
| Mock `pickScenario()` + `setTimeout` | Real `streamText` + tool execution | Phase 15 | The entire page execution model changes |

**Deprecated/outdated:**
- `lib/prompt-runner.ts` for agent execution: replaced by in-project runtime. Keep for patient/transcript data access for now.
- `/api/playground/route.ts`: becomes dead code for `claude_tool_use` agents after Phase 15. May still be used by `prompt_runner` runtime type agents.

---

## Open Questions

1. **Direct PR Supabase access vs. Railway proxy for patient context**
   - What we know: `prSupabase` client exists but is unused. Railway API is working. PR Supabase table names for direct access are undocumented in the codebase.
   - What's unclear: Whether the PR Supabase instance has the same table schema as the Railway FastAPI exposes, or different names/structures.
   - Recommendation: Use Railway proxy for patient/transcript data in Phase 15. Document this as a known limitation. Phase 16 can introduce direct access if Railway latency is a problem.

2. **CMS RPC embedding generation**
   - What we know: CMS Supabase uses pgvector RPCs that require embedding vectors. No embedding generation code exists in the project.
   - What's unclear: Whether to add OpenAI embedding API calls (new dependency) or implement text-search fallback.
   - Recommendation: Implement the clinical literature tool with full-text search on `chunk_text` as a Phase 15 fallback. Add vector search in a later phase when embedding budget is confirmed.

3. **Which agents currently have `active_version_id` populated**
   - What we know: The `agents` table has 42+ rows. `active_version_id` is nullable.
   - What's unclear: How many agents have active versions and what `system_prompt` they contain.
   - Recommendation: Plan for a fallback in the UI ("No active version — this agent cannot run") and a seeded test agent as part of the page rewrite.

---

## Validation Architecture

Nyquist validation is not explicitly disabled in `.planning/config.json` (only `_auto_chain_active` is set), but the project has no test framework installed or configured. No `pytest.ini`, no `jest.config.*`, no `vitest.config.*`, no `__tests__/` directory exists in the codebase.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None installed (Playwright in devDependencies but only for E2E, no unit test framework) |
| Config file | None |
| Quick run command | None configured |
| Full suite command | None configured |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| RUN-01 | `/api/agent-runner` route returns SSE stream, does not call Railway | Integration (manual) | None — no test framework | ❌ |
| RUN-02 | Agent + version load from Supabase using `active_version_id` | Unit | None | ❌ |
| RUN-03 | Tool execute functions return non-empty data for known test inputs | Integration (manual) | None | ❌ |
| RUN-04 | Tool failure does not terminate stream; failed tool appears in output | Integration (manual) | None | ❌ |
| RUN-05 | Failed run always produces structured error in `agent_runs.output` | Integration (manual) | None | ❌ |

### Wave 0 Gaps
All requirements are manual-verify only given the absence of a test framework. Verification strategy: run the agent-tester page against a known agent/patient combo, observe SSE events in browser DevTools Network tab, check `agent_runs` table in Supabase dashboard for persisted output.

*(No test infrastructure exists to install — project has no unit/integration test setup.)*

---

## Sources

### Primary (HIGH confidence)
- `/c/projects/a360-v2/app/api/research/chat/route.ts` — verified SSE streaming pattern with AI SDK v6 `streamText`
- `/c/projects/a360-v2/node_modules/ai/dist/index.d.ts` — verified `streamText`, `tool`, `jsonSchema`, `TextStreamPart` exports
- `/c/projects/a360-v2/node_modules/@ai-sdk/provider-utils/dist/index.d.ts` — verified `Tool<INPUT,OUTPUT>` type uses `inputSchema` not `parameters`
- `/c/projects/a360-v2/lib/api/agents.ts` — verified `getAgent`, `getVersion`, `listAgents` implementations
- `/c/projects/a360-v2/lib/api/runs.ts` — verified `createRun`, `updateRun` implementations
- `/c/projects/a360-v2/supabase/migrations/20260611_agent_manager_tables.sql` — verified `agent_runs`, `agent_versions`, `agents` schemas
- `/c/projects/a360-v2/lib/supabase.ts` — verified three Supabase client configuration
- `/c/projects/a360-v2/app/dashboard/agent-tester/page.tsx` — confirmed 100% mock implementation
- `/c/projects/a360-v2/docs/DATA_SOURCES_v2.md` — verified CMS RPC function names, PR Supabase access pattern
- `/c/projects/a360-v2/.planning/STATE.md` — verified locked architectural decisions
- `/c/projects/a360-v2/.planning/REQUIREMENTS.md` — verified RUN-01 through RUN-05 requirements

### Secondary (MEDIUM confidence)
- `/c/projects/a360-v2/node_modules/next/dist/docs/` — verified Next.js 16 `maxDuration` route segment config behavior

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified against installed node_modules
- Architecture: HIGH — patterns verified against working code in the same codebase
- Pitfalls: HIGH (PR schema pitfall), MEDIUM (CMS embedding pitfall — known from docs, not tried)

**Research date:** 2026-06-14
**Valid until:** 2026-07-14 (stable stack; AI SDK v6 is pinned in package.json)
