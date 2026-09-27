import type { ProductSummary } from "@/sanity/queries";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";

// Photo widths per layout (container max 80rem, minus padding, gaps and card padding)
const LAYOUTS = {
  3: {
    className: "lg:grid-cols-3 xl:grid-cols-4",
    sizes: "(min-width: 1280px) 270px, (min-width: 1024px) 30vw, 46vw",
  },
  4: {
    className: "lg:grid-cols-4",
    sizes: "(min-width: 1280px) 270px, (min-width: 1024px) 22vw, 46vw",
  },
} as const;

interface ProductGridProps {
  products: ProductSummary[];
  showCategory?: boolean;
  /** Columns from `lg` up: 3 (4 on xl) for full catalogs, 4 for short rows like related products. */
  columns?: keyof typeof LAYOUTS;
  /** How many leading cards are above the fold and should load first. */
  priorityCount?: number;
}

export function ProductGrid({ products, showCategory = true, columns = 3, priorityCount = 0 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-[1.5rem] bg-sand px-6 py-16 text-center">
        <p className="text-muted-foreground">Todavía no hay productos en esta sección.</p>
      </div>
    );
  }

  const layout = LAYOUTS[columns];
  return (
    <ul className={cn("grid grid-cols-2 gap-3 sm:gap-5 lg:gap-6", layout.className)}>
      {products.map((product, i) => (
        <li key={product._id}>
          <ProductCard
            product={product}
            sizes={layout.sizes}
            showCategory={showCategory}
            priority={i < priorityCount}
          />
        </li>
      ))}
    </ul>
  );
}
