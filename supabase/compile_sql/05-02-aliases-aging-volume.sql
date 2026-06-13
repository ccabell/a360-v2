-- ============================================================
-- Phase 05-02: Patient Language Aliases — Aging & Volume Concerns
-- ============================================================
-- Source: HIPAA-redacted consultation transcripts (Lumiere Aesthetics, 122 sessions)
--         Transcript file: combined_hipaa_transcripts.txt (lines 0-37855)
-- Method: Patient speaker turns extracted; phrases mapped to canonical concerns
-- Concerns covered:
--   Crow's Feet, Nasolabial Folds, Cheek Volume Loss, Tear Trough Hollowing,
--   Jawline Definition, Skin Laxity, Marionette Lines, Temple Hollowing,
--   Forehead Lines, Frown Lines, Age-Related Volume Loss, Brow Ptosis,
--   Lip Volume Loss, Lip Augmentation, Chin Augmentation, Hand Volume Loss
-- Pattern: INSERT...WHERE NOT EXISTS using gl_normalize_text() dedupe
-- Generated: 2026-06-13
-- ============================================================

-- -------------------------
-- CROW'S FEET (ba9beeed-ac25-4fe3-b7e0-1e485260a573)
-- Current aliases: 9 — adding 5 more from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'my crow''s feet are terrible', 'ba9beeed-ac25-4fe3-b7e0-1e485260a573'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my crow''s feet are terrible')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'it creeps back in around my eyes when I smile', 'ba9beeed-ac25-4fe3-b7e0-1e485260a573'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('it creeps back in around my eyes when I smile')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'these lines when I smile are the first to come back', 'ba9beeed-ac25-4fe3-b7e0-1e485260a573'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('these lines when I smile are the first to come back')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I have wrinkles all around my eyes', 'ba9beeed-ac25-4fe3-b7e0-1e485260a573'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have wrinkles all around my eyes')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'those lines on the sides of my eyes', 'ba9beeed-ac25-4fe3-b7e0-1e485260a573'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('those lines on the sides of my eyes')
);

-- -------------------------
-- NASOLABIAL FOLDS (444b53c5-a40c-41f2-b378-05a042f67126)
-- Current aliases: 9 — adding 5 more
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'these lines from my nose to my mouth', '444b53c5-a40c-41f2-b378-05a042f67126'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('these lines from my nose to my mouth')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my smile lines are getting so deep', '444b53c5-a40c-41f2-b378-05a042f67126'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my smile lines are getting so deep')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'these creases by my nose', '444b53c5-a40c-41f2-b378-05a042f67126'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('these creases by my nose')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'the parentheses around my mouth', '444b53c5-a40c-41f2-b378-05a042f67126'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('the parentheses around my mouth')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'folds from my nose down to my lip', '444b53c5-a40c-41f2-b378-05a042f67126'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('folds from my nose down to my lip')
);

-- -------------------------
-- CHEEK VOLUME LOSS (89d1ee67-5f54-43ae-a054-05f4700b7c73)
-- Current aliases: 10 — adding 5 more
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'I''ve lost volume in my cheeks', '89d1ee67-5f54-43ae-a054-05f4700b7c73'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I''ve lost volume in my cheeks')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my cheeks are sunken in now', '89d1ee67-5f54-43ae-a054-05f4700b7c73'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my cheeks are sunken in now')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my face looks deflated', '89d1ee67-5f54-43ae-a054-05f4700b7c73'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my face looks deflated')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my midface just dropped', '89d1ee67-5f54-43ae-a054-05f4700b7c73'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my midface just dropped')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I lost all the fat in my face but kept it everywhere else', '89d1ee67-5f54-43ae-a054-05f4700b7c73'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I lost all the fat in my face but kept it everywhere else')
);

-- -------------------------
-- TEAR TROUGH HOLLOWING (b90ce295-5d33-4b46-a04b-2de1b6e61656)
-- Current aliases: 10 — adding 6 more from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'I look tired all the time even when I''m not', 'b90ce295-5d33-4b46-a04b-2de1b6e61656'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I look tired all the time even when I''m not')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I have these dark hollows under my eyes', 'b90ce295-5d33-4b46-a04b-2de1b6e61656'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have these dark hollows under my eyes')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'the bags under my eyes are getting worse', 'b90ce295-5d33-4b46-a04b-2de1b6e61656'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('the bags under my eyes are getting worse')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I look hollowed out under my eyes', 'b90ce295-5d33-4b46-a04b-2de1b6e61656'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I look hollowed out under my eyes')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'this area right under my eyes looks sunken', 'b90ce295-5d33-4b46-a04b-2de1b6e61656'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('this area right under my eyes looks sunken')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my dark circles never go away no matter how much I sleep', 'b90ce295-5d33-4b46-a04b-2de1b6e61656'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my dark circles never go away no matter how much I sleep')
);

-- -------------------------
-- JAWLINE DEFINITION (81c06a11-ac4b-4574-9e42-35adffc4b610)
-- Current aliases: 6 — adding 5 more
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'I want a more defined jawline', '81c06a11-ac4b-4574-9e42-35adffc4b610'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want a more defined jawline')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my jaw looks soft and undefined', '81c06a11-ac4b-4574-9e42-35adffc4b610'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my jaw looks soft and undefined')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I''ve lost my jawline as I got older', '81c06a11-ac4b-4574-9e42-35adffc4b610'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I''ve lost my jawline as I got older')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my face shape has changed and my jaw isn''t sharp anymore', '81c06a11-ac4b-4574-9e42-35adffc4b610'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my face shape has changed and my jaw isn''t sharp anymore')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my jowls are starting to come in', '81c06a11-ac4b-4574-9e42-35adffc4b610'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my jowls are starting to come in')
);

-- -------------------------
-- SKIN LAXITY (266857e0-ee39-4618-a3ea-30566f584a42)
-- Current aliases: 12 — adding 4 more
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'my skin is just sagging', '266857e0-ee39-4618-a3ea-30566f584a42'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my skin is just sagging')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'everything is starting to fall', '266857e0-ee39-4618-a3ea-30566f584a42'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('everything is starting to fall')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my face isn''t as tight as it used to be', '266857e0-ee39-4618-a3ea-30566f584a42'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my face isn''t as tight as it used to be')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I''ve lost elasticity in my skin', '266857e0-ee39-4618-a3ea-30566f584a42'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I''ve lost elasticity in my skin')
);

-- -------------------------
-- MARIONETTE LINES (2659d993-46af-47b0-b4f6-60e9142c168b)
-- Current aliases: 8 — adding 5 more
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'these lines pulling down from the corners of my mouth', '2659d993-46af-47b0-b4f6-60e9142c168b'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('these lines pulling down from the corners of my mouth')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'the corners of my mouth are drooping down', '2659d993-46af-47b0-b4f6-60e9142c168b'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('the corners of my mouth are drooping down')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I look sad or angry all the time because of these lines', '2659d993-46af-47b0-b4f6-60e9142c168b'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I look sad or angry all the time because of these lines')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'these frown lines around my mouth pulling it down', '2659d993-46af-47b0-b4f6-60e9142c168b'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('these frown lines around my mouth pulling it down')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'the lines going from my lips down to my chin', '2659d993-46af-47b0-b4f6-60e9142c168b'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('the lines going from my lips down to my chin')
);

-- -------------------------
-- TEMPLE HOLLOWING (63433ae1-36a8-42f7-9735-edc7e0844dc3)
-- Current aliases: 6 — adding 5 more
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'my temples look hollow and sunken in', '63433ae1-36a8-42f7-9735-edc7e0844dc3'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my temples look hollow and sunken in')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I''ve lost volume in my temples', '63433ae1-36a8-42f7-9735-edc7e0844dc3'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I''ve lost volume in my temples')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my head looks narrow up top from losing volume there', '63433ae1-36a8-42f7-9735-edc7e0844dc3'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my head looks narrow up top from losing volume there')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'this area on the sides of my forehead is caved in', '63433ae1-36a8-42f7-9735-edc7e0844dc3'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('this area on the sides of my forehead is caved in')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'you can see the bones in my temples now', '63433ae1-36a8-42f7-9735-edc7e0844dc3'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('you can see the bones in my temples now')
);

-- -------------------------
-- FOREHEAD LINES (b0d57aa3-d149-4d61-8ae1-7d6e6a985bfe)
-- Current aliases: 7 — adding 5 more from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'my forehead is what made me want to do something', 'b0d57aa3-d149-4d61-8ae1-7d6e6a985bfe'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my forehead is what made me want to do something')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I have deep lines across my forehead', 'b0d57aa3-d149-4d61-8ae1-7d6e6a985bfe'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have deep lines across my forehead')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my forehead wrinkles just keep getting deeper', 'b0d57aa3-d149-4d61-8ae1-7d6e6a985bfe'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my forehead wrinkles just keep getting deeper')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I have horizontal lines all across my forehead', 'b0d57aa3-d149-4d61-8ae1-7d6e6a985bfe'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have horizontal lines all across my forehead')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my forehead looks like it has grooves in it now', 'b0d57aa3-d149-4d61-8ae1-7d6e6a985bfe'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my forehead looks like it has grooves in it now')
);

-- -------------------------
-- FROWN LINES / GLABELLAR LINES (fe8a986f-d9e7-4e51-a4da-47450be6c68f)
-- Current aliases: 12 — adding 5 more
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'my eleven lines are really bothering me', 'fe8a986f-d9e7-4e51-a4da-47450be6c68f'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my eleven lines are really bothering me')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I hold all my frustration right here in the middle', 'fe8a986f-d9e7-4e51-a4da-47450be6c68f'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I hold all my frustration right here in the middle')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'people think I''m angry when I''m not', 'fe8a986f-d9e7-4e51-a4da-47450be6c68f'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('people think I''m angry when I''m not')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'that line between my eyebrows that won''t go away', 'fe8a986f-d9e7-4e51-a4da-47450be6c68f'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('that line between my eyebrows that won''t go away')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I wake up in the morning and it hurts right here in the middle', 'fe8a986f-d9e7-4e51-a4da-47450be6c68f'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I wake up in the morning and it hurts right here in the middle')
);

-- -------------------------
-- AGE-RELATED VOLUME LOSS (a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85)
-- Current aliases: 8 — adding 5 more
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'my face just doesn''t look like me anymore', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my face just doesn''t look like me anymore')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I lose fat everywhere else but gain it in my face in a bad way', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I lose fat everywhere else but gain it in my face in a bad way')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my face looks gaunt as I''ve gotten older', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my face looks gaunt as I''ve gotten older')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'we gain fat everywhere else but lose it where we want it in our face', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('we gain fat everywhere else but lose it where we want it in our face')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I just want my face to look full again like it did when I was younger', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I just want my face to look full again like it did when I was younger')
);

-- -------------------------
-- BROW PTOSIS (bd79eb4a-8b8f-46da-b790-9be9939e0f19)
-- Current aliases: 0 — PRIORITY TARGET — adding 6 from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'my eyes are getting droopy and hooded', 'bd79eb4a-8b8f-46da-b790-9be9939e0f19'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my eyes are getting droopy and hooded')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I have hooded eyes and can barely see my eyelids', 'bd79eb4a-8b8f-46da-b790-9be9939e0f19'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have hooded eyes and can barely see my eyelids')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my brows are heavy and weighing down my eyelids', 'bd79eb4a-8b8f-46da-b790-9be9939e0f19'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my brows are heavy and weighing down my eyelids')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I look tired because my eyebrows are drooping', 'bd79eb4a-8b8f-46da-b790-9be9939e0f19'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I look tired because my eyebrows are drooping')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my eyelids are falling and covering my eye', 'bd79eb4a-8b8f-46da-b790-9be9939e0f19'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my eyelids are falling and covering my eye')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I can''t wear eye shadow anymore because you can''t see it', 'bd79eb4a-8b8f-46da-b790-9be9939e0f19'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I can''t wear eye shadow anymore because you can''t see it')
);

-- -------------------------
-- LIP VOLUME LOSS (f588b53b-ce05-4e4d-a5ea-010bae41ae6c)
-- Current aliases: 7 — adding 4 more
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'my lips have gotten so thin', 'f588b53b-ce05-4e4d-a5ea-010bae41ae6c'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my lips have gotten so thin')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want my lips to look like they used to when I was younger', 'f588b53b-ce05-4e4d-a5ea-010bae41ae6c'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want my lips to look like they used to when I was younger')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I''ve lost all volume in my lips over the years', 'f588b53b-ce05-4e4d-a5ea-010bae41ae6c'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I''ve lost all volume in my lips over the years')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my upper lip is almost disappearing', 'f588b53b-ce05-4e4d-a5ea-010bae41ae6c'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my upper lip is almost disappearing')
);

-- -------------------------
-- LIP AUGMENTATION (e8b6a1f5-2d7c-4e9b-1a6c-5f8d4b0e7c29)
-- Current aliases: 5 — adding 4 more
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'I want bigger fuller lips', 'e8b6a1f5-2d7c-4e9b-1a6c-5f8d4b0e7c29'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want bigger fuller lips')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want to get my lips done', 'e8b6a1f5-2d7c-4e9b-1a6c-5f8d4b0e7c29'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want to get my lips done')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I just want a little more volume in my lips', 'e8b6a1f5-2d7c-4e9b-1a6c-5f8d4b0e7c29'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I just want a little more volume in my lips')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want more fullness and height in my lips', 'e8b6a1f5-2d7c-4e9b-1a6c-5f8d4b0e7c29'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want more fullness and height in my lips')
);

-- -------------------------
-- CHIN AUGMENTATION (d7a5f0e4-1c6b-4d8a-0f5b-4e7c3a9d6b18)
-- Current aliases: 6 — adding 4 more
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'my chin is weak and recessed', 'd7a5f0e4-1c6b-4d8a-0f5b-4e7c3a9d6b18'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my chin is weak and recessed')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want more definition in my chin', 'd7a5f0e4-1c6b-4d8a-0f5b-4e7c3a9d6b18'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want more definition in my chin')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my chin doesn''t project enough', 'd7a5f0e4-1c6b-4d8a-0f5b-4e7c3a9d6b18'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my chin doesn''t project enough')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I don''t like my side profile because of my chin', 'd7a5f0e4-1c6b-4d8a-0f5b-4e7c3a9d6b18'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I don''t like my side profile because of my chin')
);

-- -------------------------
-- HAND VOLUME LOSS (6557522f-d92c-4ed8-9636-0794d539ee24)
-- Current aliases: 7 — adding 4 more
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'my hands look so old and veiny now', '6557522f-d92c-4ed8-9636-0794d539ee24'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my hands look so old and veiny now')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'you can see all the tendons in my hands', '6557522f-d92c-4ed8-9636-0794d539ee24'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('you can see all the tendons in my hands')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my hands look so bony and skeletal', '6557522f-d92c-4ed8-9636-0794d539ee24'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my hands look so bony and skeletal')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my hands give away my age even if my face doesn''t', '6557522f-d92c-4ed8-9636-0794d539ee24'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my hands give away my age even if my face doesn''t')
);
