# Roadmap: Agent Workspace

## Overview

Three UI extensions to the already-shipped A360 Command Center's `/dashboard` shell: a grouped/searchable sidebar that scales past 20 entries, a contextual per-tool "project data" tab sourced from `portfolio_projects.links`, and a gated internal links hub for tooling shortcuts. Phases 1-3 are independent front-end builds on top of the existing Command Center foundation and can proceed in any order (or in parallel); Phase 4 merges, deploys, and live-verifies all three surfaces together.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Sidebar Restructure** - Grouped, collapsible, filterable sidebar nav that preserves the demo/internal split
- [ ] **Phase 2: Per-Tool Project Data Tab** - Contextual tab/panel showing each tool's project links (incl. new Jira/Accenture fields)
- [ ] **Phase 3: Links Hub Page** - Gated internal `/dashboard/links` launcher + stale Studio link fix
- [ ] **Phase 4: Ship & Verify** - Merge, deploy, and live-verify all three surfaces behind the beta gate

## Phase Details

### Phase 1: Sidebar Restructure
**Goal**: The left sidebar scales past 20 entries via collapsible category groups and a filter box, without breaking the existing demo/internal split.
**Depends on**: Existing A360 Command Center (`c5404ec`, already shipped) — no new phase dependency; can run independently of Phases 2-3.
**Requirements**: SIDE-01, SIDE-02, SIDE-03, SIDE-04, SIDE-05
**Success Criteria** (what must be TRUE):
  1. Sidebar items render grouped into the Command Center's 6-category taxonomy (Imaging ML · Content & Education · Studio & Global Library · Exchange & Agents · Data & RAG · Reserve/Infra)
  2. A filter/search box narrows visible sidebar items by typed text
  3. With `NEXT_PUBLIC_APP_MODE=demo`, `scope:"internal"` items are hidden; in `internal` mode they are visible
  4. Category groups collapse/expand, and the group containing the active route is expanded (or its active state visible) on load
  5. The deployed `/dashboard` sidebar renders correctly and remains usable at 20+ entries
**Plans**: TBD
**UI hint**: yes

### Phase 2: Per-Tool Project Data Tab
**Goal**: Opening a mapped dashboard tool shows a "project data" tab exposing that project's Jira · Supabase · GitHub · Vercel · Accenture links.
**Depends on**: Existing A360 Command Center (`c5404ec`, already shipped) — no new phase dependency; can run independently of Phases 1, 3.
**Requirements**: TAB-01, TAB-02, TAB-03, TAB-04, TAB-05
**Success Criteria** (what must be TRUE):
  1. `ProjectLinks` (`lib/portfolio/db.ts`) is extended with `jira?: string` and `accenture?: string`, reflected in the TS type, no DB migration required
  2. An explicit route→project-slug map associates dashboard tool routes with their `portfolio_projects` row
  3. When a mapped tool route is open, a "project data" tab/panel is available in the shell, sourcing links from that project's `portfolio_projects.links`
  4. The tab renders the project's Jira · Supabase · GitHub · Vercel · Accenture links (reusing the Command Center's Links-grid pattern), omitting any links absent for that project
  5. At least two different tool routes show correct, distinct per-project links, verified against real `portfolio_projects` data
**Plans**: TBD
**UI hint**: yes

### Phase 3: Links Hub Page
**Goal**: A gated internal launcher page surfaces the six supplied tooling/environment shortcuts, and the stale GL Studio link is corrected.
**Depends on**: Existing A360 Command Center (`c5404ec`, already shipped) — no new phase dependency; can run independently of Phases 1-2.
**Requirements**: HUB-01, HUB-02, HUB-03, HUB-04, HUB-05
**Success Criteria** (what must be TRUE):
  1. A new `/dashboard/links` page exists, gated to `scope:"internal"` (hidden in demo mode, behind the beta gate)
  2. The hub renders the six supplied shortcuts from a static curated TS list (typed-registry→cards pattern, no new Supabase table)
  3. Navigable (https) links render as working anchors that resolve
  4. Non-navigable entries (`file://`, `http://localhost:8899`) render as copy-to-clipboard controls, not dead anchors
  5. The stale GL Studio link in `lib/portfolio/datasources.ts` (currently `a360-tcp.vercel.app/library/gl`) is updated to the a360-studio local-dev / "pending deploy" target
**Plans**: TBD
**UI hint**: yes

### Phase 4: Ship & Verify
**Goal**: All three surfaces are live in production, verified with real requests, and the record of what was deployed is captured.
**Depends on**: Phase 1, Phase 2, Phase 3
**Requirements**: SHIP-01, SHIP-02, SHIP-03, SHIP-04
**Success Criteria** (what must be TRUE):
  1. All three surfaces (sidebar, per-tool tab, links hub) are merged to `main` and `vercel --prod`-deployed from a clean `main` worktree
  2. Any required env vars (`GITHUB_TOKEN`, optional `VERCEL_API_TOKEN`/`HUB_JOURNAL_REPO`) are present in BOTH Production and Preview on the `a360-v2-wse` Vercel project, verified via `vercel env ls`
  3. The three live surfaces are curl/click-verified 200 behind the beta gate on `a360-v2-wse.vercel.app`, with the exact URLs tested recorded
  4. A JOURNAL.md decision line and a STATE.md row are added recording the deployed URLs and what was verified
**Plans**: TBD

## Progress

**Execution Order:**
Phases 1-3 are independent and may execute in any order (or in parallel); Phase 4 requires all three complete: 1/2/3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Sidebar Restructure | 0/TBD | Not started | - |
| 2. Per-Tool Project Data Tab | 0/TBD | Not started | - |
| 3. Links Hub Page | 0/TBD | Not started | - |
| 4. Ship & Verify | 0/TBD | Not started | - |
