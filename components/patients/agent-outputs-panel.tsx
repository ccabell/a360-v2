"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  AlertCircle,
  Bot,
  Sparkles,
  Clock,
} from "lucide-react";
import { formatDate } from "@/lib/format";

interface AgentOutput {
  id: string;
  agent_key: string;
  agent_version: string | null;
  status: string | null;
  result: Record<string, unknown> | null;
  evidence_used: Record<string, unknown> | null;
  confidence: number | null;
  latency_ms: number | null;
  created_at: string;
  is_demo_canonical: boolean;
}

const AGENT_LABELS: Record<string, { label: string; icon: string }> = {
  orchestrator_post_consultation: { label: "Post-Consultation Orchestrator", icon: "workflow" },
  clinical_enrichment: { label: "Clinical Enrichment", icon: "clinical" },
  package_recommender: { label: "Package Recommender", icon: "package" },
  consultation_summarizer: { label: "Consultation Summarizer", icon: "summary" },
};

function agentLabel(key: string): string {
  return AGENT_LABELS[key]?.label ?? key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function statusColor(status: string | null): string {
  const s = (status ?? "").toLowerCase();
  if (/(complete|success|done)/.test(s))
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
  if (/(fail|error)/.test(s)) return "bg-destructive/10 text-destructive";
  return "bg-muted text-muted-foreground";
}

function AgentOutputCard({ output }: { output: AgentOutput }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-border p-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 text-left"
      >
        <Bot className="h-4 w-4 shrink-0 text-primary" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm text-foreground">
              {agentLabel(output.agent_key)}
            </span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor(output.status)}`}>
              {output.status ?? "unknown"}
            </span>
            {output.is_demo_canonical && (
              <Badge variant="secondary" className="text-[10px]">canonical</Badge>
            )}
          </div>
          <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
            <span>{formatDate(output.created_at)}</span>
            {output.latency_ms != null && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {(output.latency_ms / 1000).toFixed(1)}s
              </span>
            )}
            {output.confidence != null && (
              <span>conf {(output.confidence * 100).toFixed(0)}%</span>
            )}
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && output.result && (
        <div className="mt-3 space-y-3">
          {/* Render result as structured sections if possible */}
          <ResultRenderer result={output.result} />

          {/* Evidence used */}
          {output.evidence_used && Object.keys(output.evidence_used).length > 0 && (
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Evidence used
              </p>
              <pre className="max-h-40 overflow-auto rounded-md bg-muted/40 p-2 text-xs text-foreground">
                {JSON.stringify(output.evidence_used, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ResultRenderer({ result }: { result: Record<string, unknown> }) {
  // Try to render structured results nicely
  const entries = Object.entries(result);

  // If it looks like a simple key-value object, render as a definition list
  const isFlat = entries.every(
    ([, v]) => typeof v === "string" || typeof v === "number" || typeof v === "boolean" || v === null,
  );

  if (isFlat && entries.length > 0 && entries.length <= 20) {
    return (
      <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {entries.map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs font-medium text-muted-foreground">
              {k.replace(/_/g, " ")}
            </dt>
            <dd className="text-sm text-foreground">{String(v ?? "—")}</dd>
          </div>
        ))}
      </dl>
    );
  }

  // For complex/nested results, try rendering known patterns
  // Check for "summary" or "output" string fields
  const summaryKey = entries.find(
    ([k, v]) => typeof v === "string" && /summary|output|recommendation|analysis/i.test(k),
  );
  if (summaryKey) {
    return (
      <div className="space-y-2">
        <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
          {String(summaryKey[1])}
        </p>
        {entries.length > 1 && (
          <details className="text-xs">
            <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
              Full output ({entries.length} fields)
            </summary>
            <pre className="mt-1 max-h-48 overflow-auto rounded-md bg-muted/40 p-2 text-foreground">
              {JSON.stringify(result, null, 2)}
            </pre>
          </details>
        )}
      </div>
    );
  }

  // Fallback: raw JSON
  return (
    <pre className="max-h-48 overflow-auto rounded-md bg-muted/40 p-2 text-xs text-foreground">
      {JSON.stringify(result, null, 2)}
    </pre>
  );
}

export function AgentOutputsPanel({ patientId }: { patientId: string }) {
  const [outputs, setOutputs] = useState<AgentOutput[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await fetch(`/api/patients/${patientId}/agent-outputs`);
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok || json.error) throw new Error(json.error || `HTTP ${res.status}`);
        setOutputs(json);
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Failed to load agent outputs");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [patientId]);

  // Filter out empty/failed runs (result.text is empty string = SDK failed silently)
  const valid = outputs.filter((o) => {
    if (!o.result) return false;
    const text = typeof o.result === "object" && "text" in o.result
      ? String((o.result as { text: string }).text)
      : JSON.stringify(o.result);
    return text.length > 10; // skip empty or trivially short results
  });

  // Group by agent_key
  const grouped = valid.reduce<Record<string, AgentOutput[]>>((acc, o) => {
    (acc[o.agent_key] ||= []).push(o);
    return acc;
  }, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4" />
          Agent Outputs
          {!loading && valid.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {valid.length}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Pre-computed intelligence from the agent execution layer
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading && (
          <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            Loading agent outputs…
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
        {!loading && !error && valid.length === 0 && (
          <p className="py-3 text-sm text-muted-foreground">
            No agent outputs for this patient yet.
          </p>
        )}
        {!loading && !error && Object.entries(grouped).map(([key, group]) => (
          <div key={key} className="space-y-2">
            <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {agentLabel(key)} ({group.length})
            </h4>
            {group.map((o) => (
              <AgentOutputCard key={o.id} output={o} />
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
