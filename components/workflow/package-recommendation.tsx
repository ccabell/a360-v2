"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import type { PackageSection } from "@/lib/workflow/parse-report";

function statusStyle(status: string): string {
  if (status.includes("✅")) return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
  if (status.includes("🔜")) return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
  if (status.includes("❌")) return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300";
  return "bg-muted text-muted-foreground";
}

export function PackageRecommendation({ data }: { data: PackageSection }) {
  return (
    <div id="report-packages" className="space-y-4">
      {data.tiers.map((tier, ti) => (
        <Card key={ti}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Package className="h-4 w-4 text-primary" />
              {tier.heading}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tier.rows.length > 0 && (
              <div className="grid gap-2 sm:grid-cols-2">
                {tier.rows.map((row, ri) => (
                  <div
                    key={ri}
                    className="rounded-lg border border-border p-3 space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-foreground">
                        {row.component.replace(/\*\*/g, "")}
                      </span>
                      <span className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle(row.status)}`}>
                        {row.status}
                      </span>
                    </div>
                    {row.indication && (
                      <p className="text-xs text-muted-foreground">{row.indication}</p>
                    )}
                    {row.timing && (
                      <p className="text-xs text-muted-foreground/80">{row.timing}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
            {tier.rationale && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tier.rationale.slice(0, 500)}
              </p>
            )}
          </CardContent>
        </Card>
      ))}

      {data.pricing && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Pricing & Points</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground whitespace-pre-line">
              {data.pricing.replace(/\*\*/g, "")}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
