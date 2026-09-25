import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { ProductFilters } from "@/components/shop/product-filters";
import { ProductGrid } from "@/components/shop/product-grid";
import { getCategories, getProducts } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Productos",
  description: "Explorá toda nuestra colección de jabones y resinas artesanales.",
};

export default async function ProductosPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <PageShell>
      <PageHeader
        title="Productos"
        subtitle="Colección completa de jabones y resinas artesanales, hechos con dedicación."
      />
      <ProductFilters categories={categories} />
      <ProductGrid products={products} />
    </PageShell>
  );
}
