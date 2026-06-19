"use client";

import { useState, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
  BookOpen,
  Link2,
  Mic,
  Video,
  Package,
  Database,
  ExternalLink,
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
  /** Tools to enable for this run (overrides agent's knowledge_config.tools) */
  toolsOverride?: string[];
}

export interface BlockCardHandle {
  /** Trigger a run, optionally prepending context from prior blocks */
  run: (contextPrefix?: string) => void;
}

type BlockStatus = "idle" | "running" | "done" | "error";

interface ToolEntry {
  toolName: string;
  toolCallId: string;
  label: string;
  status: "running" | "done" | "error";
  summary?: string;
}

interface SourceEntry {
  type: "fuel_doc" | "evidence" | "literature" | "product" | "podcast" | "youtube";
  title: string;
  subtitle?: string;
  url?: string;
  snippet?: string;
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
    heading: string;
  }
> = {
  blue: {
    border: "border-blue-500/30",
    activeBorder: "border-blue-500",
    bg: "bg-blue-500/5",
    icon: "text-blue-500",
    dot: "bg-blue-500",
    pill: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
    heading: "border-l-blue-500",
  },
  violet: {
    border: "border-violet-500/30",
    activeBorder: "border-violet-500",
    bg: "bg-violet-500/5",
    icon: "text-violet-500",
    dot: "bg-violet-500",
    pill: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
    heading: "border-l-violet-500",
  },
  teal: {
    border: "border-teal-500/30",
    activeBorder: "border-teal-500",
    bg: "bg-teal-500/5",
    icon: "text-teal-500",
    dot: "bg-teal-500",
    pill: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
    heading: "border-l-teal-500",
  },
  amber: {
    border: "border-amber-500/30",
    activeBorder: "border-amber-500",
    bg: "bg-amber-500/5",
    icon: "text-amber-500",
    dot: "bg-amber-500",
    pill: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    heading: "border-l-amber-500",
  },
  emerald: {
    border: "border-emerald-500/30",
    activeBorder: "border-emerald-500",
    bg: "bg-emerald-500/5",
    icon: "text-emerald-500",
    dot: "bg-emerald-500",
    pill: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    heading: "border-l-emerald-500",
  },
  rose: {
    border: "border-rose-500/30",
    activeBorder: "border-rose-500",
    bg: "bg-rose-500/5",
    icon: "text-rose-500",
    dot: "bg-rose-500",
    pill: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
    heading: "border-l-rose-500",
  },
  indigo: {
    border: "border-indigo-500/30",
    activeBorder: "border-indigo-500",
    bg: "bg-indigo-500/5",
    icon: "text-indigo-500",
    dot: "bg-indigo-500",
    pill: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
    heading: "border-l-indigo-500",
  },
  orange: {
    border: "border-orange-500/30",
    activeBorder: "border-orange-500",
    bg: "bg-orange-500/5",
    icon: "text-orange-500",
    dot: "bg-orange-500",
    pill: "bg-orange-500/15 text-orange-700 dark:text-orange-400",
    heading: "border-l-orange-500",
  },
};

// ── Tool label mapping ────────────────────────────────────────────────────────

const TOOL_LABELS: Record<string, string> = {
  get_patient_context: "Loading patient context",
  search_fuel_documents: "Searching GL fuel docs",
  search_clinical_literature: "Searching clinical literature",
  search_podcast: "Searching podcast discussions",
  search_youtube: "Searching training videos",
  get_product_info: "Looking up product",
  get_evidence_links: "Loading evidence links",
  query_product_database: "Querying product database",
};

function humanizeToolName(name: string): string {
  const label = TOOL_LABELS[name];
  if (label) return label;
  return name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ── Source extraction from tool results ──────────────────────────────────────

function extractSources(toolName: string, result: unknown): SourceEntry[] {
  if (!result || typeof result !== "object") return [];
  const r = result as Record<string, unknown>;

  if (toolName === "search_fuel_documents" && Array.isArray(r.results)) {
    return (r.results as Record<string, unknown>[]).map((item) => ({
      type: "fuel_doc" as const,
      title: (item.product_name as string) ?? `Fuel Doc (${item.fuel_type})`,
      subtitle: item.fuel_type as string,
    }));
  }

  if (toolName === "get_evidence_links") {
    const sources: SourceEntry[] = [];
    if (Array.isArray(r.evidence_links)) {
      for (const link of r.evidence_links as Record<string, unknown>[]) {
        sources.push({
          type: "evidence" as const,
          title: String(link.source ?? "Evidence"),
          subtitle: link.pmid ? `PMID ${link.pmid}` : link.doi ? String(link.doi) : undefined,
          url: link.url as string | undefined,
          snippet: link.snippet as string | undefined,
        });
      }
    }
    return sources;
  }

  if (
    (toolName === "search_clinical_literature" ||
      toolName === "search_podcast" ||
      toolName === "search_youtube") &&
    Array.isArray(r.results)
  ) {
    return (r.results as Record<string, unknown>[]).map((item) => {
      const source = String(item.source ?? "").toLowerCase();
      let type: SourceEntry["type"] = "literature";
      if (source.includes("podcast")) type = "podcast";
      else if (source.includes("youtube")) type = "youtube";
      return {
        type,
        title: (item.title as string) ?? String(item.source ?? "Source"),
        subtitle: (item.metadata as Record<string, unknown>)?.journal as string | undefined,
        url: item.url as string | undefined,
        snippet: (item.text as string)?.slice(0, 120),
      };
    });
  }

  if (toolName === "get_product_info" && r.product) {
    const p = r.product as Record<string, unknown>;
    return [
      {
        type: "product" as const,
        title: (p.name as string) ?? "Product",
        subtitle: p.regulatory_status as string | undefined,
      },
    ];
  }

  if (toolName === "query_product_database" && Array.isArray(r.products)) {
    return (r.products as Record<string, unknown>[]).map((p) => ({
      type: "product" as const,
      title: (p.name as string) ?? "Product",
      subtitle: p.brand_name as string | undefined,
    }));
  }

  return [];
}

const SOURCE_STYLE: Record<
  SourceEntry["type"],
  { bg: string; text: string; icon: React.ComponentType<{ className?: string }> }
> = {
  fuel_doc: { bg: "bg-teal-500/10 text-teal-700 dark:text-teal-300", text: "GL", icon: BookOpen },
  evidence: { bg: "bg-blue-500/10 text-blue-700 dark:text-blue-300", text: "Evid", icon: Link2 },
  literature: { bg: "bg-violet-500/10 text-violet-700 dark:text-violet-300", text: "Lit", icon: BookOpen },
  podcast: { bg: "bg-purple-500/10 text-purple-700 dark:text-purple-300", text: "Pod", icon: Mic },
  youtube: { bg: "bg-red-500/10 text-red-700 dark:text-red-300", text: "YT", icon: Video },
  product: { bg: "bg-amber-500/10 text-amber-700 dark:text-amber-300", text: "Prod", icon: Package },
};

// ── Markdown components ───────────────────────────────────────────────────────

function makeMarkdownComponents(color: BlockColor): Components {
  const c = COLORS[color];
  return {
    h1: ({ children }) => (
      <h1 className={`text-base font-bold text-foreground mt-5 mb-2 pb-1.5 border-b-2 border-l-4 pl-3 ${c.heading} border-border first:mt-0`}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className={`text-sm font-bold text-foreground mt-5 mb-2 pb-1 border-l-4 pl-3 ${c.heading} first:mt-0`}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xs font-semibold text-foreground/80 uppercase tracking-wide mt-4 mb-1.5 first:mt-0">
        {children}
      </h3>
    ),
    p: ({ children }) => {
      const text = typeof children === "string" ? children : "";
      if (text.startsWith("⚠️") || text.startsWith("🚨")) {
        return (
          <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800/60 dark:bg-amber-950/30 px-4 py-3 text-sm text-amber-800 dark:text-amber-300 mb-3 flex gap-2">
            <span className="shrink-0">⚠️</span>
            <span>{typeof children === "string" ? children.replace(/^⚠️|^🚨/, "").trim() : children}</span>
          </div>
        );
      }
      if (text.startsWith("🚩") || text.startsWith("❌")) {
        return (
          <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-800/60 dark:bg-red-950/30 px-4 py-3 text-sm text-red-800 dark:text-red-300 mb-3 flex gap-2">
            <span className="shrink-0">🚩</span>
            <span>{typeof children === "string" ? children.replace(/^🚩|^❌/, "").trim() : children}</span>
          </div>
        );
      }
      if (text.startsWith("✅") || text.startsWith("✓")) {
        return (
          <div className="rounded-lg border border-green-200 bg-green-50 dark:border-green-800/60 dark:bg-green-950/30 px-4 py-3 text-sm text-green-800 dark:text-green-300 mb-3 flex gap-2">
            <span className="shrink-0">✅</span>
            <span>{typeof children === "string" ? children.replace(/^✅|^✓/, "").trim() : children}</span>
          </div>
        );
      }
      if (text.startsWith("💡")) {
        return (
          <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground mb-3 flex gap-2">
            <span className="shrink-0">💡</span>
            <span>{typeof children === "string" ? children.replace(/^💡/, "").trim() : children}</span>
          </div>
        );
      }
      return (
        <p className="text-sm text-foreground/85 leading-relaxed mb-2.5 last:mb-0">
          {children}
        </p>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground/70">{children}</em>
    ),
    ul: ({ children }) => (
      <ul className="space-y-1 ml-4 list-disc marker:text-muted-foreground/50 mb-3">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="space-y-1 ml-4 list-decimal marker:text-muted-foreground/60 mb-3">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-sm text-foreground/85 leading-relaxed pl-1">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary/40 pl-4 italic text-muted-foreground text-sm my-3 py-1">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      const isBlock = className?.includes("language-");
      if (isBlock) {
        return (
          <pre className="bg-muted/60 border border-border rounded-lg p-3 overflow-x-auto text-xs font-mono mb-3">
            <code>{children}</code>
          </pre>
        );
      }
      return (
        <code className="bg-muted/80 rounded px-1.5 py-0.5 text-xs font-mono text-foreground">
          {children}
        </code>
      );
    },
    table: ({ children }) => (
      <div className="overflow-x-auto mb-3 rounded-lg border border-border">
        <table className="w-full text-xs">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-muted/60 border-b border-border">{children}</thead>
    ),
    tbody: ({ children }) => <tbody className="divide-y divide-border/50">{children}</tbody>,
    tr: ({ children }) => <tr className="hover:bg-muted/30 transition-colors">{children}</tr>,
    th: ({ children }) => (
      <th className="px-3 py-2 text-left font-semibold text-foreground/80 whitespace-nowrap">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-3 py-2 text-foreground/75 align-top">{children}</td>
    ),
    hr: () => <hr className="border-border/50 my-4" />,
    a: ({ children, href }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline decoration-primary/40 hover:decoration-primary transition-colors"
      >
        {children}
      </a>
    ),
  };
}

// ── BlockCard ─────────────────────────────────────────────────────────────────

export const BlockCard = forwardRef<BlockCardHandle, BlockCardProps>(function BlockCard(
  {
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
    toolsOverride,
  },
  ref,
) {
  const c = COLORS[color];

  const [status, setStatus] = useState<BlockStatus>("idle");
  const [output, setOutput] = useState("");
  const [tools, setTools] = useState<ToolEntry[]>([]);
  const [sources, setSources] = useState<SourceEntry[]>([]);
  const [toolsExpanded, setToolsExpanded] = useState(true);
  const [outputExpanded, setOutputExpanded] = useState(defaultExpanded);
  const [sourcesExpanded, setSourcesExpanded] = useState(false);
  const [durationMs, setDurationMs] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const outputAccRef = useRef("");
  const mdComponents = makeMarkdownComponents(color);

  const run = useCallback(
    async (contextPrefix?: string) => {
      if (!agentId || !patientId || status === "running") return;

      setStatus("running");
      setOutput("");
      setTools([]);
      setSources([]);
      setToolsExpanded(true);
      setOutputExpanded(true);
      setSourcesExpanded(false);
      setDurationMs(null);
      setErrorMsg(null);
      outputAccRef.current = "";

      const ctrl = new AbortController();
      abortRef.current = ctrl;

      const userMessage = contextPrefix
        ? `${contextPrefix}\n\n---\n\n${prompt}`
        : prompt;

      try {
        const body: Record<string, unknown> = {
          agent_id: agentId,
          user_message: userMessage,
          patient_id: patientId,
        };
        if (toolsOverride && toolsOverride.length > 0) {
          body.tools_override = toolsOverride;
        }

        const res = await fetch("/api/agent-runner", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: ctrl.signal,
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const raw = await res.text();
          let msg = `Request failed (${res.status})`;
          try {
            const parsed = JSON.parse(raw) as { error?: string };
            if (parsed.error) msg = parsed.error;
          } catch { /* ignore */ }
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
              const toolName = event.toolName as string;
              const toolCallId = event.toolCallId as string;
              const result = event.result;

              // Extract sources from this tool result
              const newSources = extractSources(toolName, result);
              if (newSources.length > 0) {
                setSources((prev) => [...prev, ...newSources]);
              }

              let summary = "";
              if (typeof result === "string") {
                summary = result.slice(0, 60);
              } else if (result && typeof result === "object") {
                const r = result as Record<string, unknown>;
                const arr = r.results as unknown[] | undefined;
                if (Array.isArray(arr)) {
                  summary = `${arr.length} result${arr.length !== 1 ? "s" : ""}`;
                } else {
                  summary =
                    (r.summary as string) ||
                    (r.name as string) ||
                    JSON.stringify(result).slice(0, 60);
                }
              }
              setTools((prev) =>
                prev.map((t) =>
                  t.toolCallId === toolCallId
                    ? { ...t, status: "done", summary }
                    : t,
                ),
              );
            } else if (type === "tool_error") {
              const toolCallId = event.toolCallId as string;
              setTools((prev) =>
                prev.map((t) =>
                  t.toolCallId === toolCallId ? { ...t, status: "error" } : t,
                ),
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
    },
    [agentId, patientId, prompt, status, onComplete, toolsOverride],
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  useImperativeHandle(ref, () => ({ run }), [run]);

  // ── Derived display values ─────────────────────────────────────────────────

  const isRunning = status === "running";
  const isDone = status === "done";
  const isError = status === "error";
  const hasOutput = output.length > 0;
  const toolsDone = tools.filter((t) => t.status !== "running").length;
  const totalTools = tools.length;

  const borderClass =
    isRunning || isDone
      ? c.activeBorder
      : isError
        ? "border-red-500"
        : c.border;
  const bgClass = isRunning || isDone ? c.bg : "";

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
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background/60 border ${c.border}`}
        >
          <Icon className={`h-4 w-4 ${c.icon}`} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-none">
            {title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isDone && sources.length > 0 && (
            <button
              className={`text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer ${c.pill}`}
              onClick={(e) => {
                e.stopPropagation();
                setSourcesExpanded((v) => !v);
              }}
            >
              {sources.length} source{sources.length !== 1 ? "s" : ""}
            </button>
          )}
          {isDone && totalTools > 0 && (
            <button
              className={`text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer bg-muted text-muted-foreground hover:text-foreground`}
              onClick={(e) => {
                e.stopPropagation();
                setToolsExpanded((v) => !v);
              }}
            >
              {totalTools} tool{totalTools !== 1 ? "s" : ""}
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

          <span className={`h-2 w-2 rounded-full ${dotClass}`} />

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
      {(isRunning || (isDone && toolsExpanded)) && tools.length > 0 && toolsExpanded && (
        <div className="border-t border-border/50 px-4 py-2.5 space-y-1.5 bg-muted/20">
          <p className="text-xs font-medium text-muted-foreground mb-1">
            Tool activity
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
              <span className="text-xs text-muted-foreground leading-relaxed">
                {t.label}
                {t.summary && (
                  <span className="text-foreground/50 ml-1">· {t.summary}</span>
                )}
                {t.status === "running" && (
                  <span className="text-muted-foreground/60">…</span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Output ── */}
      {(hasOutput || isError) && outputExpanded && (
        <div className="border-t border-border/50 px-5 py-4">
          {isError && errorMsg && (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 dark:border-red-800/60 dark:bg-red-950/30 px-3 py-2.5 text-sm text-red-800 dark:text-red-300 mb-3">
              <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
          {hasOutput && (
            <div className="prose-none">
              <ReactMarkdown components={mdComponents} remarkPlugins={[remarkGfm]}>
                {output}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}

      {/* ── Loading state (before first token) ── */}
      {isRunning && !hasOutput && (
        <div className="border-t border-border/50 px-4 py-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Thinking…
        </div>
      )}

      {/* ── Sources panel ── */}
      {isDone && sources.length > 0 && sourcesExpanded && (
        <div className="border-t border-border/50 px-4 py-3">
          <p className="text-xs font-semibold text-muted-foreground mb-2.5 uppercase tracking-wide">
            Sources consulted
          </p>
          <div className="space-y-1.5">
            {sources.map((src, i) => {
              const style = SOURCE_STYLE[src.type];
              const SrcIcon = style.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-2.5 rounded-lg border border-border/40 bg-background/60 px-3 py-2"
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-xs font-bold mt-0.5 ${style.bg}`}
                  >
                    <SrcIcon className="h-3 w-3" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground/90 truncate">
                      {src.title}
                    </p>
                    {src.subtitle && (
                      <p className="text-xs text-muted-foreground truncate">
                        {src.subtitle}
                      </p>
                    )}
                    {src.snippet && (
                      <p className="text-xs text-muted-foreground/70 mt-0.5 line-clamp-2">
                        {src.snippet}
                      </p>
                    )}
                  </div>
                  {src.url && (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 text-muted-foreground/50 hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <div className="border-t border-border/50 px-4 py-2.5 flex items-center justify-between gap-3 bg-muted/10">
        <div className="flex items-center gap-2">
          {status === "idle" && (
            <Button
              size="sm"
              variant="outline"
              className="h-7 gap-1.5 text-xs"
              disabled={disabled || !agentId || !patientId}
              onClick={() => run()}
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
              onClick={() => run()}
            >
              <RefreshCw className="h-3 w-3" />
              Re-run
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {isRunning && totalTools > 0 && (
            <span className="flex items-center gap-1">
              <Wrench className="h-3 w-3" />
              {toolsDone}/{totalTools}
            </span>
          )}
          {isDone && durationMs !== null && (
            <span className="tabular-nums">{(durationMs / 1000).toFixed(1)}s</span>
          )}
          {isDone && sources.length > 0 && (
            <span className="flex items-center gap-1">
              <Database className="h-3 w-3" />
              {sources.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});
