import type { RetrievedSource } from "@/lib/types/retrieval";

/**
 * Mock retrieval set + generated answer for the Research chat demo.
 * Synthetic clinical/literature sources (no PHI) spanning all 7 corpora.
 * Stands in for the real /api/retrieval/search response until the service lands.
 */

export interface ResearchScenario {
  sources: RetrievedSource[];
  answer: string; // contains [src_N] markers the post-processor resolves
}

const SOURCES: RetrievedSource[] = [
  {
    retrievalId: "src_1",
    chunkRef: "fda:103000s5326-p12",
    corpus: "fda",
    scores: { vector: 0.81, fts: 0.74, fused: 0.88, authorityWeight: 1.45, final: 1.28 },
    text: "The recommended total dose for glabellar lines is 20 Units administered as 4 Units into each of 5 sites: 2 in each corrugator muscle and 1 in the procerus muscle. Onset of effect is generally seen within the first week.",
    locator: {
      type: "document",
      corpus: "fda",
      filename: "botox-cosmetic-pi.pdf",
      title: "BOTOX Cosmetic (onabotulinumtoxinA) Prescribing Information",
      pageNumber: 12,
      section: "2.1 Glabellar Lines",
      storagePath: "fda/botox-cosmetic-pi.pdf",
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/103000s5326lbl.pdf",
      sourceAuthority: "fda_label",
    },
  },
  {
    retrievalId: "src_2",
    chunkRef: "pubmed:38456789",
    corpus: "pubmed",
    scores: { vector: 0.86, fts: 0.69, fused: 0.91, authorityWeight: 1.36, final: 1.24 },
    text: "Across 28 randomized trials, visible improvement in dynamic rhytides began at a median of 3 to 4 days, with peak effect at 14 days and a mean duration of 3.5 months.",
    locator: {
      type: "pubmed",
      pmid: "38456789",
      title:
        "Onset Timeline and Duration of Efficacy of Botulinum Toxin Type A in Facial Aesthetics: A Systematic Review",
      authors: "Nguyen T, Patel R, Okafor C, et al.",
      journal: "Dermatologic Surgery",
      pubDate: "2024-03",
      doi: "10.1097/DSS.0000000000004102",
      url: "https://pubmed.ncbi.nlm.nih.gov/38456789/",
    },
  },
  {
    retrievalId: "src_3",
    chunkRef: "youtube:aBcD1234efg",
    corpus: "youtube",
    scores: { vector: 0.79, fts: 0.55, fused: 0.82, authorityWeight: 1.4, final: 1.15 },
    text: "Here we mark the five standard injection points for the glabellar complex and inject four units at each, keeping the needle perpendicular to the corrugator.",
    locator: {
      type: "youtube",
      // Real, stable video ID so the thumbnail/player demonstrably loads in the demo.
      videoId: "aqz-KE-bpKQ",
      videoTitle: "BOTOX Cosmetic Injection Technique — Glabellar Complex",
      manufacturerName: "Allergan Aesthetics",
      startSeconds: 134,
      endSeconds: 212,
      contentType: "procedure_demo",
      audience: "clinician",
      url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ&t=134",
      thumbnailUrl: "https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
    },
  },
  {
    retrievalId: "src_4",
    chunkRef: "podcast:aesthetic-insider-ep142",
    corpus: "podcast",
    scores: { vector: 0.72, fts: 0.4, fused: 0.7, authorityWeight: 0.9, final: 0.63 },
    text: "Male patients frequently need 30 to 40 units in the glabella rather than 20, because corrugator muscle mass is substantially greater — under-dosing is the most common cause of early return of movement.",
    locator: {
      type: "podcast",
      showName: "The Aesthetic Insider",
      episodeTitle: "Dosing Nuances: Male Patients, Heavy Brows, and Touch-ups",
      host: "Dr. Lena Brooks",
      guests: ["Dr. Marcus Hale"],
      publishedDate: "2024-02-18",
      startSeconds: 1245,
      url: "https://aestheticinsider.fm/episodes/dosing-nuances",
    },
  },
  {
    retrievalId: "src_5",
    chunkRef: "industry:air-neurotoxin-onset-2024",
    corpus: "industry",
    scores: { vector: 0.68, fts: 0.51, fused: 0.66, authorityWeight: 1.05, final: 0.69 },
    text: "Newer toxins are marketed on faster onset, with some data suggesting visible movement reduction within 24 to 48 hours, compressing the traditional multi-day window.",
    locator: {
      type: "industry",
      articleTitle: "Neurotoxin Market 2024: Onset Speed Becomes the New Battleground",
      publication: "Aesthetic Industry Report",
      publishedDate: "2024-01-30",
      url: "https://aestheticindustryreport.com/neurotoxin-onset-2024",
    },
  },
  {
    retrievalId: "src_6",
    chunkRef: "practice:injection-protocol-v3-p4",
    corpus: "practice",
    scores: { vector: 0.77, fts: 0.62, fused: 0.8, authorityWeight: 1.35, final: 1.08 },
    text: "Standard glabellar dosing at this practice is 20 units for first-time female patients and 25 to 30 units for male patients, with a two-week touch-up visit included.",
    locator: {
      type: "document",
      corpus: "practice",
      filename: "injection-protocol-v3.pdf",
      title: "Clinic Injection Protocol — Neurotoxins",
      pageNumber: 4,
      section: "Glabella",
      storagePath: "practice/injection-protocol-v3.pdf",
      url: "https://files.example-practice.com/injection-protocol-v3.pdf",
      sourceAuthority: "internal",
    },
  },
  {
    retrievalId: "src_7",
    chunkRef: "pubmed:37222100",
    corpus: "pubmed",
    scores: { vector: 0.84, fts: 0.6, fused: 0.89, authorityWeight: 1.37, final: 1.22 },
    text: "Pooled data demonstrate that male patients require approximately 1.5 to 2 times the glabellar dose of female patients to achieve equivalent duration of effect.",
    locator: {
      type: "pubmed",
      pmid: "37222100",
      title: "Sex Differences in Botulinum Toxin Dosing for the Upper Face: A Meta-analysis",
      authors: "Okafor C, Lindqvist S",
      journal: "JAMA Facial Plastic Surgery",
      pubDate: "2023-11",
      doi: "10.1001/jamafacial.2023.5567",
      url: "https://pubmed.ncbi.nlm.nih.gov/37222100/",
    },
  },
  {
    retrievalId: "src_8",
    chunkRef: "manufacturer:botox-dosing-guide-p6",
    corpus: "manufacturer",
    scores: { vector: 0.8, fts: 0.71, fused: 0.85, authorityWeight: 1.4, final: 1.19 },
    text: "Reconstitute with 2.5 mL preservative-free saline for 4 U per 0.1 mL. The glabellar complex is dosed at 20 U total across five injection points.",
    locator: {
      type: "document",
      corpus: "manufacturer",
      filename: "botox-dosing-guide.pdf",
      title: "BOTOX Cosmetic Dosing & Reconstitution Guide",
      pageNumber: 6,
      section: "Upper Face",
      storagePath: "manufacturer/botox-dosing-guide.pdf",
      url: "https://hcp.botoxcosmetic.com/dosing-guide.pdf",
      sourceAuthority: "manufacturer",
    },
  },
];

const ANSWER = `Onset of BOTOX Cosmetic is typically within the first 3–7 days, with peak effect around two weeks and a mean duration of roughly 3.5 months [src_2]. The FDA-approved dose for glabellar lines is 20 units total, given as 4 units across five injection points [src_1][src_8]. A manufacturer technique demonstration walks through these five points in the glabellar complex [src_3].

Dosing differs meaningfully by sex: pooled meta-analysis data show male patients need roughly 1.5–2× the glabellar dose to match duration [src_7], and clinicians discussing real-world practice put male dosing at 30–40 units versus the standard 20 [src_4]. Your practice's own protocol reflects this, specifying 25–30 units for male patients with a two-week touch-up [src_6].

Industry reporting notes that newer toxins now compete on faster onset, with some claiming visible movement reduction within 24–48 hours [src_5].`;

export function pickScenario(_query: string): ResearchScenario {
  // Single rich scenario for the demo — exercises all 7 corpora.
  return { sources: SOURCES, answer: ANSWER };
}

export const EXAMPLE_QUERIES = [
  "How fast does Botox work and what's the glabellar dose?",
  "Does neurotoxin dosing differ for male patients?",
  "What's the evidence on onset timeline for botulinum toxin?",
];
