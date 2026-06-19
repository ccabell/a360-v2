"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { GroundedAnswer } from "@/components/grounding/grounded-answer";
import { KeyPointsCard } from "@/components/grounding/key-points-card";
import type { RetrievedSource, ResearchCitation } from "@/lib/types/retrieval";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Exchange {
  id: string;
  query: string;
  /** Streamed answer text */
  answer: string;
  sources: RetrievedSource[];
  citations: ResearchCitation[];
  displayMap: Record<string, number>;
  keyPoints: string[];
  followUps: string[];
  streaming: boolean;
  error?: string;
}

// ── Suggested starter questions ────────────────────────────────────────────────

const STARTERS = [
  "What are the best treatments for submental fullness?",
  "Compare Sculptra vs Radiesse for facial volume",
  "What does clinical literature say about neurotoxin longevity?",
  "Which fillers are FDA-approved for lip augmentation?",
  "What podcast experts say about patient consultation language",
];

// ── Chat Page ─────────────────────────────────────────────────────────────────

export default function ChatPage() {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [exchanges]);

  const submit = useCallback(
    async (query: string) => {
      const q = query.trim();
      if (!q || streaming) return;

      setInput("");
      setStreaming(true);

      const id = `exchange_${Date.now()}`;
      const newExchange: Exchange = {
        id,
        query: q,
        answer: "",
        sources: [],
        citations: [],
        displayMap: {},
        keyPoints: [],
        followUps: [],
        streaming: true,
      };
      setExchanges((prev) => [...prev, newExchange]);

      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const res = await fetch("/api/research/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: ctrl.signal,
          body: JSON.stringify({ query: q }),
        });

        if (!res.ok) {
          const msg = `Request failed (${res.status})`;
          setExchanges((prev) =>
            prev.map((e) =>
              e.id === id ? { ...e, streaming: false, error: msg } : e,
            ),
          );
          setStreaming(false);
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) {
          setExchanges((prev) =>
            prev.map((e) =>
              e.id === id
                ? { ...e, streaming: false, error: "No response stream" }
                : e,
            ),
          );
          setStreaming(false);
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";
        let answerAcc = "";

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

            if (type === "sources") {
              const srcs = event.sources as RetrievedSource[];
              setExchanges((prev) =>
                prev.map((e) =>
                  e.id === id ? { ...e, sources: srcs } : e,
                ),
              );
            } else if (type === "token") {
              answerAcc += event.text as string;
              const ans = answerAcc;
              setExchanges((prev) =>
                prev.map((e) =>
                  e.id === id ? { ...e, answer: ans } : e,
                ),
              );
            } else if (type === "citations") {
              const cits = event.citations as ResearchCitation[];
              const dm = event.displayMap as Record<string, number>;
              setExchanges((prev) =>
                prev.map((e) =>
                  e.id === id
                    ? { ...e, citations: cits, displayMap: dm }
                    : e,
                ),
              );
            } else if (type === "done") {
              const followUps = (event.followUps as string[]) ?? [];
              const keyPoints = (event.keyPoints as string[]) ?? [];
              setExchanges((prev) =>
                prev.map((e) =>
                  e.id === id
                    ? { ...e, streaming: false, followUps, keyPoints }
                    : e,
                ),
              );
              setStreaming(false);
            } else if (type === "error") {
              const msg = (event.message as string) ?? "Error";
              setExchanges((prev) =>
                prev.map((e) =>
                  e.id === id
                    ? { ...e, streaming: false, error: msg }
                    : e,
                ),
              );
              setStreaming(false);
            }
          }
        }
      } catch (err) {
        if ((err as { name?: string }).name !== "AbortError") {
          const msg = err instanceof Error ? err.message : "Network error";
          setExchanges((prev) =>
            prev.map((e) =>
              e.id === id ? { ...e, streaming: false, error: msg } : e,
            ),
          );
        }
        setStreaming(false);
      }
    },
    [streaming],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(input);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="shrink-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground leading-none">
              Evidence Chat
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Grounded answers from PubMed, GL fuel docs, podcasts & training videos
            </p>
          </div>
        </div>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="max-w-3xl mx-auto px-6 py-6 space-y-10">
          {exchanges.length === 0 && (
            /* Empty state */
            <div className="flex flex-col items-center justify-center min-h-[40vh] text-center gap-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Ask anything about aesthetics
                </h2>
                <p className="text-sm text-muted-foreground mt-1.5 max-w-md">
                  Grounded answers from PubMed literature, GL fuel documents, expert podcasts, and manufacturer training videos.
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full max-w-lg">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => submit(s)}
                    className="flex items-center gap-3 w-full rounded-xl border border-border/60 bg-card px-4 py-3 text-left text-sm text-foreground/80 hover:bg-muted/50 hover:text-foreground hover:border-primary/30 transition-all group"
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0" />
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {exchanges.map((ex) => (
            <div key={ex.id} className="space-y-6">
              {/* User query */}
              <div className="flex justify-end">
                <div className="max-w-xl rounded-2xl rounded-tr-sm bg-primary px-4 py-3">
                  <p className="text-sm text-primary-foreground leading-relaxed">
                    {ex.query}
                  </p>
                </div>
              </div>

              {/* AI response */}
              <div className="space-y-4">
                {ex.error ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-800/50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                    {ex.error}
                  </div>
                ) : (
                  <>
                    {/* Key points (shown after streaming) */}
                    {!ex.streaming && ex.keyPoints.length > 0 && (
                      <KeyPointsCard
                        keyPoints={ex.keyPoints}
                        displayMap={ex.displayMap}
                        citations={ex.citations}
                      />
                    )}

                    {/* Streaming indicator before first token */}
                    {ex.streaming && !ex.answer && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Searching sources…
                      </div>
                    )}

                    {/* Answer with inline citations */}
                    {ex.answer && (
                      <div className="rounded-xl border border-border bg-card px-5 py-5">
                        <GroundedAnswer
                          text={ex.answer}
                          citations={ex.citations.length > 0 ? ex.citations : undefined}
                          displayMap={ex.citations.length > 0 ? ex.displayMap : undefined}
                          sources={ex.citations.length === 0 && ex.sources.length > 0 ? ex.sources : undefined}
                          defaultRefsExpanded={false}
                        />
                        {ex.streaming && (
                          <span className="inline-block h-4 w-0.5 bg-primary animate-pulse ml-0.5 align-middle" />
                        )}
                      </div>
                    )}

                    {/* Follow-up suggestions */}
                    {!ex.streaming && ex.followUps.length > 0 && (
                      <div className="space-y-1.5">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Follow-up questions
                        </p>
                        <div className="flex flex-col gap-1.5">
                          {ex.followUps.map((fu) => (
                            <button
                              key={fu}
                              onClick={() => submit(fu)}
                              disabled={streaming}
                              className="flex items-center gap-2 rounded-lg border border-border/60 bg-background px-3 py-2 text-left text-sm text-foreground/75 hover:bg-muted/50 hover:text-foreground hover:border-primary/30 transition-all disabled:opacity-50 group"
                            >
                              <ArrowRight className="h-3 w-3 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
                              {fu}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="shrink-0 border-t border-border bg-background/95 backdrop-blur px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-3 items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={streaming}
              placeholder="Ask about treatments, clinical evidence, products…"
              className="flex-1 h-10 rounded-lg border border-border bg-background px-4 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
            />
            <Button
              onClick={() => submit(input)}
              disabled={!input.trim() || streaming}
              size="icon"
              className="h-10 w-10 shrink-0"
            >
              {streaming ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground/50 mt-2 text-center">
            Grounded from PubMed · GL Fuel Docs · Expert Podcasts · Training Videos
          </p>
        </div>
      </div>
    </div>
  );
}
