import { cache } from "react";
import { strapiGet, StrapiRequestError } from "./client";
import { buildProductsQueryString, parseProductsListJson, type StrapiProductCard } from "./parse-products";

export type FeaturedProductCard = StrapiProductCard;

async function fetchFeaturedFromStrapi(limit: number): Promise<FeaturedProductCard[]> {
  const qs = buildProductsQueryString({ featuredOnly: true, limit });
  const json = await strapiGet<unknown>(`/api/products?${qs}`);
  const list = parseProductsListJson(json);
  if (!list) {
    throw new StrapiRequestError("Respuesta de productos inválida", 500);
  }
  return list;
}

export const getFeaturedProducts = cache(async (limit: number): Promise<FeaturedProductCard[]> => {
  try {
    return await fetchFeaturedFromStrapi(limit);
  } catch (e) {
    if (e instanceof StrapiRequestError && e.status === 0) {
      return [];
    }
    console.warn("[strapi] getFeaturedProducts:", e);
    return [];
  }
});
