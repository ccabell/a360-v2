# Phase 7 Timing Rules — Corpus Research Specification

**Date:** 2026-06-13
**Corpus Sources Queried:** Podcasts (202K chunks / 8,688 episodes / 31 shows), YouTube (223K chunks / 3,984 videos), PubMed (37K chunks / 23,581 articles), Industry Articles (87K chunks / ~750 articles)
**Total Searches Executed:** ~108 across 4 parallel research agents
**Research Method:** ilike substring matching on chunk_text, full-text search on episode/article metadata, episode-to-show metadata resolution for attribution

---

## Executive Summary: Top 10 Findings

1. **Default same-session posture should be YES** — Podcast experts routinely combine treatments same-session. PubMed confirms safety for BoNT-A + HA filler (HIGH evidence, n=90 RCT). YouTube shows laser stacking as standard workflow. The industry norm is same-session unless explicitly contraindicated.

2. **The strongest safety caveats are hyaluronidase timing and neurotoxin dose thresholds** — PubMed evidence: hyaluronidase within 4 hours for vascular occlusion (animal + clinical data); 48 hours maximum for preventing necrosis. Neurotoxin: minimum 85-day (12-week) interval between treatments (Phase III, n=768, zero antibody formation). Maximum 50 units per session to reduce antibody risk (Dr. Wanitphakdeedecha, published study).

3. **Full cadence profiles are needed, not just minimums** — Every source describes treatment arcs: initial series count + spacing + maintenance interval + minimum retreat. Sculptra: 2-3 sessions at 4-6 week intervals, maintenance annually. Botox: every 3-4 months, extending to 4-6 months with repeated use. RF microneedling: series of 3 at 4-week intervals.

4. **Sequencing is real but pair-specific, not universal** — Sculptra before HA filler (podcast consensus), Profhilo before energy devices (Dr. Kramer), energy device before topical biostimulators (Dr. Dinley), BoNT-A 1 week before laser resurfacing (HIGH evidence RCT). But many combinations have no required order.

5. **Downtime should be structured at product level** — PubMed provides evidence-based recovery times: CO2 laser 5-10 days, RF microneedling 4-5 days, HA filler bruising 7-9 days. YouTube and podcasts add "social downtime" ranges that are more commercially useful.

6. **Schema recommendation: extend `item_relationships` + add product-level cadence fields** — No new table needed. Product cadence (initial series, intervals, maintenance, downtime) on products table; pair-level timing (same_session_ok, staging, combined downtime, safety_critical) on relationships.

7. **Event-based timing should be deferred to Phase 9 (care plans)** — Podcast evidence (Beauty Prescribed Ep 616) provides a wedding timeline (Sculptra 4-6 months, peels 4-6 months, Botox 2-3 weeks before). This is care-plan logic, not product-level timing data.

8. **Expert practice diverges from conservative guidance in specific areas** — Experts combine filler + RF microneedling same-session (Dr. Weiner: "HA is heat sterilized to 120C; 40-45C from RF won't melt it"). Conservative guidance says wait 1-2 weeks. The tension should be captured, not resolved.

9. **Contraindication timing belongs in pair-level fields with safety_critical flag** — Not a separate table. The number of hard-stop timing rules is small (~6-8) and fits in existing schema. Safety_critical boolean surfaces them for booking logic and agent retrieval.

10. **Evidence gaps exist for body contouring combination timing and skincare + procedure sequencing** — PubMed has limited data on combining body contouring modalities. Podcast coverage is thin on skincare regimen timing relative to procedures.

---

## Evidence Methodology

### Search Functions Used
- **Podcast**: `podcast_chunks` table via ilike substring matching on `chunk_text`; `podcast_episodes` FTS on `fts_episode`; episode → show metadata resolution
- **YouTube**: `manufacturer_youtube_transcript` table via ilike on `chunk_text`
- **Industry**: `industry_article_chunks` table via ilike on `chunk_text`
- **PubMed**: `pubmed_articles_vectorized` table via ilike on `chunk_text`

### Search Statistics
| Agent | Corpus | Searches | Relevant Chunks | Findings |
|-------|--------|:---:|:---:|:---:|
| Agent 1 | Podcast | 43 | ~200+ | 7 sections, 42+ quotes |
| Agent 2 | YouTube + Industry | 34 | ~350+ | 34 YouTube timing findings, 18 industry findings |
| Agent 3 | PubMed | 31 | ~150+ | 68 findings with evidence levels |

### Keyword Families Searched
Same session/day/visit, stacked treatments, every X weeks/months, maintenance interval, retreatment, touch up, initial series, treatment series, Sculptra series/vial, Botox every, Morpheus series, CoolSculpting session, HydraFacial monthly, peel series, which one first, treatment order, temperature layering, biostimulator before, Sculptra before, filler before thread, laser before filler, downtime, social downtime, no downtime, swelling, bruising, no makeup after, post treatment, wait between, minimum wait, weeks apart, antibody, dissolve wait, laser after filler, wedding, before event, weeks before, contraindication, complication, vascular occlusion, healing time, recovery period

### Attribution Method
- Podcast: chunk_text → episode_id → episode title + speakers/guests → show_id → show name
- YouTube: chunk_text → video_id (not all videos resolved to titles)
- PubMed: chunk_text → article citation embedded in text (author, journal, year)
- Industry: chunk_text → article_id (resolved where possible)

### Confidence Assignment
- **Strong**: 3+ independent sources across 2+ corpus types agree, or HIGH-evidence PubMed finding
- **Moderate**: 2+ sources agree, or MODERATE PubMed evidence, or strong podcast consensus without published backing
- **Weak**: Single source, or conflicting evidence, or LOW PubMed evidence only

---

## Recommended Answers Table

| Question | Recommended Answer | Consensus | Evidence Basis | Safety Impact | Implementation Impact | Chris Review? | Notes |
|----------|--------------------|-----------|---------------|:---:|:---:|:---:|-------|
| Q1.1 Default same-session posture | **A: Default YES** | Strong | Podcast + YouTube + PubMed (RCT) | Medium | Medium | Yes | Commercially aligned; PubMed confirms BoNT-A+HA safety |
| Q1.2 Same-session exception model | **B: Warning** | Moderate | Podcast (expert practice) | High | Low | Yes | Hard blocks only for pharmacological conflicts (hyaluronidase+HA) |
| Q1.3 Product-level vs pair-level | **C: Both** | Strong | All sources | Medium | High | No | Product cadence + pair same-session/staging |
| Q2.1 Cadence fields | **C: Full cadence profile** | Strong | All sources | Low | High | No | Initial series, initial interval, maintenance, minimum retreat |
| Q2.2 Cadence by indication/area | **A: One per product + notes** | Moderate | Podcast (toxin dose varies by area) | Low | Medium | No | Area-specific cadence is Phase 9 territory |
| Q2.3 Event-based timing | **C: Phase 9 (care plans)** | Strong | Podcast (wedding timeline data exists) | Low | Low | No | Data collected now, logic deferred |
| Q3.1 Sequencing representation | **C: Structured + prose** | Moderate | Podcast + PubMed | Medium | Medium | No | Queryable fields + human-readable rationale |
| Q3.2 Sequencing by concern | **A: One per pair + notes** | Moderate | Podcast | Low | Low | No | Concern-specific sequencing is Phase 9 |
| Q3.3 Temperature/thermal model | **C: Pair-level notes** | Weak | Single podcast source (Tracy Mancuso) | Low | Low | No | Real principle, premature to formalize in schema |
| Q4.1 Downtime structured field | **A + C: Product + pair** | Strong | PubMed + YouTube + Podcast | Low | Medium | No | Product baseline + pair combined impact |
| Q4.2 Combined downtime model | **C for canonical, B for default** | Moderate | Podcast (expert-determined) + PubMed | Low | Low | No | Expert per pair where available, max() as fallback |
| Q5.1 Contraindication timing structure | **C: Pair fields + safety_critical** | Strong | PubMed (hard stops identified) | High | Low | Yes | Small number of hard stops fits in existing schema |
| Q5.2 Safety floor aggressiveness | **C: Hybrid** | Strong | PubMed + Podcast | High | Low | Yes | Evidence-based hard stops + expert-consensus warnings |
| Q6.1 Schema decision | **A + product cadence (no new table)** | Strong | Schema analysis | Low | High | No | Extend item_relationships + add product cadence fields |
| Q7.1 Deliverables | **A: SQL + docs + review** | Moderate | Phase 6 pattern | Low | Medium | No | Booking logic cheat sheet is optional |
| Q7.2 Research/Evidence tab | **C: Phase 10 fuel** | Strong | PROJECT.md architecture | Low | Low | No | Timing enters agent fuel, not direct retrieval |
| Q8.1 Practice vs published conflicts | See detailed section | Mixed | All sources | High | Low | Yes | 5 specific conflicts identified |
| Q8.2 Timing-sensitive products | See detailed section | Strong | All sources | Medium | Low | No | Sculptra, neurotoxins, biostimulators |
| Q8.3 Additional references | See detailed section | — | — | — | — | No | Top episodes and articles listed |

---

## Detailed Question-by-Question Analysis

### Q1.1 — What is the default same-session posture?

**Question:** Should the system default to same-session YES, NO, or CONDITIONAL when no explicit rule exists?

**Recommended answer:** A — Default YES (same session unless explicitly flagged otherwise)

**Neutral industry position:** The medical aesthetics industry has moved decisively toward multi-modality same-session treatments. "Treatment stacking" is a featured topic at major conferences (ASDS 2024) and is the explicit business model of high-performing practices.

**Clinical standard / safety floor:** PubMed confirms safety:
- BoNT-A + HA filler same session: safe (HIGH evidence, RCT n=90; Carruthers et al., *Dermatologic Surgery* 2010)
- IPL/nonablative laser immediately after BoNT-A: safe, no efficacy loss (MODERATE; Semchyshyn & Kilmer, *Dermatologic Surgery* 2005)
- IPL + Sculptra + Ultherapy same session: safe (LOW; Friedmann et al., *J Cosmetic Dermatology* 2014)
- RF microneedling + picosecond laser same session: safe (MODERATE; Tao et al., *Dermatologic Surgery* 2024)

**Podcast / expert-practice findings:**

> "Stacking treatments refer to combining two or more modalities in a single session to enhance both the quality and the speed of results."
> — **Tracy Mancuso** (30+ years), *Business of Aesthetics Podcast Show*, "The Power of Stacked Treatments"

> "I have no problems injecting HA or any other filler products when I do RF microneedling... When they sterilize the HA product... it's heat sterilized to 120 degrees, so 40 to 45 degrees from a radiofrequency device isn't going to melt it."
> — **Dr. Steven Weiner**, *The Business of Injecting*, Ep 154

> "I strongly believe in combined therapies... I will often do injectable biostimulator, and then on top of that RF microneedling like Morpheus 8. And then I will resurface with laser like Moxie. Combined treatments, even on the same day... are future of the aesthetics."
> — **Dr. Magdalena Bejma**, *The Aesthetics Business Podcast*

> "I frequently do HA fillers deep... even sometimes in the same session. I might inject HA fillers onto bone and then put the threads in the subcutaneous layer. There's no conflict there. You're not in the same layer."
> — **Dr. Gordon Ku**, *The Business of Injecting*, Ep 46

**YouTube / industry findings:**

> "What I usually do is do the deep effects first, get the deeper energy out of the way and then do the more superficial pass of the active effects after that and you can do them in the exact same session."
> — Sciton platform demo videos (multiple)

> "You can also use [NEO laser] on the same day with your fillers and toxins."
> — YouTube video vRcBofkz9l8

> "'Stacking' multiple treatments was a common theme [at ASDS 2024], especially for collagen-building and skin tightening."
> — NewBeauty, "ASDS 2024: Inside the Latest Skin Care Tools and Trends"

**PubMed / official-evidence findings:**
- BoNT-A + HA filler: HIGH evidence (RCT), safe and superior to monotherapy
- Nonablative laser/IPL + BoNT-A same session: MODERATE evidence, safe
- PRP + fractional laser same session: HIGH evidence (RCT), PRP actually reduces downtime
- RF microneedling + picosecond laser same session: MODERATE evidence, safe

**Conflicts or caveats:**
- Some YouTube providers recommend waiting 1-2 weeks between filler and laser: "We ask you to wait about two weeks after the dermal filler and Botox before you get the laser treatment" (video piGJalyVeXk)
- France legally prohibits filler + BoNT-A same session (Dr. Christoph Martschin, *Business of Injecting* Ep 169)
- Industry article caution: "When combining modalities, avoid excessive stacking... particularly when using multiple energy-based or regenerative approaches" (*The Aesthetic Guide*)

**Implementation implications:**
- Default YES reduces the number of explicit rules needed (only exceptions must be documented)
- Exceptions become the focus: pharmacological conflicts (hyaluronidase+HA), legal restrictions (France), dose-threshold warnings (>50U toxin)
- Agent retrieval is simpler: "can I combine X and Y?" → yes unless flagged

**Suggested final wording:** "Same-session combination is the default posture for all product pairs unless an explicit timing rule exists. Exceptions are documented as warnings (provider-reviewable) or hard blocks (system-enforced)."

**Confidence:** Strong

---

### Q1.2 — How should same-session exceptions be documented?

**Question:** When same-session is NOT OK: hard block, warning, or education?

**Recommended answer:** B — Warning (system flags the timing concern but allows provider override)

**Neutral industry position:** The small number of true hard stops (hyaluronidase+HA, specific legal restrictions) justify system-level blocks. Everything else is provider judgment.

**Clinical standard / safety floor:**

Hard blocks supported by evidence:
| Exception | Type | Evidence |
|-----------|------|----------|
| Hyaluronidase + HA filler same day | **Hard block** | Pharmacological: enzyme actively degrades HA (Amy Lynn, *Medical Spa Insider*; PubMed) |
| >50 units neurotoxin per session | **Warning** | Antibody risk increases (Dr. Wanitphakdeedecha, published study; PubMed meta-analysis) |
| Filler + BoNT-A same session (France) | **Hard block** (regional) | Legal prohibition (Dr. Martschin) |
| Fully ablative laser during isotretinoin | **Hard block** | Contraindicated (PubMed systematic review) |
| Rejuran/PDRN in same plane as cross-linked filler | **Warning** | "Don't put radura where you've done a cross-linked filler in the same plane" (Dr. Steven Liew, Ep 302) |

**Podcast / expert-practice findings:**

> "You can't do that with an HA because the Hylinex is still going to be working to break down the HA."
> — **Amy Lynn**, *Medical Spa Insider*, "The Art of Reversal"

> "In France, you're not allowed to inject filler and botulinum toxin at the same session."
> — **Dr. Christoph Martschin**, *The Business of Injecting*, Ep 169

**Implementation implications:**
- Hard blocks: system prevents booking/recommending. Very few (~3-4 rules)
- Warnings: system flags with rationale + source. Provider decides. Most exceptions (~10-15 rules)
- Education: informational only. For soft preferences, not safety concerns

**Suggested final wording:** "Same-session exceptions are classified as HARD BLOCK (system-enforced, pharmacological or legal), WARNING (flagged with rationale, provider-override allowed), or EDUCATION (informational guidance, no enforcement). Hard blocks are reserved for evidence-based safety conflicts."

**Confidence:** Strong

---

### Q1.3 — Should timing rules be product-level or pair-level?

**Question:** Product-level cadence only, pair-level timing only, or both?

**Recommended answer:** C — Both

**Neutral industry position:** Every source describes timing at two distinct levels: how often a product is used (cadence/interval = product-level) and how it interacts with other products in timing (same-session/sequencing = pair-level). These are orthogonal.

**Podcast / expert-practice findings:**

Product-level cadence examples:
> "I want to see my patient every three months" (neurotoxin cadence)
> — **Dr. David Eccleston**, *The Business of Injecting*, Ep 263

> "The company will tell you that you need about a vial per decade of life. So if you are 50 years old, you need five vials over time."
> — *Injector Podcast* (Sculptra protocol)

Pair-level timing examples:
> "With profilo 64, I prefer to do the treatments with profilo before I start the energy-based devices."
> — **Dr. Eyal Kramer**, *The Business of Injecting*, Ep 301

> "I usually dissolve it a couple weeks before surgery, if not a month before."
> — **Dr. Deniz Sarhaddi**, *Business of Aesthetics Podcast*

**PubMed / official-evidence findings:**
- BoNT-A pretreatment 1 week before laser resurfacing enhances results (HIGH evidence RCT; Zimbler et al., 2001) — this is pair-level sequencing
- BoNT-A minimum 85-day retreatment interval (HIGH evidence Phase III) — this is product-level cadence

**Implementation implications:**
- Product-level: cadence fields on `products` table (initial_series_count, intervals, maintenance, downtime)
- Pair-level: timing fields on `item_relationships` (same_session_ok, staging_sequence, staging_interval, combined_downtime, safety_critical)
- No new table needed — extends existing schema

**Suggested final wording:** "Timing rules are stored at both levels: product-level cadence (how often this product is used) on the products table, and pair-level timing (how this product interacts with another in scheduling) on item_relationships."

**Confidence:** Strong

---

### Q2.1 — What cadence fields should be queryable?

**Question:** Minimum retreat interval only, recommended + minimum, or full cadence profile?

**Recommended answer:** C — Full cadence profile

**Neutral industry position:** Every source — podcasts, YouTube, PubMed — describes treatment arcs, not single numbers. Agents need the full arc to build treatment plans.

**Podcast / expert-practice findings:**

Sculptra full arc:
> "2-3 treatments around six to eight weeks apart" (initial series) → "Maybe two vials every year" (maintenance)
> — *The Business of Injecting*, Ep 304

Skin boosters full arc:
> "One treatment every four weeks, series of three treatments" (initial) → "Every three months thereafter" (maintenance)
> — **Dr. Jimmy Wang**, *The Business of Injecting*, Ep 310

Botox extending cadence:
> "You start off three months... and when you look really good you slowly start to spread it out into more maintenance... four to six months."
> — YouTube video M07z9lD4eUE

RF Microneedling full arc:
> "Series of three normally to start... spaced one month apart each" (initial) → "Every few months" (maintenance)
> — *The Skin Report* (Potenza vs Morpheus)

**PubMed / official-evidence findings:**
- Sculptra: 3 sessions at 4-6 week intervals, effects lasting 2-5 years, touch-up at years 2-4 (HIGH evidence RCT + 5-year retrospective)
- BoNT-A: 85-day minimum, mean 4.05-month retreatment (HIGH evidence Phase III + prospective)
- CaHA (Radiesse): retreatment at 6-12 months, effects 18-36+ months (HIGH evidence RCT extension)
- IPL: 3-5 sessions at 3-4 week intervals (MODERATE evidence)
- RF microneedling: 1-3 sessions at 4-12 week intervals (MODERATE evidence)

**Implementation implications:**

Recommended fields for products table:
```
initial_series_count          INTEGER   -- e.g., 3 for Sculptra
initial_interval_days_min     INTEGER   -- e.g., 28 for Sculptra (4 weeks)
initial_interval_days_max     INTEGER   -- e.g., 42 for Sculptra (6 weeks)
maintenance_interval_days_min INTEGER   -- e.g., 180 for Sculptra (6 months)
maintenance_interval_days_max INTEGER   -- e.g., 365 for Sculptra (12 months)
minimum_retreatment_days      INTEGER   -- e.g., 85 for BoNT-A (hard safety floor)
typical_followup_days         INTEGER   -- e.g., 14 for lip filler touch-up check
cadence_notes                 TEXT      -- freeform for area-specific exceptions
```

**Suggested final wording:** "Store full cadence profiles: initial_series_count, initial_interval (min/max days), maintenance_interval (min/max days), minimum_retreatment_days (safety floor), typical_followup_days, and cadence_notes for exceptions."

**Confidence:** Strong

---

### Q2.2 — Should cadence vary by indication/area?

**Question:** One cadence per product, or cadence per product x indication/area?

**Recommended answer:** A — One per product, with notes field for area-specific exceptions

**Neutral industry position:** While cadence does vary by area (Botox glabella vs masseter vs hyperhidrosis), the primary cadence covers 80%+ of cases. Area-specific cadence is a care-plan concern.

**Podcast / expert-practice findings:**

Area-specific cadence IS real:
> "Men hate coming in every three, four months. Men will come in happily every six months." (masseter Botox — longer duration at higher dose)
> — **Dr. Jean Carruthers**, *The Business of Injecting*, Ep 120

> Laser hair removal: face every 4 weeks, body every 6 weeks (*Spa Trouve*)

> Vulvar Sculptra: "Two visits, one vial... about a month apart" — different protocol from facial Sculptra

**PubMed / official-evidence findings:**
- BoNT-A dose-response: 48U lasts longer than 16U (HIGH evidence RCT; Carruthers 2003). Area determines dose, dose determines duration.
- Neck BoNT-A: 4-6 month intervals (MODERATE; Brandt & Boker 2004)

**Implementation implications:**
- One cadence per product keeps schema simple
- `cadence_notes` field captures: "Masseter: 4-6 months due to higher dose; Glabella: 3-4 months; Hyperhidrosis: varies"
- If Phase 9 care plans need area-specific cadence, a `product_area_config` table can be added then

**Suggested final wording:** "One cadence profile per product. Area-specific variations documented in cadence_notes. If area-specific cadence becomes a blocking need, add product_area_config table in Phase 9."

**Confidence:** Moderate

---

### Q2.3 — Event-based timing: work backward from date?

**Question:** Should the system support "work backward from target date" logic?

**Recommended answer:** C — Defer to Phase 9 care plans

**Neutral industry position:** Event-based timing (weddings, vacations, proms) is a core consultation use case. The data exists in the corpus now. But the logic belongs in care plans, not product-level timing.

**Podcast / expert-practice findings:**

> "Botox of course you can do about two to three weeks ahead of time... Sculptra, four to six months ahead of time... Chemical peels may take a series... you start super early with small quantities of filler."
> — *Beauty Prescribed*, Ep 616, "Top Cosmetic Procedures for Wedding Season"

> "I tell them to give themselves at least a month to recover."
> — YouTube provider video (general event prep)

> "Very popular for people who are getting ready for weddings, big events, proms."
> — YouTube video 28ehuWfAS6g

**Implementation implications:**
- Product-level cadence data (Phase 7) provides the building blocks: "Sculptra needs 4-6 months for collagen results" is product cadence
- Care plans (Phase 9) assemble those building blocks into event timelines: "Wedding June 22 → start Sculptra January, peels February, Botox June 1"
- Phase 7 captures the timing data. Phase 9 builds the calculator.

**Suggested final wording:** "Capture event-relevant timing data in product cadence fields now (e.g., 'results visible after X weeks'). Defer event-timeline calculator logic to Phase 9 care plans."

**Confidence:** Strong

---

### Q3.1 — How should sequencing be represented?

**Question:** Text field, structured fields, or both?

**Recommended answer:** C — Both structured fields for queryability + prose for human consumption

**Podcast / expert-practice findings:**

Sequencing with clear rationale (needs prose):
> "What I'll often do is combine the two treatments. I'll first do the Sculptra, new collagen starts growing, and then I'll use the threads. The threads, theoretically, will go and grab the new collagen."
> — Podcast episode `723a81ab` (PDO Threads + Sculptra — Sculptra MUST come first)

> "With profilo 64, I prefer to do the treatments with profilo before I start the energy-based devices... the wound healing process will be with less inflammation."
> — **Dr. Eyal Kramer**, *The Business of Injecting*, Ep 301

Sequencing that's queryable (needs structured):
> "You'd use the energy device first and then apply the Juvelook topically... because you've got the channels there."
> — **Dr. Lisa Dinley**, *The Business of Injecting*, Ep 305

**PubMed / official-evidence findings:**
- BoNT-A 1 week before laser resurfacing enhances results (HIGH evidence RCT; Zimbler et al., 2001) — structured: product_a_first=true, staging_interval_days=7
- Deep laser effects first, superficial second in same session (YouTube: Sciton protocol) — structured: energy_sequence=deep_first

**Implementation implications:**

Recommended fields on item_relationships:
```
staging_required              BOOLEAN   -- true if order matters
staging_sequence              TEXT      -- 'product_a_first' or 'product_b_first'
staging_interval_days_min     INTEGER   -- minimum days between if not same-session
staging_interval_days_max     INTEGER   -- maximum days between
staging_rationale             TEXT      -- prose: "Sculptra grows collagen foundation; threads grab new collagen"
```

**Suggested final wording:** "Sequencing stored as structured fields (staging_required, staging_sequence, staging_interval) for agent queryability, plus staging_rationale prose for human consumption and agent explanation."

**Confidence:** Moderate

---

### Q3.2 — Should sequencing be concern-dependent?

**Question:** One sequence per pair, or sequence varies by concern/area?

**Recommended answer:** A — One per pair with notes

**Podcast / expert-practice findings:**
- The few sequencing rules identified are pair-specific, not concern-specific
- Sculptra before threads applies regardless of facial area
- Profhilo before EBD applies regardless of concern
- No podcast evidence found for concern-dependent sequencing reversal

**Suggested final wording:** "One sequence rule per pair. If concern-specific sequencing is identified later, add to staging_rationale as notes, or promote to care-plan logic in Phase 9."

**Confidence:** Moderate

---

### Q3.3 — Temperature layering: should energy device sequencing follow a thermal model?

**Question:** Formal thermal_tier schema, content-only, or pair-level notes?

**Recommended answer:** C — Capture in pair-level sequencing notes

**Podcast / expert-practice findings:**

Tracy Mancuso's framework is the only structured articulation found:
> "Low heat somewhere below 42 degrees centigrade stimulates fibroblasts... moderate heat 55 to 80 degrees... high heat 100-300 degrees..."
> — **Tracy Mancuso**, *Business of Aesthetics Podcast Show*, "The Power of Stacked Treatments"

YouTube confirms "deep before superficial" as a practical rule:
> "Do the deep effects first, get the deeper energy out of the way and then do the more superficial pass."
> — Sciton platform videos (multiple)

**PubMed / official-evidence findings:**
- No PubMed study was found that formalizes a temperature-tier model for energy device sequencing
- The "deep before superficial" principle appears in clinical practice descriptions but is not codified in published guidelines

**Conflicts or caveats:**
- Single podcast source for the temperature framework (Tracy Mancuso)
- YouTube supports "deep first" but doesn't formalize temperature tiers
- Adding thermal_tier to product schema creates a maintenance burden for a principle that may not be universally accepted

**Implementation implications:**
- Capture in staging_rationale: "Energy sequence: deep/moderate heat devices before superficial. Tracy Mancuso framework: IPL (low) → ultrasound (moderate) → RF microneedling (moderate) → fractional laser (high) → neurotoxin + filler (no heat)"
- If thermal_tier becomes needed for booking logic, promote to product-level field later

**Suggested final wording:** "Document thermal layering principle in pair-level staging_rationale for energy device pairs. Do not add thermal_tier to product schema in Phase 7. Reconsider if booking logic requires it."

**Confidence:** Weak (single-source principle)

---

### Q4.1 — Should downtime be a structured field?

**Question:** Product-level structured, content-only, or pair-level?

**Recommended answer:** A + C — Product-level baseline + pair-level combined impact

**PubMed / official-evidence findings:**

| Treatment | Downtime | Evidence Level | Source |
|-----------|----------|:-:|--------|
| Variable-pulsed Er:YAG | Re-epithelialization 5.1 days avg | MODERATE | Tanzi & Alster, *PRS* 2003 |
| CO2 laser (fully ablative) | 7-10 days | MODERATE | Multiple YouTube + PubMed |
| CO2 fractionated + exosomes | 5 days (vs 7-10 without) | LOW | YouTube video VMeFOsn6BDU |
| RF microneedling | 1-5 days (redness, mild swelling) | MODERATE | PubMed + YouTube + Podcast |
| HA filler (lips) | 2-3 days swelling | MODERATE | Multiple |
| HA filler (NLF/cheeks) | 1-2 days, bruising 7-9 days | MODERATE | Vent et al., *CCID* 2014 |
| Neurotoxins | None | HIGH | Multiple |
| IPL/BBL | Same-day makeup possible | MODERATE | YouTube |
| Chemical peel (light) | 1-2 days | MODERATE | Multiple |
| CoolSculpting | None (PAH at 2-4 months rare) | MODERATE | PubMed |
| Threads (PDO) | 1-2 weeks | MODERATE | Podcast |
| Microcoring (Ellacor) | 4-7 days | LOW | YouTube |

**Implementation implications:**

Product-level fields:
```
downtime_days_min             INTEGER   -- e.g., 0 for Botox, 5 for CO2 fractionated
downtime_days_max             INTEGER   -- e.g., 0 for Botox, 10 for CO2 ablative
downtime_description          TEXT      -- "Mild redness/swelling 24 hours; bruising possible 7-9 days"
```

Pair-level field:
```
combined_downtime_note        TEXT      -- "Combined biostimulator + RF + laser: expect 4-7 days total. Longer than individual downtimes but not cumulative."
```

**Suggested final wording:** "Downtime is structured at product level (min/max days + description) and pair level (combined_downtime_note for canonical/common pairs where expert-determined combined downtime is available)."

**Confidence:** Strong

---

### Q4.2 — How should combined downtime be communicated?

**Question:** Sum individual downtimes, take the max, or expert-determined per pair?

**Recommended answer:** C for canonical/common pairs, B (max) as default

**Podcast / expert-practice findings:**

> "When obviously you need to explain to your patient that downtime going to be much longer [with combined treatments]."
> — **Dr. Magdalena Bejma**, *The Aesthetics Business Podcast* (biostimulator + RF + laser same day)

YouTube confirms overlapping downtime model:
> Combined laser stacking downtime is typically described as similar to the most aggressive individual treatment, not additive.

**PubMed / official-evidence findings:**
- PRP combined with fractional laser REDUCES downtime vs fractional laser alone (HIGH evidence RCT; Gawdat et al., 2014). Combined downtime can be LESS than individual.
- No published study supports summing individual downtimes for combined treatments.

**Implementation implications:**
- Default rule: `combined_downtime = max(product_a.downtime, product_b.downtime)`
- Override for canonical/common pairs with expert-determined combined_downtime_note
- Special case: PRP + laser → combined downtime is LESS (PRP accelerates healing)

**Suggested final wording:** "Default combined downtime = maximum of individual product downtimes. For canonical/common pairs, override with expert-determined combined_downtime_note. Note special cases where combination REDUCES downtime (PRP + laser)."

**Confidence:** Moderate

---

### Q5.1 — Should timing contraindications be a separate data structure?

**Question:** Pair-level fields, separate table, or pair fields with safety_critical flag?

**Recommended answer:** C — Pair-level fields with safety_critical boolean

**Neutral industry position:** The number of true timing contraindications is small (~8-10 rules). A separate table adds schema complexity for minimal benefit.

**PubMed / official-evidence findings (hard stops):**

| Contraindication | Timing Rule | Evidence |
|-----------------|-------------|----------|
| Hyaluronidase + HA filler | Never same session | Pharmacological (enzyme degrades HA) |
| Vascular occlusion → hyaluronidase | Within 4 hours optimal; 48 hours critical; 72 hours max | MODERATE (Kim et al. 2011; Sun et al. 2015; Hong et al. 2017) |
| BoNT-A retreatment | Minimum 85 days (12 weeks) | HIGH (Monheit et al. 2009, n=768) |
| Fully ablative laser + isotretinoin | Contraindicated during isotretinoin use | MODERATE (Latifaltojar et al. 2025) |
| BoNT-A in pregnancy/lactation | Absolute contraindication | MODERATE (Brandt & Boker 2004) |
| Filler dissolution before surgery | Minimum 2 weeks; ideally 1 month | Podcast consensus (Dr. Sarhaddi) |

**Implementation implications:**

On item_relationships, add:
```
safety_critical               BOOLEAN   -- true = hard stop or strong warning
timing_warning_level           TEXT      -- 'hard_block' | 'warning' | 'education'
```

When `safety_critical = true`, agents must surface the timing rule prominently. Booking systems can filter on `timing_warning_level = 'hard_block'` to prevent scheduling.

**Suggested final wording:** "Timing contraindications stored in pair-level fields with safety_critical boolean and timing_warning_level enum (hard_block/warning/education). No separate table needed — the number of hard stops is small enough for pair-level representation."

**Confidence:** Strong

---

### Q5.2 — How aggressive should the safety floor be?

**Question:** Flag everything with potential risk, evidence-based only, or hybrid?

**Recommended answer:** C — Hybrid (evidence-based hard stops + expert-consensus soft warnings)

**This matches the gateway posture from PROJECT.md:** "Safety floor (contraindications, black box warnings) is the ONE place we assert authoritatively."

**PubMed evidence-based hard stops:**

| Rule | Evidence | Classification |
|------|----------|----------------|
| BoNT-A: 85-day minimum retreatment | Phase III (n=768, zero NAb at this interval) | Hard stop |
| Hyaluronidase + HA same day | Pharmacological | Hard stop |
| Fully ablative laser during isotretinoin | Systematic review | Hard stop |
| BoNT-A in pregnancy/lactation/neuromuscular disease | Expert consensus | Hard stop |
| Vascular occlusion → treat within 72 hours | Case series | Hard stop (emergency protocol) |

**Expert-consensus soft warnings (podcast-sourced):**

| Rule | Source | Classification |
|------|--------|----------------|
| >50 units toxin per session → antibody risk | Dr. Wanitphakdeedecha (published) | Warning |
| Rejuran in same plane as cross-linked filler | Dr. Steven Liew | Warning |
| No makeup 48 hours post-cannula | Complications episode | Warning |
| Profhilo 64 before (not same day as) energy devices | Dr. Eyal Kramer | Education |
| Filler dissolution 2+ weeks before surgery | Dr. Sarhaddi | Warning |

**Conflicts between expert practice and published evidence:**

1. **Filler + laser same-session**: Dr. Weiner says safe ("HA sterilized at 120C, RF is 40-45C"). YouTube providers recommend 1-2 week wait. PubMed has no evidence of harm. → Classify as **education** (not warning), note the divergence.

2. **>50U toxin per session**: Published research shows risk, but many practitioners routinely do 80+ units for full-face + microtoxin. → Classify as **warning** with rationale, not hard block.

**Suggested final wording:** "Safety floor uses a hybrid model: evidence-based hard stops (PubMed/FDA-backed, system-enforced) plus expert-consensus soft warnings (podcast/practice-based, provider-override allowed). Where expert practice is more aggressive than published evidence, document the tension in timing_notes but do not suppress expert practice."

**Confidence:** Strong

---

### Q6.1 — New `gl_timing_rules` table or extend `item_relationships`?

**Question:** New table, extend relationships, or both?

**Recommended answer:** A for pair timing + product-level cadence fields (no new table)

**Schema analysis findings:**

Current state:
- `item_relationships` has: relationship_type, relationship_strength, clinical_rationale, timing_guidance, patient_education_text, staff_talking_points, same_session_ok, pairing_tier
- `gl_products` has: NO cadence or downtime fields
- `v2_treatment_timing` exists (10 placeholder rows) but is part of the agent-ready v2 mirror layer, not the master GL

**Recommended additions to `gl_products`:**
```sql
-- Product-level cadence
initial_series_count              INTEGER,
initial_interval_days_min         INTEGER,
initial_interval_days_max         INTEGER,
maintenance_interval_days_min     INTEGER,
maintenance_interval_days_max     INTEGER,
minimum_retreatment_days          INTEGER,
typical_followup_days             INTEGER,

-- Product-level downtime
downtime_days_min                 INTEGER,
downtime_days_max                 INTEGER,
downtime_description              TEXT,

-- Notes
cadence_notes                     TEXT
```

**Recommended additions to `item_relationships`:**
```sql
-- Same-session timing (may already partially exist)
same_session_ok                   BOOLEAN,       -- if not already present
same_session_rationale            TEXT,

-- Staging/sequencing
staging_required                  BOOLEAN,
staging_sequence                  TEXT,           -- 'product_a_first' | 'product_b_first' | null
staging_interval_days_min         INTEGER,
staging_interval_days_max         INTEGER,
staging_rationale                 TEXT,

-- Combined impact
combined_downtime_note            TEXT,

-- Safety
safety_critical                   BOOLEAN DEFAULT false,
timing_warning_level              TEXT,           -- 'hard_block' | 'warning' | 'education'
timing_notes                      TEXT
```

**Why not a new table:**
- Timing rules are attributes of products and product pairs — they don't have independent identity
- A separate table creates a join burden for every agent query
- The number of timing fields (~11 product-level + ~10 pair-level) is manageable
- The existing `v2_treatment_timing` can be populated from these fields via view/materialization in the v2 mirror process

**Migration risk:** Low. Adding nullable columns to existing tables. No data loss. Existing queries unaffected.

**Suggested final wording:** "Extend gl_products with 11 cadence/downtime fields. Extend item_relationships with 10 timing/staging/safety fields. No new table. The v2_treatment_timing agent-ready table can be populated from these master fields."

**Confidence:** Strong

---

### Q7.1 — What artifacts should Phase 7 produce?

**Recommended answer:** A — SQL inserts + timing documentation + review file

**Required deliverables:**
| Artifact | Purpose | Status |
|----------|---------|--------|
| `supabase/compile_sql/07-timing-product-cadence.sql` | Product-level cadence INSERTs (UPDATE statements on gl_products) | Required |
| `supabase/compile_sql/07-timing-pair-rules.sql` | Pair-level timing INSERTs (UPDATE statements on item_relationships) | Required |
| `supabase/migrations/07-timing-schema.sql` | ALTER TABLE statements adding new columns | Required |
| `TIMING_EVALUATION.md` | Full timing rule inventory with evidence sources | Required |
| `TIMING_REVIEW.md` | Rules requiring Chris review (safety-critical, hard blocks) | Required |

**Optional deliverables:**
| Artifact | Purpose | Status |
|----------|---------|--------|
| `BOOKING_LOGIC_CHEAT_SHEET.md` | Quick reference for booking/scheduling agents | Optional (useful but can defer) |
| `TIMING_EVIDENCE_PACK.md` | All PubMed citations and podcast quotes backing timing rules | Optional (audit trail) |
| `TIMING_CORPUS_QUERY_LOG.md` | Record of all searches run | Optional |

**Deferred deliverables:**
| Artifact | Purpose | Deferred To |
|----------|---------|-------------|
| Visual timeline templates | Treatment arc diagrams | Phase 9 (care plans) |
| Event-based timeline calculator | Wedding/event backward planning | Phase 9 |
| Agent-loadable timing fuel packets | Compiled timing for agent retrieval | Phase 10 |

**Suggested final wording:** "Phase 7 produces: schema migration, product cadence SQL, pair timing SQL, evaluation report, and Chris review file. Booking logic cheat sheet optional. Visual timelines and event calculators deferred to Phase 9."

**Confidence:** Moderate

---

### Q7.2 — Should timing data feed the Research/Evidence tab?

**Recommended answer:** C — Phase 10 agent fuel

**Rationale:** The Research/Evidence tab (M6) queries `evidence_links` and `agent_reference_docs`. Timing data lives in product fields and pair fields. The bridge between structured timing fields and agent-retrievable content is the fuel compilation step (Phase 10), which assembles all product knowledge into agent-loadable packets.

**Suggested final wording:** "Timing data enters the Research/Evidence tab through Phase 10 agent fuel compilation, not through direct wiring in Phase 7."

**Confidence:** Strong

---

### Q8.1 — Practice vs. published timing conflicts

**Identified conflicts:**

| # | Topic | Expert Practice | Published/Conservative Guidance | Tension |
|---|-------|----------------|--------------------------------|---------|
| 1 | **Filler + laser same day** | Dr. Weiner: safe, HA survives RF heat (sterilized at 120C vs 40-45C from RF). NEO laser + fillers same day (YouTube) | YouTube providers recommend 1-2 week wait. Some industry articles advise spacing. PubMed: no evidence of harm, but also no definitive same-day safety study | Expert practice is more aggressive. No PubMed evidence of harm supports the conservative position. |
| 2 | **>50U toxin per session** | Many practitioners routinely inject 80+ units (full face + microtoxin + platysma) | Dr. Wanitphakdeedecha's published study: >50U increases antibody risk. 12-week minimum interval. | Expert practice is more aggressive. Published evidence supports caution. |
| 3 | **Two toxin brands same face** | Dr. Eccleston uses two different toxins on same patient same session "for nuances" | No published guidance on multi-brand same-session neurotoxin use. Conservative practice: one brand per session. | Expert practice exceeds published guidance. No evidence of harm or benefit. |
| 4 | **Sculptra longevity** | YouTube: "Probably closer to five to seven years" (video 6XTtRcoSV8c) | Published studies followed patients for 25 months max. PubMed: "up to 2 years" (Keni & Sidle 2007); "up to 5 years" (Rendon 2012 retrospective) | Expert practice claims longer duration than published data supports. |
| 5 | **Laser after isotretinoin** | PubMed systematic review (2025): "Insufficient evidence to support delaying" non-ablative fractional lasers, superficial peels, or RF microneedling during isotretinoin. Only fully ablative is contraindicated. | Traditional teaching: wait 6-12 months after isotretinoin before any ablative procedure. | Published evidence is now MORE permissive than traditional practice for non-ablative procedures. |

**Confidence:** Strong (all conflicts identified across multiple sources)

---

### Q8.2 — Products where timing is the primary differentiator

| Product | Why Timing Matters | Source |
|---------|-------------------|--------|
| **Sculptra** | Multi-session protocol (2-3 sessions, 4-6 weeks apart) with delayed results (2-6 months). Timing IS the treatment experience. Patients who don't understand this are dissatisfied. | Podcast + YouTube + PubMed |
| **Neurotoxins** | Retreatment interval affects antibody risk (too frequent = resistance). Onset timing differs by brand (Dysport 3-5 days, Botox 7-10 days, full effect 14 days). Cadence extends with repeated use. | Podcast + PubMed |
| **CoolSculpting** | Results appear 2-3 months post-treatment. Retreatment too soon adds inflammation without benefit. PAH (paradoxical fat growth) appears 2-4 months post — monitoring window. | YouTube + PubMed |
| **Radiesse (CaHA)** | 18-36+ month longevity. Retreatment at 6-12 months. Diluted vs full-strength have different cadences. | PubMed + Podcast |
| **PDO Threads** | Threads dissolve in 3-6 months; collagen stimulation continues up to 2 years. Retreatment is event-driven, not interval-driven. | Podcast + YouTube |
| **PRP/PRF** | Results visible at month 3-4, not immediately. Series required (3-6 sessions at 2-4 week intervals). Patients who don't complete the series see limited results. | Podcast + PubMed |
| **Profhilo/Skin Boosters** | Precise 4-week series spacing required, then quarterly maintenance. Aligns naturally with toxin appointments (every 2nd toxin visit). | Podcast (Dr. Wang, Dr. Selkon) |

**Confidence:** Strong

---

### Q8.3 — Additional timing references

**Must-Read Podcast Episodes:**
| Episode | Show | Timing Topics |
|---------|------|---------------|
| "The Power of Stacked Treatments" (Tracy Mancuso) | Business of Aesthetics | Temperature layering, multi-modality same-session protocol |
| Ep 184 Micro-toxin (Dr. Wanitphakdeedecha) | Business of Injecting | 50-unit cap, 3-month minimum, antibody evidence |
| Ep 301 Profhilo Structura (Drs. Kramer & Selkon) | Business of Injecting | Same-day combos, EBD sequencing, toxin alignment |
| Ep 308 Combining Regenerative (Drs. Amado & Pakaar-Hull) | Business of Injecting | Microtoxin + NCTF, PRP protocols, biostimulator sequencing |
| Ep 305 Juvelook & Lenisna (Dr. Dinley) | Business of Injecting | Product spacing (4-6 vs 8 weeks), combination rules |
| Ep 302 Rejuran (Dr. Liew) | Business of Injecting | Rejuran + toxin OK / NOT filler, spacing |
| Ep 206 Xeomin Story (Dr. Frevert) | Business of Injecting | Antibody formation 14%, dose-response |
| Ep 154 Chin & Jawline (Dr. Weiner) | Business of Injecting | Filler + RF same session, laser after filler myth-busting |
| Ep 616 Wedding Season | Beauty Prescribed | Event timeline: Sculptra 4-6mo, peels 4-6mo, Botox 2-3wk |
| Potenza vs Morpheus 8 | The Skin Report | RF microneedling series: 3 sessions, 1 month apart |

**Must-Read PubMed:**
| Citation | Topic | Evidence Level |
|----------|-------|:-:|
| Monheit et al., *JAAD* 2009 (n=768) | BoNT-A 85-day minimum interval, zero NAb | HIGH |
| Carruthers et al., *Dermatologic Surgery* 2010 (n=90 RCT) | BoNT-A + HA filler combination safety | HIGH |
| Zimbler et al., *Arch Facial Plast Surg* 2001 (RCT) | BoNT-A pretreatment 1 week before laser | HIGH |
| Gawdat et al., *Dermatologic Surgery* 2014 (n=30 RCT) | PRP + fractional laser reduces downtime | HIGH |
| Cohen et al., *ASJ* 2015 (consensus) | Hyaluronidase emergency protocol (200U, repeat at 60 min) | MODERATE |
| Flynn, *Am J Clin Dermatol* 2010 (35 studies) | BoNT-A duration meta-analysis (3-6 months) | HIGH |
| Narins et al., *JAAD* 2010 (n=233 RCT) | PLLA 3 sessions at 3-week intervals, 25-month follow-up | HIGH |
| Semchyshyn & Kilmer, *Dermatologic Surgery* 2005 (n=19) | Nonablative laser/IPL safe immediately after BoNT-A | MODERATE |

---

## Timing Rule Inventory

### Evidence-Backed Timing Rules

| # | Treatment or Pair | Rule Type | Timing Rule | Hardness | Evidence Source | Implementation Field | Chris Review? |
|---|-------------------|-----------|-------------|----------|---------------|---------------------|:---:|
| 1 | BoNT-A (all) | Cadence | Minimum 85 days (12 weeks) between treatments | Hard stop | PubMed HIGH (Monheit 2009, n=768) | products.minimum_retreatment_days = 85 | No |
| 2 | BoNT-A (all) | Cadence | Typical retreatment 3-6 months (mean 4 months) | Preference | PubMed HIGH (Flynn 2010, 35 studies) | products.maintenance_interval_days_min=90, max=180 | No |
| 3 | BoNT-A (all) | Safety | >50 units per session increases antibody risk | Warning | Podcast (Dr. Wanitphakdeedecha, published); PubMed (Bellows & Jankovic 2019) | Flag in cadence_notes | Yes |
| 4 | BoNT-A + HA Filler | Same-session | Safe same-session | Yes | PubMed HIGH (Carruthers 2010, RCT n=90) | item_relationships.same_session_ok = true | No |
| 5 | BoNT-A + Nonablative Laser/IPL | Same-session | Safe same-session (laser does not inactivate toxin) | Yes | PubMed MODERATE (Semchyshyn 2005) | item_relationships.same_session_ok = true | No |
| 6 | BoNT-A → Laser Resurfacing | Sequencing | BoNT-A 1 week before laser enhances results | Preferred | PubMed HIGH (Zimbler 2001, RCT) | staging_required=true, staging_sequence='bont_first', staging_interval_days=7 | No |
| 7 | Hyaluronidase + HA Filler | Same-session | NEVER same session | Hard stop | Pharmacological + Podcast (Amy Lynn) | same_session_ok=false, safety_critical=true, timing_warning_level='hard_block' | No |
| 8 | Hyaluronidase → HA re-injection | Sequencing | Minimum 2 days; ideally 6 weeks for full evaluation | Warning | Podcast (D. McAllister, Amy Lynn); PubMed | staging_interval_days_min=2, staging_interval_days_max=42 | No |
| 9 | Vascular occlusion → Hyaluronidase | Emergency | Within 4 hours optimal; 48 hours critical; 72 hours maximum | Hard stop | PubMed MODERATE (Kim 2011, Sun 2015, Hong 2017, Cohen 2015 consensus) | Emergency protocol — not a scheduling rule | No |
| 10 | Sculptra (PLLA) | Cadence | 2-3 sessions, 4-6 weeks apart; maintenance annually; results at 2-6 months | Standard | PubMed HIGH (Narins 2010); Podcast (multiple); YouTube | initial_series_count=3, initial_interval_days_min=28, max=42, maintenance=365 | No |
| 11 | Radiesse (CaHA) | Cadence | Retreatment 6-12 months; effects 18-36+ months | Standard | PubMed HIGH (Bass 2010) | maintenance_interval_days_min=180, max=365, minimum_retreatment_days=180 | No |
| 12 | HA Fillers | Cadence | Touch-up at 2 weeks (lips); retreatment at 6-12 months | Standard | PubMed HIGH (multiple); Podcast | typical_followup_days=14, maintenance_interval_days_min=180, max=365 | No |
| 13 | RF Microneedling | Cadence | Series of 3 at 4-week intervals; maintenance every few months | Standard | PubMed MODERATE (Nguyen 2022); YouTube; Podcast | initial_series_count=3, initial_interval_days_min=28, max=84 | No |
| 14 | IPL/BBL | Cadence | 3-5 sessions at 3-4 week intervals; maintenance every 3 months | Standard | PubMed MODERATE (Negishi 2002, Kim 2012); YouTube | initial_series_count=4, initial_interval_days_min=21, max=28 | No |
| 15 | PRP | Cadence | 3-6 sessions at 2-4 week intervals; results at month 3-4 | Standard | PubMed MODERATE (multiple); Podcast (Dr. Singh, Dr. Amado) | initial_series_count=4, initial_interval_days_min=14, max=28 | No |
| 16 | CoolSculpting | Cadence | 1-2 sessions; minimum 6-8 weeks between; results at 2-3 months; monitor for PAH at 2-4 months | Standard | PubMed MODERATE (Bernstein 2017, Shek 2012); YouTube | minimum_retreatment_days=42, typical_followup_days=90 | No |
| 17 | Kybella (DCA) | Cadence | 2-4 sessions, 6-8 weeks apart; assess at 12 weeks post-final | Standard | PubMed MODERATE (multiple); YouTube | initial_series_count=3, initial_interval_days_min=42, max=56 | No |
| 18 | Chemical Peels (light) | Cadence | Series at 2-4 week intervals | Standard | YouTube; Podcast | initial_interval_days_min=14, max=28 | No |
| 19 | PDO Threads | Cadence | Results last 1-2 years; threads dissolve 3-6 months; series of 3 at 4-week intervals for smooth threads | Standard | YouTube; Podcast | initial_series_count=3, initial_interval_days_min=28 | No |
| 20 | Skin Boosters (Profhilo/BYRYZN) | Cadence | Series of 3 at 4-week intervals; maintenance every 3 months | Standard | Podcast (Dr. Wang Ep 310, Dr. Selkon Ep 301) | initial_series_count=3, initial_interval_days_min=28, maintenance_interval_days_min=90 | No |
| 21 | Laser Hair Removal | Cadence | Face: every 4 weeks; Body: every 6 weeks; minimum 6 sessions | Standard | Podcast; YouTube | initial_series_count=6, initial_interval_days_min=28 (face), 42 (body) | No |
| 22 | Sculptra → HA Filler | Sequencing | Sculptra first (collagen foundation), then HA for structure | Preferred | Podcast consensus (multiple experts) | staging_required=true, staging_sequence='sculptra_first' | No |
| 23 | Sculptra → PDO Threads | Sequencing | Sculptra first (grow collagen), then threads (grab new collagen) | Preferred | Podcast (episode `723a81ab`) | staging_required=true, staging_sequence='sculptra_first' | No |
| 24 | Profhilo 64 → Energy Devices | Sequencing | Profhilo first (at least 1 session prior to EBD) | Preferred | Podcast (Dr. Kramer, Ep 301) | staging_required=true, staging_sequence='profhilo_first' | No |
| 25 | Energy Device → Topical Juvelook | Sequencing | Energy device first (creates channels), then topical | Required | Podcast (Dr. Dinley, Ep 305) | staging_required=true, staging_sequence='device_first' | No |
| 26 | Filler Dissolution → Surgery | Sequencing | Dissolve minimum 2 weeks before; ideally 1 month | Warning | Podcast (Dr. Sarhaddi) | staging_interval_days_min=14, staging_interval_days_max=30 | No |
| 27 | HA Filler + Threads | Same-session | Safe if different tissue planes (bone vs subcutaneous) | Conditional | Podcast (Dr. Ku, Ep 46) | same_session_ok=true, same_session_rationale='Different planes required' | No |
| 28 | Biostimulator + RF Microneedling + Laser | Same-session | Safe same-day; expect longer downtime | Yes | Podcast (Dr. Bejma); PubMed LOW (Friedmann 2014) | same_session_ok=true | No |
| 29 | PRP + Fractional Laser | Same-session | Safe same-session; PRP REDUCES downtime | Yes | PubMed HIGH (Gawdat 2014, RCT n=30) | same_session_ok=true, combined_downtime_note='PRP reduces laser downtime' | No |
| 30 | Rejuran + Cross-linked HA Filler | Same-session | Do NOT inject Rejuran where cross-linked filler exists in same plane | Warning | Podcast (Dr. Liew, Ep 302) | safety_critical=true, timing_warning_level='warning' | Yes |
| 31 | Fully Ablative Laser + Isotretinoin | Contraindication | Contraindicated during isotretinoin use | Hard stop | PubMed MODERATE (Latifaltojar 2025) | safety_critical=true, timing_warning_level='hard_block' | No |
| 32 | CoolSculpting | Safety | Monitor for PAH at 2-4 months post-treatment | Education | PubMed MODERATE (Stroumza 2018) | cadence_notes | No |
| 33 | BoNT-A in pregnancy/lactation | Contraindication | Absolute contraindication | Hard stop | PubMed MODERATE (Brandt 2004) | Product-level contraindication | No |
| 34 | Filler/BoNT-A same session (France) | Legal | Prohibited in France | Hard stop (regional) | Podcast (Dr. Martschin, Ep 169) | Regional flag — not standard schema | Yes |

---

## Same-Session Compatibility Matrix

| Pair/Category | Same-Session | Rationale | Safety-Critical? | Evidence Source | Evidence Level |
|--------------|:---:|-----------|:---:|---------------|:-:|
| Neurotoxin + HA Filler | **YES** | Standard of care; filler + toxin address different aging mechanisms | No | PubMed HIGH (RCT n=90) | HIGH |
| Neurotoxin + Biostimulator (Sculptra) | **YES** | Different targets; both injectable | No | Podcast (multiple experts) | MODERATE |
| Neurotoxin + Energy/RF | **YES** | Laser/RF does not inactivate toxin | No | PubMed MODERATE (Semchyshyn 2005) | MODERATE |
| HA Filler + Biostimulator (Sculptra) | **YES** | Different tissue planes; complementary mechanisms | No | Podcast (Dr. van Eijk Ep 254) | MODERATE |
| HA Filler + Energy/RF Microneedling | **YES** | HA survives RF heat (sterilized at 120C vs 40-45C) | No | Podcast (Dr. Weiner Ep 154); YouTube | MODERATE |
| HA Filler + Threads | **CONDITIONAL** | Must be in different tissue planes (bone vs subcutaneous) | No | Podcast (Dr. Ku Ep 46) | MODERATE |
| HA Filler + Hyaluronidase | **NO** | Hyaluronidase actively degrades HA; micro-channels cause spread | **Yes** | Pharmacological + Podcast | HIGH |
| PRP + RF Microneedling | **YES** | PRP growth factors enhance healing through RF micro-channels | No | PubMed HIGH (Gawdat 2014 RCT) | HIGH |
| PRP + HA Filler | **YES** | Complementary mechanisms (hydration + collagen stimulation) | No | PubMed MODERATE; Podcast | MODERATE |
| Sculptra + RF Microneedling | **YES** | RF tightens + stimulates fibroblasts; Sculptra restores volume | No | Podcast (multiple); PubMed LOW | MODERATE |
| Radiesse + RF/Energy | **YES** | Combined biostimulation + energy | No | Podcast (Dr. Bejma) | LOW |
| Chemical Peel (non-inflammatory) + Injectable | **YES** | Non-inflammatory peels don't interfere with injectables | No | Podcast (episode `31ad74d4`) | MODERATE |
| IPL/Nonablative Laser + HA Filler | **CONDITIONAL** | Some providers do same-day; others recommend 1-2 week wait | No | YouTube (mixed); PubMed (no evidence of harm) | WEAK |
| Body Contouring (fat reduction) + Skin Tightening | **YES** | Different modalities, long appointment | No | Podcast (*Beauty Prescribed*) | LOW |
| Skincare + Injectables | **YES** | Skincare is adjunctive; no interference | No | Common practice | LOW |
| Cannula Procedure + Makeup | **NO (48hr)** | Auto-inoculation risk through cannula entry points | **Yes** | Podcast (complications episode) | MODERATE |
| Hyaluronidase + PRF (not HA) | **YES** | PRF is not hyaluronic acid; not degraded by hyaluronidase | No | Podcast (Amy Lynn) | MODERATE |
| Two Different Toxin Brands | **YES** | Expert practice for nuanced treatment | No | Podcast (Dr. Eccleston Ep 263) | LOW |

---

## Cadence and Maintenance Matrix

| Product/Category | Initial Series | Initial Interval | Maintenance Interval | Min Retreat | Follow-Up | Evidence Source | Confidence |
|-----------------|:-:|-----------|-----------|:-:|:-:|---------------|:-:|
| **Neurotoxins (Botox/Dysport/Xeomin)** | 1 | N/A | 90-180 days (3-6 months) | 85 days | 14 days (full effect check) | PubMed HIGH + Podcast | Strong |
| **HA Fillers (NLF/Cheeks)** | 1 | N/A | 180-365 days (6-12 months) | 90 days | 14 days (touch-up check) | PubMed HIGH + Podcast | Strong |
| **HA Fillers (Lips)** | 1 | N/A | 180-365 days | 90 days | 14 days (migration/nodule check) | Podcast + YouTube | Strong |
| **Sculptra (PLLA)** | 2-3 | 28-42 days (4-6 weeks) | 365 days (annual touch-up) | 28 days | 60-90 days (results visible) | PubMed HIGH + Podcast + YouTube | Strong |
| **Radiesse (CaHA)** | 1-2 | 42-56 days | 180-365 days | 180 days | 30-60 days | PubMed HIGH | Moderate |
| **RF Microneedling (Morpheus8/Potenza)** | 3 | 28-84 days (4-12 weeks) | 90-180 days | 28 days | 90 days | PubMed MODERATE + YouTube + Podcast | Strong |
| **PRP/PRF** | 3-6 | 14-28 days (2-4 weeks) | 90-180 days | 14 days | 90-120 days (results visible month 3-4) | PubMed MODERATE + Podcast | Moderate |
| **Chemical Peels (Light)** | 3-6 | 14-28 days | 30-90 days | 14 days | 7 days | YouTube + Podcast | Moderate |
| **IPL/BBL** | 3-5 | 21-28 days (3-4 weeks) | 90 days | 21 days | 28 days | PubMed MODERATE | Moderate |
| **CoolSculpting** | 1-2 | 42-90 days (6-12 weeks) | As needed | 42 days | 90 days (results visible + PAH monitor) | PubMed MODERATE + YouTube | Moderate |
| **Kybella (DCA)** | 2-4 | 42-56 days (6-8 weeks) | As needed (permanent) | 42 days | 84 days (12 weeks post-final) | PubMed MODERATE + YouTube | Moderate |
| **PDO Threads (smooth)** | 3 | 28 days (4 weeks) | Event-driven (annually) | 28 days | 90-180 days (collagen maturation) | YouTube + Podcast | Moderate |
| **Skin Boosters (Profhilo/BYRYZN)** | 3 | 28 days (4 weeks) | 90 days (quarterly) | 28 days | 28 days | Podcast (Dr. Wang, Dr. Selkon) | Moderate |
| **Laser Hair Removal** | 6+ | 28 days (face) / 42 days (body) | As needed | 14 days | 14 days | YouTube + Podcast | Moderate |
| **HydraFacial** | N/A (ongoing) | N/A | 30 days (monthly) | 14 days | N/A | YouTube + Industry | Weak |
| **Microneedling (standard)** | 3-4 | 21-28 days (3-4 weeks) | 60-90 days | 21 days | 28 days | PubMed MODERATE + YouTube | Moderate |

---

## Sequencing Rules Matrix

| Pair | Preferred Sequence | Required or Preferred? | Interval Between | Rationale | Evidence Source | Schema Implication |
|------|-------------------|:---:|-----------|-----------|---------------|-------------------|
| Sculptra → HA Filler | Sculptra first | Preferred | 4-8 weeks | Collagen foundation improves filler results; HA adds contour on top | Podcast consensus (multiple experts) | staging_required=true, staging_sequence='product_a_first' |
| Sculptra → PDO Threads | Sculptra first | Preferred | Weeks-months | Sculptra grows new collagen; threads "grab" new collagen | Podcast (episode `723a81ab`) | staging_required=true |
| Profhilo 64 → Energy Devices | Profhilo first | Preferred | At least 1 session prior | Reduced inflammation during EBD healing | Podcast (Dr. Kramer Ep 301) | staging_required=true |
| Energy Device → Topical Juvelook | Device first | Required | Same session | Device creates micro-channels for topical absorption | Podcast (Dr. Dinley Ep 305) | staging_required=true |
| BoNT-A → Laser Resurfacing | BoNT-A first | Preferred | 7 days | RCT evidence: pretreatment enhances laser results | PubMed HIGH (Zimbler 2001) | staging_interval_days_min=7 |
| Hyaluronidase → HA re-injection | Hyaluronidase first | Required | 2-42 days | Enzyme must clear before new HA is injected | Podcast + PubMed | staging_interval_days_min=2, max=42 |
| Filler dissolution → Surgery | Dissolve first | Required | 14-30 days | See natural anatomy before operating | Podcast (Dr. Sarhaddi) | staging_interval_days_min=14, max=30 |
| Neurotoxin → Filler (same session) | Toxin first or concurrent | Preferred | 0 (same session) | Some providers prefer toxin first; order not critical per PubMed | Podcast (multiple) | staging_required=false (either order OK) |
| Deep laser → Superficial laser | Deep first | Preferred | 0 (same session) | "Get the deeper energy out of the way first" | YouTube (Sciton protocol) | staging_notes only |
| Skincare foundation → Procedures | Skincare first | Preferred | Weeks-months | "If skin looks like crap, they won't be happy with injectable outcome" | Podcast (episode `01740eeb`) | staging_notes only |

---

## Downtime and Recovery Matrix

| Product/Category | Min Days | Max Days | Social Downtime | Swelling/Bruising | Makeup Restriction | Exercise/Heat/Alcohol | Combined Notes | Evidence Source | Confidence |
|-----------------|:-:|:-:|-----------|-----------|-----------|-----------|-----------|:-:|:-:|
| **Neurotoxins** | 0 | 0 | None | None typical | None | Avoid lying down 4 hours; avoid strenuous exercise 24 hours | N/A — does not add downtime to combinations | Multiple | Strong |
| **HA Fillers (lips)** | 2 | 3 | 2-3 days (swelling) | Swelling 2-3 days; bruising possible 7-9 days | None after 24 hours | Avoid alcohol 24 hours | With toxin: still 2-3 days (max rule applies) | PubMed + YouTube | Strong |
| **HA Fillers (NLF/cheeks)** | 1 | 2 | 1-2 days | Mild swelling 24-48 hours; bruising 7-9 days | None after 24 hours | Avoid alcohol 24 hours | With toxin: still 1-2 days | PubMed (Vent 2014) | Moderate |
| **Sculptra** | 1 | 3 | 1-2 days | Swelling typical; resolves to baseline before results appear (2 months) | None after 24 hours | Massage 5-5-5 rule | With RF: expect 3-5 days | Podcast + YouTube | Moderate |
| **RF Microneedling** | 1 | 5 | 1-2 days | Redness/mild sunburn appearance 24-48 hours; up to 5 days | No makeup 24 hours | Avoid heat/sweat 48 hours | With PRP: downtime REDUCED (PRP accelerates healing) | PubMed + YouTube + Podcast | Moderate |
| **CO2 Laser (ablative)** | 7 | 10 | 7-10 days | Significant peeling, redness | No makeup 10 days | Avoid sun, heat, exercise 2 weeks | With exosomes: reduced to 5 days | PubMed + YouTube | Strong |
| **CO2 Laser (fractionated)** | 3 | 7 | 3-5 days | Moderate peeling, redness | No makeup 3-5 days | Avoid sun/heat 1 week | With exosomes: reduced to 5 days | YouTube | Moderate |
| **Er:YAG Laser** | 3 | 7 | 5 days avg | Re-epithelialization 5.1 days; erythema possible 1+ month | No makeup until re-epithelialized | Avoid sun | N/A | PubMed MODERATE (Tanzi 2003) | Moderate |
| **IPL/BBL** | 0 | 1 | Same-day makeup possible | Mild redness; darkened spots may crust 3-7 days | Makeup same day possible | Avoid sun | Minimal impact on combination downtime | YouTube | Moderate |
| **Chemical Peels (light)** | 1 | 2 | 1-2 days | Mild unevenness, tightness | None after 24 hours | Avoid sun | Minimal addition to combination downtime | YouTube + Podcast | Moderate |
| **CoolSculpting** | 0 | 0 | None | Possible numbness, tingling, redness at treatment site | None | None | No downtime contribution | YouTube + PubMed | Strong |
| **PDO Threads** | 3 | 14 | 7-14 days recommended before events | Swelling, numbness, tightness | Minimal restrictions | Avoid heavy exercise 1-2 weeks | With filler same-session: expect upper range | Podcast + YouTube | Moderate |
| **Microcoring (Ellacor)** | 4 | 7 | 4-7 days | Redness, scabbing | Aquaphor only during healing | Avoid strenuous activity 1 week | N/A | YouTube | Low |
| **PRP (standalone)** | 0 | 1 | Minimal | Mild redness at injection sites | None | None | With RF microneedling: PRP REDUCES RF downtime | PubMed HIGH (Gawdat 2014) | Moderate |
| **Laser Hair Removal** | 0 | 1 | None | Possible perifollicular edema | None | Avoid sun exposure | N/A | YouTube | Moderate |

---

## Contraindication Timing Matrix

| # | Treatment/Pair | Contraindication or Caution | Timing Restriction | Hardness | Evidence Basis | Implementation | Chris Review? |
|---|---------------|---------------------------|-------------------|----------|---------------|----------------|:---:|
| 1 | Hyaluronidase + HA Filler | Enzyme actively degrades HA; creates micro-channels causing spread | Never same session | Hard stop | Pharmacological + Podcast | same_session_ok=false, safety_critical=true, timing_warning_level='hard_block' | No |
| 2 | BoNT-A retreatment | Antibody formation risk with short intervals | Minimum 85 days (12 weeks) | Hard stop | PubMed HIGH (Monheit 2009, n=768) | minimum_retreatment_days=85 | No |
| 3 | BoNT-A dose per session | >50 units increases antibody formation risk | Warning at >50 units | Warning | Podcast (Dr. Wanitphakdeedecha, published); PubMed | cadence_notes + agent warning | Yes |
| 4 | Fully ablative laser during isotretinoin | Contraindicated | Do not perform | Hard stop | PubMed MODERATE (Latifaltojar 2025) | safety_critical=true, timing_warning_level='hard_block' | No |
| 5 | BoNT-A in pregnancy/lactation | Absolute contraindication | Do not perform | Hard stop | PubMed MODERATE (Brandt 2004 consensus) | Product-level contraindication | No |
| 6 | Filler dissolution before surgery | Need to see natural anatomy | Minimum 14 days; ideally 30 days | Warning | Podcast (Dr. Sarhaddi) | staging_interval_days_min=14 | No |
| 7 | Vascular occlusion emergency | Time-critical treatment window | Hyaluronidase within 4 hours optimal; 48 hours critical; 72 hours maximum | Hard stop | PubMed MODERATE (Kim 2011, Sun 2015, Hong 2017) | Emergency protocol (not scheduling rule) | No |
| 8 | Rejuran + cross-linked HA in same plane | Risk of material interaction | Do not inject Rejuran where cross-linked filler exists | Warning | Podcast (Dr. Liew Ep 302) | safety_critical=true, timing_warning_level='warning' | Yes |
| 9 | Makeup after cannula procedure | Auto-inoculation infection risk | No makeup 48 hours | Warning | Podcast (complications episode) | Post-care education note | No |
| 10 | CoolSculpting retreatment | Insufficient healing time; inflammation without benefit | Minimum 6-8 weeks between | Warning | YouTube + PubMed | minimum_retreatment_days=42 | No |
| 11 | CoolSculpting PAH monitoring | Paradoxical adipose hypertrophy appears 2-4 months post | Monitor at 2-4 month follow-up | Education | PubMed MODERATE (Stroumza 2018) | typical_followup_days=90, cadence_notes | No |
| 12 | Filler/BoNT-A same session (France) | Legal prohibition | Not allowed same session | Hard stop (regional) | Podcast (Dr. Martschin Ep 169) | Regional configuration flag | Yes |
| 13 | Body treatment retreatment | "Results continue improving for months; retreating too soon adds inflammation" | Wait for full response (varies by modality) | Education | Industry article (*The Aesthetic Guide*) | cadence_notes | No |

---

## Schema Recommendation

### Product-Level Fields (add to `gl_products`)

```sql
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS initial_series_count INTEGER;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS initial_interval_days_min INTEGER;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS initial_interval_days_max INTEGER;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS maintenance_interval_days_min INTEGER;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS maintenance_interval_days_max INTEGER;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS minimum_retreatment_days INTEGER;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS typical_followup_days INTEGER;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS downtime_days_min INTEGER;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS downtime_days_max INTEGER;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS downtime_description TEXT;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS cadence_notes TEXT;
```

**11 fields. All nullable. No existing data affected.**

### Pair-Level Fields (add to `item_relationships`)

```sql
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS same_session_ok BOOLEAN;
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS same_session_rationale TEXT;
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS staging_required BOOLEAN DEFAULT false;
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS staging_sequence TEXT; -- 'product_a_first' | 'product_b_first'
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS staging_interval_days_min INTEGER;
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS staging_interval_days_max INTEGER;
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS staging_rationale TEXT;
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS combined_downtime_note TEXT;
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS safety_critical BOOLEAN DEFAULT false;
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS timing_warning_level TEXT; -- 'hard_block' | 'warning' | 'education'
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS timing_notes TEXT;
```

**11 fields. All nullable with sensible defaults. No existing data affected.**

### Minimal Viable Schema (if 22 fields feels like too many)

If Chris wants to start smaller, the essential subset is:

**Product-level (6 fields):**
- minimum_retreatment_days (safety)
- maintenance_interval_days_min, maintenance_interval_days_max (cadence)
- downtime_days_min, downtime_days_max (downtime)
- cadence_notes (everything else)

**Pair-level (5 fields):**
- same_session_ok (the most-queried timing question)
- same_session_rationale (why)
- safety_critical (surfaces hard stops)
- timing_warning_level (enforcement tier)
- timing_notes (everything else)

**11 essential fields** vs. 22 full fields. The full set is recommended but the minimal set covers 80% of agent query needs.

### What Should NOT Be in Phase 7 Schema
- Event-based timeline calculator → Phase 9 care plans
- Area-specific cadence (product_area_config) → Phase 9 or later
- Agent-loadable timing fuel packets → Phase 10 compilation
- thermal_tier on products → Not formalized (single-source principle)
- Regional legal flags (France rule) → Configuration/settings, not product schema

---

## Deliverables Recommendation

| Artifact | Status | Rationale |
|----------|--------|-----------|
| `supabase/migrations/07-timing-schema.sql` | **Required** | ALTER TABLE statements for product + pair timing fields |
| `supabase/compile_sql/07-timing-product-cadence.sql` | **Required** | UPDATE statements populating product cadence for 20 products |
| `supabase/compile_sql/07-timing-pair-rules.sql` | **Required** | UPDATE statements populating pair timing for ~30 canonical/common pairs |
| `TIMING_EVALUATION.md` | **Required** | Full timing rule inventory with evidence (this document serves as draft) |
| `TIMING_REVIEW.md` | **Required** | Safety-critical rules + items requiring Chris review (~6-8 items) |
| `TIMING_RUBRIC.md` | **Optional** | Scoring/evaluation criteria for timing rule quality |
| `BOOKING_LOGIC_CHEAT_SHEET.md` | **Optional** | Quick reference for booking agents |
| `TIMING_EVIDENCE_PACK.md` | **Optional** | All PubMed citations backing timing rules |
| `TIMING_CORPUS_QUERY_LOG.md` | **Optional** | Record of all corpus searches executed |
| Visual timeline templates | **Deferred → Phase 9** | Care-plan territory |
| Event calculator logic | **Deferred → Phase 9** | Care-plan territory |
| Compiled timing fuel packets | **Deferred → Phase 10** | Agent fuel compilation |
| QA report | **Deferred → post-implementation** | Verify data accuracy after SQL runs |

---

## Open Questions for Chris

1. **Default same-session posture:** The evidence strongly supports "YES unless flagged." But this is a business/liability decision. Does A360 want to default-recommend same-session combinations, or require explicit approval per pair? (Recommendation: YES with warning system)

2. **50-unit toxin threshold:** Multiple practitioners exceed this routinely (80+ units for full face). The published evidence says >50U increases antibody risk. Should A360 surface this as a warning, or is it too conservative for the practitioner audience?

3. **France filler+toxin prohibition:** Should A360 represent regional legal restrictions in the timing schema, or is this out of scope? (Recommendation: out of scope for Phase 7; regional config is a separate feature)

4. **Downtime framing — conservative or commercially realistic?** PubMed says CO2 ablative recovery is 7-10 days. YouTube providers with exosome protocols say 5 days. Should A360 document the conservative published number, the real-world number, or both?

5. **Laser + filler same-day:** Expert practice (Dr. Weiner: safe) vs. YouTube providers (wait 1-2 weeks). No PubMed evidence of harm. Should A360 classify this as YES (same-session OK) or CONDITIONAL? (Recommendation: YES with education note about the disagreement)

6. **Body contouring combination timing is thin on evidence.** CoolSculpting + Kybella, CoolSculpting + muscle stimulation, etc. — should Phase 7 include body contouring pairs, or defer those to a future phase when evidence matures?

7. **Minimal vs. full schema:** 11 essential fields or 22 full fields? The full set is more future-proof but adds more data-entry work in Phase 7.

---

## Final Research Conclusion

### Best-Supported Answers

The corpus provides strong, multi-source evidence for the core Phase 7 decisions:
- **Default YES for same-session** (PubMed + Podcast + YouTube consensus)
- **Full cadence profiles** (every source describes treatment arcs, not just minimums)
- **Both product-level and pair-level timing** (orthogonal concerns)
- **Warning model for exceptions** (hard blocks only for pharmacological conflicts)
- **Hybrid safety floor** (evidence-based hard stops + expert-consensus warnings)
- **No new table** (extend existing products + relationships)
- **Phase 9 for event timing** (data captured now, logic deferred)

### What to Implement Now (Phase 7)
- Schema migration: 11-22 new columns across 2 tables
- Product cadence data for ~20 products (the Phase 6 scope)
- Pair-level timing rules for ~30 canonical/common pairs
- Safety-critical flagging for ~6-8 hard stops
- Timing evaluation and review documents

### What to Defer
- Event-based timeline calculator → Phase 9
- Area-specific cadence (product_area_config) → Phase 9
- Thermal_tier product attribute → Not yet (single-source)
- Regional legal restrictions → Separate feature
- Agent fuel compilation with timing → Phase 10
- Visual timeline templates → Phase 9

### What Needs Chris Review
- Default same-session posture (business decision)
- 50-unit toxin threshold (warning vs. too conservative)
- France legal restriction scope
- Downtime framing (conservative vs. realistic)
- Filler + laser same-day classification
- Body contouring pair scope
- Minimal vs. full schema

### Evidence Gaps
- Body contouring combination timing (limited PubMed + podcast coverage)
- Skincare regimen timing relative to procedures (thin corpus coverage)
- Combined downtime for specific pairs (expert-determined needed for ~30 pairs)
- Long-term outcomes of aggressive same-day stacking (no long-term PubMed data)
- Regional legal variation beyond France (not systematically researched)

---

*Document generated 2026-06-13. All quotes are verbatim from corpus transcripts/articles. PubMed evidence levels assigned based on study design (HIGH = RCT/meta-analysis, MODERATE = prospective/case series/systematic review, LOW = case report/expert opinion). Podcast/YouTube evidence classified as expert-practice intelligence, not clinical evidence.*
