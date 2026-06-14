"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VersionStatusBadge, RuntimeBadge } from "@/components/agents/status-badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { ArrowUpCircle } from "lucide-react"
import type { Agent, AgentVersion, AgentRuntimeType } from "@/lib/types"

interface VersionsTabProps {
  agent: Agent
  versions: AgentVersion[]
  onUpdate: () => void
}

export function VersionsTab({ agent, versions, onUpdate }: VersionsTabProps) {
  const [promoteTarget, setPromoteTarget] = React.useState<AgentVersion | null>(null)
  const [promoting, setPromoting] = React.useState(false)

  async function handlePromote() {
    if (!promoteTarget) return
    setPromoting(true)
    try {
      const res = await fetch(`/api/agents/${agent.id}/versions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _action: "promote",
          versionId: promoteTarget.id,
          agentId: agent.id,
        }),
      })
      if (!res.ok) throw new Error("Promote failed")
      setPromoteTarget(null)
      onUpdate()
    } finally {
      setPromoting(false)
    }
  }

  if (versions.length === 0) {
    return (
      <div className="pt-4">
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No versions yet. Configure the agent in the Config tab and save a version.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="pt-4 space-y-3">
      {versions.map((v) => {
        const isActive = v.id === agent.active_version_id
        return (
          <Card key={v.id} className={isActive ? "border-green-500/30" : undefined}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-medium text-foreground">v{v.version}</span>
                  <VersionStatusBadge status={v.status} />
                  <RuntimeBadge runtime={(agent.type ?? "builtin") as AgentRuntimeType} />
                  {v.model && (
                    <span className="text-xs text-muted-foreground font-mono">{v.model}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {new Date(v.created_at).toLocaleDateString()}
                  </span>
                  {!isActive && v.status !== "archived" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPromoteTarget(v)}
                    >
                      <ArrowUpCircle className="h-3.5 w-3.5 mr-1" />
                      Promote
                    </Button>
                  )}
                  {isActive && (
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">ACTIVE</span>
                  )}
                </div>
              </div>

              {/* Version details */}
              <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Tools: </span>
                  <span>{v.knowledge_config?.tools?.length ?? 0} configured</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Temp: </span>
                  <span>{v.model_params?.temperature ?? "—"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Max tokens: </span>
                  <span>{v.model_params?.max_tokens ?? "—"}</span>
                </div>
              </div>


              {/* Prompt preview */}
              {v.prompt_text && (
                <details className="mt-3">
                  <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                    Show prompt ({v.prompt_text.length} chars)
                  </summary>
                  <pre className="mt-2 p-3 rounded-lg bg-muted/50 text-xs overflow-auto max-h-48 whitespace-pre-wrap">
                    {v.prompt_text}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        )
      })}

      {/* Promote confirmation dialog */}
      <Dialog open={!!promoteTarget} onOpenChange={(open) => !open && setPromoteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Promote Version</DialogTitle>
            <DialogDescription>
              Promote <strong>v{promoteTarget?.version}</strong> to active? This will set it as the
              active version for <strong>{agent.name}</strong>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPromoteTarget(null)}>
              Cancel
            </Button>
            <Button onClick={handlePromote} disabled={promoting}>
              {promoting ? "Promoting..." : "Promote to Active"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
