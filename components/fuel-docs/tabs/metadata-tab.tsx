"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReviewStatusBadge } from "@/components/fuel-docs/status-badge"
import type { FuelDoc, ReviewStatus } from "@/lib/types/fuel-docs"

interface TabProps {
  doc: FuelDoc
  editing: boolean
  onSave: (updates: Partial<{ content: Record<string, unknown>; review_status: string }>) => Promise<void>
}

const statusTransitions: Partial<Record<ReviewStatus, ReviewStatus>> = {
  draft: "approved",
  in_review: "approved",
}

const promoteLabels: Partial<Record<ReviewStatus, string>> = {
  draft: "Approve",
  in_review: "Approve",
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—"
  return new Date(iso).toLocaleString()
}

export function MetadataTab({ doc, onSave }: TabProps) {
  const [promoting, setPromoting] = React.useState(false)

  const currentStatus = (doc.review_status ?? "draft") as ReviewStatus
  const nextStatus = statusTransitions[currentStatus]
  const promoteLabel = promoteLabels[currentStatus]

  async function handlePromote() {
    if (!nextStatus) return
    setPromoting(true)
    try {
      await onSave({ review_status: nextStatus })
    } finally {
      setPromoting(false)
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Metadata</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Template Version">
          <span className="text-sm font-normal font-mono">{doc.template_version ?? "—"}</span>
        </Field>

        <Field label="Review Status">
          <div className="flex items-center gap-3">
            <ReviewStatusBadge status={currentStatus} />
            {nextStatus && promoteLabel && (
              <Button
                size="sm"
                variant="outline"
                onClick={handlePromote}
                disabled={promoting}
              >
                {promoting ? "Saving..." : promoteLabel}
              </Button>
            )}
          </div>
        </Field>

        <Field label="Reviewed By">
          <span className="text-sm font-normal text-muted-foreground">{doc.reviewed_by ?? "—"}</span>
        </Field>

        <Field label="Last Reviewed">
          <span className="text-sm font-normal text-muted-foreground">{doc.last_reviewed ?? "—"}</span>
        </Field>

        <Field label="Created">
          <span className="text-sm font-normal text-muted-foreground">{formatDate(doc.created_at)}</span>
        </Field>

        <Field label="Updated">
          <span className="text-sm font-normal text-muted-foreground">{formatDate(doc.updated_at)}</span>
        </Field>
      </CardContent>
    </Card>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-muted-foreground shrink-0 w-36">{label}</span>
      <div className="flex-1 text-right">{children}</div>
    </div>
  )
}
