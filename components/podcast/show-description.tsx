"use client";

import { useState } from "react";

export function ShowDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 200;

  return (
    <div className="mt-3 max-w-2xl">
      <p
        className={`text-sm leading-relaxed text-neutral-400 ${
          !expanded && isLong ? "line-clamp-3" : ""
        }`}
      >
        {text}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-xs font-medium text-primary hover:underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
