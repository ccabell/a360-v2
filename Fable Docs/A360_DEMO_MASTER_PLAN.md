# A360 × Boulevard — Working Demo Master Plan

**Deadline**: June 22, 2026 · **Audience**: Boulevard CEO/CTO (both founders; CEO has already asked about acquisition)
**Vehicle**: a360-v2 (Next.js 16 / React 19 / shadcn / Tailwind 4 / Supabase JS / Vercel AI SDK 6)
**Thesis the demo must prove**: *The consultation is the revenue event. A360 is the substrate that turns it into intelligence — and inside Boulevard, that intelligence runs the entire patient journey across 6,000+ locations.*

---

## 1. The One Decision Everything Hangs On: Replay-First, Live Where It Counts

A CEO demo cannot depend on an LLM being fast and correct at 2pm on a Tuesday. The architecture:

**Every agent run in the demo is REAL — executed ahead of time through the real pipeline against real data — then captured as an event log and REPLAYED with live-feeling timing.** The Agent Activity Layer (see companion spec) renders these event streams identically whether they arrive from a replay or a live model, so the demo is deterministic, repeatable by the CEO alone, and still 100% honest: these are actual runs, actual queries, actual guardrail checks, actual citations.

**Two lanes stay genuinely live** (where wow > risk):
1. **Evidence chat** (OpenEvidence clone) — Vercel AI SDK streaming with real retrieval. Unscripted questions are the point.
2. **Live Voice consultation** (stretch) — the voice bot trigger engine firing real agent callbacks.

Everything else — extraction, notes, TCP, Reach, coaching — is replayed real runs, with a "Run Fresh" button available on extraction as a confidence flex if the room asks.

**Honesty rules** (your own CLAUDE.md standards, applied): demo slice fully populated, never claim platform-wide coverage; replays are labeled "captured run · {date} · {model}" in the inspector; nothing renders that didn't come from a logged run.

---

## 2. Demo Architecture

```
┌────────────────────────────────────────────────────────────────────┐
│  a360-v2 (Vercel)                                                  │
│                                                                    │
│  ┌──────────────┐   ┌─────────────────────┐   ┌────────────────┐   │
│  │ Module pages │──►│ Run Replay Engine    │──►│ AGENT ACTIVITY │   │
│  │ (9 modules)  │   │ (event-sourced runs) │   │ LAYER (right   │   │
│  └──────────────┘   └─────────────────────┘   │ rail, animated)│   │
│         │                     ▲                └────────────────┘   │
│         │ live lanes          │ captured events                     │
│         ▼                     │                                     │
│  Vercel AI SDK 6  ◄───────────┴── demo_* schema (Supabase)          │
│  (streaming, data parts)                                            │
└────────────────────────────────────────────────────────────────────┘
            │                          │                       │
            ▼                          ▼                       ▼
   GL/IE/PL Supabase            CMS Supabase            Prompt Runner API
   wvpgmawrizwkmvfnwqfl         gjqicqldjgvrwmtkliie    (Railway) — runs
   gl_* / pl_* / ie_*           YouTube/PubMed/podcast   executed at capture
   (20-offering demo slice)     vectors + RPCs           time, not demo time
```

**New `demo_*` tables** (in GL Supabase, additive only):
- `demo_runs` (id, module, agent_key, agent_version, model, input_ref, started_at, status)
- `demo_run_events` (run_id, seq, t_offset_ms, event_type, payload JSONB) — the replay stream
- `demo_transcripts` (the 5 golden consultations, with audio URLs)
- `demo_scenarios` (module → run wiring, narration copy, Boulevard panel copy)

Event capture: a thin wrapper around Prompt Runner calls + direct model calls that logs every tool call, DB query (table, filter, row count), guardrail check, citation creation, HITL pause, token/cost tick — into `demo_run_events`. ~1 day of work, powers the entire show.

---

## 3. The Demo Data Pack (build first — everything depends on it)

### 3.1 The 20 Core Offerings (proposed — confirm/edit)

**Injectables (8)**: Botox · Dysport · Juvéderm Voluma · Juvéderm Ultra XC · Restylane Lyft · Sculptra · Kybella · Lip Filler (service)
**Energy/Device (6)**: Morpheus8 · CoolSculpting Elite · IPL Photofacial · Laser Hair Removal · Clear + Brilliant · RF Skin Tightening
**Skin/Service (6)**: HydraFacial · Chemical Peel (VI) · Microneedling · ZO Skincare Regimen · SkinMedica TNS · Membership Plan (the recurring-revenue showpiece)

### 3.2 Coverage Sprint (the demo slice goes to 100%)

For these 20 ONLY, populate to completion in GL: `gl_product_facts` (incl. FDA-sourced facts — currently zero `fda_approved` authority rows platform-wide; the 6 FDA label markdowns you already have fix this for the injectables), `gl_product_guardrails`, `gl_product_anatomy`, `gl_product_concerns`, `gl_product_relationships` (pairings among the 20), `gl_agent_fuel_documents` (pairing fuel for the 6 showcase pairings), `pl_products` pricing for the demo practice. This is 2–3 days of Claude Code + your review — and it's not demo fakery, it's real GL enrichment that persists after June 22.

### 3.3 Five Golden Transcripts (synthetic, PHI-free, scripted to exercise everything)

| # | Scenario | Exercises |
|---|----------|-----------|
| T1 | "The Wedding" — high intent, Botox + Voluma, daughter's wedding in 10 weeks, books | motivating events, goal-treatment connections, performed+scheduled dispositions, event-driven Reach |
| T2 | "Sticker Shock" — Sculptra interest, price objection, financing offered, thinking | price capture, objection/resolution, value-reinforcement Reach, financing signals |
| T3 | "The Nervous First-Timer" — Morpheus8 fear, education-heavy, provider defers lip filler | fear objection, provider_deferred, education/reassurance Reach, checklist depth |
| T4 | "The Regular" — returning Botox patient on 3–4 mo cadence, membership never offered | prior_treatments, membership missed opportunity, revenue_leaks, cross-sell |
| T5 | "Multi-Speaker" — patient + friend in room, ambient concern, catalog gap (neck) | ambient_concerns, attribution, catalog_gap signal |

Each gets: written script (I draft, you review) → ElevenLabs two-voice audio render → run through real Deepgram transcription (proves the scribe on demo audio) → full pipeline capture (extraction v3.3 → notes → TCP → Reach → coaching) → events stored. T1 is the hero used in live walkthroughs; all 5 feed the aggregate boards. **Plus**: batch-run 20 of your existing 122 ie_transcripts through coaching/extraction for the "20-consultation practice board" (these stay aggregate-only on screen — no verbatim PHI surfacing).

---

## 4. The Nine Modules

Navigation shell: left rail = patient journey stages (Capture → Document → Plan → Follow → Coach → Prove), each module a stage. Persistent right rail = Agent Activity Layer. Every module ends with an **"Inside Boulevard" panel** — where this surfaces in their product.

### M0 · Command Center (home)
Journey map with live counts from the demo practice (consults processed, opportunities found, $ identified, emails generated, KPIs scored). Sets the "this is a running system" tone in 10 seconds. *Effort: S.*

### M1 · Consultation & Extraction ⭐ (the foundation module — detailed build instructions)

**Purpose**: prove the substrate — conversation in, structured evidence-bound intelligence out — and teach the room how everything downstream feeds from it.

**Input contract**: full transcript (this module IS the transcript consumer; everything downstream consumes its output).

**Layout**: three-pane. LEFT: transcript player (T1) with audio scrubber and speaker-colored utterances. CENTER: the extraction tree building itself — visit context → goals → offerings (with dispositions as colored chips) → motivating events → price captures. RIGHT: Activity Layer.

**The signature interaction — evidence binding, both directions**: as each extraction node lands, its evidence quote **highlights in the transcript** with a connecting beam (the v3.3 exact-substring contract makes anchors deterministic). Click any extracted fact → transcript scrolls to the exact words, quote glows. Click any transcript line → every fact derived from it lights up. This single interaction *is* "everything comes from the data," wordlessly.

**Sequence (replayed run, ~90 sec)**:
1. Press play → audio + transcript stream
2. Activity Layer: `agent_start: extraction_pass_1 (v3.3)` → `db_query: pl_products (20 rows, Demo Practice catalog)` → `db_query: gl_concerns taxonomy`
3. Facts land one by one with evidence beams; confidence badges (>0.9 solid, 0.7–0.9 outlined); a sub-0.5 candidate visibly appears then **drops into a "withheld — below confidence threshold" tray** (the anti-hallucination moment)
4. `guardrail_check: catalog validation` → Dysport mention maps to category match with visible "catalog_match_type: category" chip
5. Pass 2 runs: outcome, commitment, objections with resolution status, signal tags animate in as a tag cloud
6. `validator: 7/7 consistency rules passed` → green seal
7. **Downstream fan-out finale**: extraction card explodes into five labeled streams flying toward module icons — Notes, TCP, Reach, Coaching, Boulevard sync — each labeled with WHICH fields it consumes ("Reach reads: objections, motivating_events, price_discussed…"). This is the "how it's used downstream" requirement, animated.

**HITL**: a "Verify" toggle opens the verification tray — one ambient concern (T5 cut-in) awaiting human confirm; confirming it shows `source: hitl_verified` propagate.
**Wow moment**: evidence beams + the withheld-fact tray.
**Boulevard panel**: "Every Boulevard appointment becomes this. 2M appointments/month → 2M structured intelligence events/month."
*Effort: L (3 days incl. replay engine integration). CORE.*

### M2 · Clinical Notes
SOAP note (3 variant tabs: general/explant/venous) generating with **per-sentence traceability**: hover any sentence → source transcript span highlights (same anchoring system as M1 — reuse, don't rebuild). Provider customization knobs (language level, detail, perspective) shown as instant variant switches between captured runs. Activity Layer shows: transcript in → Bedrock single-shot → traceability map built → "0 unsourced statements" seal.
**Input**: transcript. **Wow**: the unsourced-statement counter at zero. **Boulevard panel**: chart-ready documentation attached to the appointment record.
*Effort: M (1 day — reuses M1 components). CORE.*

### M3 · Treatment & Care Plan (the multi-agent showpiece)
**Input**: extraction + catalog (BOTH — say so on screen: "TCP never re-reads the transcript; it consumes verified extraction").
Top half: a **live step DAG** (React Flow) of the TCP composition chain: `catalog_resolver → goal_mapper → tier_builder (Good/Better/Best) → pairing_advisor (fuel-whitelist) → timeline_planner → pricing_engine (COALESCE) → compliance_reviewer → HITL gate`. Each node lights as its captured run replays; clicking a node shows its input/output JSON and the exact tables it touched. Bottom half: the patient-facing plan assembling — three tiers, **treatment timeline** (Gantt-style: Botox now → Voluma week 2 → maintenance month 4, anchored to the wedding date from motivating_events), pricing with visible `COALESCE(practice_price, global_price)` resolution, and guardrail chips on every recommendation ("✓ no contraindication · pairing approved by fuel doc PF-031").
**HITL**: the compliance_reviewer pauses the DAG at a deliberate flag (pricing checkpoint) → provider approves → DAG completes. Scripted, real, and it shows control.
**Wow**: the DAG + event-anchored timeline. **Boulevard panel**: plan → Boulevard checkout: tiers become bookable services/packages; "Accept Better tier" creates the booking + payment objects.
*Effort: L (2 days). CORE.*

### M4 · Reach — End-to-End Campaign
**Input**: extraction (+ transcript spans for verbatim quotes — show the span fetch in the Activity Layer as the exception that proves the rule).
The real Dify-chain agents as a visible pipeline: `reach_signal_extraction → campaign_strategy → timing → product_positioning → content_planner → email_copy ×N → sms_copy → compliance_qa → HITL → crm_packaging`. For T2 (price objection): strategy picks **Value Reinforcement**, timing builds the 5-touch cadence on a visual calendar, emails render in an inbox-style preview with a **"Why this email" flyout** — the consultation moments (with evidence quotes) that drove each line, the playbook rule applied, the patient-safe stat with its citation in practitioner notes. `compliance_qa` runs visibly: claims check against guardrails, PHI scan, opt-out check — one email gets **bounced and rewritten** on screen (the guardrail money-shot). HITL approval screen → then **delivery into Boulevard**: the GHL integration pattern re-skinned as the Boulevard Marketing Suite handoff (use GHL_TO_BOULEVARD_INTEGRATION_MAPPING.md framing — "pattern proven in production with GHL; destination becomes Boulevard").
**Wow**: the bounced-and-rewritten email. **Boulevard panel**: campaigns fire through Boulevard's existing marketing rails, hyperpersonalized for the first time.
*Effort: L (2 days). CORE.*

### M5 · Coaching, KPIs & Revenue (the CFO module)
**Input**: BOTH — extraction for deterministic signals, transcript spans for the coaching evidence (label it: "KPIs are computed from extraction; coaching reads the actual moments").
Three tabs:
1. **Consultation scorecard** (T1): the 9-KPI rubric, each score expandable to its evidence span + coaching note from `coaching_report`.
2. **Practice board**: the 20-consultation aggregate — KPI distributions, provider comparison, objection-type breakdown, missed-membership counter (revenue_leaks output).
3. **Revenue model** ⭐: interactive calculator with NumberFlow-animated figures. Inputs (sliders): consults/location/mo (default 150), close-rate lift (+3–8 pts, sourced from coaching adoption), avg ticket lift, rebooking lift, membership capture on flagged misses. Output cascade: **$/location/mo → ×6,000 Boulevard locations → platform ARR at each pricing tier ($250–450 / $600–900 / $1,500–2,500)**. End state: "A360 inside Boulevard isn't a feature — it's a new revenue line measured in nine figures." Every slider default cites its source (beta data, industry benchmark) in a footnote drawer.
**Wow**: dragging one slider and watching the Boulevard-scale number roll. *Effort: M–L (1.5 days). CORE.*

### M6 · Evidence (OpenEvidence clone) — LIVE
**Input**: none (the corpora). Vercel AI SDK `useChat` with data-parts streaming → retrieval over CMS RPCs (`match_pubmed_articles`, `match_youtube_transcripts`, `search_classified_videos`, podcast RPC) + GL facts. Citations per RETRIEVAL_SERVICE.md: numbered chips → reference cards → **hyper-specific deep links**: YouTube opens AT the timestamp in an embedded player; PubMed opens the article; FDA label opens the PDF at the page; GL facts link to the product record with authority badge (FDA > manufacturer > clinical > practitioner — visible color code). Suggested questions seeded for the room ("Sculptra vs Voluma for mid-face volume loss?"). Activity Layer shows live: corpora fanned, chunks ranked, citation set validated ("4/4 citations resolve to retrieved sources").
**Wow**: clicking [3] and landing at 14:32 in the manufacturer's video. **Boulevard panel**: every provider on Boulevard gets an aesthetics-native evidence engine — Decoda has nothing like the corpus (530K chunks).
*Effort: M (1.5 days — citation components exist in a360-v2). CORE.*

### M7 · Live Voice Consultation — STRETCH (go/no-go June 19)
Wire the existing voice bot (`C:\projects\voice_bot`) into the shell: simulated patient (scenario mode) or you role-playing live; trigger engine fires keyword → **real agent callback** (Stage-1 plan from its own CLAUDE.md: POST on match) → recommendation card with GL data + guardrails renders mid-conversation; Activity Layer shows the trigger → callback → GL query chain in real time. If live audio is too risky in-room: fallback = T1's ElevenLabs audio piped through the same pipeline (identical visuals, zero mic risk).
**Wow**: speaking "I'm worried about my forehead lines for my daughter's wedding" and watching the card appear. *Effort: M (1–1.5 days). STRETCH.*

### M8 · The Platform (agents, guardrails, versioning, governance)
The credibility module for the CTO: read-only registry view over real `a360_agents` + `a360_agent_versions` (statuses honest: X active, Y beta, Z designed), the guardrail library for the 20 offerings, GL coverage dashboard **scoped to the demo slice at 100% with platform totals shown honestly**, source-authority provenance stats (FDA/manufacturer/clinical/practitioner counts), and the agent↔GL version-dependency view (your priorities-list item: "show how we manage and version agents and the GL since they work off each other"). One screen, mostly queries.
**Boulevard panel**: "This is what you're acquiring — the management plane, not just the demos." *Effort: M (1 day). CORE (it answers diligence in advance).*

### Finale · The Flywheel (one screen, no interaction)
Animated loop: Consultation → Intelligence → Action (booking/campaign/plan) → Outcome → back into the substrate — with Boulevard's assets (2M appts/mo, $5B payments, 6,000 locations) drawn as the accelerant ring around it. Closing line on screen: *"The operator that controls consultation intelligence defines how this category is measured and monetized. The window is measured in months."* (Their CEO letter language, reflected back.) *Effort: S.*

---

## 5. Demo Agent Map

| Agent (registry key) | Module | Source of prompt | Input | Run mode |
|---|---|---|---|---|
| extraction_pass_1 / _2 | M1 | **v3.3 prompts (built)** | transcript | replay (+ live "Run Fresh") |
| clinical_notes (SOAP ×3) | M2 | production Bedrock prompts (port) | transcript | replay |
| tcp chain: catalog_resolver, goal_mapper, tier_builder, pairing_advisor, timeline_planner, pricing_engine, compliance_reviewer | M3 | NEW — prompt pack item 1 (decompose from production TCP + Dify deep-dive agents) | extraction + GL/PL | replay |
| reach chain: signal_extraction, campaign_strategy, timing, product_positioning, content_planner, email_copy, sms_copy, compliance_qa, crm_packaging | M4 | Dify beta v0.1.0 prompt snapshots (exist in a360_agent_versions) + email_campaign playbook v1.0.0 | extraction (+spans) | replay |
| coaching_report, coaching_signals, revenue_leaks | M5 | Prompt Runner production prompts | both | replay (batch ×20) |
| evidence_researcher | M6 | NEW — prompt pack item 2 (RETRIEVAL_SERVICE.md generation contract §7) | corpora | **LIVE** |
| voice trigger router + recommendation_card | M7 | voice bot + NEW callback agent — prompt pack item 3 | live speech | **LIVE** (stretch) |

**Prompt pack** (my next deliverable after you approve this plan): TCP chain prompts (7), evidence_researcher, voice recommendation_card, plus narration/Boulevard-panel copy for all modules.

## 6. Library Stack (additions to a360-v2)

| Need | Package | Why |
|---|---|---|
| Animation engine for Activity Layer + beams + fan-outs | `motion` (Framer Motion v12) | layout animations, AnimatePresence, springs — the whole show |
| Agent DAG / step functions (M3, M4) | `@xyflow/react` (React Flow) | the standard; custom nodes, animated edges |
| Animated counters (M0, M5 revenue) | `@number-flow/react` | the rolling-number wow on the Boulevard math |
| Charts (M5 boards) | `recharts` | already in your component vocabulary |
| Streaming markdown (M6 live chat) | `streamdown` | Vercel's streaming-safe markdown renderer |
| AI streaming + data parts (M6, M7, Run Fresh) | `ai` v6 (have) + `@ai-sdk/anthropic` `@ai-sdk/openai` | custom data parts carry Activity Layer events |
| Transcript audio sync | `wavesurfer.js` | scrubber + utterance sync in M1 |
| PDF deep links (FDA labels, M6) | `react-pdf` | open at `pageNumber` |
| JSON inspection (Activity Layer detail) | `react18-json-view` (or shiki-highlighted pre) | node input/output drill-down |
| Drawers/toasts | `vaul`, `sonner` | HITL trays, run notifications |
| Synthetic consult audio | ElevenLabs API (two voices) | T1–T5 audio; voice-bot fallback |
| Confetti restraint | none | we're selling a platform, not a party |

## 7. Build Schedule (June 12 → 22)

| Day | Deliverable | Gate |
|---|---|---|
| **12** | demo_* schema · event-capture wrapper · Activity Layer core (event renderer + 6 event types) · shell/nav | |
| **13** | Data pack: 20-offering coverage sprint (Claude Code) starts · T1–T5 scripts written · ElevenLabs renders | You approve scripts + offering list |
| **14** | T1 full pipeline captured end-to-end · M1 build (player, tree, beams) | First replayed run on screen |
| **15** | M1 complete incl. fan-out finale + HITL tray · M2 (reuse traceability) | |
| **16** | M3 TCP: DAG + tiers + timeline + COALESCE pricing | Coverage sprint done for the 20 |
| **17** | M4 Reach: chain, inbox, why-flyout, compliance bounce, Boulevard handoff | |
| **18** | M5: scorecard + 20-consult batch + revenue calculator · M0 | Batch runs captured |
| **19** | M6 Evidence live · M8 Platform screen | **Voice go/no-go** |
| **20** | M7 voice (if go) or polish · Finale flywheel · Boulevard panels everywhere | |
| **21** | Full dry run ×3 · narration copy · CEO-solo mode (every module self-explains) · perf pass | Dry run < 25 min |
| **22** | Buffer · final deploy · leave-behind link | |

**Division of labor**: Claude Code owns the coverage sprint, batch captures, and repo work locally; I own specs, prompts, scripts, copy, and module-level design docs here; you own approvals, the Boulevard narrative voice, and the dry runs.

## 8. What I Need From You (in order)

1. **Approve/edit the 20 offerings** and the five transcript scenarios (15 min)
2. **Demo practice identity** (name, branding, price list source — real beta practice de-identified, or fictional "Lumière Aesthetics"?)
3. **Confirm replay-first** as the architecture (this gates the event-capture build)
4. The **production SOAP + TCP + coaching prompts** exported from Prompt Runner / genai-platform so demo runs match production behavior
5. Boulevard meeting format confirmation (live walkthrough by you + leave-behind link for CEO solo? Both are assumed above)
