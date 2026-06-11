"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { JSONViewer } from "@/components/ui/json-viewer"
import { InlineCitationBadge } from "@/components/citations/inline-citation-badge"
import { ReferenceCard } from "@/components/citations/reference-card"
import { Play, Loader2, Clock, Hash, AlertCircle } from "lucide-react"
import type { Agent, AgentVersion } from "@/lib/types"
import type { Citation } from "@/components/citations/types"
import type { PRTranscript } from "@/lib/types/prompt-runner"

interface TestTabProps {
  agent: Agent
  activeVersion?: AgentVersion
}

type InputMode = "paste" | "transcript"

interface RunResult {
  output: Record<string, unknown>
  citations?: Citation[]
  duration_ms?: number
  token_count?: number
  error?: string
}

export function TestTab({ agent, activeVersion }: TestTabProps) {
  const [inputMode, setInputMode] = React.useState<InputMode>("paste")
  const [inputText, setInputText] = React.useState("")
  const [transcripts, setTranscripts] = React.useState<PRTranscript[]>([])
  const [selectedTranscriptId, setSelectedTranscriptId] = React.useState<string>("")
  const [transcriptsLoading, setTranscriptsLoading] = React.useState(false)

  const [running, setRunning] = React.useState(false)
  const [result, setResult] = React.useState<RunResult | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const runtimeType = activeVersion?.runtime_type ?? "prompt_runner"
  const isPromptRunner = runtimeType === "prompt_runner"

  // Fetch transcripts when switching to transcript mode
  React.useEffect(() => {
    if (inputMode === "transcript" && transcripts.length === 0) {
      setTranscriptsLoading(true)
      fetch("/api/transcripts?limit=100")
        .then((r) => r.json())
        .then((res) => setTranscripts(res.data ?? []))
        .catch(() => setTranscripts([]))
        .finally(() => setTranscriptsLoading(false))
    }
  }, [inputMode])

  async function handleRun() {
    if (!isPromptRunner) return

    setRunning(true)
    setResult(null)
    setError(null)

    try {
      const body: Record<string, string> = {
        agent_key: agent.agent_key,
      }

      if (inputMode === "transcript" && selectedTranscriptId) {
        body.transcript_id = selectedTranscriptId
      } else if (inputMode === "paste" && inputText.trim()) {
        body.input_text = inputText.trim()
      } else {
        setError("Please provide input text or select a transcript.")
        setRunning(false)
        return
      }

      const res = await fetch("/api/playground", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? `Request failed with status ${res.status}`)
        return
      }

      // Normalize response — PR returns varying shapes
      const citations = normalizeCitations(data.citations ?? data.references ?? [])
      setResult({
        output: data.output ?? data.result ?? data,
        citations: citations.length > 0 ? citations : undefined,
        duration_ms: data.duration_ms,
        token_count: data.token_count ?? data.usage?.total_tokens,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="pt-4 space-y-6">
      {/* Runtime check */}
      {!isPromptRunner && (
        <Card className="border-yellow-500/30 bg-yellow-50/50 dark:bg-yellow-950/20">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-foreground">Runtime not configured</p>
              <p className="text-sm text-muted-foreground">
                Test playground currently supports <code className="text-xs bg-muted px-1 rounded">prompt_runner</code> runtime.
                This agent uses <code className="text-xs bg-muted px-1 rounded">{runtimeType}</code>.
                Runtime adapter support is planned (Phase 10).
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Input Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Input</CardTitle>
            <div className="flex gap-1">
              <Button
                variant={inputMode === "paste" ? "default" : "outline"}
                size="sm"
                onClick={() => setInputMode("paste")}
              >
                Paste Text
              </Button>
              <Button
                variant={inputMode === "transcript" ? "default" : "outline"}
                size="sm"
                onClick={() => setInputMode("transcript")}
              >
                Select Transcript
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {inputMode === "paste" ? (
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste transcript text or other input here..."
              className="w-full min-h-[200px] rounded-lg border border-border bg-background p-3 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-ring"
            />
          ) : (
            <div className="space-y-3">
              {transcriptsLoading ? (
                <p className="text-sm text-muted-foreground">Loading transcripts...</p>
              ) : (
                <Select value={selectedTranscriptId} onValueChange={(v) => v && setSelectedTranscriptId(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a transcript..." />
                  </SelectTrigger>
                  <SelectContent>
                    {transcripts.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        <span className="flex items-center gap-2">
                          <span className="font-mono text-xs">#{t.consult_number}</span>
                          <span>{t.clinic}</span>
                          <span className="text-muted-foreground text-xs">
                            {t.transcript_date} &middot; {t.duration_minutes}min
                          </span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {selectedTranscriptId && (
                <p className="text-xs text-muted-foreground">
                  Transcript ID: <code className="font-mono">{selectedTranscriptId}</code>
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Run Button */}
      <div className="flex items-center gap-4">
        <Button onClick={handleRun} disabled={running || !isPromptRunner} size="lg">
          {running ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Run Agent
            </>
          )}
        </Button>
        {activeVersion && (
          <p className="text-sm text-muted-foreground">
            Running with version <code className="font-mono text-xs">{activeVersion.version}</code>
            {" "}on <code className="font-mono text-xs">{activeVersion.model}</code>
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <Card className="border-destructive/30">
          <CardContent className="p-4">
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Stats bar */}
          <div className="flex items-center gap-4">
            {result.duration_ms != null && (
              <Badge variant="outline" className="gap-1.5">
                <Clock className="h-3 w-3" />
                {result.duration_ms >= 1000
                  ? `${(result.duration_ms / 1000).toFixed(1)}s`
                  : `${result.duration_ms}ms`
                }
              </Badge>
            )}
            {result.token_count != null && (
              <Badge variant="outline" className="gap-1.5">
                <Hash className="h-3 w-3" />
                {result.token_count.toLocaleString()} tokens
              </Badge>
            )}
            {result.citations && (
              <Badge variant="outline" className="gap-1.5">
                {result.citations.length} citation{result.citations.length !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>

          {/* Output */}
          <Card>
            <CardHeader>
              <CardTitle>Output</CardTitle>
            </CardHeader>
            <CardContent>
              <JSONViewer data={result.output} defaultExpanded maxDepth={5} />
            </CardContent>
          </Card>

          {/* Citations */}
          {result.citations && result.citations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Citations ({result.citations.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.citations.map((c, i) => (
                  <ReferenceCard key={c.id} citation={c} number={i + 1} />
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * Normalize PR citation responses into the Citation shape used by our components.
 */
function normalizeCitations(raw: unknown[]): Citation[] {
  return raw.map((item: any, i: number) => ({
    id: item.id ?? `cit-${i}`,
    number: i + 1,
    sourceType: mapSourceType(item.source_type ?? item.sourceType ?? "agent_output"),
    sourceId: item.source_id ?? item.sourceId ?? "",
    title: item.title ?? "Untitled",
    evidence: item.snippet ?? item.evidence ?? item.text ?? "",
    confidence: item.confidence ?? undefined,
    metadata: {
      ...(item.metadata ?? {}),
      ...(item.url && { pdfUrl: item.url }),
      ...(item.pmid && { pmid: item.pmid }),
      ...(item.video_id && { videoId: item.video_id }),
    },
  }))
}

function mapSourceType(type: string): Citation["sourceType"] {
  const map: Record<string, Citation["sourceType"]> = {
    pubmed: "pubmed",
    youtube: "youtube",
    supabase: "supabase",
    gl_product: "supabase",
    gl_fuel_document: "supabase",
    pdf: "pdf",
    fda_label: "pdf",
    transcript: "transcript",
    agent_output: "agent_output",
    internal_doc: "agent_output",
  }
  return map[type] ?? "agent_output"
}
