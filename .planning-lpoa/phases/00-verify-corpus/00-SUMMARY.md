# P0 Summary — Verify corpus & mine real parameters

**Status:** ✓ complete · **Date:** 2026-07-16 · **Covers:** R1

## One-liner

Text-extracted and inspected all 14 corpus PDFs; found only 1 is a genuine
operator manual (Candela GentleMax Pro); mined it into a page-cited parameter
dataset — which triggered the milestone pivot to a single-device deep tool.

## What was done

1. **Extracted + measured all 14 PDFs** (`scratchpad/analyze_pdfs.py`, PyMuPDF):
   page count, char density, number+unit token counts, parameter-term frequency.
2. **Inspected actual content** of each → identified the true document.
3. **Verdict** (`phases/00-verify-corpus/CORPUS_VERDICT.md`): 1 real manual
   (GentleMax Pro); 13 are wrong products / scanned no-text / ManualsLib HTML /
   a brochure. `lpoa\MANIFEST.md` page counts were fabricated by the scraper.
4. **Mined GentleMax Pro** (182 pg) into `data/gentlemax-pro-manual-extract.json`
   — page-cited fluence tables (p73), DCD ranges (p74-75), spot sizes, limits,
   contraindications (p23), warnings (p24-33), guided-mode inputs, and an explicit
   `gaps` list of what the manual does NOT specify.

## Key findings

- **Only manufacturer instructions that actually exist: GentleMax Pro.** Chris
  confirmed the pivot to build deep on this one device.
- **The manual has device specs + safety but NO per-indication clinical doses** —
  Candela defers those to a separate Clinical Treatment Guidelines doc (not in
  corpus). → recommended-dose fields render **locked**, never fabricated. This is
  the honest core of the tool and the antidote to the live JOULE defect.
- **No real JOULE manual exists** in the corpus (it's an oven manual) — explains
  the live surface's fabricated citations; JOULE is retired, not patched.

## Deviations from the original P0 plan

- Original P0 assumed 12 in-scope devices to verify + a gl-media host decision.
  Reality collapsed that to 1 device. Host decision deferred to P1 (a single
  14 MB PDF makes `public/` viable; gl-media optional).
- The manifest became a *verdict + grounding dataset* rather than a 12-row device
  table — a truer artifact for the actual corpus.

## Next

P1 — build the typed GentleMax Pro device pack from the mined dataset; retire the
hardcoded-JOULE scaffolding; load the real manual PDF.
