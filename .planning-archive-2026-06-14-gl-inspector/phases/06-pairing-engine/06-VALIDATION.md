---
phase: 6
slug: pairing-engine
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-06-13
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | SQL verification queries via Supabase MCP execute_sql |
| **Config file** | none — SQL-based validation, no test framework needed |
| **Quick run command** | `execute_sql: SELECT COUNT(*) FROM item_relationships` |
| **Full suite command** | `execute_sql: SELECT pairing_tier, COUNT(*) FROM item_relationships GROUP BY pairing_tier` |
| **Estimated runtime** | ~5 seconds per query |

---

## Sampling Rate

- **After every task commit:** Run quick count query
- **After every plan wave:** Run full tier distribution query + completeness checks
- **Before `/gsd:verify-work`:** Full QA suite (190-pair coverage, field completeness, tier consistency)
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 06-01-01 | 01 | 0 | SC-1 schema | sql | `SELECT column_name FROM information_schema.columns WHERE table_name='item_relationships' AND column_name='pairing_tier'` | ✅ | ⬜ pending |
| 06-01-02 | 01 | 0 | D-10 backfill | sql | `SELECT name FROM products WHERE does_not_solve IS NULL` | ✅ | ⬜ pending |
| 06-02-xx | 02 | 1 | SC-5 8-gate | file | `test -f .planning/phases/06-pairing-engine/PAIRING_RUBRIC.md` | ❌ W0 | ⬜ pending |
| 06-03-xx | 03 | 1 | SC-1 190 pairs | sql | `SELECT COUNT(DISTINCT (item_a_id, item_b_id)) FROM pairing_evaluation_results` | ❌ W1 | ⬜ pending |
| 06-04-xx | 04 | 2 | SC-4 fields | sql | `SELECT COUNT(*) FROM item_relationships WHERE clinical_rationale IS NOT NULL AND timing_guidance IS NOT NULL` | ❌ W2 | ⬜ pending |
| 06-05-xx | 05 | 3 | SC-2 review | file | `test -f .planning/phases/06-pairing-engine/PAIRING_REVIEW.md` | ❌ W3 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `pairing_tier` column added to `item_relationships` table
- [ ] `does_not_solve` backfilled for any remaining products missing it
- [ ] `PAIRING_RUBRIC.md` created with tier definitions and gate definitions

*Existing `item_relationships` schema covers most field needs — only `pairing_tier` addition required.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Clinical rationale accuracy | SC-3 | Requires domain expertise | Chris reviews canonical/common pairs in PAIRING_REVIEW.md |
| Tier correctness | SC-2 | Clinical judgment needed | Chris validates each canonical/common pair tier assignment |
| Staff talking points tone | SC-4 | Subjective quality check | Chris verifies education-first, not pressure-based language |
| Patient education clarity | SC-4 | Provider expertise needed | Chris verifies "Tell the patient" framing is accurate |
| Source support adequacy | SC-3 | Evidence quality judgment | Chris validates corpus evidence supports tier strength |

---

## Validation Sign-Off

- [ ] All tasks have automated verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
