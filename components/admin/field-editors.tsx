"use client";

import { Plus, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * Ultra-simple add/remove row editors for the array fields in ExchangeAgent.
 * No drag-to-reorder — up/down buttons cover reordering without drag-drop
 * complexity. Every editor is fully controlled (value + onChange).
 */

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </label>
  );
}

function RowShell({
  children,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  children: React.ReactNode;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  return (
    <div className="flex items-start gap-2 rounded-lg border bg-card p-2.5">
      <div className="flex-1 space-y-2">{children}</div>
      <div className="flex shrink-0 flex-col gap-1">
        {(onMoveUp || onMoveDown) && (
          <div className="flex gap-0.5">
            <button
              type="button"
              onClick={onMoveUp}
              disabled={!onMoveUp}
              className="rounded px-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-30"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={onMoveDown}
              disabled={!onMoveDown}
              className="rounded px-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-30"
            >
              ↓
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={onRemove}
          className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          aria-label="Remove"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

function AddButton({ onClick, label = "Add" }: { onClick: () => void; label?: string }) {
  return (
    <Button type="button" variant="outline" size="sm" onClick={onClick} className="gap-1.5">
      <Plus className="size-3.5" />
      {label}
    </Button>
  );
}

function move<T>(arr: T[], from: number, to: number): T[] {
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/** A plain list of strings — features, badges, EMR names, etc. */
export function StringListEditor({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="mt-2 space-y-2">
        {values.map((v, i) => (
          <RowShell
            key={i}
            onRemove={() => onChange(values.filter((_, j) => j !== i))}
            onMoveUp={i > 0 ? () => onChange(move(values, i, i - 1)) : undefined}
            onMoveDown={i < values.length - 1 ? () => onChange(move(values, i, i + 1)) : undefined}
          >
            <Input
              value={v}
              placeholder={placeholder}
              onChange={(e) => {
                const next = [...values];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
          </RowShell>
        ))}
        <AddButton onClick={() => onChange([...values, ""])} />
      </div>
    </div>
  );
}

export type FieldType = "text" | "textarea" | "number" | "stringlist";

export interface FieldSpec<T> {
  key: keyof T;
  label: string;
  type?: FieldType;
  placeholder?: string;
}

/**
 * A list of structured objects (useCases, agentReviews, integrations, updates,
 * kpis, pricingTiers…) — each row renders one input per field in `fields`.
 * `stringlist`-typed fields render as one-item-per-line textareas (used for a
 * pricing tier's nested features[]).
 */
export function ObjectListEditor<T extends Record<string, unknown>>({
  label,
  values,
  onChange,
  fields,
  emptyItem,
}: {
  label: string;
  values: T[];
  onChange: (v: T[]) => void;
  fields: FieldSpec<T>[];
  emptyItem: T;
}) {
  function updateField(i: number, key: keyof T, val: unknown) {
    const next = [...values];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  }

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="mt-2 space-y-2.5">
        {values.map((item, i) => (
          <RowShell
            key={i}
            onRemove={() => onChange(values.filter((_, j) => j !== i))}
            onMoveUp={i > 0 ? () => onChange(move(values, i, i - 1)) : undefined}
            onMoveDown={i < values.length - 1 ? () => onChange(move(values, i, i + 1)) : undefined}
          >
            {fields.map((f) => (
              <div key={String(f.key)}>
                <span className="text-[11px] text-muted-foreground">{f.label}</span>
                {f.type === "textarea" ? (
                  <Textarea
                    className="mt-0.5 min-h-14 text-sm"
                    value={(item[f.key] as string) ?? ""}
                    placeholder={f.placeholder}
                    onChange={(e) => updateField(i, f.key, e.target.value)}
                  />
                ) : f.type === "stringlist" ? (
                  <Textarea
                    className="mt-0.5 min-h-14 text-sm"
                    value={((item[f.key] as string[]) ?? []).join("\n")}
                    placeholder={f.placeholder ?? "One per line"}
                    onChange={(e) =>
                      updateField(
                        i,
                        f.key,
                        e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                      )
                    }
                  />
                ) : f.type === "number" ? (
                  <Input
                    type="number"
                    className="mt-0.5"
                    value={(item[f.key] as number) ?? ""}
                    placeholder={f.placeholder}
                    onChange={(e) => updateField(i, f.key, Number(e.target.value))}
                  />
                ) : (
                  <Input
                    className="mt-0.5"
                    value={(item[f.key] as string) ?? ""}
                    placeholder={f.placeholder}
                    onChange={(e) => updateField(i, f.key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </RowShell>
        ))}
        <AddButton onClick={() => onChange([...values, { ...emptyItem }])} />
      </div>
    </div>
  );
}

export { FieldLabel };
export const fieldRowClass = cn("space-y-1.5");
