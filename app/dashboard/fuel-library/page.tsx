"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Plus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable, type ColumnDef } from "@/components/ui/data-table"
import { ReviewStatusBadge } from "@/components/fuel-docs/status-badge"
import { FuelTypeBadge } from "@/components/fuel-docs/fuel-type-badge"
import { FuelDocFilters } from "@/components/fuel-docs/fuel-doc-filters"
import { CreateFuelDocDialog } from "@/components/fuel-docs/create-fuel-doc-dialog"
import type { FuelDoc, FuelDocType, ReviewStatus } from "@/lib/types/fuel-docs"

const columns: ColumnDef<FuelDoc & Record<string, unknown>>[] = [
  {
    key: "product_name",
    header: "Name",
    sortable: true,
    render: (row) => (
      <div>
        <div className="font-medium text-foreground">{row.product_name}</div>
        <div className="text-xs text-muted-foreground font-mono">{(row.id as string).slice(0, 8)}</div>
      </div>
    ),
  },
  {
    key: "source_type",
    header: "Type",
    render: (row) => <FuelTypeBadge type={row.source_type as FuelDocType} />,
  },
  {
    key: "review_status",
    header: "Status",
    render: (row) => (
      <ReviewStatusBadge status={((row.review_status as string) ?? "draft") as ReviewStatus} />
    ),
  },
  {
    key: "template_version",
    header: "Version",
    render: (row) => (
      <span className="text-xs text-muted-foreground">
        {(row.template_version as string) || (row.metadata as Record<string, unknown> | null)?.template_version as string || "—"}
      </span>
    ),
  },
  {
    key: "updated_at",
    header: "Updated",
    sortable: true,
    render: (row) => (
      <span className="text-xs text-muted-foreground">
        {row.updated_at ? new Date(row.updated_at as string).toLocaleDateString() : "—"}
      </span>
    ),
  },
]

export default function FuelLibraryPage() {
  const router = useRouter()
  const [docs, setDocs] = React.useState<FuelDoc[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [typeFilter, setTypeFilter] = React.useState<FuelDocType | undefined>(undefined)
  const [statusFilter, setStatusFilter] = React.useState<ReviewStatus | undefined>(undefined)
  const [createOpen, setCreateOpen] = React.useState(false)

  const fetchDocs = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (typeFilter) params.set("type", typeFilter)
      if (statusFilter) params.set("status", statusFilter)
      const res = await fetch(`/api/fuel-docs?${params}`)
      if (!res.ok) throw new Error("Failed to fetch fuel docs")
      setDocs(await res.json())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }, [typeFilter, statusFilter])

  React.useEffect(() => { fetchDocs() }, [fetchDocs])

  const tableDocs = docs as (FuelDoc & Record<string, unknown>)[]

  const emptyState =
    !loading && !error && docs.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-base font-medium text-foreground">No fuel documents yet</p>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Create your first fuel doc to start building agent intelligence. Choose a type to get
          started.
        </p>
        <Button className="mt-4" onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Fuel Doc
        </Button>
      </div>
    ) : null

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Fuel Library</h1>
          <p className="text-sm text-muted-foreground">
            Manage agent intelligence documents for combinations, products, and concerns.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={fetchDocs}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Fuel Doc
          </Button>
        </div>
      </div>

      {/* Filters */}
      <FuelDocFilters
        type={typeFilter}
        status={statusFilter}
        onTypeChange={setTypeFilter}
        onStatusChange={setStatusFilter}
      />

      {/* Error */}
      {error ? <div className="text-sm text-destructive">{error}</div> : null}

      {/* Table or empty state */}
      {emptyState ?? (
        <DataTable
          columns={columns}
          data={tableDocs}
          searchKey="product_name"
          searchPlaceholder="Search fuel docs..."
          onRowClick={(row) => router.push(`/dashboard/fuel-library/${row.id}`)}
          emptyMessage={loading ? "Loading..." : "No fuel documents match the current filters."}
        />
      )}

      {/* Create dialog */}
      <CreateFuelDocDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={fetchDocs}
      />
    </div>
  )
}
