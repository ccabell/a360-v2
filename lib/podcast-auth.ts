/**
 * Minimal shared-password gate for /podcast — separate from the main beta
 * gate (lib/auth.ts) so the Podcast Navigator link (and its Ask feature,
 * which calls Claude per question) can be shared externally without also
 * exposing the rest of the app, or requiring the site's beta password.
 * Same one-way-hash-cookie pattern as lib/admin-auth.ts, no DB.
 */

export const PODCAST_SESSION_COOKIE = "a360_podcast_session";

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Cookie value for a given password (SHA-256, hex). */
export async function podcastSessionToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`a360-podcast-v1:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return toHex(digest);
}

/** The configured podcast password, or undefined when the gate is disabled. */
export function podcastPassword(): string | undefined {
  return process.env.PODCAST_ACCESS_PASSWORD || undefined;
}
