"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Bot, Clock, Shield, Zap, Hash, Calendar } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { JSONViewer } from "@/components/ui/json-viewer";
import type { OpsAgentOutput } from "@/lib/types";

function statusColor(status: string | null): string {
  switch (status) {
    case "completed":
    case "success":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "error":
    case "failed":
      return "bg-red-500/10 text-red-600 dark:text-red-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

// USD per million tokens (input, output) — matched by substring of model ID
const MODEL_PRICING: Array<{ match: string; input: number; output: number }> = [
  { match: "haiku", input: 1, output: 5 },
  { match: "sonnet", input: 3, output: 15 },
  { match: "opus", input: 5, output: 25 },
];

function estimateCost(
  model: string | null,
  usage: { inputTokens?: number; outputTokens?: number } | undefined,
): string | null {
  if (!model || !usage) return null;
  const pricing = MODEL_PRICING.find((p) => model.includes(p.match));
  if (!pricing || usage.inputTokens == null || usage.outputTokens == null)
    return null;
  const usd =
    (usage.inputTokens / 1_000_000) * pricing.input +
    (usage.outputTokens / 1_000_000) * pricing.output;
  return usd < 0.01 ? `<$0.01` : `$${usd.toFixed(2)}`;
}

export default function AgentRunDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [output, setOutput] = React.useState<OpsAgentOutput | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/agent-outputs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.json();
      })
      .then((data) => setOutput(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading run details...</p>
      </div>
    );
  }

  if (error || !output) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-muted-foreground">
          {error ? `Failed to load: ${error}` : "Run not found"}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => router.push("/dashboard/agent-runs")}
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to runs
        </Button>
      </div>
    );
  }

  const tokenUsage = output.result?.token_usage as
    | { inputTokens?: number; outputTokens?: number; totalTokens?: number }
    | undefined;
  const cost = estimateCost(output.model, tokenUsage);

  const meta = [
    { label: "Agent Key", value: output.agent_key, icon: Bot },
    { label: "Version", value: output.agent_version ?? "—", icon: Hash },
    { label: "Model", value: output.model ?? "—", icon: Bot },
    {
      label: "Tokens (in / out)",
      value:
        tokenUsage?.inputTokens != null
          ? `${tokenUsage.inputTokens.toLocaleString()} / ${(tokenUsage.outputTokens ?? 0).toLocaleString()}`
          : "—",
      icon: Zap,
    },
    { label: "Est. Cost", value: cost ?? "—", icon: Zap },
    { label: "Status", value: output.status ?? "unknown", icon: Zap },
    {
      label: "Latency",
      value: output.latency_ms != null ? `${output.latency_ms}ms` : "—",
      icon: Clock,
    },
    {
      label: "Confidence",
      value:
        output.confidence != null
          ? `${Math.round(output.confidence * 100)}%`
          : "—",
      icon: Shield,
    },
    {
      label: "Created",
      value: new Date(output.created_at).toLocaleString(),
      icon: Calendar,
    },
  ];

  const completedTools = (output.result?.completed_tools as string[]) ?? [];
  const failedTools = (output.result?.failed_tools as string[]) ?? [];
  const configuredTools = (output.lineage?.tools as string[]) ?? [];
  const hasTools =
    completedTools.length > 0 ||
    failedTools.length > 0 ||
    configuredTools.length > 0;

  const hasResult = output.result && Object.keys(output.result).length > 0;
  const hasInput =
    output.input_envelope && Object.keys(output.input_envelope).length > 0;
  const hasEvidence =
    output.evidence_used && Object.keys(output.evidence_used).length > 0;
  const hasGuardrails =
    output.guardrail_results &&
    Object.keys(output.guardrail_results).length > 0;

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/dashboard/agent-runs")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-foreground">
              {output.agent_key}
            </h2>
            <Badge
              variant="secondary"
              className={`text-xs ${statusColor(output.status)}`}
            >
              {output.status ?? "unknown"}
            </Badge>
            {output.is_demo_canonical && (
              <Badge variant="outline" className="text-xs">
                Demo canonical
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            {output.id}
          </p>
        </div>
      </div>

      {/* Meta cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {meta.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-3">
              <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                <m.icon className="h-3 w-3" />
                <span className="text-[11px]">{m.label}</span>
              </div>
              <p className="text-sm font-medium text-foreground truncate">
                {m.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Context links */}
      {(output.patient_id || output.consultation_id) && (
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {output.patient_id && (
            <button
              type="button"
              onClick={() =>
                router.push(`/dashboard/patients/${output.patient_id}`)
              }
              className="hover:text-foreground transition-colors underline"
            >
              Patient {output.patient_id.slice(0, 8)}...
            </button>
          )}
          {output.consultation_id && (
            <span>Consultation {output.consultation_id.slice(0, 8)}...</span>
          )}
        </div>
      )}

      {/* Tabbed content */}
      <Tabs defaultValue="result">
        <TabsList>
          {hasResult && <TabsTrigger value="result">Result</TabsTrigger>}
          {hasTools && <TabsTrigger value="tools">Tools</TabsTrigger>}
          {hasInput && <TabsTrigger value="input">Input</TabsTrigger>}
          {hasEvidence && (
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
          )}
          {hasGuardrails && (
            <TabsTrigger value="guardrails">Guardrails</TabsTrigger>
          )}
          <TabsTrigger value="raw">Raw JSON</TabsTrigger>
        </TabsList>

        {hasResult && (
          <TabsContent value="result">
            <Card>
              <CardHeader>
                <CardTitle>Agent Result</CardTitle>
                <CardDescription>
                  Structured output from the agent execution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <JSONViewer data={output.result} defaultExpanded maxDepth={6} />
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {hasTools && (
          <TabsContent value="tools">
            <Card>
              <CardHeader>
                <CardTitle>Tool Activity</CardTitle>
                <CardDescription>
                  Tools invoked during this run, in execution order
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {(completedTools.length > 0 || failedTools.length > 0) && (
                  <ol className="space-y-2">
                    {completedTools.map((tool, i) => (
                      <li
                        key={`ok-${i}-${tool}`}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-medium text-emerald-600 dark:text-emerald-400 tabular-nums">
                          {i + 1}
                        </span>
                        <span className="font-mono text-foreground">{tool}</span>
                        <Badge
                          variant="secondary"
                          className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        >
                          ok
                        </Badge>
                      </li>
                    ))}
                    {failedTools.map((entry, i) => (
                      <li
                        key={`fail-${i}-${entry}`}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-medium text-red-600 dark:text-red-400">
                          ✕
                        </span>
                        <span className="font-mono text-red-600 dark:text-red-400 truncate">
                          {entry}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
                {configuredTools.length > 0 && (
                  <div className="border-t border-border pt-3">
                    <p className="text-xs text-muted-foreground mb-1.5">
                      Configured tools
                      {output.lineage?.tools_overridden === true &&
                        " (overridden for this run)"}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {configuredTools.map((tool) => (
                        <Badge
                          key={tool}
                          variant="outline"
                          className="text-[10px] font-mono"
                        >
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {hasInput && (
          <TabsContent value="input">
            <Card>
              <CardHeader>
                <CardTitle>Input Envelope</CardTitle>
                <CardDescription>
                  Data sent to the agent at execution time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <JSONViewer
                  data={output.input_envelope}
                  defaultExpanded
                  maxDepth={4}
                />
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {hasEvidence && (
          <TabsContent value="evidence">
            <Card>
              <CardHeader>
                <CardTitle>Evidence Used</CardTitle>
                <CardDescription>
                  Knowledge sources referenced during execution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <JSONViewer
                  data={output.evidence_used}
                  defaultExpanded
                  maxDepth={4}
                />
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {hasGuardrails && (
          <TabsContent value="guardrails">
            <Card>
              <CardHeader>
                <CardTitle>Guardrail Results</CardTitle>
                <CardDescription>
                  Safety and compliance check outcomes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <JSONViewer
                  data={output.guardrail_results}
                  defaultExpanded
                  maxDepth={4}
                />
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="raw">
          <Card>
            <CardHeader>
              <CardTitle>Full Record</CardTitle>
              <CardDescription>
                Complete agent_outputs row as stored
              </CardDescription>
            </CardHeader>
            <CardContent>
              <JSONViewer data={output} defaultExpanded={false} maxDepth={6} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
