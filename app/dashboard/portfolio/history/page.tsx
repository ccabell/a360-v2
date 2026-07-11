import { BookText, GitCommitHorizontal } from "lucide-react";

import { Card } from "@/components/ui/card";
import { listProjects } from "@/lib/portfolio/db";
import { recentCommits } from "@/lib/portfolio/github";
import { journalEntries } from "@/lib/portfolio/journal";

export const dynamic = "force-dynamic";

/**
 * History (plan §3c): two feeds derived from sources that already get
 * maintained — GitHub commits across every registry repo, and A360_Hub
 * JOURNAL decisions. Both degrade to a setup hint when GITHUB_TOKEN is unset.
 */
export default async function HistoryPage() {
  const projects = await listProjects();
  const repos = [
    ...new Set(
      projects.filter((p) => !p.archived).map((p) => p.links.github).filter(Boolean),
    ),
  ] as string[];

  const [commits, journal] = await Promise.all([
    recentCommits(repos, 14),
    journalEntries(12),
  ]);

  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">History</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          What happened — commits across every repo (14 days) and the latest
          decisions from the hub journal.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Commits */}
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <GitCommitHorizontal className="size-4 text-muted-foreground" />
            <h3 className="font-semibold">Commits</h3>
            {commits.available && (
              <span className="text-xs text-muted-foreground">
                {commits.commits.length} · {repos.length} repos
              </span>
            )}
          </div>
          {!commits.available ? (
            <SetupHint what="Commit feed" env="GITHUB_TOKEN" />
          ) : commits.commits.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No commits in the last 14 days.
            </p>
          ) : (
            <div className="max-h-[32rem] space-y-1 overflow-y-auto">
              {commits.commits.map((c) => (
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
              {commits.unreachable.length > 0 && (
                <p className="px-2 pt-2 text-xs text-muted-foreground">
                  No access: {commits.unreachable.join(", ")}
                </p>
              )}
            </div>
          )}
        </Card>

        {/* Decisions */}
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <BookText className="size-4 text-muted-foreground" />
            <h3 className="font-semibold">Decisions</h3>
          </div>
          {!journal.available ? (
            <SetupHint
              what="Journal feed"
              env="GITHUB_TOKEN"
              extra={`+ a private ${journal.repo} remote with JOURNAL.md`}
            />
          ) : journal.entries.length === 0 ? (
            <p className="text-sm text-muted-foreground">No entries found.</p>
          ) : (
            <div className="max-h-[32rem] space-y-4 overflow-y-auto">
              {journal.entries.map((e, i) => (
                <div key={i} className="border-l-2 border-border pl-3">
                  <p className="text-sm font-medium text-foreground">
                    {e.heading}
                  </p>
                  <ul className="mt-1 space-y-1">
                    {e.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="line-clamp-2 text-xs text-muted-foreground"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function SetupHint({
  what,
  env,
  extra,
}: {
  what: string;
  env: string;
  extra?: string;
}) {
  return (
    <p className="text-sm text-muted-foreground">
      {what} inactive — set a read-only{" "}
      <code className="rounded bg-muted px-1">{env}</code> {extra ? extra : ""}{" "}
      to activate.
    </p>
  );
}
