// User orders history page
// Read-only list of past orders

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { OrderList } from "@/components/dashboard/order-list";
import { OrderListSkeleton } from "@/components/dashboard/order-list-skeleton";
import { Suspense } from "react";

export const metadata = {
  title: "Mis pedidos",
  description: "Historial de tus pedidos",
};

export default async function OrdersPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Mis pedidos</h1>
      <p className="mt-2 text-slate-600">
        Revisa el estado de tus pedidos anteriores
      </p>

      <div className="mt-8">
        <Suspense fallback={<OrderListSkeleton />}>
          <OrderList userId={session.user.id} />
        </Suspense>
      </div>
    </div>
  );
}


