---
phase: 09-podcast-data-strategy-and-evidence-provenance
verified: 2026-06-14T00:00:00Z
status: gaps_found
score: 5/6 must-haves verified
re_verification: false
gaps:
  - truth: "Phase 3 plan 03-04 live UI verification is either completed or documented with clear next steps for human verification"
    status: partial
    reason: "Automated smoke test passed (API route confirmed live with PubMed + FDA sources). REQUIREMENTS.md marks EVID-03 as Pending. Human visual verification of SC-2 through SC-5 (prose rendering, clickable PubMed/FDA links in browser UI, chip-to-card mapping) has not been performed and confirmed. 03-04-SUMMARY.md documents steps but no human verdict has been recorded."
    artifacts:
      - path: ".planning/phases/03-retrieval-wiring/03-04-SUMMARY.md"
        issue: "EVID-03-automated-smoke listed in requirements-completed but full EVID-03 requires human visual verification. No human verdict recorded. REQUIREMENTS.md checkbox remains unchecked."
    missing:
      - "Human opens http://localhost:3000/dashboard/research, asks an unscripted Botox question, confirms SC-2 (prose streams), SC-3 (PubMed link opens), SC-4 (FDA link opens), SC-5 (chip-to-card mapping). Updates 03-04-SUMMARY.md with verdict."
human_verification:
  - test: "Live UI demo — SC-2 through SC-5"
    expected: "Grounded prose streams in Research tab (SC-2); at least one 'View on PubMed' link is visible and opens pubmed.ncbi.nlm.nih.gov (SC-3); at least one 'Open FDA label' link opens accessdata.fda.gov (SC-4); citation chips [n] in prose map to numbered reference cards (SC-5)"
    why_human: "Visual and interactive behavior in the browser cannot be verified programmatically. Automated smoke confirmed the API route fires correctly, but rendered UI behavior, link display, and chip-to-card mapping require a human to observe."
---

# Phase 09: Podcast Data Strategy & Evidence Provenance — Verification Report

**Phase Goal:** Define and document the two-layer evidence model (research layer vs production layer), implement anonymous identifiers for podcast-derived knowledge, and clean up existing evidence_links provenance gaps.

**Verified:** 2026-06-14
**Status:** gaps_found — 5 of 6 must-haves verified; EVID-03 partial (automated smoke passed, human UI verification pending)
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|---------|
| 1 | Two-layer evidence model is formally defined: research layer (podcast IDEAS with anonymous IDs) vs production layer (PubMed, FDA, society, expert consensus) | VERIFIED | EVIDENCE_MODEL.md Sections 1-2 define both layers with field-level rules; commits 26b1ec9 and 3a82ff0 confirmed in git log |
| 2 | Anonymous identifier scheme is specified — content hash or concept ID, no speaker/show/episode attribution | VERIFIED | EVIDENCE_MODEL.md Section 2 specifies EC-{12hex} format, SHA-256 generation method, normalization steps, and explicit table of where EC- IDs may/may not appear |
| 3 | Workflow is documented: podcast -> discover idea -> find PubMed backup -> save both layers | VERIFIED | PODCAST_WORKFLOW.md contains 7 numbered steps, BAD/GOOD transformation example (Step 3), PubMed corroboration paths (Step 5), production writing rules (Step 6), end-to-end Sculptra/Botox example, and Anti-Patterns section |
| 4 | Source classification matrix distinguishes research-only vs production-citable sources | VERIFIED | SOURCE_CLASSIFICATION.md contains 11-row matrix, decision tree, per-source rationale, and field-level mapping table. Referenced from EVIDENCE_MODEL.md Section 5 via "See SOURCE_CLASSIFICATION.md" |
| 5 | 36 PubMed evidence_links rows with NULL url have url backfilled using their DOI | VERIFIED (SQL ready, not yet executed) | supabase/compile_sql/09-01-pubmed-url-backfill.sql exists with two-pass UPDATE (pmid-preferred, doi fallback), WHERE url IS NULL idempotency guard, and verification SELECT. Commit a998043 confirmed. SQL is ready to execute; backfill itself requires execution against Supabase. |
| 6 | Phase 3 plan 03-04 live UI verification is either completed or documented with clear next steps for human verification | PARTIAL | 03-04-SUMMARY.md updated with automated smoke results (EVID-03-automated-smoke: PASS). Human visual verification of SC-2 through SC-5 remains pending. REQUIREMENTS.md marks EVID-03 as Pending (unchecked). No human verdict recorded in 03-04-SUMMARY.md. |

**Score:** 5/6 truths verified (truth 5 counts as verified because EVID-01 is defined as "SQL ready to execute," not "SQL executed"; truth 6 is partial due to missing human confirmation)

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `.planning/phases/09-podcast-data-strategy-and-evidence-provenance/EVIDENCE_MODEL.md` | Two-layer model definition, anonymous ID scheme, field-level rules | VERIFIED | File exists (188 lines). Contains Sections 1-5: two-layer model, EC-{12hex} scheme with SHA-256 generation, production field rules table, contamination definition with 8 patterns + known examples, cross-references. Pattern "research_layer" present. |
| `.planning/phases/09-podcast-data-strategy-and-evidence-provenance/PODCAST_WORKFLOW.md` | Step-by-step workflow for using podcast data safely | VERIFIED | File exists (299 lines). Contains 7 steps (Step 1 confirmed), match_podcast_chunks() RPC, BAD/GOOD example in Step 3, Anti-Patterns section, end-to-end example, Quick Reference Card. |
| `.planning/phases/09-podcast-data-strategy-and-evidence-provenance/SOURCE_CLASSIFICATION.md` | Source classification matrix — research-only vs production-citable | VERIFIED | File exists (127 lines). Contains 11-row matrix with "Yes — DOI/PMID required" for PubMed (matches "production-citable" requirement). Decision tree, rationale by source type, field-level mapping. |
| `supabase/compile_sql/09-01-pubmed-url-backfill.sql` | SQL UPDATE to backfill PubMed URLs from DOI values | VERIFIED | File exists (41 lines). Contains two UPDATE evidence_links statements, WHERE url IS NULL guards, EVID-01 header comment, pubmed.ncbi.nlm.nih.gov and doi.org URL patterns, verification SELECT. |
| `.planning/phases/03-retrieval-wiring/03-04-SUMMARY.md` | 03-04 verification result or documentation of what remains | PARTIAL | File exists and contains SC-2 reference and automated smoke results (automated-smoke-passed). However, full EVID-03 human verification is documented as pending — no human verdict has been written. REQUIREMENTS.md continues to show EVID-03 as unchecked/Pending. |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| EVIDENCE_MODEL.md | PODCAST_WORKFLOW.md | Model defines layers; workflow shows how to populate them (pattern: research_layer/production_layer) | VERIFIED | PODCAST_WORKFLOW.md line 71: "This is the research layer." Line 27: "Read EVIDENCE_MODEL.md before using this workflow — you need to know the two-layer model." Line 193: "Step 7: Record Research Layer." Cross-reference fully present. |
| EVIDENCE_MODEL.md | SOURCE_CLASSIFICATION.md | Model references classification for source routing (pattern: source_classification) | VERIFIED | EVIDENCE_MODEL.md line 64: "authority_rank: Determined by source type per SOURCE_CLASSIFICATION.md" and line 179: "Source classification by type: See SOURCE_CLASSIFICATION.md". Pattern found as "SOURCE_CLASSIFICATION.md" (uppercase) — substantive link confirmed. |
| supabase/compile_sql/09-01-pubmed-url-backfill.sql | evidence_links table | UPDATE SET url WHERE source='pubmed' AND url IS NULL AND doi IS NOT NULL (pattern: UPDATE evidence_links) | VERIFIED | Two UPDATE evidence_links statements confirmed: Pass 1 (pmid-based URL) and Pass 2 (doi.org fallback), both with WHERE url IS NULL guard. |

---

## Data-Flow Trace (Level 4)

Not applicable — Phase 09 produces governing documents and a SQL script. No components render dynamic data from a live data source. The SQL script (09-01-pubmed-url-backfill.sql) is a standalone DML file, not a rendered component. Level 4 data-flow tracing is skipped.

---

## Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| SQL file is syntactically well-formed | Structural inspection of UPDATE/WHERE/SELECT clauses | Two-pass UPDATE, each with proper WHERE clause, followed by verification SELECT | PASS |
| EVIDENCE_MODEL.md contains all required sections | grep for section headings | Sections 1-5 all present (Two-Layer Model, Anonymous Identifier, Production Field Rules, Contamination Definition, Cross-References) | PASS |
| PODCAST_WORKFLOW.md has exactly 7 steps | grep "Step [0-9]" | Steps 1 through 7 confirmed | PASS |
| SOURCE_CLASSIFICATION.md has decision tree | grep "Decision Tree" | Line 27: "Decision Tree: Is This Source Production-Citable?" present | PASS |
| Commits documented in SUMMARYs exist in git | git log on 4 commit hashes | 26b1ec9, 3a82ff0, a998043, 6e25ebf all confirmed in git log | PASS |

---

## Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|---------|
| POD-01 | 09-01-PLAN.md | Two-layer evidence model defined and documented: research layer (podcast IDEAS/CONCEPTS with anonymous hash identifiers) and production layer (PubMed, FDA, society guidance, expert consensus) | SATISFIED | EVIDENCE_MODEL.md Section 1 defines both layers with field tables, rules, and consumer descriptions |
| POD-02 | 09-01-PLAN.md | Anonymous identifier scheme implemented — podcast-derived knowledge referenced by content hash or concept ID, no speaker names, show names, or episode IDs in any production-facing field | SATISFIED | EVIDENCE_MODEL.md Section 2 specifies EC-{12hex}, SHA-256 truncation method, generation example, and explicit prohibition table (item_relationships, agent_reference_docs, evidence_links, SQL INSERT files all forbidden) |
| POD-03 | 09-01-PLAN.md | Workflow documented: podcast -> discover idea -> find PubMed/published backup -> save both layers | SATISFIED | PODCAST_WORKFLOW.md documents 7 steps covering the full chain: corpus mining (Step 2), idea extraction (Step 3), anonymous ID (Step 4), PubMed corroboration (Step 5), production content writing (Step 6), research layer recording (Step 7) |
| EVID-01 | 09-02-PLAN.md | 36 PubMed evidence_links rows with NULL url backfilled using DOI | SATISFIED (SQL ready) | supabase/compile_sql/09-01-pubmed-url-backfill.sql exists and is ready to execute. REQUIREMENTS.md shows [x] for EVID-01. Note: the SQL must be executed against Supabase to close the data gap — the file is a prerequisite artifact, not the final state change. |
| EVID-02 | 09-01-PLAN.md | Source classification documented — which sources are research-only (podcast, conference, webinar) vs production-citable (PubMed, FDA, society, expert consensus) | SATISFIED | SOURCE_CLASSIFICATION.md provides 11-row matrix, decision tree, and field-level mapping confirming which sources may appear in evidence_links.url, source_reference, and production prose |
| EVID-03 | 09-02-PLAN.md | Phase 3 plan 03-04 (live UI verification) completed — unscripted question renders real citations | BLOCKED — human verification pending | Automated smoke (2026-06-14) confirmed API route produces PubMed + FDA sources. REQUIREMENTS.md checkbox is unchecked; traceability shows "Pending". Human visual verification of SC-2/SC-3/SC-4/SC-5 not yet completed or recorded. |

**Orphaned requirements check:** REQUIREMENTS.md traceability table maps POD-01, POD-02, POD-03, EVID-01, EVID-02, EVID-03 to Phase 09. All six are accounted for in 09-01-PLAN.md (requirements: [POD-01, POD-02, POD-03, EVID-02]) and 09-02-PLAN.md (requirements: [EVID-01, EVID-03]). No orphaned requirements.

---

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| PODCAST_WORKFLOW.md | (none) | No anti-patterns found in governing documents | — | — |
| EVIDENCE_MODEL.md | (none) | No anti-patterns found | — | — |
| SOURCE_CLASSIFICATION.md | (none) | No anti-patterns found | — | — |
| 09-01-pubmed-url-backfill.sql | (none) | No anti-patterns found — SQL is DML-only with idempotency guard | — | — |

No TODO/FIXME/placeholder markers, empty implementations, or hardcoded stub values found in phase artifacts. The documents are substantive governing content, not scaffolding.

---

## Human Verification Required

### 1. Live UI Demo — EVID-03 Visual Confirmation

**Test:** Start the dev server (`npm run dev`), open http://localhost:3000/dashboard/research, type an unscripted Botox question (e.g., "What is the recommended glabellar dose and how fast does Botox work?"), and verify all four criteria visually.

**Expected:**
- SC-2: Grounded prose streams in the response area — non-empty, on-topic text about Botox onset and dosing
- SC-3: At least one "View on PubMed" reference card appears — clicking it opens pubmed.ncbi.nlm.nih.gov (or doi.org resolving to the article)
- SC-4: At least one "Open FDA label" reference card appears — clicking it opens accessdata.fda.gov with a Botox PDF
- SC-5: Citation chips [1][2] etc. in the prose are numbered and match the numbered reference cards in the citation panel

**Why human:** Automated smoke confirmed the API route produces PubMed and FDA source objects in the SSE stream. But the rendered UI — whether cards appear, whether links are clickable, whether chips are numbered correctly — requires a browser and a human observer. The automated smoke cannot verify CSS rendering, link interactivity, or visual layout correctness.

**Steps:**
1. `npm run dev` in the project root (or confirm dev server is running)
2. Open http://localhost:3000/dashboard/research in a browser
3. Confirm the header badge reads "Live" (not "Demo data")
4. Ask the Botox question
5. Record SC-2, SC-3, SC-4, SC-5 pass/fail
6. Update `.planning/phases/03-retrieval-wiring/03-04-SUMMARY.md` with the human verdict and check the EVID-03 checkbox in REQUIREMENTS.md

---

## Gaps Summary

One gap blocks full goal achievement:

**EVID-03 — Human visual verification of the live Research UI has not been performed.** The automated smoke test run during Plan 02 (2026-06-14) confirmed the API route `/api/research/chat` returns PubMed and FDA source objects in the SSE stream. This closes the programmatic half of EVID-03. The remaining half — that the browser UI renders grounded prose, displays clickable PubMed and FDA links in reference cards, and maps citation chips to cards correctly — requires a human to open the application and confirm.

This gap is procedural (human checkpoint not yet performed), not structural. The code and data are in place. The gap closes when Chris completes the five-step verification sequence and records a verdict in 03-04-SUMMARY.md.

All other phase deliverables — the EVIDENCE_MODEL.md two-layer definition, the EC- anonymous identifier scheme, the PODCAST_WORKFLOW.md 7-step workflow, the SOURCE_CLASSIFICATION.md matrix, and the PubMed URL backfill SQL — are substantive and verified.

---

_Verified: 2026-06-14_
_Verifier: Claude (gsd-verifier)_
