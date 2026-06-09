import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { query } from "@/lib/strapi";
import {
  pickAllStrapiImageUrls,
  productPopulateQueryString,
} from "@/lib/strapi/resolve-media-url";

interface StrapiCollectionResponse<TItem> {
  data: TItem[];
}

interface ProductCategoryFields {
  name?: string | null;
  slug?: string | null;
}

interface ProductFields {
  id?: number | string;
  documentId?: string;
  name: string;
  slug: string;
  price?: number | string | null;
  compareAtPrice?: number | string | null;
  description: unknown;
  shortDescription?: unknown;
  image?: unknown;
  stock?: number | null;
  trackInventory?: boolean | null;
  featured?: boolean | null;
  published?: boolean | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  size?: string | null;
  color?: string | null;
  product_category?: ProductCategoryFields | null;
}

interface StrapiItemV4<TFields> {
  id: number | string;
  attributes: TFields;
}

type StrapiItem<TFields> = (TFields & { id?: number | string }) | StrapiItemV4<TFields>;

function unwrapFields<TFields>(item: StrapiItem<TFields>): TFields | null {
  if (!item || typeof item !== "object") return null;
  if ("attributes" in item && item.attributes && typeof item.attributes === "object") {
    return item.attributes as TFields;
  }
  return item as unknown as TFields;
}

function unwrapId<TFields>(item: StrapiItem<TFields>, slug: string): string {
  if (item && typeof item === "object" && "documentId" in item) {
    const doc = (item as { documentId?: unknown }).documentId;
    if (typeof doc === "string" && doc) return doc;
  }
  if (item && typeof item === "object" && "id" in item) {
    const id = (item as { id?: unknown }).id;
    if (typeof id === "string" || typeof id === "number") return String(id);
  }
  return slug;
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

export interface ProductDetailModel {
  id: string;
  name: string;
  slug: string;
  price?: number;
  compareAtPrice?: number;
  description: BlocksContent | null;
  shortDescription: BlocksContent | null;
  images: string[];
  stock: number;
  trackInventory: boolean;
  featured: boolean;
  published: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
  size?: string | null;
  color?: string | null;
  category?: { name: string | null; slug: string | null } | null;
}

export async function getProductBySlug(slug: string): Promise<ProductDetailModel | null> {
  const qs =
    `filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&${productPopulateQueryString()}&pagination[limit]=1`;

  const res = await query<StrapiCollectionResponse<StrapiItem<ProductFields>>>(`/api/products?${qs}`);
  const first = res?.data?.[0];
  if (!first) return null;

  const fields = unwrapFields(first);
  if (!fields) return null;

  const price =
    fields.price === null || fields.price === undefined ? undefined : toPrice(fields.price);
  const priced = price !== undefined && price > 0;
  const compare =
    fields.compareAtPrice === null || fields.compareAtPrice === undefined
      ? undefined
      : toPrice(fields.compareAtPrice);

  return {
    id: unwrapId(first, slug),
    name: fields.name,
    slug: fields.slug,
    ...(priced && { price }),
    ...(priced && compare !== undefined && compare > 0 && { compareAtPrice: compare }),
    description: normalizeBlocks(fields.description),
    shortDescription: normalizeBlocks(fields.shortDescription),
    images: pickAllStrapiImageUrls(fields.image),
    stock: typeof fields.stock === "number" ? fields.stock : 0,
    trackInventory: fields.trackInventory === true,
    featured: fields.featured === true,
    published: fields.published === true,
    seoTitle: fields.seoTitle ?? null,
    seoDescription: fields.seoDescription ?? null,
    size: fields.size ?? null,
    color: fields.color ?? null,
    category: fields.product_category
      ? { name: fields.product_category.name ?? null, slug: fields.product_category.slug ?? null }
      : null,
  };
}

