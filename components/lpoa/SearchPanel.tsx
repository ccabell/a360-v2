"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  BookOpen,
  Sparkles,
  ExternalLink,
  User,
  RotateCcw,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAISearch } from "../../lib/useAISearch";
import type { PatientInfo } from "../../lib/useAISearch";
import { activeDevice } from "../../lib/lpoa/devices/gentlemax-pro";

const SUGGESTED_QUESTIONS = activeDevice.suggestedQuestions;

// Turn inline "[Page 73]" / "[Pages 74–75]" / "[Pages 77, 105, 154]" citations
// into markdown links (#lpoa-page-N) so each page number becomes clickable.
function linkifyPageCitations(md: string): string {
  return md.replace(/\[Pages?\s+([0-9][0-9,\s–\-—]*)\]/g, (_m, nums: string) => {
    const pages = nums.match(/\d+/g) ?? [];
    if (pages.length === 0) return _m;
    const links = pages.map((p) => `[p.${p}](#lpoa-page-${p})`).join(" · ");
    return `(${links})`;
  });
}

/** Assistant message body: GFM markdown with clickable page citations. */
function MarkdownMessage({
  content,
  onJumpToPage,
}: {
  content: string;
  onJumpToPage: (page: number) => void;
}) {
  return (
    <div className="lpoa-md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            const m = /^#lpoa-page-(\d+)$/.exec(href ?? "");
            if (m) {
              const page = Number(m[1]);
              return (
                <button
                  onClick={() => onJumpToPage(page)}
                  title={`Open manual page ${page}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 3,
                    padding: "0 6px",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 600,
                    lineHeight: "18px",
                    background: "var(--secondary)",
                    color: "var(--primary)",
                    border: "1px solid var(--border)",
                    cursor: "pointer",
                    verticalAlign: "baseline",
                  }}
                >
                  <BookOpen size={9} />
                  {children}
                </button>
              );
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>
                {children}
              </a>
            );
          },
          h1: ({ children }) => <p style={{ fontSize: 13.5, fontWeight: 700, margin: "10px 0 4px" }}>{children}</p>,
          h2: ({ children }) => <p style={{ fontSize: 13, fontWeight: 700, margin: "10px 0 4px" }}>{children}</p>,
          h3: ({ children }) => <p style={{ fontSize: 12.5, fontWeight: 700, margin: "8px 0 3px" }}>{children}</p>,
          p: ({ children }) => <p style={{ margin: "4px 0", lineHeight: 1.6 }}>{children}</p>,
          ul: ({ children }) => <ul style={{ margin: "4px 0", paddingLeft: 18, display: "flex", flexDirection: "column", gap: 3 }}>{children}</ul>,
          ol: ({ children }) => <ol style={{ margin: "4px 0", paddingLeft: 18, display: "flex", flexDirection: "column", gap: 3 }}>{children}</ol>,
          li: ({ children }) => <li style={{ lineHeight: 1.55 }}>{children}</li>,
          hr: () => <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "10px 0" }} />,
          table: ({ children }) => (
            <div style={{ overflowX: "auto", margin: "6px 0" }}>
              <table style={{ borderCollapse: "collapse", fontSize: 12, width: "100%" }}>{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th style={{ border: "1px solid var(--border)", padding: "4px 8px", background: "var(--muted)", textAlign: "left", fontWeight: 600 }}>{children}</th>
          ),
          td: ({ children }) => <td style={{ border: "1px solid var(--border)", padding: "4px 8px" }}>{children}</td>,
          code: ({ children }) => (
            <code style={{ background: "var(--muted)", borderRadius: 4, padding: "1px 5px", fontSize: 12 }}>{children}</code>
          ),
        }}
      >
        {linkifyPageCitations(content)}
      </ReactMarkdown>
    </div>
  );
}

interface SearchPanelProps {
  onJumpToPage: (page: number) => void;
  patient?: PatientInfo | null;
}

export function SearchPanel({
  onJumpToPage,
  patient = null,
}: SearchPanelProps) {
  const {
    messages,
    isLoading,
    error,
    sendMessage: aiSend,
    clearMessages,
  } = useAISearch(patient);

  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isLoading) return;

    setInput("");
    console.log("Sending query:", text);
    aiSend(text);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles size={14} style={{ color: "var(--primary)" }} />
          <h2
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "var(--foreground)",
            }}
          >
            Manual Search
          </h2>

          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="flex items-center gap-1 rounded transition-colors ml-auto"
              style={{
                padding: "4px 8px",
                fontSize: 11,
                color: "var(--muted-foreground)",
                border: "1px solid var(--border)",
              }}
            >
              <RotateCcw size={10} />
              New chat
            </button>
          )}
        </div>
        <p
          style={{
            fontSize: 12,
            color: "var(--muted-foreground)",
            marginTop: 2,
          }}
        >
          Ask questions about the clinical manual
        </p>

        {/* Patient context badge */}
        {patient && (
          <div
            className="flex items-center gap-1.5 rounded-lg mt-3"
            style={{
              padding: "6px 10px",
              background: "var(--muted)",
              border: "1px solid var(--border)",
              fontSize: 11,
            }}
          >
            <User
              size={11}
              style={{
                color: "var(--primary)",
                flexShrink: 0,
              }}
            />

            <span style={{ color: "var(--muted-foreground)" }}>
              Answering for:
            </span>

            <span
              style={{
                fontWeight: 600,
                color: "var(--foreground)",
              }}
            >
              {patient.name}
            </span>

            <span style={{ color: "var(--muted-foreground)" }}>
              · {patient.age}y · {patient.sex}
            </span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {messages.length === 0 && (
          <div className="flex flex-col gap-2">
            <p
              style={{
                fontSize: 12,
                color: "var(--muted-foreground)",
                marginBottom: 4,
              }}
            >
              Suggested questions
            </p>
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-left rounded-lg border border-border transition-colors"
                style={{
                  padding: "8px 12px",
                  fontSize: 12,
                  color: "var(--foreground)",
                  background: "var(--card)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "var(--card)")
                }
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className="rounded-xl max-w-full"
              style={{
                padding: "10px 14px",
                fontSize: 13,
                background:
                  msg.role === "user" ? "var(--primary)" : "var(--card)",
                color:
                  msg.role === "user"
                    ? "var(--primary-foreground)"
                    : "var(--foreground)",
                border:
                  msg.role === "assistant" ? "1px solid var(--border)" : "none",
                lineHeight: 1.6,
              }}
            >
              {msg.role === "assistant" ? (
                <MarkdownMessage content={msg.content} onJumpToPage={onJumpToPage} />
              ) : (
                msg.content
              )}
            </div>
            {msg.citations && msg.citations.length > 0 && (
              <div className="flex flex-wrap gap-1.5 w-full">
                {msg.citations.map((cite, ci) => (
                  <button
                    key={`${cite.label}-${cite.page}-${ci}`}
                    onClick={() => onJumpToPage(cite.page)}
                    className="flex items-center gap-1 rounded transition-colors"
                    style={{
                      padding: "3px 8px",
                      fontSize: 11,
                      background: "var(--secondary)",
                      color: "var(--secondary-foreground)",
                      border: "1px solid var(--border)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "var(--secondary)")
                    }
                  >
                    <BookOpen size={10} />
                    <span>
                      {cite.label} — {cite.section}
                    </span>
                    <span style={{ color: "var(--muted-foreground)" }}>
                      p.{cite.page}
                    </span>
                    <ExternalLink size={9} />
                  </button>
                ))}
              </div>
            )}
            {msg.followups && msg.followups.length > 0 && (
              <div className="flex flex-col gap-1.5 w-full" style={{ marginTop: 4 }}>
                <div className="flex items-center gap-1" style={{ fontSize: 11, color: "var(--muted-foreground)" }}>
                  <MessageCircle size={10} />
                  <span>Follow-up questions</span>
                </div>
                {msg.followups.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    disabled={isLoading}
                    className="text-left rounded-lg border border-border transition-colors"
                    style={{
                      padding: "6px 10px",
                      fontSize: 12,
                      color: "var(--foreground)",
                      background: "var(--card)",
                      opacity: isLoading ? 0.5 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!isLoading) e.currentTarget.style.background = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--card)";
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{
                    background: "var(--muted-foreground)",
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontSize: 11,
                color: "var(--muted-foreground)",
              }}
            >
              Searching manual…
            </span>
          </div>
        )}

        {error && (
          <div
            className="rounded-lg flex items-start gap-2"
            style={{
              padding: "10px 12px",
              fontSize: 12,
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.3)",
            }}
          >
            <AlertCircle
              size={13}
              style={{
                color: "#ef4444",
                flexShrink: 0,
                marginTop: 1,
              }}
            />

            <span>{error}</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border">
        <div className="flex gap-2 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Ask about the manual..."
            rows={1}
            className="flex-1 resize-none rounded-lg border border-border outline-none transition-colors"
            style={{
              padding: "8px 12px",
              fontSize: 13,
              background: "var(--input-background)",
              color: "var(--foreground)",
              maxHeight: 100,
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="rounded-lg flex items-center justify-center transition-opacity"
            style={{
              width: 36,
              height: 36,
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              flexShrink: 0,
              opacity: !input.trim() || isLoading ? 0.4 : 1,
            }}
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
