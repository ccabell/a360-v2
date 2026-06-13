"use client";

import { useState, useEffect } from "react";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export interface OutlineSection {
  id: string;
  title: string;
  page: number;
  level: number;
  children?: OutlineSection[];
}

export interface PDFData {
  numPages: number;
  outline: OutlineSection[];
  isLoaded: boolean;
  error: string | null;
}

// ─── 1. Bookmark-based extraction ────────────────────────────────────────────

async function resolveOutline(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doc: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[],
  level: number,
  prefix: string,
): Promise<OutlineSection[]> {
  const result: OutlineSection[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const id = `${prefix}${i}`;
    let page = 1;
    try {
      if (item.dest) {
        let dest = item.dest;
        if (typeof dest === "string") dest = await doc.getDestination(dest);
        if (dest && dest[0]) page = (await doc.getPageIndex(dest[0])) + 1;
      }
    } catch {
      /* ignore */
    }
    const children =
      item.items?.length > 0
        ? await resolveOutline(doc, item.items, level + 1, `${id}-`)
        : undefined;
    result.push({
      id,
      title: item.title?.trim() || "(Untitled)",
      page,
      level,
      children,
    });
  }
  return result;
}

// ─── 2. Text-based TOC extraction (fallback) ─────────────────────────────────

/**
 * Groups raw pdfjs text items into logical lines by Y-coordinate,
 * then finds and parses the Table of Contents section.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function extractTOCFromText(doc: any): Promise<OutlineSection[]> {
  const MAX_PAGES_TO_SCAN = Math.min(25, doc.numPages);

  // Collect all text items from first N pages, tagged with page number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allItems: { str: string; x: number; y: number; pageNum: number }[] = [];

  for (let p = 1; p <= MAX_PAGES_TO_SCAN; p++) {
    const page = await doc.getPage(p);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content = await page.getTextContent();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const item of content.items as any[]) {
      if (item.str) {
        allItems.push({
          str: item.str,
          x: Math.round(item.transform[4]),
          y: Math.round(item.transform[5]),
          pageNum: p,
        });
      }
    }
  }

  // Group items into lines: same page + Y within 3px tolerance
  const lineMap = new Map<
    string,
    { texts: { str: string; x: number }[]; pageNum: number; y: number }
  >();
  for (const item of allItems) {
    // Round Y to nearest 3 for tolerance grouping
    const yKey = Math.round(item.y / 3) * 3;
    const key = `${item.pageNum}:${yKey}`;
    if (!lineMap.has(key))
      lineMap.set(key, { texts: [], pageNum: item.pageNum, y: yKey });
    lineMap.get(key)!.texts.push({ str: item.str, x: item.x });
  }

  // Sort lines: by page number, then by Y descending (PDF Y is bottom-up)
  const lines = [...lineMap.values()]
    .sort((a, b) =>
      a.pageNum !== b.pageNum ? a.pageNum - b.pageNum : b.y - a.y,
    )
    .map((line) => {
      const text = line.texts
        .sort((a, b) => a.x - b.x)
        .map((t) => t.str)
        .join("")
        .trim();
      return { text, pageNum: line.pageNum };
    })
    .filter((l) => l.text.length > 0);

  return parseTOCLines(lines);
}

function parseTOCLines(
  lines: { text: string; pageNum: number }[],
): OutlineSection[] {
  // ── Find the TOC section ──────────────────────────────────────────────────
  let tocStart = -1;
  for (let i = 0; i < lines.length; i++) {
    const lower = lines[i].text.toLowerCase();
    if (
      lower === "table of contents" ||
      lower === "contents" ||
      lower.startsWith("table of contents")
    ) {
      tocStart = i + 1;
      break;
    }
  }
  if (tocStart === -1) return [];

  // ── Parse TOC entries ─────────────────────────────────────────────────────
  // Patterns handled:
  //   "1.0  SAFETY AND REGULATORY COMPLIANCE ............... 8"
  //   "1.1  Introduction ................................... 8"
  //   "3.1.1  Articulated Arm Delivery ..................... 19"
  //   "Introduction ........................................... 1"  (no number)

  // Matches: optional_number  title  dots/spaces  page
  const WITH_NUM = /^(\d+(?:\.\d+)*\.?)\s{1,6}(.+?)\s*[. ]{3,}\s*(\d+)\s*$/;
  const WITHOUT_NUM = /^(.+?)\s*[. ]{3,}\s*(\d+)\s*$/;

  const flat: OutlineSection[] = [];
  let idCounter = 0;
  let consecutiveNonMatches = 0;

  for (let i = tocStart; i < lines.length; i++) {
    const { text } = lines[i];

    // Stop when we clearly leave the TOC (many non-matching lines in a row)
    if (consecutiveNonMatches > 6) break;

    // Skip headers, blank-ish lines, and decorative lines
    if (
      text.length < 3 ||
      /^[.\s-─═]+$/.test(text) ||
      text.toLowerCase().startsWith("list of fig") ||
      text.toLowerCase().startsWith("list of tab") ||
      (text.toLowerCase().startsWith("appendix") && text.length < 12)
    ) {
      consecutiveNonMatches++;
      continue;
    }

    const mNum = text.match(WITH_NUM);
    const mPlain = !mNum && text.match(WITHOUT_NUM);

    if (mNum) {
      consecutiveNonMatches = 0;
      const numPrefix = mNum[1].replace(/\.$/, ""); // e.g. "3.1.1"
      const dotCount = (numPrefix.match(/\./g) || []).length;
      const level = dotCount; // "1" → 0, "1.1" → 1, "1.1.1" → 2
      const title = `${mNum[1]} ${mNum[2]}`.replace(/\s+/g, " ").trim();
      const page = parseInt(mNum[3], 10);
      if (title && page > 0) {
        flat.push({
          id: `toc-${idCounter++}`,
          title,
          page,
          level: Math.min(level, 3),
        });
      }
    } else if (mPlain) {
      consecutiveNonMatches = 0;
      const title = mPlain[1].replace(/\s+/g, " ").trim();
      const page = parseInt(mPlain[2], 10);
      // Only accept if looks like a real section (not a stray line)
      if (title.length > 2 && page > 0 && !/^\d+$/.test(title)) {
        flat.push({ id: `toc-${idCounter++}`, title, page, level: 0 });
      }
    } else {
      consecutiveNonMatches++;
    }
  }

  if (flat.length === 0) return [];

  // ── Build nested tree from flat level list ────────────────────────────────
  return buildTree(flat);
}

function buildTree(flat: OutlineSection[]): OutlineSection[] {
  const root: OutlineSection[] = [];
  const stack: OutlineSection[] = []; // stack of open parents

  for (const item of flat) {
    // Clear stack down to parent level
    while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
      stack.pop();
    }

    const node: OutlineSection = { ...item, children: undefined };

    if (stack.length === 0) {
      root.push(node);
    } else {
      const parent = stack[stack.length - 1];
      if (!parent.children) parent.children = [];
      parent.children.push(node);
    }

    stack.push(node);
  }

  return root;
}

// ─── Main hook ───────────────────────────────────────────────────────────────

export function usePDFData(url: string): PDFData {
  const [numPages, setNumPages] = useState(0);
  const [outline, setOutline] = useState<OutlineSection[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    setIsLoaded(false);
    setError(null);
    setOutline([]);
    setNumPages(0);

    async function load() {
      try {
        const doc = await pdfjs.getDocument(url).promise;
        if (cancelled) return;

        setNumPages(doc.numPages);

        // Try bookmarks first (fast)
        const rawOutline = await doc.getOutline();
        if (rawOutline && rawOutline.length > 0) {
          const sections = await resolveOutline(doc, rawOutline, 0, "s");
          if (!cancelled) setOutline(sections);
        } else {
          // No bookmarks → scan TOC pages and parse text
          const sections = await extractTOCFromText(doc);
          if (!cancelled) setOutline(sections);
        }
      } catch (err) {
        if (!cancelled) setError(String(err));
      } finally {
        if (!cancelled) setIsLoaded(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [url]);

  return { numPages, outline, isLoaded, error };
}
