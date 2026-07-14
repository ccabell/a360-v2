---
phase: 05-source-display
plan: "01"
subsystem: grounding/source-display
tags: [colors, css-tokens, source-bar, trust-tiers]
dependency_graph:
  requires: []
  provides: [TIER_RELIABLE, corpusTier, tier-css-tokens, source-count-bar]
  affects: [source-pill, inline-authority-badge, citation-hover-card, grounded-answer, ask-experience]
tech_stack:
  added: []
  patterns: [OKLch CSS custom properties for semantic color tiers, dark mode via CSS var overrides]
key_files:
  created: []
  modified:
    - app/globals.css
    - components/grounding/source-meta.ts
    - components/ask/ask-experience.tsx
decisions:
  - "3-tier color system: green=trusted (FDA/manufacturer), blue=evidence (pubmed/practice), neutral=general (youtube/podcast/industry)"
  - "Dark mode handled by CSS custom property overrides in .dark — no Tailwind dark: variants in chip values"
  - "TIER_RELIABLE and corpusTier exported from source-meta.ts for Plan 02 (reliable badge) consumption"
metrics:
  duration_seconds: 168
  completed_date: "2026-06-14T05:20:28Z"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 3
---

# Phase 05 Plan 01: Tier Color Tokens and Source Count Bar Summary

**One-liner:** OKLch trust-tier color system (green/blue/neutral) across all 7 corpus types, with "N sources found" bar replacing the old retrieved-sources header.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Tier color tokens + CORPUS_META chip color revision | 9e7c768 | app/globals.css, components/grounding/source-meta.ts |
| 2 | Source count bar with View sources toggle | 11a4e88 | components/ask/ask-experience.tsx |

## What Was Built

### Task 1: Tier color tokens + CORPUS_META chip colors

Added 12 OKLch CSS custom properties to `globals.css`:
- `:root` defines light-mode values for `--tier-trusted-bg/fg`, `--tier-evidence-bg/fg`, `--tier-general-bg/fg` plus their `-dark` variants
- `.dark` overrides the base vars with dark variants
- `@theme inline` registers `--color-tier-*` so Tailwind utilities `bg-tier-trusted-bg`, `text-tier-evidence-fg`, etc. work

Updated `source-meta.ts`:
- All 7 CORPUS_META chip values now use tier token classes (no raw color names, no `dark:` variants)
- Exported `TIER_RELIABLE: ReadonlySet<Corpus>` — the 3 corpus types earning the "Reliable" badge
- Exported `corpusTier(corpus)` helper returning `"trusted" | "evidence" | "general"`

Color mapping:
- `fda`, `manufacturer` → `bg-tier-trusted-bg text-tier-trusted-fg` (green — highest trust)
- `pubmed`, `practice` → `bg-tier-evidence-bg text-tier-evidence-fg` (blue — evidence-based)
- `youtube`, `podcast`, `industry` → `bg-tier-general-bg text-tier-general-fg` (neutral — informational)

### Task 2: Source count bar with View sources toggle

Replaced the old "Retrieved sources (N)" header + Eye/EyeOff toggle in `ask-experience.tsx` with:
- A styled bar (`bg-muted/50 px-3 py-2`) showing "{N} sources found" on the left
- A text "View sources" / "Hide sources" toggle on the right (text button, `text-primary`)
- Same expand/collapse behavior as before — `showSources` state unchanged

Updated tier legend (`showTierLegend` block):
- Collapsed from 4 items to 3: FDA / Manufacturer, Research / Practice, Industry / Media
- Legend dots now use `bg-tier-trusted-bg`, `bg-tier-evidence-bg`, `bg-tier-general-bg` with matching border colors

Removed `Eye` and `EyeOff` imports from lucide-react (no longer needed).

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all corpus types fully wired to real tier token classes.

## Self-Check: PASSED

Files verified:
- `app/globals.css` — contains `--tier-trusted-bg`, `--tier-evidence-bg`, `--tier-general-bg` in `:root`, `.dark`, and `@theme inline`
- `components/grounding/source-meta.ts` — TIER_RELIABLE exported, corpusTier exported, all 7 chip values use tier tokens, no `dark:bg-` classes
- `components/ask/ask-experience.tsx` — contains "sources found", "View sources", "Hide sources", tier legend uses tier token classes
- TypeScript compiles clean (`npx tsc --noEmit` exits 0)

Commits verified:
- 9e7c768 — Task 1
- 11a4e88 — Task 2
