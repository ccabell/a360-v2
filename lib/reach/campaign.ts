// Types + parsing + personalization-highlight matching for the
// `reach_email_composer` agent output. The agent returns a single JSON object
// (see C:\Projects\reach\agents\reach_email_composer.md for the canonical
// output contract). This module gives the Reach viewer a typed, defensively
// parsed campaign plus a lightweight matcher that highlights which phrases in
// an email body trace back to which extraction signal.

export type CampaignType =
  | "BOOKING_FACILITATION"
  | "VALUE_REINFORCEMENT"
  | "MARKETING_OPPORTUNITY";

export interface PersonalizationSignal {
  key: string;
  value: string;
  used_in?: string[];
}

export interface EmailCta {
  label: string;
  type: "book" | "learn_more" | "call" | "reply" | string;
  url?: string | null;
}

export interface CampaignEmail {
  send_at_offset_days: number;
  subject: string;
  preview_text: string;
  body_markdown: string;
  cta: EmailCta;
  personalization_refs?: string[];
}

export interface CampaignPatientContext {
  first_name?: string | null;
  primary_goal?: string | null;
  motivating_event?: {
    event?: string | null;
    timing?: string | null;
    urgency?: "high" | "medium" | "low" | null;
  } | null;
}

export interface CrmPayloadPreview {
  full_email_push?: Record<string, unknown>;
  targeted_info_push?: Record<string, unknown>;
}

export interface ReachCampaign {
  agent_version?: string;
  campaign_type: CampaignType | string;
  classification_confidence?: number;
  classification_rationale?: string;
  patient_context?: CampaignPatientContext;
  personalization_signals?: PersonalizationSignal[];
  email_sequence: CampaignEmail[];
  guardrails_applied?: string[];
  guardrails_violated?: string[];
  crm_payload_preview?: CrmPayloadPreview;
}

/**
 * Defensively parse the composer's raw text into a ReachCampaign.
 * Handles accidental ```json fences and leading/trailing prose. Returns null
 * when the text doesn't contain a usable campaign object (viewer falls back to
 * the raw BlockCard output in that case).
 */
export function parseCampaign(raw: string): ReachCampaign | null {
  if (!raw || !raw.trim()) return null;

  const candidates: string[] = [];
  const trimmed = raw.trim();
  candidates.push(trimmed);

  // Strip a ```json ... ``` (or bare ```) fence if present.
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence?.[1]) candidates.push(fence[1].trim());

  // Fall back to the first { ... last } span.
  const first = trimmed.indexOf("{");
  const last = trimmed.lastIndexOf("}");
  if (first !== -1 && last > first) candidates.push(trimmed.slice(first, last + 1));

  for (const c of candidates) {
    try {
      const obj = JSON.parse(c) as Partial<ReachCampaign>;
      if (obj && typeof obj === "object" && Array.isArray(obj.email_sequence)) {
        return obj as ReachCampaign;
      }
    } catch {
      // try the next candidate
    }
  }
  return null;
}

// ── Personalization highlight matching ──────────────────────────────────────

const STOPWORDS = new Set([
  "your", "youre", "you", "with", "that", "this", "have", "here", "just",
  "when", "what", "were", "well", "will", "would", "there", "their", "them",
  "they", "from", "into", "about", "after", "before", "been", "being", "both",
  "each", "more", "most", "some", "such", "than", "then", "these", "those",
  "want", "wanted", "like", "over", "very", "your", "ours", "which", "while",
  "goal", "goals", "feel", "felt", "look", "looking", "make", "made", "take",
  "help", "know", "time", "back", "also", "still", "some", "thing", "things",
  "much", "many", "even", "ever", "much", "little", "around", "during",
  "consultation", "consult", "patient", "practice", "treatment", "treatments",
  "email", "campaign", "mentioned", "discussed", "recommended", "value",
]);

function normalizeWord(w: string): string {
  return w.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Extract distinctive keywords from a signal value: content words (len >= 4,
 * non-stopword) plus standalone numbers. These are matched against email body
 * words to decide which phrases to highlight.
 */
export function signalKeywords(value: string): Set<string> {
  const out = new Set<string>();
  if (!value) return out;
  for (const tok of value.split(/\s+/)) {
    const n = normalizeWord(tok);
    if (!n) continue;
    if (/^\d+$/.test(n)) {
      out.add(n);
    } else if (n.length >= 4 && !STOPWORDS.has(n)) {
      out.add(n);
    }
  }
  return out;
}

export type BodySegment =
  | { kind: "text"; text: string }
  | { kind: "tag"; text: string; tag: string }
  | { kind: "mark"; text: string; signalIndex: number };

const MERGE_TAG_RE = /\{\{\s*([a-z0-9_]+)\s*\}\}/gi;

/**
 * Split one line of email body into ordered segments: plain text, merge-tag
 * pills ({{first_name}}), and highlighted personalization phrases. `signals`
 * is the ordered list of signals used in this email; a segment's signalIndex
 * points back into it. Adjacent words matching the same signal merge into one
 * highlight span.
 */
export function buildSegments(
  line: string,
  signals: { value: string }[],
): BodySegment[] {
  // keyword -> signal index (first signal wins on collision)
  const keywordToSignal = new Map<string, number>();
  signals.forEach((s, i) => {
    for (const kw of signalKeywords(s.value)) {
      if (!keywordToSignal.has(kw)) keywordToSignal.set(kw, i);
    }
  });

  const segments: BodySegment[] = [];

  // First split out merge tags so we never highlight inside them.
  const parts: Array<{ text: string; tag?: string }> = [];
  let cursor = 0;
  MERGE_TAG_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = MERGE_TAG_RE.exec(line)) !== null) {
    if (m.index > cursor) parts.push({ text: line.slice(cursor, m.index) });
    parts.push({ text: m[0], tag: m[1].toLowerCase() });
    cursor = m.index + m[0].length;
  }
  if (cursor < line.length) parts.push({ text: line.slice(cursor) });

  for (const part of parts) {
    if (part.tag) {
      segments.push({ kind: "tag", text: part.text, tag: part.tag });
      continue;
    }
    if (keywordToSignal.size === 0) {
      segments.push({ kind: "text", text: part.text });
      continue;
    }

    // Tokenize preserving whitespace, then group consecutive word tokens that
    // resolve to the same signal into runs.
    const tokens = part.text.split(/(\s+)/);
    let buffer = "";
    let bufferSignal: number | null = null;

    const flush = () => {
      if (!buffer) return;
      if (bufferSignal === null) {
        segments.push({ kind: "text", text: buffer });
      } else {
        // Keep leading/trailing whitespace out of the highlight for clean marks.
        const lead = buffer.match(/^\s+/)?.[0] ?? "";
        const trail = buffer.match(/\s+$/)?.[0] ?? "";
        const core = buffer.slice(lead.length, buffer.length - trail.length);
        if (lead) segments.push({ kind: "text", text: lead });
        if (core) segments.push({ kind: "mark", text: core, signalIndex: bufferSignal });
        if (trail) segments.push({ kind: "text", text: trail });
      }
      buffer = "";
    };

    for (const tok of tokens) {
      if (tok === "") continue;
      const isSpace = /^\s+$/.test(tok);
      if (isSpace) {
        buffer += tok;
        continue;
      }
      const sig = keywordToSignal.get(normalizeWord(tok));
      const tokSignal = sig === undefined ? null : sig;
      if (tokSignal === bufferSignal) {
        buffer += tok;
      } else {
        flush();
        bufferSignal = tokSignal;
        buffer = tok;
      }
    }
    flush();
  }

  return segments;
}

// ── Display helpers ─────────────────────────────────────────────────────────

const MERGE_TAG_LABELS: Record<string, string> = {
  first_name: "First name",
  last_name: "Last name",
  unsubscribe_url: "Unsubscribe",
  practice_name: "Practice",
  provider_name: "Provider",
};

export function mergeTagLabel(tag: string): string {
  return (
    MERGE_TAG_LABELS[tag] ??
    tag.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

/**
 * Turn a signal key path into a short human-readable provenance label, e.g.
 * `prompt_1.parsed_json.visit_context.motivating_events[0]` → "Motivating event".
 */
export function formatSignalKey(key: string): string {
  if (!key) return "Signal";
  const last = key
    .split(".")
    .pop()!
    .replace(/\[\d+\]$/, "");
  const cleaned = last.replace(/_/g, " ").trim();
  if (!cleaned) return "Signal";
  return cleaned.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function offsetLabel(days: number): string {
  if (days <= 0) return "Send now";
  return `Day ${days}`;
}
