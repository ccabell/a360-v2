"use client";

import { useState } from "react";
import { ChevronDown, ListIcon } from "lucide-react";
import { ReferenceCard } from "./reference-card";
import { Citation } from "./types";

interface ReferencesSectionProps {
  citations: Citation[];
  defaultExpanded?: boolean;
  onExpandChange?: (expanded: boolean) => void;
}

export function ReferencesSection({
  citations,
  defaultExpanded = true,
  onExpandChange,
}: ReferencesSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = (expanded: boolean) => {
    setIsExpanded(expanded);
    onExpandChange?.(expanded);
  };

  if (citations.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 border-t border-border pt-4">
      <button
        onClick={() => handleToggle(!isExpanded)}
        className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3 hover:text-foreground/80 transition-colors"
      >
        <ListIcon className="h-4 w-4" />
        References ({citations.length})
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="space-y-3">
          {citations.map((citation) => (
            <ReferenceCard
              key={citation.id}
              citation={citation}
              number={citation.number}
            />
          ))}
        </div>
      )}
    </div>
  );
}
