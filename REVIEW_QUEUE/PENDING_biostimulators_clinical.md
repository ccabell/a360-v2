# REVIEW: Biostimulators — Clinical Summary + Technique Guide (clinical lens)
**Doc IDs:**
- Clinical Summary: 67666118-7ed4-4627-b873-031b7666ee94
- Technique Guide: 68ae5ce6-948a-45d6-b71d-672adaeebfb0

**Category:** Biostimulators (ID: a6a854e2-7db1-4ec0-bac0-7b346454fca0)
**Status:** draft | Version: 1 | Compiled: 2026-06-12

---

## What to Review

1. **Nodule risk section** — Technique-dependent nature explained. Historical underdilution rates cited from peer-reviewed literature (Moyle 2004). Current standard: 5-9 mL dilution. Is this range current?
2. **5-5-5 rule** — Characterized as "[field practice]" convention, not formally studied. Appropriate?
3. **CaHA as category member** — Radiesse included in member differentiation but is NOT a demo product. Included for category completeness. Appropriate?
4. **Duration range** — "2+ years after full protocol" from FDA label Sculptra pivotal study at 25 months. Correct sourcing.

## Evidence Links Added

| Field | Source | Authority Rank |
|-------|--------|----------------|
| plla_fda_indications | FDA label | 1 |
| plla_duration | FDA label | 1 |
| plla_neocollagenesis_mechanism | PubMed (10.1111/j.1473-2165) | 2 |
| plla_nodule_dilution_correlation | PubMed (10.1111/j.1468-3083) | 2 |
| plla_collagen_mechanism_stein | PubMed (10.1111/dth.12285) | 2 |

## Approve

```sql
UPDATE agent_reference_docs
SET status = 'corrected', approved_by = 'chris', approved_at = now()
WHERE id IN (
  '67666118-7ed4-4627-b873-031b7666ee94',
  '68ae5ce6-948a-45d6-b71d-672adaeebfb0'
);
```
