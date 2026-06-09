import { z } from "zod";
import { pickFirstStrapiImageUrl, productPopulateQueryString } from "./resolve-media-url";
import type { BlocksContent } from "@strapi/blocks-react-renderer";

const productCategorySchema = z
  .object({
    name: z.string().nullable().optional(),
    slug: z.string().nullable().optional(),
  })
  .passthrough();

const productRowSchema = z
  .object({
    documentId: z.string().optional(),
    id: z.union([z.number(), z.string()]).optional(),
    name: z.string(),
    slug: z.string(),
    price: z.union([z.number(), z.string(), z.null()]).optional(),
    compareAtPrice: z.union([z.number(), z.string(), z.null()]).optional(),
    shortDescription: z.unknown().optional().nullable(),
    image: z.unknown().optional().nullable(),
    product_category: z.union([productCategorySchema, z.null()]).optional(),
    published: z.union([z.boolean(), z.null()]).optional(),
  })
  .passthrough();

const productsListSchema = z.object({ data: z.array(productRowSchema) });

export interface StrapiProductCard {
  id: string;
  name: string;
  slug: string;
  price?: number;
  compareAtPrice?: number;
  image?: string;
  category?: string;
  categorySlug?: string;
  shortDescriptionText?: string;
}

function toPrice(v: unknown): number {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isNaN(n) ? 0 : n;
  }
  return 0;
}

function normalizeBlocks(input: unknown): BlocksContent | null {
  return Array.isArray(input) ? (input as BlocksContent) : null;
}

function extractPlainTextFromBlocks(content: BlocksContent): string {
  const parts: string[] = [];
  const walk = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const obj = node as Record<string, unknown>;
    if (obj.type === "text" && typeof obj.text === "string") {
      parts.push(obj.text);
    }
    const children = obj.children;
    if (Array.isArray(children)) {
      for (const c of children) walk(c);
    }
  };
  for (const root of content) walk(root);
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

function mapProduct(p: z.infer<typeof productRowSchema>): StrapiProductCard {
  const id =
    p.documentId !== undefined
      ? p.documentId
      : p.id !== undefined
        ? String(p.id)
        : p.slug;
  const compareRaw = p.compareAtPrice;
  const compare =
    compareRaw === null || compareRaw === undefined ? undefined : toPrice(compareRaw);
  const blocks = normalizeBlocks(p.shortDescription);
  const shortDescriptionText = blocks ? extractPlainTextFromBlocks(blocks) : undefined;
  const price = p.price === null || p.price === undefined ? undefined : toPrice(p.price);
  const priced = price !== undefined && price > 0;

  return {
    id,
    name: p.name,
    slug: p.slug,
    ...(priced && { price }),
    ...(priced && compare !== undefined && compare > 0 && { compareAtPrice: compare }),
    image: pickFirstStrapiImageUrl(p.image),
    category: p.product_category?.name ?? undefined,
    categorySlug: p.product_category?.slug ?? undefined,
    ...(shortDescriptionText ? { shortDescriptionText } : {}),
  };
}

export function parseProductsListJson(json: unknown): StrapiProductCard[] | null {
  const parsed = productsListSchema.safeParse(json);
  if (!parsed.success) return null;
  return parsed.data.data.map(mapProduct);
}

export interface ShopProductsQuery {
  page?: number;
  pageSize?: number;
  categorySlug?: string;
  search?: string;
  featuredOnly?: boolean;
  limit?: number;
}

export function buildProductsQueryString(q: ShopProductsQuery): string {
  const params = new URLSearchParams(productPopulateQueryString());
  params.set("sort", "createdAt:desc");

  if (q.featuredOnly) {
    params.set("filters[featured][$eq]", "true");
  }
  if (q.categorySlug) {
    params.set("filters[product_category][slug][$eq]", q.categorySlug);
  }
  if (q.search?.trim()) {
    params.set("filters[name][$containsi]", q.search.trim());
  }
  if (q.limit !== undefined) {
    params.set("pagination[limit]", String(q.limit));
  } else if (q.featuredOnly) {
    params.set("pagination[limit]", "12");
  } else {
    const page = q.page ?? 1;
    const pageSize = q.pageSize ?? 12;
    params.set("pagination[page]", String(page));
    params.set("pagination[pageSize]", String(pageSize));
  }

  return params.toString();
}
