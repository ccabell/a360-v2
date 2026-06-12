# REVIEW: Dermal Fillers — Clinical Summary + Technique Guide (clinical lens)
**Doc IDs:**
- Clinical Summary: 02f611ad-cd03-464c-ab1a-a06bd4ead0cf
- Technique Guide: 202c5649-f39a-4cfb-a894-5913ad490b47

**Category:** Dermal Fillers (ID: 138ed383-364a-44a3-87a0-8e641ecd4200)
**Status:** draft | Version: 1 | Compiled: 2026-06-12

---

## What to Review

### Clinical Summary
1. **Boxed Warning framing** — Is the FDA vascular occlusion boxed warning stated plainly and authoritatively? This must not be hedged.
2. **Member Differentiation table** — Duration ranges are presented as approximations ("~18-24 months") with FDA label citation. Verify this is the right presentation (ranges, not precise numbers as A360 instruction).
3. **Gateway posture** — Verify no precise dosing tables appear. The clinical summary uses "ranges" throughout with pointers to FDA prescribing information.
4. **Off-label characterization** — Tear trough, jawline, temple, chin are labeled "[field practice] [consensus]" not as FDA-cleared. Correct.

### Technique Guide
1. **Dosing section** — Characterized as ranges only (e.g., "typically several syringes per side" with FDA pivotal study data cited). No precise A360-authored dosing table. Verify this is appropriate.
2. **Emergency preparedness section** — Hyaluronidase availability stated as mandatory. Is this the right language for a clinical dossier vs. a protocol document?
3. **Combination sequencing** — Neurotoxin before filler ("commonly") is described as one approach, "varies by indication and provider preference." Is this appropriately hedged?

## Evidence Links Added

| Field | Source | Authority Rank |
|-------|--------|----------------|
| ha_filler_boxed_warning | FDA label | 1 |
| voluma_xc_duration | FDA label | 1 |
| ha_filler_lidocaine | FDA label | 1 |
| ha_filler_rheology_differentiation | PubMed (10.1097/DSS) | 2 |
| ha_filler_vascular_occlusion | PubMed (10.1097/DSS) | 2 |
| ha_hygroscopic_mechanism | PubMed | 2 |
| ha_filler_late_nodules | PubMed | 2 |
| ha_cannula_technique_color | YouTube | 6 |

## Approve

```sql
UPDATE agent_reference_docs
SET status = 'corrected', approved_by = 'chris', approved_at = now()
WHERE id IN (
  '02f611ad-cd03-464c-ab1a-a06bd4ead0cf',
  '202c5649-f39a-4cfb-a894-5913ad490b47'
);
```
