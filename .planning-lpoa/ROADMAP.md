# LPOA — Roadmap (v1.0 GentleMax Pro Deep Tool)

**Milestone pivoted 2026-07-16.** The original "1→13 device catalog" is not
buildable on real values — corpus verification (P0) proved only **1 of 14** PDFs
is a genuine operator manual (Candela GentleMax Pro; see
`phases/00-verify-corpus/CORPUS_VERDICT.md`). This milestone instead builds a
**deep, genuinely functional, source-locked clinical tool on the one real
manual** — not a chatbot, but a set of purpose-built modules with **Planning**
and **Sales** modes, where every value shown is a real manual quote with a page
citation, and anything the manual doesn't specify renders **locked** (never
fabricated). The device-pack architecture is retained so more devices slot in
later once real manuals are sourced (deferred).

Legend: ☐ not started · ◐ in progress · ✓ done

---

## Product shape (what we're building)

**Scope narrowed 2026-07-16 (Chris): skip Sales/modes for now — build the
doctor's workspace.** A single clinician-facing workspace at `/dashboard/lpoa`
for the **Candela GentleMax Pro** (755nm Alexandrite + 1064nm Nd:YAG, DCD
cooling), where a doctor navigates the manual's information and creates optimal
settings within the device's real, cited limits.

**Modules** (each does one clinician job, all manual-grounded):

| Module | What it does | Grounding |
|---|---|---|
| **Settings Builder** | Pick wavelength + spot size + pulse band → real fluence min/max envelope, DCD cooling ranges, hard limits, live in-range validation of the doctor's chosen values. Recommended per-indication doses render **locked** ("see Clinical Treatment Guidelines") — never a fabricated number. This is the honest replacement for the live fabricated `computeGuidance()`. | fluence tables p73, DCD p74-75 |
| **Safety & Contraindications** | Contraindication screen, warnings, eyewear OD, cryogen ventilation, frostbite distances, flash-fire precautions. | p23-33 |
| **Manual Assistant** | Q&A grounded ONLY in the manual with honest page citations — and honest "not in this manual" answers. | full manual |
| **Manual Explorer** | Navigate the real 182-pg manual (existing PDF viewer + TOC/index + jump-to-page from every citation). | full manual |
| **Treatment Planner** *(later)* | Scaffold a multi-session protocol from patient context; device limits + safety auto-filled; recommended doses locked/clinician-entered. | envelope + safety |

Each module ships with its own **suggested questions / quick actions** (e.g.
Settings Builder: "What's the max fluence for a 10mm Alex spot?"; Safety: "Show
contraindications").

**Deferred (not this pass, per Chris 2026-07-16):** Planning/Sales **modes** and
the **Capability & Positioning (Sales)** module. The surface is a single
clinician workspace for now; the mode switch + sales lens come later.

---

## P0 — Verify corpus & mine real parameters  ✓ DONE (2026-07-16) · covers R1

**Goal:** know which PDFs are real; extract the real, page-cited parameter data.

- ✓ Text-extracted + inspected all 14 PDFs → verdict: only GentleMax Pro is a
  genuine manual (`phases/00-verify-corpus/CORPUS_VERDICT.md`).
- ✓ Mined the GentleMax Pro manual into a page-cited dataset
  (`data/gentlemax-pro-manual-extract.json`): real fluence tables, DCD ranges,
  spot sizes, limits, contraindications, warnings, guided-mode inputs, and an
  explicit `gaps` list of what the manual does NOT specify (→ locked fields).

**Exit:** ✓ verdict + grounded dataset exist; device chosen; PDF host still TBD
(single 14 MB PDF — `public/` is now viable; gl-media optional. Decide in P1.)

---

## P1 — Grounding foundation + device-pack model  ☐ · covers R2, R7-primitives

**Goal:** the app reads GentleMax Pro from a typed device pack built from the
mined dataset; the hardcoded-JOULE scaffolding is retired; source-lock
primitives exist. **This is where the live fabricated-citation defect dies** —
by replacing the JOULE surface, not patching it.

- Turn `data/gentlemax-pro-manual-extract.json` into a typed device pack in the
  app (`lib/lpoa/devices/gentlemax-pro.ts` or a loaded JSON), modeled on the
  Viewer doc §10 (`ControlStatus` = locked/available/review_required, `Citation`).
- Every value in the pack carries `{ value, page, sourceQuote }`; every
  recommended-dose field carries `status: "locked"` + a reason string.
- Retire the 4 hardcoded JOULE env-var/fallback refs + global PDF cache; the app
  targets the GentleMax Pro manual PDF (host decision: `public/` vs gl-media).
- Load the real PDF into the viewer; confirm the manual renders + is navigable.

**Exit:** app shows Candela GentleMax Pro, loads the real manual, and reads all
device data from the pack; no hardcoded JOULE values or fabricated citations remain.
**Verify:** grep shows no `NEXT_PUBLIC_PDF_*` JOULE fallbacks in use; the viewer
opens the real 182-pg manual; a pack value traces to its manual page.

---

## P2 — App shell: modes + module nav + branding  ☐ · covers R3, R9

**Goal:** first visible prototype — the workspace shell that hosts modules, with
the Planning/Sales mode switch and Candela GentleMax Pro branding.

- Module navigation (sidebar/tabs) listing the 5 modules.
- **Mode switch** (Planning ⇄ Sales): changes which modules are foregrounded and
  the framing/labels; same underlying grounded data.
- Per-device branding in the header/sidebar (Candela GentleMax Pro, dual-wavelength).
- Empty module panels wired to the pack (real device header data visible).

**Exit:** operator opens `/dashboard/lpoa`, sees the GentleMax Pro workspace, can
switch Planning/Sales, and navigate between (stub) modules.
**Verify:** mode toggle changes the surface; branding reads Candela GentleMax Pro.

---

## P3 — Core Planning modules  ☐ · covers R4, R5, R6-envelope

**Goal:** the three always-on clinical modules, fully grounded, with suggested
questions.

- **Envelope Explorer**: wavelength × spot × pulse-band selectors → real fluence
  min/max (p73) rendered on the existing gauge/thermobar UI; DCD ranges (p74-75);
  hard limits + the pulse-width spec inconsistency surfaced honestly. Recommended
  per-indication dose fields render **locked** with the "see Treatment Guidelines"
  reason — the honest core.
- **Safety & Contraindications**: contraindications (p23), warnings, eyewear OD,
  cryogen ventilation, frostbite distances, flash-fire — all cited.
- **Manual Assistant**: generalize `buildSystemPrompt` for GentleMax Pro vocabulary;
  keyword-extraction grounding over the real manual; honest citations; answers
  "not specified in this manual" when true. Per-module suggested questions.

**Exit:** all three modules work on real, cited data; nothing fabricated.
**Verify:** every displayed number links to a manual page; ask the assistant a
question the manual doesn't answer → it declines honestly instead of inventing.

---

## P4 — Treatment Planner + patient context  ☐ · covers R6-planner, R8

**Goal:** the Planning-mode protocol builder, prefilled from patient context.

- Multi-step planner scaffold (indication → wavelength → spot/area → cooling →
  sessions/interval). Device limits + safety auto-populate from the pack;
  recommended doses are **locked or clinician-entered** (no invented doses).
- Patient context → prefill (Fitzpatrick, concerns) where derivable; editable.
- Output: a structured, printable/exportable plan that cites the manual for every
  device fact and clearly marks clinician-judgment fields.

**Exit:** with a demo patient loaded, the planner prefills and produces a
source-honest treatment-plan scaffold.
**Verify:** planner shows real device limits per selection; recommended-dose
fields are locked/blank, never fabricated; no PHI in fixtures (synthetic only).

---

## P5 — Sales mode + source-lock hardening  ☐ · covers R6-sales, R7 (safety-critical)

**Goal:** the Sales-mode module, plus a whole-surface honesty audit.

- **Capability & Positioning** module: dual-wavelength value, spot-size range,
  DCD cooling, energy specs, indication breadth — real spec facts (p20,72,154),
  buyer-framed, **zero clinical dose claims**.
- **Source-lock hardening pass** (the safety-critical requirement): audit every
  module — no value renders without a page citation; every manual-silent field
  renders locked with an honest reason; confidence reflects source support, not
  form completion. This is the direct correction of the old JOULE defect,
  applied surface-wide.

**Exit:** Sales mode is compelling and honest; a full audit confirms no
fabricated value anywhere in the tool.
**Verify:** scripted pass over all modules — each shown number has a citation;
each locked field has a reason; grep finds no hardcoded/uncited clinical numbers.

**Note — clinician review:** because this tool **does not recommend clinical
doses** (it shows the manufacturer's real device limits + safety, and defers
recommended settings to locked "see Clinical Treatment Guidelines" states), it
can ship without clinician sign-off. A clinician reviewer is required only
if/when a future phase adds an actual dose-recommendation engine. This resolves
the old P3 clinician blocker for v1.0.

---

## P6 — Verify & deploy  ☐

**Goal:** prove it end-to-end and ship.

- 10-min smoke checklist: both modes, all 5 modules, real manual loads,
  assistant grounds + declines honestly, locked fields behave.
- Merge `feat/lpoa-multi-device` → `main`; deploy `a360-v2-wse` via CLI
  (`vercel --prod`, preview → prod; verify `.vercel/project.json`).
- Update `_DEPLOY_SOURCE` / JOURNAL / hub STATE; register milestone outcome.

**Exit:** live at the wse URL; GentleMax Pro deep tool, both modes, smoke-tested
against real behavior.
**Verify:** exercise the deployed URL in both modes incl. Envelope Explorer +
Assistant; confirm no fabricated values on the live surface.

---

## Sequencing notes

- **P0 gates everything** (done — grounding exists).
- **P1 gates P2-P5** (device pack + real data must exist before modules).
- **P2 gates P3-P5** (shell hosts the modules).
- **P3, P4, P5 modules are largely independent given P1+P2** and can overlap.
- **P5's hardening pass is the safety-critical gate before P6 ships.**

## Deferred (future milestones)

- Re-sourcing real operator manuals for additional devices → restore multi-device.
- A dose-recommendation engine (would require clinician sign-off + Candela
  Clinical Treatment Guidelines P/N 8502-00-0907, not in corpus).
- Vector RAG (decided against 2026-07-13 — keyword extraction + Haiku stays).

---
*Last updated: 2026-07-16 — pivoted to single-device deep tool after corpus verification.*
