import type { LucideIcon } from "lucide-react";
import type { DemoPatientCard } from "@/app/api/demo-agents/patients/route";

// =============================================================================
// DemoAgentConfig — the reusable spine. Every demo agent declares its steps via
// this config; the template owns the practice header, stepper, step state, and
// the shared patient picker. Adding agent #2 = a new config + step components.
// =============================================================================

export type { DemoPatientCard };

/** Shared, mutable run state threaded through every step. */
export interface DemoRunContext {
  patient: DemoPatientCard | null;
  /** Agent-specific state (e.g. Scribe stores recordTypes, style, result). */
  data: Record<string, unknown>;
}

export interface DemoStepProps {
  ctx: DemoRunContext;
  setCtx: (updater: (c: DemoRunContext) => DemoRunContext) => void;
  goNext: () => void;
  goBack: () => void;
  isFirst: boolean;
  isLast: boolean;
  /** The active agent's config key (e.g. "scribe", "tcp") — for per-agent UI. */
  agentKey: string;
}

export interface DemoAgentStep {
  id: string;
  title: string;
  hint?: string;
  component: React.ComponentType<DemoStepProps>;
  /** Gate the template's Next button. */
  canAdvance?: (ctx: DemoRunContext) => boolean;
  /** Step renders its own advance controls; hide the template footer. */
  hideFooter?: boolean;
}

export interface DemoAgentConfig {
  key: string;
  label: string;
  tagline: string;
  icon: LucideIcon;
  /** Prepend the shared patient-picker as step 1 (default true). */
  includePatientStep?: boolean;
  /** Steps after the patient picker. */
  steps: DemoAgentStep[];
}
