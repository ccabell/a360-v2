"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Check, Loader2 } from "lucide-react";

const AGENT_STEPS = [
  { key: "package_recommender", label: "Package Recommender", duration: 600 },
  { key: "clinical_enrichment", label: "Clinical Enrichment", duration: 800 },
  { key: "post_consultation_orchestrator", label: "Orchestrator — Synthesizing", duration: 600 },
];

interface RunAgentButtonProps {
  onComplete: () => void;
  disabled?: boolean;
}

export function RunAgentButton({ onComplete, disabled }: RunAgentButtonProps) {
  const [running, setRunning] = useState(false);
  const [stepIdx, setStepIdx] = useState(-1);

  async function handleRun() {
    if (running) return;
    setRunning(true);
    setStepIdx(0);

    for (let i = 0; i < AGENT_STEPS.length; i++) {
      setStepIdx(i);
      await new Promise((r) => setTimeout(r, AGENT_STEPS[i].duration));
    }

    setStepIdx(AGENT_STEPS.length);
    await new Promise((r) => setTimeout(r, 300));
    setRunning(false);
    setStepIdx(-1);
    onComplete();
  }

  if (running) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          Running post-consultation analysis…
        </div>
        <div className="space-y-1.5">
          {AGENT_STEPS.map((step, i) => {
            const done = stepIdx > i;
            const active = stepIdx === i;
            return (
              <div
                key={step.key}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs transition-colors ${
                  active
                    ? "bg-primary/10 text-foreground"
                    : done
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50"
                }`}
              >
                {done ? (
                  <Check className="h-3 w-3 text-emerald-600" />
                ) : active ? (
                  <Loader2 className="h-3 w-3 animate-spin text-primary" />
                ) : (
                  <div className="h-3 w-3 rounded-full border border-muted-foreground/30" />
                )}
                <span className="font-mono">{step.key}</span>
                <span className="ml-auto">{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <Button onClick={handleRun} disabled={disabled} className="gap-2">
      <Bot className="h-4 w-4" />
      Run Post-Consultation Analysis
    </Button>
  );
}
