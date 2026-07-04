---
phase: 15
slug: runtime-stabilization
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-06-14
---

# Phase 15 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — no unit/integration test framework installed in project |
| **Config file** | none |
| **Quick run command** | `npx next build` (type-check only) |
| **Full suite command** | Manual: run agent-tester page, observe SSE in DevTools, check agent_runs in Supabase |
| **Estimated runtime** | ~30 seconds (build), ~60 seconds (manual verification) |

---

## Sampling Rate

- **After every task commit:** Run `npx next build` for type-check
- **After every plan wave:** Manual browser test against dev server
- **Before `/gsd:verify-work`:** Full manual verification per checklist below
- **Max feedback latency:** 30 seconds (build)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 15-01-01 | 01 | 1 | RUN-01 | type-check | `npx next build` | N/A | ⬜ pending |
| 15-01-02 | 01 | 1 | RUN-02 | manual | Browser: agent loads from Supabase | N/A | ⬜ pending |
| 15-01-03 | 01 | 1 | RUN-03 | manual | Browser: tools return real data in SSE | N/A | ⬜ pending |
| 15-02-01 | 02 | 2 | RUN-04 | manual | Browser: failed tool shows error, run continues | N/A | ⬜ pending |
| 15-02-02 | 02 | 2 | RUN-05 | manual | Supabase: agent_runs row has structured error | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- No test framework to install — all verifications are manual for Phase 15
- Type-checking via `npx next build` is the only automated gate

*Existing infrastructure does not cover phase requirements with automated tests.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Agent loads from Supabase, not mock | RUN-01, RUN-02 | No test framework; requires live Supabase | 1. Open agent-tester page 2. Select agent from dropdown 3. Verify agent name matches Supabase `agents` table 4. Click Run 5. Verify SSE events in DevTools Network tab |
| Tools return real data | RUN-03 | Requires live Supabase connections | 1. Run agent with patient selected 2. Check SSE events for tool_call and tool_result events 3. Verify tool_result contains non-empty data |
| Failed tool doesn't kill run | RUN-04 | Requires simulating tool failure | 1. Run agent with invalid patient_id or missing CMS key 2. Verify stream continues past failed tool 3. Verify final output acknowledges missing data |
| Structured error on failure | RUN-05 | Requires checking Supabase | 1. Trigger a failing run 2. Check `agent_runs` row in Supabase 3. Verify `output` JSON has `error`, `failed_tools`, `recommendation` fields |

---

## Validation Sign-Off

- [ ] All tasks have manual verification instructions
- [ ] Type-check passes (`npx next build`)
- [ ] At least one successful agent run observed in browser
- [ ] At least one failed tool scenario verified
- [ ] `agent_runs` row verified in Supabase dashboard
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
