/**
 * Discovery taxonomies for the Explore hub: browse Dr Tim Pearce's videos by
 * facial AREA or by patient CONCERN, in addition to the clinical topics.
 *
 * Areas/concerns map onto the existing 41 topic tags, so no re-tagging is
 * needed — a region/concern simply unions the videos of its topics.
 */

export interface AreaDef {
  id: string;
  label: string;
  /** Topic ids whose videos belong to this facial area. */
  topics: string[];
}

export interface ConcernDef {
  id: string;
  label: string;
  blurb: string;
  topics: string[];
}

/** Facial areas, top→bottom. `id` matches the clickable zone in the anatomy map. */
export const AREAS: AreaDef[] = [
  { id: "forehead", label: "Forehead & Frown", topics: ["forehead-temples", "botox-patterns", "botox-depth"] },
  { id: "brows", label: "Brows & Brow Lift", topics: ["brow-lift", "ptosis"] },
  { id: "temples", label: "Temples", topics: ["forehead-temples", "fat-pads-ligaments"] },
  { id: "eyes", label: "Eyes & Tear Trough", topics: ["tear-trough", "ptosis"] },
  { id: "nose", label: "Nose", topics: ["nose"] },
  { id: "cheeks", label: "Cheeks & Midface", topics: ["cheeks", "fat-pads-ligaments", "facial-assessment"] },
  { id: "nasolabial", label: "Nasolabial & Marionette", topics: ["nasolabial-marionette"] },
  { id: "lips", label: "Lips & Perioral", topics: ["lips", "smile-corrections"] },
  { id: "chin", label: "Chin", topics: ["chin-jawline"] },
  { id: "jawline", label: "Jawline & Masseter", topics: ["chin-jawline", "masseter"] },
  { id: "neck", label: "Neck", topics: ["neck"] },
];

/** Patient-facing concerns → the topics that address them. */
export const CONCERNS: ConcernDef[] = [
  { id: "lines-wrinkles", label: "Lines & wrinkles", blurb: "Dynamic lines, frown, forehead, crow's feet", topics: ["botox-patterns", "botox-depth", "forehead-temples", "smile-corrections"] },
  { id: "volume-ageing", label: "Volume loss & ageing", blurb: "Midface deflation, fat pads, structural ageing", topics: ["cheeks", "fat-pads-ligaments", "tear-trough", "facial-assessment", "longevity"] },
  { id: "lip-enhancement", label: "Lip enhancement", blurb: "Shape, definition, natural results", topics: ["lips"] },
  { id: "jawline-definition", label: "Jawline definition", blurb: "Sharpen the jaw, slim the masseter", topics: ["chin-jawline", "masseter"] },
  { id: "dark-circles", label: "Tear troughs & dark circles", blurb: "Under-eye hollowing", topics: ["tear-trough"] },
  { id: "asymmetry", label: "Asymmetry", blurb: "Smile, brow and facial balance", topics: ["smile-corrections", "facial-assessment", "ptosis"] },
  { id: "nose-shape", label: "Nose shape", blurb: "Non-surgical rhinoplasty", topics: ["nose"] },
  { id: "overfilled", label: "Migrated / overfilled", blurb: "Dissolving, reversal, restoring balance", topics: ["migration", "hyaluronidase", "body-dysmorphia"] },
  { id: "bruising-swelling", label: "Bruising & swelling", blurb: "Prevent and manage after treatment", topics: ["bruising-haematoma", "swelling-oedema"] },
  { id: "safety", label: "Safety & complications", blurb: "Occlusion, necrosis, danger zones", topics: ["vascular-occlusion", "necrosis", "blindness", "danger-zones", "complication-diagnosis"] },
];
