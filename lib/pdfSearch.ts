"use client";

import { pdfjs } from "react-pdf";

export interface PageChunk {
  page: number;
  text: string;
}

// Cache so we only extract once per session
let cachedChunks: PageChunk[] | null = null;
let cachedUrl: string | null = null;

export async function extractPDFChunks(url: string): Promise<PageChunk[]> {
  if (cachedChunks && cachedUrl === url) return cachedChunks;

  const doc = await pdfjs.getDocument(url).promise;
  const chunks: PageChunk[] = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const text = (content.items as { str: string }[])
      .map((item) => item.str)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    if (text.length > 20) {
      chunks.push({ page: i, text });
    }
  }

  cachedChunks = chunks;
  cachedUrl = url;
  return chunks;
}

// Simple keyword search — returns top N most relevant pages
export function findRelevantChunks(
  chunks: PageChunk[],
  query: string,
  topN = 5,
): PageChunk[] {
  const keywords = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2);

  if (keywords.length === 0) return chunks.slice(0, topN);

  const scored = chunks.map((chunk) => {
    const text = chunk.text.toLowerCase();
    const score = keywords.reduce((sum, kw) => {
      // Count occurrences of each keyword
      const matches = (text.match(new RegExp(kw, "g")) || []).length;
      return sum + matches;
    }, 0);
    return { ...chunk, score };
  });

  const matched = scored
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  // Fallback: if nothing matched, do partial/substring matching
  if (matched.length === 0) {
    const query = keywords.join(" ");
    const partial = chunks
      .map((chunk) => ({
        ...chunk,
        score: chunk.text.toLowerCase().includes(query) ? 10 : 0,
      }))
      .filter((c) => c.score > 0)
      .slice(0, topN);

    return partial.length > 0 ? partial : chunks.slice(0, topN);
  }

  return matched;
}
