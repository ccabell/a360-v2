import type { ScribeFixture } from "../types";

// Sofia Reyes — 38F, established Alle member. Treatment visit:
// Botox touch-up (forehead/glabella + lateral canthus) + full-face microneedling
// with topical PDGF. Deterministic demo fixture with line-level source linking.

export const sofiaReyes: ScribeFixture = {
  patientId: "3f7bfaf1-b60a-4afd-ae8b-1e82244a2180",
  patientName: "Sofia Reyes",
  visitType: "Treatment Visit",
  visitDate: "2026-06-22",
  provider: "Dr. Marin, NP",
  location: "Orange Twist — Newport Beach",
  segments: [
    { id: "t1", t: "00:04", speaker: "Provider", text: "Good to see you back, Sofia. It's been about ten weeks since your last full Botox — how's everything settling?" },
    { id: "t2", t: "00:11", speaker: "Patient", text: "Good! The forehead is still smooth but I'm starting to see the elevenses come back when I concentrate, and the crow's feet on the right side feel a little stronger than the left." },
    { id: "t3", t: "00:25", speaker: "Provider", text: "That's right on schedule for a touch-up. Any headaches, heaviness, or drooping last round?" },
    { id: "t4", t: "00:31", speaker: "Patient", text: "No heaviness at all this time. Last year one side felt a bit heavy but not this round." },
    { id: "t5", t: "00:40", speaker: "Provider", text: "Perfect. Let's do a light touch-up to the glabella and balance the lateral canthal lines, and then move into the microneedling we planned for your texture and the melasma." },
    { id: "t6", t: "00:52", speaker: "Patient", text: "Yes — the texture on my cheeks is really what's bothering me, and the brown patches near my temples." },
    { id: "t7", t: "01:03", speaker: "Provider", text: "We'll do full-face microneedling with a topical growth-factor serum. It helps texture and supports the melasma alongside your home tret routine. Still on the progestin pill?" },
    { id: "t8", t: "01:14", speaker: "Patient", text: "Still on it, yeah. And still using the tretinoin three nights a week." },
    { id: "t9", t: "01:22", speaker: "Provider", text: "Great. Quick safety check — no new medications, no antibiotics, not pregnant or trying?" },
    { id: "t10", t: "01:29", speaker: "Patient", text: "None of those, and not pregnant." },
    { id: "t11", t: "01:35", speaker: "Provider", text: "Okay. For today: 12 units of Botox total — glabella and a touch to the forehead, plus the lateral canthal lines bilaterally, weighting the right slightly. Then microneedling at 1.5mm with the PDGF serum." },
    { id: "t12", t: "01:50", speaker: "Patient", text: "Sounds good. Will I be red after?" },
    { id: "t13", t: "01:54", speaker: "Provider", text: "Some redness like a mild sunburn for 24 hours, occasionally light pinpoint bruising. I'll send you with bruise cream and you'll avoid actives and sun for two days." },
    { id: "t14", t: "02:09", speaker: "Provider", text: "Injecting now… glabella, forehead, and the canthal lines. You're doing great." },
    { id: "t15", t: "02:30", speaker: "Provider", text: "And microneedling pass one, full face, into the cheeks and temples where the pigment sits." },
    { id: "t16", t: "02:48", speaker: "Patient", text: "That's totally tolerable. Honestly easier than I expected." },
    { id: "t17", t: "02:55", speaker: "Provider", text: "All done. Applying the growth-factor serum and bruise cream now. Hold off on makeup until tomorrow, no gym tonight, and tret can restart in two nights." },
    { id: "t18", t: "03:10", speaker: "Patient", text: "Got it. When should I come back for the full Botox?" },
    { id: "t19", t: "03:15", speaker: "Provider", text: "Let's get you on the books for a full neuromodulator treatment in about four weeks, and we'll plan microneedling number two six weeks after that. You'll have Alle points waiting." },
    { id: "t20", t: "03:27", speaker: "Patient", text: "Perfect, let's book it." },
  ],
  records: {
    soap: {
      type: "soap",
      title: "SOAP Note",
      subtitle: "Chart-ready clinical note",
      sections: [
        {
          id: "s",
          heading: "Subjective",
          lines: [
            { text: "38-year-old established patient presents ~10 weeks after full-face neuromodulator treatment for maintenance.", sources: ["t1", "t2"] },
            { text: "Reports return of dynamic glabellar lines with concentration and asymmetric lateral canthal lines, stronger on the right.", sources: ["t2"], strong: true },
            { text: "Denies heaviness, ptosis, or headache following the prior cycle.", sources: ["t3", "t4"] },
            { text: "Primary aesthetic concern today is midface skin texture and temporal melasma.", sources: ["t6"], strong: true },
            { text: "Maintains home tretinoin 3 nights/week; currently on a progestin-based oral contraceptive.", sources: ["t7", "t8"] },
          ],
        },
        {
          id: "o",
          heading: "Objective",
          lines: [
            { text: "Safety screen negative: no new medications or antibiotics, not pregnant or trying to conceive.", sources: ["t9", "t10"] },
            { text: "Dynamic rhytides noted at glabella and bilateral lateral canthi, right > left.", sources: ["t2", "t11"] },
            { text: "Diffuse midface textural irregularity with patchy temporal hyperpigmentation consistent with melasma.", sources: ["t6"] },
          ],
        },
        {
          id: "a",
          heading: "Assessment",
          lines: [
            { text: "Glabellar and lateral canthal dynamic rhytides, due for maintenance touch-up.", sources: ["t5", "t11"], strong: true },
            { text: "Mild-to-moderate facial dyschromia/melasma with associated textural concern, hormonally influenced.", sources: ["t6", "t7"] },
            { text: "Good candidate for combined neuromodulator touch-up and collagen-induction therapy.", sources: ["t5", "t7"] },
          ],
        },
        {
          id: "p",
          heading: "Plan",
          lines: [
            { text: "Administered 12 units onabotulinumtoxinA — glabella and forehead with bilateral lateral canthi, right-weighted.", sources: ["t11", "t14"], strong: true },
            { text: "Full-face microneedling at 1.5mm with topical PDGF growth-factor serum, emphasizing cheeks and temples.", sources: ["t11", "t15"], strong: true },
            { text: "Post-care: bruise cream dispensed, hold actives and sun 48h, resume tretinoin in 2 nights, no exercise this evening.", sources: ["t13", "t17"] },
            { text: "Return in ~4 weeks for full neuromodulator treatment; microneedling session two ~6 weeks thereafter.", sources: ["t19"] },
          ],
        },
      ],
    },
    procedure: {
      type: "procedure",
      title: "Cosmetic Procedure Note",
      subtitle: "Injection map · units · product",
      sections: [
        {
          id: "neuro",
          heading: "Neuromodulator — onabotulinumtoxinA (12 units total)",
          lines: [
            { text: "Glabella (procerus/corrugators): 5 units", sources: ["t11"], strong: true },
            { text: "Forehead (frontalis), conservative touch-up: 3 units", sources: ["t11"] },
            { text: "Lateral canthal lines — right: 2.5 units", sources: ["t2", "t11"], strong: true },
            { text: "Lateral canthal lines — left: 1.5 units", sources: ["t11"] },
            { text: "Technique: standard dilution, 31G, intramuscular. Reconstitution and lot recorded in MAR. Tolerated well, no immediate adverse event.", sources: ["t14", "t16"] },
          ],
        },
        {
          id: "mn",
          heading: "Microneedling — full face",
          lines: [
            { text: "Depth 1.5mm, single pass, full face with added attention to cheeks and bilateral temples.", sources: ["t11", "t15"], strong: true },
            { text: "Topical: platelet-derived growth-factor (PDGF) serum applied intra- and post-procedure.", sources: ["t7", "t17"] },
            { text: "Immediate post-procedure erythema, mild, expected. Bruise cream applied.", sources: ["t13", "t17"] },
          ],
        },
        {
          id: "consent",
          heading: "Consent & Safety",
          lines: [
            { text: "Risks/benefits/alternatives reviewed; verbal and written consent on file.", sources: ["t13"] },
            { text: "Pre-procedure screen negative for pregnancy, active infection, antibiotics, new medications.", sources: ["t9", "t10"] },
          ],
        },
      ],
    },
    patient_summary: {
      type: "patient_summary",
      title: "Patient After-Visit Summary",
      subtitle: "Plain-language · take-home",
      sections: [
        {
          id: "today",
          heading: "What we did today",
          lines: [
            { text: "We smoothed the lines between your brows and around your eyes with a small Botox touch-up (12 units).", sources: ["t11"] },
            { text: "We did full-face microneedling with a growth-factor serum to improve texture and the brown patches near your temples.", sources: ["t15", "t7"] },
          ],
        },
        {
          id: "care",
          heading: "How to care for your skin",
          lines: [
            { text: "Some redness like a light sunburn for about a day is normal. A little pinpoint bruising can happen.", sources: ["t13"] },
            { text: "No makeup until tomorrow, and skip the gym tonight.", sources: ["t17"] },
            { text: "Avoid strong actives and direct sun for 48 hours, then restart your tretinoin after two nights.", sources: ["t13", "t17"] },
            { text: "Use the bruise cream we sent home as needed.", sources: ["t13"] },
          ],
        },
        {
          id: "next",
          heading: "Your next visits",
          lines: [
            { text: "Full Botox treatment in about 4 weeks.", sources: ["t19"] },
            { text: "Second microneedling session about 6 weeks after that.", sources: ["t19"] },
            { text: "Your Alle rewards points will be waiting when you book.", sources: ["t19"] },
          ],
        },
      ],
    },
    referral: {
      type: "referral",
      title: "Provider Letter",
      subtitle: "Continuity / referring provider",
      sections: [
        {
          id: "body",
          heading: "Re: Sofia Reyes — aesthetic treatment update",
          lines: [
            { text: "Dear Colleague,", sources: [] },
            { text: "Ms. Reyes is an established patient under maintenance neuromodulator therapy who presented for a scheduled touch-up and collagen-induction treatment.", sources: ["t1", "t5"] },
            { text: "Given her melasma is hormonally influenced and she remains on a progestin-based oral contraceptive, we are coordinating topical management and would welcome your input on contraceptive options if pigmentation proves refractory.", sources: ["t7", "t8"], strong: true },
            { text: "Today she received 12 units of onabotulinumtoxinA and full-face microneedling with a growth-factor serum. She tolerated treatment well with no adverse events.", sources: ["t11", "t16"] },
            { text: "Please reach out with any questions. Warm regards, Dr. Marin, NP — Orange Twist, Newport Beach.", sources: [] },
          ],
        },
      ],
    },
    coding: {
      type: "coding",
      title: "Coding & Opportunities",
      subtitle: "Suggested codes · revenue opportunities",
      sections: [
        {
          id: "codes",
          heading: "Suggested codes",
          codes: [
            { code: "64612", system: "CPT", label: "Chemodenervation, facial muscle(s)", sources: ["t11", "t14"] },
            { code: "J0585", system: "HCPCS", label: "OnabotulinumtoxinA, per unit ×12", sources: ["t11"] },
            { code: "L57.0", system: "ICD-10", label: "Actinic / photoaging skin changes", sources: ["t6"] },
            { code: "L81.1", system: "ICD-10", label: "Chloasma / melasma", sources: ["t6", "t7"] },
          ],
        },
        {
          id: "opps",
          heading: "Revenue opportunities",
          opportunities: [
            { title: "Full neuromodulator retreatment", rationale: "Touch-up today; full cycle due in ~4 weeks. Pre-book to protect the cadence.", horizon: "next_visit", value: "~$540", sources: ["t19"] },
            { title: "Microneedling series (3)", rationale: "Texture + melasma respond to a series; session two already discussed.", horizon: "next_visit", value: "~$1,200", sources: ["t15", "t19"] },
            { title: "Pigment-targeted topical regimen", rationale: "Hormonally-influenced melasma — adjunctive brightening system supports results between visits.", horizon: "today", value: "~$180", sources: ["t6", "t7"] },
            { title: "Alle loyalty re-engagement", rationale: "Active Alle member with points available; surface at checkout.", horizon: "today", sources: ["t19"] },
          ],
        },
      ],
    },
  },
};
