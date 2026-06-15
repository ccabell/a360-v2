"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ListChecks, Square, CheckSquare } from "lucide-react";
import type { NextStepsSection } from "@/lib/workflow/parse-report";

export function NextStepsChecklist({ data }: { data: NextStepsSection }) {
  // Group by time horizon
  const groups: { horizon: string; items: typeof data.items }[] = [];
  let current: { horizon: string; items: typeof data.items } | null = null;

  for (const item of data.items) {
    const horizon = item.timeHorizon ?? "Action Items";
    if (!current || current.horizon !== horizon) {
      current = { horizon, items: [] };
      groups.push(current);
    }
    current.items.push(item);
  }

  return (
    <div id="report-next-steps">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <ListChecks className="h-4 w-4 text-primary" />
            Next Steps
            <Badge variant="secondary" className="ml-auto">
              {data.items.length} items
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {groups.map((group, gi) => (
            <div key={gi} className="space-y-1.5">
              <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {group.horizon}
              </h4>
              <div className="space-y-1">
                {group.items.map((item, ii) => (
                  <div
                    key={ii}
                    className="flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm"
                  >
                    {item.checked ? (
                      <CheckSquare className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                    ) : (
                      <Square className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                    )}
                    <span className={`text-foreground ${item.checked ? "line-through text-muted-foreground" : ""}`}>
                      {item.text.replace(/\*\*/g, "")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
