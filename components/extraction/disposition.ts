/**
 * Semantic color maps for extraction dispositions / outcomes / reception.
 * Adapted to the shadcn light/dark theme (not the Mid_Stream dark palette),
 * but preserving the meaningful hue semantics from the v3.3 spec.
 */

export interface Style {
  label: string;
  border: string; // left-border accent class
  badge: string; // chip bg+text class
  dot: string; // small status dot bg class
}

const muted: Style = {
  label: "—",
  border: "border-l-border",
  badge: "bg-muted text-muted-foreground",
  dot: "bg-muted-foreground",
};

export const DISPOSITION_STYLES: Record<string, Style> = {
  performed: { label: "Performed", border: "border-l-emerald-500", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300", dot: "bg-emerald-500" },
  purchased: { label: "Purchased", border: "border-l-emerald-500", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300", dot: "bg-emerald-500" },
  scheduled: { label: "Scheduled", border: "border-l-primary", badge: "bg-primary/10 text-primary", dot: "bg-primary" },
  agreed_pending: { label: "Agreed · pending", border: "border-l-primary/60", badge: "bg-primary/10 text-primary", dot: "bg-primary/60" },
  recommended_receptive: { label: "Recommended · receptive", border: "border-l-amber-500", badge: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300", dot: "bg-amber-500" },
  recommended_hesitant: { label: "Recommended · hesitant", border: "border-l-orange-500", badge: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300", dot: "bg-orange-500" },
  recommended_declined: { label: "Declined", border: "border-l-red-500", badge: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300", dot: "bg-red-500" },
  provider_deferred: { label: "Provider deferred", border: "border-l-purple-500", badge: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300", dot: "bg-purple-500" },
  discussed: { label: "Discussed", border: "border-l-border", badge: "bg-muted text-muted-foreground", dot: "bg-muted-foreground" },
  patient_mentioned: { label: "Patient mentioned", border: "border-l-teal-500", badge: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300", dot: "bg-teal-500" },
};

export const OUTCOME_STYLES: Record<string, Style> = {
  treatment_performed: DISPOSITION_STYLES.performed,
  booked: DISPOSITION_STYLES.scheduled,
  agreed_pending_scheduling: DISPOSITION_STYLES.agreed_pending,
  follow_up_requested: { label: "Follow-up requested", border: "border-l-amber-500", badge: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300", dot: "bg-amber-500" },
  thinking: { label: "Thinking", border: "border-l-amber-500", badge: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300", dot: "bg-amber-500" },
  declined: DISPOSITION_STYLES.recommended_declined,
  information_only: DISPOSITION_STYLES.discussed,
};

export const RECEPTION_STYLES: Record<string, Style> = {
  engaged: { label: "Engaged", border: "border-l-emerald-500", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300", dot: "bg-emerald-500" },
  curious: { label: "Curious", border: "border-l-amber-500", badge: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300", dot: "bg-amber-500" },
  hesitant: { label: "Hesitant", border: "border-l-orange-500", badge: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300", dot: "bg-orange-500" },
  passed: { label: "Passed", border: "border-l-red-500", badge: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300", dot: "bg-red-500" },
  unexplored: muted,
};

export const COMMITMENT_LEVELS = [
  "not_interested",
  "uncertain",
  "considering",
  "interested",
  "committed",
] as const;

export function dispositionStyle(d?: string | null): Style {
  return (d && DISPOSITION_STYLES[d]) || muted;
}
export function outcomeStyle(o?: string | null): Style {
  return (o && OUTCOME_STYLES[o]) || muted;
}
export function receptionStyle(r?: string | null): Style {
  return (r && RECEPTION_STYLES[r]) || muted;
}

export function humanize(s?: string | null): string {
  return (s ?? "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();
}

/** Confidence calibration label per the v3.3 confidence bands. */
export function calibration(conf?: number): string {
  if (conf == null) return "";
  if (conf >= 0.9) return "Explicit";
  if (conf >= 0.7) return "Clear implication";
  if (conf >= 0.5) return "Inference";
  return "Low";
}
