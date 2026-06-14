"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import type { FuelDoc, SopFields, PreferenceFields } from "@/lib/types/fuel-docs"

interface TabProps {
  doc: FuelDoc & { sop?: SopFields | null; preferences?: PreferenceFields | null }
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

export function SopTab({ doc, editing, onSave }: TabProps) {
  const sop = doc.sop ?? null
  const preferences = doc.preferences ?? null
  const hasPracticeData = sop !== null || preferences !== null

  const [sopFields, setSopFields] = React.useState({
    pre_treatment_checklist: (sop?.pre_treatment_checklist ?? []).join("\n"),
    consent_requirements: (sop?.consent_requirements ?? []).join("\n"),
    post_treatment_instructions: (sop?.post_treatment_instructions ?? []).join("\n"),
    follow_up_protocol: sop?.follow_up_protocol ?? "",
    emergency_protocol: sop?.emergency_protocol ?? "",
    documentation_requirements: (sop?.documentation_requirements ?? []).join("\n"),
  })

  const [prefFields, setPrefFields] = React.useState({
    pricing_notes: preferences?.pricing_notes ?? "",
    preferred_brands: (preferences?.preferred_brands ?? []).join("\n"),
    scheduling_notes: preferences?.scheduling_notes ?? "",
    staff_assignment: preferences?.staff_assignment ?? "",
    room_requirements: preferences?.room_requirements ?? "",
    inventory_notes: preferences?.inventory_notes ?? "",
  })

  const [saving, setSaving] = React.useState(false)

  async function handleSave() {
    setSaving(true)
    try {
      // SOP fields are practice-level only — they live outside the GL content JSONB
      // For now, we pass them as part of content under a reserved key since
      // the current API layer merges them for GL-only docs
      await onSave({
        content: {
          ...doc.content,
          _sop: {
            pre_treatment_checklist: sopFields.pre_treatment_checklist.split("\n").map((s) => s.trim()).filter(Boolean),
            consent_requirements: sopFields.consent_requirements.split("\n").map((s) => s.trim()).filter(Boolean),
            post_treatment_instructions: sopFields.post_treatment_instructions.split("\n").map((s) => s.trim()).filter(Boolean),
            follow_up_protocol: sopFields.follow_up_protocol,
            emergency_protocol: sopFields.emergency_protocol,
            documentation_requirements: sopFields.documentation_requirements.split("\n").map((s) => s.trim()).filter(Boolean),
          },
          _preferences: {
            pricing_notes: prefFields.pricing_notes,
            preferred_brands: prefFields.preferred_brands.split("\n").map((s) => s.trim()).filter(Boolean),
            scheduling_notes: prefFields.scheduling_notes,
            staff_assignment: prefFields.staff_assignment,
            room_requirements: prefFields.room_requirements,
            inventory_notes: prefFields.inventory_notes,
          },
        },
      })
    } finally {
      setSaving(false)
    }
  }

  if (!hasPracticeData && !editing) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-base font-semibold">SOPs &amp; Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-normal text-muted-foreground">
            SOPs and preferences are practice-level fields. They will be populated when a practice customizes this fuel doc.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">SOPs &amp; Preferences</CardTitle>
        {editing && (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => {
              setSopFields({
                pre_treatment_checklist: (sop?.pre_treatment_checklist ?? []).join("\n"),
                consent_requirements: (sop?.consent_requirements ?? []).join("\n"),
                post_treatment_instructions: (sop?.post_treatment_instructions ?? []).join("\n"),
                follow_up_protocol: sop?.follow_up_protocol ?? "",
                emergency_protocol: sop?.emergency_protocol ?? "",
                documentation_requirements: (sop?.documentation_requirements ?? []).join("\n"),
              })
              setPrefFields({
                pricing_notes: preferences?.pricing_notes ?? "",
                preferred_brands: (preferences?.preferred_brands ?? []).join("\n"),
                scheduling_notes: preferences?.scheduling_notes ?? "",
                staff_assignment: preferences?.staff_assignment ?? "",
                room_requirements: preferences?.room_requirements ?? "",
                inventory_notes: preferences?.inventory_notes ?? "",
              })
            }}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              <Save className="h-3.5 w-3.5 mr-1" />
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <p className="text-base font-semibold leading-tight">Standard Operating Procedures</p>
          <p className="text-xs text-muted-foreground">Practice-level only — no GL default.</p>

          <Section label="Pre-Treatment Checklist">
            {editing ? (
              <Textarea value={sopFields.pre_treatment_checklist} onChange={(v) => setSopFields((p) => ({ ...p, pre_treatment_checklist: v }))} placeholder="One item per line" />
            ) : (
              <BulletList items={sop?.pre_treatment_checklist ?? []} />
            )}
          </Section>
          <Section label="Consent Requirements">
            {editing ? (
              <Textarea value={sopFields.consent_requirements} onChange={(v) => setSopFields((p) => ({ ...p, consent_requirements: v }))} placeholder="One item per line" />
            ) : (
              <BulletList items={sop?.consent_requirements ?? []} />
            )}
          </Section>
          <Section label="Post-Treatment Instructions">
            {editing ? (
              <Textarea value={sopFields.post_treatment_instructions} onChange={(v) => setSopFields((p) => ({ ...p, post_treatment_instructions: v }))} placeholder="One item per line" />
            ) : (
              <BulletList items={sop?.post_treatment_instructions ?? []} />
            )}
          </Section>
          <Section label="Follow-Up Protocol">
            {editing ? (
              <Textarea value={sopFields.follow_up_protocol} onChange={(v) => setSopFields((p) => ({ ...p, follow_up_protocol: v }))} />
            ) : (
              <p className="text-sm font-normal">{sop?.follow_up_protocol || "—"}</p>
            )}
          </Section>
          <Section label="Emergency Protocol">
            {editing ? (
              <Textarea value={sopFields.emergency_protocol} onChange={(v) => setSopFields((p) => ({ ...p, emergency_protocol: v }))} />
            ) : (
              <p className="text-sm font-normal">{sop?.emergency_protocol || "—"}</p>
            )}
          </Section>
          <Section label="Documentation Requirements">
            {editing ? (
              <Textarea value={sopFields.documentation_requirements} onChange={(v) => setSopFields((p) => ({ ...p, documentation_requirements: v }))} placeholder="One item per line" />
            ) : (
              <BulletList items={sop?.documentation_requirements ?? []} />
            )}
          </Section>
        </div>

        <div className="space-y-4">
          <p className="text-base font-semibold leading-tight">Preferences</p>
          <p className="text-xs text-muted-foreground">Practice-level only — no GL default.</p>

          <Section label="Pricing Notes">
            {editing ? (
              <Textarea value={prefFields.pricing_notes} onChange={(v) => setPrefFields((p) => ({ ...p, pricing_notes: v }))} />
            ) : (
              <p className="text-sm font-normal">{preferences?.pricing_notes || "—"}</p>
            )}
          </Section>
          <Section label="Preferred Brands">
            {editing ? (
              <Textarea value={prefFields.preferred_brands} onChange={(v) => setPrefFields((p) => ({ ...p, preferred_brands: v }))} placeholder="One item per line" />
            ) : (
              <BulletList items={preferences?.preferred_brands ?? []} />
            )}
          </Section>
          <Section label="Scheduling Notes">
            {editing ? (
              <Textarea value={prefFields.scheduling_notes} onChange={(v) => setPrefFields((p) => ({ ...p, scheduling_notes: v }))} />
            ) : (
              <p className="text-sm font-normal">{preferences?.scheduling_notes || "—"}</p>
            )}
          </Section>
          <Section label="Staff Assignment">
            {editing ? (
              <Textarea value={prefFields.staff_assignment} onChange={(v) => setPrefFields((p) => ({ ...p, staff_assignment: v }))} />
            ) : (
              <p className="text-sm font-normal">{preferences?.staff_assignment || "—"}</p>
            )}
          </Section>
          <Section label="Room Requirements">
            {editing ? (
              <Textarea value={prefFields.room_requirements} onChange={(v) => setPrefFields((p) => ({ ...p, room_requirements: v }))} />
            ) : (
              <p className="text-sm font-normal">{preferences?.room_requirements || "—"}</p>
            )}
          </Section>
          <Section label="Inventory Notes">
            {editing ? (
              <Textarea value={prefFields.inventory_notes} onChange={(v) => setPrefFields((p) => ({ ...p, inventory_notes: v }))} />
            ) : (
              <p className="text-sm font-normal">{preferences?.inventory_notes || "—"}</p>
            )}
          </Section>
        </div>
      </CardContent>
    </Card>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm text-muted-foreground">{label}</p>
      {children}
    </div>
  )
}
