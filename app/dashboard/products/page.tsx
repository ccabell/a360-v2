import { getProductCards } from "@/lib/products";
import { ProductsBrowser } from "@/components/products/products-browser";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ p?: string }>;
}) {
  const { p } = await searchParams;
  const { products, error } = await getProductCards();

  return (
    <div className="p-8">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-foreground">Products</h1>
        <p className="text-sm text-muted-foreground">
          {error
            ? "Patient-facing product catalog."
            : `${products.length} products for patient consultations — selling, educating, and cross-selling in one screen.`}
        </p>
      </div>

      <ProductsBrowser products={products} error={error} initialSelectedId={p ?? null} />
    </div>
  );
}
