"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save, ShieldAlert, AlertTriangle, Building2 } from "lucide-react"
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

function WarningList({ items, variant = "red" }: { items: string[]; variant?: "red" | "amber" | "gray" }) {
  if (!items || items.length === 0)
    return <span className="text-sm text-muted-foreground">—</span>

  const colors = {
    red: "border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20",
    amber: "border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20",
    gray: "border-border bg-muted/30",
  }

  const dotColors = {
    red: "bg-red-400",
    amber: "bg-amber-400",
    gray: "bg-muted-foreground/40",
  }

  return (
    <div className={`rounded-lg border p-4 ${colors[variant]}`}>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
            <span className={`h-1.5 w-1.5 rounded-full shrink-0 mt-2 ${dotColors[variant]}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function toLines(arr: string[] | undefined): string {
  return (arr ?? []).join("\n")
}

function fromLines(s: string): string[] {
  return s.split("\n").map((l) => l.trim()).filter(Boolean)
}

export function WhatNotToSayTab({ doc, editing, onSave }: TabProps) {
  const [fields, setFields] = React.useState<Record<string, string>>(() : Record<string, string> => {
    if (doc.fuel_type === "combination") {
      const c = doc.content
      return {
        dns_universal: toLines(c.do_not_say?.universal),
        dns_pair_specific: toLines(c.do_not_say?.pair_specific),
        dns_practice_specific: toLines(c.do_not_say?.practice_specific),
      }
    }
    if (doc.fuel_type === "product") {
      const c = doc.content
      return {
        do_not_say: toLines(c.do_not_say),
        do_not_claim: toLines(c.do_not_claim),
      }
    }
    const c = doc.content
    return {
      do_not_say: toLines(c.do_not_say),
      do_not_promise: toLines(c.do_not_promise),
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
        updates.do_not_say = {
          universal: fromLines(fields.dns_universal),
          pair_specific: fromLines(fields.dns_pair_specific),
          practice_specific: fromLines(fields.dns_practice_specific),
        }
      } else if (doc.fuel_type === "product") {
        updates.do_not_say = fromLines(fields.do_not_say)
        updates.do_not_claim = fromLines(fields.do_not_claim)
      } else {
        updates.do_not_say = fromLines(fields.do_not_say)
        updates.do_not_promise = fromLines(fields.do_not_promise)
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
        dns_universal: toLines(c.do_not_say?.universal),
        dns_pair_specific: toLines(c.do_not_say?.pair_specific),
        dns_practice_specific: toLines(c.do_not_say?.practice_specific),
      })
    } else if (doc.fuel_type === "product") {
      const c = doc.content
      setFields({
        do_not_say: toLines(c.do_not_say),
        do_not_claim: toLines(c.do_not_claim),
      })
    } else {
      const c = doc.content
      setFields({
        do_not_say: toLines(c.do_not_say),
        do_not_promise: toLines(c.do_not_promise),
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
    const c = doc.content
    const universal = c.do_not_say?.universal ?? []
    const pairSpecific = c.do_not_say?.pair_specific ?? []
    const practiceSpecific = c.do_not_say?.practice_specific ?? []

    return (
      <div className="mt-4 space-y-4">
        {editActions && (
          <div className="flex justify-end">{editActions}</div>
        )}

        {/* Pair-specific — most important, show first */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-red-500" />
              Pair-Specific Guardrails
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Specific to this product combination. Review carefully.
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            {editing ? (
              <Textarea value={fields.dns_pair_specific} onChange={(v) => set("dns_pair_specific", v)} placeholder="One item per line" />
            ) : (
              <WarningList items={pairSpecific} variant="red" />
            )}
          </CardContent>
        </Card>

        {/* Universal */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Universal Guardrails
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Apply to all combination fuel docs. {universal.length} items.
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            {editing ? (
              <Textarea value={fields.dns_universal} onChange={(v) => set("dns_universal", v)} placeholder="One item per line" />
            ) : (
              <WarningList items={universal} variant="amber" />
            )}
          </CardContent>
        </Card>

        {/* Practice-specific */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              Practice-Specific
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Added by individual practices. {practiceSpecific.length === 0 ? "None configured." : `${practiceSpecific.length} items.`}
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            {editing ? (
              <Textarea value={fields.dns_practice_specific} onChange={(v) => set("dns_practice_specific", v)} placeholder="One item per line" />
            ) : (
              <WarningList items={practiceSpecific} variant="gray" />
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // --- Product / Concern fallback ---
  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Guardrails</CardTitle>
        {editActions}
      </CardHeader>
      <CardContent className="space-y-6">
        <Section label={doc.fuel_type === "product" ? "Do Not Say" : "Do Not Say"}>
          {editing
            ? <Textarea value={fields.do_not_say} onChange={(v) => set("do_not_say", v)} placeholder="One item per line" />
            : <WarningList items={fromLines(fields.do_not_say)} variant="red" />}
        </Section>
        <Section label={doc.fuel_type === "product" ? "Do Not Claim" : "Do Not Promise"}>
          {editing
            ? <Textarea value={fields[doc.fuel_type === "product" ? "do_not_claim" : "do_not_promise"]} onChange={(v) => set(doc.fuel_type === "product" ? "do_not_claim" : "do_not_promise", v)} placeholder="One item per line" />
            : <WarningList items={fromLines(fields[doc.fuel_type === "product" ? "do_not_claim" : "do_not_promise"])} variant="amber" />}
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
