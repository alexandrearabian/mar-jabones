// Admin dashboard overview page
// Shows admin stats and quick actions

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserRole } from "@/types/roles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, ShoppingBag, Users, TrendingUp } from "lucide-react";

export const metadata = {
  title: "Administración",
  description: "Panel de administración",
};

export default async function AdminPage() {
  const session = await auth();

  if (!session || session.user.role !== UserRole.ADMIN) {
    redirect("/dashboard");
  }

  // TODO: Fetch admin stats from API
  // const stats = await fetchAdminStats();

  return (
    <div>
      <h2 className="text-2xl font-semibold">Resumen</h2>
      <p className="mt-2 text-slate-600">
        Vista general del negocio
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Package className="h-5 w-5" />
              Productos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="mt-2 text-sm text-slate-600">Total productos</p>
            <Link href="/admin/products">
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Gestionar
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShoppingBag className="h-5 w-5" />
              Pedidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="mt-2 text-sm text-slate-600">Pedidos totales</p>
            <Link href="/admin/orders">
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Ver todos
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-5 w-5" />
              Usuarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="mt-2 text-sm text-slate-600">Usuarios registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-5 w-5" />
              Ventas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$0</p>
            <p className="mt-2 text-sm text-slate-600">Ingresos totales</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
