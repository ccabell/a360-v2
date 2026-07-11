import { NextResponse } from "next/server";
import { createTask, listTasks } from "@/lib/portfolio/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const tasks = await listTasks();
    return NextResponse.json({ tasks });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "list failed" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body?.projectSlug || !body?.title?.trim()) {
      return NextResponse.json(
        { error: "projectSlug and title are required" },
        { status: 400 },
      );
    }
    const task = await createTask(body.projectSlug, body.title.trim());
    return NextResponse.json({ task }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "create failed" },
      { status: 500 },
    );
  }
}
