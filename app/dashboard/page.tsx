// Dashboard overview page
// Shows user summary and quick stats

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Package, MapPin } from "lucide-react";

export const metadata = {
  title: "Mi cuenta",
  description: "Panel de control de tu cuenta",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // TODO: Fetch user stats from API
  // const stats = await fetchUserStats(session.user.id);

  return (
    <div>
      <h1 className="text-3xl font-bold">Bienvenido, {session.user.name || "Usuario"}</h1>
      <p className="mt-2 text-slate-600">
        Gestiona tu cuenta y revisa tus pedidos
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Mis pedidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="mt-2 text-sm text-slate-600">Pedidos totales</p>
            <Link href="/dashboard/orders">
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Ver todos
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Direcciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="mt-2 text-sm text-slate-600">Direcciones guardadas</p>
            <Link href="/dashboard/addresses">
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Gestionar
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Perfil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">Actualiza tu información</p>
            <Link href="/dashboard/profile">
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Editar perfil
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
