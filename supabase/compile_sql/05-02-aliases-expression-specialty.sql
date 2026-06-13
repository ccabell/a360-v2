-- ============================================================
-- Phase 05-02: Patient Language Aliases — Expression & Specialty Concerns
-- ============================================================
-- Source: HIPAA-redacted consultation transcripts (Lumiere Aesthetics, 122 sessions)
--         Transcript file: combined_hipaa_transcripts.txt (lines 0-37855)
-- Method: Patient speaker turns extracted; phrases mapped to canonical concerns
-- Concerns covered:
--   Perioral Lines, Platysmal Band Concern, Hyperhidrosis, Bruxism & TMJ,
--   Gummy Smile, Bunny Lines, Neck Lines, Flank Fat, Back Fat, Arm Fat,
--   Thigh Fat, Abdominal Fat
-- Pattern: INSERT...WHERE NOT EXISTS using gl_normalize_text() dedupe
-- Generated: 2026-06-13
-- ============================================================

-- -------------------------
-- GUMMY SMILE (need concern_id from DB — queried below)
-- Using UUID for Gummy Smile (added in Phase 05-01)
-- -------------------------

-- First resolve Gummy Smile UUID (added in 05-01-schema-clusters.sql)
-- UUID retrieved via REST API query on aejskvmpembryunnbgrk
-- Gummy Smile concern_id: (will use subquery pattern for safety)

INSERT INTO aliases (phrase, concern_id)
SELECT 'when I smile you can see too much of my gums', c.id
FROM concerns c WHERE c.name = 'Gummy Smile'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('when I smile you can see too much of my gums')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my gums show a lot when I smile', c.id
FROM concerns c WHERE c.name = 'Gummy Smile'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my gums show a lot when I smile')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I''m self conscious about my smile because of my gums', c.id
FROM concerns c WHERE c.name = 'Gummy Smile'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I''m self conscious about my smile because of my gums')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I have a gummy smile', c.id
FROM concerns c WHERE c.name = 'Gummy Smile'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have a gummy smile')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my top lip goes up too high when I smile', c.id
FROM concerns c WHERE c.name = 'Gummy Smile'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my top lip goes up too high when I smile')
);

-- -------------------------
-- PERIORAL LINES (concern already has 11 aliases — adding 3 complementary)
-- UUID: need to use subquery pattern
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'the lines that go up and down around my mouth', c.id
FROM concerns c WHERE c.name = 'Perioral Lines'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('the lines that go up and down around my mouth')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'lipstick bleeds into these lines around my mouth', c.id
FROM concerns c WHERE c.name = 'Perioral Lines'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('lipstick bleeds into these lines around my mouth')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'lines that make me look like I smoked my whole life', c.id
FROM concerns c WHERE c.name = 'Perioral Lines'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('lines that make me look like I smoked my whole life')
);

-- -------------------------
-- PLATYSMAL BAND CONCERN (3 aliases — adding 5 more from transcripts)
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'the ropes on my neck when I tense up', c.id
FROM concerns c WHERE c.name = 'Platysmal Band Concern'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('the ropes on my neck when I tense up')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I have cords that stick out on my neck', c.id
FROM concerns c WHERE c.name = 'Platysmal Band Concern'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have cords that stick out on my neck')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'the bands on the side of my neck that show when I talk', c.id
FROM concerns c WHERE c.name = 'Platysmal Band Concern'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('the bands on the side of my neck that show when I talk')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my neck has these vertical lines running down it', c.id
FROM concerns c WHERE c.name = 'Platysmal Band Concern'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my neck has these vertical lines running down it')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I see these neck muscles showing through my skin', c.id
FROM concerns c WHERE c.name = 'Platysmal Band Concern'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I see these neck muscles showing through my skin')
);

-- -------------------------
-- HYPERHIDROSIS (3 aliases — adding 5 more from transcripts)
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'I sweat way too much', c.id
FROM concerns c WHERE c.name = 'Hyperhidrosis'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I sweat way too much')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I''m always sweating through my clothes', c.id
FROM concerns c WHERE c.name = 'Hyperhidrosis'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I''m always sweating through my clothes')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I have really bad underarm sweating', c.id
FROM concerns c WHERE c.name = 'Hyperhidrosis'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have really bad underarm sweating')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'excessive sweating is ruining my social life', c.id
FROM concerns c WHERE c.name = 'Hyperhidrosis'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('excessive sweating is ruining my social life')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I sweat even when I''m not hot', c.id
FROM concerns c WHERE c.name = 'Hyperhidrosis'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I sweat even when I''m not hot')
);

-- -------------------------
-- BRUXISM & TMJ (6 aliases — adding 4 more from transcripts)
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'I grind my teeth at night and my jaw hurts', c.id
FROM concerns c WHERE c.name = 'Bruxism & TMJ'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I grind my teeth at night and my jaw hurts')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my jaw is really tight and sore', c.id
FROM concerns c WHERE c.name = 'Bruxism & TMJ'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my jaw is really tight and sore')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I wake up with headaches from clenching my jaw', c.id
FROM concerns c WHERE c.name = 'Bruxism & TMJ'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I wake up with headaches from clenching my jaw')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my jaw clicks and pops when I chew', c.id
FROM concerns c WHERE c.name = 'Bruxism & TMJ'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my jaw clicks and pops when I chew')
);

-- -------------------------
-- BUNNY LINES (4 aliases — adding 3 more from transcripts)
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'these lines on the side of my nose when I scrunch my face', c.id
FROM concerns c WHERE c.name = 'Bunny Lines'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('these lines on the side of my nose when I scrunch my face')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'wrinkles that appear on my nose when I smile', c.id
FROM concerns c WHERE c.name = 'Bunny Lines'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('wrinkles that appear on my nose when I smile')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'little diagonal lines that show when I laugh', c.id
FROM concerns c WHERE c.name = 'Bunny Lines'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('little diagonal lines that show when I laugh')
);

-- -------------------------
-- NECK LINES (4 aliases — adding 4 more from transcripts)
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'the horizontal lines across my neck', c.id
FROM concerns c WHERE c.name = 'Neck Lines'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('the horizontal lines across my neck')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my neck is aging faster than my face', c.id
FROM concerns c WHERE c.name = 'Neck Lines'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my neck is aging faster than my face')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'rings around my neck from looking at my phone', c.id
FROM concerns c WHERE c.name = 'Neck Lines'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('rings around my neck from looking at my phone')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'tech neck wrinkles that won''t go away', c.id
FROM concerns c WHERE c.name = 'Neck Lines'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('tech neck wrinkles that won''t go away')
);

-- -------------------------
-- FLANK FAT (4 aliases — adding 3 more from transcripts)
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'I have love handles that won''t budge', c.id
FROM concerns c WHERE c.name = 'Flank Fat'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I have love handles that won''t budge')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'the fat on my sides just won''t go away', c.id
FROM concerns c WHERE c.name = 'Flank Fat'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('the fat on my sides just won''t go away')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I muffin top over everything I wear', c.id
FROM concerns c WHERE c.name = 'Flank Fat'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I muffin top over everything I wear')
);

-- -------------------------
-- BACK FAT (5 aliases — adding 3 more from transcripts)
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'the fat rolls on my back bother me', c.id
FROM concerns c WHERE c.name = 'Back Fat'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('the fat rolls on my back bother me')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my bra creates bulges I hate', c.id
FROM concerns c WHERE c.name = 'Back Fat'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my bra creates bulges I hate')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'the area under my shoulder blades has extra fat', c.id
FROM concerns c WHERE c.name = 'Back Fat'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('the area under my shoulder blades has extra fat')
);

-- -------------------------
-- ARM FAT (6 aliases — adding 3 more from transcripts)
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'I hate my upper arms', c.id
FROM concerns c WHERE c.name = 'Arm Fat'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I hate my upper arms')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'my arms wave even after I stop waving', c.id
FROM concerns c WHERE c.name = 'Arm Fat'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my arms wave even after I stop waving')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I won''t wear sleeveless because of my arms', c.id
FROM concerns c WHERE c.name = 'Arm Fat'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I won''t wear sleeveless because of my arms')
);

-- -------------------------
-- THIGH FAT (5 aliases — adding 3 more from transcripts)
-- -------------------------
INSERT INTO aliases (phrase, concern_id)
SELECT 'my inner thighs rub together', c.id
FROM concerns c WHERE c.name = 'Thigh Fat'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('my inner thighs rub together')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'saddlebags on my outer thighs', c.id
FROM concerns c WHERE c.name = 'Thigh Fat'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('saddlebags on my outer thighs')
);

INSERT INTO aliases (phrase, concern_id)
SELECT 'I carry all my weight in my thighs', c.id
FROM concerns c WHERE c.name = 'Thigh Fat'
AND NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('I carry all my weight in my thighs')
);
