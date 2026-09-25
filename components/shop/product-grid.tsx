import { Reveal } from "@/components/motion/reveal";
import type { ProductSummary } from "@/sanity/queries";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: ProductSummary[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-border px-6 py-16 text-center">
        <p className="text-muted-foreground">Todavía no hay productos en esta sección.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <Reveal as="li" key={product._id} delay={(index % 4) * 0.08}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </ul>
  );
}
