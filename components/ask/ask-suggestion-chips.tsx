"use client";

import { useState } from "react";
import type { VerbGroup } from "./ask-experience";

interface AskSuggestionChipsProps {
  suggestions: VerbGroup[];
  onSelect: (query: string) => void;
}

export function AskSuggestionChips({ suggestions, onSelect }: AskSuggestionChipsProps) {
  const [activeVerb, setActiveVerb] = useState<string | null>(null);
  const active = suggestions.find((g) => g.verb === activeVerb);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {suggestions.map((g) => (
          <button
            key={g.verb}
            onClick={() => setActiveVerb(activeVerb === g.verb ? null : g.verb)}
            className="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {g.verb}
          </button>
        ))}
      </div>
      {active && (
        <div className="flex flex-wrap gap-2">
          {active.items.map((item) => (
            <button
              key={item.query}
              onClick={() => onSelect(item.query)}
              className="rounded-md border border-primary/30 bg-primary/5 px-3 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-primary/10"
            >
              {item.query}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
