import Link from "next/link";
import { ProductGrid } from "@/components/shop/product-grid";
import { Button } from "@/components/ui/button";
import { Wave } from "@/components/ui/wave";
import type { ProductSummary } from "@/sanity/queries";

/** Wet-sand band with a row of up to four picks, all the same size. */
export function FeaturedProducts({ products }: { products: ProductSummary[] }) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="destacados" className="relative bg-sand section-y">
      <Wave tone="sand" edge="top" />
      <div className="container-page">
        <div className="reveal mb-10 flex items-end justify-between gap-6 md:mb-14">
          <div>
            <h2 id="destacados" className="heading-2">
              Destacados
            </h2>
            <p className="lead mt-4">Una selección de mis piezas.</p>
          </div>
          <Button asChild variant="secondary" arrow className="hidden bg-card sm:inline-flex">
            <Link href="/productos">Ver productos</Link>
          </Button>
        </div>

        <ProductGrid products={products} columns={4} />

        <Button asChild variant="secondary" arrow className="mt-8 w-full bg-card sm:hidden">
          <Link href="/productos">Ver productos</Link>
        </Button>
      </div>
    </section>
  );
}
