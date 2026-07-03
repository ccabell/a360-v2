# Phase 0 Plan — A360 TCP Builder (demo-agent #2 on the Scribe template)

> Phase 0 = **PLAN ONLY, no build.** This doc is the review-gate deliverable.
> Kickoff: `C:\Projects\A360_Hub\plans\demo-tcp-builder-kickoff.md`.
> Substrate: the demo-agent template + Scribe (`.planning/demo-agent-phase0-recon.md`).
> **Status: Phase 1 BUILT + verified end-to-end (autonomous, 2026-06-22). Phases 2–3 folded in.** Recon + build run 2026-06-22.

### ✅ Built & verified (2026-06-22, unattended)
- **DB seed applied** — `scripts/tcp-timing-seed.sql` (idempotent, revert block included). Now: 9 `item_relationships.timing_guidance`, 8 hero products with retreatment/downtime. Synthetic, no PHI.
- **`lib/tcp/`** — `types.ts`, `resolve.ts` (cached-first + live fallback), `fixtures/danielle-brooks.ts` (grounded in real GL rationale/education + her real extraction), `fixtures/index.ts`.
- **`app/api/tcp/resolve/route.ts`** — POST → `TcpPlan` (verified `200`).
- **Template generalized** — `DemoPatientCard.stageReadyFor: string[]` + `DemoStepProps.agentKey`; picker badge is per-agent now. Scribe still works (Sofia/Amara show STAGE-READY on Scribe; Danielle only on TCP).
- **TCP steps** — `components/demo-agents/tcp/`: context-panel + recommend / education / timeline / tiers / finalize + config. Tasteful staggered motion.
- **Old block-TCP retired** — `app/dashboard/tcp/page.tsx` now mounts the shell; no `BlockCard` imports (Studio's BlockCard untouched). Prompts harvested into the fixture/copy.
- **Docs** — `docs/TCP_DEMO_SCRIPT.md` (presenter click-path) + `components/demo-agents/tcp/README.md`.
- **Verification** — `tsc --noEmit` clean, `eslint` clean, full 6-step flow driven in the browser preview (Danielle), zero console errors, resolve `200`.
- **Deviation from plan:** none material. Tiers `best` ordering is Vollure · Sculptra · Ultherapy · Botox · SKINVIVE.
- **Left for Chris:** (1) eyeball the seeded timing values / fixture copy; (2) optional 2nd stage patient (Amara) in a later pass.
- **Vercel — RESOLVED 2026-06-22.** Use **`a360-v2-wse`** (prj_KXW7…), prod alias `a360-v2-wse.vercel.app`. The GitHub-connected **`a360-v2`** project is failing EVERY `main` production build (turbopack) — the team's working stage is the CLI-deployed `a360-v2-wse`. TCP **preview deployed READY**: https://a360-v2-pcwrvy7ih-chris-projects-a3d3bc4c.vercel.app (password-gated). Promote with `vercel --prod --cwd C:\Projects\a360-v2-wse` when ready. Separately, `a360-v2`'s red `main` builds should be investigated if GitHub auto-deploy is wanted back.

### Decisions locked (Chris, 2026-06-22)
1. **Hero scope:** Danielle Brooks **only** for v1 (Amara deferred to Phase 2).
2. **Timing gap:** **Option B — fixture + light hero-set DB seed** (see §8 for the exact, reviewable seed).
3. **Consultation context:** **header band of Step 2** (shared picker untouched).
4. **Template generalization:** `stageReadyFor: string[]` (recommended default).
5. **Pricing:** synthetic good/better/best ranges, explicitly labeled "illustrative."
6. **Tier ladder:** good = Vollure · better = Vollure + Sculptra · best = + SKINVIVE + Botox + tightening.

🎯 **BUILD TARGET = `a360-v2-wse` (shadcn/ui + Tailwind), this runtime — build & test here.** Production `a360-web-app` (MUI/Emotion) is NOT a target: never modify, port into, fork, or deploy there; it's read-only reference / asset source at most. TCP is a net-new shadcn surface on the demo-agent template (Option A — net-new, never an in-place MUI reskin).

---

## 0) Gating question — answered YES: the template has landed

The hard dependency ("do not execute until the Scribe demo-agent template exists") is **satisfied**. The reusable spine is present and TCP is purely additive:

| Shared piece | File | TCP reuse |
|---|---|---|
| Template shell (header + stepper + step state + Back/Next + run ctx) | `components/demo-agents/demo-agent-shell.tsx` | as-is |
| `DemoAgentConfig` / `DemoStepProps` / `DemoRunContext` | `components/demo-agents/types.ts` | as-is (+1 generic field, §7) |
| Stepper | `components/demo-agents/stepper.tsx` | as-is |
| Practice header (Orange Twist + location selector + products strip) | `components/demo-agents/practice-header.tsx` | as-is |
| Shared Step-1 patient picker (5 patients, summary + visit) | `components/demo-agents/steps/patient-picker-step.tsx` | as-is (+ generic stage-ready badge) |
| Reference consumer #1 | `components/demo-agents/scribe/*` + `app/dashboard/scribe/page.tsx` | pattern to mirror |
| Cached-first resolver pattern | `lib/scribe/generate.ts` + `lib/scribe/fixtures/*` | mirror as `lib/tcp/*` |

**Adding TCP = a new `DemoAgentConfig` + Steps 2–6 components + `lib/tcp/*` + one page. No new page-shell, no new runtime, no new DB.**

---

## 1) Substrate behaviors I'm building on (verified by reading the code)

- **Step state model:** `DemoRunContext = { patient, data: Record<string,unknown> }`. Each step reads/writes `ctx.data` via a typed accessor (Scribe pattern: `getScribeState(ctx.data)`). TCP will use `getTcpState(ctx.data)`.
- **Footer control:** steps that render their own nav set `hideFooter: true` (all Scribe steps do). TCP steps with HITL controls will do the same; simple steps can use the template footer + `canAdvance`.
- **Stage-safety = cached-first.** `resolveScribe()` returns a hand-authored fixture (`source:"cached"`) when one exists for the patient, else best-effort live. The reveal cadence is **deterministic setTimeout choreography**, not model-timing. TCP mirrors this exactly — fixtures are the stage default; nothing on stage waits on a live model.
- **Source linking** (hover a line → highlight transcript segment) is fixture-only in Scribe. TCP will reuse the same idea for recommendation rationale → transcript grounding.
- **Patients:** `GET /api/demo-agents/patients` returns 5 cards (Ops, ordered by `last_consultation_at`). `hasCachedScribe` drives a "STAGE-READY" badge. (Generalization in §7.)
- **Modified Next.js guardrails confirmed in code:** `params` is `Promise<{id}>` and awaited (`global-library/products/[id]/route.ts`); request gate is `proxy.ts`. JSONB timing fields are objects — must normalize before render.

---

## 2) Data reality (live-queried 2026-06-22 — NOT assumed)

### Global V3 / agent fuel (`aejskvmpembryunnbgrk`, `agentSupabase`)

29 active products. Coverage of the fields TCP needs:

| Capability | Field(s) | Coverage | Verdict for stage |
|---|---|---|---|
| Product fuel docs | `agent_fuel_documents` (product_fuel) | **29/29 (100%)** | ✅ real |
| Concern match | `item_concerns` (+ `relevance`, `treatment_role`, `is_fda_indicated`) | 18/29 products | ✅ real for hero set |
| Anatomy match | `item_body_areas` (+ `anatomy_specificity`, `side`) | 18/29 | ✅ real for hero set |
| Evidence | `evidence_links` (source, snippet, authority_rank) | 18/29 | ✅ real for hero set |
| **Pairings** | `item_relationships` | **11/29 products, 37 rels** | ✅ real for hero set |
| → pairing rationale | `clinical_rationale` | **37/37** | ✅ real |
| → patient education | `patient_education_text` | **37/37** | ✅ real |
| → staff talking points | `staff_talking_points` | **37/37** | ✅ real |
| → same-session flag | `same_session_ok` | **37/37 populated** | ✅ real (drives timing) |
| → pairing tier | `pairing_tier` (canonical/common) | **37/37** | ✅ real |
| **→ relationship timing** | `timing_guidance` | **0/37** | ❌ **SEED/fixture** |
| Product onset/peak/duration | `onset_time`/`peak_effect`/`duration_of_effect` (jsonb) | partial (Botox, Xeomin, SKINVIVE + shells) | ⚠️ partial → fixture |
| Retreatment cadence | `min_retreatment_interval` (jsonb) | **0/29** | ❌ **SEED/fixture** |
| Social downtime | `social_downtime` (jsonb) | **0/29** | ❌ **SEED/fixture** |

**Headline:** Steps 2 (recommendations) and 3 (education) are backed by **real GL data** for the hero product set — every relationship carries rationale + patient education + staff talking points + same-session + tier. **Step 4 (timing/roadmap) is the gap** — `timing_guidance`, retreatment intervals, and downtime are empty. That's the one thing we author (fixture-first; optional DB seed in §8).

### Hero product set (best-covered, all real, all inter-paired)

`Botox Cosmetic` (10 concern / 8 anatomy / 7 rel / 31 evid, onset+duration), `Juvederm Voluma XC` (8/7/1/17), `Sculptra Aesthetic` (7/**19**/1/15), `Restylane Lyft` (7/6/1/6), `Juvederm Vollure XC` (5/4/1/7), `SKINVIVE` (5/2/1/8, duration), `RHA Redensity` (4/3/1/4), `InMode Morpheus8` (4/5/0-rel/15), `Merz Ultherapy PRIME` (3/3/0/10). Neuromodulators (Botox/Dysport/Jeuveau/Xeomin/Daxxify) each pair canonically/commonly with the fillers above.

### Ops (`uedajrdzcjfrmbiznflf`) — patients & extractions

- 20 patients / 20 consults / 20 transcripts / **20 extractions**. `opportunities` table is **empty** (0 rows) — opportunities/concerns come from `extractions.outputs`, not that table.
- Picker shows 5 (top by `last_consultation_at`), all with `details` + real transcripts: **Sofia Reyes, Amara Okafor, Danielle Brooks, Katherine Chen, Jessica Navarro**.
- `extractions.outputs.{prompt_1,prompt_2}.parsed_json` is a **direct match** for the Step-1 context panel:
  - prompt_1 → `patient_goals` (primary/secondary concerns, anticipated outcomes), `areas` (concern_areas, treatment_areas), `offerings` (with `catalog_match`, `disposition`, `guidance_discovery`), `prior_treatments`, `interests`, `cross_sell_summary`.
  - prompt_2 → `concerns`, `objections`, `hesitations`, `outcome.status` (conversion), `signal_tags`, `next_steps`, `visit_checklist`.

### Hero patient = **Danielle Brooks** (`a9094b49-1395-42a9-bb33-f3168d087d19`)

Why she's the ideal TCP demo (all from her real extraction):
- **Hard deadline → timeline story:** "my daughter's wedding is in October" → Step 4 works *backward from October*.
- **`outcome: agreed_pending_scheduling`, no appointment booked** → the TCP Builder is *exactly* the missing piece: turn intent into a staged, timed, priced plan. The emotional payoff ("the system runs the sale with the provider") lands.
- **Zero objections, signal_tags:** scheduling_intent, treatment_interest_high, positive_sentiment, partner_consultation, future_language.
- **Real offerings map to covered + paired products:** Juvederm Vollure XC (nasolabial folds, *agreed_pending*), Sculptra Aesthetic (cheeks, "gradual collagen building leading up to October" — a timing narrative straight from the transcript), Ultherapy PRIME (discussed). Vollure↔Sculptra is a **real** relationship (rationale + patient education + `same_session_ok:false` → a real "stage these, don't combine" timing call).

**Secondary stage-ready fixture:** Amara Okafor (`0c60…`) — initial consult, real offerings (Dysport, lips, Halo). Usable but weaker (outcome already `treatment_performed`, and she's Scribe's hero). Recommend authoring **Danielle first** (primary), Amara **only if** we want a second click-path. Other 3 picker patients fall back to live/best-effort (not stage-guaranteed).

---

## 3) The TCP `DemoAgentConfig` → 6 steps mapped to components

```
key: "tcp"  ·  label: "TCP — Treatment & Care Plan"  ·  tagline: "Run the sale with the provider — recommend, time, and tier a plan." · icon: ClipboardList
includePatientStep: true   // Step 1 = shared picker
steps: [recommend, education, timeline, tiers, finalize]
```

| Kickoff step | Component (new) | hideFooter | HITL | Primary data source |
|---|---|---|---|---|
| 1 Select patient + **consultation context** | shared `PatientPickerStep` → context panel inside Step 2 header *(or a thin Step 1.5)* | n/a | — | Ops `extractions.parsed_json` (real) |
| 2 Intelligent recommendations | `recommend-step.tsx` | yes | accept / edit / reject each | GL `item_concerns`+`item_body_areas`+`item_relationships` (real) via fixture |
| 3 Education blocks | `education-step.tsx` | yes | select / reorder / attach | GL `patient_education_text` + `evidence_links` + fuel (real) |
| 4 Timeline / roadmap | `timeline-step.tsx` | yes | adjust sequence | `same_session_ok` (real) + onset/duration/retreatment/downtime (**seeded in fixture**) |
| 5 Tiered plan + pricing | `tiers-step.tsx` | yes | pick tier | accepted items + synthetic pricing (labeled illustrative) |
| 6 Review + finalize | `finalize-step.tsx` | yes | edit, finalize | composed plan |

**Decision — consultation context (kickoff Step 1):** the shared picker stays generic (don't fork it). The grounded **consultation-context panel** renders as the **header band of Step 2** (concerns, signal tags, objections, conversion status, goals — from the real extraction), so Step 1 remains the untouched shared picker and the context appears the moment we start building the plan. *Alt: a dedicated read-only Step "Context" between picker and recommend — heavier; only if Chris wants it as its own beat.*

---

## 4) Per-step UX design (tokens = Orange `#F26A1B`, shadcn tokens, deterministic motion)

**Step 2 — Recommendations (HITL).** Top: consultation-context panel (real extraction). Below: recommendation cards, each = product name + `kind` badge + **fit signal** (from `item_concerns.relevance`/`treatment_role` + `pairing_tier`: canonical/common) + **clinical rationale** (`clinical_rationale`) + "matches: \<concern\> · \<area\>". Each card has **Accept / Edit / Reject**; accepted → `ctx.data.tcp.accepted`. Recommendations are seeded from Danielle's real offerings *plus* GL-grounded adds (e.g., Botox upper-face, SKINVIVE skin quality) — each add justified by a real relationship row. Reveal: cards stagger in (fade/slide), same cadence primitives as Scribe.

**Step 3 — Education blocks.** For each accepted item, selectable blocks drawn from `patient_education_text` (real) + top `evidence_links` (real, authority-ranked) + fuel-doc snippets. Provider toggles + reorders; attached to the relevant treatment. (No source attribution shown to the patient — house rule.)

**Step 4 — Timeline / roadmap.** Horizontal timeline: **Today → weeks → months → October**. Each treatment placed by timing intelligence:
- `same_session_ok` (**real**) → flags what can be combined in one visit vs. staged (e.g., Vollure + Sculptra `false` → separate visits).
- onset/peak/duration + retreatment cadence + downtime (**seeded** in fixture) → "do today vs. stage later," and the Sculptra collagen series across 6–10 weeks landing the glow before October.
Each placement has a one-line "why this timing" explainer. Provider can drag/reorder; honest labels (offered / comparison / referral). Every timing fact is tagged real vs. illustrative in the fixture so we never overclaim.

**Step 5 — Tiers (the sale).** good / better / best assembled from accepted items:
- **Good** "Targeted correction" — the agreed primary (Vollure folds).
- **Better** "Balanced, wedding-timed" — Vollure + Sculptra cheeks (the real synergy pair).
- **Best** "Full wedding-ready" — + SKINVIVE skin quality + Botox upper face + tightening (Ultherapy/Morpheus8).
Each tier: included items, "what this plan buys you" narrative, timeline fit, and a **synthetic, clearly-labeled "illustrative" price range** (see §8 — no real price data exists).

**Step 6 — Review + finalize (HITL gate).** Full plan on one screen — recommendations, education, roadmap, chosen tier. Inline edit; "Finalize" → clean, client-presentable TCP (print/share-styled). Copy-to-clipboard like Scribe's toolbar.

---

## 5) Stage-safety architecture (mirror of Scribe)

```
lib/tcp/types.ts        // TcpPlan, TcpRecommendation, EducationBlock, TimelineEntry, Tier, TcpFixture, resolve req/resp
lib/tcp/resolve.ts      // resolveTcp(req): fixture-first → live fallback (optional)
lib/tcp/fixtures/
  index.ts              // getTcpFixture(patientId), CACHED_TCP_PATIENT_IDS
  danielle-brooks.ts    // primary hero (fully authored, real GL + seeded timing)
  amara-okafor.ts       // optional secondary
app/api/tcp/resolve/route.ts   // POST { patientId, consultationId? } → TcpPlan (source: cached|live)
app/dashboard/tcp/page.tsx     // REPLACE old block UI → <DemoAgentShell config={tcpConfig} />
components/demo-agents/tcp/
  tcp-config.tsx
  recommend-step.tsx · education-step.tsx · timeline-step.tsx · tiers-step.tsx · finalize-step.tsx
  context-panel.tsx    // shared consultation-context band (reads extraction)
```

- **Cached-first:** `resolveTcp` returns the authored fixture for hero patients (`source:"cached"`), else a best-effort live assemble from GL queries (non-stage). Stage always uses fixtures → instant, deterministic, never a live model on stage.
- Reuse existing `agentSupabase`/`opsSupabase` (no new client), existing `/api/global-library/products` patterns, `/api/practice`, `/api/demo-agents/patients`.

---

## 6) Old TCP — harvest then retire

`app/dashboard/tcp/page.tsx` is the 4-block orchestrator (`consultation_summarizer → package_recommender → tcp_builder → clinical_enrichment`) over `BlockCard`, running real agents with context-chaining (the 2–5 min latency we're killing).
- **Harvest (keep the intelligence):** the 4 block prompts are the sales/plan model — patient context; package + **pairing logic**; timeline with **onset/peak/duration + maintenance cadence**; clinical safety (contraindications, FDA scope, sign-off). These map onto Steps 2/4/6 and seed the fixture copy.
- **Retire (drop the runtime):** replace the page body with the shell; the `TCP` sidebar entry already points to `/dashboard/tcp`, so replacing in place repoints it. Old `BlockCard`/`BlockConnector` left untouched (still used by Studio) — only the TCP page stops importing them.

---

## 7) Template generalization (generalize, don't fork)

One generic change so the shared picker can show "STAGE-READY" for *any* agent (today it's hardcoded `hasCachedScribe`):

- `DemoPatientCard`: replace `hasCachedScribe: boolean` → `stageReadyFor: string[]` (agent keys with a fixture for that patient). `/api/demo-agents/patients` aggregates from each agent's cached-id registry (`CACHED_PATIENT_IDS`, `CACHED_TCP_PATIENT_IDS`).
- `DemoStepProps`: add `agentKey: string` (shell passes `config.key`). Picker shows the badge when `card.stageReadyFor.includes(agentKey)`.
- Update Scribe's one usage site accordingly. Net: ~1 type change + 1 API tweak + 1 picker line; Scribe behavior unchanged.

*(If Chris prefers the smallest possible diff, the fallback is additive `hasCachedTcp` + the picker reading config — but `stageReadyFor` is the clean generic and is recommended.)*

---

## 8) Seed plan (synthetic, no PHI) — needs 👍

**Practice/locations: already seeded** — `practices` row is "Orange Twist" (#F26A1B, "BODY | FACE | SKIN", 4 locations Newport Beach/Irvine/San Diego/Scottsdale). Nothing to do.

**Timing intelligence (the one real gap). CHOSEN: Option B — fixture + light DB seed.** The fixture stays the stage default (instant, deterministic); the DB seed makes the **live/non-fixture path read true** too, hero-set only. **All values synthetic but clinically sane, no PHI. Reviewable below; nothing writes until Chris signs off on these exact values (Phase 1, step 0).**

*Scope of writes to Global V3 (`aejskvmpembryunnbgrk`) — hero set only:*

- **`products` (UPDATE jsonb, only where currently null):** `min_retreatment_interval`, `social_downtime`, and `onset_time`/`peak_effect`/`duration_of_effect` where missing — for: Juvederm Vollure XC, Sculptra Aesthetic, SKINVIVE by Juvederm, Juvederm Voluma XC, Restylane Lyft, InMode Morpheus8, Merz Ultherapy PRIME (Botox already has onset+duration). Values as `{ "display": "…", "value": <n>, "unit": "…" }` to match the existing JSONB `{display,…}` shape. Illustrative ranges, e.g. Vollure duration ~12–18 mo / retreat ~12 mo / downtime ~2–3 d; Sculptra series 3 sessions ~4 wk apart, results build 6–12 wk, ~2 yr duration; SKINVIVE ~6 mo; Voluma ~18–24 mo.
- **`item_relationships.timing_guidance` (UPDATE text, ~8 hero pairings, currently 0/37):** e.g. Vollure↔Sculptra ("stage — not same session; place Sculptra series first, layer HA filler once collagen settles"), Botox↔Voluma ("same session fine; Botox first"), Botox↔SKINVIVE, Daxxify/Dysport↔fillers, Sculptra↔Morpheus8. Each consistent with the row's real `same_session_ok`.

*Guardrails on the seed:* idempotent `UPDATE … WHERE <field> IS NULL` (won't clobber real data), hero ids only, executed via a single reviewed migration/SQL block, captured in JOURNAL. Every seeded fact is **also** tagged `illustrative` in the fixture so the UI can label it.

**Pricing is synthetic — labeled.** `extractions…price_discussed` is null everywhere and GL has no price table. good/better/best ranges will be **illustrative, explicitly labeled** (not represented as real practice pricing). Honest-readiness rule.

**Nothing else is seeded.** Recommendations, education, concerns, anatomy, pairings, evidence are **real GL data** for the hero set.

---

## 9) Demo click-path (the stage walk — Danielle Brooks)

1. Sidebar → **TCP**. Orange Twist header (logo, Newport Beach, products strip). Title "TCP — Treatment & Care Plan."
2. **Step 1:** pick **Danielle Brooks** (STAGE-READY badge) → Continue.
3. **Step 2:** context band lights up from her real consult — concerns (volume loss, nasolabial folds), goals ("look good for daughter's wedding"), signal tags, outcome "agreed, pending scheduling." Recommendation cards stagger in: Vollure (folds) ✓agreed, Sculptra (cheeks) — each with fit signal + rationale; provider **accepts** them, **edits** one dose note, sees a GL-grounded **add** (SKINVIVE) with rationale. → Next.
4. **Step 3:** education blocks per accepted item; provider attaches "What to expect — Sculptra collagen series" + aftercare; reorders. → Next.
5. **Step 4:** timeline today→October. System stages Vollure now (instant correction), Sculptra as a 2–3 session series over 6–10 weeks ("collagen builds toward October"), flags Vollure+Sculptra **not same session** (real `same_session_ok:false`), places SKINVIVE/Botox ~3–4 weeks pre-wedding for peak glow. Each placement explains its timing. → Next.
6. **Step 5:** good / better / best. Provider picks **Better** (Vollure + Sculptra, wedding-timed) — narrative + illustrative price. → Next.
7. **Step 6:** full plan, one screen; small inline edit; **Finalize** → clean client-ready TCP. STAGE-SAFE badge throughout; instant at every step.

**Signature moments:** (a) context panel grounding the sale in what she actually said; (b) the same-session "stage, don't combine" intelligence; (c) the Sculptra series timed to the wedding; (d) good/better/best close.

---

## 10) Phase 1–3 (refines the kickoff)

- **Phase 1 — TCP steps on the template.** `lib/tcp/*` (types, resolve, Danielle fixture), `/api/tcp/resolve`, `tcp-config` + Steps 2–6 + context-panel, template generalization (§7), replace page. Verify each step in browser + screenshot.
- **Phase 2 — Sales polish + roadmap viz.** Timeline visualization, tier presentation, rationale/education reveal motion, cached fallback hardening. Make recommendations/timing feel intelligent, not canned.
- **Phase 3 — Retire old TCP + runbook.** Confirm sidebar repoint, remove old block imports from the TCP page, `README` + `DEMO_SCRIPT.md` (this click-path), Vercel preview. ⚠️ confirm Vercel project (`a360-v2` vs `a360-v2-wse`) before preview (carried from Scribe recon).

## 11) File manifest (Phase 1 — for reference, not built yet)

New: `lib/tcp/types.ts`, `lib/tcp/resolve.ts`, `lib/tcp/fixtures/{index,danielle-brooks}.ts`, `app/api/tcp/resolve/route.ts`, `components/demo-agents/tcp/{tcp-config,recommend-step,education-step,timeline-step,tiers-step,finalize-step,context-panel}.tsx`.
Modified: `app/dashboard/tcp/page.tsx` (replace), `components/demo-agents/types.ts` (+`agentKey`, `stageReadyFor`), `app/api/demo-agents/patients/route.ts` (aggregate stage-ready), `components/demo-agents/steps/patient-picker-step.tsx` (generic badge), `app/dashboard/scribe` usage of the renamed field.

---

## 12) Decisions needed from Chris (the 👍 gate)

1. **Hero patient = Danielle Brooks** (primary). Author **Amara** as a 2nd click-path too, or Danielle only for v1? *(rec: Danielle only for v1, add Amara in Phase 2.)*
2. **Seed approach: A) fixture-only** (rec) **or B) fixture + light hero-set DB seed** of timing fields?
3. **Consultation context = header band of Step 2** (rec) or its **own dedicated step** between picker and recommend?
4. **Template generalization: `stageReadyFor: string[]`** (rec) or minimal additive `hasCachedTcp`?
5. **Pricing:** confirm synthetic good/better/best ranges, explicitly labeled "illustrative," are acceptable for the demo.
6. **Tier ladder** for Danielle: confirm good=Vollure / better=Vollure+Sculptra / best=+SKINVIVE+Botox+tightening.

## 13) Honest risk callouts (A360 assessment standards)

- **Timing intelligence is authored, not live GL** (`timing_guidance` 0/37; retreatment/downtime 0/29). Fixture-tagged real vs. illustrative; do not present roadmap timing as fully GL-sourced.
- **Pricing is synthetic** — labeled illustrative.
- **Pairings are real but partial** (11/29 products). The hero path stays inside the covered set; we don't imply universal coverage.
- **Only Danielle (and optionally Amara) are stage-guaranteed.** Other picker patients = best-effort live; the picker badge makes this explicit.
- **No new runtime/DB.** Cached-first fixtures + existing clients only.

— End Phase 0 plan. Awaiting 👍 to proceed to Phase 1. —
