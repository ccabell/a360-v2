-- Seed: Orange Twist demo practice + Scribe demo patients (Ops, uedajrdzcjfrmbiznflf)
-- Applied 2026-06-22. Idempotent-ish; safe to re-run. Synthetic data only, no PHI.

-- 1) Rebrand the existing demo practice to Orange Twist + locations (keeps FKs).
UPDATE practices
SET name = 'Orange Twist',
    slug = 'orange-twist',
    branding = jsonb_build_object(
      'logo', 'orange-twist',
      'tagline', 'BODY | FACE | SKIN',
      'accent', '#F26A1B',
      'locations', jsonb_build_array(
        jsonb_build_object('id','ot-newport','name','Newport Beach','city','Newport Beach','state','CA','is_default',true),
        jsonb_build_object('id','ot-irvine','name','Irvine','city','Irvine','state','CA','is_default',false),
        jsonb_build_object('id','ot-sandiego','name','San Diego','city','San Diego','state','CA','is_default',false),
        jsonb_build_object('id','ot-scottsdale','name','Scottsdale','city','Scottsdale','state','AZ','is_default',false)
      )
    ),
    updated_at = now()
WHERE id = 'a0000000-0000-0000-0000-000000000001';

-- 2) Float the 5 demo heroes to the top of the picker.
UPDATE patients SET last_consultation_at = now() - (interval '1 hour' * x.rk)
FROM (VALUES
  ('3f7bfaf1-b60a-4afd-ae8b-1e82244a2180'::uuid, 1), -- Sofia Reyes (cached fixture)
  ('0c6053d5-6851-4542-898e-9e8f4a6efc53'::uuid, 2), -- Amara Okafor (cached fixture)
  ('a9094b49-1395-42a9-bb33-f3168d087d19'::uuid, 3), -- Danielle Brooks
  ('5dbf9db0-2931-4629-8a20-3b9243b89d90'::uuid, 4), -- Katherine Chen
  ('cdcdcf89-5cca-4251-9355-66c84d8d6b24'::uuid, 5)  -- Jessica Navarro
) AS x(pid, rk)
WHERE patients.id = x.pid;

-- 3) Backfill biological_sex + patient_summary where missing.
UPDATE patients SET biological_sex = COALESCE(biological_sex,'Female') WHERE id IN
  ('5dbf9db0-2931-4629-8a20-3b9243b89d90','a9094b49-1395-42a9-bb33-f3168d087d19','cdcdcf89-5cca-4251-9355-66c84d8d6b24');
UPDATE patients SET patient_summary = 'Established patient. Full-face neuromodulator maintenance with interest in lip enhancement. Engaged, returns on schedule.'
  WHERE id = '5dbf9db0-2931-4629-8a20-3b9243b89d90' AND patient_summary IS NULL;
UPDATE patients SET patient_summary = 'Consultation patient evaluating lower-face volume restoration. Interested in dermal filler, future lip filler and threading.'
  WHERE id = 'a9094b49-1395-42a9-bb33-f3168d087d19' AND patient_summary IS NULL;
UPDATE patients SET patient_summary = 'Returning patient following lip flip; planning half-syringe lip filler. Interested in lip blushing as a future service.'
  WHERE id = 'cdcdcf89-5cca-4251-9355-66c84d8d6b24' AND patient_summary IS NULL;

-- 4) Visit descriptions for the picker (consultations.details).
UPDATE consultations SET details = 'Botox touch-up (forehead, glabella, lateral canthus) + full-face microneedling with topical PDGF. Established Alle member.' WHERE id = '7cacf4ba-4566-4174-87d0-3da5fe61876a';
UPDATE consultations SET details = 'New-patient aesthetic consultation: Dysport (forehead/glabella), Restylane Kysse (lips), tear-trough options, Halo laser interest.' WHERE id = '1c281ae0-b2b6-4928-b97c-8d9e614eb773';
UPDATE consultations SET details = 'Consultation for lower-face volume restoration with dermal filler (Versa). Discussed lip filler and threading for future visits.' WHERE id = '2584ddbc-af7b-4c13-b500-50bc5fe6fefa';
UPDATE consultations SET details = 'Full-face Botox (forehead, glabella, crow''s feet, brow lift, DAO) plus lip flip. Product dispense: bruise gel, lip balm.' WHERE id = 'd00d856e-e1c0-494f-9190-00a059564f0c';
UPDATE consultations SET details = 'Follow-up on lip flip results; agreed to half-syringe lip filler next visit. Declined forehead treatment today.' WHERE id = '250f1c3b-cb90-477c-8c29-c84ea04d1659';
