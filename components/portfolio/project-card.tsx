"use client";

import * as React from "react";
import Link from "next/link";
import {
  Archive,
  ArchiveRestore,
  ArrowUpRight,
  ArrowUp,
  Check,
  Copy,
  Database,
  Dot,
  ExternalLink,
  FileText,
  Code2,
  GitCommitHorizontal,
  Info,
  Terminal,
  Trash2,
  Triangle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  GitSnapshot,
  PortfolioProject,
  PortfolioTask,
} from "@/lib/portfolio/db";
import type { DeployStatus } from "@/lib/portfolio/vercel-status";
import {
  PRIORITY_LABELS,
  PRIORITY_ORDER,
  PRIORITY_STYLES,
  STATUS_OPTIONS,
  STATUS_STYLES,
} from "@/components/portfolio/display";
import { CATEGORY_ORDER } from "@/components/portfolio/display";

const DEPLOY_DOT: Record<DeployStatus["state"], string> = {
  READY: "bg-emerald-500",
  ERROR: "bg-red-500",
  BUILDING: "bg-amber-500 animate-pulse",
  QUEUED: "bg-amber-500",
  CANCELED: "bg-zinc-400",
  UNKNOWN: "bg-zinc-300",
};

function firstDeploy(
  p: PortfolioProject,
  statuses: Record<string, DeployStatus>,
): DeployStatus | undefined {
  for (const proj of p.links.vercel ?? []) {
    if (statuses[proj]) return statuses[proj];
  }
  return undefined;
}

export function ProjectCard({
  project: p,
  tasks,
  deploy,
  manage,
  onChanged,
  allCategories,
}: {
  project: PortfolioProject;
  tasks: PortfolioTask[];
  deploy?: DeployStatus;
  manage: boolean;
  onChanged: () => void;
  allCategories: string[];
}) {
  const openTasks = tasks.filter((t) => t.status === "open");
  const openHref =
    p.tier === "native" ? p.href : p.links.live?.[0] ?? p.href ?? undefined;
  const external = p.tier !== "native";

  return (
    <Card
      className={cn(
        "flex h-full flex-col gap-0 p-5",
        p.archived && "opacity-60",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {deploy && (
              <span
                title={`${deploy.project}: ${deploy.state}`}
                className={cn(
                  "size-2 shrink-0 rounded-full",
                  DEPLOY_DOT[deploy.state],
                )}
              />
            )}
            <h3 className="truncate font-heading text-[15px] font-semibold leading-tight">
              {p.name}
            </h3>
          </div>
          {p.repo && (
            <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
              {p.repo}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <Badge className={cn("capitalize", STATUS_STYLES[p.status])}>
            {p.status}
          </Badge>
          <Badge className={cn("capitalize", PRIORITY_STYLES[p.priority])}>
            {PRIORITY_LABELS[p.priority]}
          </Badge>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
        {p.oneLiner}
      </p>

      {/* Link chips */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {p.links.github && (
          <LinkChip
            href={`https://github.com/${p.links.github}`}
            icon={<Code2 className="size-3" />}
          >
            repo
          </LinkChip>
        )}
        {(p.links.live ?? []).map((url) => (
          <LinkChip
            key={url}
            href={url}
            icon={<ExternalLink className="size-3" />}
          >
            live
          </LinkChip>
        ))}
        {(p.links.supabase ?? []).map((ref) => (
          <LinkChip
            key={ref}
            href={`https://supabase.com/dashboard/project/${ref}`}
            icon={<Database className="size-3" />}
          >
            db
          </LinkChip>
        ))}
        {(p.links.vercel ?? []).length > 0 && (
          <Badge variant="ghost" className="gap-1">
            <Triangle className="size-3" />
            {p.links.vercel!.length} vercel
          </Badge>
        )}
        {openTasks.length > 0 && (
          <Badge variant="secondary">{openTasks.length} open</Badge>
        )}
      </div>

      {p.links.git && <GitMeta git={p.links.git} />}

      {p.pausedReason && (
        <p className="mt-2 rounded-md bg-orange-500/10 px-2 py-1 text-xs text-orange-700 dark:text-orange-400">
          {p.pausedReason}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-2 border-t pt-4 [&:not(:first-child)]:mt-4">
        {openHref &&
          (external ? (
            <a
              href={openHref}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
            >
              Open
              <ExternalLink className="size-3.5" />
            </a>
          ) : (
            <Link
              href={openHref}
              className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
            >
              Open
              <ArrowUpRight className="size-3.5" />
            </Link>
          ))}
        <ProjectDetails project={p} tasks={tasks} onChanged={onChanged} />
        {p.links.localPath && <LaunchButton localPath={p.links.localPath} />}
        {manage && (
          <ManageControls
            project={p}
            onChanged={onChanged}
            allCategories={allCategories}
          />
        )}
      </div>
    </Card>
  );
}

function LinkChip({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {icon}
      {children}
    </a>
  );
}

/** Copy `cd <path>; claude` to the clipboard — the honest "open in Claude Code". */
function LaunchButton({ localPath }: { localPath: string }) {
  const [copied, setCopied] = React.useState(false);
  async function copy() {
    await navigator.clipboard.writeText(`cd "${localPath}"; claude`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={copy}
      className="gap-1.5"
      title={`Copy: cd "${localPath}"; claude`}
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-500" />
      ) : (
        <Terminal className="size-3.5" />
      )}
      {copied ? "Copied" : "Claude Code"}
    </Button>
  );
}

function ProjectDetails({
  project: p,
  tasks,
  onChanged,
}: {
  project: PortfolioProject;
  tasks: PortfolioTask[];
  onChanged: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "gap-1.5",
        )}
      >
        <Info className="size-3.5" />
        Details
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] w-full max-w-lg overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{p.name}</DialogTitle>
          <DialogDescription>{p.oneLiner}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          <DetailRow label="Status">
            <Badge className={cn("capitalize", STATUS_STYLES[p.status])}>
              {p.status}
            </Badge>
          </DetailRow>
          <DetailRow label="Priority">
            {PRIORITY_LABELS[p.priority]}
          </DetailRow>
          <DetailRow label="Category">{p.category}</DetailRow>
          <DetailRow label="Tier">
            <span className="capitalize">{p.tier}</span>
          </DetailRow>
          {p.stack && <DetailRow label="Stack">{p.stack}</DetailRow>}
          <DetailRow label="AWS promotion">
            {p.promotion === "na" ? "—" : p.promotion}
          </DetailRow>

          {p.links.git && <GitDetail git={p.links.git} />}

          {/* Everything this project touches */}
          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Links
            </p>
            <div className="space-y-1.5">
              {p.links.github && (
                <LinkLine
                  icon={<Code2 className="size-3.5" />}
                  href={`https://github.com/${p.links.github}`}
                  label={p.links.github}
                />
              )}
              {(p.links.live ?? []).map((u) => (
                <LinkLine
                  key={u}
                  icon={<ExternalLink className="size-3.5" />}
                  href={u}
                  label={u}
                />
              ))}
              {(p.links.vercel ?? []).map((v) => (
                <LinkLine
                  key={v}
                  icon={<Triangle className="size-3.5" />}
                  href={`https://vercel.com/dashboard?search=${encodeURIComponent(v)}`}
                  label={`vercel: ${v}`}
                />
              ))}
              {(p.links.supabase ?? []).map((s) => (
                <LinkLine
                  key={s}
                  icon={<Database className="size-3.5" />}
                  href={`https://supabase.com/dashboard/project/${s}`}
                  label={`supabase: ${s}`}
                />
              ))}
              {(p.links.railway ?? []).map((r) => (
                <LinkLine
                  key={r}
                  icon={<Triangle className="size-3.5" />}
                  href="https://railway.app/dashboard"
                  label={`railway: ${r}`}
                />
              ))}
              {(p.links.docs ?? []).map((d) => (
                <LinkLine
                  key={d}
                  icon={<FileText className="size-3.5" />}
                  label={d}
                />
              ))}
              {p.links.localPath && (
                <LinkLine
                  icon={<Terminal className="size-3.5" />}
                  href={`vscode://file/${p.links.localPath.replace(/\\/g, "/")}`}
                  label={p.links.localPath}
                />
              )}
            </div>
          </div>

          {p.dependencies.length > 0 && (
            <DetailRow label="Depends on">
              <span className="flex flex-wrap gap-1">
                {p.dependencies.map((d) => (
                  <Badge key={d} variant="outline" className="font-mono text-xs">
                    {d}
                  </Badge>
                ))}
              </span>
            </DetailRow>
          )}

          <TaskEditor project={p} tasks={tasks} onChanged={onChanged} />

          {p.notes && (
            <div className="rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
              {p.notes}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LinkLine({
  icon,
  href,
  label,
}: {
  icon: React.ReactNode;
  href?: string;
  label: string;
}) {
  const inner = (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      {icon}
      <span className="truncate font-mono text-xs">{label}</span>
    </span>
  );
  if (!href)
    return <div className="text-muted-foreground">{inner}</div>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center text-primary hover:underline"
    >
      {inner}
    </a>
  );
}

function TaskEditor({
  project: p,
  tasks,
  onChanged,
}: {
  project: PortfolioProject;
  tasks: PortfolioTask[];
  onChanged: () => void;
}) {
  const [title, setTitle] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  async function addTask() {
    if (!title.trim()) return;
    setBusy(true);
    await fetch("/api/portfolio/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectSlug: p.slug, title }),
    });
    setTitle("");
    setBusy(false);
    onChanged();
  }

  async function toggle(id: string, done: boolean) {
    await fetch(`/api/portfolio/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: done ? "done" : "open" }),
    });
    onChanged();
  }

  return (
    <div className="rounded-lg border p-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Tasks
      </p>
      <div className="space-y-1">
        {tasks.length === 0 && (
          <p className="text-xs text-muted-foreground">No tasks yet.</p>
        )}
        {tasks.map((t) => (
          <label
            key={t.id}
            className="flex cursor-pointer items-center gap-2 text-sm"
          >
            <input
              type="checkbox"
              checked={t.status === "done"}
              onChange={(e) => toggle(t.id, e.target.checked)}
              className="size-4 rounded border-border"
            />
            <span
              className={cn(
                t.status === "done" && "text-muted-foreground line-through",
              )}
            >
              {t.title}
            </span>
          </label>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a task…"
          className="flex-1 rounded-md border border-border bg-background px-2 py-1 text-sm"
        />
        <Button size="sm" variant="outline" onClick={addTask} disabled={busy}>
          Add
        </Button>
      </div>
    </div>
  );
}

function ManageControls({
  project: p,
  onChanged,
  allCategories,
}: {
  project: PortfolioProject;
  onChanged: () => void;
  allCategories: string[];
}) {
  const [busy, setBusy] = React.useState(false);

  async function patch(body: Record<string, unknown>) {
    setBusy(true);
    await fetch(`/api/portfolio/projects/${p.slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setBusy(false);
    onChanged();
  }

  async function archive() {
    await patch({ archived: !p.archived });
  }

  async function hardDelete() {
    if (
      !confirm(
        `Permanently delete "${p.name}"? This can't be undone. Use Archive to just stop tracking it.`,
      )
    )
      return;
    setBusy(true);
    await fetch(`/api/portfolio/projects/${p.slug}?hard=1`, {
      method: "DELETE",
    });
    setBusy(false);
    onChanged();
  }

  return (
    <div className="flex w-full flex-wrap items-center gap-2 rounded-lg bg-muted/40 p-2">
      <Select
        value={p.priority}
        onValueChange={(v) => v && patch({ priority: v })}
      >
        <SelectTrigger size="sm" className="w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PRIORITY_ORDER.map((pr) => (
            <SelectItem key={pr} value={pr}>
              {PRIORITY_LABELS[pr]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={p.status}
        onValueChange={(v) => v && patch({ status: v })}
      >
        <SelectTrigger size="sm" className="w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((s) => (
            <SelectItem key={s} value={s} className="capitalize">
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={p.category}
        onValueChange={(v) => v && patch({ category: v })}
      >
        <SelectTrigger size="sm" className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {[...new Set([...CATEGORY_ORDER, ...allCategories])].map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="ghost"
        size="sm"
        onClick={archive}
        disabled={busy}
        className="gap-1.5"
        title={p.archived ? "Restore (untrack → track)" : "Archive (stop tracking)"}
      >
        {p.archived ? (
          <ArchiveRestore className="size-3.5" />
        ) : (
          <Archive className="size-3.5" />
        )}
        {p.archived ? "Restore" : "Archive"}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={hardDelete}
        disabled={busy}
        className="gap-1.5 text-destructive hover:text-destructive"
        title="Hard delete (junk only)"
      >
        <Trash2 className="size-3.5" />
      </Button>
    </div>
  );
}

/** "3d ago" / "2h ago" / "just now" from an ISO date; "" if missing/invalid. */
function relativeTime(iso: string | null): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const secs = Math.round((Date.now() - then) / 1000);
  if (secs < 60) return "just now";
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.round(months / 12)}y ago`;
}

/** Compact last-commit + working-state line for the card footer. */
function GitMeta({ git }: { git: GitSnapshot }) {
  const rel = relativeTime(git.lastCommitAt);
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1" title={git.lastCommitAt ?? ""}>
        <GitCommitHorizontal className="size-3.5" />
        {rel ? `committed ${rel}` : "no commits"}
      </span>
      {git.dirty && (
        <span
          className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/15 px-1.5 py-0.5 font-medium text-amber-700 dark:text-amber-400"
          title={`${git.dirtyCount} uncommitted file${git.dirtyCount === 1 ? "" : "s"} in the working tree`}
        >
          <Dot className="-mx-1 size-4" />
          {git.dirtyCount} uncommitted
        </span>
      )}
      {git.ahead > 0 && (
        <span
          className="inline-flex items-center gap-0.5 rounded-full bg-sky-500/15 px-1.5 py-0.5 font-medium text-sky-700 dark:text-sky-400"
          title={`${git.ahead} commit${git.ahead === 1 ? "" : "s"} not pushed`}
        >
          <ArrowUp className="size-3" />
          {git.ahead} unpushed
        </span>
      )}
    </div>
  );
}

/** Working-state block for the details dialog: branch, last commit, dirty/ahead. */
function GitDetail({ git }: { git: GitSnapshot }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-3">
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <GitCommitHorizontal className="size-3.5" />
        Working state
      </p>
      <div className="space-y-1.5 text-sm">
        <div className="flex items-baseline gap-3">
          <span className="w-24 shrink-0 text-xs text-muted-foreground">Branch</span>
          <span className="min-w-0 truncate font-mono text-xs">{git.branch ?? "—"}</span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="w-24 shrink-0 text-xs text-muted-foreground">Last commit</span>
          <span className="min-w-0">
            {git.lastCommitAt ? (
              <>
                {relativeTime(git.lastCommitAt)}
                <span className="text-muted-foreground">
                  {" "}
                  · {(git.lastCommitAt ?? "").slice(0, 10)}
                  {git.lastCommitSha ? ` · ${git.lastCommitSha}` : ""}
                </span>
                {git.lastCommitSubject && (
                  <span className="block truncate text-xs text-muted-foreground">
                    {git.lastCommitSubject}
                  </span>
                )}
              </>
            ) : (
              "—"
            )}
          </span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="w-24 shrink-0 text-xs text-muted-foreground">Uncommitted</span>
          <span className="min-w-0">
            {git.dirty ? (
              <span className="font-medium text-amber-700 dark:text-amber-400">
                {git.dirtyCount} file{git.dirtyCount === 1 ? "" : "s"} changed
              </span>
            ) : (
              <span className="text-emerald-700 dark:text-emerald-400">clean</span>
            )}
            {git.ahead > 0 && (
              <span className="text-sky-700 dark:text-sky-400">
                {" "}
                · {git.ahead} unpushed
              </span>
            )}
          </span>
        </div>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Synced {relativeTime(git.syncedAt)} · run{" "}
        <code className="font-mono">scripts/sync-portfolio-git.mjs</code> to refresh
      </p>
    </div>
  );
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="w-28 shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="min-w-0">{children}</span>
    </div>
  );
}
