/**
 * Transcript cleaning for the Tim Pearce YouTube corpus.
 *
 * The raw `chunk_text` is VTT rolling-caption noise: each ~2-line caption
 * window is emitted multiple times in a row (typically 3x) as the caption
 * scrolls, so phrases triple-repeat, e.g.
 *
 *   "welcome to the show i'm welcome to the show i'm welcome to the show i'm
 *    dr tim pearce hi dr tim pearce hi dr tim pearce hi ..."
 *
 * The cleaner collapses immediately-repeated word runs back to a single
 * occurrence, recovering the real spoken line:
 *
 *   "welcome to the show i'm dr tim pearce hi ..."
 *
 * It is purely mechanical de-duplication — it never invents or rewrites words,
 * so the cleaned text remains a faithful, citable transcript.
 */

/** Collapse immediately-repeated runs of words within a single token stream. */
export function dedupeWordRuns(text: string): string {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";

  const out: string[] = [];
  let i = 0;
  const n = words.length;

  while (i < n) {
    let collapsed = false;

    // Try the longest plausible repeated phrase first, down to a single word.
    // Cap window at 12 words — caption lines in this corpus are short.
    const maxWindow = Math.min(12, Math.floor((n - i) / 2));
    for (let w = maxWindow; w >= 1; w--) {
      let matches = 0;
      // Count how many times the phrase words[i..i+w) repeats immediately.
      while (
        i + (matches + 1) * w + w <= n &&
        phraseEquals(words, i + matches * w, i + (matches + 1) * w, w)
      ) {
        matches++;
      }
      if (matches >= 1) {
        // Emit one copy of the phrase, skip the duplicate copies.
        for (let k = 0; k < w; k++) out.push(words[i + k]);
        i += (matches + 1) * w;
        collapsed = true;
        break;
      }
    }

    if (!collapsed) {
      out.push(words[i]);
      i++;
    }
  }

  return out.join(" ");
}

function phraseEquals(
  words: string[],
  aStart: number,
  bStart: number,
  len: number
): boolean {
  for (let k = 0; k < len; k++) {
    if (words[aStart + k] !== words[bStart + k]) return false;
  }
  return true;
}

/**
 * Clean a single raw segment's chunk_text into readable prose.
 * Returns trimmed, single-spaced text with caption repetition removed.
 */
export function cleanSegmentText(raw: string): string {
  if (!raw) return "";
  // First pass: collapse repeated word runs.
  let cleaned = dedupeWordRuns(raw);
  // Second pass catches residual 2x repeats left at run boundaries.
  cleaned = dedupeWordRuns(cleaned);
  return cleaned.replace(/\s+/g, " ").trim();
}

/**
 * Stitch a sequence of cleaned, time-ordered segments into one continuous
 * transcript, removing overlap where the tail of one segment is repeated at
 * the head of the next (caption windows straddle 60s segment boundaries).
 */
export function stitchSegments(
  cleanedTexts: string[]
): { text: string; perSegmentText: string[] } {
  const perSegmentText: string[] = [];
  const parts: string[] = [];
  let prevTailWords: string[] = [];

  for (const seg of cleanedTexts) {
    let words = seg.split(/\s+/).filter(Boolean);

    // Remove leading overlap with the previous segment's tail (up to 20 words).
    if (prevTailWords.length > 0 && words.length > 0) {
      const maxOverlap = Math.min(20, prevTailWords.length, words.length);
      let bestOverlap = 0;
      for (let len = maxOverlap; len >= 4; len--) {
        const tail = prevTailWords.slice(prevTailWords.length - len).join(" ");
        const head = words.slice(0, len).join(" ");
        if (tail === head) {
          bestOverlap = len;
          break;
        }
      }
      if (bestOverlap > 0) words = words.slice(bestOverlap);
    }

    const segText = words.join(" ");
    perSegmentText.push(segText);
    if (segText) parts.push(segText);
    prevTailWords = words.length > 0 ? words : prevTailWords;
  }

  return { text: parts.join(" "), perSegmentText };
}
