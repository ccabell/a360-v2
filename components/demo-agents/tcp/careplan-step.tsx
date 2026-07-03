"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Minus, Plus, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoStepProps } from "../types";
import {
  getPlan, getPlanPatientId, getTcpState, seedPlan, patchTcp,
  includedLines, planTotals, lineFor, usd,
} from "./state";
import { unitLabel, TCP_SETTINGS } from "@/lib/tcp/pricing";
import type { TcpPlan, TcpRecommendation } from "@/lib/tcp/types";

const ACCENT = "#F5A623";
const ON_ACCENT = "#3d2c06";

// Short, premium one-liners for the menu (fallback to the clinical area).
const BENEFIT: Record<string, string> = {
  "Juvederm Vollure XC": "Smooths the nasolabial folds",
  "Sculptra Aesthetic": "Rebuilds cheek collagen, gradually",
  "Juvederm Voluma XC": "Restores cheek & midface volume",
  "SKINVIVE by Juvederm": "Skin-quality glow for photos",
  "Botox Cosmetic": "Softens upper-face lines",
  "Restylane Lyft": "Lifts deeper cheek volume",
  "InMode Morpheus8": "Tightens & resurfaces skin",
  "Merz Ultherapy PRIME": "Non-invasive jawline lift",
};

/** Step 2 — the care plan. Treatment menu (left) stacks into a live quote (right). */
export function CarePlanStep({ ctx, setCtx, goNext, goBack }: DemoStepProps) {
  const patientId = ctx.patient?.id ?? "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const fetchedFor = useRef<string | null>(null);

  const plan = getPlan(ctx);
  const ready = plan && getPlanPatientId(ctx) === patientId;

  useEffect(() => {
    if (!patientId || ready || fetchedFor.current === patientId) return;
    fetchedFor.current = patientId;
    setLoading(true);
    setError(null);
    fetch("/api/tcp/resolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientId, consultationId: ctx.patient?.consultationId }),
    })
      .then((r) => r.json())
      .then((data: TcpPlan & { error?: string }) => {
        if (data.error || !data.recommendations) { setError(data.error ?? "No plan available."); return; }
        seedPlan(setCtx, data, patientId);
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId, ready, attempt]);

  const retry = () => {
    fetchedFor.current = null; // allow the effect to refire for the same patient
    setAttempt((n) => n + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin mr-2" /> Building the plan…
      </div>
    );
  }
  if (error) {
    return (
      <div className="rounded-2xl bg-destructive/5 p-6 text-sm">
        <p className="font-medium text-destructive">Plan unavailable</p>
        <p className="mt-1 text-muted-foreground">{error}</p>
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={retry}
            className="rounded-xl px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-90"
            style={{ background: ACCENT, color: ON_ACCENT }}
          >
            Try again
          </button>
          <button
            onClick={goBack}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> Back to patient
          </button>
        </div>
      </div>
    );
  }
  if (!plan) return null;

  const state = getTcpState(ctx.data);
  const totals = planTotals(plan, state);
  const lines = includedLines(plan, state);
  const first = ctx.patient?.name?.split(" ")[0] ?? "patient";

  const toggle = (id: string) =>
    patchTcp(setCtx, (s) => ({ ...s, included: { ...s.included, [id]: !s.included[id] } }));
  const setQty = (id: string, q: number) =>
    patchTcp(setCtx, (s) => ({ ...s, qty: { ...s.qty, [id]: Math.max(1, Math.min(99, q)) } }));
  const setDiscount = (d: number) => patchTcp(setCtx, (s) => ({ ...s, discountPercent: d }));
  const setTerm = (t: number) => patchTcp(setCtx, (s) => ({ ...s, paymentTermMonths: t }));

  const discountOn = state.discountPercent > 0;

  return (
    <div className="-mt-1 grid gap-6 lg:gap-8 md:grid-cols-[minmax(0,1fr)_330px]">
      {/* LEFT — treatment menu */}
      <div>
        <div className="mb-2 ml-1 text-[13px] text-muted-foreground">Recommended for {first}</div>
        <div className="space-y-1">
          {plan.recommendations.map((rec) => (
            <TreatmentRow
              key={rec.id}
              rec={rec}
              included={!!state.included[rec.id]}
              line={lineFor(rec, state)}
              onToggle={() => toggle(rec.id)}
              onQty={(q) => setQty(rec.id, q)}
            />
          ))}
        </div>
      </div>

      {/* RIGHT — live quote */}
      <div className="md:sticky md:top-4 self-start rounded-2xl bg-muted/40 p-5">
        <div className="text-[13px] text-muted-foreground">Care plan</div>
        <div className="text-base font-medium text-foreground">{plan.patientName}</div>

        <div className="mt-4 space-y-2">
          {lines.length === 0 && (
            <p className="text-sm text-muted-foreground">Add treatments to build the plan.</p>
          )}
          {lines.map((l) => (
            <div key={l.rec.id} className="flex items-baseline justify-between text-sm">
              <span className="text-muted-foreground truncate pr-2">
                {l.rec.name.replace(/ (XC|Aesthetic|by Juvederm|Cosmetic|PRIME)$/i, "")}{" "}
                <span className="text-foreground/40">×{l.qty}</span>
              </span>
              <span className="tabular-nums text-foreground">{usd(l.total)}</span>
            </div>
          ))}
        </div>

        <div className="my-4 h-px bg-border" />

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal</span><span className="tabular-nums">{usd(totals.subtotal)}</span>
        </div>

        {/* package savings toggle */}
        <button
          onClick={() => setDiscount(discountOn ? 0 : TCP_SETTINGS.defaultPackageDiscount)}
          className="mt-2 flex w-full items-center justify-between text-sm"
        >
          <span className="flex items-center gap-2" style={{ color: discountOn ? "#9a6207" : undefined }}>
            <Switch on={discountOn} />
            <span className={discountOn ? "" : "text-muted-foreground"}>Package savings · {TCP_SETTINGS.defaultPackageDiscount}%</span>
          </span>
          <span className="tabular-nums" style={{ color: discountOn ? "#9a6207" : "var(--muted-foreground)" }}>
            {discountOn ? `−${usd(totals.discountAmount)}` : usd(0)}
          </span>
        </button>

        <div className="mt-4 flex items-baseline justify-between">
          <span className="text-base font-medium text-foreground">Total</span>
          <span className="text-[30px] font-medium tracking-tight tabular-nums text-foreground">{usd(totals.total)}</span>
        </div>

        {/* financing */}
        <div className="mt-5 text-xs text-muted-foreground">Optional financing</div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {TCP_SETTINGS.paymentTerms.map((term) => {
            const on = state.paymentTermMonths === term;
            return (
              <button
                key={term}
                onClick={() => setTerm(term)}
                className={cn(
                  "rounded-[10px] py-1.5 text-xs font-medium transition-colors",
                  on ? "" : "border border-border text-muted-foreground hover:text-foreground",
                )}
                style={on ? { background: ACCENT, color: ON_ACCENT } : undefined}
              >
                {term === 1 ? "Pay in full" : `${term} mo`}
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          {totals.monthly !== null ? (
            <>
              <span className="text-2xl font-medium tabular-nums text-foreground">{usd(totals.monthly)}</span>
              <span className="text-[13px] text-muted-foreground">
                /mo · {state.paymentTermMonths} payments{totals.perDay !== null && <> · ~{usd(Math.round(totals.perDay))}/day</>}
              </span>
            </>
          ) : (
            <span className="text-[13px] text-muted-foreground">Paid in full today</span>
          )}
        </div>

        <button
          onClick={goNext}
          disabled={lines.length === 0}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-opacity disabled:opacity-40"
          style={{ background: ACCENT, color: ON_ACCENT }}
        >
          Present plan <ArrowRight className="h-4 w-4" />
        </button>
        <button onClick={goBack} className="mt-2 flex w-full items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3 w-3" /> Back to patient
        </button>
        <div className="mt-3 text-center text-[11px] text-muted-foreground/70">Illustrative pricing</div>
      </div>
    </div>
  );
}

function TreatmentRow({
  rec, included, line, onToggle, onQty,
}: {
  rec: TcpRecommendation;
  included: boolean;
  line: ReturnType<typeof lineFor>;
  onToggle: () => void;
  onQty: (q: number) => void;
}) {
  const benefit = BENEFIT[rec.name] ?? rec.area;
  return (
    <div
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onToggle())}
      className={cn(
        "flex cursor-pointer items-center gap-3.5 rounded-2xl p-3.5 transition-colors",
        included ? "bg-[color:var(--a)]/[0.09]" : "hover:bg-muted/50",
      )}
      style={{ ["--a" as string]: ACCENT }}
    >
      <span
        className={cn("flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full transition-colors", !included && "border-[1.5px] border-border")}
        style={included ? { background: ACCENT, color: ON_ACCENT } : undefined}
      >
        {included && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </span>

      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-medium text-foreground">{rec.name}</div>
        <div className="truncate text-[13px] text-muted-foreground">{benefit}</div>
      </div>

      <div className="shrink-0 text-right">
        {included ? (
          <div
            className="flex items-center gap-2 rounded-full border border-border px-1 py-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => onQty(line.qty - 1)} className="flex h-5 w-5 items-center justify-center text-muted-foreground hover:text-foreground" aria-label="Decrease"><Minus className="h-3 w-3" /></button>
            <span className="min-w-[12px] text-center text-[13px] tabular-nums text-foreground">{line.qty}</span>
            <button onClick={() => onQty(line.qty + 1)} className="flex h-5 w-5 items-center justify-center text-muted-foreground hover:text-foreground" aria-label="Increase"><Plus className="h-3 w-3" /></button>
          </div>
        ) : null}
        <div className="mt-1 text-[12px] text-muted-foreground">
          {usd(line.unitPrice)}{line.unitType !== "session" ? ` / ${unitLabel(line.unitType as never, 1)}` : ""}
        </div>
      </div>
    </div>
  );
}

function Switch({ on }: { on: boolean }) {
  return (
    <span
      className="relative inline-flex h-[18px] w-[30px] shrink-0 items-center rounded-full transition-colors"
      style={{ background: on ? ACCENT : "var(--border)" }}
    >
      <span
        className="inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform"
        style={{ transform: on ? "translateX(13px)" : "translateX(2px)" }}
      />
    </span>
  );
}
