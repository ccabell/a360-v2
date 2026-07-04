"use client";

import { Share2 } from "lucide-react";
import { AppShell } from "@/components/apps/app-shell";
import { ReachWorkspace } from "@/components/reach/reach-workspace";

export default function StandaloneReachPage() {
  return (
    <AppShell
      name="A360 Reach"
      icon={Share2}
      theme="reach"
      subtitle="Patient Re-Engagement Engine"
      badge="4-Agent Pipeline"
      footer="A360 Reach generates campaign suggestions for licensed aesthetic professionals. All outreach must comply with practice-level consent and marketing authorization policies."
    >
      <ReachWorkspace showHeader={false} />
    </AppShell>
  );
}
