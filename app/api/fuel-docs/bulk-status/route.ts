import { NextRequest, NextResponse } from "next/server";
import { bulkUpdateStatus } from "@/lib/api/fuel-docs";
import type { ReviewStatus } from "@/lib/types/fuel-docs";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest) {
  try {
    const { ids, status } = (await req.json()) as {
      ids: string[];
      status: ReviewStatus;
    };

    if (!ids?.length || !status) {
      return NextResponse.json(
        { error: "ids (string[]) and status are required" },
        { status: 400 }
      );
    }

    const updated = await bulkUpdateStatus(ids, status);
    return NextResponse.json({ updated: updated.length, docs: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
