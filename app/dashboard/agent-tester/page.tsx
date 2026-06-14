"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Zap,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  ChevronDown,
  ChevronRight,
  Clock,
  Bot,
  Send,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AgentOption {
  id: string;
  name: string;
  description: string | null;
  status: string;
  model: string | null;
  active_version_id: string | null;
}

interface PatientOption {
  id: string;
  name: string;
}

interface ToolEvent {
  type: string;
  toolName?: string;
  input?: unknown;
  result?: unknown;
  error?: string;
  stage?: string;
  model?: string;
  timestamp: number;
}

interface RunMeta {
  runId?: string;
  durationMs?: number;
  error?: string;
  model?: string;
}

// ---------------------------------------------------------------------------
// Activity Timeline Item
// ---------------------------------------------------------------------------

function TimelineItem({
  event,
  isExpanded,
  onToggle,
  startTime,
}: {
  event: ToolEvent;
  isExpanded: boolean;
  onToggle: () => void;
  startTime: number;
}) {
  const elapsed = ((event.timestamp - startTime) / 1000).toFixed(1);

  // Status events
  if (event.type === "status") {
    return (
      <div className="flex items-start gap-2 py-1.5 px-2">
        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
          <Bot className="h-3 w-3 text-blue-500" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-xs text-muted-foreground">
            {event.stage === "run_created"
              ? "Run created"
              : event.stage === "streaming"
                ? `Streaming · ${event.model}`
                : String(event.stage)}
          </span>
        </div>
        <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground/60">
          {elapsed}s
        </span>
      </div>
    );
  }

  // Tool events
  const isCall = event.type === "tool_call";
  const isResult = event.type === "tool_result";
  const isError = event.type === "tool_error";

  const icon = isResult ? (
    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
  ) : isError ? (
    <XCircle className="h-3.5 w-3.5 text-red-500" />
  ) : (
    <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" />
  );

  // Extract a one-line summary from the result
  const summary = (() => {
    if (isCall) {
      const input = event.input as Record<string, unknown> | undefined;
      if (!input) return "Calling...";
      const vals = Object.values(input).filter(
        (v) => typeof v === "string",
      );
      return vals.length > 0
        ? vals.join(", ").slice(0, 60)
        : "Calling...";
    }
    if (isError) return event.error?.slice(0, 80) ?? "Error";
    if (isResult) {
      const r = event.result as Record<string, unknown> | undefined;
      if (!r) return "Done";
      if (r.success === false) return String(r.error ?? "Failed").slice(0, 80);
      if (r.message) return String(r.message).slice(0, 80);
      if (Array.isArray(r.results)) {
        return r.results.length === 0
          ? "No results"
          : `${r.results.length} result${r.results.length === 1 ? "" : "s"}`;
      }
      if (r.patient) {
        const p = r.patient as Record<string, string>;
        return `${p.first_name} ${p.last_name}`;
      }
      return "Done";
    }
    return "";
  })();

  const detail = isCall ? event.input : isResult ? event.result : event.error;

  const resultHasWarning =
    isResult &&
    event.result &&
    typeof event.result === "object" &&
    "success" in (event.result as Record<string, unknown>) &&
    (event.result as { success: boolean }).success === false;

  return (
    <div className="group">
      <button
        type="button"
        className="flex w-full items-start gap-2 rounded-md py-1.5 px-2 text-left hover:bg-muted/50 transition-colors"
        onClick={onToggle}
      >
        <div className="mt-0.5 shrink-0">
          {resultHasWarning ? (
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
          ) : (
            icon
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <code className="text-xs font-semibold text-foreground">
              {event.toolName}
            </code>
            <span className="text-[10px] text-muted-foreground">
              {isCall ? "call" : isResult ? "result" : "error"}
            </span>
          </div>
          <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground truncate">
            {summary}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <span className="text-[10px] tabular-nums text-muted-foreground/60">
            {elapsed}s
          </span>
          {isExpanded ? (
            <ChevronDown className="h-3 w-3 text-muted-foreground/40" />
          ) : (
            <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
          )}
        </div>
      </button>
      {isExpanded && detail != null && (
        <div className="ml-7 mr-2 mb-1">
          <pre className="max-h-48 overflow-auto rounded-md bg-muted/80 p-2 text-[11px] leading-relaxed whitespace-pre-wrap font-mono text-muted-foreground">
            {typeof detail === "string"
              ? detail
              : JSON.stringify(detail, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
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
  const [expandedEvents, setExpandedEvents] = useState<Set<number>>(
    new Set(),
  );
  const [runStartTime, setRunStartTime] = useState<number>(0);

  const outputEndRef = useRef<HTMLDivElement>(null);
  const timelineEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll output as tokens arrive
  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  // Auto-scroll timeline as events arrive
  useEffect(() => {
    timelineEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [toolEvents]);

  // ---- Data loading ----
  useEffect(() => {
    fetch("/api/agents?status=active")
      .then((r) => r.json())
      .then((data: AgentOption[]) =>
        setAgents(Array.isArray(data) ? data : []),
      )
      .catch(() => setAgents([]));

    fetch("/api/patients")
      .then((r) => r.json())
      .then((data) => {
        const raw: Array<{
          id: string;
          first_name: string;
          last_name: string;
        }> = Array.isArray(data) ? data : data?.data ?? [];
        setPatients(
          raw.map((p) => ({
            id: p.id,
            name: `${p.first_name} ${p.last_name}`,
          })),
        );
      })
      .catch(() => setPatients([]));
  }, []);

  const runnableAgents = agents.filter((a) => a.active_version_id !== null);
  const selectedAgent = agents.find((a) => a.id === selectedAgentId);

  // ---- Run handler ----
  const handleRun = useCallback(async () => {
    if (!selectedAgentId || !userMessage.trim() || running) return;
    const start = Date.now();
    setRunning(true);
    setOutput("");
    setToolEvents([]);
    setRunMeta(null);
    setExpandedEvents(new Set());
    setRunStartTime(start);

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
            const ts = Date.now();
            if (event.type === "token") {
              setOutput((prev) => prev + event.text);
            } else if (event.type === "status") {
              setToolEvents((prev) => [
                ...prev,
                { ...event, timestamp: ts },
              ]);
              if (event.model) {
                setRunMeta((prev) => ({ ...prev, model: event.model }));
              }
            } else if (
              event.type === "tool_call" ||
              event.type === "tool_result" ||
              event.type === "tool_error"
            ) {
              setToolEvents((prev) => [
                ...prev,
                { ...event, timestamp: ts },
              ]);
            } else if (event.type === "done") {
              setRunMeta((prev) => ({
                ...prev,
                runId: event.runId,
                durationMs: event.durationMs,
              }));
            } else if (event.type === "error") {
              setRunMeta((prev) => ({
                ...prev,
                error: event.message,
              }));
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
  }, [selectedAgentId, selectedPatientId, userMessage, running]);

  // Submit on Ctrl+Enter
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleRun();
      }
    },
    [handleRun],
  );

  const toggleEvent = (idx: number) => {
    setExpandedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const hasResults = output.length > 0 || toolEvents.length > 0 || runMeta;

  return (
    <div className="flex h-full flex-col">
      {/* ── Config Bar ── */}
      <div className="shrink-0 border-b border-border bg-background px-6 py-3">
        <div className="flex items-end gap-3">
          {/* Agent */}
          <div className="flex flex-col gap-1 min-w-[200px]">
            <label
              className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
              htmlFor="agent-select"
            >
              Agent
            </label>
            <select
              id="agent-select"
              value={selectedAgentId}
              onChange={(e) => setSelectedAgentId(e.target.value)}
              className="h-9 rounded-md border border-border bg-transparent px-2.5 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
            >
              <option value="">Select agent...</option>
              {runnableAgents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* Patient */}
          <div className="flex flex-col gap-1 min-w-[180px]">
            <label
              className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
              htmlFor="patient-select"
            >
              Patient
            </label>
            <select
              id="patient-select"
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="h-9 rounded-md border border-border bg-transparent px-2.5 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
            >
              <option value="">No patient context</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div className="flex flex-1 flex-col gap-1">
            <label
              className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
              htmlFor="user-message"
            >
              Message
            </label>
            <div className="relative">
              <input
                id="user-message"
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-9 w-full rounded-md border border-border bg-transparent px-3 pr-20 text-sm text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
                placeholder="Enter a message for the agent..."
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground/50">
                Ctrl+Enter
              </span>
            </div>
          </div>

          {/* Run */}
          <Button
            onClick={handleRun}
            disabled={!selectedAgentId || !userMessage.trim() || running}
            size="sm"
            className="h-9 gap-1.5 px-4"
          >
            {running ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Running
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                Run
              </>
            )}
          </Button>
        </div>

        {/* Agent description subtitle */}
        {selectedAgent && (
          <p className="mt-1.5 text-[11px] text-muted-foreground truncate">
            {selectedAgent.description}
          </p>
        )}
      </div>

      {/* ── Split Pane ── */}
      {!hasResults && !running ? (
        /* Empty state */
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Zap className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Agent Tester
              </p>
              <p className="mt-1 text-xs text-muted-foreground max-w-sm">
                Select an agent, optionally choose a patient for context, type a
                message, and hit Run. Output streams on the left, tool activity
                on the right.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 overflow-hidden">
          {/* ── Left: Output ── */}
          <div className="flex-[3] border-r border-border flex flex-col min-w-0">
            {/* Error banner */}
            {runMeta?.error && (
              <div className="shrink-0 border-b border-red-300 bg-red-50 px-6 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
                {runMeta.error}
              </div>
            )}

            <div className="flex-1 overflow-auto">
              <div className="px-8 py-6">
                {output ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground prose-code:text-xs prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                    <ReactMarkdown>{output}</ReactMarkdown>
                  </div>
                ) : running ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Waiting for output...
                  </div>
                ) : null}
                <div ref={outputEndRef} />
              </div>
            </div>
          </div>

          {/* ── Right: Activity Timeline ── */}
          <div className="flex-[2] flex flex-col min-w-0 bg-muted/20">
            {/* Timeline header */}
            <div className="shrink-0 border-b border-border px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground">
                  Activity
                </span>
                {toolEvents.filter(
                  (e) => e.type === "tool_call" || e.type === "tool_result" || e.type === "tool_error",
                ).length > 0 && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    {
                      toolEvents.filter(
                        (e) => e.type === "tool_result" || e.type === "tool_error",
                      ).length
                    }
                    /
                    {
                      toolEvents.filter((e) => e.type === "tool_call").length
                    }{" "}
                    tools
                  </Badge>
                )}
              </div>
              {running && (
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-muted-foreground">
                    Live
                  </span>
                </div>
              )}
            </div>

            {/* Timeline events */}
            <ScrollArea className="flex-1">
              <div className="py-1 px-1">
                {toolEvents.length === 0 && running && (
                  <div className="flex items-center gap-2 px-3 py-4 text-xs text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Waiting for tool calls...
                  </div>
                )}
                {toolEvents.map((evt, idx) => (
                  <TimelineItem
                    key={idx}
                    event={evt}
                    isExpanded={expandedEvents.has(idx)}
                    onToggle={() => toggleEvent(idx)}
                    startTime={runStartTime}
                  />
                ))}
                <div ref={timelineEndRef} />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}

      {/* ── Footer Status Bar ── */}
      {runMeta && (runMeta.runId || runMeta.durationMs) && (
        <div className="shrink-0 border-t border-border bg-background px-6 py-2 flex items-center gap-6 text-[11px] text-muted-foreground">
          {runMeta.runId && (
            <span className="flex items-center gap-1">
              <Bot className="h-3 w-3" />
              {runMeta.runId.slice(0, 8)}
            </span>
          )}
          {runMeta.durationMs != null && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {(runMeta.durationMs / 1000).toFixed(1)}s
            </span>
          )}
          {runMeta.model && (
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              {runMeta.model}
            </span>
          )}
          {!runMeta.error && runMeta.runId && (
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            >
              completed
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
