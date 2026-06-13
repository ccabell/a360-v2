"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, AlertTriangle, ExternalLink, FlaskConical } from "lucide-react";
import type { ClinicalItem } from "@/lib/workflow/parse-report";

function confidenceColor(conf: string | null): string {
  if (!conf) return "bg-muted text-muted-foreground";
  const lower = conf.toLowerCase();
  if (lower === "high" || (conf.includes("/") && parseInt(conf) >= 8))
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
  if (lower === "moderate" || (conf.includes("/") && parseInt(conf) >= 6))
    return "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300";
  return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";
}

function confidencePercent(conf: string | null): number {
  if (!conf) return 0;
  const numMatch = conf.match(/^(\d+)\/(\d+)$/);
  if (numMatch) return (parseInt(numMatch[1]) / parseInt(numMatch[2])) * 100;
  const lower = conf.toLowerCase();
  if (lower === "high") return 85;
  if (lower === "moderate") return 65;
  return 40;
}

function PmidChip({ pmid }: { pmid: string }) {
  return (
    <a
      href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 hover:bg-emerald-200 transition-colors dark:bg-emerald-950 dark:text-emerald-300 dark:hover:bg-emerald-900"
    >
      PMID {pmid}
      <ExternalLink className="h-2.5 w-2.5" />
    </a>
  );
}

export function ClinicalEvidenceCard({ item }: { item: ClinicalItem }) {
  const [expanded, setExpanded] = useState(false);
  const pct = confidencePercent(item.confidence);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <FlaskConical className="h-4 w-4 shrink-0 text-primary" />
          <span className="font-mono text-xs text-muted-foreground">{item.id}.</span>
          <span className="flex-1">{item.heading}</span>
          {item.confidence && (
            <Badge className={`shrink-0 ${confidenceColor(item.confidence)}`}>
              Confidence: {item.confidence}
            </Badge>
          )}
          {item.warnings.length > 0 && (
            <Badge className="shrink-0 bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 gap-1">
              <AlertTriangle className="h-3 w-3" />
              {item.warnings.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Confidence meter */}
        {item.confidence && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{item.evidenceQuality ?? "Evidence"}</span>
              <span>{item.confidence}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all ${
                  pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : "bg-red-500"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}

        {/* Warning flags */}
        {item.warnings.map((w, i) => (
          <div
            key={i}
            className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 dark:border-amber-800 dark:bg-amber-950/50"
          >
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
            <p className="text-xs text-amber-800 dark:text-amber-200">{w}</p>
          </div>
        ))}

        {/* PMID chips */}
        {item.pmids.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.pmids.map((pmid) => (
              <PmidChip key={pmid} pmid={pmid} />
            ))}
          </div>
        )}

        {/* Expandable body */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary/80"
        >
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
          {expanded ? "Hide details" : "Show full evidence"}
        </button>

        {expanded && (
          <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm text-foreground leading-relaxed whitespace-pre-line">
            {item.body
              .replace(/\*\*/g, "")
              .replace(/^(Evidence Quality|Confidence)[^\n]*\n*/gm, "")
              .trim()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ClinicalEvidenceSection({ data }: { data: { intro: string; items: ClinicalItem[] } }) {
  return (
    <div id="report-evidence" className="space-y-4">
      {data.intro && (
        <p className="text-sm text-muted-foreground italic">{data.intro}</p>
      )}
      {data.items.map((item) => (
        <ClinicalEvidenceCard key={item.id} item={item} />
      ))}
    </div>
  );
}
