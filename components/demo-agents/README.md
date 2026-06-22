# Demo-Agent Template

A reusable, buyer-facing **stepper surface** that every future demo agent reuses.
Scribe (clinical notes) is consumer #1. Built on the existing a360-v2 app — no new
repo, no second runtime.

## Anatomy

```
components/demo-agents/
  types.ts                 DemoAgentConfig / DemoAgentStep / DemoRunContext / DemoStepProps
  demo-agent-shell.tsx     orchestrator: practice header + stepper + step body + Back/Next
  practice-header.tsx      Orange Twist identity + location selector + products/services strip
  stepper.tsx              step rail with status
  steps/
    patient-picker-step.tsx  shared Step 1 (5 patients, summary, visit type + description)
  scribe/
    scribe-config.tsx        the Scribe DemoAgentConfig
    note-style-step.tsx      Step 2 — record fan-out + length/format
    generate-reveal-step.tsx Step 3 — progressive reveal, source linking, magic edit
```

Page: `app/dashboard/scribe/page.tsx` (`"use client"`) mounts `<DemoAgentShell config={scribeConfig} />`.

## Data flow

| Concern | Endpoint | Source |
|---|---|---|
| Practice + locations | `GET /api/practice` | Ops `practices.branding` (JSONB) |
| Patient picker (5) | `GET /api/demo-agents/patients` | Ops patients ⋈ latest consultation |
| Products/services | `GET /api/global-library/products` | Global V3 |
| Generate records | `POST /api/scribe/generate` | cached fixtures → live Claude fallback |
| Magic edit | `POST /api/scribe/edit` | live Claude (graceful fallback) |

Cached fixtures (stage-safe, source-linked) live in `lib/scribe/fixtures/`.

## Adding demo agent #2

You do **not** create a new page. Add a config + step components:

```tsx
// components/demo-agents/<agent>/<agent>-config.tsx
export const myAgentConfig: DemoAgentConfig = {
  key: "my-agent",
  label: "My Agent",
  tagline: "...",
  icon: SomeLucideIcon,
  includePatientStep: true,          // reuse the shared Step 1
  steps: [
    { id: "step2", title: "...", component: MyStep2, hideFooter: true },
    { id: "step3", title: "...", component: MyStep3, hideFooter: true },
  ],
};
```

Each step component receives `DemoStepProps` (`ctx`, `setCtx`, `goNext`, `goBack`,
`isFirst`, `isLast`). Store agent-specific state in `ctx.data`. Then add a page that
renders `<DemoAgentShell config={myAgentConfig} />` and a sidebar entry.

## Determinism

Demo-grade: cached fixtures are the default path and never call a model. Live
generation is a best-effort fallback for non-fixture patients. The reveal cadence
in Step 3 is time-scripted, independent of model latency.

See `docs/DEMO_SCRIPT.md` for the stage click-path.
