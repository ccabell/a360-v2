-- 05-01-missing-concerns.sql
-- Add missing canonical concerns confirmed absent from live DB
-- Verified absent via: SELECT name FROM concerns WHERE name ILIKE '%brow%' OR name ILIKE '%gummy%'
-- Result: 0 rows (2026-06-13)
--
-- Uses INSERT...WHERE NOT EXISTS pattern (same as Phase 2)
-- Supabase project: aejskvmpembryunnbgrk
-- Phase: 05-concern-language

-- Brow Ptosis — contributor to "tired look" cluster; enables toxin brow lift concern routing
INSERT INTO concerns (id, name, category, patient_description)
SELECT
  gen_random_uuid(),
  'Brow Ptosis',
  'aging',
  'Heavy or drooping eyebrows that can make you look tired or angry, or give a hooded appearance to your upper eyelids'
WHERE NOT EXISTS (SELECT 1 FROM concerns WHERE name = 'Brow Ptosis');

-- Gummy Smile — off-label neurotoxin indication; mentioned in Phase 2 neurotoxin compile
INSERT INTO concerns (id, name, category, patient_description)
SELECT
  gen_random_uuid(),
  'Gummy Smile',
  'aging',
  'Showing too much gum tissue above the upper teeth when smiling, which can make you self-conscious about your smile'
WHERE NOT EXISTS (SELECT 1 FROM concerns WHERE name = 'Gummy Smile');
