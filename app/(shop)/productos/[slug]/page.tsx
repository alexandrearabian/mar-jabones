import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { ProductDetail } from "@/components/shop/product-detail";
import { ProductFilters } from "@/components/shop/product-filters";
import { ProductGrid } from "@/components/shop/product-grid";
import { getSlugPage, getSlugs } from "@/sanity/queries";

// /productos/<slug> serves both category listings and product pages from a single query.
// Categories win on a clash; Sanity slugs are unique per type, not across types.

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { category, product } = await getSlugPage(slug);
  if (category) {
    return { title: category.name, description: category.description ?? undefined };
  }
  if (!product) return { title: "Producto no encontrado" };

  const cover = product.images[0];
  return {
    title: product.name,
    description: `${product.name}: ${product.category.name.toLowerCase()} artesanales de Mar D Jabones. Consultá precio y disponibilidad por Instagram.`,
    openGraph: cover ? { images: [{ url: `${cover.url}?w=1200&h=630&fit=crop`, alt: cover.alt }] } : undefined,
  };
}

export default async function ProductosSlugPage({ params }: Props) {
  const { slug } = await params;
  const { category, product, categories } = await getSlugPage(slug);

  if (category) {
    return (
      <>
        <PageHeader title={category.name} subtitle={category.description ?? undefined}>
          <ProductFilters categories={categories} active={category.slug} />
        </PageHeader>
        <PageShell belowHeader>
          <ProductGrid products={category.products} showCategory={false} priorityCount={4} />
        </PageShell>
      </>
    );
  }

  if (!product) notFound();

  return (
    <PageShell>
      <ProductDetail product={product} />
    </PageShell>
  );
}
