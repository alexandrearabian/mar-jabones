import Link from "next/link";
import { Award, Check, Instagram } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import type { Product } from "@/sanity/queries";
import { ProductGallery } from "./product-gallery";

const NOTES = [
  "Consultá disponibilidad y precio por Instagram",
  "Producto artesanal hecho a mano",
  "Podés personalizar tamaño y color según disponibilidad",
];

export function ProductDetail({ product }: { product: Product }) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
      <Reveal className="lg:col-span-7">
        <ProductGallery images={product.images} />
      </Reveal>

      <div className="self-start lg:sticky lg:top-24 lg:col-span-5 lg:pt-4">
        <Reveal delay={0.1}>
          <Link href={`/productos/${product.category.slug}`}>
            <Badge className="mb-5 transition-colors hover:bg-accent">{product.category.name}</Badge>
          </Link>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tighter text-foreground sm:text-5xl">
            {product.name}
          </h1>
          {product.award ? (
            <p className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
              <Award className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
              {product.award}
            </p>
          ) : null}
        </Reveal>

        {product.sizes?.length || product.ingredients ? (
          <Reveal delay={0.2}>
            <dl className="mt-8 space-y-5 text-sm">
              {product.sizes?.length ? (
                <div>
                  <dt className="mb-2 font-medium text-foreground">Tamaños</dt>
                  <dd className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <Badge key={size} variant="outline">
                        {size}
                      </Badge>
                    ))}
                  </dd>
                </div>
              ) : null}
              {product.ingredients ? (
                <div>
                  <dt className="mb-1 font-medium text-foreground">Ingredientes</dt>
                  <dd className="max-w-[60ch] leading-relaxed text-muted-foreground">{product.ingredients}</dd>
                </div>
              ) : null}
            </dl>
          </Reveal>
        ) : null}

        <Reveal delay={0.3} className="mt-8">
          <Button asChild size="lg" className="group w-full sm:w-auto">
            <a href={site.instagram.messageUrl} target="_blank" rel="noopener noreferrer">
              <Instagram
                className="size-5 transition-transform duration-500 ease-(--ease-fluid) group-hover:-rotate-6 group-hover:scale-110"
                strokeWidth={1.75}
              />
              Consultar por Instagram
            </a>
          </Button>
        </Reveal>

        <Reveal delay={0.4} className="mt-10 border-t border-border/70 pt-8">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Información adicional</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {NOTES.map((note) => (
              <li key={note} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-3" strokeWidth={2.25} />
                </span>
                {note}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
