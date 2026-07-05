import { NextResponse } from "next/server";
import { getProductCards } from "@/lib/products";

export const dynamic = "force-dynamic";

/** GET /api/products — the V1 Global Library product card list, for the Products tab. */
export async function GET() {
  const { products, error } = await getProductCards();
  if (error) return NextResponse.json({ error }, { status: 502 });
  return NextResponse.json({ products });
}
