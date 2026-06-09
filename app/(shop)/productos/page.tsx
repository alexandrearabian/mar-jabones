import { Suspense } from "react";
import { ProductGrid } from "@/components/shop/product-grid";
import { ProductFilters } from "@/components/shop/product-filters";
import { ProductGridSkeleton } from "@/components/shop/product-grid-skeleton";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { getProducts } from "@/lib/get-products";

export const metadata = {
  title: "Productos",
  description: "Explorá toda nuestra colección de jabones y resinas artesanales.",
};

interface SearchParams {
  categoria?: string;
  busqueda?: string;
  pagina?: string;
}

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const category = params.categoria;
  const search = params.busqueda;
  const page = parseInt(params.pagina || "1");
  const products = await getProducts({
    categorySlug: category,
    search,
    page,
    pageSize: 12,
  });

  return (
    <PageShell>
      <PageHeader
        title="Productos"
        subtitle="Colección completa de jabones y resinas artesanales, hechos con dedicación."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Suspense fallback={null}>
            <ProductFilters selectedCategory={category} />
          </Suspense>
        </div>
        <div className="lg:col-span-3">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid serverProducts={products} />
          </Suspense>
        </div>
      </div>
    </PageShell>
  );
}
