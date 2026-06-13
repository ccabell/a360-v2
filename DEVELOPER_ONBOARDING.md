# A360 — Developer Onboarding & Collaboration Guide

**Project:** A360 Intelligence Platform (`a360-v2`)  
**Demo deadline:** June 22, 2026 (Boulevard acquisition meeting)  
**Your role:** Frontend developer — you own the UI shell, module layouts, and component system  
**Chris's role:** Backend — data, agents, APIs, Supabase schemas, Prompt Runner. He feeds you working endpoints; you build the UI around them.

---

## 1. Get the Repo Running

```bash
# Clone
git clone https://github.com/ccabell/a360-v2.git
cd a360-v2

# Install
npm install

# Env — create .env.local and add these (Chris will give you the values):
NEXT_PUBLIC_AGENT_SUPABASE_URL=
AGENT_SUPABASE_SERVICE_KEY=
NEXT_PUBLIC_CMS_SUPABASE_URL=
CMS_SUPABASE_SERVICE_KEY=
AI_GATEWAY_API_KEY=
BETA_ACCESS_PASSWORD=
NEXT_PUBLIC_APP_MODE=demo

# Run
npm run dev   # → http://localhost:3000
```

Login page is at `/login`. Password = whatever `BETA_ACCESS_PASSWORD` is set to.

---

## 2. Stack

| Layer | What |
|-------|------|
| Framework | Next.js 16, App Router, TypeScript |
| UI | **shadcn/ui only** — import from `@/components/ui/*` |
| Styling | Tailwind CSS 4 with OKLch CSS variables (light + dark mode built in) |
| Animation | **Framer Motion v12** (`motion` package) — install this first, you'll use it everywhere |
| State | Zustand |
| DB | `@supabase/supabase-js` |
| AI | Vercel AI SDK v6 — already installed |
| Deployment | Vercel (auto-deploys from `main`) |

**Do not add MUI, Chakra, Radix directly, or any other component library.** Everything goes through shadcn.

### Packages to install on day one

```bash
npm install motion                    # Framer Motion v12 — animations throughout
npm install @xyflow/react             # React Flow — agent DAG in M3/M4
npm install @number-flow/react        # Animated number counters — revenue calculator
npm install wavesurfer.js             # Audio scrubber — transcript player in M1
npm install recharts                  # Charts — practice board in M5
npm install vaul sonner               # Drawer + toasts — HITL trays, notifications
npm install streamdown                # Streaming-safe markdown renderer — M6 chat
```

---

## 3. What We Are Building

This is a **10-day sprint** to a fully working demo for Boulevard's CEO/CTO. Boulevard is a practice management platform (6,000+ locations). We're showing them A360 turns consultations into structured intelligence — and that intelligence runs the entire patient journey.

**The architecture is replay-first:** every agent run is executed against real data ahead of time, captured as an event log, then replayed with live-feeling timing in the demo. Two modules stay genuinely live: the Evidence chat (M6, already working) and optionally Voice (M7, stretch).

### The 9 Modules

| Module | Name | Your build effort | Status |
|--------|------|-------------------|--------|
| **M0** | Command Center | S — stat cards + quick links | ❌ Not started |
| **M1** | Consultation & Extraction | L — 3-pane, audio player, evidence beams | 🟡 Screens exist on branch |
| **M2** | Clinical Notes | M — SOAP tabs, traceability hovers | ❌ Not started |
| **M3** | Treatment & Care Plan (TCP) | L — React Flow DAG, tiers, timeline | ❌ Not started |
| **M4** | Reach Campaigns | L — chain pipeline, inbox preview, guardrail bounce | ❌ Not started |
| **M5** | Coaching & Revenue | M-L — KPI scorecard, practice board, revenue calculator | ❌ Not started |
| **M6** | Evidence Chat | **Done** — live, real data, citation cards | ✅ Live |
| **M7** | Live Voice | M — stretch goal, go/no-go June 19 | ❌ Not started |
| **M8** | Platform / Agents | M — registry view, guardrail library, coverage dashboard | ❌ Not started |

---

## 4. The Right Rail: Agent Activity Layer

**This component is the backbone of the entire demo.** It runs on the right side of every module and shows in real time what every agent is doing: tools fired, database tables queried, guardrails checked, citations created, humans consulted, cost ticked.

It is fed by **run events** — a standard schema that works identically from a replay (pre-captured runs) or a live model (AI SDK data parts). You build it once; every module uses it.

### Event types you'll render

```typescript
type RunEventType =
  | "agent_start"      // Agent card: name, version chip, model badge, pulsing ring
  | "agent_complete"   // Duration, output summary
  | "db_query"         // Color-coded data-source chip: GL=emerald, PL=teal, IE=indigo, CMS=violet
  | "rag_search"       // "203K chunks scanned → top 8" with sweep animation
  | "guardrail_check"  // Shield: spins → green pass / amber flag / red block
  | "fact_extracted"   // Mini fact card with confidence badge
  | "fact_withheld"    // Card appears, grays, drops into "Withheld" tray — the anti-hallucination moment
  | "citation_created" // Numbered chip [1] flying to content pane
  | "validation"       // "7/7 consistency rules" seal stamp
  | "hitl_pause"       // Amber checkpoint card — dims rail, opens approval tray in main pane
  | "hitl_resume"      // Decision + hitl_verified tag propagating
  | "handoff"          // Labeled packet animating toward next module icon
  | "boulevard_sync"   // Boulevard chip docking into rail-bottom slot
  | "cost_tick"        // Footer ticker: tokens + $ per run
  | "narration"        // Caption strip — CEO-solo voice track
```

**Build this first** before any module. Once it works, each module just feeds it events.

### Component signature (target)

```tsx
// components/activity-layer/activity-rail.tsx
interface ActivityRailProps {
  events: RunEvent[]        // events received so far (append-only)
  isLive?: boolean          // true = real-time, false = replay mode
  onHitlDecision?: (decision: string) => void
}
```

---

## 5. The Replay Engine

Chris builds the backend (event capture, `demo_run_events` table). You build the frontend player.

The replay engine reads pre-captured events from the DB and fires them to the Activity Layer with their original timing (lightly compressed). It needs:

```tsx
// lib/replay/use-replay.ts
// hook that:
// 1. fetches demo_run_events for a given runId
// 2. fires events to a callback at their tOffsetMs timing
// 3. exposes: { events, isPlaying, play, pause, reset, progress }
```

Controls you'll need: Play / Pause / Reset button. A subtle progress bar. "Captured run · 2026-06-14 · claude-sonnet-4-6" label. That's it — keep it minimal.

---

## 6. Module-by-Module Build Notes

### M0 — Command Center (build this second, after Activity Layer)
Simple stat cards: Consultations processed, Opportunities found, Revenue identified, Emails generated, KPIs scored. Numbers come from a `/api/demo/stats` endpoint Chris will provide. Quick links to each module. `@number-flow/react` for the rolling numbers. 1 day.

### M1 — Consultation & Extraction (the foundation module)
Three-pane layout:
- **LEFT:** Transcript player — WaveSurfer audio scrubber, speaker-colored utterances, scrolls with playback
- **CENTER:** Extraction tree building itself — visit context → goals → offerings (colored disposition chips) → motivating events → price captures. Facts land one by one.
- **RIGHT:** Activity Layer rail

**The signature interaction:** when a fact lands in the center, a beam highlights the source quote in the left transcript. Bidirectional: click any fact → transcript scrolls to that moment; click any transcript line → all facts from it light up.

The extraction screens (Patient List, Extraction Setup, Results Viewer) are already built on the `extraction-ui` branch. Chris will rebase them to main. Build M1's replay-driven version on top of that existing work.

### M2 — Clinical Notes
Three tabs: General SOAP / Explant / Venous. Hover any sentence → the source transcript span highlights (same anchoring system as M1 — reuse the transcript highlight component). Provider customization knobs switch between captured run variants. 1 day.

### M3 — Treatment & Care Plan
Two halves:
- **TOP:** React Flow DAG of the TCP agent chain. Nodes light up as replay runs: `catalog_resolver → goal_mapper → tier_builder → pairing_advisor → timeline_planner → pricing_engine → compliance_reviewer → HITL gate`. Click any node to see input/output JSON.
- **BOTTOM:** Patient-facing plan — three tiers (Good/Better/Best), a Gantt-style treatment timeline anchored to dates from motivating events (e.g., wedding in 10 weeks), pricing with `COALESCE(practice, global)` shown visibly, guardrail chips on every recommendation.

HITL: compliance_reviewer pauses the DAG with an amber card → provider approves → DAG completes. 2 days.

### M4 — Reach Campaigns
Shows the full Reach agent chain as a visual pipeline (similar to M3 DAG). Then:
- Campaign strategy card
- Treatment timeline calendar (5-touch cadence)
- Inbox-style email previews with a **"Why this email" flyout** showing the consultation moments that drove each line
- One email gets **flagged by compliance_qa and rewritten on screen** — this is the guardrail money-shot
- Boulevard handoff chip at the end

2 days.

### M5 — Coaching & Revenue
Three tabs:
1. **Consultation scorecard** — 9 KPIs, each expandable to evidence span + coaching note
2. **Practice board** — 20-consultation aggregate, KPI distributions, missed-membership counter
3. **Revenue calculator** ⭐ — sliders (consults/mo, close-rate lift, avg ticket lift, membership capture) → animated output cascade → `×6,000 Boulevard locations → platform ARR`. Use `@number-flow/react` for every number. This is the CFO moment.

1.5 days.

### M8 — Platform / Agents
Read-only views:
- Agent registry (`a360_agents` table) — name, status, version, model
- Guardrail library for the 20 demo products
- GL coverage dashboard — demo slice at 100%, platform totals shown honestly
- Agent ↔ GL version dependency view

Mostly data display. 1 day.

---

## 7. Collaboration Protocol

**Branch strategy:**
```
main          ← stable, Vercel auto-deploys here
feature/      ← your feature branches, PR to main
extraction-ui ← parked (Chris's work, rebase post-June 22 unless told otherwise)
```

**Division of labor:**
- **Chris pushes:** API routes, Supabase schemas, working endpoints, event data. He'll document each in a short note (what the endpoint returns, what the schema looks like).
- **You build:** The UI around those endpoints. If an endpoint isn't ready yet, mock the data shape locally and build the component — Chris will wire it when the backend is ready.
- **Communicate gaps:** If you're blocked on an endpoint, leave a `TODO: needs /api/X from Chris` comment and move to the next module. Don't sit idle.

**Design system:**
- All CSS via Tailwind tokens — `text-foreground`, `bg-muted`, `border-border`, `text-primary`, etc.
- Light + dark mode both work — test both
- No raw hex values in classNames
- Consistent spacing: page padding is `p-8`, section gaps are `space-y-6`

**What exists that you should NOT rebuild:**
- `components/citations/` — full citation system (inline badges, reference cards, references section). The color/authority tier system is load-bearing.
- `components/grounding/` — GroundedAnswer, SourcePill, CitationCard, YoutubeViewer
- `components/research/research-chat.tsx` — the live evidence chat. Do not touch.
- `lib/retrieval/` — the retrieval pipeline. Do not touch.
- `lib/types/retrieval.ts` — all TypeScript types for the retrieval/citation system. Read before building anything citation-related.
- `components/layout/sidebar.tsx` — nav is complete. Adding new routes: just add to the `menuItems` array.

---

## 8. What Chris Will Send You (and when)

As Chris builds the backend, he'll send you:

| What | When | You build |
|------|------|-----------|
| `demo_run_events` table schema + sample event JSON | Day 1 | Activity Layer rail component |
| `/api/demo/stats` endpoint | Day 2 | M0 Command Center |
| T1 transcript + audio URL | Day 2-3 | M1 transcript player |
| Extraction run events for T1 | Day 3 | M1 evidence beams + replay |
| TCP run events | Day 4-5 | M3 DAG + plan assembly |
| Reach run events | Day 5-6 | M4 pipeline + inbox |
| Coaching run events + 20-consult batch | Day 6-7 | M5 scorecard + board |
| Agent registry data | Day 7 | M8 platform view |
| Revenue calculator input ranges + defaults | Day 6 | M5 revenue tab |

**When you get event JSON:** build the component, hardcode the sample data, and mark it `// TODO: wire to replay engine`. Chris wires the live data when the replay engine is ready.

---

## 9. The One Thing That Makes the Demo Work

Every module has the same right rail. Every data point traces to a source. Every guardrail check is visible. Every cost is shown.

The demo's argument is: *"Nothing here is a slide. These are real runs, real data, real agents."*

Your job is to make that visible. The Activity Layer is how you do it. Build it well and the rest of the modules are variations on a theme.

---

## 10. Questions

- **Can't find an endpoint?** Check `app/api/` first. If it's not there, assume Chris hasn't built it yet — mock the data and keep going.
- **Design decisions?** Match the existing Research page (`app/dashboard/research/page.tsx`) as the reference for layout, spacing, and component style.
- **Stuck on a module?** Move to a different one. All modules are independent until the replay engine is shared.
- **New package needed?** Install it, add to this doc, tell Chris.

---

*Last updated: 2026-06-12*  
*Repo: https://github.com/ccabell/a360-v2*  
*Related: `Fable Docs/DEVELOPER_BRIEF.md` · `Fable Docs/A360_DEMO_MASTER_PLAN.md` · `Fable Docs/AGENT_ACTIVITY_LAYER_SPEC.md`*
