import { FileText } from "lucide-react";
import type { DemoAgentConfig } from "../types";
import { NoteStyleStep } from "./note-style-step";
import { GenerateRevealStep } from "./generate-reveal-step";

/**
 * Scribe — consumer #1 of the demo-agent template. One consultation transcript
 * fans out into multiple clinical record types, revealed step by step.
 */
export const scribeConfig: DemoAgentConfig = {
  key: "scribe",
  label: "Scribe — Clinical Notes",
  tagline: "Turn one consultation into every record the visit needs.",
  icon: FileText,
  includePatientStep: true,
  steps: [
    {
      id: "note-style",
      title: "Choose records & style",
      hint: "Select which clinical records to generate and how they should read.",
      component: NoteStyleStep,
      hideFooter: true,
      canAdvance: (ctx) => ((ctx.data.recordTypes as unknown[]) ?? []).length > 0,
    },
    {
      id: "generate",
      title: "Generate & review",
      hint: "Watch each record build from the transcript, then refine.",
      component: GenerateRevealStep,
      hideFooter: true,
    },
  ],
};
