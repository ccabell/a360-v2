"use client";

import type { BlockColor } from "./BlockCard";

interface BlockConnectorProps {
  active: boolean;
  done: boolean;
  color: BlockColor;
}

const CONNECTOR_COLORS: Record<BlockColor, { line: string; dot: string }> = {
  blue:    { line: "bg-blue-500",    dot: "bg-blue-500"    },
  violet:  { line: "bg-violet-500",  dot: "bg-violet-500"  },
  teal:    { line: "bg-teal-500",    dot: "bg-teal-500"    },
  amber:   { line: "bg-amber-500",   dot: "bg-amber-500"   },
  emerald: { line: "bg-emerald-500", dot: "bg-emerald-500" },
  rose:    { line: "bg-rose-500",    dot: "bg-rose-500"    },
  indigo:  { line: "bg-indigo-500",  dot: "bg-indigo-500"  },
  orange:  { line: "bg-orange-500",  dot: "bg-orange-500"  },
};

export function BlockConnector({ active, done, color }: BlockConnectorProps) {
  const c = CONNECTOR_COLORS[color];

  return (
    <div className="flex flex-col items-center py-1" aria-hidden>
      <div className="relative flex flex-col items-center h-10 w-6">
        {/* Vertical line */}
        <div
          className={`w-px flex-1 transition-colors duration-300 ${
            active || done ? c.line : "bg-border border-dashed"
          }`}
          style={active || done ? {} : { borderLeft: "1px dashed var(--border)", width: 0 }}
        />

        {/* Center indicator */}
        {active && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full ${c.dot} animate-pulse`}
          />
        )}
        {done && (
          <div className="absolute top-1/2 -translate-y-1/2 flex h-4 w-4 items-center justify-center rounded-full bg-green-500/15">
            <svg
              className="h-2.5 w-2.5 text-green-500"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="2,6 5,9 10,3" />
            </svg>
          </div>
        )}
        {!active && !done && (
          /* Small downward arrow for idle */
          <div className="absolute top-1/2 -translate-y-1/2">
            <svg
              className="h-3 w-3 text-muted-foreground/40"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3,4 6,8 9,4" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
