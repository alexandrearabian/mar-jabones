import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { pickStrapiMediaUrl } from "@/lib/strapi/media";
import { query, STRAPI_BASE_URL, StrapiConnectionError, StrapiRequestError } from "@/lib/strapi";

interface StrapiCollectionResponse<TItem> {
  data: TItem[];
}

interface StrapiCategoryItemV4<TFields> {
  id: number | string;
  attributes: TFields;
}

type StrapiCategoryItem<TFields> = (TFields & { id?: number | string }) | StrapiCategoryItemV4<TFields>;

interface ProductCategoryFields {
  name: string;
  slug: string;
  description?: BlocksContent | null;
  image?: unknown;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: BlocksContent | null;
  image: string | null;
}

function toAbsoluteMediaUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = STRAPI_BASE_URL.replace(/\/+$/, "");
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${base}${path}`;
}

function unwrapCategoryFields(item: StrapiCategoryItem<ProductCategoryFields>): ProductCategoryFields | null {
  if (!item || typeof item !== "object") return null;
  if ("attributes" in item && item.attributes && typeof item.attributes === "object") {
    return item.attributes as ProductCategoryFields;
  }
  return item as unknown as ProductCategoryFields;
}

function unwrapCategoryId(item: StrapiCategoryItem<ProductCategoryFields>): string {
  if (!item || typeof item !== "object") return "";
  if ("id" in item && (typeof item.id === "number" || typeof item.id === "string")) {
    return String(item.id);
  }
  return "";
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  try {
    const res = await query<StrapiCollectionResponse<StrapiCategoryItem<ProductCategoryFields>>>(
      "/api/product-categories?populate[0]=image",
    );

    if (!res?.data || !Array.isArray(res.data)) return [];

    const out: ProductCategory[] = [];
    for (const raw of res.data) {
      const fields = unwrapCategoryFields(raw);
      if (!fields?.name || !fields.slug) continue;

      const mediaPath = pickStrapiMediaUrl(fields.image);
      const image = mediaPath ? toAbsoluteMediaUrl(mediaPath) : null;

      out.push({
        id: unwrapCategoryId(raw) || fields.slug,
        name: fields.name,
        slug: fields.slug,
        description: Array.isArray(fields.description)
          ? (fields.description as BlocksContent)
          : null,
        image,
      });
    }

    return out;
  } catch (err) {
    if (err instanceof StrapiConnectionError || err instanceof StrapiRequestError) {
      console.warn("[strapi] getProductCategories:", err.message);
      return [];
    }
    throw err;
  }
}

