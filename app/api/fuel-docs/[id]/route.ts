import { NextRequest, NextResponse } from "next/server";
import { getFuelDoc, getResolvedFuelDoc, updateFuelDoc, deleteFuelDoc } from "@/lib/api/fuel-docs";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const practice_id = req.nextUrl.searchParams.get("practice_id") ?? undefined;
    // Use COALESCE resolution when practice_id is provided
    const doc = practice_id
      ? await getResolvedFuelDoc(id, practice_id)
      : await getFuelDoc(id);
    return NextResponse.json(doc);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 404 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await updateFuelDoc(id, body);
    return NextResponse.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteFuelDoc(id);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
