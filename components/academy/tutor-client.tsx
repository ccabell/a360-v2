"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Send,
  Sparkles,
  Play,
  Podcast,
  Loader2,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

interface ChatSource {
  id: string;
  kind: "video" | "podcast";
  title: string;
  text: string;
  slug?: string;
  start?: number;
  meta?: string;
  url?: string | null;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
  streaming?: boolean;
  error?: string;
}

const STARTERS = [
  "What should I do if I suspect a vascular occlusion?",
  "How much hyaluronidase to dissolve filler in the lips?",
  "Where are the danger zones for tear trough filler?",
  "How do I assess a patient for masseter Botox?",
];

function fmt(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

/** Deep-link href for a source. */
function sourceHref(s: ChatSource): string | null {
  if (s.kind === "video" && s.slug != null) {
    return `/dashboard/academy/lesson/${s.slug}?t=${s.start ?? 0}`;
  }
  return s.url ?? null;
}

/**
 * Render assistant prose, turning [S1]/[P2] markers into clickable citation
 * pills that deep-link to the cited moment. Unknown markers render as plain
 * text (never a dead link).
 */
function renderWithCitations(text: string, sources: ChatSource[]) {
  const byId = new Map(sources.map((s) => [s.id, s]));
  const parts: React.ReactNode[] = [];
  const re = /\[([SP]\d+)\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const src = byId.get(m[1]);
    if (src) {
      const href = sourceHref(src);
      const label = src.kind === "video" ? src.id : src.id;
      const pill = (
        <span
          key={`c${key++}`}
          className="mx-0.5 inline-flex translate-y-px items-center gap-0.5 rounded bg-primary/10 px-1.5 py-0.5 align-baseline text-[11px] font-semibold text-primary"
          title={`${src.title}${src.meta ? ` · ${src.meta}` : ""}`}
        >
          {src.kind === "video" ? (
            <Play className="h-2.5 w-2.5 fill-current" />
          ) : (
            <Podcast className="h-2.5 w-2.5" />
          )}
          {label}
        </span>
      );
      parts.push(
        href ? (
          <Link
            key={`l${key++}`}
            href={href}
            target={src.kind === "podcast" ? "_blank" : undefined}
            className="hover:opacity-80"
          >
            {pill}
          </Link>
        ) : (
          pill
        )
      );
    } else {
      parts.push(m[0]);
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function TutorClient() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;

    const userMsg: ChatMessage = {
      id: `u${Date.now()}`,
      role: "user",
      content: q,
    };
    const asstId = `a${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: asstId, role: "assistant", content: "", streaming: true },
    ]);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/academy/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      if (!res.body) throw new Error("no stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      const update = (patch: Partial<ChatMessage>) =>
        setMessages((prev) =>
          prev.map((m) => (m.id === asstId ? { ...m, ...patch } : m))
        );
      const append = (text: string) =>
        setMessages((prev) =>
          prev.map((m) =>
            m.id === asstId ? { ...m, content: m.content + text } : m
          )
        );

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const json = trimmed.slice(5).trim();
          if (!json) continue;
          try {
            const ev = JSON.parse(json) as {
              type: string;
              sources?: ChatSource[];
              text?: string;
              message?: string;
            };
            if (ev.type === "sources") update({ sources: ev.sources });
            else if (ev.type === "token" && ev.text) append(ev.text);
            else if (ev.type === "error") update({ error: ev.message });
            else if (ev.type === "done") update({ streaming: false });
          } catch {
            /* ignore partial frame */
          }
        }
      }
      update({ streaming: false });
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === asstId
            ? {
                ...m,
                streaming: false,
                error: err instanceof Error ? err.message : "request failed",
              }
            : m
        )
      );
    } finally {
      setBusy(false);
    }
  }

  const empty = messages.length === 0;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      {/* Thread */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
        {empty ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <p className="mt-4 font-heading text-lg font-semibold text-foreground">
              Ask Dr Pearce&rsquo;s corpus anything
            </p>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Every answer is grounded in the actual transcripts and cites the
              exact video moment. If it isn&rsquo;t in his material, it&rsquo;ll
              tell you.
            </p>
            <div className="mt-6 grid w-full max-w-xl gap-2 sm:grid-cols-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="rounded-lg bg-background px-3.5 py-2.5 text-left text-sm text-foreground ring-1 ring-foreground/10 transition-colors hover:bg-primary/5 hover:ring-primary/30"
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
                <AssistantBubble key={m.id} message={m} />
              )
            )}
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-border bg-muted/30 p-3 sm:p-4">
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
            placeholder="Ask about technique, safety, anatomy, dosing…"
            className="max-h-32 flex-1 resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none ring-primary/30 placeholder:text-muted-foreground focus:ring-2"
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
        <p className="mt-2 flex items-center gap-1.5 px-1 text-[11px] text-muted-foreground">
          <ShieldCheck className="h-3 w-3" />
          Educational reference for qualified injectors · grounded in cited
          transcripts, not medical advice.
        </p>
      </div>
    </div>
  );
}

function AssistantBubble({ message }: { message: ChatMessage }) {
  const { content, sources, streaming, error } = message;
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="prose-sm max-w-none text-sm leading-relaxed text-foreground">
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
          <p className="mt-2 text-xs text-red-600 dark:text-red-400">
            Couldn&rsquo;t generate an answer ({error}).
          </p>
        )}

        {/* Sources panel */}
        {sources && sources.length > 0 && !streaming && (
          <div className="mt-3 rounded-lg border border-border bg-background/60 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Sources ({sources.length})
            </p>
            <div className="mt-2 space-y-1.5">
              {sources.map((s) => {
                const href = sourceHref(s);
                const inner = (
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary">
                      {s.kind === "video" ? (
                        <Play className="h-2.5 w-2.5 fill-current" />
                      ) : (
                        <Podcast className="h-2.5 w-2.5" />
                      )}
                      {s.id}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-foreground">
                        {s.title}
                      </p>
                      <p className="truncate text-[11px] text-muted-foreground">
                        {s.kind === "video"
                          ? `Dr Tim Pearce · ${s.meta ?? (s.start != null ? fmt(s.start) : "")}`
                          : `Podcast · ${s.meta ?? ""}`}
                      </p>
                    </div>
                    {href && (
                      <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    )}
                  </div>
                );
                return href ? (
                  <Link
                    key={s.id}
                    href={href}
                    target={s.kind === "podcast" ? "_blank" : undefined}
                    className="block rounded-md p-1.5 transition-colors hover:bg-primary/5"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={s.id} className="p-1.5">
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
