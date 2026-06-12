# REVIEW: Pigment & Skin Rejuvenation — Clinical Summary + Technique Guide (clinical lens)
**Doc IDs:**
- Clinical Summary: f34284d6-192b-4981-95ea-5cbbd612fa76
- Technique Guide: fb9e21b8-5a67-4acc-a8ab-36459fe4c07c

**Category:** Pigment & Skin Rejuvenation (ID: b35c36c4-ee76-422d-89a6-0e7a4af568b9)
**Status:** draft | Version: 1 | Compiled: 2026-06-12

---

## Key Safety Items

1. **Eye protection** — "Mandatory for all laser treatments — patient and provider safety glasses matched to device wavelength." This is stated as a safety floor item (not hedged). Correct.
2. **Fitzpatrick stratification** — High-fluence treatment stratified by skin type. Test spots for Fitzpatrick IV+ recommended. PIH risk stated plainly.
3. **Melasma rebound warning** — Characterized as "chronic" condition requiring maintenance and sun protection. Not overpromising.

## Evidence Quality Note

The clinical summary includes an evidence quality note for the Korean/Asian literature base (Hollywood Peel efficacy comes primarily from Korean aesthetic dermatology published data). This is relevant for providers assessing the evidence behind the Hollywood Peel protocol specifically.

## Approve

```sql
UPDATE agent_reference_docs
SET status = 'corrected', approved_by = 'chris', approved_at = now()
WHERE id IN (
  'f34284d6-192b-4981-95ea-5cbbd612fa76',
  'fb9e21b8-5a67-4acc-a8ab-36459fe4c07c'
);
```
