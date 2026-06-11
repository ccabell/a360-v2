"use client";

import { InlineCitationBadge } from "./inline-citation-badge";
import { ReferencesSection } from "./references-section";
import { Citation } from "./types";

interface MessageWithCitationsProps {
  message: string; // "Based on...[1] and...[2]"
  citations?: Citation[];
  role?: "user" | "agent";
  className?: string;
}

export function MessageWithCitations({
  message,
  citations = [],
  role = "agent",
  className = "",
}: MessageWithCitationsProps) {
  // Parse [1], [2], etc. and replace with clickable badges
  const renderMessageWithCitations = () => {
    const parts = message.split(/(\[\d+\])/);

    return parts.map((part, idx) => {
      const match = part.match(/\[(\d+)\]/);
      if (match) {
        const citationNum = parseInt(match[1]);
        const citation = citations.find((c) => c.number === citationNum);

        if (!citation) {
          return <span key={idx}>{part}</span>;
        }

        return (
          <InlineCitationBadge
            key={idx}
            number={citationNum}
            citation={citation}
          />
        );
      }

      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className={className}>
      <p className="text-foreground leading-relaxed">
        {renderMessageWithCitations()}
      </p>

      {citations.length > 0 && (
        <ReferencesSection citations={citations} defaultExpanded={false} />
      )}
    </div>
  );
}
