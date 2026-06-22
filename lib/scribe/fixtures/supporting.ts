import type { ScribeFixture } from "../types";

// Supporting demo patients — cached SOAP notes so the default demo path works
// for every patient in the picker with no live API dependency. Grounded in each
// patient's real (synthetic) consultation. Specialty styles for these patients
// fall back to live generation.

export const danielleBrooks: ScribeFixture = {
  patientId: "a9094b49-1395-42a9-bb33-f3168d087d19",
  patientName: "Danielle Brooks",
  visitType: "Consultation",
  visitDate: "2026-06-22",
  provider: "Dr. Marin, NP",
  location: "Orange Twist — Newport Beach",
  segments: [
    { id: "t1", t: "00:05", speaker: "Provider", text: "Welcome in, Danielle. What's bringing you to Orange Twist today?" },
    { id: "t2", t: "00:12", speaker: "Patient", text: "My lower face feels deflated and I'm starting to see some jowling. I want to look refreshed, not overdone." },
    { id: "t3", t: "00:24", speaker: "Provider", text: "On exam there's volume loss in the midface and along the lower face. A hyaluronic-acid filler restores that support." },
    { id: "t4", t: "00:36", speaker: "Provider", text: "I'd suggest Versa, placed conservatively to restore your native volume — we're not chasing lines, we're rebuilding structure." },
    { id: "t5", t: "00:47", speaker: "Patient", text: "I'm a little nervous about being overfilled." },
    { id: "t6", t: "00:52", speaker: "Provider", text: "Understood — conservative endpoint. I reviewed the risks: bruising, swelling, and the rare vascular risk we screen carefully for." },
    { id: "t7", t: "01:05", speaker: "Patient", text: "I'd also love lip filler and maybe threading down the line." },
    { id: "t8", t: "01:12", speaker: "Provider", text: "Let's sequence it — start with the lower-face filler, then revisit lips and threads at a later visit." },
    { id: "t9", t: "01:22", speaker: "Patient", text: "That sounds good. Let's book the Versa for next time." },
  ],
  records: {
    soap: {
      type: "soap",
      title: "SOAP Note",
      subtitle: "Consultation note",
      sections: [
        {
          id: "subjective",
          heading: "Subjective",
          required: true,
          lines: [
            { text: "Consultation patient reports lower-face deflation and early jowling; goal is a refreshed, natural result.", sources: ["t2"], strong: true },
            { text: "Expresses interest in future lip filler and threading; nervous about overfilling.", sources: ["t5", "t7"] },
          ],
        },
        {
          id: "objective",
          heading: "Objective",
          required: true,
          lines: [{ text: "Midface and lower-face volume loss with early jowl formation on exam.", sources: ["t3"] }],
        },
        {
          id: "assessment",
          heading: "Assessment",
          required: true,
          lines: [{ text: "Candidate for conservative HA filler (Versa) for lower-face volume restoration.", sources: ["t4"], strong: true }],
        },
        {
          id: "plan",
          heading: "Plan",
          required: true,
          lines: [
            { text: "Plan Versa filler at a future visit, conservative endpoint to restore native volume.", sources: ["t4", "t9"], strong: true },
            { text: "Risks reviewed (bruising, swelling, vascular). Lip filler and threading sequenced for later visits.", sources: ["t6", "t8"] },
            { text: "Baseline standardized photography recommended before treatment — AI suggestion, verify.", inferred: true },
          ],
        },
        {
          id: "followup",
          heading: "Follow-Up",
          lines: [{ text: "Patient to book Versa at next appointment.", sources: ["t9"] }],
        },
      ],
    },
  },
};

export const katherineChen: ScribeFixture = {
  patientId: "5dbf9db0-2931-4629-8a20-3b9243b89d90",
  patientName: "Katherine Chen",
  visitType: "Treatment Visit",
  visitDate: "2026-06-22",
  provider: "Dr. Marin, NP",
  location: "Orange Twist — Newport Beach",
  segments: [
    { id: "t1", t: "00:04", speaker: "Provider", text: "Good to see you back for your full neuromodulator, Katherine. How's everything looking to you?" },
    { id: "t2", t: "00:12", speaker: "Patient", text: "The forehead and the elevenses are back, and the crow's feet. I'd also love a subtle lip flip this time." },
    { id: "t3", t: "00:24", speaker: "Provider", text: "We'll do full upper-face — forehead, glabella, crow's feet — a touch of brow lift and the depressor, plus a conservative lip flip." },
    { id: "t4", t: "00:40", speaker: "Provider", text: "Injecting now: frontalis, glabella, lateral canthi, brow, one unit to the DAO, and four units total for the lip flip." },
    { id: "t5", t: "00:58", speaker: "Patient", text: "That was easy, tolerated it fine." },
    { id: "t6", t: "01:05", speaker: "Provider", text: "Sending you with bruise gel and a lip balm. No exercise tonight, stay upright for four hours, no makeup until tomorrow." },
    { id: "t7", t: "01:18", speaker: "Provider", text: "Let's rebook your maintenance for about three to four months out." },
  ],
  records: {
    soap: {
      type: "soap",
      title: "SOAP Note",
      subtitle: "Treatment note",
      sections: [
        {
          id: "subjective",
          heading: "Subjective",
          required: true,
          lines: [{ text: "Established patient for neuromodulator maintenance; wants forehead, glabellar, and crow's-feet softening plus a subtle lip flip.", sources: ["t2"], strong: true }],
        },
        {
          id: "objective",
          heading: "Objective",
          required: true,
          lines: [{ text: "Dynamic upper-face rhytides; suitable candidate for lip flip.", sources: ["t2", "t3"] }],
        },
        {
          id: "assessment",
          heading: "Assessment",
          required: true,
          lines: [{ text: "Full-face neuromodulator maintenance with conservative lip flip.", sources: ["t3"], strong: true }],
        },
        {
          id: "plan",
          heading: "Plan",
          required: true,
          lines: [
            { text: "Administered onabotulinumtoxinA — frontalis, glabella, lateral canthi, brow, DAO 1 unit, and lip flip 4 units total.", sources: ["t4"], strong: true },
            { text: "Bruise gel and lip balm dispensed; aftercare reviewed (no exercise tonight, upright 4h, no makeup until tomorrow).", sources: ["t6"] },
          ],
        },
        {
          id: "followup",
          heading: "Follow-Up",
          lines: [{ text: "Rebook maintenance in ~3–4 months.", sources: ["t7"] }],
        },
      ],
    },
  },
};

export const jessicaNavarro: ScribeFixture = {
  patientId: "cdcdcf89-5cca-4251-9355-66c84d8d6b24",
  patientName: "Jessica Navarro",
  visitType: "Follow-up",
  visitDate: "2026-06-22",
  provider: "Dr. Marin, NP",
  location: "Orange Twist — Newport Beach",
  segments: [
    { id: "t1", t: "00:05", speaker: "Provider", text: "Following up on your lip flip, Jessica — how are the lips feeling?" },
    { id: "t2", t: "00:11", speaker: "Patient", text: "I love the flip, but honestly I want a bit more volume now." },
    { id: "t3", t: "00:20", speaker: "Provider", text: "Your lips took the flip nicely. A conservative half-syringe of HA — Restylane Kysse or Revanesse — would add the volume at your next visit." },
    { id: "t4", t: "00:33", speaker: "Provider", text: "Did you want to add a little forehead neuromodulator today?" },
    { id: "t5", t: "00:38", speaker: "Patient", text: "I'm still hesitant on the forehead — let's hold off for now." },
    { id: "t6", t: "00:46", speaker: "Patient", text: "I am curious about lip blushing at some point too." },
    { id: "t7", t: "00:52", speaker: "Provider", text: "Let's sequence it — lip filler first, then lip blushing a month or more afterward. Book the filler online when you're ready." },
  ],
  records: {
    soap: {
      type: "soap",
      title: "SOAP Note",
      subtitle: "Follow-up note",
      sections: [
        {
          id: "subjective",
          heading: "Subjective",
          required: true,
          lines: [
            { text: "Follow-up after lip flip; pleased with result but requests additional lip volume.", sources: ["t2"], strong: true },
            { text: "Hesitant about forehead neuromodulator today; interested in lip blushing in the future.", sources: ["t5", "t6"] },
          ],
        },
        {
          id: "objective",
          heading: "Objective",
          required: true,
          lines: [{ text: "Good lip-flip result; lips are a candidate for conservative HA augmentation.", sources: ["t3"] }],
        },
        {
          id: "assessment",
          heading: "Assessment",
          required: true,
          lines: [{ text: "Lip enhancement candidate; forehead treatment deferred per patient preference.", sources: ["t3", "t5"], strong: true }],
        },
        {
          id: "plan",
          heading: "Plan",
          required: true,
          lines: [
            { text: "Plan half-syringe HA lip filler (Restylane Kysse or Revanesse) at next visit.", sources: ["t3"], strong: true },
            { text: "Forehead neuromodulator deferred. Lip blushing sequenced ~1 month after filler.", sources: ["t5", "t7"] },
          ],
        },
        {
          id: "followup",
          heading: "Follow-Up",
          lines: [{ text: "Patient to book lip filler online.", sources: ["t7"] }],
        },
      ],
    },
  },
};
