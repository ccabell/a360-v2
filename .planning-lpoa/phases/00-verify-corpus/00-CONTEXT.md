# Phase 0: verify-corpus - Context

**Gathered:** 2026-07-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Turn the 14 unverified, ManualsLib-scraped PDFs in `C:\Projects\lpoa` into a
trusted, hosted grounding set for the 12 in-scope devices, so P1-P3 read
verified text instead of unverified scrapes. Produces one manifest file that
every downstream phase treats as ground truth for "which PDF is this device's
real manual, where does it live, how many pages."

**NOT in scope:** touching any app code (`components/lpoa/*`, `lib/pdfSearch.ts`
— that's P1). Authoring device-catalog records, prompts, questions, FAQs, or
simulator configs (P1-P3). Sourcing manuals beyond the 14 already downloaded —
Fotona (0 PDFs) and the broader 140+ manual wishlist in `CURATION_DASHBOARD.md`
are out of scope for this milestone.

</domain>

<decisions>
## Implementation Decisions

### Corpus scope — 12 in-scope devices, not 14
- **D-01:** 14 PDFs exist in `C:\Projects\lpoa`. **2 are excluded from v1.0
  entirely** (decided with Chris 2026-07-14): Lumenis `SPLENDOR_X_Brochure.pdf`
  (a brochure, not an operator manual) and BTL `BTL_EMFACE_Manual_Reference.pdf`
  (a reference sheet, not an operator manual). Not built as assistant-only,
  not flagged-weak-source — simply not in the v1.0 catalog. Record them in the
  manifest as `in_scope: no` for traceability, but do no further verification
  work on them this phase.
- **D-02:** In-scope corpus = 12 PDFs / 12 devices / 8 manufacturers: Candela
  GentleMax Pro, Cynosure/Lutronic Elite iQ, Cutera Excel V, Cutera Excel HR,
  Cutera AviClear, Alma Harmony XL Pro, Alma Soprano Ice, Sciton JOULE, Deka
  SmartXide, Quanta QX MAX, InMode BodyTite, InMode Morpheus8.

### Correction to REQUIREMENTS.md R3 premise
- **D-03:** REQUIREMENTS.md R3 assumed "Cutera (3), Alma (2), InMode (2)
  exercise the multi-manual path" — this is **wrong**. Per `lpoa\MANIFEST.md`,
  each of those manufacturers' multiple PDFs are **different devices** (e.g.
  Cutera's 3 PDFs = Excel V + Excel HR + AviClear, three separate devices),
  not multiple manuals for one device. **As currently downloaded, every
  in-scope device has exactly 1 manual.** R3's `1..N manuals per device` UI
  still gets built (the schema/picker should support it), but P0 will not
  produce any device with N>1 manuals to exercise it — flag this gap back to
  REQUIREMENTS.md/ROADMAP.md P2 verification criteria (can't "exercise the
  multi-manual path" if no device has multiple manuals; either accept
  single-manual-only verification for v1.0, or source a second manual for one
  device as a stretch goal — Claude's discretion, non-blocking).

### PDF host — gl-media
- **D-04:** Host on GL's `gl-media` bucket (decided with Chris 2026-07-14).
  Rationale: keeps ~41MB out of the a360-v2-lpoa repo, reuses a360-studio's
  approval flow.
- **D-05:** JOURNAL (2026-07-13) claims a360-studio gained a "Laser Manuals
  (LPOA)" browse root on 2026-07-12, but PROJECT.md already flags this as
  **unverified in code** — the literal label/LPOA string was not found in
  a360-studio source as of the 2026-07-13/14 research pass. P0 must re-check
  `C:\Projects\a360-studio` for this before depending on it. If absent, fall
  back to a plain `gl-media` bucket path/prefix (e.g. `lpoa-manuals/{device-id}/
  {filename}.pdf`) without waiting for a dedicated browse-root UI — the browse
  root is a nice-to-have for content ops, not a hard dependency for hosting.
- **D-06:** Rights check: these are ManualsLib scrapes, not manufacturer-hosted
  originals. Before any PDF is made publicly reachable via a gl-media public
  URL, do a basic reasonableness check (operator manuals are customarily
  freely distributed by manufacturers/ManualsLib for the products' own
  customers; no paywall/DRM was bypassed to obtain them) and note it in the
  manifest. This is not a formal legal sign-off — if Chris wants one, that's
  a decision to surface, not something to self-approve.

### Manifest format
- **D-07:** One file, `C:\Projects\a360-v2-lpoa\.planning-lpoa\phases\
  00-verify-corpus\DEVICE_MANIFEST.md` (or `.json` if a machine-readable form
  is more useful to P1 — Claude's discretion, prefer whatever P1's device-pack
  seeding will consume most directly). Columns per REQUIREMENTS.md R1: device
  id, manufacturer, model, pdf path/URL (gl-media), page count, source_quality
  (`operator_manual | brochure | reference`), verified (yes/no), in_scope
  (yes/no), 3-random-page spot-check notes.

### Folder-naming reconciliation
- **D-08:** `lpoa\MANIFEST.md` folders use `Cynosure_Lutronic` and
  `Deka_Laser` while `PDF_CLEANUP_VERIFICATION_STATUS.md`/`CURATION_DASHBOARD.md`
  sometimes say `Cynosure/Lutronic` and `Deka`. Not a real inconsistency once
  read closely — same manufacturer, different doc's shorthand. Use
  `Cynosure/Lutronic` and `Deka` as the canonical manufacturer names in the
  manifest (matches the product-facing framing).

### What does NOT need changing
- No PDF content re-cleaning this phase — the existing heuristic cleanup
  (front/back ManualsLib-marker stripping) stands unless spot-check finds it
  broke something.
- No app code.

### Claude's Discretion
- Manifest file format (Markdown table vs JSON) — pick whatever P1 will read
  most directly.
- Exact gl-media bucket path/prefix convention if the LPOA browse root turns
  out not to exist.
- Whether to attempt sourcing a second manual for one device to exercise the
  multi-manual picker (stretch, non-blocking).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

- `C:\Projects\a360-v2-lpoa\.planning-lpoa\PROJECT.md` — milestone context, GSD tooling note (this phase is executed manually, no `/gsd:*` CLI)
- `C:\Projects\a360-v2-lpoa\.planning-lpoa\REQUIREMENTS.md` — R1 (this phase), R3 note on multi-manual (see D-03 correction)
- `C:\Projects\a360-v2-lpoa\.planning-lpoa\ROADMAP.md` — P0 exit criteria
- `C:\Projects\lpoa\MANIFEST.md` — actual PDF inventory (14 PDFs, page counts, sizes)
- `C:\Projects\lpoa\PDF_CLEANUP_VERIFICATION_STATUS.md` — retracts "ready" claim, all rows "Manually Verified: NO"
- `C:\Projects\lpoa\CURATION_DASHBOARD.md` — coverage gaps (informational only, out of scope this milestone)
- `C:\Projects\a360-studio\src\lib\library\storage-queue.ts`, `src\app\api\library\queue-upload\route.ts`, `src\app\(library)\library\gl\page.tsx` — candidate gl-media host infra to verify

</canonical_refs>
