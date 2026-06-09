import { ProductGrid } from "@/components/shop/product-grid";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { getProducts } from "@/lib/get-products";

export const metadata = {
  title: "Jabones artesanales",
  description: "Descubrí nuestra selección de jabones inspirados en el mar.",
};

export default async function JabonesPage() {
  const products = await getProducts({ categorySlug: "jabones" });

  return (
    <PageShell>
      <PageHeader
        title="Jabones artesanales"
        subtitle="Texturas suaves, aromas frescos y diseños únicos para el cuidado diario."
      />
      <ProductGrid serverProducts={products} />
    </PageShell>
  );
}
