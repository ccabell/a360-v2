# Requirements: Agent Workspace

**Defined:** 2026-07-16
**Core Value:** At the deployed `/dashboard`, the sidebar stays usable at 20+ entries with the demo/internal split intact, each tool shows a data tab listing its own project's links, and a gated `/dashboard/links` hub launches internal tooling shortcuts — live-verified 200 behind the beta gate.

## v1 Requirements

### Sidebar (grouped + searchable nav)

- [ ] **SIDE-01**: Sidebar items are organized into collapsible category groups reusing the Command Center's 6-category taxonomy (Imaging ML · Content & Education · Studio & Global Library · Exchange & Agents · Data & RAG · Reserve/Infra)
- [ ] **SIDE-02**: A filter/search box narrows visible sidebar items by name as the user types
- [ ] **SIDE-03**: The demo/internal split is preserved — with `NEXT_PUBLIC_APP_MODE=demo`, `scope:"internal"` items are hidden; in `internal` mode they are visible
- [ ] **SIDE-04**: Category groups can be collapsed/expanded, and the active route's group is expanded (or its active state visible) on load
- [ ] **SIDE-05**: The restructured sidebar renders correctly on the deployed `/dashboard` at 20+ entries without the nav becoming unusable

### Per-tool project-data tab

- [ ] **TAB-01**: `ProjectLinks` (`lib/portfolio/db.ts`) is extended with `jira?: string` and `accenture?: string`, reflected in the TS type (no DB migration — jsonb)
- [ ] **TAB-02**: An explicit route→project-slug map associates dashboard tool routes (e.g. `/dashboard/scribe` → `scribe`) with their `portfolio_projects` row
- [ ] **TAB-03**: When a mapped tool route is open, a "project data" tab/panel is available in the shell, sourcing links from that project's `portfolio_projects.links`
- [ ] **TAB-04**: The tab renders the project's Jira · Supabase · GitHub · Vercel · Accenture links (reusing the Command Center's Links-grid pattern); links absent for a project are simply not shown
- [ ] **TAB-05**: The tab shows correct per-project links on at least two different tool routes (verified against real `portfolio_projects` data)

### Links hub

- [ ] **HUB-01**: A new `/dashboard/links` page exists, gated to `scope:"internal"` (hidden in demo mode, behind the beta gate)
- [ ] **HUB-02**: The hub renders the six supplied shortcuts from a static curated TS list (typed-registry→cards pattern, no new Supabase table)
- [ ] **HUB-03**: Navigable links (https URLs) render as working anchors that resolve
- [ ] **HUB-04**: Non-navigable entries (`file://`, `http://localhost:8899`) render as copy-to-clipboard controls, not dead anchors
- [ ] **HUB-05**: The stale GL Studio link (`lib/portfolio/datasources.ts`, currently `a360-tcp.vercel.app/library/gl`) is updated to the a360-studio local-dev / "pending deploy" target

### Ship & verify

- [ ] **SHIP-01**: All three surfaces are merged to `main` and `vercel --prod`-deployed from a clean `main` worktree (not just pushed)
- [ ] **SHIP-02**: Any required env (`GITHUB_TOKEN`, optional `VERCEL_API_TOKEN`/`HUB_JOURNAL_REPO`) is present in BOTH Production and Preview on the `a360-v2-wse` Vercel project (verified via `vercel env ls`)
- [ ] **SHIP-03**: The three live surfaces are curl/click-verified 200 behind the beta gate on `a360-v2-wse.vercel.app`, with the exact URLs tested recorded
- [ ] **SHIP-04**: A JOURNAL.md decision line and a STATE.md row are added recording the deployed URLs and what was verified

## v2 Requirements

### Live Jira (deferred)

- **JIRA-V2-01**: Live Jira issue counts/status per project via the connected Atlassian Rovo MCP (requires Chris to name the Atlassian site + project key(s))

### Sidebar polish (deferred)

- **SIDE-V2-01**: Command-palette / fuzzy quick-open across all nav entries (beyond the filter box)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Rebuilding the Command Center | Extend it — ~85% of the raw material already exists (D-A) |
| `/dashboard/history` → runtime | It's a saved-outputs wrapper; the target is the shared shell, not that page (D-A) |
| Live Jira read/write this round | 2026-07-11 plan parked it; static deep-link only (D-D) |
| Sprints / estimates / assignees | Explicitly parked in the 2026-07-11 Command Center plan |
| DB table for the links hub | Over-engineering for a ~6-link personal launcher (D-F) |
| `jira`/`accenture` as arrays | Chris scoped each to a single URL; promote to arrays only if needed later (D-E/D-G) |
| Retired routes / Pulse / Mid-Stream as destinations | Retired (render greyed) or read-only per hard rules |

## Traceability

<!-- Populated during roadmap creation. Each v1 requirement maps to exactly one phase. -->

| Requirement | Phase | Status |
|-------------|-------|--------|
| SIDE-01 | Phase 1 | Pending |
| SIDE-02 | Phase 1 | Pending |
| SIDE-03 | Phase 1 | Pending |
| SIDE-04 | Phase 1 | Pending |
| SIDE-05 | Phase 1 | Pending |
| TAB-01 | Phase 2 | Pending |
| TAB-02 | Phase 2 | Pending |
| TAB-03 | Phase 2 | Pending |
| TAB-04 | Phase 2 | Pending |
| TAB-05 | Phase 2 | Pending |
| HUB-01 | Phase 3 | Pending |
| HUB-02 | Phase 3 | Pending |
| HUB-03 | Phase 3 | Pending |
| HUB-04 | Phase 3 | Pending |
| HUB-05 | Phase 3 | Pending |
| SHIP-01 | Phase 4 | Pending |
| SHIP-02 | Phase 4 | Pending |
| SHIP-03 | Phase 4 | Pending |
| SHIP-04 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 19 total
- Mapped to phases: 19/19 ✓
- Unmapped: 0 ✓

---
*Requirements defined: 2026-07-16*
*Last updated: 2026-07-22 after roadmap creation*
