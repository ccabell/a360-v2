# LPOA — State

**Milestone:** v1.0 GentleMax Pro Deep Tool (pivoted 2026-07-16) · **Status:** P0 done; P1 next.

## Where to work

- **Worktree:** `C:\Projects\a360-v2-lpoa` · branch `feat/lpoa-multi-device` (off `main`).
- **Deploy target:** `a360-v2-wse` Vercel project, from `main` via CLI (`vercel --prod`) only — preview-first. Never git-push deploy.
- **Live surface:** https://a360-v2-wse.vercel.app/dashboard/lpoa
- **Plan docs:** this folder (`.planning-lpoa/`) — NOT `.planning/` (that's the separate GL project).

## The pivot (read first)

Corpus verification (P0) found **only 1 of 14 PDFs is a real operator manual** —
Candela GentleMax Pro. The rest are unrelated products (oven, diesel engine,
portable toilet, camera, transformer…), scanned no-text scans, or ManualsLib
landing pages. The multi-device milestone is not buildable on real values, so it
pivoted to a **deep, source-locked, modular clinical tool on GentleMax Pro** with
**Planning** and **Sales** modes. Details: `phases/00-verify-corpus/CORPUS_VERDICT.md`,
ROADMAP.md, PROJECT.md.

## Phase board

| Phase | Status | Covers |
|-------|--------|--------|
| P0 — Verify corpus & mine real parameters | ✓ done (2026-07-16) | R1 |
| P1 — Grounding foundation + device-pack model | ☐ NEXT | R2 |
| P2 — App shell: modes + module nav + branding | ☐ | R3, R9 |
| P3 — Core Planning modules (Envelope/Safety/Assistant) | ☐ | R4, R5, R6 |
| P4 — Treatment Planner + patient context | ☐ | R6, R8 |
| P5 — Sales mode + source-lock hardening (safety-critical) | ☐ | R6, R7 |
| P6 — Verify & deploy | ☐ | — |

## Done

- Section 6 open decisions resolved with Chris (gl-media, non-manual exclusion, clinician scoping).
- **P0 complete:** all 14 PDFs text-extracted + verified → only GentleMax Pro is real (`phases/00-verify-corpus/CORPUS_VERDICT.md`). GentleMax Pro manual mined into a page-cited grounding dataset (`data/gentlemax-pro-manual-extract.json`).
- Milestone pivoted to single-device deep tool; ROADMAP/PROJECT/REQUIREMENTS/STATE rewritten.

## Build status (2026-07-16 — P1/P2/P3-core built + core deliverable verified)

**Scope narrowed (Chris):** skip Sales/modes — build the doctor's workspace (navigate info + create optimal settings). ROADMAP updated.

**Built + committed to working tree (not git-committed yet):**
- `lib/lpoa/types.ts` + `lib/lpoa/devices/gentlemax-pro.ts` — typed device pack from the mined data; every value page-cited; recommended doses in `lockedFields`.
- `public/manuals/gentlemax-pro.pdf` — the real 14 MB manual.
- `components/lpoa/SettingsPanel.tsx` — **rewritten** into the honest Settings Builder: pick wavelength/spot/pulse → real fluence envelope (p73) + live in-range validation + DCD ranges (p74) + locked recommended-dose card + pulse-width honesty note. Fabricated citations + fake confidence removed.
- `lib/useAISearch.ts` — assistant prompt de-fabricated ("estimate page numbers" → "use only real [Page N], else say not in manual"); points at GentleMax Pro.
- `components/lpoa/{PDFSidebar,PDFViewer,LPOAViewer,SearchPanel,FAQsPanel}.tsx` — rebranded to Candela GentleMax Pro; FAQs + suggested questions now real GentleMax content from the pack.

**Verified in-browser (DOM-confirmed, interactive):** Settings Builder renders real cited values — 755nm/6mm/0.25-0.50ms → 6–30 J/cm² (p73); switching to 1064nm exposes 1.5/3mm spots (755 omits them, matching the manual); 1064nm/1.5mm → 200–600 J/cm² (p73); locked recommended-fluence card; DCD ranges (p74); in-range validation live. Verified via the isolated route `app/dashboard/lpoa-preview/page.tsx` (TEMP — renders SettingsPanel alone).

**✅ react-pdf dev crash RESOLVED (2026-07-17).** Root cause: `next dev --webpack` forces an `eval-*` source-map devtool (and reverts any override), which is incompatible with react-pdf@10's pdfjs-dist ESM ("Object.defineProperty called on non-object"). Prod build uses a non-eval devtool, so the live surface was always fine — this was dev-only. Fix: switched the dev script to **turbopack** (`package.json`: `"dev": "next dev --turbopack"`, kept `"dev:webpack"` as fallback) + `transpilePackages: ["react-pdf","pdfjs-dist"]` in `next.config.ts`. **Verified:** integrated `/dashboard/lpoa` renders — Candela GentleMax Pro branding, 4 modules (Manual Index/Assistant/Settings Builder/FAQs), real manual loads (Page 1 of 182, "PN 8501-00-1810 Rev 06"), Settings Builder shows real cited fluence (755nm/6mm → 6–30 J/cm²). Temp `lpoa-preview` route deleted.

**Local dev setup notes:** this worktree had no `node_modules` (ran `npm install`) and no `.env.local` (created placeholder-value `.env.local`, gitignored, beta password `devlocal`). Dev now runs on **turbopack**. The page sits behind the beta gate (`devlocal`) + needs a real ANTHROPIC/AI_GATEWAY key for the assistant to actually answer.

## Next action

Continue building modules: Safety & Contraindications (P3), Treatment Planner + patient prefill (P4), source-lock hardening pass (P5). Then P6 merge + CLI deploy.

## Key facts for downstream phases

- **Only manufacturer instructions are used** (Chris, 2026-07-16). GentleMax Pro is the sole device this milestone.
- **The manual has device specs + safety but NO per-indication clinical doses** — recommended settings render locked, never fabricated. Grounding: `data/gentlemax-pro-manual-extract.json` (see `gaps`).
- **Real, citable data available:** fluence tables (p73), DCD ranges (p74-75), spot sizes, max energy (53J/79.2J p154), pulse widths, contraindications (p23), warnings (p24-33).
- **Ships without clinician sign-off** for v1.0 (no dose recommendations made). Clinician needed only for a future recommendation engine.
- **GSD tooling limitation:** `gsd-tools.cjs` hardcodes `.planning/` (the GL project here); this milestone is executed manually — phase docs authored by hand into `.planning-lpoa/phases/`, no `/gsd:*` CLI. See PROJECT.md "GSD Tooling Note."

---
*Last updated: 2026-07-16 — pivot to GentleMax Pro deep tool; P0 complete.*
