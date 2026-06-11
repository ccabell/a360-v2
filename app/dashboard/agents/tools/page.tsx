"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DataTable, type ColumnDef } from "@/components/ui/data-table"
import { JSONViewer } from "@/components/ui/json-viewer"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { CodeEditor } from "@/components/ui/code-editor"
import { Plus, RefreshCw, Wrench } from "lucide-react"
import { useToast } from "@/components/ui/toast"
import type { ToolDef } from "@/lib/types"

const dataSourceColors: Record<string, string> = {
  gl_supabase: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  cms_supabase: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  prompt_runner: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  external: "bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-300",
}

const dataSources = ["gl_supabase", "cms_supabase", "prompt_runner", "external"] as const

const columns: ColumnDef<ToolDef & Record<string, unknown>>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    render: (row) => (
      <div>
        <div className="font-medium text-foreground">{row.name}</div>
        <div className="text-xs text-muted-foreground font-mono">{row.tool_key}</div>
      </div>
    ),
  },
  {
    key: "data_source",
    header: "Data Source",
    sortable: true,
    render: (row) => (
      <Badge className={dataSourceColors[row.data_source] ?? ""}>
        {row.data_source.replace(/_/g, " ")}
      </Badge>
    ),
  },
  {
    key: "tables_accessed",
    header: "Tables",
    render: (row) => (
      <div className="flex flex-wrap gap-1">
        {row.tables_accessed.map((t: string) => (
          <code key={t} className="text-xs bg-muted px-1 py-0.5 rounded font-mono">
            {t}
          </code>
        ))}
      </div>
    ),
  },
  {
    key: "description",
    header: "Description",
    render: (row) => (
      <span className="text-sm text-muted-foreground line-clamp-2">{row.description}</span>
    ),
  },
]

export default function ToolRegistryPage() {
  const [tools, setTools] = React.useState<ToolDef[]>([])
  const [loading, setLoading] = React.useState(true)
  const [filter, setFilter] = React.useState<string>("all")
  const [selectedTool, setSelectedTool] = React.useState<ToolDef | null>(null)
  const [createOpen, setCreateOpen] = React.useState(false)

  const fetchTools = React.useCallback(async () => {
    setLoading(true)
    try {
      const qs = filter !== "all" ? `?data_source=${filter}` : ""
      const res = await fetch(`/api/tools${qs}`)
      const data = await res.json()
      setTools(data)
    } catch {
      setTools([])
    } finally {
      setLoading(false)
    }
  }, [filter])

  React.useEffect(() => { fetchTools() }, [fetchTools])

  const filtered = tools as (ToolDef & Record<string, unknown>)[]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Wrench className="h-6 w-6 text-muted-foreground" />
          <div>
            <h2 className="text-2xl font-bold text-foreground">Tool Registry</h2>
            <p className="text-sm text-muted-foreground">{tools.length} tools registered</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchTools}>
            <RefreshCw className="h-4 w-4 mr-1.5" />
            Refresh
          </Button>
          <CreateToolDialog open={createOpen} onOpenChange={setCreateOpen} onCreated={fetchTools} />
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Data Source:</span>
        <Select value={filter} onValueChange={(v) => v && setFilter(v)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            {dataSources.map((ds) => (
              <SelectItem key={ds} value={ds}>
                {ds.replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-muted-foreground">Loading tools...</div>
      ) : (
        <DataTable
          data={filtered}
          columns={columns}
          onRowClick={(row) => setSelectedTool(row as unknown as ToolDef)}
          pageSize={25}
        />
      )}

      {/* Tool Detail Dialog */}
      <Dialog open={!!selectedTool} onOpenChange={(open) => !open && setSelectedTool(null)}>
        <DialogContent className="max-w-lg">
          {selectedTool && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedTool.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Tool Key</span>
                  <p className="font-mono text-sm">{selectedTool.tool_key}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Description</span>
                  <p className="text-sm">{selectedTool.description}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Data Source</span>
                  <div className="mt-1">
                    <Badge className={dataSourceColors[selectedTool.data_source] ?? ""}>
                      {selectedTool.data_source.replace(/_/g, " ")}
                    </Badge>
                  </div>
                </div>
                {selectedTool.tables_accessed.length > 0 && (
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Tables Accessed</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {selectedTool.tables_accessed.map((t) => (
                        <code key={t} className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">{t}</code>
                      ))}
                    </div>
                  </div>
                )}
                {selectedTool.implementation_url && (
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Implementation URL</span>
                    <p className="text-sm font-mono break-all">{selectedTool.implementation_url}</p>
                  </div>
                )}
                {selectedTool.parameters_schema && Object.keys(selectedTool.parameters_schema).length > 0 && (
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Parameter Schema</span>
                    <div className="mt-1">
                      <JSONViewer data={selectedTool.parameters_schema} defaultExpanded maxDepth={4} />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// --- Create Tool Dialog ---

function CreateToolDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: () => void
}) {
  const { toast } = useToast()
  const [name, setName] = React.useState("")
  const [toolKey, setToolKey] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [dataSource, setDataSource] = React.useState<string>("gl_supabase")
  const [tablesAccessed, setTablesAccessed] = React.useState("")
  const [implementationUrl, setImplementationUrl] = React.useState("")
  const [parametersSchema, setParametersSchema] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  // Auto-slug tool key from name
  React.useEffect(() => {
    if (!toolKey || toolKey === slugify(name.slice(0, -1))) {
      setToolKey(slugify(name))
    }
  }, [name])

  async function handleCreate() {
    if (!name.trim() || !toolKey.trim()) return
    setSaving(true)

    let parsedSchema = {}
    if (parametersSchema.trim()) {
      try {
        parsedSchema = JSON.parse(parametersSchema)
      } catch {
        toast("error", "Invalid JSON in parameter schema")
        setSaving(false)
        return
      }
    }

    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          tool_key: toolKey.trim(),
          description: description.trim(),
          data_source: dataSource,
          tables_accessed: tablesAccessed.split(",").map((s) => s.trim()).filter(Boolean),
          implementation_url: implementationUrl.trim() || null,
          parameters_schema: parsedSchema,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? "Failed to create tool")
      }

      toast("success", "Tool created")
      onOpenChange(false)
      resetForm()
      onCreated()
    } catch (err) {
      toast("error", err instanceof Error ? err.message : "Failed to create tool")
    } finally {
      setSaving(false)
    }
  }

  function resetForm() {
    setName("")
    setToolKey("")
    setDescription("")
    setDataSource("gl_supabase")
    setTablesAccessed("")
    setImplementationUrl("")
    setParametersSchema("")
  }

  return (
    <>
      <Button size="sm" onClick={() => onOpenChange(true)}>
        <Plus className="h-4 w-4 mr-1.5" />
        New Tool
      </Button>
      <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Tool</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Product Lookup" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Tool Key</label>
            <Input value={toolKey} onChange={(e) => setToolKey(e.target.value)} placeholder="product_lookup" className="font-mono" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Description</label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What does this tool do?" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Data Source</label>
            <Select value={dataSource} onValueChange={(v) => v && setDataSource(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dataSources.map((ds) => (
                  <SelectItem key={ds} value={ds}>{ds.replace(/_/g, " ")}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Tables Accessed (comma-separated)</label>
            <Input value={tablesAccessed} onChange={(e) => setTablesAccessed(e.target.value)} placeholder="gl_products, gl_fuel_documents" className="font-mono" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Implementation URL (optional)</label>
            <Input value={implementationUrl} onChange={(e) => setImplementationUrl(e.target.value)} placeholder="https://..." className="font-mono" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Parameter Schema (JSON, optional)</label>
            <CodeEditor
              value={parametersSchema}
              onChange={setParametersSchema}
              placeholder='{"type": "object", "properties": {}}'
              minLines={4}
            />
          </div>
          <Button onClick={handleCreate} disabled={saving || !name.trim()}>
            {saving ? "Creating..." : "Create Tool"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")
}
