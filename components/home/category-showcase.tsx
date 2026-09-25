import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { SanityImage } from "@/components/sanity-image";
import type { Category } from "@/sanity/queries";

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          as="h2"
          title="Categorías"
          subtitle="Explorá jabones y resinas artesanales."
          align="left"
          className="mb-12 sm:mb-16"
        />

        {/* Asymmetric 7/5 rhythm; the narrow column drops down for an offset feel */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          {categories.map((category, i) => {
            const wide = i % 2 === 0;
            return (
              <Reveal
                key={category._id}
                delay={wide ? 0 : 0.12}
                className={wide ? "md:col-span-7" : "md:col-span-5 md:mt-24"}
              >
                <Link
                  href={`/productos/${category.slug}`}
                  className="group block rounded-[2rem] bg-foreground/[0.03] p-1.5 ring-1 ring-foreground/5 transition-shadow duration-700 ease-(--ease-fluid) hover:shadow-(--shadow-lift)"
                >
                  <div className="overflow-hidden rounded-[calc(2rem-0.375rem)] bg-card shadow-[inset_0_1px_1px_oklch(1_0_0/0.6)]">
                    <div className={`relative w-full overflow-hidden bg-muted ${wide ? "aspect-4/3" : "aspect-4/5"}`}>
                      {category.image ? (
                        <SanityImage
                          image={category.image}
                          fill
                          sizes={wide ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 42vw, 100vw"}
                          className="object-cover transition-transform duration-[1200ms] ease-(--ease-fluid) group-hover:scale-[1.05]"
                        />
                      ) : null}
                    </div>
                    <div className="flex items-start justify-between gap-6 p-6 sm:p-8">
                      <div className="space-y-3">
                        <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">{category.name}</h3>
                        {category.description ? (
                          <p className="max-w-[48ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {category.description}
                          </p>
                        ) : null}
                      </div>
                      <span
                        aria-hidden
                        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-foreground/5 text-foreground transition-all duration-500 ease-(--ease-fluid) group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        <ArrowUpRight className="size-5" strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
