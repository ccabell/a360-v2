"use client";

import { ClipboardList } from "lucide-react";
import { AppShell } from "@/components/apps/app-shell";
import { DemoAgentShell } from "@/components/demo-agents/demo-agent-shell";
import { tcpConfig } from "@/components/demo-agents/tcp/tcp-config";

export default function StandaloneTCPPage() {
  return (
    <AppShell
      name="A360 TCP"
      icon={ClipboardList}
      theme="tcp"
      subtitle="Treatment Care Planning"
      badge="Care Plan Builder"
      footer="A360 TCP generates treatment recommendations for licensed aesthetic professionals. All plans must be reviewed by the treating provider and discussed with the patient before implementation."
    >
      <div className="p-8">
        <DemoAgentShell config={tcpConfig} />
      </div>
    </AppShell>
  );
}
