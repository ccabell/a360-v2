"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CodeEditor } from "@/components/ui/code-editor"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Save } from "lucide-react"
import type { Agent, AgentVersion, AgentRuntimeType, AgentConstraints } from "@/lib/types"

const models = [
  "claude-sonnet-4-20250514",
  "claude-opus-4-20250514",
  "claude-haiku-4-5-20251001",
  "gpt-4o",
  "gpt-4o-mini",
]

const runtimes: AgentRuntimeType[] = [
  "prompt_runner", "claude_tool_use", "openai_agents_sdk",
  "dify_workflow", "custom_fastapi", "bedrock",
]

interface ConfigTabProps {
  agent: Agent
  activeVersion?: AgentVersion
  onSaved: () => void
}

const defaultConstraints: AgentConstraints = {
  temperature: 0.3,
  max_tokens: 4096,
  max_tool_rounds: 5,
}

export function ConfigTab({ agent, activeVersion, onSaved }: ConfigTabProps) {
  const [systemPrompt, setSystemPrompt] = React.useState(activeVersion?.prompt_text ?? "")
  const [model, setModel] = React.useState(activeVersion?.model ?? models[0])
  const [runtime, setRuntime] = React.useState<AgentRuntimeType>(agent.type as AgentRuntimeType ?? "prompt_runner")
  const [constraints, setConstraints] = React.useState<AgentConstraints>(activeVersion?.model_params ?? defaultConstraints)
  const [outputSchema, setOutputSchema] = React.useState(
    activeVersion?.output_schema ? JSON.stringify(activeVersion.output_schema, null, 2) : ""
  )
  const [notes, setNotes] = React.useState("")
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // Compute next semver
  const nextVersion = React.useMemo(() => {
    if (!activeVersion) return "0.1.0"
    const parts = activeVersion.version.split(".").map(Number)
    parts[2] = (parts[2] ?? 0) + 1
    return parts.join(".")
  }, [activeVersion])

  async function handleSaveVersion() {
    setSaving(true)
    setError(null)

    let parsedSchema = null
    if (outputSchema.trim()) {
      try {
        parsedSchema = JSON.parse(outputSchema)
      } catch {
        setError("Output schema is not valid JSON")
        setSaving(false)
        return
      }
    }

    try {
      const res = await fetch(`/api/agents/${agent.id}/versions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent_id: agent.id,
          agent_key: agent.agent_key,
          version: nextVersion,
          status: "draft",
          prompt_text: systemPrompt || null,
          model,
          model_params: constraints,
          output_schema: parsedSchema,
          notes: notes.trim() || null,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? "Failed to save version")
      }

      setNotes("")
      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 pt-4">
      {/* System Prompt */}
      <Card>
        <CardHeader>
          <CardTitle>System Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeEditor
            value={systemPrompt}
            onChange={setSystemPrompt}
            placeholder="Enter the system prompt for this agent..."
            minLines={12}
          />
        </CardContent>
      </Card>

      {/* Model & Runtime */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Model & Runtime</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Model</label>
              <Select value={model} onValueChange={(v) => v && setModel(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {models.map((m) => (
                    <SelectItem key={m} value={m}>
                      <span className="font-mono text-xs">{m}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Runtime Type</label>
              <Select value={runtime} onValueChange={(v) => setRuntime(v as AgentRuntimeType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {runtimes.map((r) => (
                    <SelectItem key={r} value={r}>
                      <span className="capitalize">{r.replace(/_/g, " ")}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Constraints */}
        <Card>
          <CardHeader>
            <CardTitle>Constraints</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Temperature</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={constraints.temperature ?? 0.3}
                  onChange={(e) => setConstraints((c) => ({ ...c, temperature: parseFloat(e.target.value) }))}
                  className="flex-1"
                />
                <span className="text-sm font-mono w-8 text-right">{constraints.temperature ?? 0.3}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Max Tokens</label>
              <Input
                type="number"
                value={constraints.max_tokens ?? 4096}
                onChange={(e) => setConstraints((c) => ({ ...c, max_tokens: parseInt(e.target.value) || 4096 }))}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Max Tool Rounds</label>
              <Input
                type="number"
                value={constraints.max_tool_rounds ?? 5}
                onChange={(e) => setConstraints((c) => ({ ...c, max_tool_rounds: parseInt(e.target.value) || 5 }))}
              />
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Output Schema */}
      <Card>
        <CardHeader>
          <CardTitle>Output Schema (optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeEditor
            value={outputSchema}
            onChange={setOutputSchema}
            placeholder='{"type": "object", "properties": { ... }}'
            minLines={6}
          />
        </CardContent>
      </Card>

      {/* Save as Version */}
      <Card>
        <CardHeader>
          <CardTitle>Save as Version</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="space-y-1.5 flex-1">
              <label className="text-sm font-medium">Version Notes</label>
              <Input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What changed in this version?"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button onClick={handleSaveVersion} disabled={saving}>
            <Save className="h-4 w-4 mr-1.5" />
            {saving ? "Saving..." : `Save as v${nextVersion} (draft)`}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
