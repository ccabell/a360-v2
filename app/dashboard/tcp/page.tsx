"use client";

import { DemoAgentShell } from "@/components/demo-agents/demo-agent-shell";
import { tcpConfig } from "@/components/demo-agents/tcp/tcp-config";

export default function TCPPage() {
  return (
    <div className="p-8">
      <DemoAgentShell config={tcpConfig} />
    </div>
  );
}
