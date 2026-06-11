"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function AgentTesterPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Agent Tester</h2>
        <p className="text-sm text-slate-600 mt-1">
          Test agents, evaluate outputs, and debug responses
        </p>
      </div>

      {/* Placeholder */}
      <Card className="p-12 text-center border-slate-200 bg-slate-50">
        <Zap className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <p className="text-slate-700 font-medium">Agent Testing Console</p>
        <p className="text-sm text-slate-500 mt-2">
          Test individual agents, evaluate outputs, and debug responses in real-time
        </p>
        <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
          Select Agent
        </Button>
      </Card>
    </div>
  );
}
