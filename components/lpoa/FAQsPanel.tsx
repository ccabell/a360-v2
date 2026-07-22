"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, ExternalLink } from "lucide-react";
import { activeDevice } from "../../lib/lpoa/devices/gentlemax-pro";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  page: number;
  section: string;
  tags: string[];
}

const FAQS: FAQ[] = activeDevice.faqs.map((f, i) => ({
  id: `f${i + 1}`,
  question: f.question,
  answer: f.answer,
  page: f.page,
  section: f.section ?? "",
  tags: f.tags,
}));

interface FAQCardProps {
  faq: FAQ;
  onJumpToPage: (page: number) => void;
}

function FAQCard({ faq, onJumpToPage }: FAQCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl border border-border transition-all"
      style={{ background: "var(--card)", overflow: "visible" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-3 text-left transition-colors"
        style={{ padding: "14px 16px" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = open
            ? "transparent"
            : "var(--accent)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--foreground)",
            lineHeight: 1.5,
          }}
        >
          {faq.question}
        </p>
        <div
          style={{
            flexShrink: 0,
            marginTop: 2,
            color: "var(--muted-foreground)",
          }}
        >
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {open && (
        <div style={{ borderTop: "1px solid var(--border)" }}>
          <div style={{ padding: "12px 16px" }}>
            <p
              style={{
                fontSize: 13,
                color: "var(--muted-foreground)",
                lineHeight: 1.7,
              }}
            >
              {faq.answer}
            </p>
          </div>

          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex flex-wrap gap-1">
              {faq.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md px-2 py-0.5"
                  style={{
                    fontSize: 10,
                    background: "var(--muted)",
                    color: "var(--muted-foreground)",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => onJumpToPage(faq.page)}
              className="flex items-center gap-1.5 rounded-md border border-border transition-colors"
              style={{
                padding: "4px 10px",
                fontSize: 11,
                color: "var(--muted-foreground)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <BookOpen size={11} />
              {faq.section} — p.{faq.page}
              <ExternalLink size={10} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface FAQsPanelProps {
  onJumpToPage: (page: number) => void;
}

export function FAQsPanel({ onJumpToPage }: FAQsPanelProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-border">
        <h2
          style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}
        >
          Frequently Asked Questions
        </h2>
        <p
          style={{
            fontSize: 12,
            color: "var(--muted-foreground)",
            marginTop: 2,
          }}
        >
          Click to expand · Jump to source section
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
        {FAQS.map((faq) => (
          <FAQCard key={faq.id} faq={faq} onJumpToPage={onJumpToPage} />
        ))}
      </div>
    </div>
  );
}
