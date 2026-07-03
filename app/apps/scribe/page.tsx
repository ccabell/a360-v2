"use client";

import { FileText } from "lucide-react";
import { AppShell } from "@/components/apps/app-shell";
import { ScribeWorkspace } from "@/components/scribe/scribe-workspace";

export default function StandaloneScribePage() {
  return (
    <AppShell
      name="A360 Scribe"
      icon={FileText}
      theme="scribe"
      subtitle="Clinical Documentation"
      badge="AI Scribe"
      footer="A360 Scribe generates clinical documentation suggestions for licensed aesthetic professionals. All notes must be reviewed and approved by the treating provider before inclusion in the patient record."
    >
      <ScribeWorkspace />
    </AppShell>
  );
}
