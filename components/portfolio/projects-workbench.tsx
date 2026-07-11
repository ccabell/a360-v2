"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, Link2, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PortfolioProject, PortfolioTask } from "@/lib/portfolio/db";
import type { DeployStatus } from "@/lib/portfolio/vercel-status";
import { AUDIENCES } from "@/lib/portfolio/audiences";
import { ProjectCard } from "@/components/portfolio/project-card";
import {
  CATEGORY_ORDER,
  PRIORITY_LABELS,
  PRIORITY_ORDER,
} from "@/components/portfolio/display";

type View = "lanes" | "categories";

export function ProjectsWorkbench({
  projects,
  tasks,
  deployStatuses,
}: {
  projects: PortfolioProject[];
  tasks: PortfolioTask[];
  deployStatuses: Record<string, DeployStatus>;
}) {
  const router = useRouter();
  const [view, setView] = React.useState<View>("lanes");
  const [manage, setManage] = React.useState(false);
  const [showArchived, setShowArchived] = React.useState(false);

  const onChanged = React.useCallback(() => router.refresh(), [router]);

  const tasksBySlug = React.useMemo(() => {
    const map: Record<string, PortfolioTask[]> = {};
    for (const t of tasks) (map[t.projectSlug] ??= []).push(t);
    return map;
  }, [tasks]);

  const allCategories = React.useMemo(
    () => [...new Set(projects.map((p) => p.category))],
    [projects],
  );

  const visible = React.useMemo(
    () => projects.filter((p) => (showArchived ? p.archived : !p.archived)),
    [projects, showArchived],
  );

  const cardFor = (p: PortfolioProject) => (
    <ProjectCard
      key={p.slug}
      project={p}
      tasks={tasksBySlug[p.slug] ?? []}
      deploy={firstDeploy(p, deployStatuses)}
      manage={manage}
      onChanged={onChanged}
      allCategories={allCategories}
    />
  );

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Projects</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Every project in the estate — priority, links to everything it
            touches, and one-click launch.
          </p>
        </div>
        <MintShareLink />
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <div className="inline-flex rounded-full border border-border p-0.5">
          {(["lanes", "categories"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium capitalize transition-colors",
                view === v
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {v === "lanes" ? "Priority lanes" : "Categories"}
            </button>
          ))}
        </div>

        <label className="flex cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-1 text-sm">
          <input
            type="checkbox"
            checked={manage}
            onChange={(e) => setManage(e.target.checked)}
            className="size-4"
          />
          Manage mode
        </label>

        <label className="flex cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-1 text-sm">
          <input
            type="checkbox"
            checked={showArchived}
            onChange={(e) => setShowArchived(e.target.checked)}
            className="size-4"
          />
          Archived
        </label>

        {manage && <AddProject onChanged={onChanged} />}

        <span className="ml-auto text-sm text-muted-foreground">
          {visible.length} {showArchived ? "archived" : "active"}
        </span>
      </div>

      {/* Body */}
      {view === "lanes" ? (
        <LaneView projects={visible} render={cardFor} />
      ) : (
        <CategoryView projects={visible} render={cardFor} />
      )}
    </div>
  );
}

function firstDeploy(
  p: PortfolioProject,
  statuses: Record<string, DeployStatus>,
): DeployStatus | undefined {
  for (const proj of p.links.vercel ?? []) if (statuses[proj]) return statuses[proj];
  return undefined;
}

function LaneView({
  projects,
  render,
}: {
  projects: PortfolioProject[];
  render: (p: PortfolioProject) => React.ReactNode;
}) {
  return (
    <div className="mt-6 space-y-8">
      {PRIORITY_ORDER.map((priority) => {
        const group = projects.filter((p) => p.priority === priority);
        if (group.length === 0) return null;
        return (
          <section key={priority}>
            <div className="mb-3 flex items-center gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                {PRIORITY_LABELS[priority]}
              </h3>
              <span className="text-xs text-muted-foreground">
                {group.length}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {group.map(render)}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function CategoryView({
  projects,
  render,
}: {
  projects: PortfolioProject[];
  render: (p: PortfolioProject) => React.ReactNode;
}) {
  const categories = [
    ...CATEGORY_ORDER.filter((c) => projects.some((p) => p.category === c)),
    ...[...new Set(projects.map((p) => p.category))].filter(
      (c) => !CATEGORY_ORDER.includes(c),
    ),
  ];
  return (
    <div className="mt-6 space-y-8">
      {categories.map((category) => {
        const group = projects.filter((p) => p.category === category);
        if (group.length === 0) return null;
        return (
          <section key={category}>
            <div className="mb-3 flex items-center gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                {category}
              </h3>
              <span className="text-xs text-muted-foreground">
                {group.length}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {group.map(render)}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function AddProject({ onChanged }: { onChanged: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [slug, setSlug] = React.useState("");
  const [name, setName] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function create() {
    setBusy(true);
    setError(null);
    const res = await fetch("/api/portfolio/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, name }),
    });
    setBusy(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error ?? "create failed");
      return;
    }
    setSlug("");
    setName("");
    setOpen(false);
    onChanged();
  }

  if (!open)
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={() => setOpen(true)}
        className="gap-1.5"
      >
        <Plus className="size-3.5" />
        Add project
      </Button>
    );

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-muted/40 p-2">
      <input
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="slug"
        className="w-32 rounded-md border border-border bg-background px-2 py-1 text-sm"
      />
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-40 rounded-md border border-border bg-background px-2 py-1 text-sm"
      />
      <Button size="sm" onClick={create} disabled={busy || !slug || !name}>
        Create
      </Button>
      <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}

const EXPIRY_OPTIONS = [
  { value: "7", label: "7 days" },
  { value: "30", label: "30 days" },
];

function MintShareLink() {
  const [audience, setAudience] = React.useState("buyer");
  const [days, setDays] = React.useState("7");
  const [url, setUrl] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  async function mint() {
    setLoading(true);
    setError(null);
    setUrl(null);
    setCopied(false);
    try {
      const res = await fetch("/api/portfolio/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audience, days: Number(days) }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? `Minting failed (${res.status})`);
        return;
      }
      setUrl(data.url);
    } catch {
      setError("Minting failed — is the server reachable?");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        <Select value={audience} onValueChange={(v) => v && setAudience(v)}>
          <SelectTrigger className="w-32" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AUDIENCES.map((a) => (
              <SelectItem key={a.id} value={a.id}>
                {a.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={days} onValueChange={(v) => v && setDays(v)}>
          <SelectTrigger className="w-28" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {EXPIRY_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button size="sm" onClick={mint} disabled={loading} className="gap-1.5">
          <Link2 className="size-3.5" />
          {loading ? "Minting…" : "Mint share link"}
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      {url && (
        <div className="flex max-w-xl items-center gap-2 rounded-lg border bg-card px-3 py-1.5">
          <span className="truncate font-mono text-xs text-muted-foreground">
            {url}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copy}
            className="shrink-0 gap-1"
          >
            {copied ? (
              <Check className="size-3.5 text-emerald-500" />
            ) : (
              <Copy className="size-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      )}
    </div>
  );
}
