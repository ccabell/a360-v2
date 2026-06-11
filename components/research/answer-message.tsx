import type { ResearchCitation } from "@/lib/types/retrieval";
import { InlineCitation, PendingCitation } from "./inline-citation";

interface AnswerMessageProps {
  text: string;
  displayMap?: Record<string, number>; // retrievalId -> display number
  citations?: ResearchCitation[];
}

/**
 * Renders streamed answer text. Each [src_N] marker becomes either a numbered
 * citation badge (once the post-processor has resolved it) or a pending
 * placeholder (while tokens are still streaming).
 */
export function AnswerMessage({ text, displayMap, citations }: AnswerMessageProps) {
  const byNumber = new Map((citations ?? []).map((c) => [c.number, c]));
  const paragraphs = text.split(/\n\n+/);

  return (
    <div className="space-y-3 text-sm leading-relaxed text-foreground">
      {paragraphs.map((para, pi) => {
        const parts = para.split(/(\[src_\d+\])/);
        return (
          <p key={pi}>
            {parts.map((part, i) => {
              const m = part.match(/^\[(src_\d+)\]$/);
              if (!m) return <span key={i}>{part}</span>;

              const id = m[1];
              const number = displayMap?.[id];
              if (number == null) return <PendingCitation key={i} />;

              const cite = byNumber.get(number);
              return (
                <InlineCitation
                  key={i}
                  number={number}
                  title={cite?.title}
                  corpus={cite?.corpus}
                />
              );
            })}
          </p>
        );
      })}
    </div>
  );
}
