// LPOA device-pack types.
//
// Design invariant (safety-critical): every parameter value shown in the UI
// either carries a real manual page citation, or is marked `locked` with an
// honest reason. No value renders without a source. This replaces the live
// Joule surface's fabricated citations / fake confidence.

/** A citation into the device's operator manual. `page` is the real PDF page. */
export interface Citation {
  page: number;
  section?: string;
  /** Verbatim manual text supporting the value (optional but preferred). */
  quote?: string;
}

/** Whether a control/value is backed by the manual or must be deferred. */
export type ControlStatus = "available" | "locked" | "review_required";

/** A value that is directly supported by a manual page. */
export interface CitedValue<T> {
  value: T;
  page: number;
  quote?: string;
}

/** One row of a real fluence-capability table (manual p73). */
export interface FluenceRow {
  wavelength: "755" | "1064";
  spotMm: number;
  /** e.g. "0.25-0.50", "3-300", "10-300" */
  pulseBandMs: string;
  minJcm2: number;
  maxJcm2: number;
}

export interface RangeSpec {
  param: string;
  /** Human-readable range straight from the manual, e.g. "10-100 ms". */
  range: string;
  page: number;
}

export interface SafetyItem {
  text: string;
  page: number;
}

export interface Indication {
  name: string;
  wavelengths: string;
  page: number;
}

/**
 * A field the doctor would expect a recommended value for, but which the
 * operator manual deliberately does NOT specify. Renders locked — never a
 * fabricated number.
 */
export interface LockedField {
  key: string;
  label: string;
  status: Extract<ControlStatus, "locked">;
  reason: string;
  /** Where the manual says it defers this (for an honest citation). */
  deferredToPages: number[];
}

export interface DeviceManual {
  /** App-served URL (e.g. /manuals/gentlemax-pro.pdf). */
  url: string;
  name: string;
  pages: number;
  revision?: string;
  date?: string;
  sourceQuality: "operator_manual";
}

export interface LpoaDevice {
  id: string;
  manufacturer: string;
  model: string;
  wavelengths: string[];
  branding: { name: string; subtitle: string };
  manual: DeviceManual;

  /** Real device specifications, each page-cited. */
  specs: {
    spotSizesMm: CitedValue<number[]>;
    maxEnergyJ: { wavelength: string; value: number; page: number }[];
    pulseWidthMs: {
      capability: string;
      bands: string[];
      pages: number[];
      /** Honest note on a real spec inconsistency in the manual. */
      inconsistencyNote?: string;
    };
    repetitionRateHz: CitedValue<string>;
    eyewearOd: CitedValue<string>;
  };

  /** Real fluence-capability tables (p73). Device envelope, NOT recommended doses. */
  fluenceTables: FluenceRow[];

  /** Real DCD cooling ranges (p74-75). */
  dcd: RangeSpec[];

  indications: Indication[];
  contraindications: SafetyItem[];
  warnings: SafetyItem[];

  /** Inputs the on-device Guided Mode collects (numbers live off-manual). */
  guidedModeInputs: { indication: string; inputs: string[]; page: number }[];

  /** Fields the manual does not specify → rendered locked. */
  lockedFields: LockedField[];

  /** Per-module suggested questions / quick actions. */
  suggestedQuestions: string[];
  faqs: {
    question: string;
    answer: string;
    page: number;
    section?: string;
    tags: string[];
  }[];
}
