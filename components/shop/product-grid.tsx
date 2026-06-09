"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "./product-card";
import { ProductGridSkeleton } from "./product-grid-skeleton";
import {
  buildProductsQueryString,
  parseProductsListJson,
  type StrapiProductCard,
} from "@/lib/strapi/parse-products";
import { getStrapiUrl } from "@/lib/strapi/config";

interface ProductGridProps {
  category?: string;
  search?: string;
  page?: number;
  featured?: boolean;
  limit?: number;
  serverProducts?: StrapiProductCard[];
  emptyMessage?: string;
  loadErrorMessage?: string;
}

export function ProductGrid({
  category,
  search,
  page = 1,
  featured,
  limit,
  serverProducts,
  emptyMessage = "No se encontraron productos",
  loadErrorMessage = "Error al cargar productos",
}: ProductGridProps) {
  const fromServer = serverProducts !== undefined;
  const [products, setProducts] = useState<StrapiProductCard[]>(() => serverProducts ?? []);
  const [loading, setLoading] = useState(!fromServer);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (fromServer) {
      setProducts(serverProducts ?? []);
      setLoading(false);
      setError(null);
      return;
    }

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const base = getStrapiUrl();
        if (!base) {
          setProducts([]);
          setError(loadErrorMessage);
          return;
        }

        const qs = buildProductsQueryString({
          page,
          categorySlug: category,
          search,
          featuredOnly: featured === true,
          ...(limit !== undefined ? { limit } : {}),
        });

        const res = await fetch(`${base}/api/products?${qs}`);
        if (!res.ok) {
          throw new Error(`Strapi ${res.status}`);
        }
        const json: unknown = await res.json();
        const list = parseProductsListJson(json);
        setProducts(list ?? []);
      } catch (err) {
        setError(loadErrorMessage);
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    void fetchProducts();
  }, [
    category,
    search,
    page,
    featured,
    limit,
    fromServer,
    serverProducts,
    loadErrorMessage,
  ]);

  if (loading) {
    return <ProductGridSkeleton />;
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  const display = limit ? products.slice(0, limit) : products;

  if (display.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {display.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
