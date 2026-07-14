---
phase: 01-citations
plan: "03"
subsystem: documentation
tags: [pipeline, evidence_links, citations, dossier, verification]

requires:
  - "01-01: PubMed PMID backfill + YouTube timestamp backfill + page_number migration"
  - "01-02: FDA URL backfill for all 29 fda_label evidence_links rows"
provides:
  - "DOSSIER_COMPILE_PIPELINE.md STEP 5 instructs all future dossier compiles to capture pmid, doi, url, page_number on evidence_links inserts"
  - "SQL verification queries confirming citation data state across all three source types"
affects:
  - Phase 2 (dossier-batch) — pipeline doc update prevents citation locator gaps in future compiles
  - Phase 3 (retrieval-wiring) — evidence_links citation data is confirmed ready for UI wiring

tech-stack:
  added: []
  patterns:
    - "CITATION LOCATOR CAPTURE instruction block in compile pipeline prompt (D-12)"

key-files:
  created: []
  modified:
    - "Fable Docs/DOSSIER_COMPILE_PIPELINE.md"

key-decisions:
  - "D-12 implemented: CITATION LOCATOR CAPTURE paragraph added to STEP 5 immediately after evidence_links INVALID guard"
  - "UI wiring (Research/Evidence tab from mock to real evidence_links) is explicitly out of scope for Phase 1 — addressed in Phase 3"
  - "PubMed gap (11 DOIs unresolvable via CrossRef) and YouTube gap (5 videos not in CMS) are known and documented — not blockers for this phase"

requirements-completed: []

duration: 2min
completed: "2026-06-12"
---

# Phase 01 Plan 03: Compile pipeline doc update + demo verification checkpoint — Summary

**DOSSIER_COMPILE_PIPELINE.md STEP 5 now instructs all future dossier compiles to always capture pmid, doi, url, and page_number on evidence_links inserts; SQL verification confirms FDA and PubMed citation URLs are populated**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-06-12T21:01:11Z
- **Completed:** 2026-06-12T21:03:08Z
- **Tasks:** 2 (1 auto + 1 checkpoint:human-verify)
- **Files modified:** 1

## Accomplishments

- Added `CITATION LOCATOR CAPTURE` paragraph to `Fable Docs/DOSSIER_COMPILE_PIPELINE.md` STEP 5, immediately after the `evidence_links is INVALID` guard — per decision D-12
- Covers all four source types: pubmed (pmid + url construction), fda_label (accessdata.fda.gov URL + page_number), youtube (start_seconds deep-link), manufacturer/ifu (public URL)
- Added completeness guard: "An evidence_links row with source='pubmed' but pmid=NULL or url='' is INCOMPLETE — resolve before marking the dossier compile as done."
- SQL verification queries run against Supabase project `aejskvmpembryunnbgrk`

## Task Commits

1. **Task 1: Update DOSSIER_COMPILE_PIPELINE.md with citation locator capture instructions** - `b391244` (docs)
2. **Task 2: Checkpoint (verification queries run, results below)**

## Files Created/Modified

- `Fable Docs/DOSSIER_COMPILE_PIPELINE.md` — Added CITATION LOCATOR CAPTURE paragraph to STEP 5

## SQL Verification Results

### Query 1: Source breakdown

```
SELECT source, COUNT(*), COUNT(NULLIF(url, '')) as has_url FROM evidence_links GROUP BY source

| source    | total | has_url | has_pmid |
|-----------|-------|---------|----------|
| fda_label | 29    | 29      | 0        |
| youtube   | 6     | 6       | 0        |
| pubmed    | 14    | 3       | 3        |
| ifu       | 2     | 0       | 0        |
```

### Query 2: Sample URLs populated

```
SELECT source, url, pmid FROM evidence_links WHERE url != '' LIMIT 10

fda_label | https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/125360s110lbl.pdf (Xeomin)
fda_label | https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/206333s005lbl.pdf (Kybella)
fda_label | https://www.accessdata.fda.gov/cdrh_docs/pdf11/P110033S101.pdf (Juvederm Vollure/Voluma)
```

### Detailed breakdowns

**YouTube (6 rows):**

| URL | Has Timestamp |
|-----|---------------|
| `https://www.youtube.com/watch?v=AdqZEI8kIZk&t=65s` | YES |
| `https://www.youtube.com/watch?v=uVzgSpqA2Bw` | NO (video not in CMS) |
| `https://www.youtube.com/watch?v=UCLcnIlq8DM` | NO (video not in CMS) |
| `https://www.youtube.com/watch?v=SKWeTdW6zvQ` | NO (video not in CMS) |
| `https://www.youtube.com/watch?v=xVOn1FcnUWU` | NO (video not in CMS) |
| `https://www.youtube.com/watch?v=2ONlmqLLsGo` | NO (video not in CMS) |

**PubMed (14 rows):**

| pmid | doi | url |
|------|-----|-----|
| 27100962 | 10.1097/DSS.0000000000000754 | `https://pubmed.ncbi.nlm.nih.gov/27100962/` |
| 15871314 | 10.1111/j.1524-4725.2005.31105 | `https://pubmed.ncbi.nlm.nih.gov/15871314/` |
| 16532442 | 10.1002/lsm.20275 | `https://pubmed.ncbi.nlm.nih.gov/16532442/` |
| NULL | 10.1097/MD.0000000000032372 | EMPTY (x2 — CrossRef not indexed) |
| NULL | 10.2165/00128071-200304100-000 | EMPTY (x3 — CrossRef not indexed) |
| NULL | 10.1001/archfaci.8.6.426 | EMPTY (x2 — CrossRef not indexed) |
| NULL | 10.1007/s00266-018-1157-3 | EMPTY (x3 — CrossRef not indexed) |
| NULL | 10.1007/s00266-019-01393-7 | EMPTY (x1 — CrossRef not indexed) |

## Decisions Made

1. **Pipeline update placement (D-12):** Paragraph inserted immediately after the `evidence_links is INVALID` guard in STEP 5, before the `COMPILE + INSERT agent_fuel_documents` instruction. This ensures any compiler reading the INSERT section sees the locator requirements inline.

2. **UI wiring is Phase 3 scope:** The Research/Evidence tab currently reads from `lib/mock/research-data.ts`. Wiring to real `evidence_links` data is explicitly out of scope for Phase 1 (citations) and will be addressed in Phase 3 (retrieval-wiring).

## Deviations from Plan

None — plan executed exactly as written.

## Known Gaps (acknowledged, not blockers)

**PubMed — 11 rows with pmid=NULL:**
These 11 DOIs are from aesthetics/dermatology trade journals (Archives of Facial Plastic Surgery, Drugs: R&D, Aesthetic Plastic Surgery) not indexed in PubMed via CrossRef. Manual PMID lookup required. Documented in 01-01-SUMMARY.md.

**YouTube — 5 of 6 rows without timestamps:**
Videos not yet ingested into `manufacturer_youtube_transcript` CMS table. Timestamps can be backfilled once ingested. Documented in 01-01-SUMMARY.md.

**ifu — 2 rows with no URL:**
IFU (Instructions for Use) rows have no URL. These are typically manufacturer-provided physical documents. Can be populated when public URLs are available.

**page_number column — applied (confirmed at checkpoint):**
Migration applied to Supabase via dashboard SQL editor. Column is live on `evidence_links`.

## Phase 1 Completion Status

Checkpoint approved 2026-06-12.

| Success Criterion | Status |
|-------------------|--------|
| All existing PubMed rows with pmid have url populated | DONE (3/3 rows with pmid have URL) |
| evidence_links table has page_number column | DONE (migration applied and confirmed at checkpoint) |
| FDA prescribing info URLs in evidence_links | DONE (29/29 fda_label rows have accessdata.fda.gov URLs) |
| YouTube CMS chunks have start_seconds captured | PARTIAL (1/6 rows have timestamp; 5 videos not in CMS — accepted gap) |
| Compile pipeline always captures pmid, doi, url, page_number | DONE (STEP 5 updated via this plan) |
| Research/Evidence tab renders clickable PubMed + FDA links | OUT OF SCOPE — Phase 3 |

## Self-Check: PASSED

- `Fable Docs/DOSSIER_COMPILE_PIPELINE.md`: contains "CITATION LOCATOR CAPTURE" — VERIFIED
- `Fable Docs/DOSSIER_COMPILE_PIPELINE.md`: contains "pubmed.ncbi.nlm.nih.gov/{pmid}/" — VERIFIED
- `Fable Docs/DOSSIER_COMPILE_PIPELINE.md`: contains "page_number" — VERIFIED
- `Fable Docs/DOSSIER_COMPILE_PIPELINE.md`: contains "accessdata.fda.gov" — VERIFIED
- `Fable Docs/DOSSIER_COMPILE_PIPELINE.md`: contains "start_seconds" — VERIFIED
- SQL verification queries run against `aejskvmpembryunnbgrk` — VERIFIED (results above)
- Commit `b391244`: present in git log — VERIFIED

---
*Phase: 01-citations*
*Completed: 2026-06-12*
