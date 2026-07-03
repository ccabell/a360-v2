"use client";

import { useEffect, useState } from "react";
import { User, Clock, ShieldCheck, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoStepProps, DemoPatientCard } from "../types";

const VISIT_LABELS: Record<string, string> = {
  initial_consultation: "Initial Consultation",
  consultation_only: "Consultation",
  treatment_visit: "Treatment Visit",
  follow_up: "Follow-up",
};

/** Shared Step 1 — select a patient. Limited to 5, each with summary + visit. */
export function PatientPickerStep({ ctx, setCtx, goNext, agentKey }: DemoStepProps) {
  const [patients, setPatients] = useState<DemoPatientCard[]>([]);
  const [loading, setLoading] = useState(true);
  const selectedId = ctx.patient?.id ?? null;

  useEffect(() => {
    fetch("/api/demo-agents/patients")
      .then((r) => r.json())
      .then((j) => setPatients(j.data ?? []))
      .catch(() => setPatients([]))
      .finally(() => setLoading(false));
  }, []);

  function select(p: DemoPatientCard) {
    setCtx((c) => ({ ...c, patient: p }));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading patients…
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {patients.map((p) => {
          const active = selectedId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => select(p)}
              className={cn(
                "text-left rounded-xl border bg-card p-4 transition-all hover:shadow-md",
                active
                  ? "border-[color:var(--ot-accent)] ring-2 ring-[color:var(--ot-accent)]/30"
                  : "border-border hover:border-foreground/20",
              )}
              style={{ ["--ot-accent" as string]: "#F5A623" }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground leading-tight">{p.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {[p.age ? `${p.age}` : null, p.sex].filter(Boolean).join(" · ")}
                    </div>
                  </div>
                </div>
                {p.stageReadyFor?.includes(agentKey) && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                    <ShieldCheck className="h-3 w-3" /> STAGE-READY
                  </span>
                )}
              </div>

              {p.visitType && (
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: "#F5A6231a", color: "#F5A623" }}
                  >
                    {VISIT_LABELS[p.visitType] ?? p.visitType}
                  </span>
                  {p.durationMinutes && (
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3" /> {Math.round(p.durationMinutes)} min
                    </span>
                  )}
                </div>
              )}

              {p.visitDescription && (
                <p className="mt-2 text-sm text-foreground/80 line-clamp-2">{p.visitDescription}</p>
              )}
              {p.summary && (
                <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{p.summary}</p>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex justify-end">
        <button
          disabled={!selectedId}
          onClick={goNext}
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
          style={{ background: "#F5A623" }}
        >
          Continue <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
