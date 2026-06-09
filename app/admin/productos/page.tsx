// Admin products management page

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Productos - Administración",
  description: "Gestionar productos",
};

export default async function AdminProductsPage() {
  // Prisma removed: fetch products from Strapi (or your API).
  const products: Array<{
    id: string;
    name: string;
    price: number;
    published?: boolean;
    category?: { name?: string } | null;
  }> = [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Productos</h2>
        <Link href="/admin/productos/nuevo">
          <Button>Nuevo producto</Button>
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-slate-600">
                      {product.category?.name || "Sin categoría"}
                    </p>
                    <p className="text-sm text-slate-600">
                      ${Number(product.price).toLocaleString("es-AR")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      product.published
                        ? "bg-green-100 text-green-800"
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {product.published ? "Publicado" : "Borrador"}
                  </span>
                  <Link href={`/admin/productos/${product.id}/editar`}>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

