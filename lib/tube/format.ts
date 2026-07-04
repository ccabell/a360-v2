/**
 * Shared date formatting for the A360 Video Navigator (Tube).
 */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Compact publish-date label ("Mar 2024") from ISO yyyy-mm-dd; null when absent/malformed. */
export function publishedLabel(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const [y, m] = iso.split("-").map(Number);
  if (!y || !m || m < 1 || m > 12) return null;
  return `${MONTHS[m - 1]} ${y}`;
}
