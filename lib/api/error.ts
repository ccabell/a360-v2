/**
 * Shared API error response helper.
 * Ensures every error returned to the client has the same shape: { error: string }
 */
export function apiError(message: string, status = 500): Response {
  return Response.json({ error: message }, { status });
}

/**
 * Extract a safe error message from an unknown catch value.
 * In production, internal details are hidden behind a generic message.
 */
export function safeMessage(err: unknown, fallback = "Internal server error"): string {
  if (err instanceof Error) return err.message;
  return fallback;
}
