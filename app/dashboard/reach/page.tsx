"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function ReachPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Reach Campaign Manager</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Create and manage patient outreach campaigns with treatment recommendations
        </p>
      </div>

      {/* Placeholder */}
      <Card className="p-12 text-center border-dashed bg-muted/40">
        <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-foreground font-medium">Campaign Manager</p>
        <p className="text-sm text-muted-foreground mt-2">
          Create and schedule patient outreach campaigns with evidence-based treatment
          recommendations
        </p>
        <Button className="mt-6">Create Campaign</Button>
      </Card>
    </div>
  );
}
