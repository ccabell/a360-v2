"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Plus, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable, type ColumnDef } from "@/components/ui/data-table"
import { AgentStatusBadge, RuntimeBadge } from "@/components/agents/status-badge"
import { CreateAgentDialog } from "@/components/agents/create-agent-dialog"
import { AgentFilters } from "@/components/agents/agent-filters"
import type { Agent, AgentStatus, AgentCategory, AgentRuntimeType } from "@/lib/types"

interface AgentRunStats {
  agent_id: string
  agent_key: string
  active_version: string | null
  active_model: string | null
  run_count: number
  last_run_at: string | null
  success_rate: string | null
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

const columns: ColumnDef<Agent & Record<string, unknown>>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    render: (row) => (
      <div>
        <div className="font-medium text-foreground">{row.name}</div>
        <div className="text-xs text-muted-foreground font-mono">{row.agent_key}</div>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (row) => <AgentStatusBadge status={row.status} />,
  },
  {
    key: "category",
    header: "Category",
    sortable: true,
    render: (row) => (
      <span className="capitalize text-muted-foreground">{row.category}</span>
    ),
  },
  {
    key: "type",
    header: "Runtime",
    render: (row) => <RuntimeBadge runtime={row.type as AgentRuntimeType} />,
  },
  {
    key: "active_version_id",
    header: "Active Version",
    render: (row) =>
      row.active_version ? (
        <span className="text-xs font-mono text-foreground">
          v{row.active_version as string}
        </span>
      ) : row.active_version_id ? (
        <span className="text-xs font-mono text-muted-foreground">
          {(row.active_version_id as string).slice(0, 8)}...
        </span>
      ) : (
        <span className="text-xs text-muted-foreground/50">none</span>
      ),
  },
  {
    key: "run_count",
    header: "Runs",
    sortable: true,
    render: (row) => (
      <span className="text-xs tabular-nums text-muted-foreground">
        {(row.run_count as number | undefined) ?? 0}
      </span>
    ),
  },
  {
    key: "success_rate",
    header: "Success",
    sortable: true,
    render: (row) => {
      const rate = row.success_rate != null ? Number(row.success_rate) : null
      if (rate == null)
        return <span className="text-xs text-muted-foreground/50">—</span>
      const pct = Math.round(rate * 100)
      const color =
        pct >= 80
          ? "text-green-600 dark:text-green-400"
          : pct >= 50
            ? "text-yellow-600 dark:text-yellow-400"
            : "text-red-600 dark:text-red-400"
      return <span className={`text-xs tabular-nums ${color}`}>{pct}%</span>
    },
  },
  {
    key: "last_run_at",
    header: "Last Run",
    sortable: true,
    render: (row) =>
      row.last_run_at ? (
        <span className="text-xs text-muted-foreground">
          {timeAgo(row.last_run_at as string)}
        </span>
      ) : (
        <span className="text-xs text-muted-foreground/50">never</span>
      ),
  },
  {
    key: "updated_at",
    header: "Updated",
    sortable: true,
    render: (row) => (
      <span className="text-xs text-muted-foreground">
        {new Date(row.updated_at).toLocaleDateString()}
      </span>
    ),
  },
]

export default function AgentsPage() {
  const router = useRouter()
  const [agents, setAgents] = React.useState<Agent[]>([])
  const [stats, setStats] = React.useState<Map<string, AgentRunStats>>(new Map())
  const [loading, setLoading] = React.useState(true)
  const [createOpen, setCreateOpen] = React.useState(false)
  const [filters, setFilters] = React.useState<{
    status?: AgentStatus
    category?: AgentCategory
  }>({})

  const fetchAgents = React.useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.status) params.set("status", filters.status)
      if (filters.category) params.set("category", filters.category)
      const [agentsRes, statsRes] = await Promise.all([
        fetch(`/api/agents?${params}`),
        fetch("/api/agents/stats"),
      ])
      if (!agentsRes.ok) throw new Error("Failed to fetch agents")
      setAgents(await agentsRes.json())
      if (statsRes.ok) {
        const rows = (await statsRes.json()) as AgentRunStats[]
        setStats(new Map(rows.map((r) => [r.agent_id, r])))
      }
    } catch {
      setAgents([])
    } finally {
      setLoading(false)
    }
  }, [filters])

  React.useEffect(() => { fetchAgents() }, [fetchAgents])

  // Status summary counts
  const counts = React.useMemo(() => {
    const c = { total: agents.length, active: 0, draft: 0, deprecated: 0 }
    for (const a of agents) {
      if (a.status === "active") c.active++
      else if (a.status === "draft") c.draft++
      else if (a.status === "deprecated") c.deprecated++
    }
    return c
  }, [agents])

  const filteredAgents = React.useMemo(
    () =>
      agents.map((a) => {
        const s = stats.get(a.id)
        return {
          ...a,
          active_version: s?.active_version ?? null,
          run_count: s?.run_count ?? 0,
          last_run_at: s?.last_run_at ?? null,
          success_rate: s?.success_rate ?? null,
        }
      }) as (Agent & Record<string, unknown>)[],
    [agents, stats],
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Agent Manager</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Create, configure, and manage agent definitions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchAgents}>
            <RefreshCw className="h-4 w-4 mr-1.5" />
            Refresh
          </Button>
          <Button size="sm" onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4 mr-1.5" />
            New Agent
          </Button>
        </div>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-4 gap-4">
        <SummaryCard label="Total Agents" value={counts.total} />
        <SummaryCard label="Active" value={counts.active} color="text-green-600 dark:text-green-400" />
        <SummaryCard label="Draft" value={counts.draft} color="text-yellow-600 dark:text-yellow-400" />
        <SummaryCard label="Deprecated" value={counts.deprecated} color="text-red-600 dark:text-red-400" />
      </div>

      {/* Agents table */}
      <DataTable
        columns={columns}
        data={filteredAgents}
        searchKey="name"
        searchPlaceholder="Search agents..."
        onRowClick={(row) => router.push(`/dashboard/agents/${row.id}`)}
        emptyMessage={loading ? "Loading agents..." : "No agents found. Create your first agent to get started."}
        toolbar={
          <AgentFilters
            status={filters.status}
            category={filters.category}
            onStatusChange={(s) => setFilters((f) => ({ ...f, status: s }))}
            onCategoryChange={(c) => setFilters((f) => ({ ...f, category: c }))}
          />
        }
      />

      {/* Create dialog */}
      <CreateAgentDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={(agent) => {
          setCreateOpen(false)
          router.push(`/dashboard/agents/${agent.id}`)
        }}
      />
    </div>
  )
}

function SummaryCard({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`text-2xl font-bold mt-1 ${color ?? "text-foreground"}`}>{value}</p>
      </CardContent>
    </Card>
  )
}
