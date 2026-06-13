/**
 * Hardcoded GL category names for out-of-scope nearest-topic chips.
 * Source: live categories table — update if taxonomy changes significantly.
 */
const GL_CATEGORIES = [
  "Neurotoxins",
  "Dermal Fillers",
  "Energy-Based Skin Tightening",
  "Body Contouring",
  "Weight Management",
  "Biostimulators",
  "Skincare Actives",
];

const KEYWORD_MAP: Record<string, string[]> = {
  Neurotoxins: ["botox", "botulinum", "dysport", "daxxify", "neurotoxin", "toxin", "wrinkle", "frown", "forehead"],
  "Dermal Fillers": ["filler", "hyaluronic", "juvederm", "restylane", "rha", "lip", "cheek", "nasolabial"],
  "Energy-Based Skin Tightening": ["laser", "rf", "radiofrequency", "ultherapy", "sofwave", "morpheus", "skin tightening"],
  "Body Contouring": ["coolsculpting", "kybella", "body", "fat", "contouring", "sculpt"],
  "Weight Management": ["semaglutide", "tirzepatide", "weight", "ozempic", "wegovy", "glp"],
  Biostimulators: ["sculptra", "radiesse", "biostimulator", "collagen"],
  "Skincare Actives": ["skincare", "retinol", "vitamin c", "peptide", "active", "serum"],
};

/**
 * Returns 3 nearest GL category names for a given out-of-scope question.
 * Falls back to the first 3 categories if no keyword matches.
 */
export function nearestTopics(question: string): string[] {
  const q = question.toLowerCase();

  const scored = GL_CATEGORIES.map((cat) => {
    const keywords = KEYWORD_MAP[cat] ?? [];
    const score = keywords.filter((kw) => q.includes(kw)).length;
    return { cat, score };
  });

  const matches = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);

  if (matches.length >= 3) return matches.slice(0, 3).map((s) => s.cat);
  if (matches.length > 0) {
    const matchedCats = new Set(matches.map((s) => s.cat));
    const fillers = GL_CATEGORIES.filter((c) => !matchedCats.has(c));
    return [...matches.map((s) => s.cat), ...fillers].slice(0, 3);
  }

  return GL_CATEGORIES.slice(0, 3);
}
