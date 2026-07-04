/**
 * Signed audience share links (design doc §3).
 *
 * Token format: `base64url(payloadJson).base64url(hmacSha256(payload))` where
 * payload = { aud: audienceId, exp: unixSeconds }. The token itself is stored
 * in the `portfolio_audience` cookie so proxy.ts can re-verify every request —
 * the cookie is never trusted unverified.
 *
 * Uses Web Crypto (like lib/auth.ts) so the same module runs in route
 * handlers, middleware (proxy.ts) and the CLI script. Signature comparison is
 * constant-time. Revoke all links by rotating SHARE_LINK_SECRET.
 */

export const AUDIENCE_COOKIE = "portfolio_audience";

export interface SharePayload {
  /** Audience id (must exist in lib/portfolio/registry.ts). */
  aud: string;
  /** Expiry, unix seconds. */
  exp: number;
}

const encoder = new TextEncoder();

function b64urlEncode(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(value: string): Uint8Array | null {
  try {
    const bin = atob(value.replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  } catch {
    return null;
  }
}

async function hmacSha256(secret: string, data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return new Uint8Array(sig);
}

/** Constant-time byte comparison (no early exit on mismatch). */
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/** The configured share-link secret, or undefined when sharing is disabled. */
export function shareSecret(): string | undefined {
  return process.env.SHARE_LINK_SECRET || undefined;
}

/** Mint a signed share token for an audience, expiring at `expiresAt`. */
export async function mintShareToken(
  audienceId: string,
  expiresAt: Date,
  secret: string,
): Promise<string> {
  const payload: SharePayload = {
    aud: audienceId,
    exp: Math.floor(expiresAt.getTime() / 1000),
  };
  const payloadB64 = b64urlEncode(encoder.encode(JSON.stringify(payload)));
  const sigB64 = b64urlEncode(await hmacSha256(secret, payloadB64));
  return `${payloadB64}.${sigB64}`;
}

/**
 * Verify a share token: signature (constant-time) then expiry. Returns the
 * payload, or null for anything invalid — never throws.
 */
export async function verifyShareToken(
  token: string,
  secret: string,
  now: number = Date.now(),
): Promise<SharePayload | null> {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sigB64] = parts;

  const givenSig = b64urlDecode(sigB64);
  if (!givenSig) return null;
  const expectedSig = await hmacSha256(secret, payloadB64);
  if (!timingSafeEqual(givenSig, expectedSig)) return null;

  const payloadBytes = b64urlDecode(payloadB64);
  if (!payloadBytes) return null;
  let payload: unknown;
  try {
    payload = JSON.parse(new TextDecoder().decode(payloadBytes));
  } catch {
    return null;
  }
  if (
    typeof payload !== "object" ||
    payload === null ||
    typeof (payload as SharePayload).aud !== "string" ||
    typeof (payload as SharePayload).exp !== "number"
  ) {
    return null;
  }
  const parsed = payload as SharePayload;
  if (parsed.exp * 1000 <= now) return null;
  return parsed;
}
