/**
 * Client-side fire-and-forget analytics helper for the Ask experience.
 * Events are posted to /api/ask/event and never surface errors to the user.
 */

export type AnalyticsEventName =
  | "evidence_unauth_ask"
  | "evidence_answer_complete"
  | "citation_click";

/**
 * Fire-and-forget analytics event. Never throws; never blocks the caller.
 */
export function trackEvent(
  eventName: AnalyticsEventName | string,
  payload?: Record<string, unknown>,
): void {
  fetch("/api/ask/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event_name: eventName, ...payload }),
    keepalive: true,
  }).catch(() => {});
}
