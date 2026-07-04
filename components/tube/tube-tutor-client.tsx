"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Send, Square, Sparkles, Play, ShieldCheck, ArrowUpRight } from "lucide-react";

interface TubeSource {
  id: string;
  title: string;
  channel: string;
  text: string;
  videoId: string;
  start: number;
  url: string;
  meta: string;
}
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: TubeSource[];
  streaming?: boolean;
  error?: string;
}

const STARTERS = [
  "What's the safest way to treat the tear trough?",
  "How do I avoid and manage a vascular occlusion?",
  "Compare RF microneedling devices for skin tightening",
  "How is masseter Botox dosed for jaw slimming?",
];

// Module-level counter for message ids — avoids impure Date.now() calls during render.
let nextMsgId = 0;

function renderWithCitations(text: string, sources: TubeSource[]) {
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
          <Play className="h-2.5 w-2.5 fill-current" />
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

export function TubeTutorClient({
  videoId,
  starters,
}: { videoId?: string; starters?: string[] } = {}) {
  const starterList = starters ?? STARTERS;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    const asstId = `a${++nextMsgId}`;
    const userMsg: ChatMessage = { id: `u${++nextMsgId}`, role: "user", content: q };

    // Conversation-memory payload: role + content only, drop empty assistant
    // bubbles, cap to the last 8 turns (this includes the just-asked question).
    const payloadMessages = [...messages, userMsg]
      .filter((m) => m.role === "user" || m.content.trim().length > 0)
      .map((m) => ({ role: m.role, content: m.content }))
      .slice(-8);

    setMessages((prev) => [...prev, userMsg, { id: asstId, role: "assistant", content: "", streaming: true }]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;

    const update = (patch: Partial<ChatMessage>) =>
      setMessages((prev) => prev.map((m) => (m.id === asstId ? { ...m, ...patch } : m)));
    try {
      const res = await fetch("/api/tube/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages, ...(videoId ? { videoId } : {}) }),
        signal: controller.signal,
      });
      if (!res.ok) {
        let message = `Request failed (${res.status})`;
        try {
          const errBody = (await res.json()) as { error?: string };
          if (errBody.error) message = errBody.error;
        } catch {
          /* non-JSON error body */
        }
        update({ streaming: false, error: message });
        return;
      }
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
            const ev = JSON.parse(json) as { type: string; sources?: TubeSource[]; text?: string; message?: string };
            if (ev.type === "sources") update({ sources: ev.sources });
            else if (ev.type === "token" && ev.text)
              setMessages((prev) => prev.map((m) => (m.id === asstId ? { ...m, content: m.content + ev.text } : m)));
            else if (ev.type === "error") update({ error: ev.message });
            else if (ev.type === "done") update({ streaming: false });
          } catch {
            /* partial frame */
          }
        }
      }
      update({ streaming: false });
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        // User stopped generation — finalize with whatever streamed, not an error.
        update({ streaming: false });
      } else {
        update({ streaming: false, error: err instanceof Error ? err.message : "request failed" });
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  function stop() {
    abortRef.current?.abort();
  }

  const empty = messages.length === 0;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
        {empty ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <p className="mt-4 font-heading text-lg font-semibold text-white">Ask the video library anything</p>
            <p className="mt-1 max-w-md text-sm text-neutral-400">
              Answers are drawn from real aesthetics videos across the library and cite the exact
              moment — click any [S#] to jump to that second on YouTube.
            </p>
            <div className="mt-6 grid w-full max-w-xl gap-2 sm:grid-cols-2">
              {starterList.map((s) => (
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

      <div className="border-t border-white/10 bg-white/[0.02] p-3 sm:p-4">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                ask(input);
              }
            }}
            rows={1}
            placeholder="Ask about technique, devices, safety, dosing…"
            className="max-h-32 flex-1 resize-none overflow-y-auto rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white outline-none ring-primary/30 placeholder:text-neutral-500 focus:ring-2"
          />
          <button
            onClick={() => (busy ? stop() : ask(input))}
            disabled={!busy && !input.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            aria-label={busy ? "Stop generating" : "Send"}
          >
            {busy ? <Square className="h-4 w-4 fill-current" /> : <Send className="h-4 w-4" />}
          </button>
        </div>
        <p className="mt-2 flex items-center gap-1.5 px-1 text-[11px] text-neutral-500">
          <ShieldCheck className="h-3 w-3" />
          Educational reference · grounded in cited videos, not medical advice.
        </p>
      </div>
    </div>
  );
}

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
        {error && <p className="mt-2 text-xs text-red-400">Couldn&rsquo;t generate an answer ({error}).</p>}
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
                    <Play className="h-2.5 w-2.5 fill-current" />
                    {s.id}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-medium text-neutral-100">{s.title}</span>
                    <span className="block truncate text-[11px] text-neutral-500">{s.meta}</span>
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
