import { STRAPI_BASE_URL } from "@/lib/strapi";
import { pickStrapiMediaUrl, pickStrapiMediaUrls } from "@/lib/strapi/media";

export function toAbsoluteStrapiMediaUrl(urlPath: string): string {
  if (urlPath.startsWith("http://") || urlPath.startsWith("https://")) {
    return urlPath;
  }
  const base = STRAPI_BASE_URL.replace(/\/+$/, "");
  const path = urlPath.startsWith("/") ? urlPath : `/${urlPath}`;
  return `${base}${path}`;
}

export function pickFirstStrapiImageUrl(media: unknown): string | undefined {
  const paths = pickStrapiMediaUrls(media);
  for (const path of paths) {
    if (path) return toAbsoluteStrapiMediaUrl(path);
  }
  const single = pickStrapiMediaUrl(media);
  return single ? toAbsoluteStrapiMediaUrl(single) : undefined;
}

export function pickAllStrapiImageUrls(media: unknown): string[] {
  return pickStrapiMediaUrls(media).map(toAbsoluteStrapiMediaUrl);
}

/** Strapi v5 populate for product media + category */
export function productPopulateQueryString(): string {
  const params = new URLSearchParams();
  params.append("populate[image][fields][0]", "url");
  params.append("populate[image][fields][1]", "alternativeText");
  params.append("populate[image][fields][2]", "formats");
  params.append("populate[product_category][fields][0]", "name");
  params.append("populate[product_category][fields][1]", "slug");
  return params.toString();
}
