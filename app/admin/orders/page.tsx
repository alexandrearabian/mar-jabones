// Admin orders management page

import { Suspense } from "react";
import { OrderAdminList } from "@/components/admin/order-admin-list";
import { OrderAdminListSkeleton } from "@/components/admin/order-admin-list-skeleton";

export const metadata = {
  title: "Pedidos - Administración",
  description: "Gestionar pedidos",
};

export default function AdminOrdersPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Pedidos</h2>
      <div className="mt-8">
        <Suspense fallback={<OrderAdminListSkeleton />}>
          <OrderAdminList />
        </Suspense>
      </div>
    </div>
  );
}


