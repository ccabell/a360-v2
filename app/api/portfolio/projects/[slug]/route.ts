import { NextResponse } from "next/server";
import {
  deleteProject,
  setProjectArchived,
  updateProject,
} from "@/lib/portfolio/db";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { slug } = await params;
  try {
    const body = await request.json();
    // archive/unarchive travels as its own field so the soft-delete semantics
    // (archived_at stamping) stay in one place.
    if (typeof body.archived === "boolean") {
      const project = await setProjectArchived(slug, body.archived);
      return NextResponse.json({ project });
    }
    const project = await updateProject(slug, body);
    return NextResponse.json({ project });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "update failed" },
      { status: 500 },
    );
  }
}

/** Default DELETE = archive (soft). `?hard=1` = true removal, junk only. */
export async function DELETE(request: Request, { params }: Params) {
  const { slug } = await params;
  try {
    const hard = new URL(request.url).searchParams.get("hard") === "1";
    if (hard) {
      await deleteProject(slug);
      return NextResponse.json({ deleted: slug });
    }
    const project = await setProjectArchived(slug, true);
    return NextResponse.json({ project });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "delete failed" },
      { status: 500 },
    );
  }
}
