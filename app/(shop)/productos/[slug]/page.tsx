import { Suspense } from "react";
import { ProductDetail } from "@/components/shop/product-detail";
import { ProductDetailSkeleton } from "@/components/shop/product-detail-skeleton";
import { PageShell } from "@/components/layout/page-shell";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/get-product-by-slug";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.seoTitle ?? product.name,
    description: product.seoDescription ?? product.name,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <PageShell>
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail
          slug={slug}
          product={{
            id: product.id,
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            images: product.images,
            category: product.category,
            stock: product.stock,
            size: product.size ?? null,
            color: product.color ?? null,
          }}
        />
      </Suspense>
    </PageShell>
  );
}
