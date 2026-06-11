import { Check } from "lucide-react";
import type { ResearchStage } from "@/lib/types/retrieval";

const STAGES: { key: ResearchStage; label: string }[] = [
  { key: "searching", label: "Searching corpora" },
  { key: "ranking", label: "Ranking & fusing" },
  { key: "generating", label: "Generating answer" },
];

export function StatusIndicator({ stage }: { stage: ResearchStage }) {
  const activeIndex = STAGES.findIndex((s) => s.key === stage);

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
      {STAGES.map((s, i) => {
        const done = i < activeIndex;
        const active = i === activeIndex;
        return (
          <div key={s.key} className="flex items-center gap-2">
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full ${
                done
                  ? "bg-primary text-primary-foreground"
                  : active
                    ? "border-2 border-primary border-t-transparent animate-spin"
                    : "border border-border"
              }`}
            >
              {done && <Check className="h-2.5 w-2.5" />}
            </span>
            <span
              className={
                active
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }
            >
              {s.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
