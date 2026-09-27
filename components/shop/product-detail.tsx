import Link from "next/link";
import { ArrowLeft, Award, Check } from "lucide-react";
import type { Product } from "@/sanity/queries";
import { InstagramCta } from "./instagram-cta";
import { ProductGallery } from "./product-gallery";
import { ProductGrid } from "./product-grid";

const NOTES = [
  "Hecho a mano, en pequeñas tandas",
  "Tamaño, color y aroma a pedido, según disponibilidad",
  "Recuerdos para bautismos, casamientos y empresas",
];

export function ProductDetail({ product }: { product: Product }) {
  const categoryHref = `/productos/${product.category.slug}`;

  return (
    <>
      <Link
        href={categoryHref}
        className="mb-6 inline-flex items-center gap-2 text-[15px] text-muted-foreground transition-colors hover:text-foreground md:mb-8"
      >
        <ArrowLeft className="size-4" strokeWidth={1.75} aria-hidden />
        {product.category.name}
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
        {/* No entrance fade here: the first photo is the page's largest paint */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        <div className="self-start lg:sticky lg:top-28 lg:col-span-5 lg:pt-2">
          <h1 className="heading-2 animate-enter">{product.name}</h1>

          {product.award ? (
            <p className="mt-4 flex items-center gap-2 font-medium text-primary animate-enter [--delay:60ms]">
              <Award className="size-5 shrink-0" strokeWidth={1.75} aria-hidden />
              {product.award}
            </p>
          ) : null}

          {product.sizes?.length || product.ingredients ? (
            <dl className="mt-8 space-y-6 animate-enter [--delay:120ms]">
              {product.sizes?.length ? (
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Tamaños</dt>
                  <dd className="mt-2.5 flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <span key={size} className="chip">
                        {size}
                      </span>
                    ))}
                  </dd>
                </div>
              ) : null}
              {product.ingredients ? (
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Ingredientes</dt>
                  <dd className="mt-1.5 max-w-[52ch] text-lg leading-relaxed">{product.ingredients}</dd>
                </div>
              ) : null}
            </dl>
          ) : null}

          <div className="mt-8 animate-enter [--delay:180ms]">
            <InstagramCta productName={product.name} variant="inline" />
          </div>

          <ul className="mt-10 space-y-3 border-t border-border pt-8 text-[15px] text-muted-foreground animate-enter [--delay:240ms]">
            {NOTES.map((note) => (
              <li key={note} className="flex items-start gap-3">
                <Check className="mt-1 size-4 shrink-0 text-primary" strokeWidth={2} aria-hidden />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <InstagramCta productName={product.name} variant="sticky" />

      {product.related.length > 0 ? (
        <section aria-labelledby="relacionados" className="mt-20 border-t border-border pt-14 md:mt-28 md:pt-20">
          <div className="mb-8 flex items-end justify-between gap-4 md:mb-10">
            <h2 id="relacionados" className="heading-2">
              Más {product.category.name.toLowerCase()}
            </h2>
            <Link href={categoryHref} className="link-underline shrink-0 text-[15px] font-medium">
              Ver todos
            </Link>
          </div>
          <ProductGrid products={product.related} showCategory={false} columns={4} />
        </section>
      ) : null}
    </>
  );
}
