"use client";

import { useState, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Loader2,
  XCircle,
  Square,
  Play,
  RefreshCw,
  Wrench,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

export type BlockColor =
  | "blue"
  | "violet"
  | "teal"
  | "amber"
  | "emerald"
  | "rose"
  | "indigo"
  | "orange";

export interface BlockCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  color: BlockColor;
  agentId: string | null;
  patientId: string;
  prompt: string;
  disabled?: boolean;
  onComplete?: (output: string) => void;
  defaultExpanded?: boolean;
}

type BlockStatus = "idle" | "running" | "done" | "error";

interface ToolEntry {
  toolName: string;
  toolCallId: string;
  label: string;
  status: "running" | "done" | "error";
  summary?: string;
}

// ── Color lookup (full Tailwind strings only) ────────────────────────────────

const COLORS: Record<
  BlockColor,
  {
    border: string;
    activeBorder: string;
    bg: string;
    icon: string;
    dot: string;
    pill: string;
  }
> = {
  blue: {
    border: "border-blue-500/30",
    activeBorder: "border-blue-500",
    bg: "bg-blue-500/5",
    icon: "text-blue-500",
    dot: "bg-blue-500",
    pill: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  },
  violet: {
    border: "border-violet-500/30",
    activeBorder: "border-violet-500",
    bg: "bg-violet-500/5",
    icon: "text-violet-500",
    dot: "bg-violet-500",
    pill: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  },
  teal: {
    border: "border-teal-500/30",
    activeBorder: "border-teal-500",
    bg: "bg-teal-500/5",
    icon: "text-teal-500",
    dot: "bg-teal-500",
    pill: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
  },
  amber: {
    border: "border-amber-500/30",
    activeBorder: "border-amber-500",
    bg: "bg-amber-500/5",
    icon: "text-amber-500",
    dot: "bg-amber-500",
    pill: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  },
  emerald: {
    border: "border-emerald-500/30",
    activeBorder: "border-emerald-500",
    bg: "bg-emerald-500/5",
    icon: "text-emerald-500",
    dot: "bg-emerald-500",
    pill: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  },
  rose: {
    border: "border-rose-500/30",
    activeBorder: "border-rose-500",
    bg: "bg-rose-500/5",
    icon: "text-rose-500",
    dot: "bg-rose-500",
    pill: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  },
  indigo: {
    border: "border-indigo-500/30",
    activeBorder: "border-indigo-500",
    bg: "bg-indigo-500/5",
    icon: "text-indigo-500",
    dot: "bg-indigo-500",
    pill: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
  },
  orange: {
    border: "border-orange-500/30",
    activeBorder: "border-orange-500",
    bg: "bg-orange-500/5",
    icon: "text-orange-500",
    dot: "bg-orange-500",
    pill: "bg-orange-500/15 text-orange-700 dark:text-orange-400",
  },
};

// ── Tool label mapping ────────────────────────────────────────────────────────

const TOOL_LABELS: Record<string, string> = {
  get_patient_context: "Loading patient context",
  search_fuel_documents: "Searching GL fuel docs",
  search_clinical_literature: "Searching PubMed & sources",
  get_product_info: "Looking up product",
  get_evidence_links: "Loading evidence",
};

function humanizeToolName(name: string): string {
  const label = TOOL_LABELS[name];
  if (label) return label;
  const words = name.replace(/_/g, " ").split(" ");
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ");
}

// ── Markdown components ───────────────────────────────────────────────────────

function makeMarkdownComponents(): Components {
  return {
    h2: ({ children }) => (
      <h2 className="text-base font-bold text-foreground mt-5 mb-2 pb-1 border-b border-border first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-sm font-semibold text-foreground mt-4 mb-1.5">
        {children}
      </h3>
    ),
    p: ({ children }) => {
      const text = typeof children === "string" ? children : "";
      if (text.startsWith("⚠️")) {
        return (
          <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40 px-4 py-3 text-sm text-amber-800 dark:text-amber-300 mb-2">
            {children}
          </div>
        );
      }
      if (text.startsWith("🚩")) {
        return (
          <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/40 px-4 py-3 text-sm text-red-800 dark:text-red-300 mb-2">
            {children}
          </div>
        );
      }
      if (text.startsWith("✅") || text.startsWith("✓")) {
        return (
          <div className="rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/40 px-4 py-3 text-sm text-green-800 dark:text-green-300 mb-2">
            {children}
          </div>
        );
      }
      return (
        <p className="text-sm text-foreground/85 leading-relaxed mb-2">
          {children}
        </p>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    ul: ({ children }) => (
      <ul className="space-y-1 ml-4 list-disc marker:text-muted-foreground/60 mb-2">
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li className="text-sm text-foreground/85 leading-relaxed">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary/40 pl-3 italic text-muted-foreground text-sm my-2">
        {children}
      </blockquote>
    ),
  };
}

const MD_COMPONENTS = makeMarkdownComponents();

// ── BlockCard ─────────────────────────────────────────────────────────────────

export function BlockCard({
  icon: Icon,
  title,
  subtitle,
  color,
  agentId,
  patientId,
  prompt,
  disabled = false,
  onComplete,
  defaultExpanded = false,
}: BlockCardProps) {
  const c = COLORS[color];

  const [status, setStatus] = useState<BlockStatus>("idle");
  const [output, setOutput] = useState("");
  const [tools, setTools] = useState<ToolEntry[]>([]);
  const [toolsExpanded, setToolsExpanded] = useState(true);
  const [outputExpanded, setOutputExpanded] = useState(defaultExpanded);
  const [durationMs, setDurationMs] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const outputAccRef = useRef("");

  const run = useCallback(async () => {
    if (!agentId || !patientId || status === "running") return;

    setStatus("running");
    setOutput("");
    setTools([]);
    setToolsExpanded(true);
    setOutputExpanded(true);
    setDurationMs(null);
    setErrorMsg(null);
    outputAccRef.current = "";

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch("/api/agent-runner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: ctrl.signal,
        body: JSON.stringify({
          agent_id: agentId,
          user_message: prompt,
          patient_id: patientId,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        let msg = `Request failed (${res.status})`;
        try {
          const parsed = JSON.parse(body) as { error?: string };
          if (parsed.error) msg = parsed.error;
        } catch {
          // ignore
        }
        setErrorMsg(msg);
        setStatus("error");
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setErrorMsg("No response stream");
        setStatus("error");
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() ?? "";

        for (const chunk of chunks) {
          if (!chunk.startsWith("data: ")) continue;
          let event: Record<string, unknown>;
          try {
            event = JSON.parse(chunk.slice(6)) as Record<string, unknown>;
          } catch {
            continue;
          }

          const type = event.type as string;

          if (type === "token") {
            outputAccRef.current += event.text as string;
            setOutput(outputAccRef.current);
          } else if (type === "tool_call") {
            const toolName = event.toolName as string;
            const toolCallId = event.toolCallId as string;
            setTools((prev) => [
              ...prev,
              {
                toolName,
                toolCallId,
                label: humanizeToolName(toolName),
                status: "running",
              },
            ]);
          } else if (type === "tool_result") {
            const toolCallId = event.toolCallId as string;
            const result = event.result;
            let summary = "";
            if (typeof result === "string") {
              summary = result.slice(0, 60);
            } else if (result && typeof result === "object") {
              const r = result as Record<string, unknown>;
              summary =
                (r.summary as string) ||
                (r.name as string) ||
                JSON.stringify(result).slice(0, 60);
            }
            setTools((prev) =>
              prev.map((t) =>
                t.toolCallId === toolCallId
                  ? { ...t, status: "done", summary }
                  : t
              )
            );
          } else if (type === "tool_error") {
            const toolCallId = event.toolCallId as string;
            setTools((prev) =>
              prev.map((t) =>
                t.toolCallId === toolCallId ? { ...t, status: "error" } : t
              )
            );
          } else if (type === "done") {
            setDurationMs(event.durationMs as number);
            setStatus("done");
            setToolsExpanded(false);
            onComplete?.(outputAccRef.current);
          } else if (type === "error") {
            setErrorMsg((event.message as string) ?? "Agent error");
            setStatus("error");
          }
        }
      }
    } catch (err) {
      if ((err as { name?: string }).name === "AbortError") {
        setStatus("idle");
      } else {
        setErrorMsg(err instanceof Error ? err.message : "Network error");
        setStatus("error");
      }
    }
  }, [agentId, patientId, prompt, status, onComplete]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  // ── Derived display values ─────────────────────────────────────────────────

  const isRunning = status === "running";
  const isDone = status === "done";
  const isError = status === "error";
  const hasOutput = output.length > 0;
  const toolsDone = tools.filter((t) => t.status !== "running").length;
  const totalTools = tools.length;

  // Border & bg based on status
  const borderClass =
    isRunning || isDone
      ? c.activeBorder
      : isError
      ? "border-red-500"
      : c.border;
  const bgClass = isRunning || isDone ? c.bg : "";

  // Status dot
  let dotClass = "bg-muted-foreground/40";
  if (isRunning) dotClass = `${c.dot} animate-pulse`;
  if (isDone) dotClass = "bg-green-500";
  if (isError) dotClass = "bg-red-500";

  return (
    <div
      className={`rounded-xl border-2 transition-all duration-200 overflow-hidden ${borderClass} ${bgClass}`}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
        onClick={() => {
          if (hasOutput) setOutputExpanded((v) => !v);
        }}
      >
        {/* Icon */}
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background/60 border ${c.border}`}
        >
          <Icon className={`h-4 w-4 ${c.icon}`} />
        </div>

        {/* Title / subtitle */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-none">
            {title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {subtitle}
          </p>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 shrink-0">
          {isDone && totalTools > 0 && (
            <button
              className={`text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer ${c.pill}`}
              onClick={(e) => {
                e.stopPropagation();
                setToolsExpanded((v) => !v);
              }}
            >
              {totalTools} tools
            </button>
          )}
          {isRunning && (
            <Badge variant="outline" className={`text-xs ${c.pill} border-0`}>
              Running
            </Badge>
          )}
          {isError && (
            <Badge variant="destructive" className="text-xs">
              Error
            </Badge>
          )}
          {!agentId && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              No agent
            </Badge>
          )}

          {/* Status dot */}
          <span className={`h-2 w-2 rounded-full ${dotClass}`} />

          {/* Expand chevron */}
          {hasOutput && (
            <span className="text-muted-foreground/60">
              {outputExpanded ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </span>
          )}
        </div>
      </div>

      {/* ── Tool activity feed ── */}
      {(isRunning || isDone) && tools.length > 0 && toolsExpanded && (
        <div className="border-t border-border/50 px-4 py-2 space-y-1">
          <p className="text-xs font-medium text-muted-foreground mb-1.5">
            Tool activity:
          </p>
          {tools.map((t, i) => (
            <div key={`${t.toolCallId}-${i}`} className="flex items-start gap-2">
              {t.status === "running" ? (
                <Loader2 className="h-3 w-3 mt-0.5 shrink-0 text-muted-foreground animate-spin" />
              ) : t.status === "done" ? (
                <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0 text-green-500" />
              ) : (
                <XCircle className="h-3 w-3 mt-0.5 shrink-0 text-red-500" />
              )}
              <span className="text-xs text-muted-foreground">
                {t.label}
                {t.summary && (
                  <span className="text-foreground/60"> · {t.summary}</span>
                )}
                {t.status === "running" && "…"}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Output ── */}
      {(hasOutput || isError) && outputExpanded && (
        <div className="border-t border-border/50 px-4 py-4">
          {isError && errorMsg && (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/40 px-3 py-2 text-sm text-red-800 dark:text-red-300 mb-3">
              <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
          {hasOutput && (
            <div className="prose-none">
              <ReactMarkdown components={MD_COMPONENTS}>{output}</ReactMarkdown>
            </div>
          )}
        </div>
      )}

      {/* ── Loading spinner (before first token) ── */}
      {isRunning && !hasOutput && (
        <div className="border-t border-border/50 px-4 py-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Initializing…
        </div>
      )}

      {/* ── Footer ── */}
      <div className="border-t border-border/50 px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Run / Stop / Re-run */}
          {status === "idle" && (
            <Button
              size="sm"
              variant="outline"
              className="h-7 gap-1.5 text-xs"
              disabled={disabled || !agentId || !patientId}
              onClick={run}
            >
              <Play className="h-3 w-3" />
              Run
            </Button>
          )}
          {isRunning && (
            <Button
              size="sm"
              variant="destructive"
              className="h-7 gap-1.5 text-xs"
              onClick={stop}
            >
              <Square className="h-3 w-3" />
              Stop
            </Button>
          )}
          {(isDone || isError) && (
            <Button
              size="sm"
              variant="outline"
              className="h-7 gap-1.5 text-xs"
              disabled={disabled || !agentId || !patientId}
              onClick={run}
            >
              <RefreshCw className="h-3 w-3" />
              Re-run
            </Button>
          )}
        </div>

        {/* Right: tool count + duration */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {isRunning && totalTools > 0 && (
            <span className="flex items-center gap-1">
              <Wrench className="h-3 w-3" />
              {toolsDone}/{totalTools}
            </span>
          )}
          {isDone && totalTools > 0 && (
            <span className="flex items-center gap-1">
              <Wrench className="h-3 w-3" />
              {totalTools} tools
            </span>
          )}
          {durationMs !== null && (
            <span>{(durationMs / 1000).toFixed(1)}s</span>
          )}
        </div>
      </div>
    </div>
  );
}
