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
    // concern
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

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">What Not to Say</CardTitle>
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
              <Section label="Do Not Say (Universal)">
                {editing
                  ? <Textarea value={fields.dns_universal} onChange={(v) => set("dns_universal", v)} placeholder="One item per line" />
                  : <BulletList items={c.do_not_say?.universal ?? []} />}
              </Section>
              <Section label="Do Not Say (Pair-Specific)">
                {editing
                  ? <Textarea value={fields.dns_pair_specific} onChange={(v) => set("dns_pair_specific", v)} placeholder="One item per line" />
                  : <BulletList items={c.do_not_say?.pair_specific ?? []} />}
              </Section>
              <Section label="Do Not Say (Practice-Specific)">
                {editing
                  ? <Textarea value={fields.dns_practice_specific} onChange={(v) => set("dns_practice_specific", v)} placeholder="One item per line" />
                  : <BulletList items={c.do_not_say?.practice_specific ?? []} />}
              </Section>
            </>
          )
        })()}

        {doc.fuel_type === "product" && (() => {
          const c = doc.content
          return (
            <>
              <Section label="Do Not Say">
                {editing
                  ? <Textarea value={fields.do_not_say} onChange={(v) => set("do_not_say", v)} placeholder="One item per line" />
                  : <BulletList items={c.do_not_say ?? []} />}
              </Section>
              <Section label="Do Not Claim">
                {editing
                  ? <Textarea value={fields.do_not_claim} onChange={(v) => set("do_not_claim", v)} placeholder="One item per line" />
                  : <BulletList items={c.do_not_claim ?? []} />}
              </Section>
            </>
          )
        })()}

        {doc.fuel_type === "concern" && (() => {
          const c = doc.content
          return (
            <>
              <Section label="Do Not Say">
                {editing
                  ? <Textarea value={fields.do_not_say} onChange={(v) => set("do_not_say", v)} placeholder="One item per line" />
                  : <BulletList items={c.do_not_say ?? []} />}
              </Section>
              <Section label="Do Not Promise">
                {editing
                  ? <Textarea value={fields.do_not_promise} onChange={(v) => set("do_not_promise", v)} placeholder="One item per line" />
                  : <BulletList items={c.do_not_promise ?? []} />}
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
