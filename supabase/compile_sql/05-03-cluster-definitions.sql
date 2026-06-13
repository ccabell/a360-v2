-- Phase 05-03: Concern Cluster Definitions
-- Supabase project: aejskvmpembryunnbgrk
-- Concern UUIDs verified from live DB on 2026-06-13
--
-- Concern IDs used:
--   Age-Related Volume Loss:  a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85
--   Brow Ptosis:              bd79eb4a-8b8f-46da-b790-9be9939e0f19
--   Cheek Volume Loss:        89d1ee67-5f54-43ae-a054-05f4700b7c73
--   Forehead Lines:           b0d57aa3-d149-4d61-8ae1-7d6e6a985bfe
--   Frown Lines:              fe8a986f-d9e7-4e51-a4da-47450be6c68f
--   Jawline Definition:       81c06a11-ac4b-4574-9e42-35adffc4b610
--   Marionette Lines:         2659d993-46af-47b0-b4f6-60e9142c168b
--   Platysmal Band Concern:   2d2a0aa5-cc18-4397-b6c6-8a22ad8b6c99
--   Skin Laxity:              266857e0-ee39-4618-a3ea-30566f584a42
--   Skin Quality Improvement: c6f4e9d3-0b5a-4c7f-9e4a-3d6b2f8c5a07
--   Submental Fullness:       8c6e3ae9-df50-485e-b69a-358719cdfcaf
--   Tear Trough Hollowing:    b90ce295-5d33-4b46-a04b-2de1b6e61656

-- ============================================================
-- CLUSTER 1: Tired Appearance
-- ============================================================
INSERT INTO concern_clusters (id, name, patient_phrase, description)
SELECT
  'c1a0e8f2-3b4d-4a5c-8e1f-9d2b0a7c6e3f',
  'Tired Appearance',
  'I always look tired',
  'Multi-mechanism presentation where patients appear fatigued despite adequate rest. Routes to under-eye hollows, brow heaviness, midface deflation, and skin dullness.'
WHERE NOT EXISTS (SELECT 1 FROM concern_clusters WHERE name = 'Tired Appearance');

-- ============================================================
-- CLUSTER 2: Lower-Face Heaviness
-- ============================================================
INSERT INTO concern_clusters (id, name, patient_phrase, description)
SELECT
  'c2b1f9a3-4c5e-4b6d-9f2a-0e3c1b8d7f4a',
  'Lower-Face Heaviness',
  'My face is falling',
  'Tissue descent and volume redistribution in the lower face creating a heavy, drooping appearance. Routes to jowling, marionette descent, submental volume, and neck banding.'
WHERE NOT EXISTS (SELECT 1 FROM concern_clusters WHERE name = 'Lower-Face Heaviness');

-- ============================================================
-- CLUSTER 3: Post-Weight-Loss Laxity
-- ============================================================
INSERT INTO concern_clusters (id, name, patient_phrase, description)
SELECT
  'c3c2a0b4-5d6f-4c7e-0a3b-1f4d2c9e8a5b',
  'Post-Weight-Loss Laxity',
  'I lost weight but my skin is loose now',
  'Skin and soft tissue redundancy following significant weight loss, with deflated fat compartments and reduced structural support.'
WHERE NOT EXISTS (SELECT 1 FROM concern_clusters WHERE name = 'Post-Weight-Loss Laxity');

-- ============================================================
-- CLUSTER 4: Angry/Mean Resting Expression
-- ============================================================
INSERT INTO concern_clusters (id, name, patient_phrase, description)
SELECT
  'c4d3b1c5-6e7a-4d8f-1b4c-2a5e3d0f9b6c',
  'Angry/Mean Resting Expression',
  'People think I look angry when I am not',
  'Resting facial expression that conveys displeasure or sternness due to glabellar complex, oral commissure descent, and brow position.'
WHERE NOT EXISTS (SELECT 1 FROM concern_clusters WHERE name = 'Angry/Mean Resting Expression');

-- ============================================================
-- CLUSTER MEMBERS: Tired Appearance
-- ============================================================
INSERT INTO concern_cluster_members (cluster_id, concern_id, mechanism_role)
VALUES
  ('c1a0e8f2-3b4d-4a5c-8e1f-9d2b0a7c6e3f', 'b90ce295-5d33-4b46-a04b-2de1b6e61656', 'primary'),      -- Tear Trough Hollowing
  ('c1a0e8f2-3b4d-4a5c-8e1f-9d2b0a7c6e3f', 'bd79eb4a-8b8f-46da-b790-9be9939e0f19', 'primary'),       -- Brow Ptosis
  ('c1a0e8f2-3b4d-4a5c-8e1f-9d2b0a7c6e3f', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85', 'contributing'), -- Age-Related Volume Loss
  ('c1a0e8f2-3b4d-4a5c-8e1f-9d2b0a7c6e3f', 'c6f4e9d3-0b5a-4c7f-9e4a-3d6b2f8c5a07', 'contributing'), -- Skin Quality Improvement
  ('c1a0e8f2-3b4d-4a5c-8e1f-9d2b0a7c6e3f', 'b0d57aa3-d149-4d61-8ae1-7d6e6a985bfe', 'contributing')  -- Forehead Lines
ON CONFLICT (cluster_id, concern_id) DO NOTHING;

-- ============================================================
-- CLUSTER MEMBERS: Lower-Face Heaviness
-- ============================================================
INSERT INTO concern_cluster_members (cluster_id, concern_id, mechanism_role)
VALUES
  ('c2b1f9a3-4c5e-4b6d-9f2a-0e3c1b8d7f4a', '266857e0-ee39-4618-a3ea-30566f584a42', 'primary'),      -- Skin Laxity
  ('c2b1f9a3-4c5e-4b6d-9f2a-0e3c1b8d7f4a', '2659d993-46af-47b0-b4f6-60e9142c168b', 'primary'),       -- Marionette Lines
  ('c2b1f9a3-4c5e-4b6d-9f2a-0e3c1b8d7f4a', '8c6e3ae9-df50-485e-b69a-358719cdfcaf', 'contributing'), -- Submental Fullness
  ('c2b1f9a3-4c5e-4b6d-9f2a-0e3c1b8d7f4a', '81c06a11-ac4b-4574-9e42-35adffc4b610', 'contributing'), -- Jawline Definition
  ('c2b1f9a3-4c5e-4b6d-9f2a-0e3c1b8d7f4a', '2d2a0aa5-cc18-4397-b6c6-8a22ad8b6c99', 'contributing')  -- Platysmal Band Concern
ON CONFLICT (cluster_id, concern_id) DO NOTHING;

-- ============================================================
-- CLUSTER MEMBERS: Post-Weight-Loss Laxity
-- ============================================================
INSERT INTO concern_cluster_members (cluster_id, concern_id, mechanism_role)
VALUES
  ('c3c2a0b4-5d6f-4c7e-0a3b-1f4d2c9e8a5b', '266857e0-ee39-4618-a3ea-30566f584a42', 'primary'),      -- Skin Laxity
  ('c3c2a0b4-5d6f-4c7e-0a3b-1f4d2c9e8a5b', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85', 'primary'),      -- Age-Related Volume Loss
  ('c3c2a0b4-5d6f-4c7e-0a3b-1f4d2c9e8a5b', '89d1ee67-5f54-43ae-a054-05f4700b7c73', 'contributing'), -- Cheek Volume Loss
  ('c3c2a0b4-5d6f-4c7e-0a3b-1f4d2c9e8a5b', '81c06a11-ac4b-4574-9e42-35adffc4b610', 'contributing')  -- Jawline Definition
ON CONFLICT (cluster_id, concern_id) DO NOTHING;

-- ============================================================
-- CLUSTER MEMBERS: Angry/Mean Resting Expression
-- ============================================================
INSERT INTO concern_cluster_members (cluster_id, concern_id, mechanism_role)
VALUES
  ('c4d3b1c5-6e7a-4d8f-1b4c-2a5e3d0f9b6c', 'fe8a986f-d9e7-4e51-a4da-47450be6c68f', 'primary'),       -- Frown Lines
  ('c4d3b1c5-6e7a-4d8f-1b4c-2a5e3d0f9b6c', '2659d993-46af-47b0-b4f6-60e9142c168b', 'contributing'),  -- Marionette Lines
  ('c4d3b1c5-6e7a-4d8f-1b4c-2a5e3d0f9b6c', 'bd79eb4a-8b8f-46da-b790-9be9939e0f19', 'contributing')   -- Brow Ptosis
ON CONFLICT (cluster_id, concern_id) DO NOTHING;
