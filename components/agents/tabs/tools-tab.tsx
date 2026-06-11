"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Agent, AgentVersion, ToolDef, ToolBinding } from "@/lib/types"

interface ToolsTabProps {
  agent: Agent
  activeVersion?: AgentVersion
}

export function ToolsTab({ agent, activeVersion }: ToolsTabProps) {
  const [tools, setTools] = React.useState<ToolDef[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch("/api/tools")
      .then((r) => r.json())
      .then(setTools)
      .catch(() => setTools([]))
      .finally(() => setLoading(false))
  }, [])

  const bindings = activeVersion?.tool_config ?? []
  const enabledKeys = new Set(bindings.filter((b) => b.enabled).map((b) => b.tool_key))

  if (loading) {
    return <div className="pt-4 text-muted-foreground">Loading tools...</div>
  }

  const dataSourceColors: Record<string, string> = {
    agent_supabase: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    cms_supabase: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    prompt_runner: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    external: "bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-300",
  }

  return (
    <div className="pt-4 space-y-4">
      <p className="text-sm text-muted-foreground">
        {tools.length} tools available. {enabledKeys.size} enabled for the active version.
        {!activeVersion && " Save a version in the Config tab to configure tool bindings."}
      </p>

      <div className="grid gap-3">
        {tools.map((tool) => {
          const enabled = enabledKeys.has(tool.tool_key)
          return (
            <Card key={tool.id} className={enabled ? "border-primary/30" : "opacity-70"}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{tool.name}</span>
                      <Badge className={dataSourceColors[tool.data_source] ?? ""}>
                        {tool.data_source.replace("_", " ")}
                      </Badge>
                      {enabled && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          enabled
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                    {tool.tables_accessed.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="text-xs text-muted-foreground">Tables:</span>
                        {tool.tables_accessed.map((t) => (
                          <code key={t} className="text-xs bg-muted px-1 py-0.5 rounded font-mono">
                            {t}
                          </code>
                        ))}
                      </div>
                    )}
                  </div>
                  <code className="text-xs font-mono text-muted-foreground shrink-0 ml-4">
                    {tool.tool_key}
                  </code>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
