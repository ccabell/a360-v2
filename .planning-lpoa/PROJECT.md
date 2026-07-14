# LPOA — Laser Parameter Optimization Assistant — Project

> GSD planning for the LPOA multi-device milestone. Lives in `.planning-lpoa/`
> (not `.planning/`, which belongs to the separate GL / Heidi Evidence Clone
> GSD project in this same repo). Work happens in the isolated worktree
> `C:\Projects\a360-v2-lpoa` on branch `feat/lpoa-multi-device` (off `main`).

## What This Is

LPOA is a clinical-reference AI that helps aesthetic-laser operators choose safe,
effective treatment parameters, grounded in each device's operator manual. It is
a surface in the a360-v2 app at `/dashboard/lpoa`, deployed via the
`a360-v2-wse` Vercel project (from `main`, CLI `vercel --prod`).

Advisory only — it surfaces recommendations and reasoning for clinician review,
never diagnosis or direct device control. Deliberately positioned as a reference
guide to avoid 510(k) (per the product vision doc).

## Core Value

Every parameter recommendation is grounded in the operator's specific device
manual and explains its reasoning — so operators trust it and can verify each
suggestion against the cited source.

## Current Milestone: v1.0 Multi-Device

**Goal:** extend LPOA from one hardcoded device (Sciton Joule) to a **device
catalog**, so an operator picks their laser and gets: the right manual(s), a
device-specific grounded assistant, device-specific suggested questions/FAQs,
and — for a starter subset of devices — a device-specific parameter simulator.

**Approach (decided 2026-07-13):** extend the *current* per-device-config
architecture (client-side PDF text extraction + Claude Haiku), NOT the full
per-device vector-RAG vision. Real per-device RAG remains the documented future
(see vision doc §"Integration with Device-Specific RAGs").

**Target catalog (from `C:\Projects\lpoa`, 14 PDFs / 13 devices / 10 mfrs):**
Sciton JOULE (already live) · Candela GentleMax Pro · Cynosure Elite iQ ·
Cutera Excel V / Excel HR / AviClear · Alma Harmony XL Pro / Soprano Ice ·
Deka SmartXide · Quanta QX MAX · InMode BodyTite / Morpheus8 · Lumenis
SPLENDOR X (brochure) · BTL EMFACE (reference sheet).

## Current State (2026-07-13)

**Not started — planning.** The live LPOA is single-device: "Joule" is expressed
only as 3 env vars with hardcoded fallbacks duplicated across 4 files, plus
hardcoded question/FAQ arrays and a hand-coded parameter-rules engine
(`SettingsPanel.tsx` `computeGuidance()`). No device abstraction, no multi-manual
support, no source-support lock, no patient→simulator wiring exist yet.

**Safety-model gap found in the deep pass (2026-07-14):** the live simulator does
NOT implement the advisory/source-supported model the product docs require — it
shows **fabricated citation pages** (`SettingsPanel.tsx:226-298`, not tied to the
real manual), a **fake confidence** score (`filled/steps*100`, `:237-238`), and
**no lock**. R6/R7 correct this (real citations + real lock), including for Joule.

## Requirements

### Active (this milestone)

See REQUIREMENTS.md. Summary:
- R1  Verified PDF corpus (each in-scope manual opened/checked; brochures flagged).
- R2  Device-catalog data model (base on the Viewer doc's device-pack schema §10/§21.3); Joule migrated in as device #1, zero behavior change.
- R3  Device picker; 1..N manuals per device; per-manual PDF load (kill the global URL cache).
- R4  Per-device assistant prompt (generalize `buildSystemPrompt`).
- R5  Per-device suggested questions + FAQ (generalize the hardcoded arrays).
- R6  Per-device parameter simulator config (generalize `SettingsPanel`), authored for a starter subset.
- R7  "Locked until source-supported" gate in the simulator (net-new UI; reuse the lock/confidence model from the Viewer doc §7).
- R8  Patient context → simulator prefill (net-new).
- R9  Per-device branding in the sidebar.

### Out of Scope (this milestone)

- Full per-device vector RAG / fine-tuned agents (documented future, not now).
- Parameter simulators for devices beyond the starter subset (expand later, device-by-device).
- Sourcing/verifying manuals for devices not yet downloaded (Fotona = 0 PDFs; coverage gaps in `CURATION_DASHBOARD.md`).
- Voice-bot / "LPOA PDF Agent" page-precise-citation work (separate roadmap, `Pivot (6).md`).

## Context

- **Deploy target:** `a360-v2-wse` Vercel project (`prj_KXW7C1STkHbNTag6v0WEA1Ey8G3A`), from `main` via CLI only. Never git-push deploy.
- **Live URL:** https://a360-v2-wse.vercel.app/dashboard/lpoa
- **Model:** `claude-haiku-4-5-20251001` via `app/api/lpoa-search/route.ts` (device-agnostic relay — no change needed).
- **Manuals source:** raw PDFs in `C:\Projects\lpoa` (per-manufacturer folders). Also now reviewable/approvable into GL's `gl-media` bucket via a360-studio's "Laser Manuals (LPOA)" browse root (added 2026-07-12) — candidate PDF host so the repo doesn't carry ~41MB.
- **Vision doc:** `C:\Projects\lpoa-viewer\__ Laser Parameter Optimization Assistant (LPOA) (1).md`.

## Reference Documents

Older design docs (superseded standalone `lpoa-viewer` path), filed in
`.planning-lpoa/reference/` — archival, but materially useful for this milestone:

- **`LPOA_Viewer_Project_Documentation.md`** — the standalone LPOA Viewer spec.
  Contains a **fully-specified confidence-gate / settings-lock model** (§7:
  levels 0–4, the 6-point lock rule) and a **control schema** (§10:
  `ControlStatus` = locked/available/review_required/not_applicable,
  `ControlFieldState`, `ControlPanelState`, `Citation`, `LpoaQueryResponse`),
  plus a **"Device Pack Architecture"** (§21.3: JSON/YAML device packs,
  device-specific controls/FAQs, multi-manual). **Directly reusable for R2
  (catalog/device-pack schema) and R7 (the lock model) — don't reinvent these.**
- **`LPOA_POC_Vision.md`** — the fuller LPOA POC vision (RAG + per-device
  fine-tuned agents, 5-phase plan, device-specific RAGs, target laser
  categories). The documented *future* our current-pattern extension leads toward.

**Correction to an earlier claim:** the *lock/confidence model and control
schema ARE documented* (in the Viewer doc). What's still undocumented is the
per-device *parameter values* (fluence/pulse-width tables per device) — those
remain the draft-from-manual → clinical-review authoring of R6/P3.

## Non-Negotiables

- Advisory only — never automated diagnosis or device control; results formatted for clinician review.
- Every parameter recommendation carries its manual citation + reasoning (explainability is a product requirement).
- No parameter simulator ships without clinical review of its rules (draft-from-manual → sign-off).
- The corpus is unverified until checked (`PDF_CLEANUP_VERIFICATION_STATUS.md` retracts the "ready" claim) — R1 gates grounding quality.
- **Real citations only.** No parameter or FAQ shows a page number that isn't verified against that device's actual manual — no invented/plausible page refs (the live Joule simulator's current sin). Confidence shown must reflect source support, not form completion.

## Constraints

- **Stack:** Next.js App Router, React 19, existing `components/lpoa/*`; keep the device-agnostic API relay and reusable UI primitives (gauges, thermobar, citation nav).
- **Isolation:** all work in the `feat/lpoa-multi-device` worktree; leave the GL `.planning/` and the scribe-demo branch untouched.
- **Deploy:** preview-first; production only from `main` after merge.

## Key Decisions

| Decision | Rationale | Date |
|----------|-----------|------|
| Extend current per-device-config pattern, not full RAG | Matches the working demo; RAG is the documented future | 2026-07-13 |
| Starter-subset simulators, expand later | Each device's rules engine is real clinical authoring | 2026-07-13 |
| Draft rules from manuals → clinical review | Safety-sensitive content, not in any existing doc | 2026-07-13 |
| Isolated worktree off `main` | Keep live wse demo + scribe branch untouched; main is deploy source | 2026-07-13 |
| Planning in `.planning-lpoa/`, not `.planning/` | `.planning/` is the GL project's; avoid collision on merge | 2026-07-13 |

---
*Last updated: 2026-07-13 — milestone kickoff.*
