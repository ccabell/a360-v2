"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AgentStatusBadge } from "@/components/agents/status-badge"
import { OverviewTab } from "@/components/agents/tabs/overview-tab"
import { ConfigTab } from "@/components/agents/tabs/config-tab"
import { VersionsTab } from "@/components/agents/tabs/versions-tab"
import { ToolsTab } from "@/components/agents/tabs/tools-tab"
import { TestTab } from "@/components/agents/tabs/test-tab"
import type { Agent, AgentVersion, ToolBinding } from "@/lib/types"

export default function AgentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [agent, setAgent] = React.useState<Agent | null>(null)
  const [versions, setVersions] = React.useState<AgentVersion[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  // Lifted tool_config state — shared between Tools tab (editing) and Config tab (saving)
  const [toolConfig, setToolConfig] = React.useState<ToolBinding[]>([])
  const toolConfigInitialized = React.useRef(false)

  const fetchAgent = React.useCallback(async () => {
    try {
      const res = await fetch(`/api/agents/${id}`)
      if (!res.ok) throw new Error("Agent not found")
      const data = await res.json()
      const { versions: v, ...agentData } = data
      setAgent(agentData)
      setVersions(v ?? [])

      // Initialize tool_config from active version on first load
      if (!toolConfigInitialized.current) {
        const active = (v ?? []).find((ver: AgentVersion) => ver.id === agentData.active_version_id)
        setToolConfig(
          (active?.knowledge_config?.tools ?? []).map((t: string) => ({ tool_key: t, enabled: true }))
        )
        toolConfigInitialized.current = true
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load agent")
    } finally {
      setLoading(false)
    }
  }, [id])

  React.useEffect(() => { fetchAgent() }, [fetchAgent])

  if (loading) {
    return (
      <div className="p-6 text-muted-foreground">Loading agent...</div>
    )
  }

  if (error || !agent) {
    return (
      <div className="p-6">
        <p className="text-destructive">{error ?? "Agent not found"}</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/dashboard/agents")}>
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Agents
        </Button>
      </div>
    )
  }

  const activeVersion = versions.find((v) => v.id === agent.active_version_id)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/agents")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-foreground">{agent.name}</h2>
              <AgentStatusBadge status={agent.status} />
            </div>
            <p className="text-sm text-muted-foreground mt-1 font-mono">{agent.agent_key}</p>
            {agent.description && (
              <p className="text-sm text-muted-foreground mt-2">{agent.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList variant="line">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="test">Test</TabsTrigger>
          <TabsTrigger value="versions">
            Versions
            {versions.length > 0 && (
              <span className="ml-1.5 text-xs text-muted-foreground">({versions.length})</span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab agent={agent} activeVersion={activeVersion} onUpdate={fetchAgent} />
        </TabsContent>

        <TabsContent value="config">
          <ConfigTab agent={agent} activeVersion={activeVersion} onSaved={fetchAgent} />
        </TabsContent>

        <TabsContent value="tools">
          <ToolsTab agent={agent} toolConfig={toolConfig} onToolConfigChange={setToolConfig} />
        </TabsContent>

        <TabsContent value="test">
          <TestTab agent={agent} activeVersion={activeVersion} />
        </TabsContent>

        <TabsContent value="versions">
          <VersionsTab agent={agent} versions={versions} onUpdate={fetchAgent} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
