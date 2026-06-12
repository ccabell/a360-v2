import type { RunEvidence } from "@/lib/types";

/**
 * Shared extraction-field walker for Prompt Runner run outputs.
 * Extraction fields follow the shape { value, evidence:[{quote,...}], missing_reason }.
 * Used by RunOutput (raw view) and ConsultationIntelligence (evidence binding).
 */

export interface ExtractedField {
  id: string; // stable path id, e.g. "prompt_1.patient_goals.primary_concern"
  label: string;
  value: unknown;
  evidence?: RunEvidence[];
  missing_reason?: string | null;
}

export function humanize(key: string): string {
  // drop the prompt_N. prefix for display, then title-case the leaf
  const leaf = key.split(".").pop() ?? key;
  return leaf.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function pct(n: unknown): number {
  const v = typeof n === "number" ? n : 0;
  return Math.round(v <= 1 ? v * 100 : v);
}

export function isFieldNode(v: unknown): boolean {
  return (
    !!v &&
    typeof v === "object" &&
    !Array.isArray(v) &&
    "value" in (v as object) &&
    ("evidence" in (v as object) || "missing_reason" in (v as object))
  );
}

/** Walk the extraction tree and collect { value, evidence } field nodes with stable ids. */
export function walkFields(
  obj: unknown,
  opts: { prefix?: string; depth?: number } = {},
  out: ExtractedField[] = [],
): ExtractedField[] {
  const prefix = opts.prefix ?? "";
  const depth = opts.depth ?? 0;
  if (!obj || typeof obj !== "object" || depth > 5) return out;

  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    const id = `${prefix}${k}`;
    if (isFieldNode(v)) {
      const node = v as Record<string, unknown>;
      out.push({
        id,
        label: humanize(k),
        value: node.value,
        evidence: node.evidence as RunEvidence[] | undefined,
        missing_reason: node.missing_reason as string | null | undefined,
      });
    } else if (v && typeof v === "object" && !Array.isArray(v)) {
      walkFields(v, { prefix: `${id}.`, depth: depth + 1 }, out);
    }
  }
  return out;
}
