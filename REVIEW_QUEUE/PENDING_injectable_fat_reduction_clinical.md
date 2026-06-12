# REVIEW: Injectable Fat Reduction — Clinical Summary + Technique Guide (clinical lens)
**Doc IDs:**
- Clinical Summary: 391a8d21-d810-4998-94aa-2df7ad347592
- Technique Guide: 2227735b-c23d-438c-a97c-029987d81859

**Category:** Injectable Fat Reduction (ID: b51855e7-73a2-498b-b1c4-4fdc739635a2)
**Status:** draft | Version: 1 | Compiled: 2026-06-12

---

## Critical Item: Marginal Mandibular Nerve

The clinical summary identifies marginal mandibular nerve injury as the critical adverse event (4.3% in pivotal studies, authority rank 1). The technique guide specifies injection field boundaries to protect this nerve. Review:
- Superior boundary: "no more than 1-1.5 cm below the mandible"
- These margins are characterized from FDA label guidance — verify accuracy

## Safety Floor Items (stated authoritatively, not hedged)

From FDA label:
1. Nerve injury: 4.3% in trials, resolved in all cases (median 44 days)
2. Dysphagia: rare, temporary
3. Alopecia risk at hairline
4. Necrosis from superficial injection

## Technique Safety Posture

Technique guide includes mandatory anatomical marking section. The injection field boundaries are described as protecting the marginal mandibular nerve. This is the most important technique safety element for Kybella.

## Approve

```sql
UPDATE agent_reference_docs
SET status = 'corrected', approved_by = 'chris', approved_at = now()
WHERE id IN (
  '391a8d21-d810-4998-94aa-2df7ad347592',
  '2227735b-c23d-438c-a97c-029987d81859'
);
```
