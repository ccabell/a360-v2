# REVIEW: Body Contouring — Clinical Summary + Technique Guide (clinical lens)
**Doc IDs:**
- Clinical Summary: 2dcf1b98-2f00-4205-8fab-5e8b58175526
- Technique Guide: c9fb67b3-6122-4a9a-8116-16872d269daf

**Category:** Body Contouring (ID: d72803ce-814f-4905-8ce4-3d44323e9503)
**Status:** draft | Version: 1 | Compiled: 2026-06-12

---

## Critical Item: PAH Safety Disclosure

The clinical summary includes PAH as the primary safety concern (not buried). It is cited from FDA Safety Communication 2020 (authority rank 1). The clinical summary states:
- Prevalence estimate: ~1 in 2,000-4,000 treatments (FDA estimate, underreport caveat noted)
- Male sex, Hispanic ethnicity, BMI >30 as risk factors
- "Cannot be treated with additional CoolSculpting — requires surgical liposuction"
- Permanent disfiguring mass risk if untreated
- Must be disclosed in informed consent

Verify this level of detail is appropriate for the clinical lens.

## Absolute Contraindications (safety floor)

Clinical summary states as absolute contraindications:
- Cryoglobulinemia
- Cold agglutinin disease
- Paroxysmal cold hemoglobinuria

These are stated plainly per FDA label. Verify.

## Approve

```sql
UPDATE agent_reference_docs
SET status = 'corrected', approved_by = 'chris', approved_at = now()
WHERE id IN (
  '2dcf1b98-2f00-4205-8fab-5e8b58175526',
  'c9fb67b3-6122-4a9a-8116-16872d269daf'
);
```
