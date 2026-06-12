# REVIEW: RF Microneedling — Clinical Summary + Technique Guide (clinical lens)
**Doc IDs:**
- Clinical Summary: 77358d98-0c62-495a-90e2-487fe9f81a1d
- Technique Guide: bb289acc-bc72-4b27-855a-d41c9fb47056

**Category:** RF Microneedling (ID: 836bcdf0-aa49-4dae-9ced-bd9c4a027299)
**Status:** draft | Version: 1 | Compiled: 2026-06-12

---

## What to Review

1. **FDA clearance scope** — Morpheus8 cleared for: "moderate wrinkles and rhytides, acne, acne scarring, hyperhidrosis, sebaceous gland hyperplasia, cellulite." Verify against IFU.
2. **Fitzpatrick type safety** — Insulated needle mechanism for all skin types is explained technically. Is the PIH risk section appropriately flagged for clinical audience?
3. **Depth table** — Depths characterized as ranges (1-1.5mm, 2-3mm, 3-4mm) with clinical correlates. No precise dosing tables from A360. Gateway posture maintained.
4. **Energy settings** — "Set per skin type, treatment zone, and clinical objective" with pointer to manufacturer training. Appropriate gateway posture.

## Approve

```sql
UPDATE agent_reference_docs
SET status = 'corrected', approved_by = 'chris', approved_at = now()
WHERE id IN (
  '77358d98-0c62-495a-90e2-487fe9f81a1d',
  'bb289acc-bc72-4b27-855a-d41c9fb47056'
);
```
