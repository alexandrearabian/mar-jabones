import Link from "next/link";
import { ArrowUpRight, Award } from "lucide-react";
import { SanityImage } from "@/components/sanity-image";
import type { ProductSummary } from "@/sanity/queries";
import { cn } from "@/lib/utils";

/** Shared card surface: every card on the site lifts on hover; photos never zoom. */
export const cardSurface =
  "flex h-full flex-col rounded-[1.5rem] bg-card p-2 shadow-[0_0_0_1px_oklch(0.26_0.045_235/0.06),var(--shadow-soft)] outline-none transition-[transform,box-shadow] duration-700 ease-(--ease-fluid) hover:-translate-y-1 hover:shadow-[0_0_0_1px_oklch(0.26_0.045_235/0.1),var(--shadow-lift)] focus-visible:ring-2 focus-visible:ring-ring";

/** Arrow chip in the card's caption; turns ocean blue when the card is hovered. */
export function CardArrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-full bg-sand text-foreground transition-[background-color,color,transform] duration-500 ease-(--ease-fluid) group-hover/card:translate-x-0.5 group-hover/card:bg-primary group-hover/card:text-primary-foreground sm:size-9",
        className,
      )}
    >
      <ArrowUpRight className="size-4" strokeWidth={1.75} />
    </span>
  );
}

interface ProductCardProps {
  product: ProductSummary;
  /** Rendered width of the photo, for the srcset. */
  sizes: string;
  /** Photo box classes; defaults to a 4:5 portrait. */
  photoClassName?: string;
  showCategory?: boolean;
  /** Above-the-fold cards load first. */
  priority?: boolean;
}

export function ProductCard({ product, sizes, photoClassName, showCategory = true, priority }: ProductCardProps) {
  return (
    <Link href={`/productos/${product.slug}`} className={cn("group/card", cardSurface)}>
      <div className={cn("relative overflow-hidden rounded-[1rem] bg-sand", photoClassName ?? "aspect-[4/5]")}>
        {product.image ? <SanityImage image={product.image} sizes={sizes} priority={priority} /> : null}
      </div>
      <div className="flex flex-1 items-end justify-between gap-3 px-2 pb-1.5 pt-3.5 sm:px-2.5 sm:pt-4">
        <div className="min-w-0">
          <h3 className="font-display text-base font-semibold leading-snug sm:text-lg">{product.name}</h3>
          {showCategory || product.award ? (
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
              {showCategory ? product.category.name : null}
              {/* Full prize name lives on the product page; the card only flags it */}
              {product.award ? (
                <span title={product.award} className="inline-flex items-center gap-1 text-primary">
                  <Award className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
                  <span className="sr-only">{product.award}</span>
                  {showCategory ? null : "Premiado"}
                </span>
              ) : null}
            </p>
          ) : null}
        </div>
        <CardArrow />
      </div>
    </Link>
  );
}
