"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChevronDown, FlaskConical } from "lucide-react";

interface ExtractionCardProps {
  extraction: {
    id: string;
    model: string | null;
    status: string | null;
    outputs: Record<string, unknown>;
    is_verified: boolean;
    created_at: string;
  };
}

export function ExtractionCard({ extraction }: ExtractionCardProps) {
  const [expanded, setExpanded] = useState(false);

  const outputs = extraction.outputs || {};
  const promptPasses = Object.entries(outputs).filter(([k]) => k.startsWith("prompt_"));
  const validation = outputs.validation as Record<string, unknown> | undefined;

  // Count total extracted fields across all prompt passes
  let fieldCount = 0;
  for (const [, val] of promptPasses) {
    const parsed = (val as Record<string, unknown>)?.parsed_json;
    if (parsed && typeof parsed === "object") {
      fieldCount += Object.keys(parsed).length;
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <FlaskConical className="h-4 w-4 text-primary" />
          Verified Extraction
          {extraction.is_verified && (
            <Badge variant="secondary" className="gap-1">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              Verified
            </Badge>
          )}
          <span className="ml-auto text-xs font-normal text-muted-foreground">
            {extraction.model ?? ""} · {promptPasses.length} pass{promptPasses.length !== 1 ? "es" : ""} · {fieldCount} fields
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Quick summary of what was extracted */}
        <div className="flex flex-wrap gap-2 mb-3">
          {promptPasses.map(([key, val]) => {
            const parsed = (val as Record<string, unknown>)?.parsed_json as Record<string, unknown> | undefined;
            const keys = parsed ? Object.keys(parsed) : [];
            return (
              <Badge key={key} variant="outline" className="text-xs">
                {key.replace("prompt_", "Pass ")} — {keys.length} fields
              </Badge>
            );
          })}
          {validation && (
            <Badge variant="outline" className="text-xs gap-1">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              Validation
            </Badge>
          )}
        </div>

        {/* Expandable full output */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
          {expanded ? "Hide extraction data" : "View extraction data"}
        </button>

        {expanded && (
          <div className="mt-3 space-y-4">
            {promptPasses.map(([key, val]) => {
              const parsed = (val as Record<string, unknown>)?.parsed_json as Record<string, unknown> | undefined;
              if (!parsed) return null;
              return (
                <div key={key}>
                  <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {key.replace("prompt_", "Pass ")}
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(parsed).map(([fieldKey, fieldVal]) => (
                      <ExtractionField key={fieldKey} name={fieldKey} data={fieldVal} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ExtractionField({ name, data }: { name: string; data: unknown }) {
  const d = data as Record<string, unknown> | null;
  if (!d || typeof d !== "object") return null;

  const value = d.value;
  const evidence = d.evidence as Array<{ quote?: string; speaker?: string }> | undefined;
  const missingReason = d.missing_reason as string | undefined;

  const label = name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="border-l-2 border-border pl-3 py-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      {value != null ? (
        <div className="text-sm text-foreground">
          {typeof value === "string" ? (
            value
          ) : Array.isArray(value) ? (
            <div className="flex flex-wrap gap-1 mt-0.5">
              {value.map((v, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {typeof v === "object" ? String((v as Record<string, unknown>).name ?? JSON.stringify(v).slice(0, 60)) : String(v)}
                </Badge>
              ))}
            </div>
          ) : (
            JSON.stringify(value).slice(0, 120)
          )}
        </div>
      ) : (
        <span className="text-sm italic text-muted-foreground/70">
          Not found{missingReason ? ` — ${missingReason}` : ""}
        </span>
      )}
      {evidence && evidence.length > 0 && (
        <p className="mt-0.5 text-[10px] text-muted-foreground">
          {evidence.length} evidence quote{evidence.length > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
