import { NextResponse } from "next/server";
import { agentSupabase } from "@/lib/supabase";
import type { ProductCard } from "@/lib/types/products";

export const dynamic = "force-dynamic";

/** GET /api/products — the V1 Global Library product card list, for the Products tab. */
export async function GET() {
  const { data, error } = await agentSupabase
    .from("v_gl_v1_product_card")
    .select("*")
    .order("name");

  if (error) return NextResponse.json({ error: error.message }, { status: 502 });

  return NextResponse.json({ products: (data ?? []) as ProductCard[] });
}
