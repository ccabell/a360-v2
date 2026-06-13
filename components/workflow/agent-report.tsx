"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Brain, Clock, Info } from "lucide-react";
import { parseReport, type ParsedReport } from "@/lib/workflow/parse-report";
import { ReportSectionNav } from "./report-section-nav";
import { PackageRecommendation } from "./package-recommendation";
import { ClinicalEvidenceSection } from "./clinical-evidence-card";
import { NextStepsChecklist } from "./next-steps-checklist";
import { RunAgentButton } from "./run-agent-button";

interface AgentReportProps {
  patientId: string;
}

export function AgentReport({ patientId }: AgentReportProps) {
  const [report, setReport] = useState<ParsedReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);

  async function loadReport() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/patients/${patientId}/workflow`);
      const json = await res.json();
      if (res.status === 404) {
        setError("no-cached-report");
        return;
      }
      if (!res.ok || json.error) throw new Error(json.error || `HTTP ${res.status}`);
      const parsed = parseReport(json.report_text);
      setReport(parsed);
      setLatencyMs(json.latency_ms);
      setShowReport(true);
    } catch (e) {
      if ((e as Error).message === "no-cached-report") {
        setError("no-cached-report");
      } else {
        setError(e instanceof Error ? e.message : "Failed to load report");
      }
    } finally {
      setLoading(false);
    }
  }

  // Don't auto-load — let the user click "Run agent"
  if (!showReport && !loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Brain className="h-4 w-4 text-primary" />
            Post-Consultation Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Run the post-consultation analysis to generate a package recommendation,
            clinical evidence review, and next steps checklist.
          </p>
          <RunAgentButton onComplete={loadReport} />
          {error === "no-cached-report" && (
            <p className="text-xs text-muted-foreground">
              No cached analysis available for this patient. In production, the
              orchestrator runs automatically after each consultation (~4-5 min).
            </p>
          )}
          {error && error !== "no-cached-report" && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center gap-3 py-6 text-sm text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Loading intelligence report…
        </CardContent>
      </Card>
    );
  }

  if (!report) return null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Brain className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Post-Consultation Intelligence Report
        </h3>
        {latencyMs && (
          <Badge variant="secondary" className="ml-auto gap-1 text-xs">
            <Clock className="h-3 w-3" />
            {(latencyMs / 1000).toFixed(0)}s orchestration
          </Badge>
        )}
      </div>

      {/* GL caveat — always visible (honest framing) */}
      <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 dark:border-blue-800 dark:bg-blue-950/50">
        <Info className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" />
        <p className="text-xs text-blue-800 dark:text-blue-200">
          Clinical evidence is grounded in PubMed peer-reviewed literature via RAG retrieval.
          Global Library product records are being enriched — some product-specific data
          references PubMed directly rather than GL fuel documents.
        </p>
      </div>

      {/* Section nav */}
      <ReportSectionNav />

      {/* 1. Executive Summary */}
      <Card id="report-summary">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">1. Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
            {report.executiveSummary.replace(/\*\*/g, "")}
          </div>
        </CardContent>
      </Card>

      {/* 2. Package Recommendation */}
      <PackageRecommendation data={report.packages} />

      {/* 3. Clinical Evidence */}
      <ClinicalEvidenceSection data={report.clinicalEvidence} />

      {/* 4. Next Steps */}
      <NextStepsChecklist data={report.nextSteps} />
    </div>
  );
}
