// =============================================================================
// Note styles — each clinical note type as a section schema. The selected style
// drives which sections the note generates. `required` sections feed the
// compliance / "Missing but Important" checks. Aesthetic-medicine first:
// reproducibility fields (product, dose, site, technique, lot) are required.
// =============================================================================

export type NoteStyleGroup = "Clinical" | "Procedure" | "Planning" | "Patient & Internal";

export interface NoteStyleSection {
  id: string;
  heading: string;
  /** Required by this note style — drives compliance flags when undocumented. */
  required?: boolean;
}

export interface NoteStyle {
  key: string;
  label: string;
  group: NoteStyleGroup;
  useFor: string;
  /** Not part of the medical record (e.g. opportunity summary). */
  internalOnly?: boolean;
  sections: NoteStyleSection[];
}

export const NOTE_STYLES: NoteStyle[] = [
  {
    key: "soap",
    label: "SOAP Note",
    group: "Clinical",
    useFor: "General clinical documentation.",
    sections: [
      { id: "subjective", heading: "Subjective", required: true },
      { id: "objective", heading: "Objective", required: true },
      { id: "assessment", heading: "Assessment", required: true },
      { id: "plan", heading: "Plan", required: true },
      { id: "followup", heading: "Follow-Up" },
    ],
  },
  {
    key: "aesthetic_consult",
    label: "Aesthetic Consult Note",
    group: "Clinical",
    useFor: "First-time or planning visits.",
    sections: [
      { id: "concern", heading: "Chief Concern", required: true },
      { id: "goals", heading: "Aesthetic Goals", required: true },
      { id: "history", heading: "Relevant Medical History" },
      { id: "prior", heading: "Prior Aesthetic Treatments" },
      { id: "assessment", heading: "Facial / Skin Assessment", required: true },
      { id: "risk", heading: "Contraindications / Risk Screening", required: true },
      { id: "plan", heading: "Recommended Treatment Plan", required: true },
      { id: "alternatives", heading: "Alternatives Discussed" },
      { id: "consent", heading: "Consent / Education", required: true },
      { id: "followup", heading: "Follow-Up Plan" },
    ],
  },
  {
    key: "procedure",
    label: "Procedure Note",
    group: "Procedure",
    useFor: "Performed treatments.",
    sections: [
      { id: "pre", heading: "Pre-Procedure Assessment", required: true },
      { id: "consent", heading: "Consent Confirmed", required: true },
      { id: "areas", heading: "Treatment Area(s)", required: true },
      { id: "product", heading: "Product / Device Used", required: true },
      { id: "lot", heading: "Lot / Serial / Expiration", required: true },
      { id: "dose", heading: "Dose / Volume / Settings", required: true },
      { id: "technique", heading: "Technique / Plane / Parameters", required: true },
      { id: "tolerance", heading: "Patient Tolerance" },
      { id: "adverse", heading: "Adverse Events", required: true },
      { id: "postcare", heading: "Post-Care Instructions", required: true },
      { id: "followup", heading: "Follow-Up" },
    ],
  },
  {
    key: "injectable",
    label: "Injectable Note",
    group: "Procedure",
    useFor: "Botox, Dysport, Daxxify, Xeomin, filler, biostimulators, Kybella, PRP/PRF.",
    sections: [
      { id: "indication", heading: "Indication / Patient Goal", required: true },
      { id: "anatomy", heading: "Anatomy Assessment", required: true },
      { id: "product", heading: "Product Used", required: true },
      { id: "lot", heading: "Lot Number / Expiration", required: true },
      { id: "dilution", heading: "Dilution / Reconstitution" },
      { id: "total", heading: "Total Units or Volume", required: true },
      { id: "sites", heading: "Injection Sites", required: true },
      { id: "technique", heading: "Technique / Depth / Plane", required: true },
      { id: "device", heading: "Needle or Cannula" },
      { id: "pain", heading: "Pain Control" },
      { id: "tolerance", heading: "Tolerance" },
      { id: "adverse", heading: "Complications / Adverse Events", required: true },
      { id: "aftercare", heading: "Aftercare", required: true },
      { id: "followup", heading: "Follow-Up / Touch-Up Plan" },
    ],
  },
  {
    key: "device",
    label: "Device Treatment Note",
    group: "Procedure",
    useFor: "Laser, IPL, RF, ultrasound, microneedling, body contouring.",
    sections: [
      { id: "indication", heading: "Indication / Treatment Goal", required: true },
      { id: "skin", heading: "Skin Type / Risk Factors", required: true },
      { id: "device", heading: "Device Used", required: true },
      { id: "settings", heading: "Settings / Energy / Depth / Passes", required: true },
      { id: "area", heading: "Treatment Area", required: true },
      { id: "endpoint", heading: "Endpoint Achieved" },
      { id: "protective", heading: "Protective Measures" },
      { id: "prep", heading: "Anesthesia / Prep" },
      { id: "tolerance", heading: "Tolerance" },
      { id: "adverse", heading: "Complications", required: true },
      { id: "aftercare", heading: "Aftercare", required: true },
      { id: "followup", heading: "Follow-Up Plan" },
    ],
  },
  {
    key: "follow_up",
    label: "Follow-Up Note",
    group: "Clinical",
    useFor: "Post-treatment assessment.",
    sections: [
      { id: "reviewed", heading: "Treatment Reviewed", required: true },
      { id: "feedback", heading: "Patient Feedback" },
      { id: "healing", heading: "Healing / Response", required: true },
      { id: "objective", heading: "Objective Findings" },
      { id: "photos", heading: "Photos Reviewed" },
      { id: "concerns", heading: "Complications or Concerns", required: true },
      { id: "assessment", heading: "Assessment", required: true },
      { id: "plan", heading: "Plan", required: true },
      { id: "next", heading: "Next Recommended Treatment" },
    ],
  },
  {
    key: "touch_up",
    label: "Touch-Up Note",
    group: "Procedure",
    useFor: "Refinement visits.",
    sections: [
      { id: "original", heading: "Original Treatment Date", required: true },
      { id: "reason", heading: "Reason for Touch-Up", required: true },
      { id: "assessment", heading: "Assessment", required: true },
      { id: "added", heading: "Product / Dose / Site Added", required: true },
      { id: "charge", heading: "Charge Status" },
      { id: "tolerance", heading: "Tolerance" },
      { id: "aftercare", heading: "Aftercare", required: true },
      { id: "followup", heading: "Follow-Up" },
    ],
  },
  {
    key: "complication",
    label: "Complication / Adverse Event Note",
    group: "Clinical",
    useFor: "Bruising, swelling, nodules, infection, vascular occlusion, asymmetry, allergic reaction, or unexpected outcome.",
    sections: [
      { id: "concern", heading: "Presenting Concern", required: true },
      { id: "original", heading: "Original Treatment", required: true },
      { id: "timeline", heading: "Timeline", required: true },
      { id: "symptoms", heading: "Symptoms", required: true },
      { id: "objective", heading: "Objective Findings", required: true },
      { id: "risk", heading: "Risk Assessment", required: true },
      { id: "assessment", heading: "Provider Assessment", required: true },
      { id: "intervention", heading: "Intervention Performed", required: true },
      { id: "escalation", heading: "Escalation / Medical Director Notification", required: true },
      { id: "instructions", heading: "Patient Instructions", required: true },
      { id: "followup", heading: "Follow-Up / Monitoring Plan", required: true },
    ],
  },
  {
    key: "treatment_plan",
    label: "Treatment Plan Note",
    group: "Planning",
    useFor: "Staged aesthetic planning.",
    sections: [
      { id: "goals", heading: "Patient Goals", required: true },
      { id: "priorities", heading: "Clinical Priorities", required: true },
      { id: "sequence", heading: "Recommended Sequence", required: true },
      { id: "products", heading: "Products / Procedures Recommended", required: true },
      { id: "timing", heading: "Timing / Cadence" },
      { id: "budget", heading: "Budget / Package Discussion" },
      { id: "contra", heading: "Contraindications / Deferrals", required: true },
      { id: "maintenance", heading: "Maintenance Plan" },
      { id: "followup", heading: "Follow-Up" },
    ],
  },
  {
    key: "patient_friendly",
    label: "Patient-Friendly Summary",
    group: "Patient & Internal",
    useFor: "Plain-English take-home summary.",
    sections: [
      { id: "discussed", heading: "What We Discussed", required: true },
      { id: "treated", heading: "What Was Treated" },
      { id: "expect", heading: "What to Expect", required: true },
      { id: "aftercare", heading: "Aftercare Instructions", required: true },
      { id: "contact", heading: "When to Contact the Practice", required: true },
      { id: "next", heading: "Next Visit" },
    ],
  },
  {
    key: "internal_opportunity",
    label: "Internal Opportunity Summary",
    group: "Patient & Internal",
    useFor: "Not part of the medical record — internal only.",
    internalOnly: true,
    sections: [
      { id: "interests", heading: "Stated Interests", required: true },
      { id: "future", heading: "Likely Future Treatments" },
      { id: "rebooking", heading: "Rebooking Opportunity" },
      { id: "products", heading: "Product Recommendations" },
      { id: "membership", heading: "Membership / Package Opportunity" },
      { id: "task", heading: "Provider Follow-Up Task" },
    ],
  },
];

export const NOTE_STYLE_GROUPS: NoteStyleGroup[] = [
  "Clinical",
  "Procedure",
  "Planning",
  "Patient & Internal",
];

export function getNoteStyle(key: string): NoteStyle | undefined {
  return NOTE_STYLES.find((s) => s.key === key);
}

/** Sensible default note style for a consultation's visit type. */
export function defaultNoteStyle(visitType: string | null | undefined): string {
  switch (visitType) {
    case "treatment_visit":
      return "injectable";
    case "initial_consultation":
    case "consultation_only":
      return "aesthetic_consult";
    case "follow_up":
      return "follow_up";
    default:
      return "soap";
  }
}
