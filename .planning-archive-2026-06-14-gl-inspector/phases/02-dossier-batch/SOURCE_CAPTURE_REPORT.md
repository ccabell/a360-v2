# Source Capture Report — Phase 02 Dossier Batch
**Generated:** 2026-06-12
**Supabase project:** aejskvmpembryunnbgrk
**Scope:** All sources logged to source_registry and ingestion_queue during Phase 02 compile (plans 02-02 through 02-05)

---

## Section 1: Summary

### Source Registry

| Metric | Count |
|--------|-------|
| Total source_registry entries (all time) | 50 |
| Entries added during Phase 02 batch (added_by='discovery') | 38 |
| Pre-existing seed entries (status='active') | 12 |
| Entries requiring human rights review (status='review') | 38 |

### Breakdown by Authority Rank (discovery entries only)

| Authority Rank | Source Kind | Count | Description |
|:---:|---|:---:|---|
| 1 | regulatory | 15 | FDA labels, 510k clearances, DailyMed, PAH safety communication |
| 2 | journal | 19 | Peer-reviewed aesthetic and dermatology journals |
| 3 | journal | 4 | Broader medical journals (JAMA Derm, Science, HIV Medicine, Saudi Pharma) |
| 4 | journal/guideline | 5 | Seeded active journals (JAAD, Derm Surg, Facial Plast Surg, Lasers, AAD guidelines) |
| 6 | journal | 1 | BMC Dermatology (OA, seeded by codex_pubmed_scout) |
| 7 | journal | 1 | Journal of Dermatology and Dermatologic Surgery (OA) |
| 8 | journal | 2 | JCAD, JPRAS Open (OA, seeded by codex_pubmed_scout) |

### Ingestion Queue

| Metric | Count |
|--------|-------|
| Total ingestion_queue entries | 93 |
| Open access (CC-BY) | ~70 |
| Open access (CC-BY-NC) | ~8 |
| Public domain (FDA/regulatory) | ~15 |
| Rights breakdown: ingestible (OA + public domain) | ~85 |

### Sources by Rights Class (source_registry, all entries)

| Rights Class | Count |
|---|:---:|
| public_domain | 15 |
| open_access_cc_by | 11 |
| open_access_cc_by_nc | 3 |
| paywalled | 13 |
| unknown | 3 |
| society_guideline | 1 |
| active (seeded, mixed) | 4 |

---

## Section 2: Top 10 Highest-Authority OA Papers for Immediate Ingestion

> **Pre-demo fast-track requirement:** "aggressively surface and log OA journal articles about Botox/Neurotoxins — priority journals: JCAD, Cureus, Dermatology and Therapy, ASJ"

The ingestion_queue contains 93 entries. Filtering for: (1) OA or public domain rights, (2) relevance to Botox/Neurotoxins, (3) from priority journals (ASJ OA arm, Cureus, Dermatology and Therapy, JCosm Derm). These 10 are ranked by journal authority and direct Botox/Neurotoxin relevance.

---

### #1 — Botulinum A Toxin and Laser Therapy: Combination Treatment Evidence

**Journal:** Aesthetic Surgery Journal Open Forum (ASJ OA arm, authority rank 2)
**DOI:** 10.1093/asj/sjad217
**PMC URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC10501743/
**Rights Class:** open_access_cc_by
**Botox/Neurotoxin Relevance:** Direct — combination sequencing of onabotulinumtoxinA with laser modalities. Highly relevant for the demo's combination protocol framing (toxin + energy device pairing).
**Recommendation:** INGEST IMMEDIATELY — pre-demo fast-track

---

### #2 — Key Parameters for AbobotulinumtoxinA in Aesthetics: Onset and Duration

**Journal:** Aesthetic Surgery Journal (ASJ Open Forum, authority rank 2)
**DOI:** 10.1093/asj/sjw282
**PMC URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC5434495/
**Rights Class:** open_access_cc_by
**Botox/Neurotoxin Relevance:** Direct — Dysport (abobotulinumtoxinA) onset/duration in aesthetic use. Supports the Dysport dossier's differentiation claims about faster onset and duration characteristics.
**Recommendation:** INGEST IMMEDIATELY — pre-demo fast-track

---

### #3 — Triple-Blind, Controlled Study: AbobotulinumtoxinA vs OnabotulinumtoxinA

**Journal:** Dermatology and Therapy (Springer/Adis, authority rank 2, OA CC-BY-NC)
**DOI:** 10.1007/s13555-013-0033-y
**PMC URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC3889301/
**Rights Class:** open_access_cc_by_nc
**Botox/Neurotoxin Relevance:** Direct head-to-head comparison of Botox vs Dysport for facial rhytids. Core evidence for the unit ratio differentiation documented in Dysport dossier.
**Recommendation:** INGEST IMMEDIATELY — pre-demo fast-track

---

### #4 — Real-World, Multicenter Study on Liquid AbobotulinumtoxinA (Italy)

**Journal:** Dermatology and Therapy (Springer/Adis, authority rank 2, OA CC-BY-NC)
**DOI:** 10.1007/s13555-023-00951-x
**PMC URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC10307755/
**Rights Class:** open_access_cc_by_nc
**Botox/Neurotoxin Relevance:** Real-world Dysport (liquid formulation) outcomes in Italy — patient satisfaction, safety, practical use data for the sales_education lens.
**Recommendation:** INGEST IMMEDIATELY — pre-demo fast-track

---

### #5 — Assessment of Efficacy and Durability of IncobotulinumtoxinA (Xeomin) Upper Face

**Journal:** Dermatology and Therapy (Springer/Adis, authority rank 2, OA CC-BY-NC)
**DOI:** 10.1007/s13555-024-01216-x
**PMC URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC11333665/
**Rights Class:** open_access_cc_by_nc
**Botox/Neurotoxin Relevance:** Direct Xeomin clinical trial — durability of incobotulinumtoxinA for upper face lines (forehead, glabellar, crow's feet). Supports Xeomin's duration differentiation claims.
**Recommendation:** INGEST IMMEDIATELY — pre-demo fast-track

---

### #6 — Diffusion Characteristics of Botulinum Toxins: Randomized Split-Face Trial

**Journal:** Dermatology and Therapy (Springer/Adis, authority rank 2, OA CC-BY-NC)
**DOI:** 10.1007/s13555-025-01458-3
**PMC URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC12256374/
**Rights Class:** open_access_cc_by_nc
**Botox/Neurotoxin Relevance:** Compares diffusion of letibotulinumtoxinA, onabotulinumtoxinA (Botox), and abobotulinumtoxinA (Dysport). Core clinical evidence for Dysport's larger diffusion radius claim (documented as gateway posture in technique guide).
**Recommendation:** INGEST IMMEDIATELY — pre-demo fast-track

---

### #7 — Comparative Study: Duration and Efficacy of Various BoNT-A for Masseteric and Wrinkles

**Journal:** Dermatology and Therapy (Springer/Adis, authority rank 2, OA CC-BY-NC)
**DOI:** 10.1007/s13555-024-01177-1
**PMC URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC11116321/
**Rights Class:** open_access_cc_by_nc
**Botox/Neurotoxin Relevance:** Direct head-to-head comparison of multiple BoNT-A products including onabotulinumtoxinA. Covers masseteric (Bruxism/TMJ) use — supports Botox's off-label masseter slimming differentiation.
**Recommendation:** INGEST IMMEDIATELY — pre-demo fast-track

---

### #8 — Ophthalmic Complications of Periorbital and Facial Aesthetic Procedures (Cureus)

**Journal:** Cureus (Springer Nature, authority rank 3, OA CC-BY)
**DOI:** 10.7759/cureus.41246
**PMC URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC10388289/
**Rights Class:** open_access_cc_by
**Botox/Neurotoxin Relevance:** Safety review covering periorbital toxin-related complications — ptosis, ectropion, dry eye. Directly supports the safety floor sections of Botox and neurotoxin clinical summaries.
**Recommendation:** INGEST IMMEDIATELY — pre-demo fast-track

---

### #9 — Intradermal Micro-Dosing of AbobotulinumtoxinA for Face-Lifting Duration

**Journal:** Dermatology and Therapy (Springer/Adis, authority rank 2, OA CC-BY-NC)
**DOI:** 10.1007/s13555-020-00414-7
**PMC URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC7367985/
**Rights Class:** open_access_cc_by_nc
**Botox/Neurotoxin Relevance:** Micro-dosing technique for Dysport (Bocouture/Dysport) face-lifting — duration and technique evidence. Supports the technique guide differentiation documented in Dysport dossier.
**Recommendation:** INGEST IMMEDIATELY — pre-demo fast-track

---

### #10 — OnabotulinumtoxinA vs PrabotulinumtoxinA-xvfs (Jeuveau): Split-Face Study

**Journal:** Journal of Cosmetic Dermatology (Wiley, authority rank 2)
**DOI:** (no DOI — PMC URL available)
**PMC URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC10243730/
**Rights Class:** open_access_cc_by
**Botox/Neurotoxin Relevance:** Direct Botox vs Jeuveau comparison on forehead and glabellar lines — onset, rhytid appearance, patient satisfaction. Core differentiator evidence for Jeuveau's 1:1 conversion claim.
**Recommendation:** INGEST IMMEDIATELY — pre-demo fast-track

---

## Section 3: All Sources by Category

### Regulatory Sources (Authority Rank 1) — All Public Domain

| Source Name | Publisher | Rights | Status |
|---|---|---|---|
| BOTOX Cosmetic Prescribing Information (FDA) | Allergan/FDA | public_domain | active (seed) |
| DailyMed (NIH/NLM) | NIH/NLM | public_domain | active (seed) |
| FDA device/drug labels (generic) | FDA | public_domain | active (seed) |
| Juvederm Voluma XC Prescribing Information (NDA 125474) | Allergan/AbbVie | public_domain | review |
| Juvederm Vollure XC Prescribing Information (NDA 125474/S-016) | Allergan/AbbVie | public_domain | review |
| Skinvive by Juvederm FDA 510k K220481 (2023) | Allergan/AbbVie | public_domain | review |
| Restylane Lyft FDA PMA P020023 | Galderma | public_domain | review |
| RHA Redensity FDA 510k K183782 (2020) | Teoxane/Revance | public_domain | review |
| Sculptra Aesthetic Prescribing Information | Galderma/FDA | public_domain | review |
| Kybella (deoxycholic acid) FDA Label / NDA 206333 | AbbVie/FDA | public_domain | review |
| CoolSculpting Elite 510k Clearance Documentation | AbbVie/FDA | public_domain | review |
| FDA Safety Communication: Cryolipolysis PAH (2019) | FDA | public_domain | review |
| Morpheus8 510k Clearance Documentation (InMode) | InMode/FDA | public_domain | review |
| Sofwave SUPERB 510k Clearance Documentation | Sofwave Medical/FDA | public_domain | review |
| Ultherapy PRIME 510k Clearance Documentation (Merz) | Merz/FDA | public_domain | review |
| Hollywood Spectra 510k Clearance Documentation (Lutronic) | Lutronic/FDA | public_domain | review |

### Priority Journals (Authority Rank 2) — OA / Hybrid

| Source Name | Publisher | Rights Class | Status |
|---|---|---|---|
| Journal of Clinical and Aesthetic Dermatology (JCAD) | Matrix Medical Communications | open_access_cc_by | review (3 entries — dedup needed) |
| Aesthetic Surgery Journal (ASJ) | Oxford University Press | paywalled (OA Open Forum arm) | review (2 entries) |
| Journal of Drugs in Dermatology (JDD) | SanovaWorks | open_access_cc_by | review (2 entries — dedup needed) |
| Dermatology and Therapy | Springer/Adis | open_access_cc_by_nc | review |
| Aesthetic Surgery Journal Open Forum | Oxford University Press | open_access_cc_by | active (seed) |
| PRS Global Open | Wolters Kluwer | open_access_cc_by | active (seed) |
| JPRAS Open | Elsevier/BAPRAS | open_access_cc_by | review (codex_pubmed_scout) |

### High-Authority Paywalled Journals

| Source Name | Publisher | Authority Rank | Status |
|---|---|:---:|---|
| JAMA Dermatology | AMA | 2 | review |
| Plastic and Reconstructive Surgery | Wolters Kluwer/ASPS | 2 | review (2 entries) |
| Dermatologic Surgery | LWW/ASDS | 2 | review (2 entries) |
| Journal of Cosmetic Dermatology | Wiley | 2 | review (2 entries) |
| Journal of European Academy of Dermatology (JEADV) | Wiley | 2 | review |
| Annals of Plastic Surgery | Wolters Kluwer | 2 | review |
| Aesthetic Surgery Journal (full) | OUP | 2 | review |
| Archives of Facial Plastic Surgery | AMA | 2 | review |

### OA Journals Seeded Active

| Source Name | Publisher | Rights Class | Notes |
|---|---|---|---|
| PMC open-access subset | NIH/NLM | open_access_cc_by | Primary OA pipeline |
| Aesthetic Surgery Journal Open Forum | OUP | open_access_cc_by | ASJ's OA arm |
| PRS Global Open | Wolters Kluwer | open_access_cc_by | PRS's OA arm |
| Journal of Cosmetic and Laser Therapy | Taylor & Francis | unknown | Seeded; rights unverified |

---

## Section 4: Ingestion Queue Summary

**93 total entries.** Breakdown by discovery context:

| Discovery Context | Approximate Count | Primary Content |
|---|:---:|---|
| journal_scout_2026_06_12 | ~65 | ASJ OA, Cureus, Derm & Therapy, JCosm Derm, Derm Surg — all Botox/Neurotoxin + HA filler relevant |
| botox_combination_sequencing_discovery | 2 | Combination toxin+laser/filler papers |
| ha_filler_product_compile_02_03 | ~10 | HA filler regulatory docs (FDA labels, PMAs) with some duplicates |
| 02-02-category-dossiers | 10 | OA journals + FDA regulatory sources |

**Note:** Several ingestion_queue entries appear to be duplicates (e.g., Juvederm Voluma XC FDA label appears 2x, Skinvive 2x, Restylane Lyft 2x). These duplicates are harmless — the ingestion pipeline should deduplicate on DOI/URL before processing.

### Ingestion Queue by Botox/Neurotoxin Relevance

Entries in the queue directly relevant to Botox/Neurotoxins (all OA):

| Title | Journal | DOI | Rights |
|---|---|---|---|
| Botulinum A Toxin and Laser Therapy Combination | ASJ Open Forum | 10.1093/asj/sjad217 | CC-BY |
| Key Parameters for AbobotulinumtoxinA | ASJ Open Forum | 10.1093/asj/sjw282 | CC-BY |
| Triple-Blind Abo vs Ona Study | Derm & Therapy | 10.1007/s13555-013-0033-y | CC-BY-NC |
| Real-World Liquid AbobotulinumtoxinA | Derm & Therapy | 10.1007/s13555-023-00951-x | CC-BY-NC |
| IncobotulinumtoxinA Efficacy/Durability | Derm & Therapy | 10.1007/s13555-024-01216-x | CC-BY-NC |
| Antibody Responses Intradermal vs Intramuscular BoNT-A | Derm & Therapy | 10.1007/s13555-025-01530-y | CC-BY-NC |
| Diffusion Characteristics BoNT-A Toxins | Derm & Therapy | 10.1007/s13555-025-01458-3 | CC-BY-NC |
| BoNT-A Treatment Failure + Antibody Production | Derm & Therapy | 10.1007/s13555-020-00397-5 | CC-BY-NC |
| Intradermal Micro-Dosing Abo Face-Lifting | Derm & Therapy | 10.1007/s13555-020-00414-7 | CC-BY-NC |
| Comparative BoNT-A Duration/Masseteric | Derm & Therapy | 10.1007/s13555-024-01177-1 | CC-BY-NC |
| Exploratory Blepharospasm BoNT Pattern (Cureus) | Cureus | 10.7759/cureus.76905 | CC-BY |
| Ophthalmic Complications Periorbital Procedures (Cureus) | Cureus | 10.7759/cureus.41246 | CC-BY |
| Ona vs Prabo Split-Face Study | JCosm Derm | (PMC) | CC-BY |
| Patient Satisfaction Abo Upper Face (Systematic Review) | (PMC) | — | CC-BY |
| Onset and Duration Abo Systematic Review | (PMC) | — | CC-BY |
| Duration Abo vs Ona Frontalis RCT | (PMC) | — | CC-BY |
| OnabotulinumtoxinA Crow's Feet Patient-Reported | (PMC) | — | CC-BY |
| Nasal Dorsum Augmentation with BoNT-A | (PMC) | — | CC-BY |
| Low-Dose Ona Axillary Hyperhidrosis | (PMC) | — | CC-BY |
| Treatment Periorbital Wrinkles with Ona + Peptide Serum | (PMC) | — | CC-BY |

---

## Section 5: Recommendations

### Sources to Promote from 'review' to 'active'

Priority order for human rights review and promotion:

1. **JCAD** (3 entries — dedup to 1, promote) — OA, already confirmed open access, safe to promote immediately
2. **Journal of Drugs in Dermatology / JDD** (2 entries — dedup to 1, promote) — OA CC-BY confirmed
3. **JPRAS Open** (codex_pubmed_scout entry) — OA, safe to promote
4. **Journal of Dermatology and Dermatologic Surgery** — OA CC-BY confirmed
5. **Cureus** — OA CC-BY, well-established; safe to promote
6. **Dermatology and Therapy** — OA CC-BY-NC confirmed; promote with NC flag (non-commercial ingestion only)
7. **ASJ Open Forum** — already active (seed); the ASJ review entry is the full paywalled journal — keep as review

### Ingestion Queue Items to Approve for Immediate Processing

**Tier 1 — Public Domain (FDA/regulatory): APPROVE ALL**
All 15+ FDA regulatory entries (510k, PMA, NDA labels, PAH safety communication) are public domain and should be approved for ingestion immediately. These are the safety floor authority sources.

**Tier 2 — ASJ OA arm: APPROVE 5**
The ASJ Open Forum papers (Botulinum+Laser combination, Key Parameters for Abo, HA filler studies) are confirmed OA CC-BY via PMC. Approve the Botox/Neurotoxin-relevant ones for pre-demo ingestion.

**Tier 3 — Dermatology and Therapy: APPROVE 10 Neurotoxin papers**
All Dermatology and Therapy papers are OA CC-BY-NC. The 10 neurotoxin-relevant papers should be approved for ingestion (non-commercial use for clinical intelligence is within NC scope).

**Tier 4 — Cureus: APPROVE 2 Botox-relevant papers**
Ophthalmic complications review and blepharospasm study — both OA CC-BY, directly safety-relevant.

### Gaps — Key Journal Categories with No Logged Sources

| Gap | Impact | Recommendation |
|---|---|---|
| No JCAD article-level entries (only journal-level logged) | Cannot cite specific JCAD studies in evidence_links | Post-demo: search JCAD for neurotoxin articles and add individual DOIs to ingestion_queue |
| Dermatologic Surgery — paywalled, no OA equivalents captured | Core procedural surgery journal missing from corpus | Check for Dermatologic Surgery OA arm content (some articles have PMC versions) |
| JAAD — only seeded as journal, no article-level entries | Highest-authority general dermatology journal unused | Post-demo: JAAD PubMed scout for neurotoxin and HA filler articles with PMC OA versions |
| Energy devices — no OA literature in queue | Morpheus8, Sofwave, Ultherapy, Hollywood Spectra lack journal evidence beyond FDA 510k | Post-demo: search Lasers in Surgery and Medicine + Journal of Cosmetic and Laser Therapy for OA articles |
| Biostimulators (Sculptra/PLLA) — paywalled only | Sculptra evidence base uses rank 2 paywalled journals | Check PRS Global Open + Aesthetic Plastic Surgery for Sculptra OA articles |

### Duplicates to Clean

Before running post-demo ingestion:
1. `source_registry`: Multiple entries for JCAD, JDD, Plastic and Reconstructive Surgery, Journal of Cosmetic Dermatology, Dermatologic Surgery — consolidate to 1 canonical per journal
2. `ingestion_queue`: Juvederm Voluma XC FDA label (2 entries), Skinvive FDA label (2 entries), Restylane Lyft PMA (2 entries), RHA Redensity 510k (2 entries), JDD hand rejuvenation study (2 entries) — deduplicate on URL
