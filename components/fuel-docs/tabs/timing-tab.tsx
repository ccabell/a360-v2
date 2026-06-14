"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Clock, CalendarDays, ArrowRight, RotateCcw } from "lucide-react"
import type { FuelDoc } from "@/lib/types/fuel-docs"

interface TabProps {
  doc: FuelDoc
  editing: boolean
  onSave: (updates: Partial<{ content: Record<string, unknown>; review_status: string }>) => Promise<void>
}

export function TimingTab({ doc }: TabProps) {
  const c = doc.content as Record<string, unknown>

  const sameSessionOk = c.same_session_ok
  const sequencingNote = c.sequencing_note as string | undefined
  const timingNote = c.timing_note as string | undefined
  const downtimeNote = c.downtime_note as string | undefined
  const maintenanceStory = c.maintenance_story as string | undefined
  const rebookingTrigger = c.rebooking_trigger as string | undefined
  const nextVisitPrompt = c.next_visit_prompt as string | undefined

  return (
    <div className="mt-4 space-y-4">
      {/* Same-session indicator */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-3">
            {sameSessionOk === true ? (
              <>
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium">Same-session OK</p>
                  <p className="text-sm text-muted-foreground">These treatments can be performed in a single visit.</p>
                </div>
              </>
            ) : sameSessionOk === false ? (
              <>
                <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-medium">Separate sessions required</p>
                  <p className="text-sm text-muted-foreground">These treatments should be performed at different visits.</p>
                </div>
              </>
            ) : (
              <>
                <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium">Conditional</p>
                  <p className="text-sm text-muted-foreground">
                    {typeof sameSessionOk === "string" ? sameSessionOk : "Same-session feasibility depends on provider assessment."}
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sequencing & Timing */}
      {(sequencingNote || timingNote) && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              Sequencing & Timing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {sequencingNote && (
              <InfoBlock label="Sequencing" value={sequencingNote} />
            )}
            {timingNote && (
              <InfoBlock label="Timing" value={timingNote} />
            )}
          </CardContent>
        </Card>
      )}

      {/* Downtime */}
      {downtimeNote && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Downtime
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm leading-relaxed">{downtimeNote}</p>
          </CardContent>
        </Card>
      )}

      {/* Maintenance & Rebooking */}
      {(maintenanceStory || rebookingTrigger || nextVisitPrompt) && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
              Maintenance & Rebooking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {maintenanceStory && (
              <InfoBlock label="Maintenance Story" value={maintenanceStory} />
            )}
            {rebookingTrigger && (
              <InfoBlock label="Rebooking Trigger" value={rebookingTrigger} />
            )}
            {nextVisitPrompt && (
              <div className="rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 p-3">
                <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                  Next visit prompt
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed italic">
                  &ldquo;{nextVisitPrompt}&rdquo;
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm leading-relaxed">{value}</p>
    </div>
  )
}
