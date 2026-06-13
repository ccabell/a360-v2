import type { VerbGroup } from "@/components/ask/ask-experience";

export const ASK_SUGGESTIONS: VerbGroup[] = [
  {
    verb: "Compare",
    items: [
      { query: "Botox vs Dysport vs Daxxify — how do they differ?" },
      { query: "Sofwave vs Ultherapy PRIME for skin tightening" },
      { query: "Semaglutide vs tirzepatide for weight management" },
    ],
  },
  {
    verb: "Safety",
    items: [
      { query: "Who should not get Sculptra?" },
      { query: "What are the contraindications for Botox Cosmetic?" },
      { query: "What are the risks of Kybella under the chin?" },
    ],
  },
  {
    verb: "Pairing",
    items: [
      { query: "Can Morpheus8 and dermal filler be done the same day?" },
      { query: "Can Botox and Juvederm be combined in one visit?" },
      { query: "Does HydraFacial pair with a Hollywood Spectra laser facial?" },
    ],
  },
  {
    verb: "Timing",
    items: [
      { query: "How long before a wedding should filler be done?" },
      { query: "How often does Botox need to be repeated?" },
      { query: "When do Sculptra results become visible?" },
    ],
  },
  {
    verb: "Value",
    items: [
      { query: "Why does Daxxify cost more than Botox?" },
      { query: "What does SKINVIVE do that skincare cannot?" },
      { query: "What makes Ultherapy PRIME different from older Ultherapy?" },
    ],
  },
];
