import { getHomeInfo } from "@/lib/get-home-info";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { HeroCarousel } from "@/components/home/hero-carousel";
import Link from "next/link";
import { getProductCategories } from "@/lib/get-product-categories";
import { PageHeader } from "@/components/layout/page-header";

export default async function HomePage() {
  const [{ title, description, carousel }, categories] = await Promise.all([
    getHomeInfo(),
    getProductCategories(),
  ]);

  return (
    <div>
      {carousel?.images?.length ? (
        <section className="w-full">
          <HeroCarousel
            title={carousel.title || title}
            subtitle={carousel.subtitle}
            description={carousel.description ?? description}
            images={carousel.images}
          />
        </section>
      ) : null}

      {categories.length > 0 ? (
        <section className="bg-background py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <PageHeader
              as="h2"
              title="Categorías"
              subtitle="Explorá jabones y resinas artesanales."
              align="left"
              className="mb-10 sm:mb-12"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/productos/${cat.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative aspect-16/10 min-h-[180px] w-full overflow-hidden bg-muted">
                    {cat.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        {cat.name}
                      </div>
                    )}
                  </div>
                  <div className="space-y-3 p-6">
                    <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                      {cat.name}
                    </h3>
                    {cat.description && cat.description.length > 0 ? (
                      <div className="text-sm text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-foreground [&_ol]:ml-5 [&_ol]:list-decimal [&_p]:leading-relaxed [&_ul]:ml-5 [&_ul]:list-disc">
                        <BlocksRenderer content={cat.description} />
                      </div>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
