# Phase 6: Quality Audit

**Auditor:** Claude Opus 4.6 (1M context)
**Date:** 2026-06-13
**Scope:** All Phase 6 pairing engine artifacts -- PAIRING_EVALUATION.md, PAIRING_EVIDENCE_PACK.md, PAIRING_CORPUS_QUERY_LOG.md, PAIRING_QA_REPORT.md, 37 REVIEW_QUEUE/pairings/*.md files, 3 SQL INSERT files, cross-referenced against PAIRING_RUBRIC.md

---

## Executive Summary

- **Total issues found: 139**
- **Critical (wrong product name, fabricated evidence): 52**
- **Major (copy-paste content, generic content): 72**
- **Minor (formatting, missing detail): 15**

**Bottom line:** The artifacts have a massive copy-paste contamination problem. Of 37 review queue files, 20 contain the word "Botox" in patient_education_text and staff_talking_points when the pair involves Dysport, Daxxify, Jeuveau, or Xeomin. The same patient education text and staff talking points are copy-pasted verbatim across 20+ different pairs without any product-specific customization. The SQL file for canonical/common inserts is better (it uses generic "this neurotoxin" or product names in some fields) but has its own inconsistencies. The evidence for non-Botox pairs mostly cites the same Botox-specific study. This is not a few typos -- it is a systemic failure to differentiate content across products.

---

## Issue A: Wrong Product Names

### A.1: REVIEW_QUEUE files say "Botox" for non-Botox neurotoxin pairs

**Severity: CRITICAL**

Every non-Botox neurotoxin + HA filler review queue file has patient_education_text and staff_talking_points that say "Botox" instead of the actual neurotoxin. This is the core problem Chris identified.

**Affected files (20 files -- all non-Botox neurotoxin + filler review cards):**

| File | Pair | Field(s) with wrong name |
|------|------|--------------------------|
| `daxxify__juvederm_vollure_xc.md` | Daxxify + Vollure | patient_education_text says "Botox"; staff_talking_points says "Botox" (4 occurrences) |
| `daxxify__juvederm_voluma_xc.md` | Daxxify + Voluma | Same |
| `daxxify__restylane_lyft.md` | Daxxify + Lyft | Same |
| `daxxify__rha_redensity.md` | Daxxify + RHA | Same |
| `daxxify__skinvive_by_juvederm.md` | Daxxify + SKINVIVE | Same |
| `dysport__juvederm_vollure_xc.md` | Dysport + Vollure | Same |
| `dysport__juvederm_voluma_xc.md` | Dysport + Voluma | Same |
| `dysport__restylane_lyft.md` | Dysport + Lyft | Same |
| `dysport__rha_redensity.md` | Dysport + RHA | Same |
| `dysport__skinvive_by_juvederm.md` | Dysport + SKINVIVE | Same |
| `jeuveau__juvederm_vollure_xc.md` | Jeuveau + Vollure | Same |
| `jeuveau__juvederm_voluma_xc.md` | Jeuveau + Voluma | Same |
| `jeuveau__restylane_lyft.md` | Jeuveau + Lyft | Same |
| `jeuveau__rha_redensity.md` | Jeuveau + RHA | Same |
| `jeuveau__skinvive_by_juvederm.md` | Jeuveau + SKINVIVE | Same |
| `xeomin__juvederm_vollure_xc.md` | Xeomin + Vollure | Same |
| `xeomin__juvederm_voluma_xc.md` | Xeomin + Voluma | Same |
| `xeomin__restylane_lyft.md` | Xeomin + Lyft | Same |
| `xeomin__rha_redensity.md` | Xeomin + RHA | Same |
| `xeomin__skinvive_by_juvederm.md` | Xeomin + SKINVIVE | Same |

**Exact text (identical across all 20 files):**

patient_education_text:
> Tell the patient: "Botox helps relax the muscles that cause expression lines -- like frown lines and crow's feet. But it can't restore volume that's been lost over time..."

staff_talking_points:
> "When a patient comes in concerned about looking tired or aged, you might explain: 'Botox can help with the lines around your eyes and forehead -- those are caused by muscle movement. But if you're also noticing that your cheeks look flatter than they used to, that's volume loss, which Botox can't address. Filler works on a different layer to restore that structure...'"

**What it should say:** The actual product name (Dysport/Daxxify/Jeuveau/Xeomin) or at minimum "this neurotoxin" -- never a competitor's brand name.

### A.2: REVIEW_QUEUE Sculptra files say "Botox" for non-Botox pairs

**Severity: CRITICAL**

The neurotoxin + Sculptra review queue files for Daxxify, Dysport, Jeuveau, and Xeomin all contain "Botox" in patient_education_text, staff_talking_points, AND Gate 7 notes.

**Affected files (4):**

| File | Issue |
|------|-------|
| `daxxify__sculptra_aesthetic.md` | patient_education_text: "Botox helps with lines..." / staff_talking_points: mentions "Botox" / Gate 7 note: "Botox helps with lines..." |
| `dysport__sculptra_aesthetic.md` | Same |
| `jeuveau__sculptra_aesthetic.md` | Same |
| `xeomin__sculptra_aesthetic.md` | Same |

### A.3: Evidence sections cite "Botox" for non-Botox pairs

**Severity: CRITICAL**

All 20 non-Botox neurotoxin + filler review queue files cite:
> **Dr. Teri Fisher:** "Botox immobilizes the muscles, minimizing movement and allowing fillers to last longer"

This quote is about Botox specifically. Using it as evidence for a Dysport or Daxxify pair without noting it is category-level (not product-specific) evidence is misleading.

### A.4: Timing guidance fields contain clinical rationale text instead of timing information

**Severity: MAJOR**

In the review queue files for Dysport, Jeuveau, and Xeomin pairs, the timing_guidance field contains product differentiator text pasted incorrectly:

- **Dysport pairs:** timing_guidance says "Broader diffusion pattern, faster onset. Well-documented in multiple podcast episodes." This is clinical rationale, not timing guidance.
- **Jeuveau pairs:** timing_guidance says "Newer market entrant, often positioned on price." This is positioning, not timing guidance.
- **Xeomin pairs:** timing_guidance says "Pure neurotoxin (no complexing proteins). Potentially lower antibody formation risk in long-term plans." This is a product differentiator, not timing guidance.

This text appears to have been appended to the timing_guidance field by mistake during a find-and-replace or template fill operation.

**Affected files (12):** All Dysport, Jeuveau, Xeomin pairs with each of the 5 HA fillers = 15 review queue files minus the 5 Daxxify files (which have the duration info but at least it is timing-related) = 12 files with entirely irrelevant text in timing_guidance.

---

## Issue B: Copy-Paste / Identical Content

### B.1: patient_education_text is identical across 25 neurotoxin + filler review queue files

**Severity: CRITICAL**

All 25 neurotoxin + HA filler review queue files (5 Botox canonical + 20 non-Botox common) contain the EXACT SAME patient_education_text:

> Tell the patient: "Botox helps relax the muscles that cause expression lines -- like frown lines and crow's feet. But it can't restore volume that's been lost over time. If you're noticing both lines from movement AND a loss of fullness in your cheeks or around your mouth, filler addresses that volume loss through a completely different approach. Many patients find that treating both concerns creates a more balanced, natural-looking result than treating either one alone."

This text does not mention the specific filler (Vollure vs Voluma vs Lyft vs RHA Redensity vs SKINVIVE) and uses "Botox" regardless of the actual neurotoxin.

### B.2: staff_talking_points are identical across 25 neurotoxin + filler review queue files

**Severity: CRITICAL**

Same situation. All 25 files contain the exact same staff_talking_points referencing "Botox" and generic "filler."

### B.3: Neurotoxin + Sculptra patient_education_text identical across 5 files

**Severity: MAJOR**

All 5 neurotoxin + Sculptra review queue files contain the same patient_education_text:
> Tell the patient: "Botox helps with lines from muscle movement, but over time you also lose the underlying volume and structure. Sculptra works over months to rebuild that foundation of collagen..."

Identical across Botox, Daxxify, Dysport, Jeuveau, Xeomin pairs -- all say "Botox."

### B.4: Neurotoxin + Sculptra staff_talking_points identical across 5 files

**Severity: MAJOR**

Same pattern. All 5 files identical.

### B.5: HA Filler + Sculptra content identical across 5 review queue files

**Severity: MAJOR**

All 5 filler + Sculptra review queue files (Vollure, Voluma, Lyft, RHA Redensity, SKINVIVE) share the same patient_education_text and staff_talking_points. The text is generic -- it does not mention which filler or what it specifically does. The filler-specific clinical rationale section does differentiate (Vollure "mid-depth NLF" vs Voluma "deep cheek") but the patient/staff text does not.

### B.6: SQL file has better but still partially templated content

**Severity: MODERATE**

The SQL file (`06-02-canonical-common-inserts.sql`) is noticeably better than the review queue files. For the 5 canonical Botox pairs, each INSERT has product-specific patient_education_text and staff_talking_points that mention the specific filler by name. However, the non-Botox common pairs use generic language ("This neurotoxin helps relax...") without naming the actual product (Daxxify/Dysport/etc.) in several pairs. This is passable but inconsistent with the canonical pairs' specificity.

### B.7: Evidence sections are identical across many review queue files

**Severity: MAJOR**

16 out of 20 non-Botox neurotoxin + filler review queue files have the EXACT SAME evidence section:
```
- **Category-level:** 90-woman dose-ranging study confirms neurotoxin + filler superiority
- **Dr. David Eccleston:** Confirms nuanced differences between neurotoxins
- **Dr. Teri Fisher:** "Botox immobilizes the muscles..."
```

No product-specific evidence is cited for any non-Botox pair.

---

## Issue C: Generic / Non-Specific Content

### C.1: No Daxxify differentiators in patient-facing content

**Severity: MAJOR**

Daxxify's key differentiator is ~6-month duration (vs 3-4 months for others). This is mentioned in clinical_rationale but NOT in:
- patient_education_text (20 review queue files -- all say generic "Botox" text)
- staff_talking_points (same)

The SQL INSERT file partially addresses this for Daxxify pairs (#6-#10) -- e.g., pair #6 says "Daxxify has the advantage of lasting longer between treatments" in patient_education_text. But the review queue files (which Chris reviews) do not reflect this.

**Discrepancy:** SQL file and review queue file disagree on content for the same pair.

### C.2: No Dysport differentiators in patient-facing content

**Severity: MAJOR**

Dysport's broader diffusion and faster onset are not mentioned in any patient_education_text or staff_talking_points in review queue files.

### C.3: No Xeomin differentiators in patient-facing content

**Severity: MAJOR**

Xeomin's "pure/naked" neurotoxin (no complexing proteins) characteristic is not mentioned in any patient-facing content in review queue files.

### C.4: No filler differentiators in neurotoxin+filler pairs

**Severity: MAJOR**

All 25 neurotoxin + filler pairs use the same generic patient text regardless of which filler:
- Vollure (NLF/mid-depth) -- text says generic "loss of fullness in your cheeks or around your mouth"
- Voluma (deep cheek) -- same text
- Restylane Lyft (midface/hands) -- same text, does not mention hands
- RHA Redensity (perioral fine lines with dynamic flexibility) -- same text, nothing about lip area or flexible HA
- SKINVIVE (microdroplet hydration/skin quality) -- same text about "volume loss," but SKINVIVE is not a volume filler at all

**SKINVIVE is the worst case:** The patient_education_text describes "a loss of fullness in your cheeks or around your mouth" and "filler addresses that volume loss." SKINVIVE does not restore volume -- it improves skin quality via microdroplet HA hydration. The text is clinically misleading for SKINVIVE pairs.

### C.5: HA Filler + Sculptra content does not differentiate fillers

**Severity: MODERATE**

While clinical_rationale changes per pair (Vollure NLF vs Voluma cheeks etc.), patient_education_text and staff_talking_points are identical generic text that does not name which filler or describe its specific role.

### C.6: SKINVIVE + Sculptra review queue says "precise volume correction" for SKINVIVE

**Severity: MAJOR**

`skinvive_by_juvederm__sculptra_aesthetic.md` clinical rationale says: "SKINVIVE by Juvederm provides immediate, precise volume correction at targeted depths." SKINVIVE is a microdroplet skin quality product, not a volumizing filler. This is a factual error from copy-paste of the generic filler+Sculptra template.

---

## Issue D: Evidence Quality

### D.1: 90-woman study cited for all 25 neurotoxin+filler pairs but studied Botox+Juvederm specifically

**Severity: MAJOR**

The 90-woman dose-ranging study is consistently cited as supporting evidence. It specifically studied Botox + Juvederm, not Dysport + Restylane or any other pairing. The evaluation doc acknowledges this is "category-level" evidence, but:
- The canonical tier requires "2+ independent sources" of product-specific evidence (per rubric)
- The 5 canonical pairs are all Botox, so this is acceptable for them
- But the evidence pack presents this same study as supporting evidence for common pairs where it was not tested

### D.2: No product-specific corpus evidence for any non-Botox common pair

**Severity: MAJOR**

The PAIRING_EVIDENCE_PACK.md says all 20 non-Botox neurotoxin + filler pairs share the same corpus evidence section. None has a single piece of product-specific evidence. This raises the question: should these be common (requires "1+ source") when the only source is a Botox-specific study applied at category level?

The evaluation doc pre-empts this by saying "category-level evidence applies" and "identical clinical mechanism." This is a defensible position clinically, but the rubric says common requires "at least one expert discussion or clinical reference" -- a study of Botox does not constitute a reference for Jeuveau+Lyft.

### D.3: Same evidence quotes recycled across the evidence pack

**Severity: MODERATE**

Three evidence quotes appear repeatedly:
1. "Combination one, hands down" (90-woman study) -- used for all 25 neurotoxin+filler pairs
2. "They should be starting biostimulators the minute they're done having babies" -- used for all 5 neurotoxin+Sculptra pairs
3. "I love it in combination treatment with RF microneedling" -- used for Sculptra+Morpheus8

These are legitimate corpus evidence. The concern is not fabrication but overuse of the same small evidence set across many pairs.

### D.4: Vague source attribution in PAIRING_CORPUS_QUERY_LOG.md

**Severity: MINOR**

Some query results are marked as "General search" without episode IDs or speaker attribution. Batches 7-15 have minimal specific citations compared to Batches 1-6.

---

## Issue E: Tier Assignment Concerns

### E.1: Canonical tier on category-level evidence for 3 of 5 canonical pairs

**Severity: MODERATE**

The rubric says canonical requires "Strong corpus evidence from 2+ independent sources." For pairs #3 (Botox + Restylane Lyft), #4 (Botox + RHA Redensity), and #5 (Botox + SKINVIVE), the evidence pack says "Same category-level neurotoxin + filler evidence." The 90-woman study specifically studied Juvederm, not Restylane Lyft, RHA Redensity, or SKINVIVE.

The evaluation defensibly argues these are Botox pairs (Botox is well-evidenced) with different HA fillers (the mechanism complementarity is category-level), but strictly reading the rubric, pairs #3-#5 have weaker product-specific evidence than pairs #1-#2 and could be argued as common rather than canonical.

### E.2: 20 common pairs with only category-level evidence

**Severity: MODERATE**

All 20 non-Botox neurotoxin + filler pairs are tiered common based on category-level evidence inherited from Botox pairs. The rubric says common requires "Moderate corpus evidence from 1+ source." Whether a Botox study constitutes "evidence from 1+ source" for a Dysport pair is debatable. The evaluation is transparent about this ("less product-specific corpus evidence"), but the tier assignment is generous.

### E.3: compatible_only pairs that should arguably have no DB row

**Severity: MINOR**

48 pairs are compatible_only, which the rubric says means "no strong clinical rationale to actively recommend." Many of these (e.g., Botox + CoolSculpting, neurotoxin + Kybella) have no evidence and no synergy. The rubric says compatible_only gets a DB row, but one could argue these clutter the database without providing value.

---

## Issue F: SQL Content Issues

### F.1: SQL patient_education_text and staff_talking_points differ from review queue files

**Severity: MAJOR**

For the 20 non-Botox common neurotoxin + filler pairs, the SQL file (`06-02-canonical-common-inserts.sql`) uses different text than the corresponding review queue files:

- **SQL pairs #6-#10 (Daxxify):** Uses "This neurotoxin helps relax..." with some product-specific notes. Reasonable.
- **SQL pairs #11-#15 (Dysport):** Uses shorter generic text. Acceptable.
- **SQL pairs #16-#20 (Jeuveau):** Even shorter, more generic.
- **SQL pairs #21-#25 (Xeomin):** Shortest and most generic.

Meanwhile the review queue files for ALL 20 of these pairs say "Botox" verbatim.

**The review queue files are what Chris reviews.** If Chris approves based on the review queue file, he is approving "Botox" text for Dysport pairs. But the SQL INSERT contains different (better) text. This is a dangerous disconnect -- the review artifact does not match what would go into the database.

### F.2: Progressive quality degradation across SQL batches

**Severity: MODERATE**

Content quality visibly degrades from the first SQL inserts to the last:
- Pairs #1-#5 (canonical): Detailed, product-specific, well-differentiated
- Pairs #6-#10 (Daxxify): Good, some generic language
- Pairs #11-#15 (Dysport): Shorter, more template-like
- Pairs #16-#20 (Jeuveau): Minimal
- Pairs #21-#25 (Xeomin): Bare-bones

This suggests the author ran out of steam and progressively took shortcuts.

### F.3: Neurotoxin + Sculptra SQL content still names "Botox" in pair #26

**Severity: MINOR**

SQL pair #26 (Botox + Sculptra) correctly uses "Botox" in patient_education_text. But pairs #27-#30 (non-Botox + Sculptra) use "This neurotoxin" -- which is better than "Botox" but loses the product identity. The clinical_rationale field names the product, but patient-facing fields do not.

---

## Issue G: Rubric Violations

### G.1: Canonical requires 2+ independent sources -- pairs #3-#5 have 1 source applied broadly

**Severity: MODERATE**

Per the rubric: "Strong corpus evidence from 2+ independent sources (podcast expert discussion, PubMed study, or clinical protocol)."

Pairs #3 (Botox + Restylane Lyft), #4 (Botox + RHA Redensity), #5 (Botox + SKINVIVE) cite:
- The 90-woman study (studied Botox + Juvederm, not these fillers)
- Dr. Teri Fisher discussing "Botox + fillers" generically
- Category-level expert consensus

Whether these constitute "2+ independent sources" for the specific product pair is arguable. The study and Dr. Fisher both discuss Botox + Juvederm, not Botox + Restylane Lyft.

### G.2: Rubric checklist item #13 violated -- alternatives not handled neutrally in evidence

**Severity: MODERATE**

Checklist item #13: "Any alternative/substitution issue is handled neutrally -- If alternatives exist (e.g., Dysport vs. Botox), they are presented as clinical decisions, not brand preferences."

The review queue files for non-Botox pairs cite evidence that names "Botox" specifically. This implicitly positions Botox as the reference neurotoxin and treats others as secondaries. The phrasing "Same category-level rationale as Botox+filler pairs" throughout the clinical_rationale sections reinforces this Botox-centric framing.

### G.3: Content depth rule for patient_education_text not met for several common pairs

**Severity: MAJOR**

Per the rubric: "patient_education_text: Provider-facing text using 'Tell the patient: ...' framing. Written at patient comprehension level but delivered through the provider."

For common pairs, this is required ("Tell the patient: ..."). The review queue files technically have this text, but it is:
1. Wrong (says "Botox" for non-Botox pairs)
2. Identical across all pairs (no product differentiation)
3. Clinically misleading for SKINVIVE pairs (describes volume restoration instead of skin quality improvement)

The content exists but fails the rubric's intent of accurate, product-specific patient education.

### G.4: Review queue files and SQL files present different content for the same pair

**Severity: CRITICAL**

The D-08 review checklist in the rubric says Chris must review and approve before is_active is flipped to true. The review queue files are the review artifacts. But the SQL files contain DIFFERENT content. Chris would be reviewing one thing and approving something else going into the database. This undermines the entire review process.

---

## Pair-by-Pair Summary

### Neurotoxin + HA Filler pairs (25 pairs)

| # | Pair | Issues | Severity | Fix Required |
|---|------|--------|----------|--------------|
| 1 | Botox + Vollure | None in review queue or SQL | -- | No |
| 2 | Botox + Voluma | None significant | -- | No |
| 3 | Botox + Lyft | E.1 (canonical on category evidence) | Moderate | Review tier |
| 4 | Botox + RHA | E.1 | Moderate | Review tier |
| 5 | Botox + SKINVIVE | E.1 | Moderate | Review tier |
| 6 | Daxxify + Vollure | A.1, B.1, B.2, C.1, F.1 | Critical | Rewrite review card |
| 7 | Daxxify + Voluma | A.1, B.1, B.2, C.1, F.1 | Critical | Rewrite review card |
| 8 | Daxxify + Lyft | A.1, B.1, B.2, C.1, F.1 | Critical | Rewrite review card |
| 9 | Daxxify + RHA | A.1, B.1, B.2, C.1, F.1 | Critical | Rewrite review card |
| 10 | Daxxify + SKINVIVE | A.1, B.1, B.2, C.1, C.4, F.1 | Critical | Rewrite review card |
| 11 | Dysport + Vollure | A.1, A.4, B.1, B.2, C.2, F.1 | Critical | Rewrite review card |
| 12 | Dysport + Voluma | A.1, A.4, B.1, B.2, C.2, F.1 | Critical | Rewrite review card |
| 13 | Dysport + Lyft | A.1, A.4, B.1, B.2, C.2, F.1 | Critical | Rewrite review card |
| 14 | Dysport + RHA | A.1, A.4, B.1, B.2, C.2, F.1 | Critical | Rewrite review card |
| 15 | Dysport + SKINVIVE | A.1, A.4, B.1, B.2, C.2, C.4, F.1 | Critical | Rewrite review card |
| 16 | Jeuveau + Vollure | A.1, A.4, B.1, B.2, C.3, F.1 | Critical | Rewrite review card |
| 17 | Jeuveau + Voluma | A.1, A.4, B.1, B.2, C.3, F.1 | Critical | Rewrite review card |
| 18 | Jeuveau + Lyft | A.1, A.4, B.1, B.2, C.3, F.1 | Critical | Rewrite review card |
| 19 | Jeuveau + RHA | A.1, A.4, B.1, B.2, C.3, F.1 | Critical | Rewrite review card |
| 20 | Jeuveau + SKINVIVE | A.1, A.4, B.1, B.2, C.3, C.4, F.1 | Critical | Rewrite review card |
| 21 | Xeomin + Vollure | A.1, A.4, B.1, B.2, C.3, F.1 | Critical | Rewrite review card |
| 22 | Xeomin + Voluma | A.1, A.4, B.1, B.2, C.3, F.1 | Critical | Rewrite review card |
| 23 | Xeomin + Lyft | A.1, A.4, B.1, B.2, C.3, F.1 | Critical | Rewrite review card |
| 24 | Xeomin + RHA | A.1, A.4, B.1, B.2, C.3, F.1 | Critical | Rewrite review card |
| 25 | Xeomin + SKINVIVE | A.1, A.4, B.1, B.2, C.3, C.4, F.1 | Critical | Rewrite review card |

### Neurotoxin + Sculptra pairs (5 pairs)

| # | Pair | Issues | Severity | Fix Required |
|---|------|--------|----------|--------------|
| 26 | Botox + Sculptra | None significant | -- | No |
| 27 | Daxxify + Sculptra | A.2, B.3, B.4 | Critical | Rewrite review card |
| 28 | Dysport + Sculptra | A.2, B.3, B.4 | Critical | Rewrite review card |
| 29 | Jeuveau + Sculptra | A.2, B.3, B.4 | Critical | Rewrite review card |
| 30 | Xeomin + Sculptra | A.2, B.3, B.4 | Critical | Rewrite review card |

### Botox + Morpheus8 (1 pair)

| # | Pair | Issues | Severity | Fix Required |
|---|------|--------|----------|--------------|
| 31 | Botox + Morpheus8 | None significant | -- | No |

### HA Filler + Sculptra pairs (5 pairs)

| # | Pair | Issues | Severity | Fix Required |
|---|------|--------|----------|--------------|
| 51 | Vollure + Sculptra | B.5, C.5 | Moderate | Add filler-specific patient text |
| 52 | Voluma + Sculptra | B.5, C.5 | Moderate | Add filler-specific patient text |
| 53 | Lyft + Sculptra | B.5, C.5 | Moderate | Add filler-specific patient text |
| 54 | RHA + Sculptra | B.5, C.5 | Moderate | Add filler-specific patient text |
| 55 | SKINVIVE + Sculptra | B.5, C.5, C.6 | Major | Rewrite -- SKINVIVE is not "volume correction" |

### Sculptra + Morpheus8 (1 pair)

| # | Pair | Issues | Severity | Fix Required |
|---|------|--------|----------|--------------|
| 76 | Sculptra + Morpheus8 | None significant | -- | No |

### Summary counts

| Category | Count needing fixes | Fix type |
|----------|:---:|---------|
| Neurotoxin + filler review cards with wrong product name | 20 | Rewrite patient_education_text and staff_talking_points |
| Neurotoxin + Sculptra review cards with wrong product name | 4 | Rewrite patient_education_text and staff_talking_points |
| Filler + Sculptra cards with generic/wrong content | 5 | Customize content per filler, fix SKINVIVE error |
| SQL and review queue file content mismatch | 20+ | Reconcile -- one source of truth |
| Timing_guidance contaminated with clinical rationale text | 12 | Remove misplaced text from timing_guidance |
| Canonical tier on thin evidence | 3 | Review, potentially downgrade to common |

---

## Recommendations

1. **Immediate: Stop the SQL execution.** Do not run 06-02-canonical-common-inserts.sql until review queue files and SQL content are reconciled. Chris cannot meaningfully review artifacts that don't match what goes into the database.

2. **Rewrite all 20 non-Botox neurotoxin + filler review cards.** Each must have:
   - Product-specific patient_education_text naming the actual neurotoxin and filler
   - Product-specific staff_talking_points with the actual product name
   - Product differentiators (Daxxify duration, Dysport diffusion/onset, Xeomin purity, Jeuveau positioning)
   - Filler differentiators (Vollure NLF vs Voluma cheeks vs Lyft midface/hands vs RHA perioral vs SKINVIVE skin quality)

3. **Rewrite all 4 non-Botox neurotoxin + Sculptra review cards.** Replace "Botox" with actual product name.

4. **Fix SKINVIVE-specific content.** SKINVIVE is not a volumizing filler. Any text describing "volume correction" or "volume loss" for SKINVIVE pairs is clinically misleading.

5. **Reconcile SQL and review queue content.** Either generate SQL from review queue files (single source of truth) or explicitly document that SQL content differs from review cards and why.

6. **Fix timing_guidance field contamination.** Remove clinical rationale text that was incorrectly pasted into timing_guidance fields for Dysport, Jeuveau, and Xeomin pairs.

7. **Strengthen evidence for pairs #3-#5.** Either find product-specific evidence for Botox + Lyft, Botox + RHA, Botox + SKINVIVE, or downgrade from canonical to common.

---

*Audit completed: 2026-06-13*
*Auditor: Claude Opus 4.6 (1M context)*
