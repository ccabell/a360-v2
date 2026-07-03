-- =============================================================================
-- TCP Builder — timing-intelligence seed (Global V3 / aejskvmpembryunnbgrk)
-- Created 2026-06-22 for the TCP Builder demo (Phase 1). Authorized by Chris
-- (Option B: fixture + light hero-set DB seed). Plan:
--   C:\Projects\a360-v2-wse\.planning\demo-tcp-phase0-plan.md  (§8)
--
-- PURPOSE: GL has timing gaps — item_relationships.timing_guidance was 0/37,
-- product min_retreatment_interval/social_downtime 0/29. This fills the HERO
-- SET ONLY so the live (non-fixture) path reads true. The stage demo uses the
-- hand-authored fixture; this just keeps the live path honest.
--
-- SAFETY: synthetic, clinically-sane, NO PHI. Idempotent — products use
-- coalesce() (fills NULLs only, never clobbers real values like Botox onset);
-- relationships guard on `timing_guidance IS NULL`. Re-runnable.
--
-- JSONB shape matches existing rows: {unit, display, value_min, value_max}.
--
-- REVERT (hero set only — restores to the pre-seed NULL state):
--   update products set min_retreatment_interval=null, social_downtime=null
--     where id in (
--       '4b92be36-e84e-432c-8549-f5d85a767fdb','7370545f-97a3-4519-a92d-3ac4f969829d',
--       '6c8f72f0-887f-484a-a588-0bb9bd8052c9','2ce7a3d2-b06d-4b62-b9b7-4113afb51baa',
--       'b74d5475-bf58-4d7d-87f5-2c8dc9e252de','f1732c7c-3f19-4f3d-9aff-543a132e5506',
--       '84ac561e-1818-4ece-a8d7-1fb6c5ea80df','da25d447-c316-40b2-802e-e190c0bdbd9f');
--   update products set onset_time=null, peak_effect=null, duration_of_effect=null
--     where id in ('7370545f-97a3-4519-a92d-3ac4f969829d','6c8f72f0-887f-484a-a588-0bb9bd8052c9',
--       '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa','f1732c7c-3f19-4f3d-9aff-543a132e5506',
--       '84ac561e-1818-4ece-a8d7-1fb6c5ea80df','da25d447-c316-40b2-802e-e190c0bdbd9f');
--   update products set onset_time=null, peak_effect=null
--     where id='b74d5475-bf58-4d7d-87f5-2c8dc9e252de';  -- SKINVIVE duration was real, keep it
--   update item_relationships set timing_guidance=null where id in (
--     'f649faa1-144a-4fba-bf7b-5a1e71c2afe4','c8edfc96-1d65-44c6-8fbd-ca5f524ce3c7',
--     'c6663562-144e-49ff-a315-3fe3b1bc8e8e','111b729a-7989-47a7-95b5-3d308580ff23',
--     '50caaf43-f01a-420b-9b7c-fdcd8ddfdb8f','04000cb6-d6b3-4a8a-b66f-75f8219a604c',
--     '3e7616ae-fb77-4ac2-b7f6-b63c4c24fad6','5623101b-0119-423f-b452-632ea8670e7c',
--     'bd350547-50c6-440a-8d06-0fbf43f2eca5');
-- =============================================================================

-- ---- Products (coalesce = fill NULLs only) ----------------------------------

-- Botox Cosmetic (onset/peak/duration already real → kept; add retreat+downtime)
update products set
  min_retreatment_interval = coalesce(min_retreatment_interval, '{"unit":"month","display":"3-4 months","value_min":3,"value_max":4}'::jsonb),
  social_downtime          = coalesce(social_downtime,          '{"unit":"day","display":"None to minimal","value_min":0,"value_max":1}'::jsonb)
where id = '4b92be36-e84e-432c-8549-f5d85a767fdb';

-- Juvederm Vollure XC (HA filler — nasolabial folds)
update products set
  onset_time               = coalesce(onset_time,               '{"unit":"week","display":"Immediate; final result ~2 weeks","value_min":0,"value_max":2}'::jsonb),
  peak_effect              = coalesce(peak_effect,              '{"unit":"week","display":"2 weeks","value_min":2,"value_max":2}'::jsonb),
  duration_of_effect       = coalesce(duration_of_effect,       '{"unit":"month","display":"12-18 months","value_min":12,"value_max":18}'::jsonb),
  min_retreatment_interval = coalesce(min_retreatment_interval, '{"unit":"month","display":"12-18 months","value_min":12,"value_max":18}'::jsonb),
  social_downtime          = coalesce(social_downtime,          '{"unit":"day","display":"1-3 days (swelling/bruising)","value_min":1,"value_max":3}'::jsonb)
where id = '7370545f-97a3-4519-a92d-3ac4f969829d';

-- Juvederm Voluma XC (cheek/midface volume)
update products set
  onset_time               = coalesce(onset_time,               '{"unit":"week","display":"Immediate; settles ~2 weeks","value_min":0,"value_max":2}'::jsonb),
  peak_effect              = coalesce(peak_effect,              '{"unit":"week","display":"2-4 weeks","value_min":2,"value_max":4}'::jsonb),
  duration_of_effect       = coalesce(duration_of_effect,       '{"unit":"month","display":"Up to 24 months","value_min":18,"value_max":24}'::jsonb),
  min_retreatment_interval = coalesce(min_retreatment_interval, '{"unit":"month","display":"18-24 months","value_min":18,"value_max":24}'::jsonb),
  social_downtime          = coalesce(social_downtime,          '{"unit":"day","display":"2-3 days","value_min":2,"value_max":3}'::jsonb)
where id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9';

-- Sculptra Aesthetic (collagen biostimulator — series)
update products set
  onset_time               = coalesce(onset_time,               '{"unit":"week","display":"Gradual over 6-12 weeks","value_min":6,"value_max":12}'::jsonb),
  peak_effect              = coalesce(peak_effect,              '{"unit":"month","display":"3-6 months after series","value_min":3,"value_max":6}'::jsonb),
  duration_of_effect       = coalesce(duration_of_effect,       '{"unit":"month","display":"Up to 2 years","value_min":18,"value_max":24}'::jsonb),
  min_retreatment_interval = coalesce(min_retreatment_interval, '{"unit":"week","display":"Series of 3, ~4-6 weeks apart","value_min":4,"value_max":6}'::jsonb),
  social_downtime          = coalesce(social_downtime,          '{"unit":"day","display":"1-2 days; massage 5-5-5","value_min":1,"value_max":2}'::jsonb)
where id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa';

-- SKINVIVE by Juvederm (HA skin booster — duration already real → kept)
update products set
  onset_time               = coalesce(onset_time,               '{"unit":"week","display":"1-2 weeks","value_min":1,"value_max":2}'::jsonb),
  peak_effect              = coalesce(peak_effect,              '{"unit":"month","display":"1 month","value_min":1,"value_max":1}'::jsonb),
  min_retreatment_interval = coalesce(min_retreatment_interval, '{"unit":"month","display":"6 months","value_min":6,"value_max":6}'::jsonb),
  social_downtime          = coalesce(social_downtime,          '{"unit":"day","display":"1-2 days (small bumps)","value_min":1,"value_max":2}'::jsonb)
where id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de';

-- Restylane Lyft (HA structural volume)
update products set
  onset_time               = coalesce(onset_time,               '{"unit":"week","display":"Immediate; settles ~2 weeks","value_min":0,"value_max":2}'::jsonb),
  peak_effect              = coalesce(peak_effect,              '{"unit":"week","display":"2 weeks","value_min":2,"value_max":2}'::jsonb),
  duration_of_effect       = coalesce(duration_of_effect,       '{"unit":"month","display":"12-18 months","value_min":12,"value_max":18}'::jsonb),
  min_retreatment_interval = coalesce(min_retreatment_interval, '{"unit":"month","display":"12-18 months","value_min":12,"value_max":18}'::jsonb),
  social_downtime          = coalesce(social_downtime,          '{"unit":"day","display":"1-3 days","value_min":1,"value_max":3}'::jsonb)
where id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506';

-- InMode Morpheus8 (RF microneedling — series)
update products set
  onset_time               = coalesce(onset_time,               '{"unit":"week","display":"Gradual over 3-6 weeks","value_min":3,"value_max":6}'::jsonb),
  peak_effect              = coalesce(peak_effect,              '{"unit":"month","display":"3 months","value_min":3,"value_max":3}'::jsonb),
  duration_of_effect       = coalesce(duration_of_effect,       '{"unit":"month","display":"12-18 months","value_min":12,"value_max":18}'::jsonb),
  min_retreatment_interval = coalesce(min_retreatment_interval, '{"unit":"week","display":"Series of 3, ~4 weeks apart","value_min":4,"value_max":6}'::jsonb),
  social_downtime          = coalesce(social_downtime,          '{"unit":"day","display":"2-4 days redness/swelling","value_min":2,"value_max":4}'::jsonb)
where id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df';

-- Merz Ultherapy PRIME (microfocused ultrasound — tightening)
update products set
  onset_time               = coalesce(onset_time,               '{"unit":"month","display":"Gradual over 2-3 months","value_min":2,"value_max":3}'::jsonb),
  peak_effect              = coalesce(peak_effect,              '{"unit":"month","display":"3-6 months","value_min":3,"value_max":6}'::jsonb),
  duration_of_effect       = coalesce(duration_of_effect,       '{"unit":"month","display":"12-18 months","value_min":12,"value_max":18}'::jsonb),
  min_retreatment_interval = coalesce(min_retreatment_interval, '{"unit":"month","display":"12-18 months","value_min":12,"value_max":18}'::jsonb),
  social_downtime          = coalesce(social_downtime,          '{"unit":"day","display":"None to minimal","value_min":0,"value_max":1}'::jsonb)
where id = 'da25d447-c316-40b2-802e-e190c0bdbd9f';

-- ---- Relationship timing_guidance (fill NULLs only) ------------------------

update item_relationships set timing_guidance =
  'Stage these — do not combine in one visit. Place the Sculptra collagen series first; layer Vollure for the folds once the biostimulator has settled (~2-4 weeks) so volume is judged on the new collagen baseline.'
where id = 'f649faa1-144a-4fba-bf7b-5a1e71c2afe4' and timing_guidance is null;  -- Vollure ↔ Sculptra

update item_relationships set timing_guidance =
  'Separate visits. Treat Sculptra as the foundational collagen series; add Botox once collagen is establishing. Avoid same-session to keep injection planes and post-care distinct.'
where id = 'c8edfc96-1d65-44c6-8fbd-ca5f524ce3c7' and timing_guidance is null;  -- Botox ↔ Sculptra

update item_relationships set timing_guidance =
  'Same session is fine. Treat Botox first to set the upper-face frame, then place Voluma for midface volume.'
where id = 'c6663562-144e-49ff-a315-3fe3b1bc8e8e' and timing_guidance is null;  -- Botox ↔ Voluma

update item_relationships set timing_guidance =
  'Same session is fine. Botox first; finish with SKINVIVE for skin-quality glow. Expect transient SKINVIVE papules for ~24h.'
where id = '111b729a-7989-47a7-95b5-3d308580ff23' and timing_guidance is null;  -- Botox ↔ SKINVIVE

update item_relationships set timing_guidance =
  'Same session is fine. Botox to the upper face first, then Vollure for the folds; sequence injection sites to avoid product migration.'
where id = '50caaf43-f01a-420b-9b7c-fdcd8ddfdb8f' and timing_guidance is null;  -- Botox ↔ Vollure

update item_relationships set timing_guidance =
  'Same session is fine. Botox first; follow with Restylane Lyft for deeper structural volume.'
where id = '04000cb6-d6b3-4a8a-b66f-75f8219a604c' and timing_guidance is null;  -- Botox ↔ Restylane Lyft

update item_relationships set timing_guidance =
  'Can combine. Prefer Botox 1-2 weeks before Morpheus8 so the toxin has set; if same-day, perform Morpheus8 RF first, then Botox.'
where id = '3e7616ae-fb77-4ac2-b7f6-b63c4c24fad6' and timing_guidance is null;  -- Botox ↔ Morpheus8

update item_relationships set timing_guidance =
  'Complementary collagen strategies. Same-session acceptable (Morpheus8 first, then Sculptra); otherwise alternate across the series ~2-4 weeks apart for steady collagen building.'
where id = '5623101b-0119-423f-b452-632ea8670e7c' and timing_guidance is null;  -- Sculptra ↔ Morpheus8

update item_relationships set timing_guidance =
  'Stage. Build the deep collagen base with the Sculptra series first; add SKINVIVE for surface hydration/glow ~2-4 weeks after a session, not same day.'
where id = 'bd350547-50c6-440a-8d06-0fbf43f2eca5' and timing_guidance is null;  -- SKINVIVE ↔ Sculptra
