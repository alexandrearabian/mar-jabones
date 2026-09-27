import Link from "next/link";
import { SanityImage } from "@/components/sanity-image";
import { CardArrow, cardSurface } from "@/components/shop/product-card";
import type { Category } from "@/sanity/queries";
import { cn } from "@/lib/utils";

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  return (
    <section aria-labelledby="categorias" className="section-y">
      <div className="container-page">
        <div className="reveal mb-10 md:mb-14">
          <h2 id="categorias" className="heading-2">
            Categorías
          </h2>
          <p className="lead mt-4">Rosas, rulos, corazones y caracolas: jabones y resinas hechos a mano, uno por uno.</p>
        </div>

        {/* Equal columns, aligned tops and bottoms; single column on mobile */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
          {categories.map((category) => (
            <Link key={category._id} href={`/productos/${category.slug}`} className={cn("group/card", cardSurface)}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-sand">
                {category.image ? (
                  <SanityImage image={category.image} sizes="(min-width: 1280px) 600px, (min-width: 768px) 46vw, 100vw" />
                ) : null}
              </div>
              <div className="flex flex-1 items-end justify-between gap-6 px-3 pb-2 pt-5 sm:px-4 sm:pb-3">
                <div>
                  <h3 className="heading-3">{category.name}</h3>
                  {category.description ? (
                    <p className="mt-1.5 max-w-[46ch] leading-relaxed text-muted-foreground">{category.description}</p>
                  ) : null}
                  <p className="mt-3 text-sm font-medium tabular-nums text-primary">
                    {category.productCount} {category.productCount === 1 ? "producto" : "productos"}
                  </p>
                </div>
                <CardArrow className="sm:size-11" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
