"use client";

import { useState } from "react";
import { ArrowLeft, Check, Copy, FileCheck2, CalendarClock, Sparkles } from "lucide-react";
import type { DemoStepProps } from "../types";
import { getPlan, getTcpState, patchTcp, includedLines, planTotals, usd, type PlanLine } from "./state";
import { unitLabel } from "@/lib/tcp/pricing";
import type { TcpPlan, TcpRunState } from "@/lib/tcp/types";

const ACCENT = "#F5A623";

/** Step 3 — review + finalize a clean, client-presentable care plan. */
export function FinalizeStep({ ctx, setCtx, goBack }: DemoStepProps) {
  const plan = getPlan(ctx);
  const state = getTcpState(ctx.data);
  const [copied, setCopied] = useState(false);
  if (!plan) return null;

  const lines = includedLines(plan, state);
  const totals = planTotals(plan, state);

  function finalize() {
    patchTcp(setCtx, (s) => ({ ...s, finalized: true }));
  }
  function copy() {
    navigator.clipboard?.writeText(buildPlanText(plan!, lines, totals, state));
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="-mt-2 space-y-4">
      {state.finalized && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200/60 bg-emerald-50/70 dark:bg-emerald-950/30 px-4 py-2.5">
          <FileCheck2 className="h-4 w-4 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
            Plan finalized — ready to present to {plan.patientName.split(" ")[0]}.
          </span>
        </div>
      )}

      {/* The care-plan document */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">Treatment &amp; Care Plan</h3>
          <p className="text-sm text-muted-foreground">
            {plan.patientName} · {plan.provider} · {plan.location} · {plan.visitDate}
          </p>
          {plan.context.deadline && (
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarClock className="h-3.5 w-3.5" style={{ color: ACCENT }} />
              {plan.context.primaryConcern} · timed for {plan.context.deadline.label.toLowerCase()}
            </p>
          )}
        </div>

        {/* Line items */}
        <div className="divide-y divide-border">
          {lines.map((l) => (
            <div key={l.rec.id} className="flex items-center justify-between px-5 py-2.5">
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground">{l.rec.name}</div>
                <div className="text-xs text-muted-foreground">
                  {l.rec.area} · {l.qty} {unitLabel(l.unitType as never, l.qty)}
                </div>
              </div>
              <div className="text-sm font-semibold tabular-nums text-foreground">{usd(l.total)}</div>
            </div>
          ))}
          {lines.length === 0 && (
            <div className="px-5 py-6 text-center text-sm text-muted-foreground">No treatments in the plan yet — go back and add some.</div>
          )}
        </div>

        {/* Totals */}
        <div className="px-5 py-4 border-t border-border bg-muted/20 space-y-1.5">
          <div className="flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span className="tabular-nums">{usd(totals.subtotal)}</span></div>
          {totals.discountAmount > 0 && (
            <div className="flex justify-between text-sm" style={{ color: "#9a6207" }}>
              <span>Package discount ({state.discountPercent}%)</span><span className="tabular-nums">−{usd(totals.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between items-baseline border-t border-border pt-2">
            <span className="text-base font-semibold text-foreground">Total</span>
            <span className="text-2xl font-bold tabular-nums" style={{ color: ACCENT }}>{usd(totals.total)}</span>
          </div>
          {totals.monthly !== null && (
            <p className="text-right text-xs text-muted-foreground">
              or {usd(totals.monthly)}/mo for {state.paymentTermMonths} months
              {totals.perDay !== null && <> · about {usd(Math.round(totals.perDay))}/day</>}
            </p>
          )}
          <p className="text-right text-[11px] text-muted-foreground/70">Illustrative pricing</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <button onClick={goBack} className="flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm font-medium hover:bg-muted/50">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="flex items-center gap-2">
          <button onClick={copy} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/50">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy plan"}
          </button>
          <button onClick={finalize} className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ background: ACCENT }}>
            <Sparkles className="h-4 w-4" /> {state.finalized ? "Finalized" : "Finalize plan"}
          </button>
        </div>
      </div>
    </div>
  );
}

function buildPlanText(plan: TcpPlan, lines: PlanLine[], totals: ReturnType<typeof planTotals>, state: TcpRunState): string {
  const out: string[] = [
    `TREATMENT & CARE PLAN — ${plan.patientName}`,
    `${plan.provider} · ${plan.location} · ${plan.visitDate}`,
    plan.context.primaryConcern,
    "",
  ];
  for (const l of lines) out.push(`- ${l.rec.name} (${l.rec.area}) — ${l.qty} ${unitLabel(l.unitType as never, l.qty)} — ${usd(l.total)}`);
  out.push("", `Subtotal: ${usd(totals.subtotal)}`);
  if (totals.discountAmount > 0) out.push(`Package discount (${state.discountPercent}%): -${usd(totals.discountAmount)}`);
  out.push(`Total: ${usd(totals.total)} (illustrative)`);
  if (totals.monthly !== null) out.push(`or ${usd(totals.monthly)}/mo for ${state.paymentTermMonths} months`);
  return out.join("\n");
}
