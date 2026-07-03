import type { TcpFixture } from "../types";
import { danielleBrooks } from "./danielle-brooks";

/**
 * Hand-authored, deterministic TCP fixtures keyed by Ops patient id. These are
 * the stage-safe hero plans (full recommendations + education + roadmap + tiers,
 * grounded in real GL data). Patients without a fixture fall back to a best-
 * effort live assemble (lib/tcp/resolve.ts).
 */
export const TCP_FIXTURES: Record<string, TcpFixture> = {
  [danielleBrooks.patientId]: danielleBrooks,
};

export function getTcpFixture(patientId: string): TcpFixture | null {
  return TCP_FIXTURES[patientId] ?? null;
}

/** Patient ids that have a cached, stage-safe TCP fixture. */
export const CACHED_TCP_PATIENT_IDS = Object.keys(TCP_FIXTURES);
