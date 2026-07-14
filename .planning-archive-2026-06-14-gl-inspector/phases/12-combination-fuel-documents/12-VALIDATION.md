---
phase: 12
slug: combination-fuel-documents
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-06-14
---

# Phase 12 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Supabase MCP queries + manual content review |
| **Config file** | none — data enrichment phase |
| **Quick run command** | `SELECT id, product_1, product_2, status, jsonb_typeof(content) FROM gl_agent_fuel_documents WHERE document_type = 'pairing_fuel'` |
| **Full suite command** | See Per-Task Verification Map below |
| **Estimated runtime** | ~10 seconds per query |

---

## Sampling Rate

- **After every task commit:** Run quick query to verify row count and status
- **After every plan wave:** Run full content completeness checks
- **Before `/gsd:verify-work`:** All 16 fuel docs must have unified schema, non-null content fields
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 12-01-01 | 01 | 1 | COMBO-05 | query | `SELECT id, jsonb_object_keys(content) FROM gl_agent_fuel_documents WHERE document_type='pairing_fuel' LIMIT 1` | N/A | pending |
| 12-01-02 | 01 | 1 | COMBO-04 | query | `SELECT COUNT(*) FROM gl_agent_fuel_documents WHERE document_type='pairing_fuel' AND content ? 'practice_override_fields'` | N/A | pending |
| 12-02-01 | 02 | 2 | COMBO-01 | query | `SELECT COUNT(*) FROM gl_agent_fuel_documents WHERE document_type='pairing_fuel' AND content->>'why_together' IS NOT NULL` | N/A | pending |
| 12-02-02 | 02 | 2 | COMBO-03 | query | `SELECT COUNT(*) FROM gl_agent_fuel_documents WHERE document_type='pairing_fuel' AND content->>'what_not_to_say' IS NOT NULL` | N/A | pending |
| 12-03-01 | 03 | 3 | COMBO-02 | manual | Review queue content tone check | N/A | pending |

*Status: pending / green / red / flaky*

---

## Wave 0 Requirements

- [ ] Confirm live `gl_agent_fuel_documents` schema via Supabase MCP
- [ ] Confirm 16 existing `pairing_fuel` draft rows are present
- [ ] Confirm REVIEW_QUEUE cards are accessible for content extraction

*Existing infrastructure covers query verification — no framework install needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Education tone | COMBO-02 | Subjective language quality | Read 3 random fuel docs; confirm staff-facing education tone, not sales pitch |
| What-not-to-say accuracy | COMBO-03 | Clinical accuracy check | Verify what-not-to-say entries are clinically appropriate per pairing |
| Content grounding | COMBO-01 | Evidence quality | Spot-check 3 fuel docs for corpus-grounded claims vs LLM-invented claims |

---

## Validation Sign-Off

- [ ] All tasks have automated verify or manual verification defined
- [ ] Sampling continuity: every wave has at least one verification query
- [ ] Wave 0 confirms live schema before content generation
- [ ] No podcast attribution in any fuel doc content
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
