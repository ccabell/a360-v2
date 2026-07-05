-- Reach Phase 3 — HITL persistence table (Ops Supabase: uedajrdzcjfrmbiznflf).
-- Applied via Supabase MCP 2026-07-04 (migrations: reach_campaigns_hitl,
-- reach_campaigns_enable_rls). This file is the traceable source of truth —
-- a migration file existing does NOT mean it ran; verify against the live DB.
--
-- Reached only via the service-role key (OPS_SUPABASE_SERVICE_KEY), which
-- bypasses RLS. RLS is enabled with no policies to match every sibling Ops
-- table, so the anon/authenticated roles get zero access. v1 exports only —
-- never sends; a real send path needs practice compliance ack + marketing
-- authorization + audit logging.

create table if not exists public.reach_campaigns (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  campaign_type text,
  status text not null default 'draft'
    check (status in ('draft','edited','approved','rejected')),
  campaign jsonb not null,          -- full (possibly edited) reach_email_composer JSON
  reviews jsonb not null default '[]'::jsonb,       -- per-email [{index, decision, note}]
  edit_history jsonb not null default '[]'::jsonb,  -- append-only [{at, action, status, editor}]
  editor text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists reach_campaigns_patient_idx
  on public.reach_campaigns (patient_id, updated_at desc);

comment on table public.reach_campaigns is
  'A360 Reach HITL: reviewed/edited email campaigns from reach_email_composer. campaign=full JSON, reviews=per-email decisions+notes, edit_history=append-only audit. v1 exports only, never sends.';

alter table public.reach_campaigns enable row level security;
