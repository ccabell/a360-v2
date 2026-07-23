import { getOpsSupabase } from "@/lib/supabase";

/**
 * DB-backed portfolio registry (Ops `portfolio_projects` + `portfolio_tasks`,
 * migration 20260711_portfolio_registry.sql). Replaces the old in-code
 * lib/portfolio/registry.ts catalog; audiences/route grants stayed in code —
 * see lib/portfolio/audiences.ts. Server-side only (service key).
 */

export type ProjectStatus =
  | "concept"
  | "building"
  | "demoable"
  | "shipped"
  | "paused"
  | "frozen"
  | "retired";

export type ProjectPriority = "front" | "next" | "backlog" | "reserve";

export type ProjectTier = "native" | "embed" | "linkout" | "card";

export type PromotionSize = "S" | "M" | "L" | "XL" | "na";

/** Everything a project touches — plural everywhere (one project can have several). */
export interface ProjectLinks {
  github?: string;
  vercel?: string[];
  live?: string[];
  supabase?: string[];
  railway?: string[];
  docs?: string[];
  localPath?: string;
  /**
   * Local git working-state snapshot, written by scripts/sync-portfolio-git.mjs
   * (run on Chris's PC — the deployed app can't read local repos). Captures the
   * last commit AND uncommitted/unpushed work, which the GitHub API can't see.
   */
  git?: GitSnapshot;
}

export interface GitSnapshot {
  /** ISO date of the last local commit on the checked-out branch. */
  lastCommitAt: string | null;
  lastCommitSha: string | null;
  lastCommitSubject: string | null;
  branch: string | null;
  /** true when there are uncommitted changes in the working tree. */
  dirty: boolean;
  /** number of changed files (`git status --porcelain` line count). */
  dirtyCount: number;
  /** commits ahead of the upstream branch (unpushed); 0 if no upstream. */
  ahead: number;
  /** when the sync script last ran for this project (ISO). */
  syncedAt: string;
}

export interface PortfolioProject {
  slug: string;
  name: string;
  oneLiner: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  category: string;
  parentSlug: string | null;
  tier: ProjectTier;
  href: string | null;
  screenshot: string | null;
  repo: string | null;
  stack: string | null;
  promotion: PromotionSize;
  links: ProjectLinks;
  dependencies: string[];
  notes: string | null;
  pausedReason: string | null;
  lastVerified: string | null;
  archived: boolean;
  archivedAt: string | null;
  sort: number;
  updatedAt: string;
}

export interface PortfolioTask {
  id: string;
  projectSlug: string;
  title: string;
  status: "open" | "done";
  sort: number;
  createdAt: string;
  completedAt: string | null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapProject(row: any): PortfolioProject {
  return {
    slug: row.slug,
    name: row.name,
    oneLiner: row.one_liner,
    status: row.status,
    priority: row.priority,
    category: row.category,
    parentSlug: row.parent_slug,
    tier: row.tier,
    href: row.href,
    screenshot: row.screenshot,
    repo: row.repo,
    stack: row.stack,
    promotion: row.promotion,
    links: row.links ?? {},
    dependencies: row.dependencies ?? [],
    notes: row.notes,
    pausedReason: row.paused_reason,
    lastVerified: row.last_verified,
    archived: row.archived,
    archivedAt: row.archived_at,
    sort: row.sort,
    updatedAt: row.updated_at,
  };
}

function mapTask(row: any): PortfolioTask {
  return {
    id: row.id,
    projectSlug: row.project_slug,
    title: row.title,
    status: row.status,
    sort: row.sort,
    createdAt: row.created_at,
    completedAt: row.completed_at,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/** All projects, archived included — callers filter. Ordered for lane views. */
export async function listProjects(): Promise<PortfolioProject[]> {
  const { data, error } = await getOpsSupabase()
    .from("portfolio_projects")
    .select("*")
    .order("category")
    .order("sort");
  if (error) throw new Error(`portfolio_projects list: ${error.message}`);
  return (data ?? []).map(mapProject);
}

export async function listTasks(): Promise<PortfolioTask[]> {
  const { data, error } = await getOpsSupabase()
    .from("portfolio_tasks")
    .select("*")
    .order("status")
    .order("sort")
    .order("created_at");
  if (error) throw new Error(`portfolio_tasks list: ${error.message}`);
  return (data ?? []).map(mapTask);
}

/** Whitelisted editable columns for PATCH — everything else is rejected. */
const PROJECT_PATCH_COLUMNS: Record<string, string> = {
  name: "name",
  oneLiner: "one_liner",
  status: "status",
  priority: "priority",
  category: "category",
  parentSlug: "parent_slug",
  tier: "tier",
  href: "href",
  repo: "repo",
  stack: "stack",
  promotion: "promotion",
  links: "links",
  dependencies: "dependencies",
  notes: "notes",
  pausedReason: "paused_reason",
  lastVerified: "last_verified",
  sort: "sort",
};

export async function updateProject(
  slug: string,
  patch: Record<string, unknown>,
): Promise<PortfolioProject> {
  const row: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const [key, value] of Object.entries(patch)) {
    const column = PROJECT_PATCH_COLUMNS[key];
    if (column) row[column] = value;
  }
  const { data, error } = await getOpsSupabase()
    .from("portfolio_projects")
    .update(row)
    .eq("slug", slug)
    .select()
    .single();
  if (error) throw new Error(`portfolio_projects update: ${error.message}`);
  return mapProject(data);
}

/** Soft delete: drops out of default views, stays behind the Archived filter. */
export async function setProjectArchived(
  slug: string,
  archived: boolean,
): Promise<PortfolioProject> {
  const { data, error } = await getOpsSupabase()
    .from("portfolio_projects")
    .update({
      archived,
      archived_at: archived ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug)
    .select()
    .single();
  if (error) throw new Error(`portfolio_projects archive: ${error.message}`);
  return mapProject(data);
}

/** Hard delete — genuine junk only; archive is the default "remove". */
export async function deleteProject(slug: string): Promise<void> {
  const { error } = await getOpsSupabase()
    .from("portfolio_projects")
    .delete()
    .eq("slug", slug);
  if (error) throw new Error(`portfolio_projects delete: ${error.message}`);
}

export async function createProject(input: {
  slug: string;
  name: string;
  oneLiner?: string;
  category?: string;
  priority?: ProjectPriority;
  status?: ProjectStatus;
}): Promise<PortfolioProject> {
  const { data, error } = await getOpsSupabase()
    .from("portfolio_projects")
    .insert({
      slug: input.slug,
      name: input.name,
      one_liner: input.oneLiner ?? "",
      category: input.category ?? "Uncategorized",
      priority: input.priority ?? "backlog",
      status: input.status ?? "concept",
    })
    .select()
    .single();
  if (error) throw new Error(`portfolio_projects insert: ${error.message}`);
  return mapProject(data);
}

export async function createTask(
  projectSlug: string,
  title: string,
): Promise<PortfolioTask> {
  const { data, error } = await getOpsSupabase()
    .from("portfolio_tasks")
    .insert({ project_slug: projectSlug, title })
    .select()
    .single();
  if (error) throw new Error(`portfolio_tasks insert: ${error.message}`);
  return mapTask(data);
}

export async function setTaskStatus(
  id: string,
  status: "open" | "done",
): Promise<PortfolioTask> {
  const { data, error } = await getOpsSupabase()
    .from("portfolio_tasks")
    .update({
      status,
      completed_at: status === "done" ? new Date().toISOString() : null,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(`portfolio_tasks update: ${error.message}`);
  return mapTask(data);
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await getOpsSupabase()
    .from("portfolio_tasks")
    .delete()
    .eq("id", id);
  if (error) throw new Error(`portfolio_tasks delete: ${error.message}`);
}
