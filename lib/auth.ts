/**
 * Minimal shared-password beta gate. The cookie holds a one-way hash of the
 * configured password (never the password itself). Used by proxy.ts and the
 * auth route handlers. No DB, no per-user accounts — invite-only beta access.
 */

export const SESSION_COOKIE = "a360_beta_session";

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Cookie value for a given password (SHA-256, hex). */
export async function sessionToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`a360-beta-v1:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return toHex(digest);
}

/** The configured beta password, or undefined when the gate is disabled. */
export function betaPassword(): string | undefined {
  return process.env.BETA_ACCESS_PASSWORD || undefined;
}
