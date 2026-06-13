# Concern Clusters — Phase 05

**Created:** 2026-06-13
**Supabase project:** aejskvmpembryunnbgrk
**SQL file:** supabase/compile_sql/05-03-cluster-definitions.sql

Concern clusters are multi-mechanism experiential descriptors that patients use to describe compound presentations. A patient saying "I look tired" is actually routing to 3+ distinct underlying concerns, each linking to different product families. This document captures the 4 clusters defined in Phase 05-03.

---

## Cluster Definitions

### Cluster 1: Tired Appearance

| Field | Value |
|-------|-------|
| **Patient phrase** | "I always look tired" |
| **Description** | Multi-mechanism presentation where patients appear fatigued despite adequate rest. Routes to under-eye hollows, brow heaviness, midface deflation, and skin dullness. |
| **Cluster ID** | c1a0e8f2-3b4d-4a5c-8e1f-9d2b0a7c6e3f |

**Member concerns:**

| Concern | Mechanism Role |
|---------|---------------|
| Tear Trough Hollowing | primary |
| Brow Ptosis | primary |
| Age-Related Volume Loss | contributing |
| Skin Quality Improvement | contributing |
| Forehead Lines | contributing |

---

### Cluster 2: Lower-Face Heaviness

| Field | Value |
|-------|-------|
| **Patient phrase** | "My face is falling" |
| **Description** | Tissue descent and volume redistribution in the lower face creating a heavy, drooping appearance. Routes to jowling, marionette descent, submental volume, and neck banding. |
| **Cluster ID** | c2b1f9a3-4c5e-4b6d-9f2a-0e3c1b8d7f4a |

**Member concerns:**

| Concern | Mechanism Role |
|---------|---------------|
| Skin Laxity | primary |
| Marionette Lines | primary |
| Submental Fullness | contributing |
| Jawline Definition | contributing |
| Platysmal Band Concern | contributing |

---

### Cluster 3: Post-Weight-Loss Laxity

| Field | Value |
|-------|-------|
| **Patient phrase** | "I lost weight but my skin is loose now" |
| **Description** | Skin and soft tissue redundancy following significant weight loss, with deflated fat compartments and reduced structural support. |
| **Cluster ID** | c3c2a0b4-5d6f-4c7e-0a3b-1f4d2c9e8a5b |

**Member concerns:**

| Concern | Mechanism Role |
|---------|---------------|
| Skin Laxity | primary |
| Age-Related Volume Loss | primary |
| Cheek Volume Loss | contributing |
| Jawline Definition | contributing |

---

### Cluster 4: Angry/Mean Resting Expression

| Field | Value |
|-------|-------|
| **Patient phrase** | "People think I look angry when I am not" |
| **Description** | Resting facial expression that conveys displeasure or sternness due to glabellar complex, oral commissure descent, and brow position. |
| **Cluster ID** | c4d3b1c5-6e7a-4d8f-1b4c-2a5e3d0f9b6c |

**Member concerns:**

| Concern | Mechanism Role |
|---------|---------------|
| Frown Lines / Glabellar Lines | primary |
| Marionette Lines | contributing |
| Brow Ptosis | contributing |

---

## DB Counts (Post-Execution)

| Entity | Count |
|--------|-------|
| concern_clusters | 4 |
| concern_cluster_members | 17 |

---

## Routing Demo Results

### Query A — "I look tired" Routing

**Query:**
```sql
SELECT DISTINCT p.name as product, c.name as concern, ic.relevance, a.phrase
FROM aliases a
JOIN concerns c ON c.id = a.concern_id
JOIN item_concerns ic ON ic.concern_id = c.id
JOIN products p ON p.id = ic.offering_id
WHERE a.normalized LIKE '%tired%'
ORDER BY ic.relevance, p.name;
```

**Results:**

| Product | Concern | Relevance | Matching Phrase |
|---------|---------|-----------|-----------------|
| HydraFacial Syndeo | Skin Dullness | primary | "my skin looks tired and flat" |
| SKINVIVE by Juvederm | Skin Quality Improvement | primary | "my skin looks tired" |
| Juvederm Vollure XC | Tear Trough Hollowing | secondary | "I always look tired" |
| Juvederm Vollure XC | Tear Trough Hollowing | secondary | "I look tired all the time even when I'm not" |
| Juvederm Vollure XC | Tear Trough Hollowing | secondary | "tired eyes from hollowing" |
| RHA Redensity | Tear Trough Hollowing | secondary | "I always look tired" |
| RHA Redensity | Tear Trough Hollowing | secondary | "I look tired all the time even when I'm not" |
| RHA Redensity | Tear Trough Hollowing | secondary | "tired eyes from hollowing" |
| SKINVIVE by Juvederm | Skin Dullness | secondary | "my skin looks tired and flat" |
| Juvederm Voluma XC | Tear Trough Hollowing | adjunctive | "I always look tired" |
| Juvederm Voluma XC | Tear Trough Hollowing | adjunctive | "I look tired all the time even when I'm not" |
| Juvederm Voluma XC | Tear Trough Hollowing | adjunctive | "tired eyes from hollowing" |

**Summary:**
- **Distinct products:** 5 (HydraFacial Syndeo, SKINVIVE by Juvederm, Juvederm Vollure XC, RHA Redensity, Juvederm Voluma XC)
- **Distinct concern mechanisms:** 3 (Skin Dullness, Skin Quality Improvement, Tear Trough Hollowing)
- **SC-3 status: PASS** (>=3 products, >=2 concern mechanisms)

---

### Query B — Cluster-Level Product Routing

**Query:**
```sql
SELECT cc.name as cluster, c.name as concern, ccm.mechanism_role,
       COUNT(DISTINCT ic.offering_id) as product_count
FROM concern_clusters cc
JOIN concern_cluster_members ccm ON ccm.cluster_id = cc.id
JOIN concerns c ON c.id = ccm.concern_id
LEFT JOIN item_concerns ic ON ic.concern_id = c.id
GROUP BY cc.name, c.name, ccm.mechanism_role
ORDER BY cc.name, ccm.mechanism_role, c.name;
```

**Results:**

| Cluster | Concern | Role | Products |
|---------|---------|------|----------|
| Angry/Mean Resting Expression | Brow Ptosis | contributing | 0 |
| Angry/Mean Resting Expression | Marionette Lines | contributing | 3 |
| Angry/Mean Resting Expression | Frown Lines | primary | 5 |
| Lower-Face Heaviness | Jawline Definition | contributing | 7 |
| Lower-Face Heaviness | Platysmal Band Concern | contributing | 3 |
| Lower-Face Heaviness | Submental Fullness | contributing | 2 |
| Lower-Face Heaviness | Marionette Lines | primary | 3 |
| Lower-Face Heaviness | Skin Laxity | primary | 9 |
| Post-Weight-Loss Laxity | Cheek Volume Loss | contributing | 3 |
| Post-Weight-Loss Laxity | Jawline Definition | contributing | 7 |
| Post-Weight-Loss Laxity | Age-Related Volume Loss | primary | 3 |
| Post-Weight-Loss Laxity | Skin Laxity | primary | 9 |
| Tired Appearance | Age-Related Volume Loss | contributing | 3 |
| Tired Appearance | Forehead Lines | contributing | 5 |
| Tired Appearance | Skin Quality Improvement | contributing | 1 |
| Tired Appearance | Brow Ptosis | primary | 0 |
| Tired Appearance | Tear Trough Hollowing | primary | 3 |

**Note:** Brow Ptosis shows 0 product_count because no item_concerns rows currently link products to this newly-added concern. Products will be linked when Brow Ptosis is wired to the appropriate filler and toxin products (deferred to a future dossier phase).

---

### Query C — Full Alias Coverage

**Query:**
```sql
SELECT c.name, COUNT(a.id) as alias_count
FROM concerns c
LEFT JOIN aliases a ON a.concern_id = c.id
GROUP BY c.name
ORDER BY alias_count ASC;
```

**Results (48 concerns, all with >= 4 aliases):**

| Concern | Alias Count |
|---------|-------------|
| Unwanted Body Hair | 4 |
| Feminine Wellness | 4 |
| Vascular Lesions | 4 |
| Buttock Appearance | 4 |
| Muscle Definition | 5 |
| Melasma | 5 |
| Skin Dullness | 5 |
| Uneven Skin Tone | 5 |
| Gummy Smile | 5 |
| Unwanted Facial Hair | 5 |
| Rosacea | 5 |
| Fine Lines & Wrinkles | 6 |
| Brow Ptosis | 6 |
| Buttock Augmentation | 7 |
| Flank Fat | 7 |
| Bunny Lines | 7 |
| Dynamic Wrinkle Correction | 8 |
| Abdominal Fat | 8 |
| Thigh Fat | 8 |
| Hyperhidrosis | 8 |
| Hyperpigmentation | 8 |
| Platysmal Band Concern | 8 |
| Skin Texture | 8 |
| Neck Lines | 8 |
| Back Fat | 8 |
| Lip Augmentation | 9 |
| Arm Fat | 9 |
| Skin Hydration | 9 |
| Bruxism & TMJ | 10 |
| Chin Augmentation | 10 |
| Jawline Definition | 11 |
| Lip Volume Loss | 11 |
| Hand Volume Loss | 11 |
| Temple Hollowing | 11 |
| Skin Quality Improvement | 11 |
| Sun Damage | 11 |
| Acne & Breakouts | 11 |
| Submental Fullness | 11 |
| Forehead Lines | 12 |
| Marionette Lines | 13 |
| Age-Related Volume Loss | 13 |
| Perioral Lines | 14 |
| Cheek Volume Loss | 14 |
| Nasolabial Folds | 14 |
| Crow's Feet | 14 |
| Skin Laxity | 16 |
| Tear Trough Hollowing | 16 |
| Frown Lines | 17 |

**Result: 0 concerns with <3 aliases. Minimum is 4. SC-1 PASS.**

---

## Success Criteria Verification

| Criterion | Status |
|-----------|--------|
| SC-1: Zero concerns with <3 aliases | PASS — minimum is 4 |
| SC-2: concern_clusters has 4 rows | PASS |
| SC-3: concern-first routing demo-able for "I look tired" | PASS — 5 products, 3 mechanisms |
| concern_cluster_members has >=15 rows | PASS — 17 rows |
| Each cluster has >=2 members with mechanism_role | PASS — minimum is 3 members |

---

## Known Gap

**Brow Ptosis has 0 item_concerns rows.** This new concern (added in Plan 05-01) does not yet have any product links. The "Tired Appearance" cluster correctly includes it as a primary mechanism, but the product routing for Brow Ptosis specifically returns 0 products.

**Impact:** Does not affect SC-3 (the routing query still returns 5 products via Tear Trough Hollowing, Skin Dullness, Skin Quality Improvement). The gap means Brow Ptosis-specific treatment options (Botox brow lift, Dysport) are not surfaced via concern-routing.

**Resolution:** Deferred to a future dossier phase — when Brow Ptosis item_concerns rows are added for neurotoxin products, this count will improve.
