# P0 Corpus Verdict — the 14-PDF reality

**Verified:** 2026-07-16 by direct text extraction (PyMuPDF) of every PDF in
`C:\Projects\lpoa`, followed by content inspection. Supersedes `lpoa\MANIFEST.md`
(whose page counts were fabricated by the scraper) and closes R1.

## Method

`scratchpad/analyze_pdfs.py` extracted full text per PDF and measured: page
count, char count, chars/page, non-empty pages, count of number+unit tokens
(J/cm², nm, ms, Hz, mm), and laser-parameter term frequency. Then the first
~900 chars and parameter samples of each were read to identify the *actual*
document. Findings below are ground truth.

## Verdict: 1 of 14 PDFs is a genuine laser operator manual

| # | Claimed device | What the PDF ACTUALLY is | Verdict |
|---|---|---|---|
| 1 | **Candela GentleMax Pro** | **Genuine 182-pg Candela GentleMAX Operator's Manual** (Rev 06, June 2007; 755nm Alex + 1064nm Nd:YAG; real fluence/spot/DCD tables; 209 number+unit tokens) | ✅ **REAL** |
| 2 | Sciton JOULE | Indesit **gas-oven** operating manual (French/English, model K3M51) | ❌ wrong product |
| 3 | Cynosure Elite iQ | 35 scanned image pages, **zero text layer** (34 whitespace chars) | ❌ unusable (OCR-only) |
| 4 | Cutera Excel V | ManualsLib **download landing page** ("Popular Brands: Philips, Sony, LG…") | ❌ not a manual |
| 5 | Cutera Excel HR | ManualsLib download landing page | ❌ not a manual |
| 6 | Cutera AviClear | Hatz **1B20 diesel engine** manual | ❌ wrong product |
| 7 | Alma Harmony XL Pro | Go Power **sine-wave inverter** (GP-1750HD) manual | ❌ wrong product |
| 8 | Alma Soprano Ice | Klein Tools **VDV cable tester** instruction manual | ❌ wrong product |
| 9 | Deka SmartXide | ESP **IRCAM900 security camera** user manual | ❌ wrong product |
| 10 | Quanta QX MAX | Arteche **high-voltage instrument transformer** manual | ❌ wrong product |
| 11 | InMode BodyTite | M-system **Sentronic signal conditioner** (RTD transmitter) manual | ❌ wrong product |
| 12 | InMode Morpheus8 | Satellite Global II **portable-toilet** assembly manual | ❌ wrong product |
| 13 | Lumenis SPLENDOR X | Real SPLENDOR X **marketing brochure** (right device, but no operator content) | ⚠️ brochure only (excluded) |
| 14 | BTL EMFACE | ManualsLib **brand-index page** ("140999 brands…") | ❌ not a manual |

## Root cause

The ManualsLib batch downloader (`lpoa\batch_manualslib_downloader.py`) captured
whatever the scraped URL returned — for most devices that was an unrelated
product's manual, a scanned no-text PDF, or the ManualsLib HTML chrome — never
the real laser manual. `PDF_CLEANUP_VERIFICATION_STATUS.md` had already retracted
the "ready" claim (all rows "Manually Verified: NO"); this verifies why.

## Consequence (decided with Chris 2026-07-16)

A multi-device catalog with **real values** cannot be built on this corpus. The
milestone pivots to a **single-device, deep, genuinely functional tool on the
one real manual — Candela GentleMax Pro** (see PROJECT.md "Milestone Pivot").
The device-pack architecture is retained so additional devices slot in later
once real manuals are sourced (a separate, deferred effort).

## Note on the live JOULE surface

There is **no real Sciton JOULE manual** anywhere in this corpus (the file is an
oven manual). This is the mechanical reason the shipped JOULE simulator shows
fabricated citations — there was never a real manual behind it. The pivot
retires the JOULE surface in favor of the manual-grounded GentleMax Pro tool;
the fabricated-citation safety defect is resolved by *replacement*, not patching.
