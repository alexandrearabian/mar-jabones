import { query, STRAPI_BASE_URL, StrapiConnectionError, StrapiRequestError } from "./strapi";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { pickStrapiMediaUrl, pickStrapiMediaUrls } from "@/lib/strapi/media";

interface StrapiHomeAttributes {
  title: string;
  // Rich text (Blocks) from Strapi
  description: BlocksContent | null;
  // Media can be returned in different shapes across Strapi versions/config.
  cover?: unknown;
  carousel?: unknown;
}

interface StrapiSingleTypeResponse<TAttributes> {
  data: {
    id: number | string;
    attributes?: TAttributes;
  } | null;
}

function unwrapSingleType<TAttributes>(
  response: StrapiSingleTypeResponse<TAttributes>,
): TAttributes | null {
  const data = response.data;
  if (!data) return null;
  // Strapi v4: { data: { attributes: {...} } }
  if (data.attributes && typeof data.attributes === "object") return data.attributes;
  // Strapi v5 often returns the fields directly on `data`
  return data as unknown as TAttributes;
}

function normalizeBlocksContent(input: unknown): BlocksContent | null {
  return Array.isArray(input) ? (input as BlocksContent) : null;
}

function resolveCoverUrl(attributes: StrapiHomeAttributes): string | null {
  // Works with:
  // - v5 media objects/arrays: { url }, [{ url }]
  // - v4 media wrapper: { data: { attributes: { url } } } (and arrays)
  // - "multiple media" fields (arrays)
  const url = pickStrapiMediaUrl(attributes.cover);
  if (!url) return null;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const base = STRAPI_BASE_URL.replace(/\/+$/, "");
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${base}${path}`;
}

export interface HomeCarousel {
  title: string;
  subtitle: string;
  description: BlocksContent | null;
  images: string[];
}

function toAbsoluteMediaUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = STRAPI_BASE_URL.replace(/\/+$/, "");
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${base}${path}`;
}

function resolveCarousel(input: unknown): HomeCarousel | null {
  if (!input || typeof input !== "object") return null;

  const obj = input as Record<string, unknown>;
  const title = typeof obj.title === "string" ? obj.title : "";
  const subtitle = typeof obj.subtitle === "string" ? obj.subtitle : "";
  const description = normalizeBlocksContent(obj.description);

  // In your component the field is named `image` and is Multiple Media.
  const urls = pickStrapiMediaUrls(obj.image);
  const images = urls.map(toAbsoluteMediaUrl);

  if (!title && images.length === 0 && !description) return null;

  return { title, subtitle, description, images };
}

export interface HomeInfo {
  title: string;
  description: BlocksContent | null;
  image: string | null;
  carousel: HomeCarousel | null;
}

const EMPTY_HOME: HomeInfo = {
  title: "",
  description: null,
  image: null,
  carousel: null,
};

export async function getHomeInfo(): Promise<HomeInfo> {
  try {
    const response = await query<StrapiSingleTypeResponse<StrapiHomeAttributes>>(
      "/api/home?populate[0]=cover&populate[1]=carousel&populate[2]=carousel.image",
    );

    const attributes = unwrapSingleType(response);
    if (!attributes) return EMPTY_HOME;

    return {
      title: attributes.title,
      description: normalizeBlocksContent(attributes.description),
      image: resolveCoverUrl(attributes),
      carousel: resolveCarousel(attributes.carousel),
    };
  } catch (err) {
    if (err instanceof StrapiConnectionError || err instanceof StrapiRequestError) {
      console.warn("[strapi] getHomeInfo:", err.message);
      return EMPTY_HOME;
    }
    throw err;
  }
}