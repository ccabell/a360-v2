"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowUp,
  Loader2,
  Sparkles,
  AlertCircle,
  Bookmark,
  Check,
} from "lucide-react";
import type {
  RetrievedSource,
  ResearchCitation,
  ResearchStage,
  ResearchEvent,
} from "@/lib/types/retrieval";
import { EXAMPLE_QUERIES } from "@/lib/retrieval/stream";
import { StatusIndicator } from "@/components/research/status-indicator";
import { SourcePill } from "@/components/grounding/source-pill";
import { GroundedAnswer } from "@/components/grounding/grounded-answer";
import { AskSuggestionChips } from "./ask-suggestion-chips";
import { KeyPointsCard } from "@/components/grounding/key-points-card";

export type AskVariant = "dashboard" | "public" | "embed";

export interface VerbGroup {
  verb: string;
  items: { query: string }[];
}

export interface AskExperienceProps {
  endpoint: string;
  variant: AskVariant;
  initialQuery?: string;
  autoSubmitInitial?: boolean;
  suggestions?: VerbGroup[];
  showSave?: boolean;
  showTierLegend?: boolean;
  placeholder?: string;
  // embed bridge hooks (no-ops unless provided):
  onAskSent?: (m: { messageId: string; ts: number }) => void;
  onAnswerComplete?: (m: { messageId: string; citationsCount: number }) => void;
  onCitationClick?: (m: { url: string; tier: string }) => void;
}

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
  followUps?: string[];
  keyPoints?: string[];
}
type ChatMessage = UserMessage | AssistantMessage;

async function* streamFrom(
  endpoint: string,
  query: string,
  surface?: string,
): AsyncGenerator<ResearchEvent> {
  const body: Record<string, string> = { query };
  if (surface) body.surface = surface;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok || !res.body) {
    yield {
      type: "error",
      code: "request_failed",
      message: `HTTP ${res.status}`,
      retryable: true,
    };
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf("\n\n")) !== -1) {
      const raw = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);
      const line = raw.startsWith("data:") ? raw.slice(5).trim() : raw.trim();
      if (!line) continue;
      try {
        yield JSON.parse(line) as ResearchEvent;
      } catch {
        // ignore malformed frames
      }
    }
  }
}

export function AskExperience({
  endpoint,
  variant,
  initialQuery,
  autoSubmitInitial,
  suggestions,
  showSave,
  showTierLegend,
  placeholder = "Ask a clinical research question…",
  onAskSent,
  onAnswerComplete,
  onCitationClick,
}: AskExperienceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState(initialQuery ?? "");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [showSources, setShowSources] = useState(true);
  const idRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const didAutoSubmit = useRef(false);
  const lastCitationsRef = useRef<ResearchCitation[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Autofocus on desktop only (skip to avoid keyboard pop on mobile)
    if (variant !== "embed" && !window.matchMedia("(max-width: 768px)").matches) {
      inputRef.current?.focus();
    }
    if (autoSubmitInitial && initialQuery && !didAutoSubmit.current) {
      didAutoSubmit.current = true;
      send(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function saveAnswer(m: AssistantMessage, question: string) {
    if (savingId || saved[m.id]) return;
    setSavingId(m.id);
    try {
      const res = await fetch("/api/saved-outputs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          output_type: "research_chat",
          question,
          answer_prose: m.text,
          citations: m.citations,
        }),
      });
      if (res.ok) setSaved((s) => ({ ...s, [m.id]: true }));
    } finally {
      setSavingId(null);
    }
  }

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
    lastCitationsRef.current = [];

    onAskSent?.({ messageId: asstId, ts: Date.now() });

    const patch = (fn: (m: AssistantMessage) => AssistantMessage) =>
      setMessages((prev) =>
        prev.map((m) =>
          m.id === asstId && m.role === "assistant" ? fn(m) : m,
        ),
      );

    const surface =
      variant === "embed" ? "embed" : variant === "public" ? "public" : undefined;

    try {
      for await (const ev of streamFrom(endpoint, q, surface)) {
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
            lastCitationsRef.current = ev.citations;
            patch((m) => ({
              ...m,
              citations: ev.citations,
              displayMap: ev.displayMap,
            }));
            break;
          case "done":
            patch((m) => ({
              ...m,
              done: true,
              stage: null,
              followUps: ev.followUps,
              keyPoints: ev.keyPoints,
            }));
            onAnswerComplete?.({
              messageId: asstId,
              citationsCount: lastCitationsRef.current.length,
            });
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

  // T3 — passive citation click instrumentation (no-op unless onCitationClick provided)
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onCitationClick) return;
    const anchor = (e.target as HTMLElement).closest("a");
    if (anchor?.href) {
      onCitationClick({ url: anchor.href, tier: "citation" });
    }
  };

  const empty = messages.length === 0;

  return (
    <div
      className={`flex h-full flex-col${variant === "embed" ? " bg-transparent" : ""}`}
      onClick={handleContainerClick}
    >
      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div
          className={
            variant === "embed"
              ? "mx-auto w-full max-w-[720px] px-4 py-4"
              : "mx-auto max-w-3xl px-6 py-6"
          }
        >
          {empty ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              {variant === "dashboard" ? (
                <>
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
                </>
              ) : suggestions ? (
                <AskSuggestionChips suggestions={suggestions} onSelect={send} />
              ) : null}
            </div>
          ) : (
            <div className="space-y-8">
              {messages.map((m, i) =>
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

                    {/* Source count bar */}
                    {m.sources.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                          <span className="text-sm font-medium text-foreground">
                            {m.sources.length} sources found
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowSources((v) => !v)}
                            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                          >
                            {showSources ? "Hide sources" : "View sources"}
                          </button>
                        </div>
                        {showSources && (
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
                        )}
                      </div>
                    )}

                    {/* Answer + resolved references */}
                    {m.text && (
                      <>
                        {showTierLegend && m.citations.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            Color = source authority:&nbsp;
                            <span className="inline-flex items-center gap-2">
                              <span className="inline-flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-tier-trusted-bg border border-tier-trusted-fg/30" />
                                FDA / Manufacturer
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-tier-evidence-bg border border-tier-evidence-fg/30" />
                                Research / Practice
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-tier-general-bg border border-tier-general-fg/30" />
                                Industry / Media
                              </span>
                            </span>
                          </p>
                        )}
                        {m.done && m.keyPoints && m.keyPoints.length > 0 && (
                          <KeyPointsCard
                            keyPoints={m.keyPoints}
                            displayMap={m.displayMap}
                            citations={m.citations}
                          />
                        )}
                        <GroundedAnswer
                          text={m.text}
                          displayMap={m.displayMap}
                          citations={m.citations}
                          defaultRefsExpanded={variant !== "embed"}
                        />
                      </>
                    )}

                    {/* Follow-up suggestion chips */}
                    {m.done && m.followUps && m.followUps.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {m.followUps.map((fu) => (
                          <button
                            key={fu}
                            onClick={() => send(fu)}
                            disabled={busy}
                            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary/50 hover:bg-muted disabled:opacity-50"
                          >
                            {fu}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Save to history (dashboard only) */}
                    {showSave && m.done && m.text && (
                      <button
                        onClick={() =>
                          saveAnswer(
                            m,
                            i > 0 && messages[i - 1].role === "user"
                              ? (messages[i - 1] as UserMessage).text
                              : "",
                          )
                        }
                        disabled={savingId === m.id || saved[m.id]}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground disabled:opacity-60"
                      >
                        {saved[m.id] ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-primary" />
                            Saved to history
                          </>
                        ) : (
                          <>
                            <Bookmark className="h-3.5 w-3.5" />
                            {savingId === m.id ? "Saving…" : "Save answer"}
                          </>
                        )}
                      </button>
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
        <div
          className={`flex gap-3 ${
            variant === "embed"
              ? "mx-auto w-full max-w-[720px] px-4 py-4"
              : "mx-auto max-w-3xl px-6 py-4"
          }`}
        >
          <Input
            ref={inputRef}
            placeholder={
              messages.length > 0
                ? "Ask a follow-up question…"
                : placeholder
            }
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
          <Button
            onClick={() => send(input)}
            disabled={busy || !input.trim()}
            size="icon"
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
