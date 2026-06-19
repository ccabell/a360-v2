"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClipboardList, Loader2, AlertCircle, RefreshCw } from "lucide-react";

interface PatientOption {
  id: string;
  name: string;
}

const MARKDOWN_COMPONENTS = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-xl font-bold text-foreground mb-3 mt-5 first:mt-0">{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-lg font-semibold text-foreground mb-2 mt-4 pb-1 border-b border-border first:mt-0">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-base font-semibold text-foreground mb-1.5 mt-3">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-sm text-foreground leading-relaxed mb-2">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc list-inside space-y-1 mb-2 text-sm text-foreground">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal list-inside space-y-1 mb-2 text-sm text-foreground">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-sm text-foreground">{children}</li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic text-muted-foreground">{children}</em>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-2 border-primary/30 pl-3 my-2 text-sm text-muted-foreground italic">{children}</blockquote>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="bg-muted rounded px-1 py-0.5 text-xs font-mono text-foreground">{children}</code>
  ),
  hr: () => <hr className="border-border my-4" />,
};

export default function TCPPage() {
  const [patients, setPatients] = useState<PatientOption[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [tcpAgentId, setTcpAgentId] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [toolCount, setToolCount] = useState(0);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/patients")
      .then((r) => r.json())
      .then((data) => {
        const raw: Array<{ id: string; first_name: string; last_name: string }> =
          Array.isArray(data) ? data : data?.data ?? [];
        setPatients(raw.map((p) => ({ id: p.id, name: `${p.first_name} ${p.last_name}` })));
      })
      .catch(() => {});

    fetch("/api/agents?status=active")
      .then((r) => r.json())
      .then((agents: Array<{ id: string; agent_key: string; active_version_id: string | null }>) => {
        const tcp = agents.find((a) => a.agent_key === "tcp_builder" && a.active_version_id);
        if (tcp) setTcpAgentId(tcp.id);
      })
      .catch(() => {});
  }, []);

  // Auto-scroll output as it streams
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleGenerate = useCallback(async () => {
    if (!selectedPatientId || !tcpAgentId || running) return;
    setRunning(true);
    setOutput("");
    setError(null);
    setToolCount(0);

    try {
      const res = await fetch("/api/agent-runner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent_id: tcpAgentId,
          user_message: "Build a treatment care plan for this patient based on their consultation.",
          patient_id: selectedPatientId,
        }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        let msg = `Request failed (${res.status})`;
        try { const p = JSON.parse(errBody); if (p.error) msg = p.error; } catch { /**/ }
        setError(msg);
        setRunning(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) { setError("No response stream"); setRunning(false); return; }

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
            } else if (event.type === "tool_call" || event.type === "tool_result") {
              setToolCount((n) => n + 1);
            } else if (event.type === "error") {
              setError(event.message ?? "Agent error");
            }
          } catch { /**/ }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setRunning(false);
    }
  }, [selectedPatientId, tcpAgentId, running]);

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header bar */}
      <div className="shrink-0 border-b border-border bg-background px-6 py-4">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <ClipboardList className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-semibold leading-none text-foreground">
              Treatment Care Planning
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Agent-generated 3-month treatment arc grounded in GL fuel documents
            </p>
          </div>
        </div>

        <div className="flex items-end gap-3">
          <div className="flex min-w-[260px] flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Patient</label>
            <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
              <SelectTrigger className="h-9 w-full">
                <SelectValue placeholder="Select a patient…" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!selectedPatientId || !tcpAgentId || running}
            className="h-9 gap-1.5"
          >
            {running ? (
              <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating…</>
            ) : output ? (
              <><RefreshCw className="h-3.5 w-3.5" /> Regenerate</>
            ) : (
              "Generate Plan"
            )}
          </Button>

          {!tcpAgentId && (
            <Badge variant="destructive" className="text-xs">tcp_builder agent not found</Badge>
          )}
          {running && toolCount > 0 && (
            <span className="text-xs text-muted-foreground">{toolCount} tool calls…</span>
          )}
        </div>
      </div>

      {/* Output area */}
      <div ref={outputRef} className="flex-1 overflow-y-auto min-h-0 px-6 py-5">
        {!output && !running && !error && (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <ClipboardList className="h-10 w-10 mb-3 opacity-20" />
            <p className="text-sm">Select a patient and click Generate Plan</p>
            <p className="text-xs mt-1 opacity-60">
              The tcp_builder agent will load their consultation and build a sequenced treatment arc from GL fuel docs
            </p>
          </div>
        )}

        {running && !output && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading consultation and fuel documents…
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Error</p>
              <p className="text-xs mt-0.5 text-destructive/80">{error}</p>
            </div>
          </div>
        )}

        {output && (
          <div className="max-w-3xl">
            {selectedPatient && !running && (
              <p className="text-xs text-muted-foreground mb-4">
                Treatment plan for <strong>{selectedPatient.name}</strong>
              </p>
            )}
            <ReactMarkdown components={MARKDOWN_COMPONENTS}>{output}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
