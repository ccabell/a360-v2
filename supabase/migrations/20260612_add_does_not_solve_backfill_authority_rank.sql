-- Migration: add_does_not_solve_to_products + backfill authority_rank
-- Plan: 02-01 (Schema migration + product list discovery)
-- Applied: 2026-06-12

-- 1. Add does_not_solve column to products (text array for limitations layer)
ALTER TABLE products ADD COLUMN IF NOT EXISTS does_not_solve text[];

-- 2. Backfill NULL authority_rank on all FDA evidence_links to rank 1
--    (FDA label = highest authority tier)
UPDATE evidence_links
SET authority_rank = 1
WHERE source = 'fda_label' AND authority_rank IS NULL;

-- 3. Populate does_not_solve for Botox Cosmetic as the reference example
--    (offering_id = 4b92be36-e84e-432c-8549-f5d85a767fdb)
UPDATE products
SET does_not_solve = ARRAY[
  'cheek flattening',
  'volume loss',
  'static etched lines',
  'skin laxity',
  'skin texture',
  'pigmentation',
  'scarring',
  'vascular concerns'
]
WHERE id = '4b92be36-e84e-432c-8549-f5d85a767fdb';
