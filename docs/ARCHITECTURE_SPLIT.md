# Architecture Split — Demo (shareable) vs Studio (private IP)

**Status:** Decided, execution deferred.
**Decision (2026-06-12):** Split into a **monorepo with two apps** + shared packages.
**Timing:** Execute **after the Agent Manager milestone lands on `main`** (avoid colliding with in-flight work). Do it on a `monorepo-split` branch, verify both apps build, then merge.

## Why

The agent testing/demo surface will be shared with **potential acquirers**. The agent builder/manager (prompts, versions, fuel docs, build config) is core IP and must **not** be in the artifact they receive.

**The boundary is the artifact + the data layer — not a hidden route.** Gating the builder behind auth in the same deployment is security-by-obscurity: the code still ships and the APIs still exist. The acquirer-facing app must *contain* no builder code and must be *unable to call* anything that returns agent internals.

## Target shape (npm workspaces — no new tooling)

```
apps/demo      → acquirer-facing Vercel project (own domain)
apps/studio    → internal Vercel project (SSO, separate domain)
packages/ui        → shadcn primitives (components/ui)
packages/grounding → citation/grounding rendering (already extracted)
packages/types     → shared types + lib/utils
```

Two Vercel projects, root dirs `apps/demo` and `apps/studio`. No RBAC/multi-tenant required — the deploy split *is* the boundary.

## Inventory — where each thing goes

| → **Studio** (private) | → **Demo** (shareable) | → **packages/** (shared) |
|---|---|---|
| `app/dashboard/agents/**` | Overview, Patients, Research, Chat, RAG, Reach, TCP, Consultation | `ui/` (primitives) |
| `app/api/agents/**`, `api/tools`, `api/playground` | Agent Tester — **output-only** half | `grounding/` (citations) |
| `components/agents/**` | `app/api/patients`, `transcripts`, `runs` (Prompt Runner proxy) | shared `types/`, `lib/utils` |
| `lib/api/*`, `lib/types/agents`, `lib/supabase` (GL keys) | `lib/prompt-runner`, `lib/retrieval`, `lib/mock`, `lib/format` | |

Note: **Agent Tester straddles the line.** "Run a test and view the grounded output" is shareable (Demo). The prompt/agent-definition editing behind it is IP (Studio).

## Data boundary (the part that actually protects the IP)

- **Studio** is the only app with **GL Supabase keys** and the agent APIs.
- **Demo** ships with **no Supabase service key** and **no agent endpoints**. It can reach only the Prompt Runner *output* proxies (`/api/patients`, `/api/transcripts`, `/api/runs`) + mock data.
- Enforced by env + code contents per app, verified by a check that `apps/demo` imports nothing from `lib/api/*`, `lib/supabase`, or `components/agents/*`.

## Meanwhile — keep it separable (rules while we wait)

So the split stays mechanical, until execution:

1. **Demo features** (patients, research, etc.) must not import from `components/agents/**`, `lib/api/**`, `lib/supabase`, or `lib/types/agents`.
2. Shared rendering goes through `components/grounding/**` and `components/ui/**` only.
3. **Agent Manager work** should keep its code under `app/dashboard/agents/**`, `app/api/agents|tools|playground/**`, `components/agents/**`, `lib/api/**`, `lib/types/agents`, `lib/supabase` — so it lifts cleanly into `apps/studio`.
4. Don't add demo→studio or studio→demo cross-imports. If something is needed by both, it belongs in `packages/`.

## Deferred execution stages (on a branch)

0. Branch `monorepo-split`.
1. Scaffold workspaces (root `package.json` `workspaces`); move shared → `packages/ui`, `packages/grounding`, `packages/types`; wire tsconfig paths.
2. Create `apps/demo`; move demo routes/components/lib; repoint imports at packages.
3. Create `apps/studio`; move agent-manager routes/api/components/lib.
4. Scrub: assert `apps/demo` has zero builder imports and no Supabase key; add the import-boundary check.
5. Two Vercel projects (root dirs `apps/demo`, `apps/studio`); Studio behind SSO.
6. Verify both build + run; merge.
