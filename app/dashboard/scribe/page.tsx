"use client";

import { DemoAgentShell } from "@/components/demo-agents/demo-agent-shell";
import { scribeConfig } from "@/components/demo-agents/scribe/scribe-config";

export default function ScribePage() {
  return (
    <div className="p-8">
      <DemoAgentShell config={scribeConfig} />
    </div>
  );
}
