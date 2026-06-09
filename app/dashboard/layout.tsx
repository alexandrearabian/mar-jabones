// Dashboard layout with sidebar navigation

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Package, ShoppingBag, User, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const navItems = [
    { href: "/dashboard", label: "Resumen", icon: Package },
    { href: "/dashboard/orders", label: "Mis pedidos", icon: ShoppingBag },
    { href: "/dashboard/profile", label: "Perfil", icon: User },
    { href: "/dashboard/addresses", label: "Direcciones", icon: MapPin },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
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
