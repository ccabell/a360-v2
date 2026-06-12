# Handoff — `extraction-ui` branch (Extraction Management & Testing UI)

**Status:** Parked, complete-as-built, **post-demo** (not on the June 22 critical path).
**Branch:** `extraction-ui` — 2 commits ahead of `main`, **never pushed**.
**Why parked:** June 22 demo = research chat → FDA/PubMed badges → save to history (Option C).
That lives in a *different* session on the same working tree. This UI is parallel/later work.

## What's on the branch

```
69663bd  Screen 2: Extraction Setup (catalog + prompt set + variables + run options)
53e4f75  Screen 1: Patient List rich rows (visit description, count, actions, slide-out)
```
6 files, +653/-101 vs `main`:

| File | What it is |
|------|------------|
| `components/patients/patients-table.tsx` | **Screen 1.** Row cards: identity · visit description + consult-type chip · transcript count · Start-extraction / View-transcript actions · transcript slide-out panel. |
| `app/api/patients/route.ts` | `?enrich=1` param — parallel `getPatient()` fan-out adds `transcript_count`, `visit_description`, `consult_type`, `first_transcript_id` per patient. |
| `components/extraction/extraction-setup.tsx` | **Screen 2.** Catalog multi-select (search/chips/select-all), prompt-set picker (3.3 active), context textarea, Pass1/Pass2-only toggles, transcript preview. |
| `app/dashboard/patients/[id]/extract/page.tsx` | Server wrapper route for Screen 2. |
| `lib/extraction/catalog.ts` | `DEMO_CATALOG` (33 products + 14 services) + `PROMPT_SETS`. |
| `components/patients/patient-workspace.tsx` | Intelligence run-view renders `<ExtractionResults>`; added Start-extraction link. |

**Screen 3 (Results Viewer)** components — `components/extraction/extraction-results.tsx`,
`evidence-block.tsx`, `offering-card.tsx`, `disposition.ts` — were committed in **earlier** commits
already on `main` (verified live: 53 fields, 23 anchored, 10 offering cards). The branch builds clean
(`npm run build` ✓) and was DOM-verified: 20 patient cards, 20+20 action buttons, slide-out opens.

## Known stubs (intentional)
1. Screen 2 "Run extraction" button is a **stub** — navigates back to the workspace. Real
   `runExtraction` via Prompt Runner is not wired (waits on agents/prompt_sets access).
2. Screen 1 count shows **transcript** count, not **run** count.

## To resume later
- `git checkout extraction-ui` — it's isolated; rebase onto `main` after the demo lands.
- Wire stub #1 to the real Prompt Runner extraction endpoint.
- Theme: our shadcn / OKLch tokens, light+dark. **Not** the Mid_Stream dark-cyan screenshots.

## Do NOT
- Do not push this branch or merge to `main` before June 22.
- Do not let it touch `saved_outputs` / `/history` / research chat — those belong to the demo session.
