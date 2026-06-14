"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Pencil,
  Shield,
  Stethoscope,
  MessageSquare,
  AlertTriangle,
  Clock,
  HelpCircle,
  FileText,
  Code,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { JSONViewer } from "@/components/ui/json-viewer"
import { ReviewStatusBadge } from "@/components/fuel-docs/status-badge"
import { IdentityTab } from "@/components/fuel-docs/tabs/identity-tab"
import { ClinicalTab } from "@/components/fuel-docs/tabs/clinical-tab"
import { WhatToSayTab } from "@/components/fuel-docs/tabs/what-to-say-tab"
import { WhatNotToSayTab } from "@/components/fuel-docs/tabs/what-not-to-say-tab"
import { ObjectionsTab } from "@/components/fuel-docs/tabs/objections-tab"
import { TimingTab } from "@/components/fuel-docs/tabs/timing-tab"
import { SopTab } from "@/components/fuel-docs/tabs/sop-tab"
import { MetadataTab } from "@/components/fuel-docs/tabs/metadata-tab"
import type { FuelDoc, ReviewStatus } from "@/lib/types/fuel-docs"
import { SEED_FUEL_DOCS } from "@/lib/fuel-docs/seed-data"

// Format pair_key segment into display name
function formatSegment(seg: string): string {
  return seg
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export default function FuelDocDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [doc, setDoc] = React.useState<FuelDoc | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [editing, setEditing] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  const fetchDoc = React.useCallback(async () => {
    const seedDoc = SEED_FUEL_DOCS.find((d) => d.id === id)
    if (seedDoc) {
      setDoc(seedDoc)
      setLoading(false)
      return
    }
    try {
      const res = await fetch(`/api/fuel-docs/${id}`)
      if (!res.ok) throw new Error("Fuel doc not found")
      setDoc(await res.json())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load fuel doc")
    } finally {
      setLoading(false)
    }
  }, [id])

  React.useEffect(() => { fetchDoc() }, [fetchDoc])

  const handleSave = React.useCallback(
    async (updates: Partial<{ content: Record<string, unknown>; review_status: string }>) => {
      setSaving(true)
      try {
        const res = await fetch(`/api/fuel-docs/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        })
        if (!res.ok) throw new Error("Failed to save")
        await fetchDoc()
      } catch (err) {
        console.error("Save failed:", err)
      } finally {
        setSaving(false)
      }
    },
    [id, fetchDoc]
  )

  async function handleStatusChange(status: ReviewStatus) {
    setSaving(true)
    try {
      const res = await fetch(`/api/fuel-docs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review_status: status }),
      })
      if (!res.ok) throw new Error("Failed to update status")
      await fetchDoc()
    } catch (err) {
      console.error("Status update failed:", err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading fuel doc...
        </div>
      </div>
    )
  }

  if (error || !doc) {
    return (
      <div className="p-8">
        <div className="max-w-md mx-auto text-center py-16">
          <p className="text-destructive text-lg font-medium">{error ?? "Fuel doc not found"}</p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => router.push("/dashboard/fuel-library")}
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back to Fuel Library
          </Button>
        </div>
      </div>
    )
  }

  const c = doc.content as Record<string, unknown>
  const currentStatus = (doc.review_status ?? "draft") as ReviewStatus
  const isSeed = doc.id.startsWith("seed-")
  const canApprove = !isSeed && (currentStatus === "draft" || currentStatus === "in_review")
  const canReject = !isSeed && (currentStatus === "approved" || currentStatus === "active" || currentStatus === "in_review")

  // Parse pair names for combination docs
  const pairKey = c.pair_key as string | undefined
  const pairParts = pairKey?.split("__")
  const productA = (c.product_a as string) ?? (pairParts?.[0] ? formatSegment(pairParts[0]) : null)
  const productB = (c.product_b as string) ?? (pairParts?.[1] ? formatSegment(pairParts[1]) : null)
  const isCombination = doc.fuel_type === "combination"

  // Evidence & concern data
  const evidenceLevel = c.evidence_level as string | undefined
  const patientFacingName = c.patient_facing_name as string | undefined
  const concernTags = (c.concern_tags as string[]) ?? []

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground -ml-2"
        onClick={() => router.push("/dashboard/fuel-library")}
      >
        <ArrowLeft className="h-3.5 w-3.5 mr-1" />
        Fuel Library
      </Button>

      {/* Hero header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-2 flex-1">
            {/* Product names */}
            {isCombination && productA && productB ? (
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold tracking-tight">{productA}</h1>
                <span className="text-lg text-muted-foreground font-light">+</span>
                <h1 className="text-2xl font-bold tracking-tight">{productB}</h1>
              </div>
            ) : (
              <h1 className="text-2xl font-bold tracking-tight">{doc.product_name}</h1>
            )}

            {/* Patient-facing name */}
            {patientFacingName && (
              <p className="text-base text-muted-foreground italic">
                &ldquo;{patientFacingName}&rdquo;
              </p>
            )}

            {/* Badges row */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <ReviewStatusBadge status={currentStatus} />
              {evidenceLevel && (
                <Badge
                  variant="outline"
                  className={
                    evidenceLevel === "strong"
                      ? "border-green-300 text-green-700 dark:border-green-700 dark:text-green-400"
                      : evidenceLevel === "moderate"
                      ? "border-yellow-300 text-yellow-700 dark:border-yellow-700 dark:text-yellow-400"
                      : "border-red-300 text-red-700 dark:border-red-700 dark:text-red-400"
                  }
                >
                  {evidenceLevel} evidence
                </Badge>
              )}
              {isCombination && (
                <Badge variant="outline" className="text-muted-foreground">
                  Combination
                </Badge>
              )}
              {doc.reviewed_by && (
                <span className="text-xs text-muted-foreground ml-1">
                  Approved by {doc.reviewed_by}
                </span>
              )}
            </div>

            {/* Concern tags */}
            {concernTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {concernTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0 pt-1">
            {canApprove && (
              <Button
                size="sm"
                onClick={() => handleStatusChange("approved")}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                Approve
              </Button>
            )}
            {canReject && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusChange("draft")}
                disabled={saving}
              >
                <XCircle className="h-3.5 w-3.5 mr-1.5 text-red-500" />
                Reject
              </Button>
            )}
            <Button
              variant={editing ? "default" : "outline"}
              size="sm"
              onClick={() => setEditing(!editing)}
              disabled={saving}
            >
              <Pencil className="h-3.5 w-3.5 mr-1.5" />
              {editing ? "Done" : "Edit"}
            </Button>
          </div>
        </div>

        {/* One-line positioning */}
        {typeof c.one_line_positioning === "string" && c.one_line_positioning && (
          <p className="text-sm text-foreground/80 leading-relaxed max-w-3xl">
            {c.one_line_positioning as string}
          </p>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="clinical">
        <TabsList variant="line" className="flex-wrap">
          <TabsTrigger value="clinical" className="gap-1.5">
            <Stethoscope className="h-3.5 w-3.5" />
            Clinical
          </TabsTrigger>
          <TabsTrigger value="what-to-say" className="gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" />
            What to Say
          </TabsTrigger>
          <TabsTrigger value="what-not-to-say" className="gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5" />
            Guardrails
          </TabsTrigger>
          {isCombination && (c.top_objections as unknown[])?.length > 0 && (
            <TabsTrigger value="objections" className="gap-1.5">
              <HelpCircle className="h-3.5 w-3.5" />
              Objections
            </TabsTrigger>
          )}
          {isCombination && (
            <TabsTrigger value="timing" className="gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Timing
            </TabsTrigger>
          )}
          <TabsTrigger value="identity" className="gap-1.5">
            <Shield className="h-3.5 w-3.5" />
            Identity
          </TabsTrigger>
          <TabsTrigger value="metadata" className="gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            Metadata
          </TabsTrigger>
          <TabsTrigger value="raw" className="gap-1.5">
            <Code className="h-3.5 w-3.5" />
            JSON
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clinical">
          <ClinicalTab doc={doc} editing={editing} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="what-to-say">
          <WhatToSayTab doc={doc} editing={editing} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="what-not-to-say">
          <WhatNotToSayTab doc={doc} editing={editing} onSave={handleSave} />
        </TabsContent>

        {isCombination && (
          <TabsContent value="objections">
            <ObjectionsTab doc={doc} editing={editing} onSave={handleSave} />
          </TabsContent>
        )}

        {isCombination && (
          <TabsContent value="timing">
            <TimingTab doc={doc} editing={editing} onSave={handleSave} />
          </TabsContent>
        )}

        <TabsContent value="identity">
          <IdentityTab doc={doc} editing={editing} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="metadata">
          <MetadataTab doc={doc} editing={editing} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="raw">
          <Card className="mt-4">
            <CardContent className="p-6">
              <JSONViewer data={doc.content} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
