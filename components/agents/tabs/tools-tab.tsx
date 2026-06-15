"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { JSONViewer } from "@/components/ui/json-viewer"
import { ChevronDown, ChevronRight } from "lucide-react"
import type { Agent, ToolDef, ToolBinding } from "@/lib/types"

interface ToolsTabProps {
  agent: Agent
  toolConfig: ToolBinding[]
  onToolConfigChange: (config: ToolBinding[]) => void
}

export function ToolsTab({ agent, toolConfig, onToolConfigChange }: ToolsTabProps) {
  const [tools, setTools] = React.useState<ToolDef[]>([])
  const [loading, setLoading] = React.useState(true)
  const [expandedTool, setExpandedTool] = React.useState<string | null>(null)

  React.useEffect(() => {
    fetch("/api/tools")
      .then((r) => r.json())
      .then((data) => setTools(Array.isArray(data) ? data : []))
      .catch(() => setTools([]))
      .finally(() => setLoading(false))
  }, [])

  const enabledKeys = new Set(toolConfig.filter((b) => b.enabled).map((b) => b.tool_key))

  function toggleTool(toolKey: string) {
    const existing = toolConfig.find((b) => b.tool_key === toolKey)
    if (existing) {
      onToolConfigChange(
        toolConfig.map((b) =>
          b.tool_key === toolKey ? { ...b, enabled: !b.enabled } : b
        )
      )
    } else {
      onToolConfigChange([...toolConfig, { tool_key: toolKey, enabled: true }])
    }
  }

  function enableAll() {
    const allKeys = new Set(tools.map((t) => t.tool_key))
    const updated = toolConfig.map((b) =>
      allKeys.has(b.tool_key) ? { ...b, enabled: true } : b
    )
    // Add any tools not yet in config
    for (const tool of tools) {
      if (!updated.find((b) => b.tool_key === tool.tool_key)) {
        updated.push({ tool_key: tool.tool_key, enabled: true })
      }
    }
    onToolConfigChange(updated)
  }

  function disableAll() {
    onToolConfigChange(toolConfig.map((b) => ({ ...b, enabled: false })))
  }

  if (loading) {
    return <div className="pt-4 text-muted-foreground">Loading tools...</div>
  }

  const dataSourceColors: Record<string, string> = {
    gl_supabase: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    cms_supabase: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    prompt_runner: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    external: "bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-300",
  }

  return (
    <div className="pt-4 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {tools.length} tools available. {enabledKeys.size} enabled.
          <span className="text-xs ml-2">(Changes apply when you save a new version in Config tab)</span>
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={enableAll}>Enable All</Button>
          <Button variant="outline" size="sm" onClick={disableAll}>Disable All</Button>
        </div>
      </div>

      <div className="grid gap-3">
        {tools.map((tool) => {
          const enabled = enabledKeys.has(tool.tool_key)
          const isExpanded = expandedTool === tool.tool_key

          return (
            <Card key={tool.id} className={enabled ? "border-primary/30" : "opacity-70"}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => setExpandedTool(isExpanded ? null : tool.tool_key)}
                  >
                    <div className="flex items-center gap-2">
                      {isExpanded
                        ? <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                        : <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                      }
                      <span className="font-medium text-foreground">{tool.name}</span>
                      <Badge className={dataSourceColors[tool.data_source] ?? ""}>
                        {tool.data_source.replace(/_/g, " ")}
                      </Badge>
                      {enabled && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          enabled
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 ml-6">{tool.description}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <code className="text-xs font-mono text-muted-foreground">
                      {tool.tool_key}
                    </code>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={enabled}
                      onClick={() => toggleTool(tool.tool_key)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                        enabled ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <span
                        className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                          enabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Expanded detail panel */}
                {isExpanded && (
                  <div className="mt-4 ml-6 space-y-3 border-t pt-3">
                    {tool.tables_accessed.length > 0 && (
                      <div>
                        <span className="text-xs font-medium text-muted-foreground">Tables Accessed</span>
                        <div className="flex items-center gap-1.5 mt-1">
                          {tool.tables_accessed.map((t) => (
                            <code key={t} className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                              {t}
                            </code>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="text-xs font-medium text-muted-foreground">Data Source</span>
                      <p className="text-sm mt-0.5">{tool.data_source.replace(/_/g, " ")}</p>
                    </div>

                    {tool.implementation_url && (
                      <div>
                        <span className="text-xs font-medium text-muted-foreground">Implementation URL</span>
                        <p className="text-sm font-mono mt-0.5">{tool.implementation_url}</p>
                      </div>
                    )}

                    {tool.parameters_schema && Object.keys(tool.parameters_schema).length > 0 && (
                      <div>
                        <span className="text-xs font-medium text-muted-foreground">Parameter Schema</span>
                        <div className="mt-1">
                          <JSONViewer data={tool.parameters_schema} defaultExpanded={false} maxDepth={3} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
