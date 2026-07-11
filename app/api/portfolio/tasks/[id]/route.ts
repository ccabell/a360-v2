import { NextResponse } from "next/server";
import { deleteTask, setTaskStatus } from "@/lib/portfolio/db";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = await request.json();
    if (body.status !== "open" && body.status !== "done") {
      return NextResponse.json(
        { error: "status must be open|done" },
        { status: 400 },
      );
    }
    const task = await setTaskStatus(id, body.status);
    return NextResponse.json({ task });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "update failed" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await deleteTask(id);
    return NextResponse.json({ deleted: id });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "delete failed" },
      { status: 500 },
    );
  }
}
