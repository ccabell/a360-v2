"use client";

import { Check, Quote, AlertTriangle, ShieldAlert } from "lucide-react";
import type { RunEvidence } from "@/lib/types";
import { dispositionStyle, receptionStyle, humanize } from "./disposition";

interface Offering {
  name: string;
  type?: string;
  disposition?: string;
  area?: string | null;
  quantity?: string | null;
  price_discussed?: { amount_text?: string; price_type?: string } | null;
  catalog_match?: string | null;
  catalog_match_type?: string | null;
  catalog_gap?: boolean;
  guidance_discovery?: {
    provider_guided?: boolean;
    guidance_type?: string | null;
    patient_reception?: string | null;
    guidance_rationale?: string | null;
  } | null;
  evidence?: RunEvidence | RunEvidence[];
}

function asArray(e?: RunEvidence | RunEvidence[]): RunEvidence[] {
  if (!e) return [];
  return Array.isArray(e) ? e : [e];
}

export function OfferingCard({
  offering,
  active,
  onSelect,
}: {
  offering: Offering;
  active?: boolean;
  onSelect?: () => void;
}) {
  const d = dispositionStyle(offering.disposition);
  const ev = asArray(offering.evidence);
  const guided = offering.guidance_discovery?.provider_guided;
  const reception = offering.guidance_discovery?.patient_reception;
  const r = reception ? receptionStyle(reception) : null;
  const matchType = offering.catalog_match_type;

  return (
    <div
      data-field
      onClick={ev.length ? onSelect : undefined}
      className={`rounded-lg border border-l-4 ${d.border} bg-card p-3 transition-colors ${
        active ? "border-primary ring-1 ring-primary/40" : "border-border"
      } ${ev.length ? "cursor-pointer hover:border-primary/40" : ""}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-medium text-foreground">{offering.name}</span>
        {offering.area && (
          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
            {offering.area}
          </span>
        )}
        <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium ${d.badge}`}>
          {d.label}
        </span>
        {matchType === "exact" ? (
          <Check className="h-3.5 w-3.5 text-emerald-600" />
        ) : matchType === "category" ? (
          <span className="text-xs text-amber-600" title="Category match">≈</span>
        ) : (
          <span className="text-xs text-muted-foreground/40" title="No catalog match">×</span>
        )}
      </div>

      {(offering.quantity || offering.price_discussed?.amount_text || guided) && (
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {offering.quantity && <span>{offering.quantity}</span>}
          {offering.price_discussed?.amount_text && (
            <span className="font-medium text-amber-600">{offering.price_discussed.amount_text}</span>
          )}
          {guided && offering.guidance_discovery?.guidance_type && (
            <span className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              {humanize(offering.guidance_discovery.guidance_type)}
            </span>
          )}
          {r && <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${r.badge}`}>{r.label}</span>}
        </div>
      )}

      {offering.catalog_gap && (
        <div className="mt-2 flex items-center gap-1.5 rounded bg-amber-50 px-2 py-1 text-[10px] text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
          <AlertTriangle className="h-3 w-3" /> Catalog gap — no matching catalog item
        </div>
      )}
      {offering.disposition === "provider_deferred" && (
        <div className="mt-2 flex items-center gap-1.5 rounded bg-purple-50 px-2 py-1 text-[10px] text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">
          <ShieldAlert className="h-3 w-3" /> Provider deferred — patient wanted this; provider declined/deferred
        </div>
      )}

      {ev.length > 0 && (
        <div className="mt-2 space-y-1.5">
          {ev.slice(0, 2).map((e, i) => (
            <div key={i} className="flex gap-2 rounded-md bg-muted/50 p-2">
              <Quote className="h-3 w-3 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-xs italic text-foreground/90">{e.quote}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  {humanize(e.speaker) || "Unknown"}
                  {e.confidence != null ? ` · conf ${e.confidence}` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
