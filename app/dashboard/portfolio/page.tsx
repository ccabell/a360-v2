import Link from "next/link";
import { ArrowUpRight, GitCommitHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { listProjects, listTasks } from "@/lib/portfolio/db";
import { recentCommits } from "@/lib/portfolio/github";
import { deployStatuses } from "@/lib/portfolio/vercel-status";
import { OpenTasksRollup } from "@/components/portfolio/open-tasks-rollup";
import {
  PRIORITY_STYLES,
  STATUS_STYLES,
} from "@/components/portfolio/display";
import type { DeployStatus } from "@/lib/portfolio/vercel-status";

export const dynamic = "force-dynamic";

/**
 * Command Center Home = light PM view (plan §3a-bis): this-week activity
 * digest, open-tasks rollup, and the Front lane with live-status badges.
 * Deliberately no sprints/estimates/assignees; Jira is out of scope.
 */
export default async function CommandHome() {
  const [projects, tasks] = await Promise.all([listProjects(), listTasks()]);
  const active = projects.filter((p) => !p.archived);
  const front = active.filter((p) => p.priority === "front");

  const repos = [
    ...new Set(active.map((p) => p.links.github).filter(Boolean)),
  ] as string[];
  const [commits, status] = await Promise.all([
    recentCommits(repos, 7),
    deployStatuses(active.flatMap((p) => p.links.vercel ?? [])),
  ]);

  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Command Center</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          What&apos;s up front, what&apos;s open, and what moved this week.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* This week */}
        <Card className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <GitCommitHorizontal className="size-4 text-muted-foreground" />
            <h3 className="font-semibold">This week</h3>
            {commits.available && (
              <span className="text-xs text-muted-foreground">
                {commits.commits.length} commits · {repos.length} repos
              </span>
            )}
          </div>
          {!commits.available ? (
            <p className="text-sm text-muted-foreground">
              Commit feed inactive — set a read-only{" "}
              <code className="rounded bg-muted px-1">GITHUB_TOKEN</code> to see
              activity across all repos.
            </p>
          ) : commits.commits.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No commits in the last 7 days.
            </p>
          ) : (
            <div className="max-h-80 space-y-2 overflow-y-auto">
              {commits.commits.slice(0, 40).map((c) => (
                <a
                  key={`${c.repo}-${c.sha}`}
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-baseline gap-3 rounded-md px-2 py-1 text-sm hover:bg-muted"
                >
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {c.date.slice(5, 10)}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{c.message}</span>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {c.repo.split("/")[1]}
                  </span>
                </a>
              ))}
            </div>
          )}
        </Card>

        {/* Open tasks */}
        <Card className="p-5">
          <h3 className="mb-4 font-semibold">Open tasks</h3>
          <OpenTasksRollup projects={projects} tasks={tasks} />
        </Card>
      </div>

      {/* Front lane */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Front lane
          </h3>
          <span className="text-xs text-muted-foreground">{front.length}</span>
          <Link
            href="/dashboard/portfolio/projects"
            className="ml-auto inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            All projects
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {front.map((p) => {
            const deploy = firstDeploy(p, status.statuses);
            return (
              <Card key={p.slug} className="flex flex-col gap-2 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    {deploy && (
                      <span
                        title={`${deploy.project}: ${deploy.state}`}
                        className={cn(
                          "size-2 shrink-0 rounded-full",
                          deploy.state === "READY"
                            ? "bg-emerald-500"
                            : deploy.state === "ERROR"
                              ? "bg-red-500"
                              : "bg-amber-500",
                        )}
                      />
                    )}
                    <span className="truncate font-semibold">{p.name}</span>
                  </div>
                  <Badge className={cn("capitalize", STATUS_STYLES[p.status])}>
                    {p.status}
                  </Badge>
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {p.oneLiner}
                </p>
                <div className="mt-auto flex items-center gap-2 pt-1">
                  <Badge className={cn("capitalize", PRIORITY_STYLES[p.priority])}>
                    {p.category}
                  </Badge>
                  {(p.links.live?.[0] ?? (p.tier === "native" ? p.href : null)) && (
                    <a
                      href={p.links.live?.[0] ?? p.href ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      Open
                      <ArrowUpRight className="size-3" />
                    </a>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function firstDeploy(
  p: { links: { vercel?: string[] } },
  statuses: Record<string, DeployStatus>,
): DeployStatus | undefined {
  for (const proj of p.links.vercel ?? []) if (statuses[proj]) return statuses[proj];
  return undefined;
}
