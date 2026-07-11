"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import type { PortfolioProject, PortfolioTask } from "@/lib/portfolio/db";

/** Open tasks across all projects, grouped by project, check-off inline (§3a-bis). */
export function OpenTasksRollup({
  projects,
  tasks,
}: {
  projects: PortfolioProject[];
  tasks: PortfolioTask[];
}) {
  const router = useRouter();
  const nameFor = React.useMemo(() => {
    const m: Record<string, string> = {};
    for (const p of projects) m[p.slug] = p.name;
    return m;
  }, [projects]);

  const grouped = React.useMemo(() => {
    const open = tasks.filter((t) => t.status === "open");
    const bySlug: Record<string, PortfolioTask[]> = {};
    for (const t of open) (bySlug[t.projectSlug] ??= []).push(t);
    return Object.entries(bySlug);
  }, [tasks]);

  async function complete(id: string) {
    await fetch(`/api/portfolio/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "done" }),
    });
    router.refresh();
  }

  if (grouped.length === 0)
    return (
      <p className="text-sm text-muted-foreground">No open tasks. 🎉</p>
    );

  return (
    <div className="space-y-4">
      {grouped.map(([slug, group]) => (
        <div key={slug}>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {nameFor[slug] ?? slug}
          </p>
          <div className="space-y-1">
            {group.map((t) => (
              <label
                key={t.id}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={false}
                  onChange={() => complete(t.id)}
                  className="size-4 rounded border-border"
                />
                <span className={cn("text-foreground")}>{t.title}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
