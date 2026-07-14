# Phase 0 Recon + Proposal — Demo-Agent Template + Scribe

> Handoff from the Phase 0 recon session (run 2026-06-22). Kickoff: `C:\Projects\A360_Hub\plans\demo-scribe-agent-kickoff.md`.
> **Status: awaiting 👍 before building (Phase 1).** This doc IS the Phase 0 review-gate deliverable.

---

## 0) Runtime verification (the gating question — answered YES)

This is built on the **existing** runtime, not a new one:
- `C:\Projects\a360-v2-wse` is a git worktree of `C:\Projects\a360-v2` → repo `github.com/ccabell/a360-v2` — same app at the `a360-v2-…vercel.app/dashboard/patients` URL.
- In-app agent runtime exists: `lib/agent-runtime/executor.ts` + `app/api/agent-runner/route.ts` + `tools.ts`. No second runtime is created.
- ⚠️ **Vercel project ambiguity:** local `.vercel/project.json` links to project **`a360-v2-wse`**, but the stage URL is a deployment of project **`a360-v2`**. Same git source. Confirm which project is "the stage demo" before Phase 3 preview.

## 1) Plumbing confirmed present

| Need | Location | Status |
|---|---|---|
| Agent runtime | `app/api/agent-runner/route.ts` (POST → SSE), `lib/agent-runtime/executor.ts`, `tools.ts` | ✅ |
| Ops data access | `lib/api/ops-store.ts`: `listPatients / getPatient / getConsultation / getTranscript` | ✅ |
| Patients API | `app/api/patients` + `[id]` | ✅ |
| Global Library | `app/api/global-library/products` | ✅ |
| Sidebar | `components/layout/sidebar.tsx` — typed `menuItems[]` w/ `scope:"internal"` filter + `demo` mode | ✅ adding the tab = one entry |

**agent-runner contract:** `POST { agent_id, user_message, patient_id?, tools_override? }` → SSE stream of `AgentRunnerEvent`. Scribe Step 3 consumes this stream for the progressive reveal.

## 2) Data reality (Ops `uedajrdzcjfrmbiznflf`) — kickoff was STALE

| Kickoff assumed | Actual |
|---|---|
| ~3 patients, seed 2 | **20 active patients** — curate 5, none to add |
| consults w/ visit type + description | **20 consults**, `consult_type` populated ✅, but **`consultations.details` is NULL everywhere** (the visit description the picker needs) |
| transcripts maybe stubs | **20/20 real** — `transcript_raw` avg ~21,830 chars, `transcript_summary` populated. Real column is `transcript_raw` (NOT `transcript_text`); also `transcript_enhanced`, `transcript_summary`, `transcript_segments` jsonb |
| no practice/location wiring | **`practices` table exists**, 1 row: `a0000000-…-0001` = "Aesthetic Innovations Demo". **No `locations` table.** All 20 consults FK to this practice |
| Scribe agent | **No scribe/note agent in `agents` registry** — must seed one in Phase 2 (agent-runner requires a real `agent_id`) |

## 3) Proposed seed plan (Phase 0 writes — needs 👍)

1. **Practice → Orange Twist.** UPDATE the existing practice row (`a0000000-…-0001`) `name`→"Orange Twist", `slug`→"orange-twist", `branding`→`{logo:"orange-twist", tagline:"BODY | FACE | SKIN", locations:[…]}`. Updating in place keeps all 20 consult FKs intact (vs. a new row + re-pointing).
2. **Locations.** Recommend **`branding.locations` JSONB array** (2–3: e.g. Newport Beach / Irvine / San Diego) over a new table — lighter, no new API surface, header reads one source. New `locations` table is the heavier alt if relational integrity is wanted later.
3. **Visit descriptions.** Populate `consultations.details` for the 5 chosen demo patients (short, believable Orange Twist body/face/skin visit summaries, synthetic).
4. **Scribe agent (Phase 2, not 0).** Seed an `agents` row + version (`agent_key:"scribe"`, model `claude-opus-4-8` or sonnet) so `agent-runner` can run it.

**No PHI — all synthetic.** Existing 20 patients already read as synthetic.

## 4) Proposed `DemoAgentConfig` shape (central deliverable)

```ts
// components/demo-agents/types.ts
export type StepStatus = "idle" | "active" | "running" | "done";

export interface DemoAgentStep {
  id: string;
  title: string;                 // "Choose note style"
  // template renders the component; step owns its own UI + validity
  component: React.ComponentType<DemoStepProps>;
  canAdvance?: (ctx: DemoRunContext) => boolean;
}

export interface DemoAgentConfig {
  key: string;                   // "scribe"
  label: string;                 // "Scribe — Clinical Notes"
  icon: LucideIcon;
  agentId: string;               // Ops agents.id used by /api/agent-runner
  patientStep?: boolean;         // default true → render shared patient picker as Step 1
  steps: DemoAgentStep[];        // Step 2…N, agent-specific
  buildUserMessage: (ctx: DemoRunContext) => string; // transcript + style → agent prompt
  cachedFallbackKey?: string;    // deterministic stage fallback
}
```

- **Patient picker (shared Step 1):** `listPatients({limit:5})` → name, `consult_type` badge, `details` summary. Selecting sets `ctx.patient` + `ctx.consultation` + loads `transcript_raw`.
- **Adding agent #2** = new `DemoAgentConfig` + step components. No new page.

## 5) Stepper UX + practice header (proposal)

- **Header (shared):** Orange Twist wordmark (fallback placeholder until `public/practices/orange-twist-logo.png` lands) + name + **location selector** (reads `branding.locations`) + a curated handful of products/services from `/api/global-library/products` with "view all".
- **Stepper:** template-level Back/Next + step status rail; "show each step" reveal is template-owned, not Scribe-specific. Deterministic: every live run has a cached fallback; never a flaky live model on stage.
- **Scribe steps:** (1) patient + transcript → (2) note-style picker (**SOAP default**, more styles TBD — Heidi.AI-inspired) → (3) generate + progressive reveal (pull transcript → structure → draft sections → final note) via agent-runner SSE.

## 6) Open items / blockers carried into the build session

- ⛏️ **Heidi.AI screenshots** not received in recon session — need them to spec Step-2 note-style UX + extra styles beyond SOAP.
- ⛏️ **NOTE_TYPE_TAXONOMY:** SOAP locked as default; remaining note types/lengths/variations TBD (Chris).
- ⛏️ **Vercel project** for stage preview: `a360-v2` vs `a360-v2-wse` — confirm.
- ⚠️ Modified Next.js guardrails still apply: `proxy.ts` (not middleware); `params` is a Promise; normalize JSONB before render.
