"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, CheckCircle, XCircle, ArrowRight, ChevronDown, ChevronRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AgentOption {
  id: string;
  name: string;
  description: string | null;
  status: string;
  active_version_id: string | null;
}

interface PatientOption {
  id: string;
  name: string;
}

interface ToolEvent {
  type: string;
  toolName?: string;
  args?: unknown;
  result?: unknown;
  error?: string;
}

interface RunMeta {
  runId?: string;
  durationMs?: number;
  error?: string;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AgentTesterPage() {
  const [agents, setAgents] = useState<AgentOption[]>([]);
  const [patients, setPatients] = useState<PatientOption[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string>("");
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");
  const [userMessage, setUserMessage] = useState<string>("");
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string>("");
  const [toolEvents, setToolEvents] = useState<ToolEvent[]>([]);
  const [runMeta, setRunMeta] = useState<RunMeta | null>(null);
  const [expandedEvents, setExpandedEvents] = useState<Set<number>>(new Set());

  // ---- Data loading ----
  useEffect(() => {
    fetch("/api/agents?status=active")
      .then((r) => r.json())
      .then((data: AgentOption[]) => setAgents(Array.isArray(data) ? data : []))
      .catch(() => setAgents([]));

    fetch("/api/patients")
      .then((r) => r.json())
      .then((data) =>
        setPatients(
          Array.isArray(data) ? data : (data as { patients?: PatientOption[] }).patients ?? [],
        ),
      )
      .catch(() => setPatients([]));
  }, []);

  // ---- Filter agents for dropdown ----
  const runnableAgents = agents.filter((a) => a.active_version_id !== null);
  const nonRunnableAgents = agents.filter((a) => a.active_version_id === null);

  // ---- Run handler ----
  const handleRun = async () => {
    if (!selectedAgentId || !userMessage.trim() || running) return;
    setRunning(true);
    setOutput("");
    setToolEvents([]);
    setRunMeta(null);
    setExpandedEvents(new Set());

    try {
      const res = await fetch("/api/agent-runner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent_id: selectedAgentId,
          user_message: userMessage.trim(),
          patient_id: selectedPatientId || undefined,
        }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        let errMsg = `Request failed (${res.status})`;
        try {
          const parsed = JSON.parse(errBody);
          if (parsed.error) errMsg = parsed.error;
        } catch {
          if (errBody) errMsg = errBody;
        }
        setRunMeta({ error: errMsg });
        setRunning(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) {
        setRunMeta({ error: "No response stream" });
        setRunning(false);
        return;
      }

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const event = JSON.parse(line.slice(6));
            if (event.type === "token") {
              setOutput((prev) => prev + event.text);
            } else if (
              event.type === "tool_call" ||
              event.type === "tool_result" ||
              event.type === "tool_error"
            ) {
              setToolEvents((prev) => [...prev, event]);
            } else if (event.type === "done") {
              setRunMeta({ runId: event.runId, durationMs: event.durationMs });
            } else if (event.type === "error") {
              setRunMeta({ error: event.message });
            }
          } catch {
            // skip malformed SSE lines
          }
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Network error";
      setRunMeta({ error: message });
    } finally {
      setRunning(false);
    }
  };

  // ---- Toggle event detail ----
  const toggleEvent = (idx: number) => {
    setExpandedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Agent Tester</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Run agents against real data — select an agent, provide context, and
          observe execution.
        </p>
      </div>

      {/* Configuration Card */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>
            Select an agent, optionally choose a patient for context, and provide
            a message.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Agent selector */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="agent-select">
              Agent
            </label>
            <select
              id="agent-select"
              value={selectedAgentId}
              onChange={(e) => setSelectedAgentId(e.target.value)}
              className="w-full rounded-lg border border-border bg-transparent p-2.5 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
            >
              <option value="">Select an agent...</option>
              {runnableAgents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
              {nonRunnableAgents.map((a) => (
                <option key={a.id} value={a.id} disabled>
                  {a.name} (no active version)
                </option>
              ))}
            </select>
          </div>

          {/* Patient selector */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="patient-select">
              Patient Context <span className="text-muted-foreground">(optional)</span>
            </label>
            <select
              id="patient-select"
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full rounded-lg border border-border bg-transparent p-2.5 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
            >
              <option value="">No patient context</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* User message */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="user-message">
              Message
            </label>
            <textarea
              id="user-message"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-border bg-transparent p-3 text-sm text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
              placeholder="Enter a message for the agent..."
            />
          </div>

          {/* Run button */}
          <div className="flex justify-end">
            <Button
              onClick={handleRun}
              disabled={!selectedAgentId || !userMessage.trim() || running}
            >
              {running ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Running...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Run Agent
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading indicator */}
      {running && (
        <Card>
          <CardContent className="flex items-center gap-3 py-6">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="text-sm text-muted-foreground">
              Executing agent run — streaming results...
            </span>
          </CardContent>
        </Card>
      )}

      {/* Tool Activity Card */}
      {toolEvents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Tool Activity
              <Badge variant="secondary">{toolEvents.length} events</Badge>
            </CardTitle>
            <CardDescription>
              Tool calls made during agent execution.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {toolEvents.map((evt, idx) => {
              const isExpanded = expandedEvents.has(idx);
              const icon =
                evt.type === "tool_result" ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : evt.type === "tool_error" ? (
                  <XCircle className="h-4 w-4 text-red-500" />
                ) : (
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                );

              const detail =
                evt.type === "tool_call"
                  ? evt.args
                  : evt.type === "tool_result"
                    ? evt.result
                    : evt.error;

              return (
                <div key={idx} className="rounded-md border border-border p-2">
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 text-left text-sm"
                    onClick={() => toggleEvent(idx)}
                  >
                    {icon}
                    <code className="font-mono text-xs font-medium">
                      {evt.toolName ?? evt.type}
                    </code>
                    <span className="text-xs text-muted-foreground">
                      {evt.type}
                    </span>
                    <span className="ml-auto">
                      {isExpanded ? (
                        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </span>
                  </button>
                  {isExpanded && detail != null && (
                    <pre className="mt-2 max-h-60 overflow-auto rounded bg-muted p-2 text-xs whitespace-pre-wrap">
                      {typeof detail === "string"
                        ? detail
                        : JSON.stringify(detail, null, 2)}
                    </pre>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Output Card */}
      {(output.length > 0 || runMeta?.error) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Output
              {runMeta?.error && <Badge variant="destructive">Error</Badge>}
              {runMeta?.runId && !runMeta.error && (
                <Badge variant="secondary">completed</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {runMeta?.error && (
              <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
                {runMeta.error}
              </div>
            )}
            {output && (
              <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 text-sm leading-relaxed">
                {output}
              </pre>
            )}
            {runMeta?.runId && (
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>Run: {runMeta.runId}</span>
                {runMeta.durationMs != null && (
                  <span>Duration: {(runMeta.durationMs / 1000).toFixed(1)}s</span>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
