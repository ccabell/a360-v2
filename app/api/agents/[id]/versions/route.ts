import { NextRequest, NextResponse } from "next/server";
import { listVersions, createVersion, promoteVersion } from "@/lib/api/agents";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const versions = await listVersions(id);
    return NextResponse.json(versions);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // If this is a promote action
    if (body._action === "promote") {
      await promoteVersion(body.versionId, body.agentId);
      return NextResponse.json({ ok: true });
    }

    const version = await createVersion(body);
    return NextResponse.json(version, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
