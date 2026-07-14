# Phase 06: Pairing Corpus Query Log

**Generated:** 2026-06-13
**Purpose:** Reproducibility log for all CMS corpus queries used during 8-gate evaluation
**CMS Project:** gjqicqldjgvrwmtkliie (podcast 202K chunks, YouTube 148K, PubMed 37K, industry 87K)

---

## Query Method

**Primary source:** PHASE_6_ANSWERS_PODCAST_SOURCED.md — pre-mined corpus intelligence from 4 parallel search agents running ~100 searches across 10 keyword families on 2026-06-13. This document contains verbatim expert quotes with full attribution (speaker, show, episode title) sourced from the CMS corpus.

**Pre-mining coverage:**
- Agent 1 (Canonical Combos): ~10 searches — episode FTS + chunk ilike for combination treatments, liquid facelift, stacking, multi-modality, neurotoxin+filler
- Agent 2 (Timing & Safety): ~10 searches — chunks for same session, same visit, sequencing, contraindication, complication, spacing
- Agent 3 (Sales & Education): ~12 searches — upsell, cross-sell, bundling, good/better/best, comprehensive treatment, average ticket
- Agent 4 (Product-Specific Pairings): 15 targeted product-pair ilike searches

**Search methods used:**
1. Full-text search (FTS) on `podcast_episodes.fts_episode` — episode discovery by title/description
2. Substring search (ilike) on `podcast_chunks.chunk_text` — content within transcripts
3. Full-text search (FTS) on `podcast_transcripts_vectorized.fts_document` — legacy transcript coverage
4. Episode metadata resolution — `podcast_episodes` -> `podcast_shows` joins for attribution
5. Neighboring chunk retrieval — chunks at index +-3 for full conversational context

---

## Batch 1: Neurotoxin x HA Filler (25 pairs)

### Category-level queries (applied to all 25 pairs)

| RPC | Query String | Result Signal | Source Document |
|-----|-------------|---------------|-----------------|
| podcast_chunks ilike | `botox*juvederm` | HIGH — 20+ chunks across 8+ shows | PHASE_6_ANSWERS Q7.1 #1 |
| podcast_chunks ilike | `neurotoxin*filler` | HIGH — multiple shows | PHASE_6_ANSWERS Q2.1 Gate 2 |
| episode FTS | `combination+treatment` | HIGH — Tracy Mancuso stacking episode + others | PHASE_6_ANSWERS Q4.3 |
| podcast_chunks ilike | `same%20session` | HIGH — same-session matrix entries | PHASE_6_ANSWERS Appendix A |
| episode FTS | `liquid+facelift` | HIGH — multiple shows discussing neurotoxin+filler | PHASE_6_ANSWERS Q1.1 |

### Key evidence found
- 90-woman dose-ranging study: "Combination one, hands down" (episode b2b96f9e)
- Dr. Teri Fisher: "Botox immobilizes muscles, minimizing movement and allowing fillers to last longer"
- Multiple experts confirm neurotoxin first, then filler in same session
- France legal flag: same-session prohibition (Dr. Martschin, Ep 169)

---

## Batch 2: Neurotoxin x Biostimulator (5 pairs)

### Category-level queries

| RPC | Query String | Result Signal | Source Document |
|-----|-------------|---------------|-----------------|
| podcast_chunks ilike | `sculptra*botox` | MEDIUM — several episodes | PHASE_6_ANSWERS Q7.1 |
| podcast_chunks ilike | `biostimulat*` | HIGH — multiple shows | PHASE_6_ANSWERS Q1.1 |
| podcast_chunks ilike | `collagen*stimulat*` | HIGH — multiple experts | PHASE_6_ANSWERS Q2.1 Gate 3 |

### Key evidence found
- "They should be starting biostimulators the minute they're done having babies... then we should be just using our HAs for structure"
- Neurotoxin relaxes muscles; Sculptra stimulates collagen for long-term volume — complementary mechanisms on different timelines

---

## Batch 3: Neurotoxin x Energy Device (20 pairs)

### Category-level queries

| RPC | Query String | Result Signal | Source Document |
|-----|-------------|---------------|-----------------|
| episode FTS | `stacking` | HIGH — Tracy Mancuso stacking episode | PHASE_6_ANSWERS Q7.3 |
| podcast_chunks ilike | `treatment%20stacking` | HIGH — temperature layering framework | PHASE_6_ANSWERS Q2.1 Gate 2 |
| podcast_chunks ilike | `morpheus*botox` | LOW — limited product-specific discussion | PHASE_6_ANSWERS Agent 4 |
| podcast_chunks ilike | `energy%20device*injectable` | MEDIUM — general sequencing discussion | PHASE_6_ANSWERS Q3.3 |

### Key evidence found
- Tracy Mancuso: IPL -> ultrasound -> RF microneedling -> neurotoxin -> filler (full stacking protocol)
- "Energy devices first, injectables after" (general sequencing rule)
- Temperature layering framework: low/moderate/high heat + injectables

---

## Batch 4: HA Filler x Biostimulator (5 pairs)

### Category-level queries

| RPC | Query String | Result Signal | Source Document |
|-----|-------------|---------------|-----------------|
| podcast_chunks ilike | `sculptra*filler` | HIGH — 15+ chunks across 5+ shows | PHASE_6_ANSWERS Q7.1 #2 |
| podcast_chunks ilike | `sculpt*lift` | MEDIUM — Galderma protocol | PHASE_6_ANSWERS Q7.1 |
| podcast_chunks ilike | `foundation*structure` | MEDIUM — metaphor used by multiple experts | PHASE_6_ANSWERS Q2.1 |

### Key evidence found
- "Sculpt & Lift" protocol well-documented (Galderma campaign)
- Dr. Tom van Eijk: "Restylane fern pattern + Sculptra subdermal" same-session protocol
- Foundation + pillars metaphor: Sculptra = concrete foundation, HA = structural detail

---

## Batch 5: HA Filler x Energy Device (20 pairs)

### Category-level queries

| RPC | Query String | Result Signal | Source Document |
|-----|-------------|---------------|-----------------|
| podcast_chunks ilike | `filler*laser` | MEDIUM — general discussion | PHASE_6_ANSWERS Agent 4 |
| podcast_chunks ilike | `filler*microneedling` | MEDIUM — texture + volume | PHASE_6_ANSWERS Q2.1 |
| podcast_chunks ilike | `energy%20first*inject` | MEDIUM — sequencing rules | PHASE_6_ANSWERS Q3.3 |

### Key evidence found
- "If you inject a patient with filler or Sculptra and their skin looks like crap, they will not be that happy" — skin foundation before injectables
- Energy devices address skin quality/texture that filler cannot

---

## Batch 6: Biostimulator x Energy Device (4 pairs)

### Category-level queries

| RPC | Query String | Result Signal | Source Document |
|-----|-------------|---------------|-----------------|
| podcast_chunks ilike | `sculptra*microneedling` | HIGH — multiple experts | PHASE_6_ANSWERS Q7.1 #3 |
| podcast_chunks ilike | `biostimulator*energy` | MEDIUM — industry trend | PHASE_6_ANSWERS Q7.1 #9 |
| podcast_chunks ilike | `sculptra*morpheus` | MEDIUM — specific combination | PHASE_6_ANSWERS Q1.1 |

### Key evidence found
- "I love it in combination treatment with something like a radiofrequency microneedling so that you get skin tightening from that RF microneedling. You get even more fibroblast stimulation and then some volume restoration from the Sculptra."
- Dr. Magdalena Bejma: Biostimulator + RF Microneedling + Laser same-day protocol
- "Everybody was trying to figure out what the magic sauce is of throwing them together" — industry trend

---

## Batch 7: Neurotoxin x Body/Fat/Skincare (15 pairs)

### Category-level queries

| RPC | Query String | Result Signal | Source Document |
|-----|-------------|---------------|-----------------|
| podcast_chunks ilike | `botox*hydrafacial` | LOW — minimal direct discussion | General search |
| podcast_chunks ilike | `neurotoxin*coolsculpt` | ZERO — different body areas | General search |
| podcast_chunks ilike | `botox*kybella` | LOW — minimal overlap | General search |

### Key evidence found
- HydraFacial -> injectable conversion: 45% go on to get injectable treatment (HydraFacial data)
- Neurotoxin + body contouring: different treatment areas, no clinical synergy discussed

---

## Batch 8: HA Filler x Body/Fat/Skincare (15 pairs)

### Category-level queries

| RPC | Query String | Result Signal | Source Document |
|-----|-------------|---------------|-----------------|
| podcast_chunks ilike | `filler*hydrafacial` | LOW — minimal | General search |
| podcast_chunks ilike | `filler*coolsculpting` | ZERO — different areas | General search |

### Key evidence found
- No direct expert discussion of HA filler + body contouring combinations
- HydraFacial as skin prep may have indirect value before filler

---

## Batch 9: Energy x Energy cross-device (6 pairs)

### Category-level queries

| RPC | Query String | Result Signal | Source Document |
|-----|-------------|---------------|-----------------|
| episode FTS | `stacking` | HIGH — temperature layering | PHASE_6_ANSWERS Q2.1 Gate 2 |
| podcast_chunks ilike | `morpheus*sofwave` | LOW — limited direct | General search |
| podcast_chunks ilike | `temperature%20layer` | MEDIUM — Tracy Mancuso framework | PHASE_6_ANSWERS Q7.3 |

### Key evidence found
- Tracy Mancuso temperature layering: different heat levels target different collagen responses
- Multi-energy protocols exist but are generally discussed at category level, not product-specific

---

## Batch 10: Energy x Body/Fat/Skincare (12 pairs)

### Category-level queries

| RPC | Query String | Result Signal | Source Document |
|-----|-------------|---------------|-----------------|
| podcast_chunks ilike | `morpheus*hydrafacial` | LOW — minimal | General search |
| podcast_chunks ilike | `laser*coolsculpting` | ZERO — different areas | General search |

### Key evidence found
- Limited direct evidence for cross-area energy + body/skincare combinations

---

## Batch 11: Body/Fat/Skincare x Body/Fat/Skincare (3 pairs)

### Category-level queries

| RPC | Query String | Result Signal | Source Document |
|-----|-------------|---------------|-----------------|
| podcast_chunks ilike | `coolsculpting*kybella` | LOW — some discussion | General search |
| podcast_chunks ilike | `kybella*hydrafacial` | ZERO | General search |

### Key evidence found
- CoolSculpting + Kybella: both address submental fat via different mechanisms (cryo vs deoxycholic acid)
- Kybella declining product flag (being replaced by Agnes RF per podcast sources)

---

## Batch 12: Neurotoxin x Neurotoxin — same-category alternatives (10 pairs)

### Category-level queries

| RPC | Query String | Result Signal | Source Document |
|-----|-------------|---------------|-----------------|
| podcast_chunks ilike | `botox*dysport` | HIGH — substitution discussions | PHASE_6_ANSWERS Q1.2 |
| episode FTS | `neurotoxin` | HIGH — multiple comparison episodes | PHASE_6_ANSWERS Q1.2 |

### Key evidence found
- Dr. David Eccleston: "I might use two different toxins in the same session on the same patient because of their little subtle nuances"
- Alternatives are discussed as substitution choices with decision frameworks, not combinations to market

---

## Batch 13: HA Filler x HA Filler — same-category alternatives (10 pairs)

### Category-level queries

| RPC | Query String | Result Signal | Source Document |
|-----|-------------|---------------|-----------------|
| podcast_chunks ilike | `voluma*vollure` | MEDIUM — layering discussion | PHASE_6_ANSWERS Q7.1 |
| podcast_chunks ilike | `restylane*fern` | MEDIUM — Dr. Tom van Eijk | PHASE_6_ANSWERS Appendix A |
| podcast_chunks ilike | `skinvive` | MEDIUM — different purpose (skin quality) | General search |

### Key evidence found
- Dr. Tom van Eijk: Restylane fern pattern + different HA at different depths (same session)
- Voluma (deep/cheeks) + Vollure (mid-depth/NLF) = different tissue depths, potentially conditional layering
- SKINVIVE is microdroplet skin quality, distinct from volumizing fillers

---

## Batch 14: Biostimulator x Body/Fat (2 pairs)

### Category-level queries

| RPC | Query String | Result Signal | Source Document |
|-----|-------------|---------------|-----------------|
| podcast_chunks ilike | `sculptra*coolsculpting` | ZERO — no direct discussion | General search |
| podcast_chunks ilike | `sculptra*kybella` | ZERO — no direct discussion | General search |

### Key evidence found
- No direct expert discussion of Sculptra + body contouring combinations

---

## Batch 15: Biostimulator x Skincare (1 pair)

### Category-level queries

| RPC | Query String | Result Signal | Source Document |
|-----|-------------|---------------|-----------------|
| podcast_chunks ilike | `sculptra*hydrafacial` | ZERO — no direct discussion | General search |

### Key evidence found
- No direct expert discussion; skincare prep value is indirect

---

*Log generated: 2026-06-13*
*All queries documented for reproducibility per D-17/D-18*
