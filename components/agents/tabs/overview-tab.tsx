"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { AgentStatusBadge, VersionStatusBadge, RuntimeBadge } from "@/components/agents/status-badge"
import { Save } from "lucide-react"
import type { Agent, AgentVersion, AgentStatus, AgentCategory } from "@/lib/types"

const categories: AgentCategory[] = [
  "extraction", "coaching", "sales", "marketing", "intelligence",
  "clinical", "gl_population", "reach", "runtime", "evaluation",
]

interface OverviewTabProps {
  agent: Agent
  activeVersion?: AgentVersion
  onUpdate: () => void
}

export function OverviewTab({ agent, activeVersion, onUpdate }: OverviewTabProps) {
  const [editing, setEditing] = React.useState(false)
  const [name, setName] = React.useState(agent.name)
  const [description, setDescription] = React.useState(agent.description ?? "")
  const [category, setCategory] = React.useState<AgentCategory>(agent.category)
  const [status, setStatus] = React.useState<AgentStatus>(agent.status)
  const [saving, setSaving] = React.useState(false)

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch(`/api/agents/${agent.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || null,
          category,
          status,
        }),
      })
      if (!res.ok) throw new Error("Failed to update")
      setEditing(false)
      onUpdate()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-6 pt-4">
      {/* Agent metadata */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Agent Details</CardTitle>
          {!editing ? (
            <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => { setEditing(false); setName(agent.name); setDescription(agent.description ?? ""); setCategory(agent.category); setStatus(agent.status) }}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={saving}>
                <Save className="h-3.5 w-3.5 mr-1" />
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="Name">
            {editing ? (
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
              <span className="text-foreground">{agent.name}</span>
            )}
          </Field>
          <Field label="Key">
            <code className="text-sm font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
              {agent.agent_key}
            </code>
          </Field>
          <Field label="Description">
            {editing ? (
              <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Agent description..." />
            ) : (
              <span className="text-muted-foreground">{agent.description || "—"}</span>
            )}
          </Field>
          <Field label="Category">
            {editing ? (
              <Select value={category} onValueChange={(v) => setCategory(v as AgentCategory)}>
                <SelectTrigger size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}><span className="capitalize">{c.replace("_", " ")}</span></SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <span className="capitalize text-muted-foreground">{agent.category.replace("_", " ")}</span>
            )}
          </Field>
          <Field label="Status">
            {editing ? (
              <Select value={status} onValueChange={(v) => setStatus(v as AgentStatus)}>
                <SelectTrigger size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="deprecated">Deprecated</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <AgentStatusBadge status={agent.status} />
            )}
          </Field>
          <Field label="Created">
            <span className="text-sm text-muted-foreground">
              {new Date(agent.created_at).toLocaleString()}
            </span>
          </Field>
        </CardContent>
      </Card>

      {/* Active version summary */}
      <Card>
        <CardHeader>
          <CardTitle>Active Version</CardTitle>
        </CardHeader>
        <CardContent>
          {activeVersion ? (
            <div className="space-y-4">
              <Field label="Version">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-foreground">{activeVersion.version}</span>
                  <VersionStatusBadge status={activeVersion.status} />
                </div>
              </Field>
              <Field label="Runtime">
                <RuntimeBadge runtime={activeVersion.runtime_type} />
              </Field>
              <Field label="Model">
                <span className="text-muted-foreground">{activeVersion.model ?? "—"}</span>
              </Field>
              <Field label="Tools">
                <span className="text-muted-foreground">
                  {activeVersion.tool_config?.filter((t) => t.enabled).length ?? 0} enabled
                </span>
              </Field>
              <Field label="Promoted">
                <span className="text-sm text-muted-foreground">
                  {activeVersion.promoted_at
                    ? new Date(activeVersion.promoted_at).toLocaleString()
                    : "—"}
                </span>
              </Field>
              {activeVersion.notes && (
                <Field label="Notes">
                  <span className="text-sm text-muted-foreground">{activeVersion.notes}</span>
                </Field>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-4">
              No active version. Create a version in the Config tab and promote it.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-muted-foreground shrink-0 w-24">{label}</span>
      <div className="flex-1 text-right">{children}</div>
    </div>
  )
}
