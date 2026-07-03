"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Send,
  Sparkles,
  Headphones,
  Loader2,
  ShieldCheck,
  ArrowUpRight,
  ChevronDown,
  Target,
  Stethoscope,
  TrendingUp,
  MessageCircle,
  Presentation,
} from "lucide-react";

/* ── Types ───────────────────────────────────────────────────────────────── */

interface PodcastSource {
  id: string;
  title: string;
  showName: string;
  text: string;
  episodeId: string;
  chunkIndex: number;
  url: string;
  meta: string;
}
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: PodcastSource[];
  streaming?: boolean;
  error?: string;
}

interface AgentOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

/* ── Agent presets (mirrors lib/podcast/agents.ts) ───────────────────────── */

const AGENTS: AgentOption[] = [
  { id: "research", name: "General Research", description: "Broad Q&A across all podcast content", icon: "Sparkles" },
  { id: "competitive", name: "Competitive Intelligence", description: "Competitor mentions, market moves, positioning", icon: "Target" },
  { id: "clinical", name: "Clinical Insights", description: "Treatment techniques, protocols, clinical pearls", icon: "Stethoscope" },
  { id: "business", name: "Business Strategy", description: "Practice growth, pricing, operations", icon: "TrendingUp" },
  { id: "patient-language", name: "Patient Language", description: "How patients describe concerns and objections", icon: "MessageCircle" },
  { id: "sales", name: "Sales & Education", description: "Sales techniques, consultation frameworks", icon: "Presentation" },
];

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Target,
  Stethoscope,
  TrendingUp,
  MessageCircle,
  Presentation,
};

const STARTERS = [
  "What are the top practice growth strategies discussed across shows?",
  "How do leading injectors approach tear trough treatment?",
  "What objections do patients have about Sculptra and how are they handled?",
  "Compare membership models discussed across different podcasts",
];

/* ── Citation renderer ───────────────────────────────────────────────────── */

function renderWithCitations(text: string, sources: PodcastSource[]) {
  const byId = new Map(sources.map((s) => [s.id, s]));
  const parts: React.ReactNode[] = [];
  const re = /\[(S\d+)\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const src = byId.get(m[1]);
    if (src) {
      parts.push(
        <Link
          key={`c${key++}`}
          href={src.url}
          title={`${src.title} · ${src.meta}`}
          className="mx-0.5 inline-flex translate-y-px items-center gap-0.5 rounded bg-primary/15 px-1.5 py-0.5 align-baseline text-[11px] font-semibold text-primary hover:bg-primary/25"
        >
          <Headphones className="h-2.5 w-2.5" />
          {src.id}
        </Link>,
      );
    } else {
      parts.push(m[0]);
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/* ── Main component ──────────────────────────────────────────────────────── */

export function PodcastTutorClient() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [agentId, setAgentId] = useState("research");
  const [agentOpen, setAgentOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentAgent = AGENTS.find((a) => a.id === agentId) ?? AGENTS[0];
  const AgentIcon = ICON_MAP[currentAgent.icon] ?? Sparkles;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    const asstId = `a${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: `u${Date.now()}`, role: "user", content: q },
      { id: asstId, role: "assistant", content: "", streaming: true },
    ]);
    setInput("");
    setBusy(true);
    const update = (patch: Partial<ChatMessage>) =>
      setMessages((prev) =>
        prev.map((m) => (m.id === asstId ? { ...m, ...patch } : m)),
      );
    try {
      const res = await fetch("/api/podcast/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, agentId }),
      });
      if (!res.body) throw new Error("no stream");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          const t = line.trim();
          if (!t.startsWith("data:")) continue;
          const json = t.slice(5).trim();
          if (!json) continue;
          try {
            const ev = JSON.parse(json) as {
              type: string;
              sources?: PodcastSource[];
              text?: string;
              message?: string;
            };
            if (ev.type === "sources") update({ sources: ev.sources });
            else if (ev.type === "token" && ev.text)
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === asstId
                    ? { ...m, content: m.content + ev.text }
                    : m,
                ),
              );
            else if (ev.type === "error") update({ error: ev.message });
            else if (ev.type === "done") update({ streaming: false });
          } catch {
            /* partial frame */
          }
        }
      }
      update({ streaming: false });
    } catch (err) {
      update({
        streaming: false,
        error: err instanceof Error ? err.message : "request failed",
      });
    } finally {
      setBusy(false);
    }
  }

  const empty = messages.length === 0;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-5 sm:px-6"
      >
        {empty ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Headphones className="h-6 w-6" />
            </div>
            <p className="mt-4 font-heading text-lg font-semibold text-white">
              Ask the podcast library anything
            </p>
            <p className="mt-1 max-w-md text-sm text-neutral-400">
              Answers are drawn from real medical aesthetics podcasts across{" "}
              52 shows and cite the exact episode — click any [S#] to read
              the source transcript.
            </p>
            <div className="mt-6 grid w-full max-w-xl gap-2 sm:grid-cols-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="rounded-lg bg-white/5 px-3.5 py-2.5 text-left text-sm text-neutral-200 ring-1 ring-white/10 transition-colors hover:bg-white/10"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                    {m.content}
                  </div>
                </div>
              ) : (
                <Bubble key={m.id} message={m} />
              ),
            )}
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-white/10 bg-white/[0.02] p-3 sm:p-4">
        {/* Agent selector */}
        <div className="relative mb-2">
          <button
            onClick={() => setAgentOpen(!agentOpen)}
            className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-left text-xs transition-colors hover:border-white/20"
          >
            <AgentIcon className="h-3.5 w-3.5 text-primary" />
            <span className="flex-1 font-medium text-neutral-200">
              {currentAgent.name}
            </span>
            <span className="text-neutral-500">{currentAgent.description}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-neutral-500 transition-transform ${agentOpen ? "rotate-180" : ""}`}
            />
          </button>
          {agentOpen && (
            <div className="absolute bottom-full left-0 z-20 mb-1 w-full rounded-lg border border-white/10 bg-neutral-900 p-1 shadow-xl">
              {AGENTS.map((a) => {
                const Icon = ICON_MAP[a.icon] ?? Sparkles;
                return (
                  <button
                    key={a.id}
                    onClick={() => {
                      setAgentId(a.id);
                      setAgentOpen(false);
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left transition-colors hover:bg-white/5 ${
                      a.id === agentId ? "bg-primary/10" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-primary" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-neutral-100">
                        {a.name}
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        {a.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                ask(input);
              }
            }}
            rows={1}
            placeholder="Ask about treatments, business strategy, competitors, patient language..."
            className="max-h-32 flex-1 resize-none rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white outline-none ring-primary/30 placeholder:text-neutral-500 focus:ring-2"
          />
          <button
            onClick={() => ask(input)}
            disabled={!input.trim() || busy}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            aria-label="Send"
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="mt-2 flex items-center gap-1.5 px-1 text-[11px] text-neutral-500">
          <ShieldCheck className="h-3 w-3" />
          Educational reference · grounded in cited podcasts, not medical
          advice.
        </p>
      </div>
    </div>
  );
}

/* ── Bubble ───────────────────────────────────────────────────────────────── */

function Bubble({ message }: { message: ChatMessage }) {
  const { content, sources, streaming, error } = message;
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm leading-relaxed text-neutral-100">
          {content
            .split(/\n\n+/)
            .filter(Boolean)
            .map((para, i) => (
              <p key={i} className={i > 0 ? "mt-3" : ""}>
                {sources ? renderWithCitations(para, sources) : para}
              </p>
            ))}
          {streaming && (
            <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse rounded-sm bg-primary align-middle" />
          )}
        </div>
        {error && (
          <p className="mt-2 text-xs text-red-400">
            Couldn&rsquo;t generate an answer ({error}).
          </p>
        )}
        {sources && sources.length > 0 && !streaming && (
          <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Sources ({sources.length})
            </p>
            <div className="mt-2 space-y-1">
              {sources.map((s) => (
                <Link
                  key={s.id}
                  href={s.url}
                  className="flex items-start gap-2.5 rounded-md p-1.5 transition-colors hover:bg-white/5"
                >
                  <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary">
                    <Headphones className="h-2.5 w-2.5" />
                    {s.id}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-medium text-neutral-100">
                      {s.title}
                    </span>
                    <span className="block truncate text-[11px] text-neutral-500">
                      {s.meta}
                    </span>
                  </span>
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
