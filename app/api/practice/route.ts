import { NextResponse } from "next/server";
import { opsSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const DEMO_PRACTICE_ID =
  process.env.DEMO_PRACTICE_ID ?? "a0000000-0000-0000-0000-000000000001";

export interface PracticeLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  is_default: boolean;
}

export interface PracticePayload {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  tagline: string | null;
  accent: string | null;
  locations: PracticeLocation[];
}

/**
 * GET /api/practice — the demo practice identity for the shared header.
 * Reads name/slug + branding JSONB (logo, tagline, accent, locations).
 */
export async function GET() {
  const { data, error } = await opsSupabase
    .from("practices")
    .select("id, name, slug, branding")
    .eq("id", DEMO_PRACTICE_ID)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Practice not found" },
      { status: 502 },
    );
  }

  const branding = (data.branding ?? {}) as Record<string, unknown>;
  const payload: PracticePayload = {
    id: data.id,
    name: data.name,
    slug: data.slug,
    logo: (branding.logo as string) ?? null,
    tagline: (branding.tagline as string) ?? null,
    accent: (branding.accent as string) ?? null,
    locations: (branding.locations as PracticeLocation[]) ?? [],
  };

  return NextResponse.json(payload);
}
