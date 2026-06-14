import type {
  CombinationContent,
  ProductContent,
  ConcernContent,
} from "@/lib/types/fuel-docs"

// =============================================================================
// Sample Fuel Doc Templates
//
// These are fully populated examples showing what good fuel docs look like.
// Used as:
//   1. Seed data when creating new fuel docs (pre-fill with relevant sample)
//   2. Documentation of the field structure and expected content quality
//   3. Reference for agents to understand the fuel doc format
// =============================================================================

// --- Sample Combination: Botox Cosmetic + Juvederm Vollure XC ---

export const SAMPLE_COMBINATION: CombinationContent = {
  patient_facing_name: "Expression Lines + Volume Restoration",
  one_line_positioning:
    "Relaxes movement-based lines while restoring volume in deeper folds — addresses two different types of facial aging in one plan.",
  package_goal:
    "Complete facial rejuvenation addressing both dynamic wrinkles (from muscle movement) and static volume loss (nasolabial folds, marionette lines).",
  ideal_candidate:
    "Adults noticing both expression lines (forehead, crow's feet, frown lines) AND deeper folds or volume loss around the nose-to-mouth area. Typically 35-55, seeking natural-looking improvement across multiple concern areas.",
  not_ideal_candidate:
    "Patients with only one type of concern (movement lines OR volume loss, not both). Patients with unrealistic expectations about complete wrinkle elimination. Patients with contraindications to either product.",
  concern_tags: ["Fine Lines", "Volume Loss", "Nasolabial Folds", "Skin Aging"],
  why_together:
    "Botox and Vollure work on completely different types of facial aging through different mechanisms at different tissue layers. Botox relaxes the muscles causing expression lines; Vollure restores volume in static folds. Neither can do what the other does — they are genuinely complementary, not redundant.",
  a_solves:
    "Dynamic wrinkles caused by repetitive muscle movement — forehead lines, glabellar lines (frown lines), lateral canthal lines (crow's feet).",
  a_does_not_solve:
    "Cannot restore lost volume. Cannot address static folds that remain at rest (nasolabial folds, marionette lines). Does not improve skin texture or quality.",
  b_adds:
    "Volume restoration at the mid-depth level — specifically designed for moderate to severe nasolabial folds and facial wrinkles. Smooths static lines that Botox cannot treat.",
  clinical_rationale:
    "Neurotoxin relaxes dynamic muscles; Vollure restores mid-depth volume (NLF). Published evidence supports the combination of BoNT-A with HA fillers as superior to either modality alone (DOI 10.1097/DSS.0000000000000754). Botox addresses movement-based lines that Vollure cannot treat, while Vollure addresses static volume loss that Botox cannot restore.",
  patient_education_summary:
    "Botox helps relax the muscles that cause expression lines — like frown lines and crow's feet. But it can't address the deeper lines that stay even when your face is at rest, like the lines from your nose to the corners of your mouth. Those are caused by volume loss, not muscle movement. Vollure is designed specifically for those nasolabial folds, softening them by restoring volume at the right depth. Many patients find that treating both creates a more complete, natural-looking result.",
  staff_close:
    "When presenting this combination, frame it as addressing two different problems — not as an upsell. 'We're treating movement-based lines with Botox and volume-based lines with filler. They work on completely different things.'",
  staff_talking_points:
    "When a patient comes in concerned about looking tired or aged: 'Botox can help with the lines around your eyes and forehead — those are caused by muscle movement. But if you're also noticing deeper lines from your nose to the corners of your mouth, those are caused by volume loss, which Botox can't address. Vollure is designed to soften those specific lines. Some patients choose to address both in the same visit, while others prefer to start with one and see how they feel.' The key is helping patients understand these are two different types of lines — not an upsell.",
  do_not_say: {
    universal: [
      "Never guarantee specific outcomes or timelines",
      "Never compare competitor products negatively",
      "Never pressure patients into additional treatments",
      "Never minimize potential side effects or downtime",
    ],
    pair_specific: [
      "Do not say 'you need both' — frame as addressing different concerns",
      "Do not imply Botox alone is insufficient — it fully treats what it's designed for",
      "Do not promise results are permanent or maintenance-free",
    ],
    practice_specific: [],
  },
  top_objections: [
    {
      objection_type: "cost",
      patient_says: "That's a lot to do at once. Can I just do one?",
      handling_language:
        "Absolutely — many patients start with whichever concern bothers them most. Botox for the movement lines, or filler for the deeper folds. You can always add the other later.",
      do_not_say_in_response:
        "Do not say 'you'll save money doing both at once' or create urgency around bundling.",
    },
    {
      objection_type: "need_both",
      patient_says: "Why can't Botox fix everything?",
      handling_language:
        "Great question. Botox works by relaxing muscles — so it's excellent for lines caused by movement. But the deeper folds around your nose and mouth aren't caused by muscle movement — they're caused by volume loss over time. That's a different type of change that needs a different approach.",
      do_not_say_in_response:
        "Do not say Botox 'doesn't work well enough' — it fully treats what it's designed for.",
    },
    {
      objection_type: "fear_overdone",
      patient_says: "I don't want to look frozen or overdone.",
      handling_language:
        "That's a very common concern and a good one to raise. The goal is always natural-looking results — we use conservative amounts and can always add more at a follow-up. Most people shouldn't be able to tell you've had anything done.",
      do_not_say_in_response:
        "Do not dismiss the concern or guarantee a specific aesthetic outcome.",
    },
  ],
  sequencing_note:
    "Neurotoxin administered first in same-session protocols. If sequential visits: neurotoxin 2 weeks before filler to see muscle response before filling static lines.",
  timing_note:
    "Same session or sequential visits. If same session, neurotoxin first. If sequential: 2 weeks apart allows neurotoxin results to settle before filler placement.",
  downtime_note:
    "Botox: no significant downtime. Vollure: possible swelling, bruising at injection sites for 3-7 days. Post-cannula 48-hour makeup restriction applies to filler component.",
  same_session_ok: true,
  maintenance_story:
    "Botox typically needs refreshing every 3-4 months as muscle activity gradually returns. Vollure results last 12-18 months. Many patients settle into a rhythm of Botox maintenance visits with filler touch-ups once or twice a year.",
  rebooking_trigger:
    "At the 2-week follow-up, assess both areas. If filler results are good, book Botox maintenance for 3-4 months out.",
  next_visit_prompt:
    "Plan to come back in about 3-4 months for Botox maintenance. We'll check your filler at that visit too and see how it's holding up.",
  source_support_summary:
    "Published combination studies (DOI 10.1097/DSS.0000000000000754). FDA product labels for both products. Expert consensus supports same-session use with neurotoxin-first sequencing.",
  evidence_level: "strong",
}

// --- Sample Product: Botox Cosmetic ---

export const SAMPLE_PRODUCT: ProductContent = {
  product_name: "Botox Cosmetic",
  category: "neurotoxin",
  mechanism_summary:
    "OnabotulinumtoxinA — blocks acetylcholine release at the neuromuscular junction, temporarily reducing muscle contraction in treated areas. Effects are localized and reversible.",
  patient_explanation:
    "Botox works by temporarily relaxing specific muscles in your face. Those muscles are what cause lines when you make expressions — like frowning or squinting. By relaxing them, the lines soften and your face looks more rested.",
  fda_indications: [
    "Moderate to severe glabellar lines (frown lines between the eyebrows) in adults",
    "Moderate to severe lateral canthal lines (crow's feet) in adults",
    "Moderate to severe forehead lines in adults",
  ],
  off_label_common: [
    "Lip flip (orbicularis oris)",
    "Masseter reduction / jawline slimming",
    "Platysmal bands (neck bands)",
    "Bunny lines (nasalis)",
    "Gummy smile correction",
  ],
  contraindications: [
    "Known hypersensitivity to any botulinum toxin preparation or formulation components",
    "Infection at the proposed injection site(s)",
    "Known or suspected myasthenia gravis, Eaton-Lambert syndrome, or ALS",
  ],
  does_not_solve:
    "Cannot restore lost volume (nasolabial folds, hollow cheeks, thin lips). Cannot improve skin texture, tone, or pigmentation. Cannot address static wrinkles that persist at rest — those typically require filler or resurfacing.",
  key_talking_points: [
    "Botox treats lines caused by muscle MOVEMENT — not all types of lines",
    "Results typically appear in 3-7 days, with full effect at 2 weeks",
    "Effects are temporary and reversible — typically lasting 3-4 months",
    "The goal is natural-looking relaxation, not a frozen appearance",
    "It's the most-studied aesthetic neurotoxin with 20+ years of clinical data",
  ],
  patient_faq: [
    {
      question: "Does it hurt?",
      answer:
        "Most patients describe it as a quick pinch. The needles are very fine, and the injections take just a few minutes. Some areas are more sensitive than others, but most people tolerate it well without numbing.",
    },
    {
      question: "How long does it last?",
      answer:
        "Typically 3-4 months, though this varies person to person. Over time with regular treatments, some patients find their results last a bit longer as the muscles become trained to relax.",
    },
    {
      question: "Will I look frozen?",
      answer:
        "Not with appropriate dosing. The goal is to soften the lines while preserving natural expression. We use conservative amounts and can always add more at a follow-up if you'd like more effect.",
    },
    {
      question: "What's the difference between Botox and fillers?",
      answer:
        "Botox relaxes muscles that cause expression lines — like frown lines and crow's feet. Fillers add volume to areas that have lost fullness — like the lines from your nose to mouth, or thin lips. They treat different types of aging.",
    },
  ],
  differentiators:
    "Most extensively studied aesthetic neurotoxin globally. OnabotulinumtoxinA formulation with over 20 years of published safety and efficacy data. 900-unit vial format. FDA-approved for 3 upper-face indications.",
  do_not_say: [
    "Never say 'Botox is better than [competitor]' — use factual differentiators only",
    "Never guarantee it will make someone look a specific age",
    "Never downplay the temporary nature of results to close a sale",
    "Never claim it prevents aging — it treats existing dynamic wrinkles",
  ],
  do_not_claim: [
    "Do not claim permanent results",
    "Do not claim it treats all types of wrinkles (only dynamic/movement-based)",
    "Do not claim it improves skin quality or texture",
    "Do not claim it prevents future wrinkle formation (insufficient evidence)",
  ],
  treatment_cadence:
    "Every 3-4 months for maintenance. Some patients extend to 4-6 months with regular use. Minimum retreatment interval: 85 days (12 weeks) per safety guidelines.",
  onset_time: "3-7 days for initial effect; full effect typically at 10-14 days.",
  duration: "3-4 months typical. Individual variation based on metabolism, dosing, and treatment area.",
  downtime_summary:
    "Minimal. Possible pinpoint bruising at injection sites (resolves 1-3 days). Avoid lying down for 4 hours post-treatment. Avoid strenuous exercise for 24 hours.",
  source_support_summary:
    "FDA-approved product label. Extensive PubMed literature (thousands of studies). Allergan clinical data. 20+ years of post-market safety surveillance.",
  evidence_level: "strong",
}

// --- Sample Concern: Volume Loss ---

export const SAMPLE_CONCERN: ConcernContent = {
  concern_name: "Volume Loss",
  concern_cluster_id: null,
  patient_language: [
    "My face looks hollow",
    "I look tired all the time",
    "My cheeks look flat",
    "I've lost volume in my face",
    "My face looks thinner than it used to",
    "I look gaunt",
    "My under-eyes look sunken",
    "The lines from my nose to my mouth are getting deeper",
  ],
  underlying_cause:
    "Age-related fat pad descent and volume depletion, bone resorption, and collagen/elastin degradation. Fat pads in the midface descend and shrink over time, creating hollows, deepening nasolabial folds, and contributing to the 'tired' appearance patients describe. This is a structural change, not a skin-surface problem.",
  patient_explanation:
    "As we age, the natural volume in our face — the fat pads, collagen, even bone — gradually diminishes. Think of it like a grape slowly becoming a raisin. The skin hasn't changed as much as what's underneath it. That's why you might notice your face looking flatter, hollower, or more tired even when your skin itself looks healthy.",
  what_helps: [
    "HA dermal fillers (Vollure, Voluma, Restylane Lyft) — immediate volume restoration",
    "Biostimulators (Sculptra) — gradual collagen rebuilding over 2-3 months",
    "Combination approaches — filler for immediate result + biostimulator for long-term structural support",
  ],
  what_does_not_help: [
    "Botox/neurotoxins — relaxes muscles but cannot restore volume",
    "Topical skincare alone — creams cannot replace deep structural volume",
    "Chemical peels / microneedling — improves skin surface, not underlying volume",
    "Laser treatments — addresses skin quality, not volume depletion",
  ],
  treatment_sequence:
    "Typically start with the area of greatest concern. For global volume loss: midface/cheeks first (Voluma or Sculptra), then address secondary areas (NLF with Vollure, marionettes, etc.) at a follow-up. Neurotoxin can be added for dynamic wrinkles at any point.",
  expected_timeline:
    "HA fillers: immediate visible improvement, with final result at 2 weeks (after swelling resolves). Biostimulators: gradual improvement over 2-3 months as collagen rebuilds. Full treatment plan may take 2-3 visits over 4-8 weeks.",
  realistic_expectations:
    "Volume restoration can make a significant difference in facial harmony and 'rested' appearance, but it won't make you look 20 years younger. The goal is to restore what was lost, not to create volume that was never there. Results are temporary and require maintenance.",
  consultation_language:
    "When discussing volume loss, focus on restoration rather than anti-aging: 'What I'm seeing is that some of the natural volume here has diminished over time — that's completely normal. The good news is we have options to restore that fullness, which can make a real difference in how rested and refreshed you look.'",
  staff_talking_points: [
    "Frame volume loss as a structural change — not a skin problem",
    "Use the grape-to-raisin analogy to explain why creams alone don't help",
    "Distinguish between movement-based lines (neurotoxin) and volume-based lines (filler)",
    "Set realistic timelines: filler is immediate, biostimulators take 2-3 months",
    "Don't push the most expensive option — start with the patient's primary concern area",
  ],
  do_not_say: [
    "Don't say 'you need filler everywhere' — address specific areas of concern",
    "Don't say 'your face is deflating' or use alarming language",
    "Don't suggest volume loss means something is wrong — it's a normal part of aging",
    "Don't promise filler will make them look a specific age",
  ],
  do_not_promise: [
    "Don't promise permanent results — all volume treatments require maintenance",
    "Don't promise exact symmetry — some natural asymmetry is normal",
    "Don't promise results will look exactly like a before/after photo",
    "Don't promise one treatment will address all areas — a treatment plan is usually needed",
  ],
  source_support_summary:
    "Extensive published literature on age-related facial volume loss and restoration. FDA-approved indications for midface volume deficit (Voluma), moderate-severe wrinkles and folds (Vollure), and collagen stimulation (Sculptra).",
  evidence_level: "strong",
}

// --- Lookup by fuel type ---

export const SAMPLE_TEMPLATES = {
  combination: SAMPLE_COMBINATION,
  product: SAMPLE_PRODUCT,
  concern: SAMPLE_CONCERN,
} as const
