import { NextResponse } from "next/server";
import { agentSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/** GET /api/library/[id] — one fuel document, markdown extracted + cleaned. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: doc, error } = await agentSupabase
    .from("agent_fuel_documents")
    .select("id, fuel_type, target_type, doc_key, content, status, updated_at, quality_score")
    .eq("id", id)
    .single();

  if (error || !doc) {
    return NextResponse.json({ error: error?.message ?? "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: doc.id,
    fuelType: doc.fuel_type,
    targetType: doc.target_type,
    status: doc.status,
    updatedAt: doc.updated_at,
    markdown: extractMarkdown(doc.content),
  });
}

/** Fuel content comes in several shapes — string markdown, {content_md}, {body}, or structured. */
function extractMarkdown(content: unknown): string {
  if (content == null) return "";
  if (typeof content === "string") {
    let s = content;
    if (s.startsWith('"') && s.endsWith('"')) {
      try { s = JSON.parse(s) as string; } catch { /* leave */ }
    }
    return clean(s);
  }
  if (typeof content === "object") {
    const o = content as Record<string, unknown>;
    const md = o.content_md ?? o.body ?? o.markdown ?? o.md;
    if (typeof md === "string") return clean(md);
    return clean(objectToMarkdown(o));
  }
  return "";
}

/** Strip BOM, YAML frontmatter, and machine-metadata lines so it reads like a document. */
function clean(md: string): string {
  let s = md.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  s = s.replace(/^---\n[\s\S]*?\n---\n/, ""); // leading YAML frontmatter
  s = s
    .split("\n")
    .filter((line) => !/^\s*\*\*(doc[_ ]?key|fuel[_ ]?type|target[_ ]?type|target[_ ]?id|doc type|schema[_ ]?version|category uuid|target|generated|source registry|status)\b/i.test(line))
    .join("\n");
  return s.replace(/\n{3,}/g, "\n\n").trim();
}

/** Render a structured fuel object (e.g. pairing_fuel) as readable markdown sections. */
function objectToMarkdown(o: Record<string, unknown>): string {
  const titleCase = (k: string) => k.replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return Object.entries(o)
    .filter(([, v]) => typeof v === "string" && (v as string).trim())
    .map(([k, v]) => `## ${titleCase(k)}\n\n${v as string}`)
    .join("\n\n");
}
