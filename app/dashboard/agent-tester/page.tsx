"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function AgentTesterPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Agent Tester</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Test agents, evaluate outputs, and debug responses
        </p>
      </div>

      {/* Placeholder */}
      <Card className="p-12 text-center border-dashed bg-muted/40">
        <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-foreground font-medium">Agent Testing Console</p>
        <p className="text-sm text-muted-foreground mt-2">
          Test individual agents, evaluate outputs, and debug responses in real-time
        </p>
        <Button className="mt-6">Select Agent</Button>
      </Card>
    </div>
  );
}
