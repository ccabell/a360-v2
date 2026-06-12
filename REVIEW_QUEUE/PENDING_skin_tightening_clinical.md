# REVIEW: Skin Tightening — Clinical Summary + Technique Guide (clinical lens)
**Doc IDs:**
- Clinical Summary: 36129552-10fb-4de1-88e0-24a034a8c972
- Technique Guide: 128e4ca9-5016-4709-ba8a-fca44988d0fe

**Category:** Skin Tightening (ID: 4eb4c667-16af-44ba-94c6-e85edffef558)
**Status:** draft | Version: 1 | Compiled: 2026-06-12

---

## What to Review

1. **Sofwave depth (1.5mm)** — Stated as mid-dermis. Technically this is consistent with published Sofwave data. Verify.
2. **FDA clearance** — "Non-invasive treatment of facial and neck lines and wrinkles, and improvement in the appearance of facial and neck skin laxity, eyebrow lifting." Verify accuracy.
3. **Standardized treatment protocols** — Technique guide notes Sofwave uses "preset energy protocols optimized for facial vs. neck" — less operator variability than some other platforms. Accurate per IFU?
4. **No topical anesthetic routinely required** — Stated for Sofwave due to integrated Sofcool cooling. Is this accurate for your clinical experience?

## Approve

```sql
UPDATE agent_reference_docs
SET status = 'corrected', approved_by = 'chris', approved_at = now()
WHERE id IN (
  '36129552-10fb-4de1-88e0-24a034a8c972',
  '128e4ca9-5016-4709-ba8a-fca44988d0fe'
);
```
