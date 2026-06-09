import { query, StrapiConnectionError, StrapiRequestError } from "@/lib/strapi";
import { buildProductsQueryString, parseProductsListJson, type StrapiProductCard } from "@/lib/strapi/parse-products";

export async function getProducts(input: {
  categorySlug?: string;
  search?: string;
  featuredOnly?: boolean;
  limit?: number;
  page?: number;
  pageSize?: number;
}): Promise<StrapiProductCard[]> {
  const qs = buildProductsQueryString({
    categorySlug: input.categorySlug,
    search: input.search,
    featuredOnly: input.featuredOnly,
    limit: input.limit,
    page: input.page,
    pageSize: input.pageSize,
  });

  try {
    const json = await query<unknown>(`/api/products?${qs}`);
    return parseProductsListJson(json) ?? [];
  } catch (err) {
    if (err instanceof StrapiConnectionError || err instanceof StrapiRequestError) {
      console.warn("[strapi] getProducts:", err.message);
      return [];
    }
    throw err;
  }
}

