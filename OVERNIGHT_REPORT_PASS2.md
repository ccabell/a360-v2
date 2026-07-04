# Overnight Report — Discovery Research Pass (Pass 2)
**Date:** 2026-06-12  
**Target DB:** `aejskvmpembryunnbgrk` (Global V3)  
**Scope:** Source registry + discovery research on calibration dossier weak claims  
**Status:** COMPLETE (with refinement) — awaiting Chris review

---

## 1. Migration Results

| Migration | Status | What it does |
|-----------|--------|--------------|
| `0003_source_registry` | APPLIED | `source_rights` enum + `source_registry` table + 13 seed rows |
| `0004_ingestion_queue` | APPLIED | `ingestion_queue` table |
| `0005_research_log` | APPLIED | `research_log` table |
| `0006_fuel_status_corrected` | APPLIED (additive) | Added `'corrected'` value to `fuel_status` enum |

**0006 note:** `agent_reference_docs.status` uses the `fuel_status` enum (draft/active/archived). The instructions called for setting corrected claims to `status='corrected'` but that value didn't exist. Added it additively rather than leaving the doc at 'draft' with no signal.

All tables verified present after migration. Total migrations in history: 5.

---

## 2. Source Registry

**Seeded at migration time:** 13 rows (all `status='active'`, `added_by='seed'`)

| name | authority_rank | rights_class | ingestible |
|------|---------------|--------------|------------|
| FDA device/drug labels | 1 | public_domain | YES |
| DailyMed (NIH/NLM) | 1 | public_domain | YES |
| PMC open-access subset | 2 | open_access_cc_by | YES (per-article) |
| Aesthetic Surgery Journal Open Forum | 2 | open_access_cc_by | YES |
| PRS Global Open | 2 | open_access_cc_by | YES |
| JPRAS Open | 2 | open_access_cc_by | YES |
| Aesthetic Plastic Surgery | 2 | unknown | NO (per-article verify) |
| Journal of Cosmetic and Laser Therapy | 2 | unknown | NO (per-article verify) |
| Dermatologic Surgery | 4 | paywalled | NO (cite-only) |
| JAAD | 4 | paywalled | NO (cite-only) |
| Lasers in Surgery and Medicine | 4 | paywalled | NO (cite-only) |
| Facial Plastic Surgery & Aesthetic Medicine | 4 | paywalled | NO (cite-only) |
| AAD/BAD/EADV Clinical Guidelines | 4 | society_guideline | NO (cite-only) |

**Discovery-added rows (status='review', added_by='discovery'):** 1

| name | authority_rank | rights_class | reason |
|------|---------------|--------------|--------|
| Aesthetic Surgery Journal | 2 | unknown | Found PMC10501743 (10.1093/asj/sjad217) during energy device research. Regular ASJ (distinct from Open Forum). This specific article appears open-access via PMC but journal is hybrid. Needs per-article license confirmation before ingesting. |

**Total registry rows: 14**

---

## 3. Discovery Research — Corrected Claims

**This is the most important section. Two claims in the Botox technique guide (`79aaa679`) were wrong, not just under-cited. Review these diffs first.**

---

### Claim A — Botox + Filler Sequencing

**Trigger:** `combination_sequencing` section — `sources=1, indep=1, top_rank=6, attention=YES`  
**Trigger reason:** `rank6_safety` (clinical technique claim backed only by field practice)

**Queries run:**
- "Carruthers 2016 botulinum toxin hyaluronic acid filler combination sequencing consensus Dermatologic Surgery"
- "Urdiales-Gálvez 2019 botulinum toxin filler combination sequencing order aesthetic treatment"

**Sources found:**

| source | doi | pmid | authority_rank | rights_class | ingestible |
|--------|-----|------|---------------|--------------|------------|
| Carruthers et al. 2016 — Consensus Recommendations for Combined Aesthetic Interventions in the Face Using Botulinum Toxin, Fillers, and Energy-Based Devices | 10.1097/DSS.0000000000000754 | 27100962 | 4 | paywalled (Derm Surg) | NO — cite-only |
| Optimizing Facial Aesthetics: Sequential Application of BoNT-A and Dermal Fillers (2024) | 10.1097/PSN.0000000000000546 | 38166310 | 2 | open_access_cc_by (PMC) | YES — queued |

**Outcome: CORRECTED**

**BEFORE:**
```
- Botox + HA filler same session: common and well-established. Inject Botox first (smaller
  volume, less tissue displacement), then filler.
- Botox 2 weeks before filler: allows relaxation to establish, giving more accurate volume
  assessment.
```

**AFTER:**
```
- Botox + HA filler same session: common and well-established. Either order is supported;
  injecting Botox first (smaller volume, less tissue displacement) is one valid approach.
- Botox before filler (staged): when treating in separate sessions, spacing 1–2 weeks apart
  allows side-effect resolution and result assessment before the next treatment. The sequence
  order is not clinically mandated for relaxation accuracy — same-session treatment in either
  order is well-supported by consensus.
```

**Why this matters:** The dossier implied Botox must precede filler by 2 weeks for the specific purpose of "allowing relaxation to establish for more accurate volume assessment." This is not what the authoritative consensus says. Carruthers et al. 2016 (expert panel, Derm Surg) states BoNT and fillers may be performed same-session in **either sequence**. When staged, the 1–2 week interval is for "resolution of side effects and/or to assess results" — not for relaxation-based volume accuracy. Both the specific timing claim ("must be 2 weeks before") and the stated reason ("relaxation → volume assessment") were wrong. The correction leaves the 2-week staged option intact but removes the false causal framing.

**Evidence links added:** `ad72cdf5` (Carruthers 2016, rank 4, cite-only)

---

### Claim B — Botox + Energy Device Denaturation

**Trigger:** `combination_sequencing` section — same section as Claim A  
**Trigger reason:** `rank6_safety` (safety-adjacent claim: "could denature the toxin")

**Queries run:**
- "laser heat denature inactivate botulinum toxin clinical evidence radiofrequency same session timing"
- "Semchyshyn 2005 does laser inactivate botulinum toxin findings conclusions Dermatologic Surgery"

**Sources found:**

| source | doi | pmid | authority_rank | rights_class | ingestible |
|--------|-----|------|---------------|--------------|------------|
| Semchyshyn & Kilmer 2005 — Does Laser Inactivate Botulinum Toxin? | 10.1111/j.1524-4725.2005.31105 | 15871314 | 4 | paywalled (Derm Surg) | NO — cite-only |
| Botulinum A Toxin and Laser Therapy: Evidence and Recommendations for Combination Treatment (2023, PMC10501743) | 10.1093/asj/sjad217 | — | 2 | open_access_cc_by (PMC) | YES — queued |
| Jiang 2023 — Does microneedle fractional radiofrequency inactivate BoNT/A? | 10.1111/jocd.15826 | — | 2 | unknown (JCLT) | pending verify |

**Outcome: CORRECTED**

**BEFORE:**
```
- Botox + energy device: typically space 2 weeks apart. Heat from devices (RF, laser) could
  theoretically denature the toxin protein if applied to the same area immediately after
  injection.
```

**AFTER:**
```
- Botox + energy device (same session): standard nonablative lasers, IPL, and RF devices can
  be used same-day as Botox without significant loss of efficacy; clinical studies show no
  meaningful toxin inactivation at typical treatment settings. Exception: microneedle fractional
  RF (MFR) has a modest antagonistic effect on BoNT that resolves within ~3 days — space at
  least 3 days. MFU-V (e.g., Ultherapy): perform before injectables when same-day.
```

**Why this matters:** The dossier stated that heat "could theoretically denature the toxin protein" and recommended 2-week spacing. The evidence directly contradicts this: Semchyshyn & Kilmer 2005 (prospective study, 19 subjects, VBeam/SmoothBeam/CoolGlide/IPL/RF tested) found **no decrease in BoNT efficacy** when devices were applied within 10 minutes of injection. The 2-week spacing recommendation has no literature basis for standard devices. The theoretical denaturation concern has been tested and does not occur at clinical treatment parameters. Two real exceptions exist and are now in the dossier: (1) microneedle fractional RF has a genuine antagonistic effect (3-day window) and (2) MFU-V should be performed before injectables when same-day.

**Evidence links added:** `0dcabeeb` (Semchyshyn 2005, rank 4, cite-only)

---

## 4. Ingestion Queue

| title | doi | url | rights_class | discovered_during | status |
|-------|-----|-----|--------------|-------------------|--------|
| Botulinum A Toxin and Laser Therapy: Evidence and Recommendations for Combination Treatment | 10.1093/asj/sjad217 | https://pmc.ncbi.nlm.nih.gov/articles/PMC10501743/ | open_access_cc_by | botox_combination_sequencing_discovery | queued |

**1 item queued. Not ingested — awaiting your approval.**

Note: The Carruthers 2016 and Semchyshyn 2005 papers are both in Dermatologic Surgery (paywalled). They have been added as evidence_links with citation attribution but will never enter the ingestion queue. Their facts are incorporated into the corrected prose and their PMIDs/DOIs are in evidence_links for traceability.

---

## 5. Research Log

2 entries written to `research_log`:
- `botox.technique_guide.combination_sequencing — filler order/timing bullet` — outcome: corrected
- `botox.technique_guide.combination_sequencing — energy device bullet` — outcome: corrected

Both records contain: trigger_reason, queries run, full sources_found JSONB (name/doi/pmid/rank/rights/ingestible), before_text, after_text, evidence_link_ids.

---

## 6. Other Changes

### Botox FDA evidence_links — authority_rank backfilled
The 10 FDA-sourced evidence_links for the Botox offering previously had `authority_rank = NULL`. All backfilled to rank 1 as reported in Pass 1 recommendations.

### 36 NULL authority_rank rows remain in the database
These are from other products/categories — not the calibration dossiers and not in scope for this pass. The NULL backfill was scoped to Botox FDA rows only. Before batch compilation, a global backfill of `authority_rank = 1 WHERE source = 'fda_label' AND authority_rank IS NULL` would clean this up.

---

## 7. Claims Examined But Not Corrected

The following sections were attention-flagged in Pass 1 but did **not** require correction — they are single-source or consensus-only claims that are accurate, just lightly evidenced:

| section | trigger | finding |
|---------|---------|---------|
| `class_planning` (category) | single-source clinical | Reconstitution volumes are manufacturer-specified; single strong IFU source is appropriate here. No correction needed. |
| `injection_planes` (Botox) | single-source clinical | Same — reconstitution and dilution protocols are manufacturer/IFU. |
| `planning` (Botox) | single-source clinical | First-visit protocol is consensus practice, not a refutable study claim. Accurately presented. |
| `shared_mechanism` (category) | single-source (rank 2) | The 2023 Medicine review (doi:10.1097/MD.0000000000032372) is a comprehensive mechanism review. Single-source but high-quality. No factual error found. |
| `cost_benefit*` (both) | rank 6, non-clinical | Explicitly non-clinical content. No clinical evidence exists for value framing. Correct to have rank 6. |
| `selection_framework`, `comparison_anchors` | single-source | Practitioner consensus, accurately represented as such. |

---

## 8. Sources Worth Adding to the Registry Permanently

These were found during discovery and are high-value for the aesthetics corpus:

| source | why | action |
|--------|-----|--------|
| **Carruthers et al. 2016** (PMID 27100962) | Definitive expert consensus on combination treatment sequencing for BoNT + fillers + energy devices. Will be relevant for every product with combination guidance. | Already cite-only in Derm Surg — the registry entry covers it. No new row needed. |
| **Semchyshyn & Kilmer 2005** (PMID 15871314) | Authoritative clinical test of the BoNT + laser safety question. Will be needed for every neurotoxin product that mentions energy device combination. | Same — Derm Surg covers it. |
| **PMC10501743 — BoNT + Laser review 2023** | Comprehensive, current review with device-specific guidance. Ingestible. | **Approve for ingestion** — it's in the queue. Most immediately useful source from this pass. |
| **Jiang 2023 — MFR + BoNT** (doi:10.1111/jocd.15826) | Only paper specifically addressing microneedle fractional RF antagonism. Relevant for any practice using MFR devices. | Add to registry from JCLT (Journal of Cosmetic and Laser Therapy — already in registry as `unknown`). Verify per-article license and queue if CC-BY. |

---

## 9. Decisions Made Without Chris

1. **Added `fuel_status` enum value 'corrected':** The enum only had draft/active/archived. Rather than leaving corrected docs at 'draft' with no signal, added the value additively (migration 0006). This is the right call — it's what the pipeline architecture specified.

2. **Scoped NULL backfill to Botox FDA rows only:** There are 36 NULL authority_rank rows across the database. I backfilled only the Botox FDA rows that Pass 1 specifically flagged. A global backfill is a separate, broader action that needs explicit scope.

3. **Urdiales-Gálvez 2019 not confirmed:** The Pass 2 prompt expected a specific Urdiales-Gálvez 2019 paper (ISAPS hybrid, CC-BY) to be the correction source for the filler sequencing claim. My searches found that the Carruthers 2016 consensus is the authoritative source for this correction, but the specific 2019 Urdiales-Gálvez paper about combination sequencing could not be confirmed via search. The correction stands regardless — it's grounded in Carruthers 2016 at rank 4.

4. **Ingestion queue rights_class set to open_access_cc_by for PMC10501743:** The paper is on PMC with full free text. ASJ as a journal is hybrid/paywalled, but this specific article appears CC-BY. Marked as CC-BY in the queue. If you approve, the ingestion step should verify the article-level license on PMC before pulling.

---

## 10. Summary Counts

| item | before | after | delta |
|------|--------|-------|-------|
| migrations applied | 1 | 5 | +4 |
| source_registry rows | 0 | 14 | +14 (13 seed + 1 discovery) |
| ingestion_queue rows | 0 | 1 | +1 |
| research_log rows | 0 | 2 | +2 |
| evidence_links (combination_sequencing) | 0 | 2 | +2 |
| corrected docs | 0 | 1 | +1 (Botox technique guide) |
| Botox FDA evidence_links with NULL rank | 6 | 0 | −6 (backfilled to rank 1) |

---

---

## 3b. Claim B Refinement (post-review)

After initial correction, a second research pass resolved that the energy device bullet had two distinct physics problems conflated together. The BoNT+energy and HA filler+energy interactions have different mechanisms and different rules.

**Additional sources found:**

| source | doi | pmid | authority_rank | rights_class | ingestible |
|--------|-----|------|---------------|--------------|------------|
| Urdiales-Gálvez et al. 2019 — Concomitant Use of HA and Laser in Facial Rejuvenation | 10.1007/s00266-019-01393-7 | — | 2 | open_access_cc_by (CC-BY 4.0) | YES — queued |
| Alam et al. 2006 — RF after HA/CaHA filler pilot trial | 10.1002/lsm.20275 | 16532442 | 4 | paywalled (Lasers Surg Med) | NO — cite-only |

**Outcome: CORRECTED (refinement of prior correction)**

**BEFORE (post-Pass-2-initial):**
```
- Botox + energy device (same session): standard nonablative lasers, IPL, and RF devices can
  be used same-day as Botox without significant loss of efficacy; clinical studies show no
  meaningful toxin inactivation at typical treatment settings. Exception: microneedle fractional
  RF (MFR) has a modest antagonistic effect on BoNT that resolves within ~3 days — space at
  least 3 days. MFU-V (e.g., Ultherapy): perform before injectables when same-day.
```

**AFTER:**
```
- Botox + energy device (same session): standard nonablative lasers, IPL, and RF devices do
  not meaningfully inactivate BoNT at clinical settings. Safe same-day. Exception: microneedle
  fractional RF (MFR) has a modest antagonistic effect that resolves within ~3 days — space
  at least 3 days.
- HA filler + energy device (same session): perform the energy/laser treatment first, then
  inject filler. Energy delivered after fresh HA placement risks thermal degradation of the
  material.
- HA filler + energy device (staged, filler placed first): when filler was placed in a prior
  session, ~2 weeks before energy treatment is supported as safe and produces no gross or
  histologic change to filler or surrounding skin.
- MFU-V (e.g., Ultherapy): always perform before injectables when same-day, regardless of
  whether toxin or filler is being injected.
```

**Evidence links added:** `f1e53e9c` (Urdiales-Gálvez 2019, rank 2), `4caa06b0` (Alam 2006, rank 4)  
**Ingestion queue:** Urdiales-Gálvez 2019 added (2 items queued total now)  
**Research log:** entry 3 written

**Final combination_sequencing evidence summary:**

| doi | source | rank | rights | backs |
|-----|--------|------|--------|-------|
| 10.1097/DSS.0000000000000754 | Carruthers 2016 | 4 | cite-only | filler sequencing — either order, 1-2wk staging |
| 10.1111/j.1524-4725.2005.31105 | Semchyshyn 2005 | 4 | cite-only | BoNT + energy: no inactivation |
| 10.1007/s00266-019-01393-7 | Urdiales-Gálvez 2019 | 2 | ingestible | HA filler + energy same-day: energy first |
| 10.1002/lsm.20275 | Alam 2006 | 4 | cite-only | HA filler + energy staged: 2wk safe |

Section went from `sources=1, indep=1, top_rank=6` → `sources=4, indep=4, top_rank=2`. Attention flag cleared.

---

## 11. What's Next (After Chris Reviews)

**Review first — the corrections:**
1. Read the diffs for Claim A and Claim B above. Confirm the corrected combination_sequencing prose in doc `79aaa679` reads correctly and reflects your clinical intent.
2. Decide whether to approve `79aaa679` to active or keep at 'corrected' pending further work.

**Approve or reject the ingestion queue:**
3. Review the 1 queued item (`PMC10501743` — BoNT + Laser review). If approved, run the ingestion pipeline to pull, chunk, and embed it into the CMS project. This will make it available for future compile passes without re-researching.

**Source registry:**
4. Review the 1 `status='review'` source registry row (Aesthetic Surgery Journal). Confirm the doi_prefix and per-article rights policy. If you have OUP access, verify whether 10.1093/asj/sjad217 is CC-BY.

**Global NULL backfill (optional):**
5. 36 evidence_links across the database still have NULL authority_rank. Consider a global `UPDATE evidence_links SET authority_rank = 1 WHERE source = 'fda_label' AND authority_rank IS NULL` before batch compile.

**When calibration looks good:**
6. Run batch Phase 1 (remaining 6 categories), then Phase 2 (products).

---

## 12. Calibration Dossier — Final State

`combination_sequencing` section is now the best-evidenced section in the dossier:
- 4 independent sources, top rank 2, all four claims grounded in primary evidence or expert consensus
- Doc `79aaa679` (Botox technique guide) at `status='corrected'` — promote to `active` after your review
- Carruthers 2016 note: canonical multimodal consensus from 2016, no superseding comprehensive paper found through 2026. Revisit in ~1 year.

**STOPPED. Awaiting review.**
