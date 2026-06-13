-- ============================================================
-- Phase 05-02: Patient Language Aliases — Skin Quality & Body Contouring Concerns
-- ============================================================
-- Source: HIPAA-redacted consultation transcripts (Lumiere Aesthetics, 122 sessions)
--         Transcript file: combined_hipaa_transcripts.txt (lines 0-37855)
-- Method: Patient speaker turns extracted; phrases mapped to canonical concerns
-- Concerns covered:
--   Fine Lines & Wrinkles, Skin Dullness, Uneven Skin Tone, Melasma, Rosacea,
--   Muscle Definition, Buttock Appearance, Vascular Lesions, Skin Texture,
--   Acne & Breakouts, Skin Hydration, Skin Quality Improvement,
--   Submental Fullness, Buttock Augmentation, Dynamic Wrinkle Correction,
--   Hyperpigmentation, Sun Damage
-- Pattern: INSERT...WHERE NOT EXISTS using gl_normalize_text() dedupe
-- Generated: 2026-06-13
-- ============================================================

-- -------------------------
-- FINE LINES & WRINKLES (d927bcd6-35f5-4118-baac-034e225b5ca1)
-- Current aliases: 0 — PRIORITY TARGET, adding 6 from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'I''m an old lady and I''ve got fine lines all over my face', 'd927bcd6-35f5-4118-baac-034e225b5ca1'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I''m an old lady and I''ve got fine lines all over my face')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'these little lines around my eyes and mouth', 'd927bcd6-35f5-4118-baac-034e225b5ca1'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('these little lines around my eyes and mouth')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my skin is starting to show my age', 'd927bcd6-35f5-4118-baac-034e225b5ca1'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my skin is starting to show my age')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I have tiny lines everywhere now', 'd927bcd6-35f5-4118-baac-034e225b5ca1'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have tiny lines everywhere now')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'the crepe-y texture on my skin', 'd927bcd6-35f5-4118-baac-034e225b5ca1'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('the crepe-y texture on my skin')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'everything is getting wrinkled', 'd927bcd6-35f5-4118-baac-034e225b5ca1'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('everything is getting wrinkled')
);

-- -------------------------
-- SKIN DULLNESS (d587e18a-5ce2-4deb-b26a-b9f7943e8a06)
-- Current aliases: 0 — PRIORITY TARGET, adding 5 from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'my skin just looks dull', 'd587e18a-5ce2-4deb-b26a-b9f7943e8a06'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my skin just looks dull')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I don''t have that glow anymore', 'd587e18a-5ce2-4deb-b26a-b9f7943e8a06'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I don''t have that glow anymore')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my skin looks tired and flat', 'd587e18a-5ce2-4deb-b26a-b9f7943e8a06'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my skin looks tired and flat')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I look washed out', 'd587e18a-5ce2-4deb-b26a-b9f7943e8a06'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I look washed out')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my complexion has no life to it', 'd587e18a-5ce2-4deb-b26a-b9f7943e8a06'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my complexion has no life to it')
);

-- -------------------------
-- UNEVEN SKIN TONE (e9d38c83-7788-48e9-8535-3d669a6b5e51)
-- Current aliases: 0 — PRIORITY TARGET, adding 5 from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'my skin tone is really uneven', 'e9d38c83-7788-48e9-8535-3d669a6b5e51'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my skin tone is really uneven')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I have blotchy skin', 'e9d38c83-7788-48e9-8535-3d669a6b5e51'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have blotchy skin')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my face has all different colors in it', 'e9d38c83-7788-48e9-8535-3d669a6b5e51'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my face has all different colors in it')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'some parts of my face are darker than others', 'e9d38c83-7788-48e9-8535-3d669a6b5e51'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('some parts of my face are darker than others')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I can''t get my skin tone to even out', 'e9d38c83-7788-48e9-8535-3d669a6b5e51'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I can''t get my skin tone to even out')
);

-- -------------------------
-- MELASMA (d3b0c1c8-42fb-414d-baaa-097e62ff06b8)
-- Current aliases: 0 — PRIORITY TARGET, adding 5 from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'I have these dark patches on my face', 'd3b0c1c8-42fb-414d-baaa-097e62ff06b8'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have these dark patches on my face')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'the dark spots from my pregnancy never went away', 'd3b0c1c8-42fb-414d-baaa-097e62ff06b8'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('the dark spots from my pregnancy never went away')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I have brown patches across my cheeks and forehead', 'd3b0c1c8-42fb-414d-baaa-097e62ff06b8'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have brown patches across my cheeks and forehead')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my face gets dark in the sun and it won''t go away', 'd3b0c1c8-42fb-414d-baaa-097e62ff06b8'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my face gets dark in the sun and it won''t go away')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'the mask of pregnancy on my face', 'd3b0c1c8-42fb-414d-baaa-097e62ff06b8'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('the mask of pregnancy on my face')
);

-- -------------------------
-- ROSACEA (337f6680-63d4-467b-a02e-ff95ff65a97b)
-- Current aliases: 0 — PRIORITY TARGET, adding 5 from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'my face is always red', '337f6680-63d4-467b-a02e-ff95ff65a97b'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my face is always red')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I flush really easily and stay red', '337f6680-63d4-467b-a02e-ff95ff65a97b'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I flush really easily and stay red')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'the redness on my cheeks won''t go away', '337f6680-63d4-467b-a02e-ff95ff65a97b'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('the redness on my cheeks won''t go away')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'people always ask me if I''m sunburned', '337f6680-63d4-467b-a02e-ff95ff65a97b'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('people always ask me if I''m sunburned')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my face turns red at the slightest thing', '337f6680-63d4-467b-a02e-ff95ff65a97b'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my face turns red at the slightest thing')
);

-- -------------------------
-- MUSCLE DEFINITION (bbd16799-2f23-4532-844e-0e1916bc8193)
-- Current aliases: 0 — PRIORITY TARGET, adding 5 from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'I want more toned arms', 'bbd16799-2f23-4532-844e-0e1916bc8193'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want more toned arms')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want to look more defined and sculpted', 'bbd16799-2f23-4532-844e-0e1916bc8193'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want to look more defined and sculpted')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want visible abs but can''t seem to get them', 'bbd16799-2f23-4532-844e-0e1916bc8193'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want visible abs but can''t seem to get them')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want my muscles to show more', 'bbd16799-2f23-4532-844e-0e1916bc8193'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want my muscles to show more')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my body looks soft even though I work out', 'bbd16799-2f23-4532-844e-0e1916bc8193'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my body looks soft even though I work out')
);

-- -------------------------
-- BUTTOCK APPEARANCE (74bc45a7-262f-469e-984e-ca3d8382525f)
-- Current aliases: 0 — PRIORITY TARGET, adding 4 from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'my butt is flat and I want more shape', '74bc45a7-262f-469e-984e-ca3d8382525f'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my butt is flat and I want more shape')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I have cellulite on my backside', '74bc45a7-262f-469e-984e-ca3d8382525f'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have cellulite on my backside')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my buttocks lost their shape after I had kids', '74bc45a7-262f-469e-984e-ca3d8382525f'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my buttocks lost their shape after I had kids')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want a rounder more lifted look back there', '74bc45a7-262f-469e-984e-ca3d8382525f'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want a rounder more lifted look back there')
);

-- -------------------------
-- VASCULAR LESIONS (4990d27a-8c78-43ab-b0d3-fcb1f8140ed3)
-- Current aliases: 0 — PRIORITY TARGET, adding 4 from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'I have broken blood vessels on my face', '4990d27a-8c78-43ab-b0d3-fcb1f8140ed3'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have broken blood vessels on my face')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I have visible veins on my legs', '4990d27a-8c78-43ab-b0d3-fcb1f8140ed3'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have visible veins on my legs')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'these little red lines on my nose and cheeks', '4990d27a-8c78-43ab-b0d3-fcb1f8140ed3'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('these little red lines on my nose and cheeks')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I have spider veins I want to get rid of', '4990d27a-8c78-43ab-b0d3-fcb1f8140ed3'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have spider veins I want to get rid of')
);

-- -------------------------
-- SKIN TEXTURE (001de059-a4c0-4ec2-8e20-a10162ddedeb)
-- Current aliases: 4 — adding 4 more from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'my skin feels rough and uneven', '001de059-a4c0-4ec2-8e20-a10162ddedeb'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my skin feels rough and uneven')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my pores are really noticeable', '001de059-a4c0-4ec2-8e20-a10162ddedeb'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my pores are really noticeable')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my skin just doesn''t look smooth', '001de059-a4c0-4ec2-8e20-a10162ddedeb'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my skin just doesn''t look smooth')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'bumpy texture on my cheeks', '001de059-a4c0-4ec2-8e20-a10162ddedeb'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('bumpy texture on my cheeks')
);

-- -------------------------
-- ACNE & BREAKOUTS (7457a227-b17f-4d04-bad9-e2317ae05ed0)
-- Current aliases: 7 — adding 4 more from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'I keep breaking out even as an adult', '7457a227-b17f-4d04-bad9-e2317ae05ed0'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I keep breaking out even as an adult')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I get pimples around my chin every month', '7457a227-b17f-4d04-bad9-e2317ae05ed0'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I get pimples around my chin every month')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I''ve had acne my whole life and nothing helps', '7457a227-b17f-4d04-bad9-e2317ae05ed0'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I''ve had acne my whole life and nothing helps')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I still get breakouts at my age', '7457a227-b17f-4d04-bad9-e2317ae05ed0'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I still get breakouts at my age')
);

-- -------------------------
-- SKIN HYDRATION (b5e3d8c2-9a4f-4b6e-8d3f-2c5a1e7b4f96)
-- Current aliases: 6 — adding 3 more from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'my skin is constantly dry no matter what I use', 'b5e3d8c2-9a4f-4b6e-8d3f-2c5a1e7b4f96'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my skin is constantly dry no matter what I use')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my face feels tight and dry all the time', 'b5e3d8c2-9a4f-4b6e-8d3f-2c5a1e7b4f96'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my face feels tight and dry all the time')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I can''t seem to get my skin hydrated', 'b5e3d8c2-9a4f-4b6e-8d3f-2c5a1e7b4f96'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I can''t seem to get my skin hydrated')
);

-- -------------------------
-- SKIN QUALITY IMPROVEMENT (c6f4e9d3-0b5a-4c7f-9e4a-3d6b2f8c5a07)
-- Current aliases: 8 — adding 3 more from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'I just want healthier looking skin overall', 'c6f4e9d3-0b5a-4c7f-9e4a-3d6b2f8c5a07'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I just want healthier looking skin overall')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my skin needs a complete overhaul', 'c6f4e9d3-0b5a-4c7f-9e4a-3d6b2f8c5a07'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my skin needs a complete overhaul')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want my skin to look the way it did ten years ago', 'c6f4e9d3-0b5a-4c7f-9e4a-3d6b2f8c5a07'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want my skin to look the way it did ten years ago')
);

-- -------------------------
-- SUBMENTAL FULLNESS (8c6e3ae9-df50-485e-b69a-358719cdfcaf)
-- Current aliases: 7 — adding 4 more from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'I hate my double chin', '8c6e3ae9-df50-485e-b69a-358719cdfcaf'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I hate my double chin')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I have this extra chin that won''t go away', '8c6e3ae9-df50-485e-b69a-358719cdfcaf'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have this extra chin that won''t go away')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'the puffiness under my chin bothers me', '8c6e3ae9-df50-485e-b69a-358719cdfcaf'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('the puffiness under my chin bothers me')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'even when I lose weight the chin thing stays', '8c6e3ae9-df50-485e-b69a-358719cdfcaf'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('even when I lose weight the chin thing stays')
);

-- -------------------------
-- BUTTOCK AUGMENTATION (9200f930-fe63-4b78-8428-625807c80a26)
-- Current aliases: 3 — adding 4 more from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'I want a more shapely backside', '9200f930-fe63-4b78-8428-625807c80a26'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want a more shapely backside')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want more curve and fullness back there', '9200f930-fe63-4b78-8428-625807c80a26'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want more curve and fullness back there')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my butt needs more volume', '9200f930-fe63-4b78-8428-625807c80a26'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my butt needs more volume')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I want a lifted and fuller look', '9200f930-fe63-4b78-8428-625807c80a26'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I want a lifted and fuller look')
);

-- -------------------------
-- DYNAMIC WRINKLE CORRECTION (f9c7b2a6-3e8d-4f0c-2b7d-6a9e5c1f8d30)
-- Current aliases: 5 — adding 3 more from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'the lines that appear when I move my face', 'f9c7b2a6-3e8d-4f0c-2b7d-6a9e5c1f8d30'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('the lines that appear when I move my face')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'wrinkles that show up when I smile or squint', 'f9c7b2a6-3e8d-4f0c-2b7d-6a9e5c1f8d30'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('wrinkles that show up when I smile or squint')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I get lines every time I make an expression', 'f9c7b2a6-3e8d-4f0c-2b7d-6a9e5c1f8d30'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I get lines every time I make an expression')
);

-- -------------------------
-- HYPERPIGMENTATION (2230348c-0f13-4f82-acab-aaff2645b06f)
-- Current aliases: 5 — adding 3 more from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'I have dark spots all over', '2230348c-0f13-4f82-acab-aaff2645b06f'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have dark spots all over')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'these brown spots just keep multiplying', '2230348c-0f13-4f82-acab-aaff2645b06f'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('these brown spots just keep multiplying')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my skin has a lot of discoloration', '2230348c-0f13-4f82-acab-aaff2645b06f'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my skin has a lot of discoloration')
);

-- -------------------------
-- SUN DAMAGE (22c75f19-121c-435f-8134-d362b31f1bc7)
-- Current aliases: 8 — adding 3 more from transcripts
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'I spent too much time in the sun when I was young', '22c75f19-121c-435f-8134-d362b31f1bc7'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I spent too much time in the sun when I was young')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'years of sun damage are catching up with me', '22c75f19-121c-435f-8134-d362b31f1bc7'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('years of sun damage are catching up with me')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my skin shows all the sun I got growing up', '22c75f19-121c-435f-8134-d362b31f1bc7'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my skin shows all the sun I got growing up')
);
