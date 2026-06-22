/**
 * Curriculum + reference taxonomy for the Tim Pearce Injector Academy.
 *
 * This is the deterministic backbone of the whole product. Every video and
 * every transcript segment is tagged against these topics by keyword matching
 * over the cleaned text and the title — no model invention, fully traceable.
 *
 * MODULES = course units (the learning path).
 * TOPICS  = reference-guide encyclopedia entries (each rolls up to a module).
 */

import type { Module, Topic } from "./types";

/**
 * Topic definitions. `keywords` are matched (word-boundary, case-insensitive)
 * against title (weighted heavily) and segment text (weighted lightly).
 * Order roughly mirrors clinical priority.
 */
export const TOPICS: Topic[] = [
  // ── Safety: vascular & necrosis ──────────────────────────────────────────
  {
    id: "vascular-occlusion",
    title: "Vascular Occlusion",
    blurb:
      "Recognising, preventing and managing arterial occlusion — the injector's worst-case scenario.",
    module: "safety",
    category: "safety",
    keywords: [
      "vascular occlusion",
      "occlusion",
      "occluding",
      "occlude",
      "vo ",
      "arterial",
      "ischemia",
      "ischaemia",
    ],
  },
  {
    id: "necrosis",
    title: "Necrosis & Tissue Death",
    blurb:
      "How necrosis develops, tracks the vasculature, and the steps that avoid it.",
    module: "safety",
    category: "safety",
    keywords: ["necrosis", "necrotic", "tissue death", "skin death", "compression necrosis"],
  },
  {
    id: "blindness",
    title: "Filler Blindness",
    blurb:
      "The retinal-artery pathway to blindness and the high-risk zones that cause it.",
    module: "safety",
    category: "safety",
    keywords: ["blindness", "blind", "retinal", "retina", "vision loss", "ophthalmic"],
  },
  {
    id: "danger-zones",
    title: "Danger Zones & Dangerous Arteries",
    blurb:
      "The facial regions and named arteries where a needle does the most harm.",
    module: "safety",
    category: "safety",
    keywords: [
      "danger point",
      "danger zone",
      "danger area",
      "dangerous arter",
      "never inject",
      "never put a needle",
      "supratrochlear",
      "supraorbital",
      "angular artery",
      "facial artery",
      "infraorbital",
      "columella",
      "labial artery",
    ],
  },
  {
    id: "aspiration",
    title: "Aspiration",
    blurb:
      "Whether aspiration works, how to do it without trauma, and the ongoing debate.",
    module: "safety",
    category: "safety",
    keywords: ["aspirat", "aspirate", "positive aspiration"],
  },
  {
    id: "injection-safety",
    title: "Injection Safety Principles",
    blurb:
      "Layering-up risk avoidance, depth discipline, and reducing injury as an injector.",
    module: "safety",
    category: "safety",
    keywords: [
      "injection safety",
      "safety mistake",
      "stay safe",
      "reduce the risk",
      "risk avoidance",
      "injecting on the bone",
      "inject deep",
      "deep injecting",
    ],
  },

  // ── Complications management ──────────────────────────────────────────────
  {
    id: "bruising-haematoma",
    title: "Bruising & Haematoma",
    blurb: "Preventing, diagnosing and managing bruising and lip haematoma.",
    module: "complications",
    category: "complications",
    keywords: ["bruis", "haematoma", "hematoma", "bruise"],
  },
  {
    id: "nodules-lumps",
    title: "Nodules & Lumps",
    blurb:
      "Delayed-onset nodules, lip lumps, and how to diagnose and treat them.",
    module: "complications",
    category: "complications",
    keywords: ["nodule", "lump", "bump", "delayed onset", "lesion"],
  },
  {
    id: "ptosis",
    title: "Eyelid & Brow Ptosis",
    blurb:
      "Avoiding and fixing eyelid ptosis, Spock brow and hooded-eye results.",
    module: "complications",
    category: "complications",
    keywords: ["ptosis", "spock brow", "hooded", "droopy eyelid", "eyelid drop"],
  },
  {
    id: "swelling-oedema",
    title: "Swelling & Oedema",
    blurb: "Managing periorbital oedema, puffy eyes and post-treatment swelling.",
    module: "complications",
    category: "complications",
    keywords: ["swelling", "oedema", "edema", "puffy", "periorbital"],
  },
  {
    id: "migration",
    title: "Filler Migration",
    blurb: "Why filler migrates, how to defend the border, and prevention.",
    module: "complications",
    category: "complications",
    keywords: ["migration", "migrate", "defend the border"],
  },
  {
    id: "complication-diagnosis",
    title: "Diagnosing Complications",
    blurb:
      "A systematic approach to getting fast, accurate complications advice.",
    module: "complications",
    category: "complications",
    keywords: [
      "diagnose complication",
      "complications advice",
      "manage complication",
      "complication management",
      "filler fail",
      "when complications",
    ],
  },

  // ── Hyaluronidase / dissolving ────────────────────────────────────────────
  {
    id: "hyaluronidase",
    title: "Hyaluronidase & Dissolving",
    blurb:
      "Dosing, allergy, overdose risk and reversing filler with hyaluronidase.",
    module: "dissolving",
    category: "technique",
    keywords: [
      "hyaluronidase",
      "hyalase",
      "hyalaise",
      "dissolv",
      "dissolve",
      "reversal",
      "reverse",
      "aqualyx",
    ],
  },

  // ── Anatomy ───────────────────────────────────────────────────────────────
  {
    id: "muscle-anatomy",
    title: "Facial Muscle Anatomy",
    blurb:
      "The muscles that drive expression and how to work with (not against) them.",
    module: "anatomy",
    category: "anatomy",
    keywords: [
      "muscle anatomy",
      "facial muscle",
      "orbicularis",
      "frontalis",
      "corrugator",
      "masseter muscle",
      "depressor",
      "platysma",
      "myomodulation",
    ],
  },
  {
    id: "fat-pads-ligaments",
    title: "Fat Pads & Ligaments",
    blurb:
      "Why fat pads and ligaments drive the majority of visible facial ageing.",
    module: "anatomy",
    category: "anatomy",
    keywords: ["fat pad", "ligament", "deep fat", "buccal fat"],
  },
  {
    id: "biomechanics-vectors",
    title: "Biomechanics & Vectors",
    blurb:
      "Vectors, the muscular tug-of-war and the biomechanics of an ageing face.",
    module: "anatomy",
    category: "anatomy",
    keywords: ["biomechanic", "vector", "tug of war", "myomodulation"],
  },
  {
    id: "facial-assessment",
    title: "Facial Assessment & Beauty",
    blurb:
      "Reading a face: bone structure, attractiveness drivers and full-face analysis.",
    module: "anatomy",
    category: "anatomy",
    keywords: [
      "facial analysis",
      "facial assessment",
      "bone structure",
      "beautiful face",
      "attractive",
      "beauty",
      "full-face",
      "full face assessment",
    ],
  },

  // ── Regional technique ────────────────────────────────────────────────────
  {
    id: "lips",
    title: "Lips",
    blurb: "Lip design, safe technique, mature lips and avoiding the labial artery.",
    module: "regional",
    category: "regional",
    keywords: ["lip filler", "lips", "lip injection", "lip design", "labial artery", "lip enhancement"],
  },
  {
    id: "cheeks",
    title: "Cheeks",
    blurb: "Cheek injection points, design and the cheek-vs-nasolabial decision.",
    module: "regional",
    category: "regional",
    keywords: ["cheek", "zygoma", "zygomatic", "malar"],
  },
  {
    id: "chin-jawline",
    title: "Chin & Jawline",
    blurb: "Chin augmentation, sharp jawlines and masculine vs feminine results.",
    module: "regional",
    category: "regional",
    keywords: ["jawline", "jaw filler", "chin", "jowl", "mandible", "jaw "],
  },
  {
    id: "nose",
    title: "Nose (Liquid Rhinoplasty)",
    blurb: "Non-surgical rhinoplasty technique and the nose's severe complication risk.",
    module: "regional",
    category: "regional",
    keywords: ["rhinoplasty", "nose filler", "nose tip", "dorsal hump", "nasal"],
  },
  {
    id: "tear-trough",
    title: "Tear Trough & Under-Eye",
    blurb: "Tear-trough anatomy, dark circles, oedema and why complications are common.",
    module: "regional",
    category: "regional",
    keywords: ["tear trough", "under eye", "under-eye", "dark circle", "periorbital"],
  },
  {
    id: "nasolabial-marionette",
    title: "Nasolabial & Marionette Lines",
    blurb: "Treating NLFs and marionette lines without ageing the patient.",
    module: "regional",
    category: "regional",
    keywords: ["nasolabial", "nlf", "marionette", "smile line"],
  },
  {
    id: "forehead-temples",
    title: "Forehead & Temples",
    blurb: "Forehead lines, temple filler safety and resistant frown lines.",
    module: "regional",
    category: "regional",
    keywords: ["forehead", "temple", "frontalis", "glabella", "frown line"],
  },
  {
    id: "neck",
    title: "Neck",
    blurb: "Treating neck lines and platysmal considerations with filler and toxin.",
    module: "regional",
    category: "regional",
    keywords: ["neck line", "neck filler", "platysma", "trap tox"],
  },

  // ── Botox / toxin ─────────────────────────────────────────────────────────
  {
    id: "botox-patterns",
    title: "Botox Injection Patterns",
    blurb: "Go-to toxin patterns, baby botox and the patterns to avoid.",
    module: "toxin",
    category: "toxin",
    keywords: ["botox pattern", "injection pattern", "baby botox", "toxin pattern", "botox mistake"],
  },
  {
    id: "botox-depth",
    title: "Botox Injection Depth",
    blurb: "Choosing the right depth for frontalis, glabella, crow's feet and lower face.",
    module: "toxin",
    category: "toxin",
    keywords: ["injection depth", "botox depth", "needle depth", "how deep"],
  },
  {
    id: "brow-lift",
    title: "Botox Brow Lift",
    blurb: "Brow-lift patterns, mark-up and avoiding Spock brow and ptosis.",
    module: "toxin",
    category: "toxin",
    keywords: ["brow lift", "eyebrow lift", "brow ptosis"],
  },
  {
    id: "masseter",
    title: "Masseter & Jaw Toxin",
    blurb: "Masseter botox patterns, slimming the jaw and the mistakes to avoid.",
    module: "toxin",
    category: "toxin",
    keywords: ["masseter", "jaw toxin", "calf reduction", "trap tox"],
  },
  {
    id: "toxin-longevity",
    title: "Toxin Longevity & Resistance",
    blurb: "What really affects how long toxin lasts and botox resistance.",
    module: "toxin",
    category: "toxin",
    keywords: ["toxin longevity", "last 12 weeks", "resistant to botox", "botox resistance", "stop wasting your botox"],
  },
  {
    id: "smile-corrections",
    title: "Smile & Asymmetry Corrections",
    blurb: "Gummy smile, joker smile, asymmetric smile and downturned-mouth fixes.",
    module: "toxin",
    category: "toxin",
    keywords: ["gummy smile", "joker smile", "asymmetr", "downturned mouth", "dao"],
  },

  // ── Injection craft ───────────────────────────────────────────────────────
  {
    id: "cannula-needle",
    title: "Cannula vs Needle",
    blurb: "When to choose a cannula, insertion technique and needle bending.",
    module: "technique",
    category: "technique",
    keywords: ["cannula", "needle technique", "bend your needle", "bd syringe", "blunt"],
  },
  {
    id: "injection-craft",
    title: "Angles, Depth & Handling",
    blurb: "Best angles, depths, stabilising and product handling at the chairside.",
    module: "technique",
    category: "technique",
    keywords: [
      "injection technique",
      "best angle",
      "stabilise",
      "stabilize",
      "depth check",
      "layering",
      "3d inject",
    ],
  },

  // ── Patient selection & consultation ──────────────────────────────────────
  {
    id: "body-dysmorphia",
    title: "Body Dysmorphia & Overtreatment",
    blurb: "Spotting body dysmorphia, refusing overdone patients and ethical limits.",
    module: "patient",
    category: "patient",
    keywords: ["dysmorphia", "overdone", "too much work", "body modification", "overtreat"],
  },
  {
    id: "consultation",
    title: "Consultation & Expectations",
    blurb: "Treatment planning, managing celebrity-driven and unrealistic expectations.",
    module: "patient",
    category: "patient",
    keywords: ["consultation", "manage expectation", "patient expectation", "treatment plan", "managing patient"],
  },
  {
    id: "contraindications",
    title: "Contraindications & Safety Screening",
    blurb: "Autoimmune disease, pregnancy, vaccines, allergies and when to say no.",
    module: "patient",
    category: "patient",
    keywords: [
      "contraindicat",
      "autoimmune",
      "pregnant",
      "breastfeeding",
      "vaccine",
      "allergic",
      "cold sore",
      "herpes",
    ],
  },

  // ── Practice growth ───────────────────────────────────────────────────────
  {
    id: "pricing",
    title: "Pricing & Positioning",
    blurb: "Pricing strategy, competing on value not price, and proving your worth.",
    module: "business",
    category: "business",
    keywords: ["pricing", "price", "charge", "1ml", "low prices", "budget"],
  },
  {
    id: "marketing",
    title: "Marketing & Social Media",
    blurb: "Building a brand, Instagram growth, reels and getting posts seen.",
    module: "business",
    category: "business",
    keywords: ["social media", "instagram", "marketing", "branding", "hashtag", "reels", "advertise", "posts seen"],
  },
  {
    id: "clinic-building",
    title: "Building a Clinic",
    blurb: "Going full-time, building clinics and the framework for a clinic empire.",
    module: "business",
    category: "business",
    keywords: ["clinic", "aesthetics business", "full time", "clinic empire", "build a", "successful aesthetic"],
  },
  {
    id: "mindset",
    title: "Injector Mindset & Confidence",
    blurb: "Beating complication phobia, the Dunning-Kruger trap and online haters.",
    module: "business",
    category: "business",
    keywords: ["confident injector", "dunning kruger", "phobia", "haters", "trolls", "mindset", "imposter"],
  },

  // ── Longevity / wellness (Tim's pivot) ───────────────────────────────────
  {
    id: "longevity",
    title: "Longevity & Anti-Ageing",
    blurb: "Biological age, fasting, supplements, HRT and the longevity pivot.",
    module: "wellness",
    category: "wellness",
    keywords: [
      "longevity",
      "biological age",
      "anti-aging",
      "anti aging",
      "fasting",
      "supplement",
      "hrt",
      "menopause",
      "age backwards",
      "reverse our biological",
    ],
  },
];

/** Module definitions in course order. Topic membership is assigned below. */
export const MODULES: Module[] = [
  {
    id: "safety",
    title: "Safety & Danger Zones",
    blurb:
      "The non-negotiables: vascular occlusion, necrosis, blindness and the arteries that cause them.",
    icon: "ShieldAlert",
    order: 1,
    topics: [],
  },
  {
    id: "anatomy",
    title: "Facial Anatomy",
    blurb:
      "Muscles, fat pads, ligaments and biomechanics — the map under every injection.",
    icon: "Brain",
    order: 2,
    topics: [],
  },
  {
    id: "technique",
    title: "Injection Technique",
    blurb:
      "Cannula vs needle, angles, depth and handling — the craft of a safe, precise injection.",
    icon: "Syringe",
    order: 3,
    topics: [],
  },
  {
    id: "toxin",
    title: "Botox & Toxin",
    blurb:
      "Patterns, depth, brow lift, masseter and longevity — toxin done deliberately.",
    icon: "Sparkles",
    order: 4,
    topics: [],
  },
  {
    id: "regional",
    title: "Regional Technique",
    blurb:
      "Region-by-region filler: lips, cheeks, chin, jawline, nose, tear trough and more.",
    icon: "ScanFace",
    order: 5,
    topics: [],
  },
  {
    id: "complications",
    title: "Complications Management",
    blurb:
      "Bruising, nodules, ptosis, swelling and migration — diagnose, treat, prevent.",
    icon: "Stethoscope",
    order: 6,
    topics: [],
  },
  {
    id: "dissolving",
    title: "Hyaluronidase & Dissolving",
    blurb:
      "Reversing filler safely: dosing, allergy, overdose risk and dissolving technique.",
    icon: "Droplets",
    order: 7,
    topics: [],
  },
  {
    id: "patient",
    title: "Patient Selection & Consultation",
    blurb:
      "Body dysmorphia, expectations, contraindications — choosing who (and who not) to treat.",
    icon: "ClipboardCheck",
    order: 8,
    topics: [],
  },
  {
    id: "business",
    title: "Practice Growth",
    blurb:
      "Pricing, marketing, building a clinic and the mindset behind a thriving practice.",
    icon: "TrendingUp",
    order: 9,
    topics: [],
  },
  {
    id: "wellness",
    title: "Longevity & Wellness",
    blurb:
      "Biological age, fasting, supplements and HRT — Dr Tim's expansion beyond the needle.",
    icon: "HeartPulse",
    order: 10,
    topics: [],
  },
];

// Assign each topic to its module (preserve TOPICS order within a module).
for (const t of TOPICS) {
  const m = MODULES.find((mod) => mod.id === t.module);
  if (m) m.topics.push(t.id);
}

export const TOPIC_BY_ID = new Map(TOPICS.map((t) => [t.id, t]));
export const MODULE_BY_ID = new Map(MODULES.map((m) => [m.id, m]));
