import type { ScribeFixture } from "../types";
import { sofiaReyes } from "./sofia-reyes";
import { amaraOkafor } from "./amara-okafor";

/**
 * Hand-authored, deterministic demo fixtures keyed by Ops patient id.
 * These are the stage-safe "hero" patients: full fan-out + line-level source
 * linking. Patients without a fixture fall back to live generation.
 */
export const SCRIBE_FIXTURES: Record<string, ScribeFixture> = {
  [sofiaReyes.patientId]: sofiaReyes,
  [amaraOkafor.patientId]: amaraOkafor,
};

export function getFixture(patientId: string): ScribeFixture | null {
  return SCRIBE_FIXTURES[patientId] ?? null;
}

/** Patient ids that have a cached, stage-safe fixture. */
export const CACHED_PATIENT_IDS = Object.keys(SCRIBE_FIXTURES);
