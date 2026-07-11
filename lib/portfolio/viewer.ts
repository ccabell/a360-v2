import { cookies } from "next/headers";

import { SESSION_COOKIE, sessionToken, betaPassword } from "@/lib/auth";
import { getAudience } from "./audiences";
import { AUDIENCE_COOKIE, shareSecret, verifyShareToken } from "./share";

/**
 * Server-side viewer resolution for audience-scoped rendering (the RSC
 * counterpart of the proxy.ts route enforcement).
 *
 * - A valid beta session sees everything ("full").
 * - Otherwise a valid audience cookie scopes rendering to that audience.
 * - Otherwise "full" — with the gate enabled, proxy.ts has already redirected
 *   anonymous visitors, so this branch is only reachable in ungated dev.
 */
export type Viewer =
  | { kind: "full" }
  | { kind: "audience"; audienceId: string; slugs: string[] };

export async function getViewerAudience(): Promise<Viewer> {
  const jar = await cookies();

  const password = betaPassword();
  if (password) {
    const session = jar.get(SESSION_COOKIE)?.value;
    if (session && session === (await sessionToken(password))) {
      return { kind: "full" };
    }
  }

  const secret = shareSecret();
  const token = jar.get(AUDIENCE_COOKIE)?.value;
  if (secret && token) {
    const payload = await verifyShareToken(token, secret);
    const audience = payload ? getAudience(payload.aud) : undefined;
    if (audience) {
      return {
        kind: "audience",
        audienceId: audience.id,
        slugs: audience.prototypeSlugs,
      };
    }
  }

  return { kind: "full" };
}
