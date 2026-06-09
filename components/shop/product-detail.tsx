// Product detail component
// Displays full product information with optional price and Instagram inquiry CTA

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram } from "lucide-react";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { isPrivateOrLocalUrl } from "@/lib/is-private-url";
import {
  formatProductPrice,
  hasProductPrice,
  INSTAGRAM_HANDLE,
} from "@/lib/shop/product-pricing";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: BlocksContent | null;
  price?: number;
  compareAtPrice?: number;
  images: string[];
  category?: { name: string | null; slug: string | null } | null;
  stock: number;
  size?: string | null;
  color?: string | null;
}

interface ProductDetailProps {
  slug: string;
  product?: Product | null;
}

export function ProductDetail({ product: productProp }: ProductDetailProps) {
  const [product] = useState<Product | null>(productProp ?? null);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Producto no encontrado</p>
      </div>
    );
  }

  const showPrice = hasProductPrice(product.price);
  const hasDiscount =
    showPrice &&
    product.compareAtPrice !== undefined &&
    product.compareAtPrice > product.price!;
  const bypassOptimization =
    product.images[selectedImage] ? isPrivateOrLocalUrl(product.images[selectedImage]) : false;
  const instagramUrl = `https://ig.me/m/${INSTAGRAM_HANDLE}`;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Product Images */}
      <div>
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
          {product.images[selectedImage] ? (
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
              unoptimized={bypassOptimization}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Sin imagen
            </div>
          )}
        </div>
        {product.images.length > 1 && (
          <div className="mt-4 grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-border hover:border-muted"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} - Vista ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized={isPrivateOrLocalUrl(image)}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div>
        {product.category?.name && (
          <Badge variant="secondary" className="mb-4">
            {product.category.name}
          </Badge>
        )}

        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {product.name}
        </h1>

        {showPrice ? (
          <div className="mt-4">
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-semibold">{formatProductPrice(product.price!)}</p>
              {hasDiscount && (
                <>
                  <p className="text-xl text-muted-foreground line-through">
                    {formatProductPrice(product.compareAtPrice!)}
                  </p>
                  <Badge variant="destructive">
                    {Math.round(
                      ((product.compareAtPrice! - product.price!) / product.compareAtPrice!) * 100,
                    )}
                    % OFF
                  </Badge>
                </>
              )}
            </div>
          </div>
        ) : null}

        <div className="mt-6">
          {product.description && product.description.length > 0 ? (
            <div className="text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-foreground [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_ol]:ml-5 [&_ol]:list-decimal [&_p]:leading-relaxed [&_ul]:ml-5 [&_ul]:list-disc">
              <BlocksRenderer content={product.description} />
            </div>
          ) : null}
        </div>

        {product.size || product.color ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {product.size ? <Badge variant="outline">Tamaño: {product.size}</Badge> : null}
            {product.color ? <Badge variant="outline">Color: {product.color}</Badge> : null}
          </div>
        ) : null}

        <div className="mt-8">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <Instagram className="size-5" />
              Consultar por Instagram
            </Link>
          </Button>
        </div>

        <Card className="mt-8">
          <CardContent className="pt-6">
            <h3 className="mb-2 font-semibold">Información adicional</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {showPrice ? (
                <li>• También podés consultar disponibilidad por Instagram</li>
              ) : (
                <li>• Consultá disponibilidad y precio por Instagram</li>
              )}
              <li>• Producto artesanal hecho a mano</li>
              <li>• Podés personalizar tamaño y color según disponibilidad</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
