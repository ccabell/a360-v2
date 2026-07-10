/**
 * Minimal shared-password gate for /admin/exchange — separate from the main
 * beta gate (lib/auth.ts) so the CMS has its own password and session, not
 * tied to general app access. Same one-way-hash-cookie pattern, no DB.
 */

export const ADMIN_SESSION_COOKIE = "a360_admin_session";

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Cookie value for a given password (SHA-256, hex). */
export async function adminSessionToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`a360-admin-v1:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return toHex(digest);
}

/** The configured admin password, or undefined when the gate is disabled. */
export function adminPassword(): string | undefined {
  return process.env.EXCHANGE_ADMIN_PASSWORD || undefined;
}
