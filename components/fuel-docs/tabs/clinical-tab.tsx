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

export function ClinicalTab({ doc, editing, onSave }: TabProps) {
  const [fields, setFields] = React.useState<Record<string, string>>(() : Record<string, string> => {
    if (doc.fuel_type === "combination") {
      const c = doc.content
      return {
        why_together: c.why_together ?? "",
        a_solves: c.a_solves ?? "",
        a_does_not_solve: c.a_does_not_solve ?? "",
        b_adds: c.b_adds ?? "",
        clinical_rationale: c.clinical_rationale ?? "",
      }
    }
    if (doc.fuel_type === "product") {
      const c = doc.content
      return {
        fda_indications: arrayToLines(c.fda_indications),
        off_label_common: arrayToLines(c.off_label_common),
        contraindications: arrayToLines(c.contraindications),
        does_not_solve: c.does_not_solve ?? "",
      }
    }
    // concern
    const c = doc.content
    return {
      underlying_cause: c.underlying_cause ?? "",
      what_helps: arrayToLines(c.what_helps),
      what_does_not_help: arrayToLines(c.what_does_not_help),
      treatment_sequence: c.treatment_sequence ?? "",
      expected_timeline: c.expected_timeline ?? "",
      realistic_expectations: c.realistic_expectations ?? "",
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
        updates.why_together = fields.why_together
        updates.a_solves = fields.a_solves
        updates.a_does_not_solve = fields.a_does_not_solve
        updates.b_adds = fields.b_adds
        updates.clinical_rationale = fields.clinical_rationale
      } else if (doc.fuel_type === "product") {
        updates.fda_indications = linesToArray(fields.fda_indications)
        updates.off_label_common = linesToArray(fields.off_label_common)
        updates.contraindications = linesToArray(fields.contraindications)
        updates.does_not_solve = fields.does_not_solve
      } else {
        updates.underlying_cause = fields.underlying_cause
        updates.what_helps = linesToArray(fields.what_helps)
        updates.what_does_not_help = linesToArray(fields.what_does_not_help)
        updates.treatment_sequence = fields.treatment_sequence
        updates.expected_timeline = fields.expected_timeline
        updates.realistic_expectations = fields.realistic_expectations
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
        why_together: c.why_together ?? "",
        a_solves: c.a_solves ?? "",
        a_does_not_solve: c.a_does_not_solve ?? "",
        b_adds: c.b_adds ?? "",
        clinical_rationale: c.clinical_rationale ?? "",
      })
    } else if (doc.fuel_type === "product") {
      const c = doc.content
      setFields({
        fda_indications: arrayToLines(c.fda_indications),
        off_label_common: arrayToLines(c.off_label_common),
        contraindications: arrayToLines(c.contraindications),
        does_not_solve: c.does_not_solve ?? "",
      })
    } else {
      const c = doc.content
      setFields({
        underlying_cause: c.underlying_cause ?? "",
        what_helps: arrayToLines(c.what_helps),
        what_does_not_help: arrayToLines(c.what_does_not_help),
        treatment_sequence: c.treatment_sequence ?? "",
        expected_timeline: c.expected_timeline ?? "",
        realistic_expectations: c.realistic_expectations ?? "",
      })
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Clinical</CardTitle>
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
              <Section label="Why Together">
                {editing
                  ? <Textarea value={fields.why_together} onChange={(v) => set("why_together", v)} />
                  : <p className="text-sm font-normal">{c.why_together || "—"}</p>}
              </Section>
              <Section label="A Solves">
                {editing
                  ? <Textarea value={fields.a_solves} onChange={(v) => set("a_solves", v)} />
                  : <p className="text-sm font-normal">{c.a_solves || "—"}</p>}
              </Section>
              <Section label="A Does Not Solve">
                {editing
                  ? <Textarea value={fields.a_does_not_solve} onChange={(v) => set("a_does_not_solve", v)} />
                  : <p className="text-sm font-normal">{c.a_does_not_solve || "—"}</p>}
              </Section>
              <Section label="B Adds">
                {editing
                  ? <Textarea value={fields.b_adds} onChange={(v) => set("b_adds", v)} />
                  : <p className="text-sm font-normal">{c.b_adds || "—"}</p>}
              </Section>
              <Section label="Clinical Rationale">
                {editing
                  ? <Textarea value={fields.clinical_rationale} onChange={(v) => set("clinical_rationale", v)} />
                  : <p className="text-sm font-normal">{c.clinical_rationale || "—"}</p>}
              </Section>
            </>
          )
        })()}

        {doc.fuel_type === "product" && (() => {
          const c = doc.content
          return (
            <>
              <Section label="FDA Indications">
                {editing
                  ? <Textarea value={fields.fda_indications} onChange={(v) => set("fda_indications", v)} placeholder="One item per line" />
                  : <BulletList items={c.fda_indications ?? []} />}
              </Section>
              <Section label="Off-Label (Common)">
                {editing
                  ? <Textarea value={fields.off_label_common} onChange={(v) => set("off_label_common", v)} placeholder="One item per line" />
                  : <BulletList items={c.off_label_common ?? []} />}
              </Section>
              <Section label="Contraindications">
                {editing
                  ? <Textarea value={fields.contraindications} onChange={(v) => set("contraindications", v)} placeholder="One item per line" />
                  : <BulletList items={c.contraindications ?? []} />}
              </Section>
              <Section label="Does Not Solve">
                {editing
                  ? <Textarea value={fields.does_not_solve} onChange={(v) => set("does_not_solve", v)} />
                  : <p className="text-sm font-normal">{c.does_not_solve || "—"}</p>}
              </Section>
            </>
          )
        })()}

        {doc.fuel_type === "concern" && (() => {
          const c = doc.content
          return (
            <>
              <Section label="Underlying Cause">
                {editing
                  ? <Textarea value={fields.underlying_cause} onChange={(v) => set("underlying_cause", v)} />
                  : <p className="text-sm font-normal">{c.underlying_cause || "—"}</p>}
              </Section>
              <Section label="What Helps">
                {editing
                  ? <Textarea value={fields.what_helps} onChange={(v) => set("what_helps", v)} placeholder="One item per line" />
                  : <BulletList items={c.what_helps ?? []} />}
              </Section>
              <Section label="What Does Not Help">
                {editing
                  ? <Textarea value={fields.what_does_not_help} onChange={(v) => set("what_does_not_help", v)} placeholder="One item per line" />
                  : <BulletList items={c.what_does_not_help ?? []} />}
              </Section>
              <Section label="Treatment Sequence">
                {editing
                  ? <Textarea value={fields.treatment_sequence} onChange={(v) => set("treatment_sequence", v)} />
                  : <p className="text-sm font-normal">{c.treatment_sequence || "—"}</p>}
              </Section>
              <Section label="Expected Timeline">
                {editing
                  ? <Textarea value={fields.expected_timeline} onChange={(v) => set("expected_timeline", v)} />
                  : <p className="text-sm font-normal">{c.expected_timeline || "—"}</p>}
              </Section>
              <Section label="Realistic Expectations">
                {editing
                  ? <Textarea value={fields.realistic_expectations} onChange={(v) => set("realistic_expectations", v)} />
                  : <p className="text-sm font-normal">{c.realistic_expectations || "—"}</p>}
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
