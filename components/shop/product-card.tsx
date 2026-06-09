"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import {
  formatProductPrice,
  hasProductPrice,
  INSTAGRAM_HANDLE,
} from "@/lib/shop/product-pricing";

interface Product {
  id: string;
  name: string;
  slug: string;
  price?: number;
  compareAtPrice?: number;
  image?: string;
  category?: string;
  shortDescriptionText?: string;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const showPrice = hasProductPrice(product.price);
  const hasDiscount =
    showPrice &&
    product.compareAtPrice !== undefined &&
    product.compareAtPrice > product.price!;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.compareAtPrice! - product.price!) / product.compareAtPrice!) * 100,
      )
    : 0;
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="group h-full"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-shadow duration-300 hover:shadow-md">
        <Link href={`/productos/${product.slug}`} className="block">
          <div className="relative aspect-4/5 w-full overflow-hidden bg-muted">
            {product.image ? (
              // Plain img — reliable for local Strapi URLs in dev
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Sin imagen
              </div>
            )}
            {hasDiscount && (
              <Badge variant="destructive" className="absolute right-2.5 top-2.5">
                -{discountPercent}%
              </Badge>
            )}
          </div>
        </Link>

        <div className="flex flex-1 flex-col gap-2 px-4 py-4 sm:px-5 sm:py-5">
          <Link href={`/productos/${product.slug}`}>
            <h3 className="text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-base">
              {product.name}
            </h3>
          </Link>

          {product.shortDescriptionText ? (
            <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {product.shortDescriptionText}
            </p>
          ) : null}

          <div className="mt-auto pt-1">
            {showPrice ? (
              <div className="flex items-baseline gap-2">
                <p className="text-sm font-semibold text-foreground sm:text-base">
                  {formatProductPrice(product.price!)}
                </p>
                {hasDiscount && (
                  <p className="text-xs text-muted-foreground line-through sm:text-sm">
                    {formatProductPrice(product.compareAtPrice!)}
                  </p>
                )}
              </div>
            ) : (
              <Link
                href={`https://ig.me/m/${INSTAGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-primary transition-colors hover:underline sm:text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                Consultar por Instagram
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
