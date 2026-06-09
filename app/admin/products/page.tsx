// Admin products management page

import { Suspense } from "react";
import { ProductAdminList } from "@/components/admin/product-admin-list";
import { ProductAdminListSkeleton } from "@/components/admin/product-admin-list-skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Productos - Administración",
  description: "Gestionar productos",
};

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Productos</h2>
        <Link href="/admin/products/new">
          <Button>Nuevo producto</Button>
        </Link>
      </div>

      <div className="mt-8">
        <Suspense fallback={<ProductAdminListSkeleton />}>
          <ProductAdminList />
        </Suspense>
      </div>
    </div>
  );
}


