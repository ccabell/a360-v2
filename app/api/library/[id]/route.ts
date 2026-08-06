import { NextResponse } from "next/server";
import { agentSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/** GET /api/library/[id] — one agent reference doc; content_md is already clean markdown. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: doc, error } = await agentSupabase
    .from("agent_reference_docs")
    .select("id, doc_type, offering_id, content_md, status, updated_at")
    .eq("id", id)
    .single();

  if (error || !doc) {
    return NextResponse.json({ error: error?.message ?? "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: doc.id,
    fuelType: doc.doc_type,
    targetType: doc.offering_id ? "offering" : null,
    status: doc.status,
    updatedAt: doc.updated_at,
    markdown: clean(doc.content_md ?? ""),
  });
}

/** Strip BOM and normalize line endings — content_md has no legacy frontmatter/metadata lines to strip. */
function clean(md: string): string {
  return md.replace(/^﻿/, "").replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}
