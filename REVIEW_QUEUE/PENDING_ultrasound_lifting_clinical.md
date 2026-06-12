# REVIEW: Ultrasound Lifting — Clinical Summary + Technique Guide (clinical lens)
**Doc IDs:**
- Clinical Summary: 76f2cc7d-1216-4b7b-ae49-90addfa26c9b
- Technique Guide: 0b47b7aa-fbd6-4ec4-9dae-c0e5b869536f

**Category:** Ultrasound Lifting (ID: 1c9acf3e-8753-4bd3-af98-9372c994eec3)
**Status:** draft | Version: 1 | Compiled: 2026-06-12

---

## What to Review

1. **FDA clearance statement** — "Non-invasive brow lifting, improvement in lines and wrinkles on the neck and chest (decolletage), and lifting of lax tissue on the neck and under the chin." Verify against current Ultherapy PRIME 510k.
2. **SMAS depth characterization** — 4.5mm transducer at SMAS level. Verify this is the correct depth cited in published literature and IFU.
3. **Transducer depths** — 1.5mm, 3.0mm, 4.5mm described as available options. Verify current Ultherapy PRIME transducer lineup.
4. **Lines per session** — "Typically 600-900 lines" is characterized as a range. Gateway posture: "varies by treatment area and transducer combination." Appropriate?
5. **Nerve proximity AE** — Transient nerve-related AEs noted as "rarely" occurring. Appropriate characterization?

## Key Evidence
- Alam M et al. J Am Acad Dermatol 2010: RCT with ~1.7mm statistically significant brow elevation. This is the pivotal clinical paper behind the FDA clearance narrative. Authority rank 2.

## Approve

```sql
UPDATE agent_reference_docs
SET status = 'corrected', approved_by = 'chris', approved_at = now()
WHERE id IN (
  '76f2cc7d-1216-4b7b-ae49-90addfa26c9b',
  '0b47b7aa-fbd6-4ec4-9dae-c0e5b869536f'
);
```
