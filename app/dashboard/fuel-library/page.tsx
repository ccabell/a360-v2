"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Plus, RefreshCw, Upload, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable, type ColumnDef } from "@/components/ui/data-table"
import { ReviewStatusBadge } from "@/components/fuel-docs/status-badge"
import { FuelTypeBadge } from "@/components/fuel-docs/fuel-type-badge"
import { FuelDocFilters } from "@/components/fuel-docs/fuel-doc-filters"
import { CreateFuelDocDialog } from "@/components/fuel-docs/create-fuel-doc-dialog"
import type { FuelDoc, FuelDocType, ReviewStatus } from "@/lib/types/fuel-docs"
import { SEED_FUEL_DOCS } from "@/lib/fuel-docs/seed-data"

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
  const [importing, setImporting] = React.useState(false)
  const [importResult, setImportResult] = React.useState<string | null>(null)
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [bulkActing, setBulkActing] = React.useState(false)

  const fetchDocs = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (typeFilter) params.set("type", typeFilter)
      if (statusFilter) params.set("status", statusFilter)
      const res = await fetch(`/api/fuel-docs?${params}`)
      if (!res.ok) throw new Error("Failed to fetch fuel docs")
      const data = await res.json()
      setDocs(data.length > 0 ? data : SEED_FUEL_DOCS)
    } catch {
      let seeds = SEED_FUEL_DOCS
      if (typeFilter) seeds = seeds.filter((d) => d.fuel_type === typeFilter)
      if (statusFilter) seeds = seeds.filter((d) => d.review_status === statusFilter)
      setDocs(seeds)
    } finally {
      setLoading(false)
    }
  }, [typeFilter, statusFilter])

  React.useEffect(() => { fetchDocs() }, [fetchDocs])

  async function handleImportBatches() {
    setImporting(true)
    setImportResult(null)
    try {
      const res = await fetch("/api/fuel-docs/import-batches", { method: "POST" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Import failed")
      setImportResult(`Imported ${data.imported} docs (${data.already_existing} already existed)`)
      await fetchDocs()
    } catch (err) {
      setImportResult(err instanceof Error ? err.message : "Import failed")
    } finally {
      setImporting(false)
    }
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleSelectAll() {
    if (selectedIds.size === docs.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(docs.map((d) => d.id)))
    }
  }

  async function handleBulkStatus(status: ReviewStatus) {
    if (selectedIds.size === 0) return
    setBulkActing(true)
    try {
      const res = await fetch("/api/fuel-docs/bulk-status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selectedIds), status }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? "Bulk update failed")
      }
      setSelectedIds(new Set())
      await fetchDocs()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bulk update failed")
    } finally {
      setBulkActing(false)
    }
  }

  const tableDocs = docs as (FuelDoc & Record<string, unknown>)[]

  // Add selection column
  const columnsWithSelect: ColumnDef<FuelDoc & Record<string, unknown>>[] = [
    {
      key: "select" as keyof FuelDoc,
      header: () => (
        <input
          type="checkbox"
          checked={docs.length > 0 && selectedIds.size === docs.length}
          onChange={toggleSelectAll}
          className="rounded border-input"
        />
      ),
      render: (row) => (
        <input
          type="checkbox"
          checked={selectedIds.has(row.id as string)}
          onChange={(e) => {
            e.stopPropagation()
            toggleSelect(row.id as string)
          }}
          onClick={(e) => e.stopPropagation()}
          className="rounded border-input"
        />
      ),
    },
    ...columns,
  ]

  const emptyState =
    !loading && !error && docs.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-base font-medium text-foreground">No fuel documents yet</p>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Import combination fuel docs from the review queue, or create a new fuel doc manually.
        </p>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" onClick={handleImportBatches} disabled={importing}>
            <Upload className="h-4 w-4 mr-2" />
            {importing ? "Importing..." : "Import Batch Docs"}
          </Button>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Fuel Doc
          </Button>
        </div>
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
          <Button
            variant="outline"
            size="sm"
            onClick={handleImportBatches}
            disabled={importing}
          >
            <Upload className="h-4 w-4 mr-1.5" />
            {importing ? "Importing..." : "Import Batches"}
          </Button>
          <Button variant="outline" size="icon" onClick={fetchDocs}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Fuel Doc
          </Button>
        </div>
      </div>

      {/* Import result */}
      {importResult && (
        <div className="text-sm px-3 py-2 rounded bg-muted text-foreground">
          {importResult}
        </div>
      )}

      {/* Bulk actions bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-muted/60 border">
          <span className="text-sm font-medium">{selectedIds.size} selected</span>
          <div className="flex gap-2 ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkStatus("approved")}
              disabled={bulkActing}
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-600" />
              Approve Selected
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkStatus("draft")}
              disabled={bulkActing}
            >
              <XCircle className="h-3.5 w-3.5 mr-1.5 text-red-500" />
              Reject to Draft
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedIds(new Set())}
            >
              Clear
            </Button>
          </div>
        </div>
      )}

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
          columns={columnsWithSelect}
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
