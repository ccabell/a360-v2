"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers } from "lucide-react";

export default function ConsultationPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Consultation Intelligence</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Complete post-consultation analysis and KPI dashboard
        </p>
      </div>

      {/* Placeholder */}
      <Card className="p-12 text-center border-dashed bg-muted/40">
        <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-foreground font-medium">Intelligence Dashboard</p>
        <p className="text-sm text-muted-foreground mt-2">
          Real-time consultation analysis with KPI evaluation, recommendations, and
          evidence-based insights
        </p>
        <Button className="mt-6">Upload Consultation</Button>
      </Card>
    </div>
  );
}
