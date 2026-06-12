-- 02-03 Task 1: Taxonomy Additions for HA Filler Products (Juvederm + Skinvive)
-- Uses INSERT...WHERE NOT EXISTS pattern (no UNIQUE constraints on name columns)

-- ============================================================
-- STEP 1: Add missing concerns
-- ============================================================

INSERT INTO concerns (id, name, category, patient_description)
SELECT
  'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85',
  'Age-Related Volume Loss',
  'volume',
  'As we age, our face naturally loses fullness in the cheeks, temples, and under-eye area, creating a more hollow or tired appearance. Fillers can restore that lost volume and lift.'
WHERE NOT EXISTS (SELECT 1 FROM concerns WHERE name = 'Age-Related Volume Loss');

INSERT INTO concerns (id, name, category, patient_description)
SELECT
  'b5e3d8c2-9a4f-4b6e-8d3f-2c5a1e7b4f96',
  'Skin Hydration',
  'skin_quality',
  'Skin that feels dry, tight, or looks dull even with a good skincare routine. Intradermal HA can replenish moisture at the cellular level for a lasting glow from within.'
WHERE NOT EXISTS (SELECT 1 FROM concerns WHERE name = 'Skin Hydration');

INSERT INTO concerns (id, name, category, patient_description)
SELECT
  'c6f4e9d3-0b5a-4c7f-9e4a-3d6b2f8c5a07',
  'Skin Quality Improvement',
  'skin_quality',
  'Improving the overall look and feel of skin — luminosity, smoothness, and that healthy glow — even without dramatic volume change. Intradermal treatment addresses the canvas itself.'
WHERE NOT EXISTS (SELECT 1 FROM concerns WHERE name = 'Skin Quality Improvement');

INSERT INTO concerns (id, name, category, patient_description)
SELECT
  'd7a5f0e4-1c6b-4d8a-0f5b-4e7c3a9d6b18',
  'Chin Augmentation',
  'volume',
  'A chin that recedes or lacks projection can affect facial balance and profile. Fillers can enhance the chin''s shape and size, improving facial harmony without surgery.'
WHERE NOT EXISTS (SELECT 1 FROM concerns WHERE name = 'Chin Augmentation');

INSERT INTO concerns (id, name, category, patient_description)
SELECT
  'e8b6a1f5-2d7c-4e9b-1a6c-5f8d4b0e7c29',
  'Lip Augmentation',
  'volume',
  'Lips that are naturally thin or have thinned with age. Fillers can add volume, improve shape, and restore the Cupid''s bow definition for a fuller, more defined look.'
WHERE NOT EXISTS (SELECT 1 FROM concerns WHERE name = 'Lip Augmentation');

INSERT INTO concerns (id, name, category, patient_description)
SELECT
  'f9c7b2a6-3e8d-4f0c-2b7d-6a9e5c1f8d30',
  'Dynamic Wrinkle Correction',
  'aging',
  'Lines and wrinkles that deepen with facial movement and expression — smiling, talking, animated faces. Resilient HA fillers are designed to flex with your expressions for a natural result.'
WHERE NOT EXISTS (SELECT 1 FROM concerns WHERE name = 'Dynamic Wrinkle Correction');

-- ============================================================
-- STEP 2: Add missing body_area zones
-- ============================================================

INSERT INTO body_areas (id, name, level, parent_id)
SELECT
  'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
  'Midface',
  'zone',
  '213c574f-732b-4017-80e1-6bf7e7b36acf'
WHERE NOT EXISTS (SELECT 1 FROM body_areas WHERE name = 'Midface');

INSERT INTO body_areas (id, name, level, parent_id)
SELECT
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Chin Projection Zone',
  'zone',
  '62457764-fd19-43d2-ac0d-dc8fe53e0286'
WHERE NOT EXISTS (SELECT 1 FROM body_areas WHERE name = 'Chin Projection Zone');

INSERT INTO body_areas (id, name, level, parent_id)
SELECT
  'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  'Dorsal Hand',
  'zone',
  '75722ec4-bda2-4cf7-82e1-a412b296f937'
WHERE NOT EXISTS (SELECT 1 FROM body_areas WHERE name = 'Dorsal Hand');

-- ============================================================
-- STEP 3: Add aliases (check normalized column for dedupe)
-- ============================================================

-- Age-Related Volume Loss aliases
INSERT INTO aliases (phrase, concern_id)
SELECT 'hollow cheeks from aging', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('hollow cheeks from aging'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'I look gaunt', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I look gaunt'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'my face looks deflated', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my face looks deflated'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'lost volume as I aged', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('lost volume as I aged'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'sunken face', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('sunken face'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'I used to have fuller cheeks', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I used to have fuller cheeks'));

-- Skin Hydration aliases
INSERT INTO aliases (phrase, concern_id)
SELECT 'my skin is always dry', 'b5e3d8c2-9a4f-4b6e-8d3f-2c5a1e7b4f96'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my skin is always dry'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'my skin looks dull', 'b5e3d8c2-9a4f-4b6e-8d3f-2c5a1e7b4f96'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my skin looks dull'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'my skin feels tight', 'b5e3d8c2-9a4f-4b6e-8d3f-2c5a1e7b4f96'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my skin feels tight'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want a glow', 'b5e3d8c2-9a4f-4b6e-8d3f-2c5a1e7b4f96'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want a glow'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'dehydrated skin', 'b5e3d8c2-9a4f-4b6e-8d3f-2c5a1e7b4f96'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('dehydrated skin'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'my skincare is not enough', 'b5e3d8c2-9a4f-4b6e-8d3f-2c5a1e7b4f96'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my skincare is not enough'));

-- Skin Quality Improvement aliases
INSERT INTO aliases (phrase, concern_id)
SELECT 'I want better skin', 'c6f4e9d3-0b5a-4c7f-9e4a-3d6b2f8c5a07'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want better skin'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'my skin looks tired', 'c6f4e9d3-0b5a-4c7f-9e4a-3d6b2f8c5a07'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my skin looks tired'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want that glow from within', 'c6f4e9d3-0b5a-4c7f-9e4a-3d6b2f8c5a07'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want that glow from within'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'my skin is rough', 'c6f4e9d3-0b5a-4c7f-9e4a-3d6b2f8c5a07'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my skin is rough'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want smoother skin', 'c6f4e9d3-0b5a-4c7f-9e4a-3d6b2f8c5a07'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want smoother skin'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'my skin quality has declined', 'c6f4e9d3-0b5a-4c7f-9e4a-3d6b2f8c5a07'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my skin quality has declined'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'glass skin', 'c6f4e9d3-0b5a-4c7f-9e4a-3d6b2f8c5a07'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('glass skin'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want my skin to look healthy', 'c6f4e9d3-0b5a-4c7f-9e4a-3d6b2f8c5a07'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want my skin to look healthy'));

-- Chin Augmentation aliases
INSERT INTO aliases (phrase, concern_id)
SELECT 'weak chin', 'd7a5f0e4-1c6b-4d8a-0f5b-4e7c3a9d6b18'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('weak chin'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'receding chin', 'd7a5f0e4-1c6b-4d8a-0f5b-4e7c3a9d6b18'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('receding chin'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'my chin is small', 'd7a5f0e4-1c6b-4d8a-0f5b-4e7c3a9d6b18'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my chin is small'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'no chin definition', 'd7a5f0e4-1c6b-4d8a-0f5b-4e7c3a9d6b18'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('no chin definition'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want a stronger chin', 'd7a5f0e4-1c6b-4d8a-0f5b-4e7c3a9d6b18'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want a stronger chin'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want chin enhancement without surgery', 'd7a5f0e4-1c6b-4d8a-0f5b-4e7c3a9d6b18'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want chin enhancement without surgery'));

-- Lip Augmentation aliases
INSERT INTO aliases (phrase, concern_id)
SELECT 'thin lips', 'e8b6a1f5-2d7c-4e9b-1a6c-5f8d4b0e7c29'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('thin lips'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want bigger lips', 'e8b6a1f5-2d7c-4e9b-1a6c-5f8d4b0e7c29'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want bigger lips'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'my lips have gotten thinner', 'e8b6a1f5-2d7c-4e9b-1a6c-5f8d4b0e7c29'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my lips have gotten thinner'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want fuller lips', 'e8b6a1f5-2d7c-4e9b-1a6c-5f8d4b0e7c29'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want fuller lips'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'no lip definition', 'e8b6a1f5-2d7c-4e9b-1a6c-5f8d4b0e7c29'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('no lip definition'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'I lost my lip shape', 'e8b6a1f5-2d7c-4e9b-1a6c-5f8d4b0e7c29'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I lost my lip shape'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'flat lips', 'e8b6a1f5-2d7c-4e9b-1a6c-5f8d4b0e7c29'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('flat lips'));

-- Dynamic Wrinkle Correction aliases
INSERT INTO aliases (phrase, concern_id)
SELECT 'lines when I smile', 'f9c7b2a6-3e8d-4f0c-2b7d-6a9e5c1f8d30'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('lines when I smile'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'wrinkles with expression', 'f9c7b2a6-3e8d-4f0c-2b7d-6a9e5c1f8d30'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('wrinkles with expression'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'animated face with lines', 'f9c7b2a6-3e8d-4f0c-2b7d-6a9e5c1f8d30'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('animated face with lines'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'expression lines', 'f9c7b2a6-3e8d-4f0c-2b7d-6a9e5c1f8d30'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('expression lines'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'movement wrinkles', 'f9c7b2a6-3e8d-4f0c-2b7d-6a9e5c1f8d30'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('movement wrinkles'));

-- Cheek Volume Loss aliases
INSERT INTO aliases (phrase, concern_id)
SELECT 'my cheeks look flat', '89d1ee67-5f54-43ae-a054-05f4700b7c73'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my cheeks look flat'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'flat cheeks', '89d1ee67-5f54-43ae-a054-05f4700b7c73'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('flat cheeks'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'no cheekbones', '89d1ee67-5f54-43ae-a054-05f4700b7c73'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('no cheekbones'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want apple cheeks', '89d1ee67-5f54-43ae-a054-05f4700b7c73'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want apple cheeks'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'cheek hollows', '89d1ee67-5f54-43ae-a054-05f4700b7c73'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('cheek hollows'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want higher cheekbones', '89d1ee67-5f54-43ae-a054-05f4700b7c73'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want higher cheekbones'));

-- Nasolabial Folds aliases
INSERT INTO aliases (phrase, concern_id)
SELECT 'smile lines', '444b53c5-a40c-41f2-b378-05a042f67126'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('smile lines'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'laugh lines', '444b53c5-a40c-41f2-b378-05a042f67126'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('laugh lines'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'parentheses lines', '444b53c5-a40c-41f2-b378-05a042f67126'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('parentheses lines'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'lines from nose to mouth', '444b53c5-a40c-41f2-b378-05a042f67126'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('lines from nose to mouth'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'deep smile creases', '444b53c5-a40c-41f2-b378-05a042f67126'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('deep smile creases'));

-- Perioral Lines aliases
INSERT INTO aliases (phrase, concern_id)
SELECT 'lipstick lines', '205406f5-f6f5-4fb7-aefb-7e1726c6f4ba'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('lipstick lines'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'smoker lines', '205406f5-f6f5-4fb7-aefb-7e1726c6f4ba'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('smoker lines'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'lip lines', '205406f5-f6f5-4fb7-aefb-7e1726c6f4ba'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('lip lines'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'lines around lips', '205406f5-f6f5-4fb7-aefb-7e1726c6f4ba'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('lines around lips'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'upper lip lines', '205406f5-f6f5-4fb7-aefb-7e1726c6f4ba'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('upper lip lines'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'vertical lip lines', '205406f5-f6f5-4fb7-aefb-7e1726c6f4ba'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('vertical lip lines'));

-- Marionette Lines aliases
INSERT INTO aliases (phrase, concern_id)
SELECT 'frown lines at mouth corners', '2659d993-46af-47b0-b4f6-60e9142c168b'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('frown lines at mouth corners'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'lines from mouth to chin', '2659d993-46af-47b0-b4f6-60e9142c168b'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('lines from mouth to chin'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'mouth corner lines', '2659d993-46af-47b0-b4f6-60e9142c168b'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('mouth corner lines'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'puppet lines', '2659d993-46af-47b0-b4f6-60e9142c168b'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('puppet lines'));

-- Tear Trough Hollowing aliases
INSERT INTO aliases (phrase, concern_id)
SELECT 'dark circles', 'b90ce295-5d33-4b46-a04b-2de1b6e61656'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('dark circles'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'under eye hollows', 'b90ce295-5d33-4b46-a04b-2de1b6e61656'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('under eye hollows'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'I always look tired', 'b90ce295-5d33-4b46-a04b-2de1b6e61656'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I always look tired'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'sunken under eyes', 'b90ce295-5d33-4b46-a04b-2de1b6e61656'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('sunken under eyes'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'hollow under eyes', 'b90ce295-5d33-4b46-a04b-2de1b6e61656'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('hollow under eyes'));

-- Temple Hollowing aliases
INSERT INTO aliases (phrase, concern_id)
SELECT 'hollow temples', '63433ae1-36a8-42f7-9735-edc7e0844dc3'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('hollow temples'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'sunken temples', '63433ae1-36a8-42f7-9735-edc7e0844dc3'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('sunken temples'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'my temples are caved in', '63433ae1-36a8-42f7-9735-edc7e0844dc3'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my temples are caved in'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'temporal wasting', '63433ae1-36a8-42f7-9735-edc7e0844dc3'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('temporal wasting'));

-- Hand Volume Loss aliases
INSERT INTO aliases (phrase, concern_id)
SELECT 'my hands look old', '6557522f-d92c-4ed8-9636-0794d539ee24'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my hands look old'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'veiny hands', '6557522f-d92c-4ed8-9636-0794d539ee24'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('veiny hands'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'bony hands', '6557522f-d92c-4ed8-9636-0794d539ee24'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('bony hands'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'hands look crepey', '6557522f-d92c-4ed8-9636-0794d539ee24'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('hands look crepey'));

-- Lip Volume Loss aliases
INSERT INTO aliases (phrase, concern_id)
SELECT 'my lips have thinned', 'f588b53b-ce05-4e4d-a5ea-010bae41ae6c'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my lips have thinned'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'my lips disappeared', 'f588b53b-ce05-4e4d-a5ea-010bae41ae6c'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my lips disappeared'));

INSERT INTO aliases (phrase, concern_id)
SELECT 'I lost my lip definition', 'f588b53b-ce05-4e4d-a5ea-010bae41ae6c'
WHERE NOT EXISTS (SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I lost my lip definition'));
