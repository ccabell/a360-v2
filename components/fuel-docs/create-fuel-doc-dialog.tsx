"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import type { FuelDocType } from "@/lib/types/fuel-docs"
import { createEmptyContent } from "@/lib/types/fuel-docs"
import { SAMPLE_TEMPLATES } from "@/lib/fuel-docs/sample-templates"

interface CreateFuelDocDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: () => void
}

export function CreateFuelDocDialog({ open, onOpenChange, onCreated }: CreateFuelDocDialogProps) {
  const [fuelType, setFuelType] = React.useState<FuelDocType>("combination")
  const [productName, setProductName] = React.useState("")
  const [useSample, setUseSample] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!productName.trim()) return

    setSaving(true)
    setError(null)

    try {
      const res = await fetch("/api/fuel-docs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: productName.trim(),
          source_type: fuelType,
          content: useSample ? SAMPLE_TEMPLATES[fuelType] : createEmptyContent(fuelType),
          metadata: { template_version: "1.0", fuel_type: fuelType },
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? "Failed to create fuel doc")
      }

      setProductName("")
      setFuelType("combination")
      onCreated()
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Fuel Doc</DialogTitle>
            <DialogDescription>
              Create a new agent intelligence document. Choose a type to get started.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Type</label>
              <Select value={fuelType} onValueChange={(v) => setFuelType(v as FuelDocType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="combination">Combination</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="concern">Concern</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Display Name</label>
              <Input
                placeholder="e.g., Botox + Vollure or Botox Cosmetic"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={useSample}
                onChange={(e) => setUseSample(e.target.checked)}
                className="rounded border-input"
              />
              <span className="text-muted-foreground">
                Pre-fill with sample template content
              </span>
            </label>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!productName.trim() || saving}>
              {saving ? "Creating..." : "Create Fuel Doc"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
