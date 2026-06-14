"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  User,
  Bot,
  Wrench,
  Clock,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AgentOption {
  id: string;
  name: string;
  agent_key: string;
  description: string | null;
  category: string;
  model: string | null;
}

interface PatientOption {
  id: string;
  first_name: string;
  last_name: string;
  patient_summary: string | null;
}

type EventType =
  | { type: "step"; step: string; agent?: { name: string; model: string; tools: string[] } }
  | { type: "tool_call"; name: string; args: Record<string, unknown> }
  | { type: "tool_result"; name: string; result_preview: string; result_length: number }
  | { type: "text"; text: string }
  | { type: "done"; summary: Record<string, unknown> }
  | { type: "error"; message: string };

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AgentTesterPage() {
  const [agents, setAgents] = useState<AgentOption[]>([]);
  const [patients, setPatients] = useState<PatientOption[]>([]);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [running, setRunning] = useState(false);
  const [events, setEvents] = useState<EventType[]>([]);
  const [outputText, setOutputText] = useState("");
  const [summary, setSummary] = useState<Record<string, unknown> | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Load agents + patients on mount
  useEffect(() => {
    fetch("/api/ops-agents")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setAgents(list);
        // Default to Consultation Analyst if available
        const analyst = list.find((a: AgentOption) => a.agent_key === "consultation_analyst");
        if (analyst) setSelectedAgent(analyst.id);
        else if (list.length > 0) setSelectedAgent(list[0].id);
      })
      .catch(() => {});

    fetch("/api/patients")
      .then((r) => r.json())
      .then((data) => {
        const list = data?.data ?? [];
        setPatients(list);
        // Default to Sofia Reyes if available, otherwise first patient
        const sofia = list.find(
          (p: PatientOption) => p.first_name === "Sofia" && p.last_name === "Reyes",
        );
        if (sofia) setSelectedPatient(sofia.id);
        else if (list.length > 0) setSelectedPatient(list[0].id);
      })
      .catch(() => {});
  }, []);

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [events, outputText]);

  const run = async () => {
    if (!selectedAgent || !selectedPatient || running) return;

    setRunning(true);
    setEvents([]);
    setOutputText("");
    setSummary(null);

    try {
      const res = await fetch("/api/agent-run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent_id: selectedAgent,
          patient_id: selectedPatient,
        }),
      });

      if (!res.ok || !res.body) {
        setEvents([{ type: "error", message: `HTTP ${res.status}` }]);
        setRunning(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;
          try {
            const event = JSON.parse(trimmed.slice(6)) as EventType;
            if (event.type === "text") {
              setOutputText((prev) => prev + event.text);
            } else if (event.type === "done") {
              setSummary(event.summary);
            }
            setEvents((prev) => [...prev, event]);
          } catch {
            // skip malformed
          }
        }
      }
    } catch (err) {
      setEvents((prev) => [
        ...prev,
        { type: "error", message: err instanceof Error ? err.message : "Network error" },
      ]);
    } finally {
      setRunning(false);
    }
  };

  const selectedAgentData = agents.find((a) => a.id === selectedAgent);
  const selectedPatientData = patients.find((p) => p.id === selectedPatient);

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Agent Tester</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a patient and an agent, then run the agent to see tool use,
          reasoning steps, and the final analysis — all against real data.
        </p>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
            {/* Patient selector */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                <User className="mr-1 inline h-4 w-4" />
                Patient
              </label>
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                disabled={running}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
              >
                <option value="">Select a patient...</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.first_name} {p.last_name}
                  </option>
                ))}
              </select>
              {selectedPatientData?.patient_summary && (
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {selectedPatientData.patient_summary}
                </p>
              )}
            </div>

            {/* Agent selector */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                <Bot className="mr-1 inline h-4 w-4" />
                Agent
              </label>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                disabled={running}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
              >
                <option value="">Select an agent...</option>
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.category})
                  </option>
                ))}
              </select>
              {selectedAgentData?.description && (
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {selectedAgentData.description}
                </p>
              )}
            </div>

            {/* Run button */}
            <div className="flex items-end">
              <Button
                onClick={run}
                disabled={running || !selectedAgent || !selectedPatient}
                className="w-full lg:w-auto"
                size="lg"
              >
                {running ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4" />
                )}
                {running ? "Running..." : "Run Agent"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Execution log + output */}
      {events.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          {/* Left: Tool calls & steps */}
          <Card className="max-h-[700px] overflow-y-auto">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Execution Log</CardTitle>
              <CardDescription>
                Tool calls and reasoning steps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {events
                .filter((e) => e.type !== "text")
                .map((event, i) => (
                  <EventRow key={i} event={event} />
                ))}
            </CardContent>
          </Card>

          {/* Right: Streamed output */}
          <Card className="max-h-[700px]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                Agent Output
                {summary && (
                  <Badge variant="secondary" className="text-xs font-normal">
                    {(Number(summary.duration_ms) / 1000).toFixed(1)}s
                    {" · "}
                    {String(summary.tokens ?? "?")} tokens
                    {" · "}
                    {String(summary.tool_calls)} tool calls
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                ref={outputRef}
                className="max-h-[580px] overflow-y-auto rounded-lg bg-muted/50 p-4"
              >
                {outputText ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                    {outputText}
                  </div>
                ) : running ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Agent is gathering data with tools...
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty state */}
      {events.length === 0 && !running && (
        <Card>
          <CardContent className="py-12 text-center">
            <Bot className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              Select a patient and an agent, then click{" "}
              <strong>Run Agent</strong> to see the agent use tools, query the
              Global Library, search clinical literature, and produce a
              grounded analysis.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Event row component
// ---------------------------------------------------------------------------

function EventRow({ event }: { event: EventType }) {
  const [expanded, setExpanded] = useState(false);

  if (event.type === "step") {
    return (
      <div className="flex items-start gap-2 rounded-md border border-border/50 bg-background p-2">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
        <span className="text-xs text-foreground">{event.step}</span>
      </div>
    );
  }

  if (event.type === "tool_call") {
    return (
      <div className="rounded-md border border-blue-200 bg-blue-50 p-2 dark:border-blue-900 dark:bg-blue-950">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => setExpanded(!expanded)}
        >
          <Wrench className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
            {event.name}
          </span>
          {expanded ? (
            <ChevronDown className="ml-auto h-3 w-3 text-blue-400" />
          ) : (
            <ChevronRight className="ml-auto h-3 w-3 text-blue-400" />
          )}
        </div>
        {expanded && (
          <pre className="mt-2 overflow-x-auto rounded bg-blue-100 p-2 text-[10px] text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {JSON.stringify(event.args, null, 2)}
          </pre>
        )}
      </div>
    );
  }

  if (event.type === "tool_result") {
    return (
      <div className="rounded-md border border-green-200 bg-green-50 p-2 dark:border-green-900 dark:bg-green-950">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => setExpanded(!expanded)}
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
          <span className="text-xs text-green-700 dark:text-green-300">
            {event.name} ({formatBytes(event.result_length)})
          </span>
          {expanded ? (
            <ChevronDown className="ml-auto h-3 w-3 text-green-400" />
          ) : (
            <ChevronRight className="ml-auto h-3 w-3 text-green-400" />
          )}
        </div>
        {expanded && (
          <pre className="mt-2 overflow-x-auto rounded bg-green-100 p-2 text-[10px] text-green-800 dark:bg-green-900 dark:text-green-200">
            {event.result_preview}
          </pre>
        )}
      </div>
    );
  }

  if (event.type === "done") {
    return (
      <div className="flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 p-2 dark:border-emerald-900 dark:bg-emerald-950">
        <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <span className="text-xs text-emerald-700 dark:text-emerald-300">
          Complete — {(Number(event.summary.duration_ms) / 1000).toFixed(1)}s,{" "}
          {String(event.summary.tool_calls)} tool calls
        </span>
      </div>
    );
  }

  if (event.type === "error") {
    return (
      <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-2 dark:border-red-900 dark:bg-red-950">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
        <span className="text-xs text-red-700 dark:text-red-300">
          {event.message}
        </span>
      </div>
    );
  }

  return null;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  return `${(bytes / 1024).toFixed(1)}KB`;
}
