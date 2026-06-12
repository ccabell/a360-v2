-- ============================================================================
-- GL Claim Reverification + Dual-Provenance schema (Supabase / Postgres + pgvector)
--
-- Core principle: a claim has TWO kinds of provenance.
--   * discovery provenance  -> where we first learned the fact (audit only)
--   * verification provenance -> what independently grounds it (confers citability)
-- Usability flows ONLY from verification provenance. Encumbered discovery
-- sources can never reach the runtime, by construction.
-- ============================================================================

create extension if not exists vector;
create schema if not exists gl;

-- ----------------------------------------------------------------------------
-- Enums
-- ----------------------------------------------------------------------------

-- Rights classification lives on the SOURCE, not the claim.
create type gl.rights_class as enum (
  'encumbered_discovery_only',  -- podcasts, unlicensed textbooks. NEVER served.
  'licensed',                   -- content under a signed license agreement
  'open_access_cc',             -- CC-BY etc. (PMC open-access subset, OA journals)
  'public_domain',
  'manufacturer_permitted',     -- IFU / prescribing info, used per stated terms
  'society_guideline',          -- practice guidelines usable per terms
  'owned'                       -- expert-authored content you own outright
);

create type gl.source_type as enum (
  'podcast', 'textbook', 'pubmed', 'pmc_oa', 'society_guideline',
  'manufacturer_ifu', 'expert_authored', 'other'
);

create type gl.claim_status as enum (
  'extracted',       -- raw, quarantined, no usable verification yet
  'pending_review',  -- queued for clinical reviewer
  'verified',        -- has >=1 usable-rights verification at/above threshold
  'citable',         -- promoted: embedding built, exposed to runtime
  'rejected'         -- failed verification or flagged as protected expression
);

create type gl.verifier_kind as enum ('agent', 'clinical_reviewer');

-- Single source of truth for "which rights classes may be served / cited".
create or replace function gl.is_usable_rights(rc gl.rights_class)
returns boolean language sql immutable as $$
  select rc <> 'encumbered_discovery_only'
$$;

-- ----------------------------------------------------------------------------
-- Sources
-- ----------------------------------------------------------------------------
create table gl.source (
  id            uuid primary key default gen_random_uuid(),
  source_type   gl.source_type not null,
  rights_class  gl.rights_class not null,
  title         text,
  publisher     text,
  external_ref  text,           -- PMID, DOI, ISBN, episode URL, IFU id
  license_ref   text,           -- FK/pointer to a license-agreement record
  ingested_at   timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Raw extraction (QUARANTINE). Atomic assertions pulled from a source.
-- source_span is retained for audit during research only and must be walled
-- off from the runtime role via RLS (policy below). It is never embedded.
-- ----------------------------------------------------------------------------
create table gl.raw_extraction (
  id                uuid primary key default gen_random_uuid(),
  source_id         uuid not null references gl.source(id),
  source_span       text,        -- original passage. AUDIT ONLY. access-controlled.
  extracted_text    text not null, -- atomic assertion in YOUR canonical phrasing
  clinical_entities jsonb,       -- Comprehend Medical output (entities, codes, conf.)
  extraction_model  text,        -- e.g. bedrock model id + prompt version
  confidence        numeric,
  created_at        timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Claim ledger. Canonical, deduped facts. Many discovery rows -> one claim.
-- canonical_text is original atomic phrasing; never store source verbatim here.
-- ----------------------------------------------------------------------------
create table gl.claim (
  id             uuid primary key default gen_random_uuid(),
  canonical_text text not null,
  clinical_domain text,          -- e.g. 'neuromodulator.upper_face.frontalis'
  concept_refs   jsonb,          -- SNOMED/ontology codes + structured fields
  status         gl.claim_status not null default 'extracted',
  embedding      vector(1024),   -- populated ONLY on promotion to 'citable'
  created_at     timestamptz not null default now(),
  promoted_at    timestamptz,

  -- Embedding may exist only for citable claims; citable requires an embedding.
  constraint citable_requires_embedding
    check (status <> 'citable' or embedding is not null),
  constraint embedding_requires_citable
    check (embedding is null or status = 'citable')
);

create index claim_embedding_idx on gl.claim
  using hnsw (embedding vector_cosine_ops);

-- ----------------------------------------------------------------------------
-- DISCOVERY edge: claim <- raw_extraction. Audit only. Rights-irrelevant.
-- ----------------------------------------------------------------------------
create table gl.claim_discovery (
  claim_id          uuid not null references gl.claim(id) on delete cascade,
  raw_extraction_id uuid not null references gl.raw_extraction(id) on delete cascade,
  primary key (claim_id, raw_extraction_id)
);

-- ----------------------------------------------------------------------------
-- VERIFICATION edge: claim <- primary source. Confers citability + clinical
-- grounding. support_span records WHERE in the source the claim is entailed.
-- ----------------------------------------------------------------------------
create table gl.claim_verification (
  id               uuid primary key default gen_random_uuid(),
  claim_id         uuid not null references gl.claim(id) on delete cascade,
  source_id        uuid not null references gl.source(id),
  support_span     text,             -- supporting passage in the primary source
  support_strength numeric not null, -- entailment score 0..1
  verifier         gl.verifier_kind not null,
  verifier_ref     text,             -- agent run id or reviewer user id
  verified_at      timestamptz not null default now(),
  constraint support_strength_range check (support_strength between 0 and 1)
);

create index claim_verification_claim_idx on gl.claim_verification(claim_id);

-- ----------------------------------------------------------------------------
-- The promotion gate, enforced in the database.
-- A claim flips to 'verified' the moment it has >=1 verification edge to a
-- usable-rights source at/above the strength threshold. The embedding build +
-- final flip to 'citable' happens in app code (it needs an embedding call).
-- ----------------------------------------------------------------------------
create or replace function gl.evaluate_claim_promotion()
returns trigger language plpgsql as $$
declare
  has_usable boolean;
  threshold  numeric := 0.80;
begin
  select exists (
    select 1
    from gl.claim_verification v
    join gl.source s on s.id = v.source_id
    where v.claim_id = new.claim_id
      and gl.is_usable_rights(s.rights_class)
      and v.support_strength >= threshold
  ) into has_usable;

  if has_usable then
    update gl.claim
       set status = 'verified'
     where id = new.claim_id
       and status in ('extracted', 'pending_review');
  end if;
  return new;
end $$;

create trigger trg_claim_promotion
after insert or update on gl.claim_verification
for each row execute function gl.evaluate_claim_promotion();

-- Belt-and-braces: forbid promotion to 'citable' unless a usable verification
-- exists. Guards against an app bug setting status directly.
create or replace function gl.guard_citable()
returns trigger language plpgsql as $$
begin
  if new.status = 'citable' and (old.status is distinct from 'citable') then
    if not exists (
      select 1
      from gl.claim_verification v
      join gl.source s on s.id = v.source_id
      where v.claim_id = new.id
        and gl.is_usable_rights(s.rights_class)
    ) then
      raise exception 'claim % cannot be citable: no usable verification', new.id;
    end if;
    new.promoted_at := coalesce(new.promoted_at, now());
  end if;
  return new;
end $$;

create trigger trg_guard_citable
before update on gl.claim
for each row execute function gl.guard_citable();

-- ----------------------------------------------------------------------------
-- Runtime surface. The ONLY things production (Aurora COALESCE) reads.
-- ----------------------------------------------------------------------------

-- Servable claims. No discovery data, no quarantine, no encumbered text.
create view gl.citable_claim as
select c.id, c.canonical_text, c.clinical_domain, c.concept_refs, c.embedding
from gl.claim c
where c.status = 'citable';

-- Citations for a served claim: verification (primary) sources only.
-- Discovery sources are structurally excluded.
create view gl.claim_citation as
select v.claim_id,
       s.source_type,
       s.title,
       s.external_ref,
       s.rights_class,
       v.support_strength
from gl.claim_verification v
join gl.source s on s.id = v.source_id
where gl.is_usable_rights(s.rights_class);

-- ----------------------------------------------------------------------------
-- RLS: keep raw extraction + encumbered source content away from the runtime.
-- (Assumes a 'runtime' role that only ever touches the views above. Tighten to
--  your actual Supabase roles.)
-- ----------------------------------------------------------------------------
alter table gl.raw_extraction enable row level security;
alter table gl.source         enable row level security;

-- Runtime gets nothing from raw_extraction.
create policy raw_extraction_no_runtime on gl.raw_extraction
  for select using (current_user <> 'runtime');

-- Runtime may read source rows only for usable rights classes (for citations).
create policy source_runtime_usable_only on gl.source
  for select using (
    current_user <> 'runtime' or gl.is_usable_rights(rights_class)
  );

-- ----------------------------------------------------------------------------
-- Optional hygiene: purge quarantined source_span after a retention window,
-- once the claim it fed is verified. Keeps encumbered verbatim text from
-- lingering. Schedule via pg_cron.
-- ----------------------------------------------------------------------------
-- update gl.raw_extraction re
--    set source_span = null
--  where re.created_at < now() - interval '180 days'
--    and exists (
--      select 1 from gl.claim_discovery d
--      join gl.claim c on c.id = d.claim_id
--      where d.raw_extraction_id = re.id and c.status in ('verified','citable')
--    );
