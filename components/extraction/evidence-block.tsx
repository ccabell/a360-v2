"use client";

import { Quote, ShieldCheck } from "lucide-react";
import type { RunEvidence } from "@/lib/types";
import { calibration, humanize } from "./disposition";

function maxConfidence(ev?: RunEvidence[]): number | undefined {
  if (!ev || ev.length === 0) return undefined;
  const vals = ev.map((e) => e.confidence ?? 0);
  return Math.max(...vals);
}

function ConfidenceBadge({ conf }: { conf?: number }) {
  if (conf == null) return null;
  const cls =
    conf >= 0.9
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
      : conf >= 0.7
        ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
        : "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300";
  return (
    <span className={`inline-flex flex-col items-end rounded-md px-1.5 py-0.5 text-right ${cls}`}>
      <span className="text-xs font-semibold tabular-nums leading-none">{conf.toFixed(2)}</span>
      <span className="text-[9px] leading-tight opacity-80">{calibration(conf)}</span>
    </span>
  );
}

interface EvidenceBlockProps {
  id: string;
  label?: string;
  value?: React.ReactNode;
  evidence?: RunEvidence[];
  missingReason?: string | null;
  accent?: string; // left-border class, e.g. "border-l-primary"
  active?: boolean;
  hitl?: boolean;
  onSelect?: () => void;
}

/**
 * The universal trust component: an extracted value shown with its confidence
 * and the verbatim transcript quote(s) that back it. Clicking binds to the
 * transcript (the parent highlights + scrolls to the quote).
 */
export function EvidenceBlock({
  id,
  label,
  value,
  evidence,
  missingReason,
  accent = "border-l-border",
  active,
  hitl,
  onSelect,
}: EvidenceBlockProps) {
  const conf = maxConfidence(evidence);
  const hasQuotes = !!evidence && evidence.length > 0;
  const isMissing =
    !value && !hasQuotes && (missingReason != null || value === null);

  return (
    <div
      data-field={id}
      onClick={hasQuotes ? onSelect : undefined}
      className={`rounded-lg border border-l-2 ${accent} bg-card p-3 transition-colors ${
        active ? "border-primary ring-1 ring-primary/40" : "border-border"
      } ${hasQuotes ? "cursor-pointer hover:border-primary/40" : ""}`}
    >
      {/* Value row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {label && (
            <p className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              {label}
              {hitl && <ShieldCheck className="h-3 w-3 text-emerald-600" />}
            </p>
          )}
          {isMissing ? (
            <p className="mt-0.5 text-sm">
              <span className="italic text-muted-foreground/60">Not found</span>
              {missingReason && (
                <span className="ml-1.5 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  {humanize(missingReason)}
                </span>
              )}
            </p>
          ) : (
            <div className="mt-0.5 text-sm font-medium text-foreground">{value}</div>
          )}
        </div>
        <ConfidenceBadge conf={conf} />
      </div>

      {/* Evidence quotes */}
      {hasQuotes && (
        <div className="mt-2 space-y-1.5">
          {evidence!.slice(0, 3).map((e, i) => (
            <div key={i} className="flex gap-2 rounded-md bg-muted/50 p-2">
              <Quote className="h-3 w-3 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-xs italic text-foreground/90">{e.quote}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  {humanize(e.speaker) || "Unknown"}
                  {e.confidence != null ? ` · conf ${e.confidence}` : ""}
                  {e.source === "hitl_verified" ? " · HITL verified" : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
