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
      title: "Choose note style",
      hint: "Pick the clinical note — its schema sets the sections and required fields.",
      component: NoteStyleStep,
      hideFooter: true,
      canAdvance: (ctx) => Boolean(ctx.data.noteStyle),
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
