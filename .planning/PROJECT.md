# Agent Workspace — the `/dashboard` runtime (sidebar · per-tool data tab · links hub)

## What This Is

Three UI changes to `a360-v2`'s shared `/dashboard` shell so it scales as Chris's daily runtime as the project count grows: (1) restructure the long flat left sidebar into grouped/searchable nav that keeps the demo/internal split intact; (2) surface a contextual "project data" tab when a tool opens, exposing that project's Jira · Supabase · GitHub · Vercel · Accenture links; (3) add a gated internal "links hub" page for tooling/environment shortcuts. This **extends** the already-shipped A360 Command Center (`/dashboard/portfolio`) — it does not greenfield a new app.

## Core Value

At `https://a360-v2-wse.vercel.app/dashboard`, the sidebar stays usable at 20+ entries (grouping + filter, demo/internal split preserved), each tool shows a data tab listing its own project's links, and a gated `/dashboard/links` hub launches internal tooling shortcuts — merged to `main`, `vercel --prod`-deployed, and live-verified 200 behind the beta gate.

## Requirements

### Validated

<!-- Shipped and confirmed valuable (pre-existing, this is a brownfield extension). -->

- ✓ Shared `/dashboard` shell with a flat 22-item sidebar (`components/layout/sidebar.tsx`), demo/internal split via `scope:"internal"` + `NEXT_PUBLIC_APP_MODE` — existing
- ✓ A360 Command Center at `/dashboard/portfolio` (DB-backed `portfolio_projects`/`portfolio_tasks` on Ops, `ProjectLinks` jsonb model, rendered Links grid, Data Sources registry, top pill-tab nav, History) — existing (`c5404ec`)
- ✓ `ProjectLinks` interface (`lib/portfolio/db.ts:26`) with `github/vercel[]/live[]/supabase[]/railway[]/docs[]/localPath` — existing
- ✓ Beta-gate middleware (`BETA_ACCESS_PASSWORD`) over all internal routes; `/exchange` is the only passwordless path — existing

### Active

<!-- Current scope. Hypotheses until shipped and live-verified. -->

- [ ] Sidebar restructured into collapsible category groups (reusing the Command Center's 6-category taxonomy) + a filter box, `scope`/`APP_MODE` demo-split preserved
- [ ] Contextual per-tool "project data" tab/panel, driven by an explicit route→project-slug map, reading `portfolio_projects.links`
- [ ] `ProjectLinks` extended with `jira?: string` and `accenture?: string` (jsonb — no migration) + TS type + UI render
- [ ] Gated internal `/dashboard/links` hub rendering the six supplied shortcuts, non-navigable (`file://`/`localhost`) ones as copy-to-clipboard
- [ ] Stale GL Studio link updated (`lib/portfolio/datasources.ts:70`, currently `a360-tcp.vercel.app/library/gl`) to a360-studio local-dev / "pending deploy"
- [ ] Merged to `main`, `vercel --prod`-deployed, live-verified 200 behind the beta gate, JOURNAL + STATE.md updated

### Out of Scope

<!-- Explicit boundaries with reasoning to prevent re-adding. -->

- Rebuilding the Command Center — extend it; ~85% of the raw material already exists
- Turning `/dashboard/history` (saved research outputs) into a runtime — it stays as-is (D-A confirmed: the target is the shared shell, not that page)
- Live Jira read/write — D-D confirmed **static deep-link only** (`jira?: string`); the connected Atlassian Rovo MCP is not wired this round
- Sprints / estimates / assignees — explicitly parked in the 2026-07-11 Command Center plan
- Any new Supabase table for the links hub — a static curated TS list is sufficient (D-F)
- Touching retired routes (Prompt Runner / Extraction Model / Agent Mgmt) or Pulse (retired) / Mid-Stream (read-only)

## Context

- **Repo/branch reality:** single repo `ccabell/a360-v2`, many worktrees; deploy is CLI-only (`vercel --prod`) from a clean `main` worktree. The folder `a360-v2-wse` is a worktree on the older `feat/demo-agent-scribe` branch and does NOT carry the Command Center — editing there won't ship. All work is on `main` (this GSD project runs from a linked worktree on branch `claude/kind-dhawan-968472`, based off `main`'s `c5404ec`).
- **Command Center is the foundation:** its `ProjectLinks` model, rendered Links grid (`components/portfolio/project-card.tsx`), Data Sources typed-registry→cards page (`lib/portfolio/datasources.ts` + `app/dashboard/portfolio/data-sources/page.tsx`), and top pill-tab nav (`components/portfolio/command-nav.tsx`) are the raw material for requests 2 and 3.
- **Data:** `portfolio_projects`/`portfolio_tasks` on A360 Ops (`uedajrdzcjfrmbiznflf`); `links` + `dependencies` are jsonb (adding `jira`/`accenture` needs no migration). Probe `information_schema.columns` before any SQL — never trust the migration file or TS types.
- **Six hub links (request 3):** two personal Claude artifacts (undocumented), `file:///C:/projects/asset_factory/_review_gallery.html` (exists; non-navigable from HTTPS → copy), `https://a360-v2-wse.vercel.app/admin/exchange` (real, separate admin-auth gate), `http://localhost:8899/agent_exchange_feature_matrix.html` (machine-local → copy), `https://github.com/ccabell/a360-core-docs/pull/2`.

## Constraints

- **Wrong-target guard**: edit on `main` — the `a360-v2-wse` *folder* is on an older branch that lacks the Command Center; edits there won't ship.
- **Demo/internal split must survive**: the sidebar is shared with the buyer-facing demo build; `NEXT_PUBLIC_APP_MODE=demo` hides `scope:"internal"` items — any restructure must keep this filter working or internal tools leak into demos.
- **Deploy safety**: `vercel --prod` from a clean `main` worktree, CLI-only; `_DEPLOY_SOURCE.md` + `.vercel/project.json` must match the registry; "pushed" ≠ "deployed" — report the live URL actually curled/clicked.
- **Non-navigable links**: browsers block `file://` from an `https://` origin and `localhost:8899` only resolves on Chris's machine — the hub must render those as copy-to-clipboard, not anchors.
- **Secrets**: never commit `.env`; `GITHUB_TOKEN`/`VERCEL_API_TOKEN` are server-only, added to BOTH Production and Preview (verify `vercel env ls`).
- **Schema-probe before SQL**: probe `information_schema.columns` on Ops `uedajrdzcjfrmbiznflf` before any `portfolio_*` query.
- **Retired refs**: render greyed, never active-link (Prompt Runner `ksutsaiogmicgaarocba`, Extraction Model `wvpgmawrizwkmvfnwqfl`, Agent Mgmt `dqkuxaiyxfsbzfakojeb`).

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| D-A: target = shared `/dashboard` shell + Command Center, NOT the literal `/dashboard/history` page | All three asks attach to the shell; history is a saved-outputs wrapper | ✓ Confirmed by Chris |
| D-B: collapsible category groups (6-category Command Center taxonomy) + filter box | Groups alone still scroll at 40+ items; filter box is cheap insurance | ✓ Confirmed (default) |
| D-C: contextual per-tool tab via explicit route→project-slug map | Matches "when a tool opens, a tab exposing THAT project's data" | ✓ Confirmed (default) |
| D-D: Jira = static deep-link only (`jira?: string`) | 2026-07-11 plan deliberately parked live Jira; link-only avoids scope creep | ✓ Confirmed by Chris |
| D-E: Accenture = single URL per project (`accenture?: string`) | Undefined in repo; Chris scoped it to one URL | ✓ Confirmed by Chris |
| D-F: links hub = static curated TS list, `scope:"internal"` gated, copy-to-clipboard for non-navigable | A DB table is over-engineering for a ~6-link personal launcher | ✓ Confirmed (default) |
| D-G: extend `ProjectLinks` jsonb with `jira?`/`accenture?` as single strings | Mirror existing fields; jsonb → no migration either way | ✓ Confirmed by Chris |
| D-H: update stale GL Studio link → a360-studio local-dev / "pending deploy" | a360-studio replaced TCP as canonical CMS but its prod deploy is unconfirmed (P5 open) | ✓ Confirmed by Chris |
| Planning lives in this session worktree's `.planning/` on branch `claude/kind-dhawan-968472`, not `main` | GSD's nested-worktree guard required archiving the stale `.planning/` on `main` first (`6a589af`); new planning stays on the branch | ✓ Confirmed by Chris |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-07-16 after initialization*
