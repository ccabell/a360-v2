# LPOA Multi-Device — Requirements

Milestone **v1.0 Multi-Device**. Requirement IDs are referenced by ROADMAP.md
phases. Each requirement gives: **Statement**, **Current state** (file:line
ground truth), **Target**, **Acceptance criteria** (testable), **References**,
**Notes**.

Ground-truth code read directly 2026-07-13/14 in the `feat/lpoa-multi-device`
worktree. Reference docs in `.planning-lpoa/reference/`.

---

## Key design reconciliations (read first)

**A. Per-device config = a "device pack".** The Viewer doc §10 + §21.3 already
specify this shape (control schema, `ControlStatus`, confidence levels, device
packs). We adopt it as the catalog record. Each device is one data object; the
components become renderers of the active device's pack.

**B. The live simulator violates the product safety model — this milestone fixes
it, not just extends it.** `SettingsPanel.computeGuidance()` today:
- fabricates citation page numbers (`§3.2 p16`… `SettingsPanel.tsx:226-298`) not
  tied to the real manual;
- reports a **fake confidence** = `filled/STEPS.length*100` (`:237-238`), shown
  as an evidence badge (`:876`);
- has **no lock** — parameters always render, contradicting vision doc + Viewer
  doc §7 ("settings locked unless source-supported").
R6/R7 therefore require *real* manual-cited parameters and a *real* lock/confidence
gate. Joule (the one "done" device) must also have its fabricated citations
replaced with verified ones.

**C. Grounding stays keyword-extraction, not RAG (decided 2026-07-13).** The
assistant path (`useAISearch` → `pdfSearch` client-side extraction → Haiku) is
kept; we make it per-device. Real per-device RAG remains the documented future.

---

## R1 — Verified PDF corpus

**Statement:** every in-scope manual is confirmed usable grounding text before any
code reads it.
**Current state:** 14 PDFs in `C:\Projects\lpoa` (per-manufacturer folders);
`PDF_CLEANUP_VERIFICATION_STATUS.md` marks all "Manually Verified: NO". 2 are
non-manuals (Lumenis SPLENDOR X brochure, BTL EMFACE reference). Folder naming
inconsistent (`Cynosure_Lutronic`, `Deka_Laser`).
**Target:** a trusted manifest mapping each in-scope device → verified PDF (URL +
page count + manufacturer/model), with non-manuals flagged and a hosting decision.
**Acceptance criteria:**
- Each in-scope PDF opened; 3 random pages confirmed to match the device and be
  readable (no scrape cruft/truncation).
- Non-manuals explicitly marked (keep-as-weak-source or defer) — never silently
  treated as an operator manual.
- One manifest file (device id, manufacturer, model, pdf path/URL, page count,
  source-quality: `operator_manual | brochure | reference`, verified: yes).
- PDF host decided: `public/` vs GL `gl-media` public URL (recommend gl-media).
**References:** inventory (this milestone's research), `lpoa\MANIFEST.md`,
`lpoa\CURATION_DASHBOARD.md`.
**Notes:** gates R3/R4 (grounding) and R6 (real citations). Fotona has 0 PDFs — out of scope.

---

## R2 — Device catalog data model (strangler)

**Statement:** a device-catalog abstraction exists; Joule is device #1 with **zero
behavior change**.
**Current state:** no device object anywhere. "Joule" = 3 env vars with hardcoded
fallbacks duplicated across `LPOAViewer.tsx:13`, `useAISearch.ts:135`,
`PDFViewer.tsx:16`, `PDFSidebar.tsx:7-8`; plus hardcoded `SUGGESTED_QUESTIONS`,
`FAQS`, and the `STEPS/OPTIONS/computeGuidance` engine.
**Target:** one typed catalog. Per-device record (device pack):
```
LpoaDevice {
  id; manufacturer; model; branding{ name, subtitle };
  manuals: LpoaManual[];              // 1..N — R3
  assistant: { promptVocabulary, ... };   // R4
  suggestedQuestions: string[];       // R5
  faqs: FAQ[];                        // R5
  simulator?: SimulatorConfig;        // R6 — optional; absent = no sim tab
}
LpoaManual { id; title; version?; url; pageCount; sourceQuality }
```
Modeled on Viewer doc §10 (`ControlPanelState`, `ControlStatus`, `Citation`) + §21.3.
**Acceptance criteria:**
- Catalog module + "active device" resolver (URL param / picker state).
- Joule seeded from today's exact hardcoded values (prompt text, questions, FAQs,
  simulator config) — a faithful transcription, not a rewrite.
- `/dashboard/lpoa` renders and answers **identically** to pre-refactor for Joule
  (visual + behavioral diff = none).
**References:** Viewer doc §10, §21.3; `types/device.ts` (current minimal model).
**Notes:** `simulator` optional so P2 can ship devices without a P3 sim.

---

## R3 — Multi-manual loading + picker

**Statement:** an operator selects a device (and, if >1, a specific manual); the
app loads that manual.
**Current state:** single `PDF_URL` module const (`useAISearch.ts:135`,
`PDFViewer.tsx:16`); `pdfSearch.ts` caches globally by one URL (`cachedChunks`/
`cachedUrl`) — assumes one document.
**Target:** device/manual picker; `1..N` manuals per device; per-manual load +
cache keyed by manual id/URL (no cross-manual cache bleed).
**Acceptance criteria:**
- Picker lists catalog devices; selecting one loads its (default) manual.
- A device with ≥2 manuals lets the user switch manuals; the viewer + assistant
  both retarget to the selected manual.
- Switching devices/manuals does not serve stale chunks from a previous manual
  (cache key includes manual identity).
**References:** `pdfSearch.ts` (global cache), `LPOAViewer.tsx`, `PDFViewer.tsx`.
**Notes:** Cutera (3), Alma (2), InMode (2) exercise the multi-manual path at launch.

---

## R4 — Per-device assistant prompt

**Statement:** the assistant grounds and speaks per the active device.
**Current state:** `buildSystemPrompt(patient, context)` is one hardcoded template
(`useAISearch.ts:27-74`) interpolating only `pdfName` (env) + patient + extracted
context. Device vocabulary (BBL/fluence/cooling) is baked in. API route
`app/api/lpoa-search/route.ts` is device-agnostic (no change needed).
**Target:** prompt built from the active device pack (device name, modality
vocabulary, any device-specific guidance), keeping the citation/`<followups>`
output contract.
**Acceptance criteria:**
- Prompt names the active device and uses its modality vocabulary (e.g. Nd:YAG vs
  BBL vs RF microneedling), not Joule/BBL hardcodes.
- Citation + follow-up parsing (`parseResponse`, `:76-107`) unchanged.
- For 3+ devices, a device-specific question yields an answer citing *that*
  device's manual pages.
**References:** `useAISearch.ts:27-74`; API route (unchanged).
**Notes:** prompt vocabulary is authored per device from its manual (light).

---

## R5 — Per-device suggested questions + FAQs

**Statement:** suggested questions and FAQs reflect the active device.
**Current state:** `SUGGESTED_QUESTIONS` (5 Joule/BBL strings,
`SearchPanel.tsx:17-23`) and `FAQS` (8 Joule-specific items,
`FAQsPanel.tsx:15-94`) are hardcoded module arrays. `IndexPanel` (PDF TOC) is
already per-PDF — no change.
**Target:** both arrays come from the active device pack; components take them as
data.
**Acceptance criteria:**
- Selecting a device shows that device's suggested questions + FAQs.
- FAQ `{question, answer, page, section, tags}` items reference the *device's*
  manual pages (authored from the verified PDF).
- Joule's existing 5 questions + 8 FAQs preserved verbatim in its pack.
**References:** `SearchPanel.tsx:17-23`, `FAQsPanel.tsx:6-94`.
**Notes:** FAQ authoring is per device (moderate); questions are light.

---

## R6 — Per-device parameter simulator (starter subset)

**Statement:** the simulator renders per-device config; authored + clinically
reviewed for a 2–3 device starter subset; parameters carry **real** manual
citations.
**Current state:** `SettingsPanel` = fixed 5-step wizard (`STEPS`/`OPTIONS`
`:18-57`) → `computeGuidance()` (`:103-327`) → gauge dashboard. All Joule/BBL:
Fitzpatrick base tables (`:121-146`), caps `fluenceMax=22/pulseWidthMax=60/
tempMax=30` (`:173-175`), safety text, and **fabricated** citation pages
(`:226-298`). Visual primitives `ArcGauge`/`ThermoBar`/`CitationNav`/
`ReasoningCard` are generic + reusable.
**Target:** `SettingsPanel` reads a per-device `SimulatorConfig` (steps, options,
parameter tables/adjustment rules, caps, per-parameter real citations, safety
rules, reasoning); the gauge UI is kept as the shared renderer.
**Acceptance criteria:**
- `STEPS`/`OPTIONS`/`computeGuidance`/caps/citations move OUT of code into the
  device's `SimulatorConfig`; `SettingsPanel` renders any device's config.
- Simulator config authored for the 2–3 subset devices **drafted from the verified
  manual → clinical sign-off** before ship (no simulator ships un-reviewed).
- Every displayed parameter cites a **real** page in that device's manual
  (verified under R1); no invented page numbers.
- **Joule's fabricated citations replaced with verified pages** as part of the refactor.
- Devices without a `simulator` in their pack simply hide the Settings tab (no crash).
**References:** `SettingsPanel.tsx` (whole); Viewer doc §10 (`ControlPanelState`),
§7 (confidence).
**Notes:** the largest, most safety-sensitive requirement. Subset chosen at P3
planning (Joule done → pick 2–3 most demo-worthy, e.g. Morpheus8, GentleMax Pro).

---

## R7 — Source-support lock + honest confidence

**Statement:** parameters are locked/flagged unless backed by a manual citation,
and the confidence shown is real.
**Current state:** no lock; `confidence` is form-fill % (`:237-238`) shown as an
evidence badge (`:876`). Contradicts vision doc + Viewer doc §7.
**Target:** implement the Viewer doc §7 model over the gauge UI: per-parameter
status (`locked | review_required | available` — the doc's `ControlStatus`) and a
confidence *level* (0–4, doc §7.2) derived from actual source support, not step
count. Locked parameters render locked with the doc's copy; `settingsAllowed`
gates display.
**Acceptance criteria:**
- A parameter with no real citation renders **locked** (doc §15.4 copy), never a number.
- Confidence reflects source support (levels 0–4), not `filled/steps`.
- The 6-point lock rule (doc §7.3) is enforced: device+goal clear, patient
  sufficient, source-supported values exist, no unresolved safety blocker,
  citations present — else locked with the reason.
- Joule, re-authored under R6, shows locked states where its manual lacks a value.
**References:** Viewer doc §7 (§7.1 disclaimer, §7.2 levels, §7.3 lock rule, §7.4
flags), §10 (`ControlStatus`), §15.4 (locked copy); `SettingsPanel.tsx:237-238,876`.
**Notes:** net-new UI behavior; the *model* is fully specified in the doc — reuse it.

---

## R8 — Patient context → simulator prefill

**Statement:** the simulator is prefilled from the loaded patient.
**Current state:** `SettingsPanel` receives only `onJumpToPage`
(`LPOAViewer.tsx:84-86`); Fitzpatrick/area/PIH are re-entered manually. Patient
(`PatientInfo {name,age,sex,concerns[]}`) flows only to `SearchPanel`.
**Target:** pass patient into `SettingsPanel`; prefill matching wizard steps
(e.g. Fitzpatrick, concern→goal) from patient data; user can still override.
**Acceptance criteria:**
- With a patient loaded, entering the simulator prefills the steps derivable from
  patient fields; remaining steps still prompt.
- No patient loaded → current manual-entry behavior unchanged.
- Prefill is editable (not locked to patient values).
**References:** `LPOAViewer.tsx:82-86`, `SettingsPanel.tsx:636-651`,
`useAISearch.ts:6-11` (PatientInfo).
**Notes:** small once R6 makes steps config-driven; patient→step mapping is per-device.

---

## R9 — Per-device branding

**Statement:** the sidebar/header reflect the active device.
**Current state:** `PDFSidebar` brand "LaserGuide Pro / Clinical Reference" +
`NEXT_PUBLIC_PDF_NAME` fallback, hardcoded (`PDFSidebar.tsx:7-8,44-53`).
**Target:** name/subtitle from the active device pack `branding`.
**Acceptance criteria:** switching device updates the sidebar name/subtitle; Joule
keeps its current labels.
**References:** `PDFSidebar.tsx:7-8,44-53`.
**Notes:** trivial once R2 exists.

---

## Open decisions (resolve at phase planning, not blocking commit)

1. **PDF host** (R1): `public/` vs GL `gl-media` URLs — recommend gl-media (repo stays lean; reuses a360-studio approvals).
2. **Starter-subset devices** (R6): which 2–3 — pick at P3 planning.
3. **Non-manual sources** (R1): keep Lumenis brochure / BTL reference as weak sources, or defer those devices to "assistant-only, no simulator."
4. **Picker placement** (R3): header dropdown vs. a landing device-select screen.
5. **Joule citation re-verification** (R6): confirm real Joule manual pages for its existing simulator numbers as part of P1/P3 (fixes fabricated refs).

## Traceability

| Req | Phase | Size | Safety-critical |
|-----|-------|------|-----------------|
| R1  | P0    | M    | ✓ (grounding quality) |
| R2  | P1    | M    | — |
| R3  | P2    | M    | — |
| R4  | P2    | S    | — |
| R5  | P2    | M    | — |
| R6  | P3    | L    | ✓✓ (clinical authoring) |
| R7  | P3    | M    | ✓✓ (lock model) |
| R8  | P3    | S    | — |
| R9  | P2    | XS   | — |

---
*Last updated: 2026-07-14 — deep pass from direct code + reference-doc read.*
