import type { ScribeFixture } from "../types";
import { sofiaReyes } from "./sofia-reyes";
import { amaraOkafor } from "./amara-okafor";
import { danielleBrooks, katherineChen, jessicaNavarro } from "./supporting";

/**
 * Hand-authored, deterministic demo fixtures keyed by Ops patient id.
 * Sofia + Amara are the full "hero" patients (specialty styles + fan-out).
 * Danielle/Katherine/Jessica carry cached SOAP notes so every patient in the
 * picker works without any live API call. Specialty styles for the supporting
 * patients fall back to live generation.
 */
export const SCRIBE_FIXTURES: Record<string, ScribeFixture> = {
  [sofiaReyes.patientId]: sofiaReyes,
  [amaraOkafor.patientId]: amaraOkafor,
  [danielleBrooks.patientId]: danielleBrooks,
  [katherineChen.patientId]: katherineChen,
  [jessicaNavarro.patientId]: jessicaNavarro,
};

export function getFixture(patientId: string): ScribeFixture | null {
  return SCRIBE_FIXTURES[patientId] ?? null;
}

/** Patient ids that have a cached, stage-safe fixture. */
export const CACHED_PATIENT_IDS = Object.keys(SCRIBE_FIXTURES);
