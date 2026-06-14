import type {
  ResolvedFuelDoc,
  CombinationContent,
  ProductContent,
  ConcernContent,
  SopFields,
  PreferenceFields,
} from "@/lib/types/fuel-docs";

// --- Helpers ---

function renderBulletList(items: string[]): string {
  if (!items || items.length === 0) return "";
  return items.map((item) => `- ${item}`).join("\n") + "\n";
}

function renderFaqList(faqs: Array<{ question: string; answer: string }>): string {
  if (!faqs || faqs.length === 0) return "";
  return faqs
    .map((faq) => `**Q: ${faq.question}**\n${faq.answer}`)
    .join("\n\n") + "\n";
}

// --- Combination renderer ---

function renderCombination(name: string, c: CombinationContent): string {
  const lines: string[] = [];

  lines.push(`# ${name}`);
  if (c.one_line_positioning) lines.push(`> ${c.one_line_positioning}`);
  lines.push("");

  // Identity
  const identityLines: string[] = [];
  if (c.patient_facing_name) identityLines.push(`- Patient-facing name: ${c.patient_facing_name}`);
  if (c.package_goal) identityLines.push(`- Package goal: ${c.package_goal}`);
  if (c.ideal_candidate) identityLines.push(`- Ideal candidate: ${c.ideal_candidate}`);
  if (c.not_ideal_candidate) identityLines.push(`- Not ideal for: ${c.not_ideal_candidate}`);
  if (identityLines.length > 0) {
    lines.push("## Identity");
    lines.push(...identityLines);
    lines.push("");
  }

  // Why Together
  const whyLines: string[] = [];
  if (c.why_together) whyLines.push(c.why_together);
  if (c.a_solves) whyLines.push(`- Product A solves: ${c.a_solves}`);
  if (c.a_does_not_solve) whyLines.push(`- Product A does not solve: ${c.a_does_not_solve}`);
  if (c.b_adds) whyLines.push(`- Product B adds: ${c.b_adds}`);
  if (whyLines.length > 0) {
    lines.push("## Why Together");
    lines.push(...whyLines);
    if (c.clinical_rationale) {
      lines.push("");
      lines.push("### Clinical Rationale");
      lines.push(c.clinical_rationale);
    }
    lines.push("");
  }

  // What to Say
  const sayLines: string[] = [];
  if (c.patient_education_summary) sayLines.push(["### Patient Education", c.patient_education_summary].join("\n"));
  if (c.staff_close) sayLines.push(["### Staff Close", c.staff_close].join("\n"));
  if (c.staff_talking_points) sayLines.push(["### Talking Points", c.staff_talking_points].join("\n"));
  if (sayLines.length > 0) {
    lines.push("## What to Say");
    lines.push(...sayLines);
    lines.push("");
  }

  // What Not to Say
  const dnsUniversal = renderBulletList(c.do_not_say?.universal ?? []);
  const dnsPairSpecific = renderBulletList(c.do_not_say?.pair_specific ?? []);
  if (dnsUniversal || dnsPairSpecific) {
    lines.push("## What Not to Say");
    if (dnsUniversal) {
      lines.push("### Universal");
      lines.push(dnsUniversal.trimEnd());
    }
    if (dnsPairSpecific) {
      lines.push("### Pair-Specific");
      lines.push(dnsPairSpecific.trimEnd());
    }
    lines.push("");
  }

  // Objection Handling
  if (c.top_objections && c.top_objections.length > 0) {
    lines.push("## Objection Handling");
    for (const obj of c.top_objections) {
      if (obj.patient_says) lines.push(`**Patient says:** "${obj.patient_says}"`);
      if (obj.handling_language) lines.push(`**Response:** ${obj.handling_language}`);
      if (obj.do_not_say_in_response) lines.push(`**Do not say:** ${obj.do_not_say_in_response}`);
      lines.push("");
    }
  }

  // Timing & Logistics
  const timingLines: string[] = [];
  if (c.sequencing_note) timingLines.push(`- Sequencing: ${c.sequencing_note}`);
  if (c.timing_note) timingLines.push(`- Timing: ${c.timing_note}`);
  if (c.downtime_note) timingLines.push(`- Downtime: ${c.downtime_note}`);
  if (c.same_session_ok !== null && c.same_session_ok !== undefined) {
    timingLines.push(`- Same session OK: ${c.same_session_ok ? "Yes" : "No"}`);
  }
  if (timingLines.length > 0) {
    lines.push("## Timing & Logistics");
    lines.push(...timingLines);
    lines.push("");
  }

  // Maintenance
  const maintLines: string[] = [];
  if (c.maintenance_story) maintLines.push(c.maintenance_story);
  if (c.rebooking_trigger) maintLines.push(`- Rebooking trigger: ${c.rebooking_trigger}`);
  if (c.next_visit_prompt) maintLines.push(`- Next visit prompt: ${c.next_visit_prompt}`);
  if (maintLines.length > 0) {
    lines.push("## Maintenance");
    lines.push(...maintLines);
    lines.push("");
  }

  // Evidence
  const evidenceLines: string[] = [];
  if (c.evidence_level) evidenceLines.push(`- Level: ${c.evidence_level}`);
  if (c.source_support_summary) evidenceLines.push(`- Summary: ${c.source_support_summary}`);
  if (evidenceLines.length > 0) {
    lines.push("## Evidence");
    lines.push(...evidenceLines);
    lines.push("");
  }

  return lines.join("\n");
}

// --- Product renderer ---

function renderProduct(name: string, c: ProductContent): string {
  const lines: string[] = [];

  lines.push(`# ${name}`);
  lines.push("");

  // Identity
  const identityLines: string[] = [];
  if (c.product_name) identityLines.push(`- Product: ${c.product_name}`);
  if (c.category) identityLines.push(`- Category: ${c.category}`);
  if (c.mechanism_summary) identityLines.push(`- Mechanism: ${c.mechanism_summary}`);
  if (c.patient_explanation) identityLines.push(`- Patient explanation: ${c.patient_explanation}`);
  if (identityLines.length > 0) {
    lines.push("## Identity");
    lines.push(...identityLines);
    lines.push("");
  }

  // Clinical Profile
  const clinicalLines: string[] = [];
  const fdaList = renderBulletList(c.fda_indications ?? []);
  if (fdaList) {
    clinicalLines.push("**FDA Indications:**");
    clinicalLines.push(fdaList.trimEnd());
  }
  const offLabelList = renderBulletList(c.off_label_common ?? []);
  if (offLabelList) {
    clinicalLines.push("**Off-Label Common:**");
    clinicalLines.push(offLabelList.trimEnd());
  }
  const contraindicationsList = renderBulletList(c.contraindications ?? []);
  if (contraindicationsList) {
    clinicalLines.push("**Contraindications:**");
    clinicalLines.push(contraindicationsList.trimEnd());
  }
  if (c.does_not_solve) clinicalLines.push(`**Does not solve:** ${c.does_not_solve}`);
  if (clinicalLines.length > 0) {
    lines.push("## Clinical Profile");
    lines.push(...clinicalLines);
    lines.push("");
  }

  // What to Say
  const talkingList = renderBulletList(c.key_talking_points ?? []);
  const faqContent = renderFaqList(c.patient_faq ?? []);
  if (talkingList || faqContent || c.differentiators) {
    lines.push("## What to Say");
    if (talkingList) {
      lines.push("### Key Talking Points");
      lines.push(talkingList.trimEnd());
    }
    if (faqContent) {
      lines.push("### Patient FAQ");
      lines.push(faqContent.trimEnd());
    }
    if (c.differentiators) {
      lines.push("### Differentiators");
      lines.push(c.differentiators);
    }
    lines.push("");
  }

  // What Not to Say
  const dnsList = renderBulletList(c.do_not_say ?? []);
  const dncList = renderBulletList(c.do_not_claim ?? []);
  if (dnsList || dncList) {
    lines.push("## What Not to Say");
    if (dnsList) {
      lines.push("### Do Not Say");
      lines.push(dnsList.trimEnd());
    }
    if (dncList) {
      lines.push("### Do Not Claim");
      lines.push(dncList.trimEnd());
    }
    lines.push("");
  }

  // Timing
  const timingLines: string[] = [];
  if (c.treatment_cadence) timingLines.push(`- Treatment cadence: ${c.treatment_cadence}`);
  if (c.onset_time) timingLines.push(`- Onset: ${c.onset_time}`);
  if (c.duration) timingLines.push(`- Duration: ${c.duration}`);
  if (c.downtime_summary) timingLines.push(`- Downtime: ${c.downtime_summary}`);
  if (timingLines.length > 0) {
    lines.push("## Timing");
    lines.push(...timingLines);
    lines.push("");
  }

  // Evidence
  const evidenceLines: string[] = [];
  if (c.evidence_level) evidenceLines.push(`- Level: ${c.evidence_level}`);
  if (c.source_support_summary) evidenceLines.push(`- Summary: ${c.source_support_summary}`);
  if (evidenceLines.length > 0) {
    lines.push("## Evidence");
    lines.push(...evidenceLines);
    lines.push("");
  }

  return lines.join("\n");
}

// --- Concern renderer ---

function renderConcern(name: string, c: ConcernContent): string {
  const lines: string[] = [];

  lines.push(`# ${name}`);
  lines.push("");

  // What Patients Say
  const patientLangList = renderBulletList(c.patient_language ?? []);
  if (patientLangList || c.underlying_cause || c.patient_explanation) {
    lines.push("## What Patients Say");
    if (patientLangList) {
      lines.push("**Patient language:**");
      lines.push(patientLangList.trimEnd());
    }
    if (c.underlying_cause) lines.push(`\n**Underlying cause:** ${c.underlying_cause}`);
    if (c.patient_explanation) lines.push(`\n**Explanation for patient:** ${c.patient_explanation}`);
    lines.push("");
  }

  // Treatment Arc
  const whatHelpsList = renderBulletList(c.what_helps ?? []);
  const whatDoesNotHelpList = renderBulletList(c.what_does_not_help ?? []);
  if (whatHelpsList || whatDoesNotHelpList || c.treatment_sequence || c.expected_timeline || c.realistic_expectations) {
    lines.push("## Treatment Arc");
    if (whatHelpsList) {
      lines.push("**What helps:**");
      lines.push(whatHelpsList.trimEnd());
    }
    if (whatDoesNotHelpList) {
      lines.push("**What does not help:**");
      lines.push(whatDoesNotHelpList.trimEnd());
    }
    if (c.treatment_sequence) lines.push(`\n**Treatment sequence:** ${c.treatment_sequence}`);
    if (c.expected_timeline) lines.push(`**Expected timeline:** ${c.expected_timeline}`);
    if (c.realistic_expectations) lines.push(`**Realistic expectations:** ${c.realistic_expectations}`);
    lines.push("");
  }

  // What to Say
  const staffTalkingList = renderBulletList(c.staff_talking_points ?? []);
  if (c.consultation_language || staffTalkingList) {
    lines.push("## What to Say");
    if (c.consultation_language) {
      lines.push("### Consultation Language");
      lines.push(c.consultation_language);
    }
    if (staffTalkingList) {
      lines.push("### Staff Talking Points");
      lines.push(staffTalkingList.trimEnd());
    }
    lines.push("");
  }

  // What Not to Say
  const dnsList = renderBulletList(c.do_not_say ?? []);
  const dnpList = renderBulletList(c.do_not_promise ?? []);
  if (dnsList || dnpList) {
    lines.push("## What Not to Say");
    if (dnsList) {
      lines.push("### Do Not Say");
      lines.push(dnsList.trimEnd());
    }
    if (dnpList) {
      lines.push("### Do Not Promise");
      lines.push(dnpList.trimEnd());
    }
    lines.push("");
  }

  // Evidence
  const evidenceLines: string[] = [];
  if (c.evidence_level) evidenceLines.push(`- Level: ${c.evidence_level}`);
  if (c.source_support_summary) evidenceLines.push(`- Summary: ${c.source_support_summary}`);
  if (evidenceLines.length > 0) {
    lines.push("## Evidence");
    lines.push(...evidenceLines);
    lines.push("");
  }

  return lines.join("\n");
}

// --- SOP and Preferences renderers ---

function renderSop(sop: SopFields): string {
  const lines: string[] = ["## Practice SOPs"];

  const preList = renderBulletList(sop.pre_treatment_checklist);
  if (preList) {
    lines.push("### Pre-Treatment Checklist");
    lines.push(preList.trimEnd());
  }

  const consentList = renderBulletList(sop.consent_requirements);
  if (consentList) {
    lines.push("### Consent Requirements");
    lines.push(consentList.trimEnd());
  }

  const postList = renderBulletList(sop.post_treatment_instructions);
  if (postList) {
    lines.push("### Post-Treatment Instructions");
    lines.push(postList.trimEnd());
  }

  if (sop.follow_up_protocol) lines.push(`\n**Follow-up protocol:** ${sop.follow_up_protocol}`);
  if (sop.emergency_protocol) lines.push(`**Emergency protocol:** ${sop.emergency_protocol}`);

  const docList = renderBulletList(sop.documentation_requirements);
  if (docList) {
    lines.push("### Documentation Requirements");
    lines.push(docList.trimEnd());
  }

  lines.push("");
  return lines.join("\n");
}

function renderPreferences(prefs: PreferenceFields): string {
  const lines: string[] = ["## Practice Preferences"];

  if (prefs.pricing_notes) lines.push(`- Pricing notes: ${prefs.pricing_notes}`);

  const brandsList = renderBulletList(prefs.preferred_brands);
  if (brandsList) {
    lines.push("**Preferred brands:**");
    lines.push(brandsList.trimEnd());
  }

  if (prefs.scheduling_notes) lines.push(`- Scheduling notes: ${prefs.scheduling_notes}`);
  if (prefs.staff_assignment) lines.push(`- Staff assignment: ${prefs.staff_assignment}`);
  if (prefs.room_requirements) lines.push(`- Room requirements: ${prefs.room_requirements}`);
  if (prefs.inventory_notes) lines.push(`- Inventory notes: ${prefs.inventory_notes}`);

  lines.push("");
  return lines.join("\n");
}

// --- Main serializer ---

/**
 * Converts a resolved (post-COALESCE) fuel doc into structured markdown for agent consumption.
 * Empty fields and empty arrays are skipped — no headings rendered for empty sections.
 */
export function fuelDocToMarkdown(doc: ResolvedFuelDoc): string {
  let body: string;

  switch (doc.fuel_type) {
    case "combination":
      body = renderCombination(doc.product_name, doc.content as CombinationContent);
      break;
    case "product":
      body = renderProduct(doc.product_name, doc.content as ProductContent);
      break;
    case "concern":
      body = renderConcern(doc.product_name, doc.content as ConcernContent);
      break;
    default: {
      // Exhaustive check — TypeScript ensures all cases are covered
      const _exhaustive: never = doc.fuel_type;
      body = `# ${doc.product_name}\n\nUnknown fuel type: ${_exhaustive}\n`;
    }
  }

  if (doc.sop) {
    body += renderSop(doc.sop);
  }

  if (doc.preferences) {
    body += renderPreferences(doc.preferences);
  }

  return body;
}
