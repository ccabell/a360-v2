"use client"

import * as React from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ColumnDef<T> {
  key: string
  header: string | (() => React.ReactNode)
  sortable?: boolean
  className?: string
  render?: (row: T) => React.ReactNode
  accessorFn?: (row: T) => string | number | null | undefined
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  searchPlaceholder?: string
  searchKey?: string
  pageSize?: number
  onRowClick?: (row: T) => void
  emptyMessage?: string
  className?: string
  toolbar?: React.ReactNode
}

type SortDir = "asc" | "desc" | null

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchPlaceholder = "Search...",
  searchKey,
  pageSize = 25,
  onRowClick,
  emptyMessage = "No results.",
  className,
  toolbar,
}: DataTableProps<T>) {
  const [search, setSearch] = React.useState("")
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDir, setSortDir] = React.useState<SortDir>(null)
  const [page, setPage] = React.useState(0)

  // Filter
  const filtered = React.useMemo(() => {
    if (!search || !searchKey) return data
    const lower = search.toLowerCase()
    return data.filter((row) => {
      const val = row[searchKey]
      return typeof val === "string" && val.toLowerCase().includes(lower)
    })
  }, [data, search, searchKey])

  // Sort
  const sorted = React.useMemo(() => {
    if (!sortKey || !sortDir) return filtered
    const col = columns.find((c) => c.key === sortKey)
    return [...filtered].sort((a, b) => {
      const aVal = col?.accessorFn ? col.accessorFn(a) : (a[sortKey] as string | number | null)
      const bVal = col?.accessorFn ? col.accessorFn(b) : (b[sortKey] as string | number | null)
      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir, columns])

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize)

  // Reset page when filter changes
  React.useEffect(() => { setPage(0) }, [search])

  function toggleSort(key: string) {
    if (sortKey !== key) { setSortKey(key); setSortDir("asc") }
    else if (sortDir === "asc") setSortDir("desc")
    else { setSortKey(null); setSortDir(null) }
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Toolbar row */}
      <div className="flex items-center gap-3">
        {searchKey && (
          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8"
            />
          </div>
        )}
        {toolbar}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.map((col) => {
                const headerContent = typeof col.header === "function" ? col.header() : col.header
                return (
                  <TableHead key={col.key} className={col.className}>
                    {col.sortable ? (
                      <button
                        className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                        onClick={() => toggleSort(col.key)}
                      >
                        {headerContent}
                        {sortKey === col.key && sortDir === "asc" ? (
                          <ArrowUp className="h-3.5 w-3.5" />
                        ) : sortKey === col.key && sortDir === "desc" ? (
                          <ArrowDown className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                        )}
                      </button>
                    ) : (
                      headerContent
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paged.map((row, i) => (
                <TableRow
                  key={(row.id as string) ?? i}
                  className={onRowClick ? "cursor-pointer" : undefined}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      {col.render
                        ? col.render(row)
                        : (row[col.key] as React.ReactNode) ?? "—"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {sorted.length} result{sorted.length !== 1 ? "s" : ""}
            {search && ` (filtered from ${data.length})`}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              Previous
            </Button>
            <span>
              {page + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
