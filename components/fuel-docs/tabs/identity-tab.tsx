"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save } from "lucide-react"
import { FuelTypeBadge } from "@/components/fuel-docs/fuel-type-badge"
import type { FuelDoc } from "@/lib/types/fuel-docs"

interface TabProps {
  doc: FuelDoc
  editing: boolean
  onSave: (updates: Partial<{ content: Record<string, unknown>; review_status: string }>) => Promise<void>
}

const audienceOptions = ["agent", "staff", "patient"]

export function IdentityTab({ doc, editing, onSave }: TabProps) {
  const c = doc.content as Record<string, unknown>

  const [patientFacingName, setPatientFacingName] = React.useState(
    (c.patient_facing_name as string) ?? ""
  )
  const [oneLinePositioning, setOneLinePositioning] = React.useState(
    (c.one_line_positioning as string) ?? ""
  )
  const [typeSpecificField, setTypeSpecificField] = React.useState(
    doc.fuel_type === "combination"
      ? ((c.package_goal as string) ?? "")
      : doc.fuel_type === "product"
      ? ((c.mechanism_summary as string) ?? "")
      : ((c.patient_language as string[]) ?? []).join(", ")
  )
  const rawAudience = doc.audience
  const audienceArr = Array.isArray(rawAudience)
    ? rawAudience
    : typeof rawAudience === "string"
    ? [rawAudience]
    : []
  const [audience, setAudience] = React.useState<string[]>(audienceArr)
  const [patientSafe, setPatientSafe] = React.useState(doc.patient_safe ?? false)
  const [saving, setSaving] = React.useState(false)

  async function handleSave() {
    setSaving(true)
    try {
      const typeKey =
        doc.fuel_type === "combination"
          ? "package_goal"
          : doc.fuel_type === "product"
          ? "mechanism_summary"
          : "patient_language"

      const typeValue =
        doc.fuel_type === "concern"
          ? typeSpecificField.split(",").map((s) => s.trim()).filter(Boolean)
          : typeSpecificField

      await onSave({
        content: {
          ...doc.content,
          patient_facing_name: patientFacingName,
          one_line_positioning: oneLinePositioning,
          [typeKey]: typeValue,
        },
      })
    } finally {
      setSaving(false)
    }
  }

  function handleCancel() {
    setPatientFacingName((c.patient_facing_name as string) ?? "")
    setOneLinePositioning((c.one_line_positioning as string) ?? "")
    setTypeSpecificField(
      doc.fuel_type === "combination"
        ? ((c.package_goal as string) ?? "")
        : doc.fuel_type === "product"
        ? ((c.mechanism_summary as string) ?? "")
        : ((c.patient_language as string[]) ?? []).join(", ")
    )
    setAudience(audienceArr)
    setPatientSafe(doc.patient_safe ?? false)
  }

  const typeLabel =
    doc.fuel_type === "combination"
      ? "Package Goal"
      : doc.fuel_type === "product"
      ? "Mechanism Summary"
      : "Patient Language (comma-separated)"

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Identity</CardTitle>
        {editing && (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              <Save className="h-3.5 w-3.5 mr-1" />
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Type">
          <FuelTypeBadge type={doc.fuel_type} />
        </Field>

        <Field label="Patient Facing Name">
          {editing ? (
            <Input
              value={patientFacingName}
              onChange={(e) => setPatientFacingName(e.target.value)}
              placeholder="Patient-facing name..."
            />
          ) : (
            <span className="text-sm font-normal">{(c.patient_facing_name as string) || "—"}</span>
          )}
        </Field>

        <Field label="One-Line Positioning">
          {editing ? (
            <Input
              value={oneLinePositioning}
              onChange={(e) => setOneLinePositioning(e.target.value)}
              placeholder="One-line positioning..."
            />
          ) : (
            <span className="text-sm font-normal">{(c.one_line_positioning as string) || "—"}</span>
          )}
        </Field>

        <Field label={typeLabel}>
          {editing ? (
            <Input
              value={typeSpecificField}
              onChange={(e) => setTypeSpecificField(e.target.value)}
              placeholder={`${typeLabel}...`}
            />
          ) : (
            <span className="text-sm font-normal">
              {doc.fuel_type === "concern"
                ? ((c.patient_language as string[]) ?? []).join(", ") || "—"
                : (c[
                    doc.fuel_type === "combination" ? "package_goal" : "mechanism_summary"
                  ] as string) || "—"}
            </span>
          )}
        </Field>

        <Field label="Audience">
          {editing ? (
            <div className="flex gap-3">
              {audienceOptions.map((opt) => (
                <label key={opt} className="flex items-center gap-1.5 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={audience.includes(opt)}
                    onChange={(e) =>
                      setAudience(
                        e.target.checked
                          ? [...audience, opt]
                          : audience.filter((a) => a !== opt)
                      )
                    }
                  />
                  <span className="capitalize">{opt}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="flex gap-1">
              {audienceArr.length > 0
                ? audienceArr.map((a) => (
                    <span
                      key={a}
                      className="text-xs bg-muted px-2 py-0.5 rounded capitalize"
                    >
                      {a}
                    </span>
                  ))
                : <span className="text-sm font-normal text-muted-foreground">—</span>}
            </div>
          )}
        </Field>

        <Field label="Patient Safe">
          {editing ? (
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={patientSafe}
                onChange={(e) => setPatientSafe(e.target.checked)}
              />
              <span>Patient safe</span>
            </label>
          ) : (
            <span className="text-sm font-normal">{doc.patient_safe ? "Yes" : "No"}</span>
          )}
        </Field>

        <Field label="Last Reviewed">
          <span className="text-sm font-normal text-muted-foreground">
            {doc.last_reviewed ?? "—"}
          </span>
        </Field>
      </CardContent>
    </Card>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-muted-foreground shrink-0 w-40">{label}</span>
      <div className="flex-1 text-right">{children}</div>
    </div>
  )
}
