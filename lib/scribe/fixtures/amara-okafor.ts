import type { ScribeFixture } from "../types";

// Amara Okafor — 40F, new-patient aesthetic consultation. Interested in Dysport,
// Restylane Kysse (lips), tear-trough filler, and Halo laser. History of prior
// "Botox didn't work" and filler migration elsewhere. Consultation only — no
// procedure performed today. Deterministic demo fixture with source linking.

export const amaraOkafor: ScribeFixture = {
  patientId: "0c6053d5-6851-4542-898e-9e8f4a6efc53",
  patientName: "Amara Okafor",
  visitType: "Initial Consultation",
  visitDate: "2026-06-22",
  provider: "Dr. Marin, NP",
  location: "Orange Twist — Newport Beach",
  segments: [
    { id: "t1", t: "00:03", speaker: "Provider", text: "Welcome in, Amara. Tell me what brought you to Orange Twist today and what you're hoping to change." },
    { id: "t2", t: "00:12", speaker: "Patient", text: "I've had Botox before but honestly it never really worked for me — my forehead lines came right back. And I had lip filler somewhere else that migrated above my lip line." },
    { id: "t3", t: "00:27", speaker: "Provider", text: "That's helpful to know. When Botox 'doesn't work,' it's often underdosing or product spread — we can dose differently. And migration usually means it was placed too superficially or over-filled." },
    { id: "t4", t: "00:41", speaker: "Patient", text: "Okay, that's reassuring. I want my forehead and the lines between my brows softened, and I'd love fuller but natural lips. I also have darkness under my eyes." },
    { id: "t5", t: "00:55", speaker: "Provider", text: "For the forehead and elevenses I'd suggest Dysport — it diffuses a little more evenly and patients who feel Botox 'wore off' often do better on it. We'll dose to your muscle strength." },
    { id: "t6", t: "01:08", speaker: "Patient", text: "And the lips? I'm nervous after last time." },
    { id: "t7", t: "01:13", speaker: "Provider", text: "Restylane Kysse, placed conservatively — half a syringe to start, in the body of the lip, not the border. Natural, and we avoid the migration you had." },
    { id: "t8", t: "01:26", speaker: "Patient", text: "Half a syringe sounds safer. What about under my eyes?" },
    { id: "t9", t: "01:33", speaker: "Provider", text: "Tear troughs are nuanced. With your pigment and the hollowing, I'd want a conservative tear-trough filler — but only after we see how you respond to the lips. We don't do everything at once." },
    { id: "t10", t: "01:48", speaker: "Patient", text: "I appreciate that. Someone mentioned a laser for my skin tone too?" },
    { id: "t11", t: "01:55", speaker: "Provider", text: "Halo is a great option for tone and texture, but it needs sun precautions and downtime. I'd sequence that for fall, away from summer sun, and after we've addressed the lines and lips." },
    { id: "t12", t: "02:10", speaker: "Patient", text: "That makes sense. Sorry — I've had a hard few weeks, I lost my mother recently, so I'm a little emotional today." },
    { id: "t13", t: "02:19", speaker: "Provider", text: "I'm so sorry, Amara. There's no rush at all. We can start small — just the Dysport — and you decide the rest when you're ready. Take whatever time you need." },
    { id: "t14", t: "02:33", speaker: "Patient", text: "Thank you. I think I'd like to start with the Dysport and think about the lips." },
    { id: "t15", t: "02:41", speaker: "Provider", text: "Perfect. We'll book the Dysport, hold the Kysse as a planned next step, and revisit tear trough and Halo down the line. No pressure on timing." },
    { id: "t16", t: "02:52", speaker: "Patient", text: "That sounds really good. Thank you for being patient with me." },
  ],
  records: {
    soap: {
      type: "soap",
      title: "SOAP Note",
      subtitle: "Consultation note",
      sections: [
        {
          id: "s",
          heading: "Subjective",
          lines: [
            { text: "40-year-old new aesthetic patient presents for consultation regarding facial lines, lip enhancement, and periorbital concerns.", sources: ["t1", "t4"] },
            { text: "Reports prior neuromodulator with perceived lack of efficacy and prior lip filler elsewhere with superior migration above the vermillion border.", sources: ["t2"], strong: true },
            { text: "Goals: softened forehead and glabellar lines, natural lip fullness, and improvement of periorbital darkness/hollowing.", sources: ["t4"], strong: true },
            { text: "Patient disclosed recent bereavement (loss of mother) and emotional vulnerability; expressed hesitancy after prior outcomes.", sources: ["t12"], strong: true },
          ],
        },
        {
          id: "o",
          heading: "Objective",
          lines: [
            { text: "Dynamic forehead and glabellar rhytides on animation.", sources: ["t4", "t5"] },
            { text: "Lips with adequate projection; prior product noted superior to the border consistent with reported migration.", sources: ["t2", "t7"] },
            { text: "Periorbital hollowing with associated pigmentation; suitable for staged tear-trough assessment.", sources: ["t8", "t9"] },
          ],
        },
        {
          id: "a",
          heading: "Assessment",
          lines: [
            { text: "Candidate for neuromodulator with revised dosing strategy; prior 'non-response' likely underdosing or diffusion.", sources: ["t3", "t5"], strong: true },
            { text: "Lip enhancement candidate — conservative, body-of-lip technique to avoid prior migration.", sources: ["t7"] },
            { text: "Tear-trough and resurfacing (Halo) appropriate but should be sequenced, not concurrent.", sources: ["t9", "t11"] },
            { text: "Heightened psychosocial sensitivity today; phased, low-pressure plan indicated.", sources: ["t12", "t13"], strong: true },
          ],
        },
        {
          id: "p",
          heading: "Plan",
          lines: [
            { text: "Phase 1: Dysport to forehead and glabella, dosed to muscle strength. Booked.", sources: ["t5", "t14", "t15"], strong: true },
            { text: "Phase 2 (planned): Restylane Kysse 0.5 syringe, conservative lip body placement.", sources: ["t7", "t15"] },
            { text: "Phase 3 (future): reassess tear-trough filler after lip response.", sources: ["t9", "t15"] },
            { text: "Phase 4 (fall): Halo resurfacing with sun precautions and downtime counseling.", sources: ["t11"] },
            { text: "No pressure on timing given current circumstances; patient to drive pace.", sources: ["t13", "t15"] },
          ],
        },
      ],
    },
    procedure: {
      type: "procedure",
      title: "Proposed Treatment Plan",
      subtitle: "Planned — not performed today",
      sections: [
        {
          id: "phase1",
          heading: "Phase 1 — Dysport (booked)",
          lines: [
            { text: "Forehead (frontalis) + glabella (procerus/corrugators), dosed to muscle strength.", sources: ["t5"], strong: true },
            { text: "Rationale: prior perceived non-response addressed with product choice and dosing.", sources: ["t3", "t5"] },
          ],
        },
        {
          id: "phase2",
          heading: "Phase 2 — Restylane Kysse lips (planned)",
          lines: [
            { text: "0.5 syringe, conservative, body of the lip — avoid vermillion border to prevent migration.", sources: ["t7"], strong: true },
          ],
        },
        {
          id: "phase34",
          heading: "Phase 3–4 — Tear trough & Halo (future)",
          lines: [
            { text: "Tear-trough filler reassessed only after lip response.", sources: ["t9"] },
            { text: "Halo resurfacing sequenced for fall with sun precautions.", sources: ["t11"] },
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
          id: "talked",
          heading: "What we talked about",
          lines: [
            { text: "We made a step-by-step plan so you're never doing too much at once.", sources: ["t9", "t15"] },
            { text: "We'll start with Dysport to soften your forehead and frown lines. It's chosen specifically because Botox felt like it didn't last for you before.", sources: ["t5", "t14"] },
            { text: "When you're ready, a small amount of lip filler placed carefully to look natural and avoid what happened last time.", sources: ["t7"] },
          ],
        },
        {
          id: "later",
          heading: "For later, no rush",
          lines: [
            { text: "Under-eye filler is something we'll look at only after your lips settle.", sources: ["t9"] },
            { text: "A Halo laser for your skin tone is best in the fall, away from summer sun.", sources: ["t11"] },
            { text: "You set the pace — there is no pressure on timing.", sources: ["t13"] },
          ],
        },
      ],
    },
    referral: {
      type: "referral",
      title: "Provider Letter",
      subtitle: "Continuity summary",
      sections: [
        {
          id: "body",
          heading: "Re: Amara Okafor — new patient aesthetic consultation",
          lines: [
            { text: "Dear Colleague,", sources: [] },
            { text: "Ms. Okafor presented for an initial aesthetic consultation with goals of dynamic-line softening, conservative lip enhancement, and periorbital improvement.", sources: ["t1", "t4"] },
            { text: "Of note, she is recently bereaved and emotionally vulnerable; we have intentionally adopted a phased, low-pressure plan beginning with neuromodulator only.", sources: ["t12", "t13"], strong: true },
            { text: "No procedure was performed today. Dysport is booked; lip filler is planned as a conservative next step; tear-trough and resurfacing are sequenced for the future.", sources: ["t14", "t15"] },
            { text: "Warm regards, Dr. Marin, NP — Orange Twist, Newport Beach.", sources: [] },
          ],
        },
      ],
    },
    coding: {
      type: "coding",
      title: "Coding & Opportunities",
      subtitle: "Consultation · pipeline value",
      sections: [
        {
          id: "codes",
          heading: "Suggested codes",
          codes: [
            { code: "99203", system: "E&M", label: "New patient consultation, moderate complexity", sources: ["t1"] },
            { code: "Z41.1", system: "ICD-10", label: "Encounter for cosmetic procedure", sources: ["t1", "t4"] },
          ],
        },
        {
          id: "opps",
          heading: "Pipeline opportunities (extracted)",
          opportunities: [
            { title: "Dysport — forehead & glabella", rationale: "Booked today. Primary conversion.", horizon: "next_visit", value: "~$420", sources: ["t14", "t15"] },
            { title: "Restylane Kysse — lip enhancement", rationale: "Planned next phase; conservative 0.5 syringe.", horizon: "next_visit", value: "~$650", sources: ["t7", "t15"] },
            { title: "Tear-trough filler", rationale: "Sequenced after lip response — keep on the plan and follow up.", horizon: "future", value: "~$800", sources: ["t9"] },
            { title: "Halo resurfacing (fall)", rationale: "Tone/texture goal; schedule away from summer sun.", horizon: "future", value: "~$1,500", sources: ["t11"] },
          ],
        },
      ],
    },
  },
  styleNotes: {
    aesthetic_consult: {
      type: "aesthetic_consult",
      title: "Aesthetic Consult Note",
      subtitle: "New patient · phased plan",
      sections: [
        {
          id: "concern",
          heading: "Chief Concern",
          required: true,
          lines: [{ text: "New patient seeking softening of facial lines, natural lip enhancement, and improvement of periorbital darkness.", sources: ["t1", "t4"], strong: true }],
        },
        {
          id: "goals",
          heading: "Aesthetic Goals",
          required: true,
          lines: [{ text: "Softer forehead and frown lines, natural lip fullness, brighter under-eye area.", sources: ["t4"] }],
        },
        {
          id: "history",
          heading: "Relevant Medical History",
          notDocumented: true,
        },
        {
          id: "prior",
          heading: "Prior Aesthetic Treatments",
          lines: [{ text: "Prior neuromodulator with perceived non-response; prior lip filler elsewhere with migration above the vermilion border.", sources: ["t2"], strong: true }],
        },
        {
          id: "assessment",
          heading: "Facial / Skin Assessment",
          required: true,
          lines: [
            { text: "Dynamic forehead and glabellar rhytides; lips with prior product superior to the border; periorbital hollowing with pigmentation.", sources: ["t4", "t5", "t8"] },
          ],
        },
        {
          id: "risk",
          heading: "Contraindications / Risk Screening",
          required: true,
          lines: [
            { text: "Discussed migration risk and a conservative, staged approach; heightened psychosocial sensitivity noted (recent bereavement).", sources: ["t7", "t12", "t13"], strong: true },
          ],
        },
        {
          id: "plan",
          heading: "Recommended Treatment Plan",
          required: true,
          lines: [
            { text: "Phase 1: Dysport to forehead/glabella, dosed to muscle strength (booked).", sources: ["t5", "t14"], strong: true },
            { text: "Phase 2: Restylane Kysse 0.5 syringe, conservative lip body placement (planned).", sources: ["t7"] },
            { text: "Phase 3–4: reassess tear-trough filler after lip response; Halo resurfacing in fall.", sources: ["t9", "t11"] },
            { text: "Baseline standardized photography recommended before Phase 1 — AI suggestion, verify.", inferred: true },
          ],
        },
        {
          id: "alternatives",
          heading: "Alternatives Discussed",
          lines: [{ text: "Conservative staging vs. concurrent treatment; tear trough deferred until lip response assessed.", sources: ["t9", "t15"] }],
        },
        {
          id: "consent",
          heading: "Consent / Education",
          required: true,
          lines: [{ text: "Education provided on products, sequencing, and expectations; procedural consent pending at time of each booked treatment (no procedure performed today).", sources: ["t13", "t15"], strong: true }],
        },
        {
          id: "followup",
          heading: "Follow-Up Plan",
          lines: [{ text: "Patient-led pace; Dysport booked, remaining phases revisited at follow-up.", sources: ["t13", "t15"] }],
        },
      ],
    },
  },
};
