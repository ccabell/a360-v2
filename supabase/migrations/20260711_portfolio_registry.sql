-- A360 Command Center: DB-backed portfolio registry (plan: A360_Hub/plans/a360-command-center-plan.md §3a)
-- Applied to Ops (uedajrdzcjfrmbiznflf) 2026-07-11 via MCP apply_migration `create_portfolio_registry`.
-- Two tables only, deliberately minimal. Jira linkage is a future phase — not modeled.

create table public.portfolio_projects (
  slug text primary key,
  name text not null,
  one_liner text not null default '',
  status text not null default 'building'
    check (status in ('concept','building','demoable','shipped','paused','frozen','retired')),
  priority text not null default 'backlog'
    check (priority in ('front','next','backlog','reserve')),
  category text not null default 'Uncategorized',
  parent_slug text references public.portfolio_projects(slug) on delete set null,
  tier text not null default 'card' check (tier in ('native','embed','linkout','card')),
  href text,
  screenshot text,
  repo text,
  stack text,
  promotion text not null default 'na' check (promotion in ('S','M','L','XL','na')),
  -- links: { github?, vercel: [], live: [], supabase: [], railway: [], docs: [], localPath? } — plural everywhere
  links jsonb not null default '{}'::jsonb,
  -- other registry entries (slug) or data sources (ds:<id>) / services (svc:<id>) this project relies on
  dependencies text[] not null default '{}',
  notes text,
  paused_reason text,
  last_verified date,
  -- delete = archive (soft): drops out of every default view, stays behind the Archived filter (graveyard rule)
  archived boolean not null default false,
  archived_at timestamptz,
  sort integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index portfolio_projects_active_idx on public.portfolio_projects (priority, sort) where not archived;
create index portfolio_projects_category_idx on public.portfolio_projects (category);

create table public.portfolio_tasks (
  id uuid primary key default gen_random_uuid(),
  project_slug text not null references public.portfolio_projects(slug) on delete cascade,
  title text not null,
  status text not null default 'open' check (status in ('open','done')),
  sort integer not null default 0,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index portfolio_tasks_project_idx on public.portfolio_tasks (project_slug, status);

-- RLS matched to Ops siblings (reach_campaigns): enabled, single permissive policy;
-- the app talks to Ops server-side with the service key only.
alter table public.portfolio_projects enable row level security;
alter table public.portfolio_tasks enable row level security;
create policy service_role_all on public.portfolio_projects for all using (true) with check (true);
create policy service_role_all on public.portfolio_tasks for all using (true) with check (true);
