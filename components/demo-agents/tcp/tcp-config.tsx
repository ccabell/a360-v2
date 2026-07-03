import { ClipboardList } from "lucide-react";
import type { DemoAgentConfig } from "../types";
import { getTcpState } from "@/lib/tcp/types";
import { CarePlanStep } from "./careplan-step";
import { FinalizeStep } from "./finalize-step";

/**
 * TCP Builder — consumer #2 of the demo-agent template. A clean care-plan
 * calculator: recommendations stack into a priced, itemized plan, then a
 * client-presentable review. Step 1 (patient picker) is the shared template step.
 */
export const tcpConfig: DemoAgentConfig = {
  key: "tcp",
  label: "TCP — Treatment & Care Plan",
  tagline: "Build a priced, client-ready care plan from the consultation.",
  icon: ClipboardList,
  includePatientStep: true,
  steps: [
    {
      id: "careplan",
      title: "Care plan",
      hint: "Stack treatments into a priced plan with optional financing.",
      component: CarePlanStep,
      hideFooter: true,
      canAdvance: (ctx) => Object.values(getTcpState(ctx.data).included).some(Boolean),
    },
    {
      id: "review",
      title: "Review",
      hint: "Review and finalize the client-presentable care plan.",
      component: FinalizeStep,
      hideFooter: true,
    },
  ],
};
