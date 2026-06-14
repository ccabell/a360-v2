"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Save, BookOpen, FlaskConical } from "lucide-react"
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
  rows,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-y"
      rows={rows ?? 3}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

function BulletList({ items }: { items: string[] }) {
  if (!items || items.length === 0)
    return <span className="text-sm text-muted-foreground">—</span>
  return (
    <ul className="text-sm list-disc list-inside space-y-0.5">
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

  const editActions = editing ? (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm" onClick={handleCancel}>Cancel</Button>
      <Button size="sm" onClick={handleSave} disabled={saving}>
        <Save className="h-3.5 w-3.5 mr-1" />
        {saving ? "Saving..." : "Save"}
      </Button>
    </div>
  ) : null

  // --- Combination layout ---
  if (doc.fuel_type === "combination") {
    const c = doc.content as Record<string, unknown>
    const productA = (c.product_a as string) ?? (c.A_solves ? "Product A" : "Product A")
    const productB = (c.product_b as string) ?? (c.B_adds ? "Product B" : "Product B")
    const evidenceLevel = c.evidence_level as string | undefined
    const sourceSupport = c.source_support_summary as string | undefined

    return (
      <div className="mt-4 space-y-4">
        {/* Why Together — hero card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <FlaskConical className="h-4 w-4 text-muted-foreground" />
              Why These Work Together
            </CardTitle>
            {editActions}
          </CardHeader>
          <CardContent className="pt-0">
            {editing ? (
              <Textarea value={fields.why_together} onChange={(v) => set("why_together", v)} rows={4} />
            ) : (
              <p className="text-sm leading-relaxed">{c.why_together as string || "—"}</p>
            )}
          </CardContent>
        </Card>

        {/* Product A / Product B side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {productA}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Solves</p>
                {editing ? (
                  <Textarea value={fields.a_solves} onChange={(v) => set("a_solves", v)} rows={2} />
                ) : (
                  <p className="text-sm leading-relaxed">{c.a_solves as string || "—"}</p>
                )}
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Does not solve</p>
                {editing ? (
                  <Textarea value={fields.a_does_not_solve} onChange={(v) => set("a_does_not_solve", v)} rows={2} />
                ) : (
                  <p className="text-sm leading-relaxed text-muted-foreground">{c.a_does_not_solve as string || "—"}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {productB}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Adds</p>
                {editing ? (
                  <Textarea value={fields.b_adds} onChange={(v) => set("b_adds", v)} rows={3} />
                ) : (
                  <p className="text-sm leading-relaxed">{c.b_adds as string || "—"}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clinical Rationale */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              Clinical Rationale
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            {editing ? (
              <Textarea value={fields.clinical_rationale} onChange={(v) => set("clinical_rationale", v)} rows={5} />
            ) : (
              <p className="text-sm leading-relaxed">{c.clinical_rationale as string || "—"}</p>
            )}

            {/* Evidence source */}
            {sourceSupport && !editing && (
              <div className="rounded-lg bg-muted/50 p-3 mt-3">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Evidence Sources</p>
                  {evidenceLevel && (
                    <Badge
                      variant="outline"
                      className={
                        evidenceLevel === "strong"
                          ? "border-green-300 text-green-700 dark:border-green-700 dark:text-green-400 text-[10px]"
                          : evidenceLevel === "moderate"
                          ? "border-yellow-300 text-yellow-700 dark:border-yellow-700 dark:text-yellow-400 text-[10px]"
                          : "border-red-300 text-red-700 dark:border-red-700 dark:text-red-400 text-[10px]"
                      }
                    >
                      {evidenceLevel}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{sourceSupport}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // --- Product layout ---
  if (doc.fuel_type === "product") {
    const c = doc.content
    return (
      <Card className="mt-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Clinical</CardTitle>
          {editActions}
        </CardHeader>
        <CardContent className="space-y-6">
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
              : <p className="text-sm">{c.does_not_solve || "—"}</p>}
          </Section>
        </CardContent>
      </Card>
    )
  }

  // --- Concern layout ---
  const c = doc.content
  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Clinical</CardTitle>
        {editActions}
      </CardHeader>
      <CardContent className="space-y-6">
        <Section label="Underlying Cause">
          {editing
            ? <Textarea value={fields.underlying_cause} onChange={(v) => set("underlying_cause", v)} />
            : <p className="text-sm">{c.underlying_cause || "—"}</p>}
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
            : <p className="text-sm">{c.treatment_sequence || "—"}</p>}
        </Section>
        <Section label="Expected Timeline">
          {editing
            ? <Textarea value={fields.expected_timeline} onChange={(v) => set("expected_timeline", v)} />
            : <p className="text-sm">{c.expected_timeline || "—"}</p>}
        </Section>
        <Section label="Realistic Expectations">
          {editing
            ? <Textarea value={fields.realistic_expectations} onChange={(v) => set("realistic_expectations", v)} />
            : <p className="text-sm">{c.realistic_expectations || "—"}</p>}
        </Section>
      </CardContent>
    </Card>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      {children}
    </div>
  )
}
