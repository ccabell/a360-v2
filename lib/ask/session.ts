import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const COOKIE_NAME = "a360_ask_sid";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export interface SessionResult {
  sessionId: string;
  setCookieHeader?: string;
}

/**
 * Reads or creates an anonymous session ID.
 * Uses SameSite=None; Secure for embed surface so the cookie survives
 * third-party iframe context. Public surface uses SameSite=Lax.
 */
export async function getOrCreateSession(
  req: NextRequest,
  surface: string,
): Promise<SessionResult> {
  const existing = req.cookies.get(COOKIE_NAME)?.value;
  if (existing) {
    return { sessionId: existing };
  }

  const sessionId = crypto.randomUUID();
  const isEmbed = surface === "embed";

  const cookieAttrs = isEmbed
    ? `HttpOnly; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=None; Secure`
    : `HttpOnly; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`;

  return {
    sessionId,
    setCookieHeader: `${COOKIE_NAME}=${sessionId}; ${cookieAttrs}`,
  };
}
