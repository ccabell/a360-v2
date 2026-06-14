"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { JSONViewer } from "@/components/ui/json-viewer"
import { FuelTypeBadge } from "@/components/fuel-docs/fuel-type-badge"
import { ReviewStatusBadge } from "@/components/fuel-docs/status-badge"
import { IdentityTab } from "@/components/fuel-docs/tabs/identity-tab"
import { ClinicalTab } from "@/components/fuel-docs/tabs/clinical-tab"
import { WhatToSayTab } from "@/components/fuel-docs/tabs/what-to-say-tab"
import { WhatNotToSayTab } from "@/components/fuel-docs/tabs/what-not-to-say-tab"
import { SopTab } from "@/components/fuel-docs/tabs/sop-tab"
import { MetadataTab } from "@/components/fuel-docs/tabs/metadata-tab"
import type { FuelDoc, ReviewStatus } from "@/lib/types/fuel-docs"
import { SEED_FUEL_DOCS } from "@/lib/fuel-docs/seed-data"

export default function FuelDocDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [doc, setDoc] = React.useState<FuelDoc | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [editing, setEditing] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  const fetchDoc = React.useCallback(async () => {
    // Check seed data first for seed- prefixed IDs
    const seedDoc = SEED_FUEL_DOCS.find((d) => d.id === id)
    if (seedDoc) {
      setDoc(seedDoc)
      setLoading(false)
      return
    }
    try {
      const res = await fetch(`/api/fuel-docs/${id}`)
      if (!res.ok) throw new Error("Fuel doc not found")
      const data = await res.json()
      setDoc(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load fuel doc")
    } finally {
      setLoading(false)
    }
  }, [id])

  React.useEffect(() => {
    fetchDoc()
  }, [fetchDoc])

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
    return <div className="p-6 text-muted-foreground">Loading fuel doc...</div>
  }

  if (error || !doc) {
    return (
      <div className="p-6">
        <p className="text-destructive">{error ?? "Fuel doc not found"}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push("/dashboard/fuel-library")}
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Fuel Library
        </Button>
      </div>
    )
  }

  const currentStatus = (doc.review_status ?? "draft") as ReviewStatus
  const isSeed = doc.id.startsWith("seed-")
  const canApprove = !isSeed && (currentStatus === "draft" || currentStatus === "in_review")
  const canReject = !isSeed && (currentStatus === "approved" || currentStatus === "active" || currentStatus === "in_review")

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard/fuel-library")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-semibold leading-tight">{doc.product_name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <FuelTypeBadge type={doc.fuel_type} />
            <ReviewStatusBadge status={currentStatus} />
            {doc.reviewed_by && (
              <span className="text-xs text-muted-foreground">
                Approved by {doc.reviewed_by}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {canApprove && (
            <Button
              size="sm"
              onClick={() => handleStatusChange("approved")}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
              {saving ? "Saving..." : "Approve"}
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
            {editing ? "Done Editing" : "Edit"}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="identity">
        <TabsList variant="line">
          <TabsTrigger value="identity">Identity</TabsTrigger>
          <TabsTrigger value="clinical">Clinical</TabsTrigger>
          <TabsTrigger value="what-to-say">What to Say</TabsTrigger>
          <TabsTrigger value="what-not-to-say">What Not to Say</TabsTrigger>
          <TabsTrigger value="sops">SOPs</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="raw">Raw JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="identity">
          <IdentityTab doc={doc} editing={editing} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="clinical">
          <ClinicalTab doc={doc} editing={editing} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="what-to-say">
          <WhatToSayTab doc={doc} editing={editing} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="what-not-to-say">
          <WhatNotToSayTab doc={doc} editing={editing} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="sops">
          <SopTab doc={doc} editing={editing} onSave={handleSave} />
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
