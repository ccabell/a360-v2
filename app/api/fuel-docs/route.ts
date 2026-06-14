import { NextRequest, NextResponse } from "next/server";
import { listFuelDocs, createFuelDoc, bulkCreateFuelDocs } from "@/lib/api/fuel-docs";
import type { FuelDocType, ReviewStatus } from "@/lib/types/fuel-docs";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const type = (sp.get("type") ?? undefined) as FuelDocType | undefined;
  const status = (sp.get("status") ?? undefined) as ReviewStatus | undefined;
  const search = sp.get("q") ?? undefined;

  try {
    const docs = await listFuelDocs({ type, status, search });
    return NextResponse.json(docs);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Bulk import: { docs: [...] }
    if (Array.isArray(body.docs)) {
      const created = await bulkCreateFuelDocs(body.docs);
      return NextResponse.json({ created: created.length, docs: created }, { status: 201 });
    }

    // Single create
    const doc = await createFuelDoc(body);
    return NextResponse.json(doc, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
