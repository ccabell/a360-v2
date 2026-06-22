"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepperItem {
  id: string;
  title: string;
}

export function Stepper({
  steps,
  current,
  accent = "#F5A623",
}: {
  steps: StepperItem[];
  current: number;
  accent?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={s.id} className="flex items-center gap-2">
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all",
                  done && "text-white",
                  active && "ring-2 ring-offset-2 ring-offset-background",
                  !done && !active && "bg-muted text-muted-foreground",
                )}
                style={
                  done
                    ? { background: accent }
                    : active
                      ? { background: `${accent}1a`, color: accent, ["--tw-ring-color" as string]: accent }
                      : undefined
                }
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-sm font-medium whitespace-nowrap",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {s.title}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="h-px w-8 mx-1"
                style={{ background: done ? accent : "var(--border)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
