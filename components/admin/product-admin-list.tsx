// Admin product list component
// Displays products with edit/delete actions

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ProductAdminListSkeleton } from "./product-admin-list-skeleton";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  published: boolean;
  category?: string;
}

export function ProductAdminList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        // TODO: Replace with actual API endpoint
        // const response = await fetch("/api/admin/products");
        // const data = await response.json();
        // setProducts(data.products);
        setProducts([]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <ProductAdminListSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-600">No hay productos</p>
        <Link href="/admin/products/new">
          <Button className="mt-4">Crear primer producto</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Card key={product.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{product.name}</h3>
                  <Badge
                    variant={product.published ? "success" : "secondary"}
                  >
                    {product.published ? "Publicado" : "Borrador"}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {product.category || "Sin categoría"}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  ${product.price.toLocaleString("es-AR")} • Stock: {product.stock}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/products/${product.id}/edit`}>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // TODO: Delete product
                    console.log("Delete product:", product.id);
                  }}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


