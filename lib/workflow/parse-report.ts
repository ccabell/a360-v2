/**
 * Structured parser for the orchestrator's post-consultation intelligence report.
 *
 * The report has a stable grammar across all canonical patients:
 *   Preamble (stripped) → ## 1. Executive Summary → ## 2. Package Recommendation
 *   → ## 3. Clinical Evidence → ## 4. Next Steps
 *
 * No markdown library — regex-based extraction of tables, PMIDs, confidence,
 * warning flags, and checklists.
 */

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface ParsedReport {
  executiveSummary: string;
  packages: PackageSection;
  clinicalEvidence: ClinicalEvidenceSection;
  nextSteps: NextStepsSection;
  /** Raw markdown for fallback rendering */
  raw: string;
}

export interface PackageSection {
  intro: string;
  tiers: PackageTier[];
  pricing: string;
}

export interface PackageTier {
  heading: string;
  rows: PackageRow[];
  rationale: string;
}

export interface PackageRow {
  component: string;
  status: string; // "✅" | "🔜" | "❌" | emoji
  indication: string;
  timing: string;
}

export interface ClinicalEvidenceSection {
  intro: string;
  items: ClinicalItem[];
}

export interface ClinicalItem {
  id: string; // "3a", "3b", etc.
  heading: string;
  confidence: string | null; // "7/10" or "High" or "Moderate" or null
  evidenceQuality: string | null; // "Moderate", "Strong", etc.
  body: string;
  pmids: string[];
  warnings: string[];
}

export interface NextStepsSection {
  items: ChecklistItem[];
}

export interface ChecklistItem {
  text: string;
  checked: boolean;
  timeHorizon: string | null; // "Today", "Week 1", "30 days" etc.
}

// ---------------------------------------------------------------------------
// Parser
// ---------------------------------------------------------------------------

export function parseReport(markdown: string): ParsedReport {
  // Strip preamble before the first ## heading
  const firstH2 = markdown.indexOf("\n## ");
  const body = firstH2 >= 0 ? markdown.slice(firstH2) : markdown;

  // Split on ## into sections
  const sections = splitSections(body);

  return {
    executiveSummary: parseSummary(sections["1. Executive Summary"] ?? sections["1"] ?? ""),
    packages: parsePackages(sections["2. Package Recommendation"] ?? sections["2"] ?? ""),
    clinicalEvidence: parseClinicalEvidence(sections["3. Clinical Evidence"] ?? sections["3"] ?? ""),
    nextSteps: parseNextSteps(sections["4. Next Steps"] ?? sections["4"] ?? ""),
    raw: markdown,
  };
}

function splitSections(body: string): Record<string, string> {
  const result: Record<string, string> = {};
  // Match ## at start of line (but NOT ### which is a sub-heading)
  const regex = /^## +(?!#)(.+)$/gm;
  const headers: { key: string; matchStart: number; contentStart: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(body)) !== null) {
    headers.push({
      key: m[1].trim(),
      matchStart: m.index,
      contentStart: m.index + m[0].length,
    });
  }
  for (let i = 0; i < headers.length; i++) {
    const end = i + 1 < headers.length ? headers[i + 1].matchStart : body.length;
    const content = body.slice(headers[i].contentStart, end).trim();
    // Store by full key and by number prefix
    result[headers[i].key] = content;
    const numMatch = headers[i].key.match(/^(\d+)/);
    if (numMatch) {
      result[numMatch[1]] = content;
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Section parsers
// ---------------------------------------------------------------------------

function parseSummary(text: string): string {
  // Strip any --- dividers and leading/trailing whitespace
  return text.replace(/^---+$/gm, "").trim();
}

function parsePackages(text: string): PackageSection {
  // Ensure leading ### is split even if text starts with it (no preceding \n after trim)
  const normalized = text.startsWith("### ") ? "\n" + text : text;
  const subsections = normalized.split(/\n### +/);
  const intro = subsections[0]?.trim() ?? "";

  const tiers: PackageTier[] = [];
  let pricing = "";

  for (let i = 1; i < subsections.length; i++) {
    const sub = subsections[i];
    const headingEnd = sub.indexOf("\n");
    const heading = headingEnd >= 0 ? sub.slice(0, headingEnd).trim() : sub.trim();
    const content = headingEnd >= 0 ? sub.slice(headingEnd).trim() : "";

    // Check if it's a pricing/cost section (not a treatment tier)
    if (/\b(pricing|cost|budget|invest|estimat)\b/i.test(heading) || /\bAlle\b.*\b(point|reward|saving|opportunity)\b/i.test(heading)) {
      pricing += (pricing ? "\n\n" : "") + `**${heading}**\n${content}`;
      continue;
    }

    // Parse markdown table rows
    const rows = parseTableRows(content);
    // Everything after the table is rationale
    const tableEnd = content.lastIndexOf("|");
    const afterTable = tableEnd >= 0 ? content.slice(tableEnd + 1).trim() : "";
    // Get non-table text as rationale
    const rationale = afterTable.replace(/^\|.*$/gm, "").trim();

    tiers.push({ heading, rows, rationale });
  }

  // If no ### sub-headings, try parsing the whole section as one table
  if (tiers.length === 0) {
    const rows = parseTableRows(text);
    if (rows.length > 0) {
      tiers.push({ heading: "Recommended Package", rows, rationale: "" });
    }
    // Extract pricing from non-table text
    const lines = text.split("\n").filter((l) => !l.trim().startsWith("|") && !l.trim().startsWith("---"));
    pricing = lines.filter((l) => /pric|cost|\$|alle|budget|invest/i.test(l)).join("\n").trim();
  }

  return { intro, tiers, pricing };
}

function parseTableRows(text: string): PackageRow[] {
  const rows: PackageRow[] = [];
  const lines = text.split("\n");
  for (const line of lines) {
    if (!line.trim().startsWith("|")) continue;
    const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
    if (cells.length < 2) continue;
    // Skip header separator rows (---+)
    if (cells.every((c) => /^[-:]+$/.test(c))) continue;
    // Skip header row (heuristic: contains "Component" or "Status")
    if (/component|treatment|product/i.test(cells[0]) && /status|ready/i.test(cells[1])) continue;

    rows.push({
      component: cells[0] ?? "",
      status: cells[1] ?? "",
      indication: cells[2] ?? "",
      timing: cells[3] ?? "",
    });
  }
  return rows;
}

function parseClinicalEvidence(text: string): ClinicalEvidenceSection {
  const normalized = text.startsWith("### ") ? "\n" + text : text;
  const subsections = normalized.split(/\n### +/);
  const intro = subsections[0]?.trim() ?? "";
  const items: ClinicalItem[] = [];

  for (let i = 1; i < subsections.length; i++) {
    const sub = subsections[i];
    const headingEnd = sub.indexOf("\n");
    const rawHeading = headingEnd >= 0 ? sub.slice(0, headingEnd).trim() : sub.trim();
    const body = headingEnd >= 0 ? sub.slice(headingEnd).trim() : "";

    // Extract ID like "3a." or "3b."
    const idMatch = rawHeading.match(/^(\d+[a-z])\.\s*/i);
    const id = idMatch ? idMatch[1].toLowerCase() : `${3}${String.fromCharCode(96 + i)}`;
    const heading = idMatch ? rawHeading.slice(idMatch[0].length).trim() : rawHeading;

    // Confidence: "Confidence: 7/10" or "Confidence: High/Moderate/Low"
    const confMatch = body.match(/[Cc]onfidence[:\s]+(\d+\/\d+|High|Moderate|Low)/i);
    const confidence = confMatch ? confMatch[1] : null;

    // Evidence Quality
    const qualMatch = body.match(/Evidence Quality[:\s]+([^|*\n]+)/i);
    const evidenceQuality = qualMatch ? qualMatch[1].trim() : null;

    // PMIDs
    const pmids = [...new Set(
      (body.match(/PMID\s*:?\s*(\d{6,})/g) ?? []).map((m) => {
        const n = m.match(/(\d{6,})/);
        return n ? n[1] : "";
      }).filter(Boolean),
    )];

    // Warnings (lines starting with > ⚠️ or > **⚠️)
    const warnings = (body.match(/>\s*\*?\*?⚠️.+/g) ?? []).map((w) =>
      w.replace(/^>\s*\*?\*?⚠️\s*/, "").replace(/\*\*/g, "").trim(),
    );

    items.push({ id, heading, confidence, evidenceQuality, body, pmids, warnings });
  }

  return { intro, items };
}

function parseNextSteps(text: string): NextStepsSection {
  const items: ChecklistItem[] = [];

  // Split by ### sub-headings for time horizon grouping
  const normalized = text.startsWith("### ") ? "\n" + text : text;
  const subsections = normalized.split(/\n### +/);

  // Items before any ### heading (ungrouped)
  parseNextStepsLines(subsections[0] ?? "", null, items);

  // Items within ### groups — heading is the time horizon
  for (let i = 1; i < subsections.length; i++) {
    const sub = subsections[i];
    const headingEnd = sub.indexOf("\n");
    const rawHeading = headingEnd >= 0 ? sub.slice(0, headingEnd).trim() : sub.trim();
    const content = headingEnd >= 0 ? sub.slice(headingEnd).trim() : "";

    // Strip emoji prefix from heading (🔴 🟡 🟢 🗓️ 📆 📋 🏥)
    // Use Emoji_Presentation to avoid stripping digits (0-9 are in \p{Emoji})
    const horizon = rawHeading.replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F\s]+/u, "").trim();
    parseNextStepsLines(content, horizon, items);
  }

  return { items };
}

function parseNextStepsLines(text: string, horizon: string | null, items: ChecklistItem[]) {
  for (const line of text.split("\n")) {
    // Match - [ ] or - [x] checklist items
    const checkMatch = line.match(/^[-*]\s*\[([ xX])\]\s*(.+)/);
    if (checkMatch) {
      const checked = checkMatch[1].toLowerCase() === "x";
      const raw = checkMatch[2].trim();
      // Strip bold wrapper from the item text but keep the content
      const cleanText = raw.replace(/^\*\*([^*]+)\*\*[:\s—–-]*/g, "$1: ").replace(/\*\*/g, "").trim();
      items.push({ text: cleanText, checked, timeHorizon: horizon });
      continue;
    }

    // Plain bullet with bold lead (no checkbox)
    const bulletMatch = line.match(/^[-*]\s+\*\*([^*]+)\*\*[:\s—–-]*(.*)/);
    if (bulletMatch) {
      const label = bulletMatch[1].trim();
      const detail = bulletMatch[2]?.trim() ?? "";
      items.push({
        text: detail ? `${label}: ${detail}` : label,
        checked: false,
        timeHorizon: horizon,
      });
    }
  }
}
