import { ProductGrid } from "@/components/shop/product-grid";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { getProducts } from "@/lib/get-products";

export const metadata = {
  title: "Resinas decorativas",
  description: "Piezas de resina artesanales con inspiración marina.",
};

export default async function ResinasPage() {
  const products = await getProducts({ categorySlug: "resinas" });

  return (
    <PageShell>
      <PageHeader
        title="Resinas decorativas"
        subtitle="Diseños en resina inspirados en el mar y creados a mano."
      />
      <ProductGrid serverProducts={products} />
    </PageShell>
  );
}
