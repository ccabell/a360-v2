"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, AlertCircle } from "lucide-react";
import type {
  RetrievedSource,
  ResearchCitation,
  ResearchStage,
} from "@/lib/types/retrieval";
import { streamResearch } from "@/lib/mock/research-stream";
import { EXAMPLE_QUERIES } from "@/lib/mock/research-data";
import { StatusIndicator } from "./status-indicator";
import { SourcePill } from "@/components/grounding/source-pill";
import { GroundedAnswer } from "@/components/grounding/grounded-answer";

interface UserMessage {
  id: string;
  role: "user";
  text: string;
}
interface AssistantMessage {
  id: string;
  role: "assistant";
  stage: ResearchStage | null;
  sources: RetrievedSource[];
  text: string;
  citations: ResearchCitation[];
  displayMap: Record<string, number>;
  done: boolean;
  error?: string;
}
type ChatMessage = UserMessage | AssistantMessage;

export function ResearchChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const idRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(query: string) {
    const q = query.trim();
    if (!q || busy) return;

    const userId = `u_${++idRef.current}`;
    const asstId = `a_${++idRef.current}`;

    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", text: q },
      {
        id: asstId,
        role: "assistant",
        stage: "searching",
        sources: [],
        text: "",
        citations: [],
        displayMap: {},
        done: false,
      },
    ]);
    setInput("");
    setBusy(true);

    const patch = (fn: (m: AssistantMessage) => AssistantMessage) =>
      setMessages((prev) =>
        prev.map((m) =>
          m.id === asstId && m.role === "assistant" ? fn(m) : m,
        ),
      );

    try {
      for await (const ev of streamResearch(q)) {
        switch (ev.type) {
          case "status":
            patch((m) => ({ ...m, stage: ev.stage }));
            break;
          case "sources":
            patch((m) => ({ ...m, sources: ev.sources }));
            break;
          case "token":
            patch((m) => ({ ...m, text: m.text + ev.text }));
            break;
          case "citations":
            patch((m) => ({
              ...m,
              citations: ev.citations,
              displayMap: ev.displayMap,
            }));
            break;
          case "done":
            patch((m) => ({ ...m, done: true, stage: null }));
            break;
          case "error":
            patch((m) => ({ ...m, error: ev.message, done: true, stage: null }));
            break;
        }
      }
    } catch (e) {
      patch((m) => ({
        ...m,
        error: e instanceof Error ? e.message : "Stream failed",
        done: true,
        stage: null,
      }));
    } finally {
      setBusy(false);
    }
  }

  const empty = messages.length === 0;

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-6 py-6">
          {empty ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Evidence-grounded research
              </h3>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                Ask a clinical question. Answers cite live sources across
                research, video, podcasts, FDA labels, manufacturer docs, and
                your practice library — every claim links back to its origin.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                {EXAMPLE_QUERIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-lg border border-border bg-card px-4 py-2 text-left text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-muted"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {messages.map((m) =>
                m.role === "user" ? (
                  <div key={m.id} className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div key={m.id} className="space-y-4">
                    {/* Status */}
                    {m.stage && <StatusIndicator stage={m.stage} />}

                    {/* Error */}
                    {m.error && (
                      <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        {m.error}
                      </div>
                    )}

                    {/* Retrieved source pills */}
                    {m.sources.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Retrieved sources ({m.sources.length})
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {m.sources.map((s) => {
                            const number = m.displayMap[s.retrievalId];
                            const cited = number != null;
                            const resolved = m.citations.length > 0;
                            return (
                              <SourcePill
                                key={s.retrievalId}
                                source={s}
                                number={cited ? number : undefined}
                                dimmed={resolved && !cited}
                                onClick={
                                  cited
                                    ? () =>
                                        document
                                          .getElementById(`cite-${number}`)
                                          ?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                          })
                                    : undefined
                                }
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Answer + resolved references (shared, reusable for prompt outputs) */}
                    {m.text && (
                      <GroundedAnswer
                        text={m.text}
                        displayMap={m.displayMap}
                        citations={m.citations}
                      />
                    )}
                  </div>
                ),
              )}
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-3xl gap-3 px-6 py-4">
          <Input
            placeholder="Ask a clinical research question…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            disabled={busy}
            className="flex-1"
          />
          <Button onClick={() => send(input)} disabled={busy || !input.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
