# Agent Activity Layer — Technical Spec

The right-rail visualization engine that shows, in real time, everything an agent touches: tools fired, tables queried, guardrails checked, citations created, humans consulted, tokens spent. One component, every module. This is the layer that makes the demo say *"nothing here is a slide."*

**Stack**: React 19 + `motion` (Framer Motion v12) + Tailwind 4 + shadcn primitives. Fed by the Run Replay Engine or live Vercel AI SDK data parts — same event schema either way.

---

## 1. Event Schema (the contract everything speaks)

```typescript
interface RunEvent {
  runId: string;
  seq: number;                 // ordering
  tOffsetMs: number;           // when to fire during replay (captured real timing, lightly compressed)
  type: RunEventType;
  payload: Record<string, unknown>;
}

type RunEventType =
  | "agent_start"        // { agentKey, version, model, inputSummary }
  | "agent_complete"     // { durationMs, outputSummary }
  | "db_query"           // { source: "GL"|"PL"|"IE"|"CMS"|"Aurora", table, operation, filterSummary, rowCount }
  | "rag_search"         // { corpus, query, chunksScanned, topK, topScore }
  | "tool_call"          // { tool, args (redacted), resultSummary }
  | "guardrail_check"    // { kind: "catalog"|"contraindication"|"claims"|"phi"|"consent"|"confidence", subject, result: "pass"|"flag"|"block", detail }
  | "fact_extracted"     // { field, value, confidence, evidenceQuote, anchorStart, anchorEnd }
  | "fact_withheld"      // { field, candidate, confidence, reason }  ← the anti-hallucination moment
  | "citation_created"   // { number, sourceType, title, locator }
  | "validation"         // { rulesPassed, rulesTotal, violations[] }
  | "hitl_pause"         // { checkpoint, question, options }
  | "hitl_resume"        // { decision, decidedBy: "provider", appliedAs: "hitl_verified" }
  | "handoff"            // { from, to, fieldsPassed[] }  ← downstream fan-out
  | "boulevard_sync"     // { object: "booking"|"campaign"|"patient_record", payloadSummary }
  | "cost_tick"          // { inputTokens, outputTokens, costUsd }
  | "narration";         // { text } — scripted explainer lines for CEO-solo mode
```

Capture side: a wrapper around every model/DB/tool call during the pre-compute runs writes these rows to `demo_run_events` with real timings. Live side: the Evidence module emits the same shapes as AI SDK custom data parts (`data-runevent`). **One renderer, two transports.**

---

## 2. Visual Vocabulary (consistent across all nine modules)

| Event | Rendering |
|---|---|
| `agent_start` | Agent card slides in: avatar glyph, name, version chip (`v3.3`), model badge, pulsing "running" ring |
| `db_query` | **Data-source chip** (color-coded: GL emerald · PL teal · IE indigo · CMS violet · Aurora slate) with table name + animated row counter ("gl_product_guardrails · 12 rows"). Chips stack into a "Sources touched" tray that persists per run |
| `rag_search` | Corpus chip + "203,114 chunks scanned → top 8" with a quick scan-sweep animation |
| `guardrail_check` | **Shield component**: gray → spins → green check (pass) / amber (flag, expands detail) / red with shake (block). Blocks are kept rare and deliberate — each one scripted to show recovery |
| `fact_extracted` | Mini fact card with confidence badge; simultaneously triggers the evidence beam + transcript highlight in M1 (layer emits a DOM event the module subscribes to) |
| `fact_withheld` | Card appears, grays, and drops into a "Withheld (low confidence)" tray with reason — physically lower on screen |
| `citation_created` | Numbered chip [1] with source-type color (PubMed emerald, YouTube red, FDA orange, GL blue, podcast purple) flying to the content pane |
| `validation` | "Consistency: 7/7" seal stamp animation |
| `hitl_pause` | Whole rail dims except an amber "Human checkpoint" card; main pane opens the approval tray; resume shows decision + `hitl_verified` tag propagating |
| `handoff` | Labeled packet animates out of the rail toward the destination module icon with its field list ("→ Reach: objections, motivating_events, price_discussed") |
| `boulevard_sync` | Boulevard-styled chip docking into a rail-bottom "Boulevard" slot — the integration made visible every time it happens |
| `cost_tick` | Persistent footer ticker: tokens + $ per run (running total). Quietly devastating: "this consultation's full intelligence run: $0.41" |
| `narration` | Caption strip above the rail — the CEO-solo voice track in text |

**Density control**: default view shows the latest 5 cards + persistent trays (Sources, Guardrails passed, Withheld, Citations, Cost). "Inspector" toggle expands full scrollback with JSON drill-down per event (react18-json-view) — the CTO mode. Auto-collapse keeps the rail calm; nothing scrolls the main stage.

---

## 3. Replay Engine

```typescript
function useRunReplay(runId: string, { speed = 1.4 } = {}) {
  // 1. fetch events ordered by seq from demo_run_events
  // 2. schedule dispatch via tOffsetMs / speed (cap any gap at 2500ms — compress dead air)
  // 3. expose: play, pause, scrub(seq), skipToEnd, state: "idle"|"playing"|"done"
  // 4. dispatch each event to (a) ActivityRail store (zustand) and (b) a window CustomEvent
  //    bus ("a360:runevent") that module panes subscribe to for in-stage reactions
}
```

Rules: replays are **interruptible and scrubbable** (presenter can jump); `skipToEnd` renders final state instantly (recovery move if the room wants to move fast); every module's "Run" button is idempotent — replaying resets cleanly. A small "captured run · 2026-06-15 · gpt-4o" stamp sits in the Inspector for honesty.

Live transport: `useChat`/`streamText` with `onData` mapping `data-runevent` parts into the same store. The Evidence module's server route emits `rag_search`, `citation_created`, `validation`, `cost_tick` events alongside tokens.

---

## 4. Module Event Scripts

Each module ships a **storyboard JSON** (in `demo_scenarios`) binding: run IDs → narration lines → stage cues (which pane reacts to which event). Example, M1 extraction (abridged):

```json
{
  "module": "extraction", "transcript": "T1",
  "sequence": [
    { "runId": "run_p1_T1", "narrationOverrides": {
        "agent_start": "Pass 1 reads the full conversation before extracting anything.",
        "first fact_withheld": "Below 0.5 confidence, A360 refuses to guess. An empty field beats a wrong one.",
        "validation": "Every run is machine-validated before anything downstream can read it."
    }},
    { "runId": "run_p2_T1" },
    { "stageCue": "fanout", "narration": "One conversation. Five consumers. Zero re-reads." }
  ]
}
```

This keeps narrative copy out of components — you and I iterate the script without touching code, and CEO-solo mode reads the same narration aloud via captions.

---

## 5. Component Inventory (build once, day 1–2)

`<ActivityRail/>` (shell + trays + ticker) · `<AgentCard/>` · `<SourceChip/>` · `<GuardrailShield/>` · `<FactCard/>` + `<WithheldTray/>` · `<CitationChip/>` · `<HitlCheckpoint/>` · `<HandoffPacket/>` · `<BoulevardDock/>` · `<CostTicker/>` · `<InspectorDrawer/>` · `useRunReplay` · `useActivityStore` (zustand) · the `a360:runevent` bus.

Storybook stories per component with synthetic event streams = the dev harness AND a hidden bonus: the Storybook itself is show-the-CTO material ("our demo has a design system").

---

## 6. Performance & Reliability Notes

- All replay data prefetched on module mount; demo runs fully offline-capable except M6/M7 (live lanes degrade gracefully: M6 falls back to a captured conversation replay if the network misbehaves — same renderer, flip of transport).
- Animations GPU-cheap: transforms/opacity only; no layout thrash mid-replay; `will-change` on beams.
- Hard cap: ≤ 40 visible DOM cards per run (trays virtualize beyond that).
- Every module reachable by URL (`/demo/extraction?t=T1&autoplay=1`) — the leave-behind link deep-links per module for the CEO's solo pass.
