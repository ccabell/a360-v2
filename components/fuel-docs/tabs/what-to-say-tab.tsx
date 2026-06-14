"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import type { FuelDoc } from "@/lib/types/fuel-docs"

interface TabProps {
  doc: FuelDoc
  editing: boolean
  onSave: (updates: Partial<{ content: Record<string, unknown>; review_status: string }>) => Promise<void>
}

function Textarea({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <textarea
      className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm resize-y"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

function BulletList({ items }: { items: string[] }) {
  if (!items || items.length === 0)
    return <span className="text-sm font-normal text-muted-foreground">—</span>
  return (
    <ul className="text-sm font-normal list-disc list-inside space-y-0.5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

function arrayToLines(arr: string[] | undefined): string {
  return (arr ?? []).join("\n")
}

function linesToArray(s: string): string[] {
  return s.split("\n").map((l) => l.trim()).filter(Boolean)
}

export function WhatToSayTab({ doc, editing, onSave }: TabProps) {
  const [fields, setFields] = React.useState<Record<string, string>>(() : Record<string, string> => {
    if (doc.fuel_type === "combination") {
      const c = doc.content
      return {
        patient_education_summary: c.patient_education_summary ?? "",
        staff_close: c.staff_close ?? "",
        staff_talking_points: typeof c.staff_talking_points === "string"
          ? c.staff_talking_points
          : "",
      }
    }
    if (doc.fuel_type === "product") {
      const c = doc.content
      return {
        key_talking_points: arrayToLines(c.key_talking_points),
        differentiators: c.differentiators ?? "",
      }
    }
    // concern
    const c = doc.content
    return {
      consultation_language: c.consultation_language ?? "",
      staff_talking_points: arrayToLines(c.staff_talking_points),
    }
  })

  const [saving, setSaving] = React.useState(false)

  function set(key: string, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      const updates: Record<string, unknown> = { ...(doc.content as Record<string, unknown>) }
      if (doc.fuel_type === "combination") {
        updates.patient_education_summary = fields.patient_education_summary
        updates.staff_close = fields.staff_close
        updates.staff_talking_points = fields.staff_talking_points
      } else if (doc.fuel_type === "product") {
        updates.key_talking_points = linesToArray(fields.key_talking_points)
        updates.differentiators = fields.differentiators
      } else {
        updates.consultation_language = fields.consultation_language
        updates.staff_talking_points = linesToArray(fields.staff_talking_points)
      }
      await onSave({ content: updates })
    } finally {
      setSaving(false)
    }
  }

  function handleCancel() {
    if (doc.fuel_type === "combination") {
      const c = doc.content
      setFields({
        patient_education_summary: c.patient_education_summary ?? "",
        staff_close: c.staff_close ?? "",
        staff_talking_points: typeof c.staff_talking_points === "string" ? c.staff_talking_points : "",
      })
    } else if (doc.fuel_type === "product") {
      const c = doc.content
      setFields({
        key_talking_points: arrayToLines(c.key_talking_points),
        differentiators: c.differentiators ?? "",
      })
    } else {
      const c = doc.content
      setFields({
        consultation_language: c.consultation_language ?? "",
        staff_talking_points: arrayToLines(c.staff_talking_points),
      })
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">What to Say</CardTitle>
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
      <CardContent className="space-y-6">
        {doc.fuel_type === "combination" && (() => {
          const c = doc.content
          return (
            <>
              <Section label="Patient Education Summary">
                {editing
                  ? <Textarea value={fields.patient_education_summary} onChange={(v) => set("patient_education_summary", v)} />
                  : <p className="text-sm font-normal">{c.patient_education_summary || "—"}</p>}
              </Section>
              <Section label="Staff Close">
                {editing
                  ? <Textarea value={fields.staff_close} onChange={(v) => set("staff_close", v)} />
                  : <p className="text-sm font-normal">{c.staff_close || "—"}</p>}
              </Section>
              <Section label="Staff Talking Points">
                {editing
                  ? <Textarea value={fields.staff_talking_points} onChange={(v) => set("staff_talking_points", v)} placeholder="Talking points..." />
                  : <p className="text-sm font-normal">{typeof c.staff_talking_points === "string" ? c.staff_talking_points || "—" : "—"}</p>}
              </Section>
            </>
          )
        })()}

        {doc.fuel_type === "product" && (() => {
          const c = doc.content
          return (
            <>
              <Section label="Key Talking Points">
                {editing
                  ? <Textarea value={fields.key_talking_points} onChange={(v) => set("key_talking_points", v)} placeholder="One item per line" />
                  : <BulletList items={c.key_talking_points ?? []} />}
              </Section>
              <Section label="Differentiators">
                {editing
                  ? <Textarea value={fields.differentiators} onChange={(v) => set("differentiators", v)} />
                  : <p className="text-sm font-normal">{c.differentiators || "—"}</p>}
              </Section>
            </>
          )
        })()}

        {doc.fuel_type === "concern" && (() => {
          const c = doc.content
          return (
            <>
              <Section label="Consultation Language">
                {editing
                  ? <Textarea value={fields.consultation_language} onChange={(v) => set("consultation_language", v)} />
                  : <p className="text-sm font-normal">{c.consultation_language || "—"}</p>}
              </Section>
              <Section label="Staff Talking Points">
                {editing
                  ? <Textarea value={fields.staff_talking_points} onChange={(v) => set("staff_talking_points", v)} placeholder="One item per line" />
                  : <BulletList items={c.staff_talking_points ?? []} />}
              </Section>
            </>
          )
        })()}
      </CardContent>
    </Card>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-base font-semibold leading-tight">{label}</p>
      {children}
    </div>
  )
}
