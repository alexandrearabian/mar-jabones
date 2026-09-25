import Link from "next/link";
import { Award } from "lucide-react";
import { SanityImage } from "@/components/sanity-image";
import type { ProductSummary } from "@/sanity/queries";

export function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <article className="group h-full">
      <Link
        href={`/productos/${product.slug}`}
        className="block h-full rounded-[1.75rem] bg-foreground/[0.03] p-1.5 ring-1 ring-foreground/5 transition-[box-shadow,transform] duration-700 ease-(--ease-fluid) group-hover:-translate-y-1 group-hover:shadow-(--shadow-lift)"
      >
        <div className="flex h-full flex-col overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-card shadow-[inset_0_1px_1px_oklch(1_0_0/0.6)]">
          <div className="relative aspect-4/5 w-full overflow-hidden bg-muted">
            {product.image ? (
              <SanityImage
                image={product.image}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] ease-(--ease-fluid) group-hover:scale-[1.06]"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Sin imagen
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-1.5 px-4 py-4 sm:px-5 sm:py-5">
            <h3 className="text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-base">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground sm:text-sm">{product.category.name}</p>
            {product.award ? (
              <p className="mt-auto flex items-center gap-1.5 pt-2 text-xs font-medium text-primary">
                <Award className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
                {product.award}
              </p>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
