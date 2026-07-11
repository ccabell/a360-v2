import { NextResponse } from "next/server";
import { createProject, listProjects } from "@/lib/portfolio/db";

export const dynamic = "force-dynamic";

/**
 * Portfolio registry API — internal sessions only (proxy.ts gates every
 * /api/portfolio route behind the beta password; audience share links never
 * receive this prefix).
 */

export async function GET() {
  try {
    const projects = await listProjects();
    return NextResponse.json({ projects });
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
    if (!body?.slug || !body?.name) {
      return NextResponse.json(
        { error: "slug and name are required" },
        { status: 400 },
      );
    }
    if (!/^[a-z0-9][a-z0-9-]*$/.test(body.slug)) {
      return NextResponse.json(
        { error: "slug must be lowercase kebab-case" },
        { status: 400 },
      );
    }
    const project = await createProject({
      slug: body.slug,
      name: body.name,
      oneLiner: body.oneLiner,
      category: body.category,
      priority: body.priority,
      status: body.status,
    });
    return NextResponse.json({ project }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "create failed" },
      { status: 500 },
    );
  }
}
