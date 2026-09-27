import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { ProductFilters } from "@/components/shop/product-filters";
import { ProductGrid } from "@/components/shop/product-grid";
import { getCategories, getProducts } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Productos",
  description: "Todos mis jabones y resinas artesanales, hechos a mano en Buenos Aires.",
  alternates: { canonical: "/productos" },
};

export default async function ProductosPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <>
      <PageHeader
        title="Productos"
        subtitle="Todos mis jabones y resinas, hechos a mano uno por uno."
      >
        <ProductFilters categories={categories} active={null} />
      </PageHeader>
      <PageShell belowHeader>
        <ProductGrid products={products} priorityCount={4} />
      </PageShell>
    </>
  );
}
