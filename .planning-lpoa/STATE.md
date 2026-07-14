# LPOA Multi-Device — State

**Milestone:** v1.0 Multi-Device · **Status:** planning complete, execution not started.

## Where to work

- **Worktree:** `C:\Projects\a360-v2-lpoa` · branch `feat/lpoa-multi-device` (off `main`).
- **Deploy target:** `a360-v2-wse` Vercel project, from `main` via CLI (`vercel --prod`) only — preview-first. Never git-push deploy.
- **Live surface:** https://a360-v2-wse.vercel.app/dashboard/lpoa
- **Plan docs:** this folder (`.planning-lpoa/`) — NOT `.planning/` (that's the separate GL project).

## Phase board

| Phase | Status | Requirements |
|-------|--------|--------------|
| P0 — Verify PDF corpus | ☐ not started (NEXT) | R1 |
| P1 — Device catalog (Joule as #1) | ☐ | R2 |
| P2 — Per-device surfaces (all 13) | ☐ | R3, R4, R5, R9 |
| P3 — Subset simulators + lock + prefill | ☐ | R6, R7, R8 |
| P4 — Verify & deploy | ☐ | — |

## Done

- Research: current impl mapped (file:line), manuals inventoried, reference docs read.
- `PROJECT.md`, `ROADMAP.md`, `REQUIREMENTS.md` (deep, code-grounded), reference docs filed.

## Next action

**P0** — open/verify the 13 in-scope PDFs; produce the verified device→manual manifest (R1). Then P1.

## Key decisions (see PROJECT.md)

Extend current keyword-grounding pattern (not RAG) · starter-subset simulators · draft rules from manuals → clinical review · real citations only (fix Joule's fabricated refs) · isolated worktree off main.

## Handoff notes

- The live simulator's citations/confidence are fabricated and it has no lock — R6/R7 fix this (see PROJECT.md Current State + REQUIREMENTS.md §"Key design reconciliations" B).
- 5 open decisions (PDF host, subset devices, non-manuals, picker placement, Joule re-verify) are listed at the end of REQUIREMENTS.md — not blocking, resolve at phase planning.

---
*Last updated: 2026-07-14.*
