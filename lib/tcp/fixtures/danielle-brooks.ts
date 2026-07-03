import type { TcpFixture } from "../types";

// =============================================================================
// Danielle Brooks — stage hero fixture for the TCP Builder.
// Ops patient a9094b49-… · consultation 2584ddbc-… (consultation-only).
// Grounded in her real extraction (goals/concerns/signals/outcome) + real
// Global V3 data (concern matches, pairing rationale, patient education). Timing
// is partly seeded (scripts/tcp-timing-seed.sql) — each line tagged real|illustrative.
// Pricing is synthetic / illustrative. No PHI (synthetic patient).
// =============================================================================

export const danielleBrooks: TcpFixture = {
  patientId: "a9094b49-1395-42a9-bb33-f3168d087d19",
  patientName: "Danielle Brooks",
  visitType: "Consultation",
  visitDate: "2026-06-22",
  provider: "Dr. Alyssa Tran",
  location: "Orange Twist · Newport Beach",

  // --- Step 1/2 context band — from the real extraction --------------------
  context: {
    goals: [
      "Look good for her daughter's wedding",
      "Natural-looking result — \"everything to match\"",
      "Minimal downtime",
    ],
    primaryConcern: "A refreshed, natural look before her daughter's October wedding",
    concerns: [
      { label: "Midface volume loss", area: "Cheeks" },
      { label: "Nasolabial folds", area: "Nasolabial folds" },
      { label: "Early jawline laxity", area: "Jawline" },
      { label: "Lip volume (future)", area: "Lips" },
    ],
    treatmentAreas: ["Nasolabial folds", "Cheeks", "Jawline", "Lips"],
    signalTags: [
      { key: "treatment_interest_high", label: "High treatment interest", tone: "positive" },
      { key: "scheduling_intent", label: "Ready to schedule", tone: "positive" },
      { key: "positive_sentiment", label: "Positive sentiment", tone: "positive" },
      { key: "future_language", label: "Planning ahead", tone: "neutral" },
      { key: "partner_consultation", label: "Bringing a partner", tone: "neutral" },
    ],
    objections: [],
    conversion: {
      status: "agreed_pending_scheduling",
      label: "Agreed — pending scheduling",
      summary:
        "Agreed to Vollure for the folds and is receptive to Sculptra for the cheeks. No appointment booked yet — the plan is the close.",
    },
    deadline: { label: "Daughter's wedding", date: "2026-10-17", weeksAway: 17 },
  },

  // --- Step 2 recommendations — real concern matches + GL rationale ---------
  recommendations: [
    {
      id: "rec-vollure",
      productId: "7370545f-97a3-4519-a92d-3ac4f969829d",
      name: "Juvederm Vollure XC",
      kind: "Dermal filler (HA)",
      area: "Nasolabial folds",
      concern: "Nasolabial folds",
      fit: "ideal",
      fdaIndicated: true,
      rationale:
        "FDA-indicated for nasolabial folds. Vollure's soft HA gel smooths the fold crease directly with a natural result lasting ~18 months. Danielle explicitly agreed to this during her consult.",
      source: "agreed",
      defaultAccepted: true,
    },
    {
      id: "rec-sculptra",
      productId: "2ce7a3d2-b06d-4b62-b9b7-4113afb51baa",
      name: "Sculptra Aesthetic",
      kind: "Collagen biostimulator (PLLA)",
      area: "Cheeks / midface",
      concern: "Midface volume loss",
      fit: "ideal",
      fdaIndicated: true,
      rationale:
        "FDA-indicated for cheek and age-related volume loss. A PLLA biostimulator that rebuilds the patient's own collagen gradually over a 2–3 session series — the provider framed it as \"gradual collagen building leading up to October.\" Restoring midface support also lifts the nasolabial folds from above, so less filler is often needed.",
      source: "discussed",
      defaultAccepted: true,
    },
    {
      id: "rec-voluma",
      productId: "6c8f72f0-887f-484a-a588-0bb9bd8052c9",
      name: "Juvederm Voluma XC",
      kind: "Dermal filler (HA)",
      area: "Cheeks / midface",
      concern: "Midface volume loss",
      fit: "strong",
      fdaIndicated: true,
      rationale:
        "FDA-indicated for cheek volume. The immediate-volume alternative to Sculptra — if the October timeline feels tight, Voluma restores deep cheek structure in one visit (settles ~2 weeks) instead of a gradual series. Comparison option to Sculptra.",
      source: "gl_suggested",
      defaultAccepted: false,
    },
    {
      id: "rec-skinvive",
      productId: "b74d5475-bf58-4d7d-87f5-2c8dc9e252de",
      name: "SKINVIVE by Juvederm",
      kind: "Skin booster (microdroplet HA)",
      area: "Cheeks (skin quality)",
      concern: "Skin dullness / hydration",
      fit: "strong",
      fdaIndicated: true,
      pairingTier: "canonical",
      rationale:
        "FDA-indicated for skin quality. Not a volumizing filler — microdroplet HA that improves cheek skin smoothness and hydration for ~6 months. A photo-ready glow finish; pairs same-session with Botox.",
      source: "gl_suggested",
      defaultAccepted: false,
    },
    {
      id: "rec-botox",
      productId: "4b92be36-e84e-432c-8549-f5d85a767fdb",
      name: "Botox Cosmetic",
      kind: "Neuromodulator",
      area: "Upper face (frown, forehead, crow's feet)",
      concern: "Dynamic expression lines",
      fit: "strong",
      fdaIndicated: true,
      pairingTier: "canonical",
      rationale:
        "Relaxes the movement-based lines the fillers can't touch — balancing the upper and lower face for the \"everything matches\" result Danielle asked for. Pairs same-session with the fillers and SKINVIVE.",
      source: "gl_suggested",
      defaultAccepted: false,
    },
    {
      id: "rec-ultherapy",
      productId: "da25d447-c316-40b2-802e-e190c0bdbd9f",
      name: "Merz Ultherapy PRIME",
      kind: "Microfocused ultrasound",
      area: "Jawline / lower face",
      concern: "Early jawline laxity",
      fit: "strong",
      fdaIndicated: true,
      rationale:
        "FDA-cleared to lift lax skin along the jawline — non-invasive, no downtime. Danielle was \"intrigued by Ultherapy PRIME.\" Best started early since the lift builds over 2–3 months.",
      source: "discussed",
      defaultAccepted: false,
    },
  ],

  // --- Step 3 education — real patient_education_text where available -------
  education: [
    {
      id: "edu-vollure-exp",
      recommendationId: "rec-vollure",
      forName: "Juvederm Vollure XC",
      title: "What Vollure does for the folds",
      category: "expectations",
      body:
        "The lines that run from your nose to your mouth — nasolabial folds — often deepen as the midface above them loses support. Vollure is a filler designed specifically for smoothing those fold lines, with a soft, natural result that lasts about 18 months.",
      defaultSelected: true,
    },
    {
      id: "edu-sculptra-mech",
      recommendationId: "rec-sculptra",
      forName: "Sculptra Aesthetic",
      title: "How Sculptra rebuilds volume",
      category: "mechanism",
      body:
        "Sculptra works gradually to support your own collagen production in the midface, which helps lift the cheeks — and the folds — from above. It takes a few months to fully develop, which is why we start early.",
      defaultSelected: true,
    },
    {
      id: "edu-sculptra-series",
      recommendationId: "rec-sculptra",
      forName: "Sculptra Aesthetic",
      title: "Sculptra is a series",
      category: "expectations",
      body:
        "Sculptra is a series of 2–3 sessions about 4–6 weeks apart before you see the full result. Planning the series now lands the collagen build right before October.",
      defaultSelected: true,
    },
    {
      id: "edu-combo-stage",
      recommendationId: "rec-sculptra",
      forName: "Sculptra + Vollure",
      title: "Why we stage Sculptra before Vollure",
      category: "safety",
      body:
        "We establish the Sculptra collagen support first — you may find the folds improve just from that. Then if there's still a crease, Vollure smooths it, and you often need less filler. This sequencing is used in clinical practice; it hasn't been evaluated in controlled trials, so your provider tailors it to you.",
      defaultSelected: true,
    },
    {
      id: "edu-skinvive-mech",
      recommendationId: "rec-skinvive",
      forName: "SKINVIVE by Juvederm",
      title: "SKINVIVE is skin quality, not volume",
      category: "mechanism",
      body:
        "SKINVIVE isn't a filler for volume. It uses tiny microdroplets of hyaluronic acid in the upper layers of the skin to improve hydration, smoothness, and a healthy glow that lasts about six months.",
      defaultSelected: false,
    },
    {
      id: "edu-botox-mech",
      recommendationId: "rec-botox",
      forName: "Botox Cosmetic",
      title: "What Botox handles",
      category: "mechanism",
      body:
        "Botox relaxes the muscles that cause expression lines — like frown lines and crow's feet — for a smoother, rested upper face that balances the volume work below.",
      defaultSelected: false,
    },
    {
      id: "edu-sculptra-aftercare",
      recommendationId: "rec-sculptra",
      forName: "Sculptra Aesthetic",
      title: "Aftercare — the 5-5-5 rule",
      category: "aftercare",
      body:
        "After each Sculptra session, massage the treated area 5 minutes, 5 times a day, for 5 days. Expect 1–2 days of mild swelling.",
      defaultSelected: false,
    },
    {
      id: "edu-filler-aftercare",
      recommendationId: "rec-vollure",
      forName: "Juvederm Vollure XC",
      title: "Aftercare — filler",
      category: "aftercare",
      body:
        "Expect 1–3 days of possible swelling or light bruising. Avoid massaging the area; the result settles by about two weeks.",
      defaultSelected: false,
    },
  ],

  // --- Step 4 roadmap — real same-session/staging where flagged ------------
  // One treatment per entry, gated on its recommendation; grouped by week in the UI.
  timeline: [
    {
      id: "tl-sc1",
      recommendationId: "rec-sculptra",
      whenLabel: "Today",
      offsetWeeks: 0,
      title: "Sculptra — Session 1 (cheeks)",
      detail: "Begin the collagen series in the midface.",
      timingWhy:
        "Collagen builds gradually over 6–12 weeks — starting today gives the cheeks the most time to fill out before October.",
      timingSource: "illustrative",
    },
    {
      id: "tl-sc2",
      recommendationId: "rec-sculptra",
      whenLabel: "Week 5",
      offsetWeeks: 5,
      title: "Sculptra — Session 2",
      detail: "Second collagen session.",
      timingWhy: "Sculptra sessions run ~4–6 weeks apart for steady collagen building.",
      timingSource: "illustrative",
    },
    {
      id: "tl-ulth",
      recommendationId: "rec-ultherapy",
      whenLabel: "Week 5",
      offsetWeeks: 5,
      title: "Ultherapy PRIME (jawline)",
      detail: "Non-invasive jawline lift.",
      timingWhy: "Start early — the Ultherapy lift builds over 2–3 months, so it peaks right around the wedding.",
      timingSource: "illustrative",
    },
    {
      id: "tl-sc3",
      recommendationId: "rec-sculptra",
      whenLabel: "Week 10",
      offsetWeeks: 10,
      title: "Sculptra — Session 3 (final)",
      detail: "Complete the collagen series.",
      timingWhy: "Finishing the series ~7 weeks out lets the final collagen mature before October.",
      timingSource: "illustrative",
    },
    {
      id: "tl-voll",
      recommendationId: "rec-vollure",
      whenLabel: "Week 13",
      offsetWeeks: 13,
      title: "Vollure (nasolabial folds)",
      detail: "Smooth any remaining fold on the new collagen baseline.",
      timingWhy:
        "Staged after the Sculptra series — not the same session — so the folds are judged on the new collagen baseline; less filler is often needed.",
      timingSource: "real",
      sameSessionOk: false,
    },
    {
      id: "tl-botox",
      recommendationId: "rec-botox",
      whenLabel: "Week 15 (~2 weeks out)",
      offsetWeeks: 15,
      title: "Botox (upper face)",
      detail: "Final upper-face balance.",
      timingWhy:
        "Timed ~2 weeks out so Botox peaks (1–2 weeks) for the wedding. Can be combined same-session with SKINVIVE.",
      timingSource: "real",
      sameSessionOk: true,
      combineWith: ["rec-skinvive"],
    },
    {
      id: "tl-skv",
      recommendationId: "rec-skinvive",
      whenLabel: "Week 15 (~2 weeks out)",
      offsetWeeks: 15,
      title: "SKINVIVE (skin glow)",
      detail: "Photo-ready skin finish.",
      timingWhy:
        "Same session as Botox (real pairing) — any small SKINVIVE bumps resolve within ~24 hours, so timing ~2 weeks out keeps photos clear.",
      timingSource: "real",
      sameSessionOk: true,
      combineWith: ["rec-botox"],
    },
  ],

  // --- Step 5 tiers — synthetic, illustrative pricing ----------------------
  tiers: [
    {
      key: "good",
      label: "Targeted correction",
      recommendationIds: ["rec-vollure"],
      narrative:
        "The one thing Danielle already said yes to — smooth the nasolabial folds with Vollure for an immediate, natural refresh.",
      timelineFit: "One visit; settles within ~2 weeks. Works at any point before October.",
      price: { min: 700, max: 950, display: "$700–$950", note: "illustrative" },
    },
    {
      key: "better",
      label: "Balanced & wedding-timed",
      recommendationIds: ["rec-vollure", "rec-sculptra"],
      narrative:
        "Add Sculptra to rebuild cheek volume the way she described — gradual, natural collagen leading up to the wedding. Restoring midface support also softens the folds from above.",
      timelineFit:
        "Sculptra series starts today; Vollure is staged after it settles — fully landed ~2 weeks before October.",
      price: { min: 2400, max: 3600, display: "$2,400–$3,600", note: "illustrative" },
    },
    {
      key: "best",
      label: "Full wedding-ready",
      recommendationIds: ["rec-vollure", "rec-sculptra", "rec-ultherapy", "rec-botox", "rec-skinvive"],
      narrative:
        "Everything matching: folds and volume (Vollure + Sculptra), a jawline lift (Ultherapy), upper-face balance (Botox), and a skin-quality glow for the photos (SKINVIVE).",
      timelineFit: "Sequenced across ~5 visits so every result peaks for the wedding.",
      price: { min: 5500, max: 8200, display: "$5,500–$8,200", note: "illustrative" },
    },
  ],

  // --- Optional source-linking — real quotes from her transcript -----------
  segments: [
    { id: "t1", speaker: "Patient", text: "My daughter's wedding is in October, so I'm trying to get everything looking good before that." },
    { id: "t2", speaker: "Provider", text: "We can get the Juvederm Vollure done first for these folds, let that settle." },
    { id: "t3", speaker: "Provider", text: "We could look at Sculptra for some gradual collagen building in the cheeks leading up to October." },
    { id: "t4", speaker: "Provider", text: "I want everything to kinda match the whole whole thing." },
    { id: "t5", speaker: "Patient", text: "And I was wondering too — when I come back, then maybe you could do a little bit on my lips." },
    { id: "t6", speaker: "Provider", text: "I'm intrigued by Ultherapy PRIME too." },
  ],
};
