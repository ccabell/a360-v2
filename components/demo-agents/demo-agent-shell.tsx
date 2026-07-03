"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PracticeHeader } from "./practice-header";
import { Stepper } from "./stepper";
import { PatientPickerStep } from "./steps/patient-picker-step";
import type { DemoAgentConfig, DemoAgentStep, DemoRunContext } from "./types";

const ACCENT = "#F5A623";

/**
 * Template shell — practice header + stepper + active step. Owns step state,
 * Back/Next, and the shared run context. Each demo agent supplies a config.
 */
export function DemoAgentShell({ config }: { config: DemoAgentConfig }) {
  const steps: DemoAgentStep[] = useMemo(() => {
    const patientStep: DemoAgentStep = {
      id: "patient",
      title: "Select patient",
      hint: "Choose a patient and visit to work from.",
      component: PatientPickerStep,
      canAdvance: (ctx) => Boolean(ctx.patient),
      hideFooter: true,
    };
    return config.includePatientStep === false
      ? config.steps
      : [patientStep, ...config.steps];
  }, [config]);

  const [index, setIndex] = useState(0);
  const [ctx, setCtxState] = useState<DemoRunContext>({ patient: null, data: {} });

  const step = steps[index];
  const Icon = config.icon;
  const isFirst = index === 0;
  const isLast = index === steps.length - 1;
  const canAdvance = step.canAdvance ? step.canAdvance(ctx) : true;

  const setCtx = (updater: (c: DemoRunContext) => DemoRunContext) =>
    setCtxState((c) => updater(c));
  const goNext = () => setIndex((i) => Math.min(i + 1, steps.length - 1));
  const goBack = () => setIndex((i) => Math.max(i - 1, 0));

  const StepBody = step.component;

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      {/* Agent title */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ background: `${ACCENT}1a`, color: ACCENT }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground leading-tight">{config.label}</h1>
          <p className="text-sm text-muted-foreground">{config.tagline}</p>
        </div>
      </div>

      <PracticeHeader />

      {/* Stepper */}
      <div className="rounded-xl border border-border bg-card px-5 py-4 shadow-sm">
        <Stepper steps={steps} current={index} accent={ACCENT} />
      </div>

      {/* Step body */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
          {step.hint && <p className="text-sm text-muted-foreground mt-0.5">{step.hint}</p>}
        </div>

        <StepBody
          ctx={ctx}
          setCtx={setCtx}
          goNext={goNext}
          goBack={goBack}
          isFirst={isFirst}
          isLast={isLast}
          agentKey={config.key}
        />

        {!step.hideFooter && (
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <button
              onClick={goBack}
              disabled={isFirst}
              className="flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-foreground hover:bg-muted/50 disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {!isLast && (
              <button
                onClick={goNext}
                disabled={!canAdvance}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
                style={{ background: ACCENT }}
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
