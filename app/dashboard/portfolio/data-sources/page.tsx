import { Database, ExternalLink, Server } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  DATA_SOURCES,
  liveCounts,
  type DataSource,
  type DataSourceState,
  type LiveCount,
} from "@/lib/portfolio/datasources";

export const dynamic = "force-dynamic";

const STATE_STYLES: Record<DataSourceState, string> = {
  active: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  hold: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  reserve: "bg-zinc-500/10 text-zinc-500",
  retired: "bg-zinc-500/15 text-zinc-500 line-through",
};

/**
 * Data Sources (plan §3b): typed registry of Supabase projects/corpora +
 * services with LIVE counts (corpus counts are always live). Retired/frozen
 * sources render greyed — the graveyard pattern prevents zombie re-use.
 */
export default async function DataSourcesPage() {
  const withCounts = await Promise.all(
    DATA_SOURCES.map(async (source) => ({
      source,
      counts: await liveCounts(source),
    })),
  );

  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Data Sources</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Every database and service the estate runs on — role, writer rules,
          and live row counts. Counts are fetched live, never cached in code.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {withCounts.map(({ source, counts }) => (
          <SourceCard key={source.id} source={source} counts={counts} />
        ))}
      </div>
    </div>
  );
}

function SourceCard({
  source: s,
  counts,
}: {
  source: DataSource;
  counts: LiveCount[];
}) {
  const retired = s.state === "retired";
  return (
    <Card className={cn("flex flex-col gap-3 p-5", retired && "opacity-60")}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          {s.kind === "supabase" ? (
            <Database className="size-4 shrink-0 text-muted-foreground" />
          ) : (
            <Server className="size-4 shrink-0 text-muted-foreground" />
          )}
          <div className="min-w-0">
            <h3 className="truncate font-semibold">{s.name}</h3>
            {s.ref && (
              <p className="truncate font-mono text-xs text-muted-foreground">
                {s.ref}
              </p>
            )}
          </div>
        </div>
        <Badge className={cn("capitalize", STATE_STYLES[s.state])}>
          {s.state}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground">{s.role}</p>

      <div className="text-xs">
        <span className="font-semibold text-foreground">Owner:</span>{" "}
        <span className="text-muted-foreground">{s.ownerApp}</span>
      </div>
      {s.writerRules && (
        <div className="rounded-md bg-muted/40 px-2 py-1.5 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Writer:</span>{" "}
          {s.writerRules}
        </div>
      )}

      {counts.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {counts.map((c) => (
            <div
              key={c.table}
              className="rounded-lg border border-border bg-card px-2.5 py-1"
            >
              <span className="font-mono text-sm font-semibold tabular-nums">
                {c.count === null ? "—" : c.count.toLocaleString()}
              </span>
              <span className="ml-1.5 text-xs text-muted-foreground">
                {c.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {s.notes && (
        <p className="text-xs text-muted-foreground">{s.notes}</p>
      )}

      <div className="mt-auto flex flex-wrap gap-3 pt-1 text-xs">
        {s.dashboardUrl && (
          <a
            href={s.dashboardUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <ExternalLink className="size-3" />
            Dashboard
          </a>
        )}
        {s.adminSurface && (
          <a
            href={s.adminSurface.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <ExternalLink className="size-3" />
            {s.adminSurface.label}
          </a>
        )}
      </div>
    </Card>
  );
}
