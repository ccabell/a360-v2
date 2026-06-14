"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, ShieldAlert } from "lucide-react"
import type { FuelDoc } from "@/lib/types/fuel-docs"

interface TabProps {
  doc: FuelDoc
  editing: boolean
  onSave: (updates: Partial<{ content: Record<string, unknown>; review_status: string }>) => Promise<void>
}

interface Objection {
  objection_type: string
  patient_says: string
  handling_language: string
  do_not_say_in_response: string
}

const typeLabels: Record<string, string> = {
  cost: "Cost",
  do_I_need_both: "Do I Need Both?",
  do_i_need_both: "Do I Need Both?",
  fear_of_looking_overdone: "Fear of Looking Overdone",
  fear_of_overdone: "Fear of Looking Overdone",
  downtime: "Downtime",
  I_will_think_about_it: "Let Me Think About It",
  fear_of_rf_interaction: "RF Interaction Concern",
  evidence_concern: "Evidence Concern",
  curiosity_about_purity: "Product Curiosity",
}

const typeColors: Record<string, string> = {
  cost: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  downtime: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  fear_of_looking_overdone: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  fear_of_overdone: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
}

export function ObjectionsTab({ doc }: TabProps) {
  const c = doc.content as Record<string, unknown>
  const objections = (c.top_objections as Objection[]) ?? []

  if (objections.length === 0) {
    return (
      <Card className="mt-4">
        <CardContent className="py-12 text-center text-muted-foreground">
          No objection handling data available.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mt-4 space-y-4">
      <p className="text-sm text-muted-foreground">
        {objections.length} objection scenario{objections.length !== 1 ? "s" : ""} with recommended handling language.
      </p>

      {objections.map((obj, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Badge
                className={
                  typeColors[obj.objection_type] ??
                  "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                }
              >
                {typeLabels[obj.objection_type] ?? obj.objection_type.replace(/_/g, " ")}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {/* Patient says */}
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex gap-2 mb-1.5">
                <MessageCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Patient says</p>
              </div>
              <p className="text-sm italic leading-relaxed pl-6">
                &ldquo;{obj.patient_says}&rdquo;
              </p>
            </div>

            {/* Handling language */}
            <div className="pl-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                Recommended response
              </p>
              <p className="text-sm leading-relaxed">
                {obj.handling_language}
              </p>
            </div>

            {/* Do not say */}
            {obj.do_not_say_in_response && (
              <div className="rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 p-3">
                <div className="flex gap-2">
                  <ShieldAlert className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
                      Do not say
                    </p>
                    <p className="text-sm text-red-800 dark:text-red-300 leading-relaxed">
                      {obj.do_not_say_in_response}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
