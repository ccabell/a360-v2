"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Bot, Clock, Zap, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OpsAgentOutput } from "@/lib/types";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const PAGE_SIZE = 25;

function tokenTotal(output: OpsAgentOutput): number | null {
  const usage = output.result?.token_usage as
    | { totalTokens?: number }
    | undefined;
  return usage?.totalTokens ?? null;
}

function outputSnippet(output: OpsAgentOutput): string | null {
  const text = output.result?.text;
  if (typeof text !== "string" || text.trim().length === 0) return null;
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > 140 ? `${clean.slice(0, 140)}…` : clean;
}

function statusColor(status: string | null): string {
  switch (status) {
    case "completed":
    case "success":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "error":
    case "failed":
      return "bg-red-500/10 text-red-600 dark:text-red-400";
    case "running":
    case "in_progress":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export default function AgentRunsPage() {
  const router = useRouter();
  const [outputs, setOutputs] = React.useState<OpsAgentOutput[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("");
  const [page, setPage] = React.useState(0);

  const fetchOutputs = React.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("limit", String(PAGE_SIZE));
      params.set("offset", String(page * PAGE_SIZE));
      if (statusFilter) params.set("status", statusFilter);
      const res = await fetch(`/api/agent-outputs?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setOutputs(json.data ?? []);
      setTotal(json.total ?? 0);
    } catch {
      setOutputs([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, page]);

  // Reset to first page when the status filter changes
  React.useEffect(() => {
    setPage(0);
  }, [statusFilter]);

  React.useEffect(() => {
    fetchOutputs();
  }, [fetchOutputs]);

  // Client-side search filter on agent_key
  const filtered = search.trim()
    ? outputs.filter((o) =>
        o.agent_key.toLowerCase().includes(search.toLowerCase()),
      )
    : outputs;

  // Unique agent keys for stats
  const uniqueAgents = new Set(outputs.map((o) => o.agent_key));
  const avgLatency =
    outputs.filter((o) => o.latency_ms).length > 0
      ? Math.round(
          outputs
            .filter((o) => o.latency_ms)
            .reduce((sum, o) => sum + (o.latency_ms ?? 0), 0) /
            outputs.filter((o) => o.latency_ms).length,
        )
      : null;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Agent Runs</h2>
          <p className="text-sm text-muted-foreground mt-1">
            All agent executions from the Ops database
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchOutputs}>
          <RefreshCw className="h-4 w-4 mr-1.5" />
          Refresh
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <SummaryCard
          label="Total Runs"
          value={total}
          icon={<Bot className="h-4 w-4" />}
        />
        <SummaryCard
          label="Unique Agents"
          value={uniqueAgents.size}
          icon={<Zap className="h-4 w-4" />}
        />
        <SummaryCard
          label="Avg Latency"
          value={avgLatency ? `${avgLatency}ms` : "—"}
          icon={<Clock className="h-4 w-4" />}
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by agent key..."
            className="pl-9 h-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v === "all" ? "" : (v ?? ""))}
        >
          <SelectTrigger className="h-9 w-[160px]">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Run list */}
      <div className="space-y-2">
        {loading ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            Loading agent runs...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center">
            <Bot className="mx-auto h-8 w-8 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">
              {search ? "No runs match your filter" : "No agent runs found"}
            </p>
          </div>
        ) : (
          filtered.map((output) => (
            <button
              key={output.id}
              type="button"
              onClick={() =>
                router.push(`/dashboard/agent-runs/${output.id}`)
              }
              className="w-full rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-foreground">
                      {output.agent_key}
                    </span>
                    {output.agent_version && (
                      <span className="text-xs font-mono text-muted-foreground">
                        v{output.agent_version}
                      </span>
                    )}
                    {output.model && (
                      <span className="text-xs font-mono text-muted-foreground rounded bg-muted px-1.5 py-0.5">
                        {output.model}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                    {output.patient_id && (
                      <span>Patient {output.patient_id.slice(0, 8)}</span>
                    )}
                    {output.consultation_id && (
                      <span>
                        Consult {output.consultation_id.slice(0, 8)}
                      </span>
                    )}
                    {output.confidence != null && (
                      <span>
                        Confidence: {Math.round(output.confidence * 100)}%
                      </span>
                    )}
                  </div>
                  {outputSnippet(output) && (
                    <p className="mt-1 text-xs text-muted-foreground truncate">
                      {outputSnippet(output)}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {tokenTotal(output) != null && (
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {tokenTotal(output)!.toLocaleString()} tok
                    </span>
                  )}
                  {output.latency_ms != null && (
                    <span className="text-xs tabular-nums text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {output.latency_ms}ms
                    </span>
                  )}
                  <Badge
                    variant="secondary"
                    className={`text-xs ${statusColor(output.status)}`}
                  >
                    {output.status ?? "unknown"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {timeAgo(output.created_at)}
                  </span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Pagination */}
      {!loading && total > PAGE_SIZE && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Showing {page * PAGE_SIZE + 1}–
            {Math.min((page + 1) * PAGE_SIZE, total)} of {total}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={(page + 1) * PAGE_SIZE >= total}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-3">
        <div className="rounded-lg bg-muted p-2 text-muted-foreground">
          {icon}
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-bold mt-0.5 text-foreground tabular-nums">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
