---
phase: 1
slug: citations
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-06-12
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — no automated test framework; verification via Supabase SQL queries + script exit codes |
| **Config file** | none — no test config required |
| **Quick run command** | `node scripts/verify-citations.js` (to be created as part of execution) |
| **Full suite command** | Same — single verification script + manual demo smoke test |
| **Estimated runtime** | ~10 seconds (DB queries) + ~2 min manual demo check |

---

## Sampling Rate

- **After every task commit:** Run the relevant SQL verification query listed in Per-Task Map
- **After every plan wave:** Run full SQL verification suite + check row counts
- **Before `/gsd:verify-work`:** All SQL assertions must pass; demo smoke test (Botox clickable citations) must be confirmed manually
- **Max feedback latency:** 30 seconds (SQL queries)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | schema migration | 1 | page_number column | SQL query | `SELECT column_name FROM information_schema.columns WHERE table_name = 'evidence_links' AND column_name = 'page_number'` returns 1 row | ✅ existing table | ⬜ pending |
| 1-02-01 | pubmed backfill | 1 | pmid + url populated | SQL query | `SELECT COUNT(*) FROM evidence_links WHERE source = 'pubmed' AND pmid IS NOT NULL` ≥ 3 before, increases after | ✅ existing rows | ⬜ pending |
| 1-02-02 | pubmed backfill | 1 | url format correct | SQL query | `SELECT COUNT(*) FROM evidence_links WHERE source = 'pubmed' AND url LIKE 'https://pubmed.ncbi.nlm.nih.gov/%'` | ✅ existing rows | ⬜ pending |
| 1-03-01 | youtube backfill | 1 | timestamps in URLs | SQL query | `SELECT COUNT(*) FROM evidence_links WHERE source = 'youtube' AND url LIKE '%&t=%'` > 0 | ✅ existing rows | ⬜ pending |
| 1-04-01 | fda url backfill | 2 | FDA URLs populated | SQL query | `SELECT COUNT(*) FROM evidence_links WHERE source = 'fda_label' AND url LIKE 'https://www.accessdata.fda.gov/%'` > 0 | ✅ existing rows | ⬜ pending |
| 1-05-01 | pipeline doc | 2 | compile doc updated | File check | `grep -c 'pmid' 'Fable Docs/DOSSIER_COMPILE_PIPELINE.md'` > 0 | ✅ existing doc | ⬜ pending |
| 1-06-01 | demo gate | 2 | clickable citations render | Manual | Navigate Research/Evidence tab, ask Botox question, confirm PubMed + FDA links clickable | n/a | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements.* No test framework install needed — all verification is SQL queries against Supabase and script exit codes.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Research/Evidence tab renders clickable "View on PubMed" links | Success criterion 6 | Requires browser + live Supabase data; no automated UI test harness | Start dev server, navigate to a Botox/Neurotoxins topic, confirm citation cards show clickable PubMed links |
| "Open FDA label · p.N" links render | Success criterion 6 | Same as above | Same page, confirm FDA label links are clickable and point to accessdata.fda.gov |
| YouTube citation links include timestamps | Success criterion 4 | Browser playback check | Click a YouTube citation, confirm video starts at the correct timestamp |
| FDA URL gap report | Success criterion 2 | Human review required for any unresolved supplement numbers | Review gap-analysis output from FDA URL research script; Chris fills in any manual entries |

---

## Validation Sign-Off

- [ ] All tasks have SQL verify queries or manual test instructions
- [ ] Sampling continuity: each wave has at least one SQL assertion
- [ ] Wave 0 covers all MISSING references (none needed — no test files required)
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s for SQL checks
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
