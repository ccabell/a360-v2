# LPOA Multi-Device — Roadmap

Milestone **v1.0 Multi-Device**. Phases are sequential except where noted.
Requirement IDs (R1–R9) are defined in REQUIREMENTS.md and mapped per phase.

Legend: ☐ not started · ◐ in progress · ✓ done

---

## P0 — Verify the PDF corpus  ☐  · covers R1

**Goal:** the in-scope manuals are actually usable grounding text before anything reads them.

- Open/spot-check each in-scope manual (content correct, pages continuous, no scrape cruft).
- Flag the two non-manuals (Lumenis SPLENDOR X = brochure, BTL EMFACE = reference) — decide keep-as-weak-source or defer.
- Reconcile the device→PDF→manufacturer mapping (folder-name inconsistencies: `Cynosure_Lutronic`, `Deka_Laser`, etc.).
- Decide PDF hosting: `public/` vs. GL `gl-media` public URLs (recommend gl-media to keep the repo lean).

**Exit:** a verified manifest of in-scope devices with a trusted PDF URL + page-count for each.
**Verify:** open 3 random pages per manual; confirm they match the device and are readable.

---

## P1 — Device catalog (strangler refactor)  ☐  · covers R2

**Goal:** introduce a device-catalog abstraction and move Joule into it as device #1 with **zero behavior change**.

- Define the per-device schema (one object): `{ id, manufacturer, model, manuals[], prompt, suggestedQuestions[], faqs[], simulator?, branding }`.
- Create the catalog module + an "active device" resolver (URL param / picker state).
- Seed the catalog with **Joule only**, sourced from today's hardcoded values.
- Refactor the 3 env-var/fallback PDF refs (×4 files) + the global URL cache in `pdfSearch.ts` to read from the active device's manual.

**Exit:** app behaves identically to today, but Joule now flows through the catalog.
**Verify:** `/dashboard/lpoa` renders + answers exactly as before; no visual/behavioral diff for Joule.

---

## P2 — Per-device surfaces, all devices  ☐  · covers R3, R4, R5, R9

**Goal:** every catalogued device is selectable and gets a grounded assistant, its manual(s), questions/FAQs, and branding. (No parameter simulator yet — P3.)

- Device/manual **picker** UI; support **1..N manuals** per device (per-manual load + cache key).
- Per-device **assistant prompt** (generalize `buildSystemPrompt` to take device vocabulary/context).
- Per-device **suggested questions** + **FAQ** arrays (author from each manual; move off the hardcoded Joule arrays).
- Per-device **branding** in `PDFSidebar`.
- Populate the catalog for all 13 devices (manual URL, prompt, questions, FAQ).

**Exit:** operator can pick any of the 13 devices and get a manual-grounded assistant + questions.
**Verify:** for 3+ devices, ask a device-specific question and confirm the answer cites *that* device's manual.

---

## P3 — Per-device parameter simulator (starter subset)  ☐  · covers R6, R7, R8

**Goal:** generalize the simulator to per-device config and ship it for a starter subset, with the two missing safety/UX capabilities.

- Refactor `SettingsPanel` so `STEPS`/`OPTIONS`/`computeGuidance`/caps/citations come from a per-device **simulator config** (keep the reusable gauge/thermobar/citation UI).
- Author simulator configs for the **2–3 priority devices** (drafted from verified manuals → **clinical review** before ship).
- Build **"locked until source-supported"** (R7): parameters stay locked/flagged unless backed by a manual citation — net-new (no lock exists today).
- Wire **patient context → simulator prefill** (R8): pass patient (Fitzpatrick/concerns) into `SettingsPanel` (today it's re-entered manually).

**Exit:** starter-subset devices show a device-correct, source-locked parameter screen prefilled from patient context.
**Verify:** for each subset device, a clinician-reviewed run produces manual-cited parameters; unsupported fields render locked.

**Open item:** pick the 2–3 priority devices at P3 planning (Joule done; likely the most demo-worthy — e.g. Morpheus8, GentleMax Pro).

---

## P4 — Verify & deploy  ☐

**Goal:** prove it end-to-end and ship.

- Smoke-test each device: picker → manual loads → assistant grounds → (subset) simulator.
- Merge `feat/lpoa-multi-device` → `main`; deploy to `a360-v2-wse` via CLI (preview → prod).
- Update `_DEPLOY_SOURCE`/JOURNAL; register the milestone outcome.

**Exit:** live at the wse URL, multi-device, smoke-tested.
**Verify:** exercise the deployed URL for 2+ devices incl. one with a simulator.

---

## Sequencing notes

- **P0 gates P2/P3** (grounding + rules need verified text).
- **P1 gates everything** (no per-device work until the catalog exists).
- **P2 and P3 are independent given P1** — P2 covers all devices; P3 deepens a subset. Could overlap once P1 lands.

---
*Last updated: 2026-07-13 — milestone kickoff.*
