// Admin dashboard layout with sidebar navigation

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { UserRole } from "@/types/roles";
import Link from "next/link";
import { Package, ShoppingBag, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role !== UserRole.ADMIN) {
    redirect("/dashboard");
  }

  const navItems = [
    { href: "/admin", label: "Resumen", icon: Package },
    { href: "/admin/products", label: "Productos", icon: Package },
    { href: "/admin/orders", label: "Pedidos", icon: ShoppingBag },
    { href: "/admin/users", label: "Usuarios", icon: Users },
    { href: "/admin/settings", label: "Configuración", icon: Settings },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Panel de administración</h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    "hover:bg-slate-100"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="lg:col-span-3">{children}</main>
      </div>
    </div>
  );
}
