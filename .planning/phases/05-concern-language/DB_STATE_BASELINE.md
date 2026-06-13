# DB State Baseline — Phase 5 Concern Language

**Captured:** 2026-06-13
**Supabase project:** aejskvmpembryunnbgrk
**Purpose:** Foundation reference for Phase 5 alias mining. Documents verified DB state after Phase 2 SQL execution.

---

## Aliases Table Schema

Confirmed via `information_schema.columns WHERE table_name = 'aliases'`:

| column_name  | data_type                   | is_nullable | notes                             |
|--------------|-----------------------------|-------------|-----------------------------------|
| id           | uuid                        | NO          | PK, auto-generated                |
| practice_id  | uuid                        | YES         | optional tenant scope             |
| phrase       | text                        | NO          | patient-spoken phrase             |
| normalized   | text                        | YES         | **GENERATED** via gl_normalize_text(phrase) — do NOT include in INSERT |
| concern_id   | uuid                        | YES         | FK to concerns.id                 |
| body_area_id | uuid                        | YES         | FK to body_areas.id (optional)    |
| is_active    | boolean                     | NO          | defaults true                     |
| created_at   | timestamp with time zone    | NO          | auto                              |
| updated_at   | timestamp with time zone    | NO          | auto                              |

**Key finding:** `body_area_id` column EXISTS on aliases (nullable). `normalized` is GENERATED (always computed from phrase via gl_normalize_text). Do NOT include `normalized` in INSERT statements.

**Dedupe pattern (Phase 5 must use):**
```sql
INSERT INTO aliases (phrase, concern_id)
SELECT 'phrase here', 'concern-uuid'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('phrase here')
);
```

---

## item_concerns / item_body_areas Enum Types

Critical for SQL authoring in Phase 5:

| Column             | Table            | Enum type          | Valid values                          |
|--------------------|------------------|--------------------|---------------------------------------|
| relevance          | item_concerns    | concern_relevance  | primary, secondary, adjunctive        |
| treatment_role     | item_concerns    | treatment_role     | primary, adjunctive                   |
| side               | item_body_areas  | treatment_side     | left, right, bilateral, midline, na   |
| anatomy_specificity| item_body_areas  | anatomy_specificity| broad, regional, precise              |

**Key finding:** These must be cast as `'value'::enum_type` in SQL. Using `::text` cast causes type error.

**Laterality constraint:** The trigger `gl_check_side_laterality()` requires `side` to match the body_area's `laterality`:
- `laterality='na'` → `side` must be `na`
- `laterality='midline'` → `side` must be `midline` or `na`
- `laterality='bilateral'` → `side` can be `bilateral`, `left`, `right`, or `na`

Common body areas and their laterality:
| name        | laterality |
|-------------|-----------|
| Face        | na        |
| Neck        | na        |
| Hands       | na (and bilateral — two rows) |
| Decolletage | na (and midline — two rows)   |
| Abdomen     | midline   |
| Thighs      | bilateral |
| Cheeks      | bilateral |
| Temples     | bilateral |
| Jawline     | bilateral |

**Key finding:** Body area "Chest" does NOT exist. Use "Decolletage" instead.

**duration_of_effect / onset_time / peak_effect:** These are JSONB with a `chk_products_duration` constraint enforcing `gl_is_canonical_interval()` format: `{"value_min": N, "value_max": N, "unit": "month|day|week", "display": "..."}`. Do NOT set as plain text.

---

## Total Entity Counts (Post-Plan 05-01)

| Entity           | Count | Notes                                     |
|------------------|-------|-------------------------------------------|
| concerns         | 48    | 46 pre-plan + 2 new (Brow Ptosis, Gummy Smile) |
| aliases          | 406   | Was 390 pre-plan; +16 from Phase 2 SQL execution |
| body_areas       | 67    | Unchanged                                 |
| item_concerns    | 139   | Was 98 per STRUCTURED_COVERAGE; +41 from Phase 2 SQL |
| item_body_areas  | 212   | Was 170 per STRUCTURED_COVERAGE; +42 from Phase 2 SQL |

---

## Concern List (Post-Plan 05-01)

Full concern list with alias counts. Concerns with `alias_count < 3` are Phase 5 priority targets.

| name                      | category       | alias_count | phase_5_target |
|---------------------------|----------------|-------------|----------------|
| Brow Ptosis               | aging          | 0           | YES            |
| Buttock Appearance        | body_contouring| 0           | YES            |
| Fine Lines & Wrinkles     | skin_quality   | 0           | YES            |
| Gummy Smile               | aging          | 0           | YES            |
| Melasma                   | pigmentation   | 0           | YES            |
| Muscle Definition         | body_contouring| 0           | YES            |
| Rosacea                   | vascular       | 0           | YES            |
| Skin Dullness             | skin_quality   | 0           | YES            |
| Uneven Skin Tone          | pigmentation   | 0           | YES            |
| Vascular Lesions          | vascular       | 0           | YES            |
| Buttock Augmentation      | body_contouring| 3           | borderline     |
| Hyperhidrosis             | wellness       | 3           | borderline     |
| Platysmal Band Concern    | aging          | 3           | borderline     |
| Bunny Lines               | aging          | 4           | no             |
| Feminine Wellness         | wellness       | 4           | no             |
| Flank Fat                 | body_contouring| 4           | no             |
| Neck Lines                | aging          | 4           | no             |
| Skin Texture              | skin_quality   | 4           | no             |
| Unwanted Body Hair        | hair           | 4           | no             |
| Back Fat                  | body_contouring| 5           | no             |
| Dynamic Wrinkle Correction| aging          | 5           | no             |
| Hyperpigmentation         | pigmentation   | 5           | no             |
| Lip Augmentation          | volume         | 5           | no             |
| Thigh Fat                 | body_contouring| 5           | no             |
| Unwanted Facial Hair      | hair           | 5           | no             |
| Arm Fat                   | body_contouring| 6           | no             |
| Bruxism & TMJ             | wellness       | 6           | no             |
| Chin Augmentation         | volume         | 6           | no             |
| Jawline Definition        | volume         | 6           | no             |
| Skin Hydration            | skin_quality   | 6           | no             |
| Temple Hollowing          | volume         | 6           | no             |
| Acne & Breakouts          | skin_quality   | 7           | no             |
| Forehead Lines            | aging          | 7           | no             |
| Hand Volume Loss          | volume         | 7           | no             |
| Lip Volume Loss           | volume         | 7           | no             |
| Submental Fullness        | volume         | 7           | no             |
| Abdominal Fat             | body_contouring| 8           | no             |
| Age-Related Volume Loss   | volume         | 8           | no             |
| Marionette Lines          | aging          | 8           | no             |
| Skin Quality Improvement  | skin_quality   | 8           | no             |
| Sun Damage                | pigmentation   | 8           | no             |
| Crow's Feet               | aging          | 9           | no             |
| Nasolabial Folds          | aging          | 9           | no             |
| Cheek Volume Loss         | volume         | 10          | no             |
| Tear Trough Hollowing     | volume         | 10          | no             |
| Perioral Lines            | aging          | 11          | no             |
| Frown Lines               | aging          | 12          | no             |
| Skin Laxity               | skin_quality   | 12          | no             |

**Total concerns: 48** (46 pre-plan + Brow Ptosis + Gummy Smile)

**Phase 5 targets (alias_count = 0):** 10 concerns need aliases from transcript mining.
Also worth improving: Buttock Augmentation, Hyperhidrosis, Platysmal Band Concern (3 aliases each).

---

## Phase 2 SQL Execution Log

| SQL File                              | Product(s)                              | Status       | Notes                                                              |
|---------------------------------------|-----------------------------------------|--------------|--------------------------------------------------------------------|
| 02-04-task1-structured-emission.sql   | Sculptra Aesthetic                      | PARTIAL      | item_concerns (7) + does_not_solve executed on prior run. item_body_areas partially inserted. Full Face (midline) correctly at side='na'. |
| 02-04-task2-structured-emission.sql   | Kybella, CoolSculpting Elite            | SUCCESS      | Executed directly via supabase db query on 2026-06-13             |
| 02-05-task1-structured-emission.sql   | Morpheus8, Sofwave, Ultherapy, Hollywood Spectra | FAILED (original) | ::text cast error on enum columns. Fixed in 05-01-execute-phase2-outstanding.sql |
| 02-05-task2-structured-emission.sql   | Dysport (already done), Jeuveau, Daxxify, Xeomin, HydraFacial | FAILED (original) | Same ::text cast issue + Glabellar Lines → Frown Lines name fix needed. Fixed in 05-01-execute-phase2-outstanding.sql |
| **05-01-execute-phase2-outstanding.sql** | All above (fixed)                   | SUCCESS      | Executed 2026-06-13. item_concerns: 124→139 (+15). aliases: 390→406 (+16). |

**Key bugs fixed in 05-01-execute-phase2-outstanding.sql:**
1. `v.relevance::text` → `v.relevance::concern_relevance` (enum cast)
2. `v.treatment_role::text` → `v.treatment_role::treatment_role` (enum cast)
3. `v.side::treatment_side` → `CASE ba.laterality WHEN 'bilateral' THEN 'bilateral' ELSE 'na' END::treatment_side`
4. `INSERT INTO aliases (phrase, concern_id, normalized)` → removed `normalized` (GENERATED column)
5. `'Glabellar Lines'` → `'Frown Lines'` (actual DB concern name)
6. `'Fine Lines'` → `ILIKE '%fine line%'` (actual DB name is 'Fine Lines & Wrinkles')
7. `'Acne Scarring'` → `ILIKE '%acne%'` (actual DB name is 'Acne & Breakouts')
8. `'Chest'` body area → `'Decolletage'` (Chest does not exist in body_areas)
9. `onset_time/peak_effect/duration_of_effect` → removed (requires canonical JSONB interval format enforced by gl_is_canonical_interval constraint)
10. `'Pore Size'` concern → skipped (not in DB; aliases mapped to Skin Texture instead)
11. `'Stretch Marks'` concern → skipped (not in DB)

---

## Concern Clusters Schema (New — Plan 05-01)

Tables created via `05-01-schema-clusters.sql`:

```sql
concern_clusters (
  id UUID PRIMARY KEY,
  name TEXT UNIQUE,
  patient_phrase TEXT,
  description TEXT,
  created_at TIMESTAMPTZ
)

concern_cluster_members (
  cluster_id UUID REFERENCES concern_clusters(id),
  concern_id UUID REFERENCES concerns(id),
  mechanism_role TEXT CHECK IN ('primary', 'contributing'),
  PRIMARY KEY (cluster_id, concern_id)
)
```

**Current state:** Tables exist, 0 rows. Plan 02 will populate clusters from transcript mining.

---

## Missing Concerns Added (Plan 05-01)

| name        | category | status  | notes                              |
|-------------|----------|---------|------------------------------------|
| Brow Ptosis | aging    | ADDED   | Contributor to "tired look" cluster |
| Gummy Smile | aging    | ADDED   | Off-label toxin indication          |

---

## Key Gaps for Phase 5 Plan 02 (Alias Mining)

1. **10 concerns have 0 aliases** — these are the primary mining targets
2. **Brow Ptosis (new)** — needs "hooded eyes", "heavy brows", "tired eyes" aliases
3. **Gummy Smile (new)** — needs "too much gum", "gummy smile" aliases
4. **Fine Lines & Wrinkles** — has 0 aliases despite being a core concern
5. **Skin Dullness** — 0 aliases; commonly mentioned by patients
6. **Concern-first routing demo** requires "I look tired" → Tear Trough Hollowing + Brow Ptosis → products
