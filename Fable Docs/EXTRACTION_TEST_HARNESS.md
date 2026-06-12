# Extraction v3.3 Test Harness — Run + LLM-as-Judge

Two halves, two operators. **Claude Code** runs the extractions (it has Prompt Runner, the DB, the corpus). **Fable (this chat)** judges the outputs against the v3.3 spec. This file is what you paste to Claude Code; the rubric Fable judges by is at the bottom so both halves are locked before the run.

DB: `aejskvmpembryunnbgrk`. Prompts: PASS1/PASS2 v3.3 + the CHANGES doc. Catalog snapshot: §A (real, pulled live).

---

## A. Catalog snapshot (real offerings — use THIS as Segment B catalog)

Products (33): Botox Cosmetic (onabotulinumtoxinA) · Dysport (abobotulinumtoxinA) · Daxxify (daxibotulinumtoxinA) · Jeuveau (prabotulinumtoxinA) · Xeomin (incobotulinumtoxinA) · Juvederm Ultra XC / Ultra Plus XC / Volbella XC / Vollure XC / Voluma XC / Volux XC (HA) · Restylane / Contour / Lyft (HA) · RHA Redensity (HA) · SKINVIVE (modified HA) · Sculptra Aesthetic (PLLA) · Kybella (deoxycholic acid) · Morpheus8 · Votiva · Sofwave · Ultherapy PRIME · CoolSculpting Elite · Emsculpt Neo · UltraShape Power · LightSheer · Hollywood Spectra · JOULE · HydraFacial · Compounded Semaglutide · Compounded Tirzepatide · Wegovy/Ozempic (semaglutide) · Mounjaro/Zepbound (tirzepatide).

Services (14): BBL HERO · Forever Clear BBL · Forever Young BBL · Halo Hybrid Fractional Laser · Hollywood Spectra Laser Facial · Laser Hair Removal · Morpheus8 Face / Body · ProFractional Laser Resurfacing · SkinTyte · Ultherapy PRIME Lift · UltraShape Power · Votiva/Morpheus8V · Emsculpt Neo.

Pull the live version yourself before the run (offering ids + practice scoping) — Fable's snapshot is for cross-checking catalog_match, not the source of truth. Build Segment B catalog from the DB with offering_id, kind, display name, generic, aliases.

---

## B. The run (Claude Code)

### B0. Prerequisites
1. Confirm PASS1 v3.3 and PASS2 v3.3 are in Prompt Runner. **They aren't currently** (Chris checked the library). Load them from the Fable Docs MD files, version-tagged `extraction_version: "3.3"`. If a v3.2 exists, keep it — we shadow-compare.
2. Build Segment B from the live catalog (§A) via one shared template fn so Pass 1 / Pass 2 are byte-identical (the cache requirement from the CHANGES doc §1).
3. Confirm the 20 beta-test patient records exist and have transcripts. If transcripts are missing, that's a blocker — report which patients.

### B1. Run structure (per patient, ×20)
```
for each beta patient:
  transcript = patient's consult transcript
  segB = render_segment_B(transcript, live_catalog)        # cached prefix
  p1 = run_prompt_runner("extraction_pass_1_v3.3", segA, segB, segC_pass1)
  validate(p1)   # schema, quote-anchoring, cross-field — CHANGES doc §8
  p2 = run_prompt_runner("extraction_pass_2_v3.3", segA, segB, segC_pass2_with_p1)
  validate(p2)
  save: patient record + a JSON artifact (see B3)
```
Temperature 0, force JSON (prefill `{`), max_tokens ~8K. One targeted retry on validation failure (append violation list); second failure → flag, save anyway with `validation_status: flagged`.

### B2. Validation (run in code, not by eye — CHANGES doc §8)
- Schema validation vs the v3.3 JSON Schema (strict enums).
- Quote-anchoring: every evidence quote must be an exact contiguous substring of the transcript (normalized-whitespace fallback). Record `char_start/char_end`. A quote that won't anchor = the model edited it = violation.
- Cross-field: stated_interests ⊆ offerings · primary ∉ secondary · urgency null when timing null · Pass1-disposition ⇒ Pass2-outcome forcing · tag⇄event entailments · single-home rule. Log violation rate per rule.

### B3. Save outputs (two places)
1. **Patient record** in `aejskvmpembryunnbgrk` so Chris sees it in the beta-test UI. Store: `extraction_pass_1` (jsonb), `extraction_pass_2` (jsonb), `extraction_version='3.3'`, `validation_status`, `validated_at`. If there's no column for this yet, add one additively (e.g. an `extractions` table keyed by patient_id, or jsonb columns on the beta patient row) — additive only, via apply_migration, report the choice.
2. **JSON artifact per patient** written to a folder (e.g. `./extraction_run_v3.3/{patient_id}.json`) containing: `{patient_id, transcript, segment_b_catalog_hash, pass1, pass2, validation_report, prompt_versions, model, timestamp}`. **This bundle is what you hand to Fable to judge.** One combined `run_manifest.json` lists all 20 with their validation_status.

### B4. Shadow comparison (if v3.2 extractions exist)
For any patient with a prior v3.2 extraction on record, include it in that patient's JSON bundle as `pass1_v32`/`pass2_v32` so Fable can diff v3.3 vs v3.2 (disposition distribution, false-positive interests, commitment shifts — the deltas the CHANGES doc §9 predicts).

### B5. Hand off
Post the 20 JSON bundles + run_manifest.json to Chris. Chris gives them to Fable for judging. Do NOT mark anything production-approved — this is a test run; `validation_status` is the only status that matters here.

---

## C. THE JUDGING RUBRIC (Fable scores each extraction against this)

Fable receives the JSON bundles and scores every patient on these axes, 1–5 each, with the specific evidence for each deduction. This is locked so the judge can't move the goalposts.

### C1. Per-field accuracy (the core)
- **Offerings + dispositions** — is every offering the patient/provider actually discussed captured, with the correct disposition per the precedence ladder (final-state-wins)? Penalize misses AND false positives.
- **Catalog matching** — does each offering map to a real catalog id from §A? Is category fallback (e.g. spoken "Dysport" when planning maps to neurotoxin class) flagged and NOT renaming the product in patient-facing fields?
- **Objections / hesitations / concerns** — correct single-home placement (no utterance in two lists)? `resolved` only true when the patient acknowledged, not provider monologue?
- **Outcome + commitment** (Pass 2) — correct rung on the precedence ladder for mixed visits? commitment not inflated by politeness?
- **New v3.3 captures** — `price_discussed` verbatim-only (not computed)? `prior_treatments` not misfiled as interests? `provider_deferred` used where the provider declined? tags (`contraindication_mentioned`, `competitor_mention`, `referral_discussed`) correct?

### C2. Evidence Contract compliance (the highest-leverage check)
- Every fact carries evidence; quotes are exact contiguous substrings (Claude Code already anchored — Fable re-checks a sample against the transcript in the bundle); ≤3 per field, ≤40 words; `speaker_id` present and plausible; `[REDACTED]` only for PII.
- **An extraction that asserts a fact with no anchorable evidence is the worst failure class** — score it down hard regardless of whether the fact is "right."

### C3. Anti-hallucination / traps (the false-positive killers)
Did it avoid: third-party mentions ("my sister got filler") as patient interest · negations ("I don't want filler") as interest · provider education about non-recommended options as discussed offerings · past treatments as current interest · politeness as engagement · humor read as fear? Each trap fallen into = a flagged deduction with the quote.

### C4. Calibration
Do high-confidence (≥0.9) fields actually verify against the transcript? Is confidence defined as value-correctness (not audio quality)? Flag any 0.9+ field that's wrong — that's a calibration failure worse than a low-confidence miss.

### C5. Shadow delta (where v3.2 exists)
Direction-of-change check vs the CHANGES doc §9 predictions: fewer false-positive interests, more offerings captured (price/deferred), commitment shifts where v3.2 over-credited politeness. A v3.3 that's WORSE than v3.2 on these is a regression to surface.

### Fable's output per patient
`{patient_id, scores:{C1..C5 with 1–5 + reasons}, worst_failure, best_win, anchorable:true/false, regression_vs_v32:none/some/major, verdict: ship|revise|investigate}` plus a **run-level summary**: aggregate scores, the most common failure mode across all 20, per-rule violation rates from B2, and a go/no-go on promoting v3.3 past v3.2.

---

## D. What Fable needs in the bundle to judge well
Per patient: the transcript (full), pass1 + pass2 JSON, the validation_report (anchor results + cross-field violations), prompt versions + model, and v3.2 outputs if they exist. Without the transcript Fable can't verify anchoring or traps — it's the one non-negotiable field.
