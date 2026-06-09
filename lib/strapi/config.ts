function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

export function getStrapiUrl(): string {
  // IMPORTANT: browser code can only see NEXT_PUBLIC_* env vars
  const url = process.env.NEXT_PUBLIC_STRAPI_URL ?? process.env.STRAPI_URL ?? "";
  if (!url) {
    return "";
  }
  return trimTrailingSlash(url);
}

export function getStrapiMediaUrl(urlPath: string | null | undefined): string | null {
  if (!urlPath) return null;
  if (urlPath.startsWith("http://") || urlPath.startsWith("https://")) {
    return urlPath;
  }
  const base = getStrapiUrl();
  if (!base) return null;
  return `${base}${urlPath.startsWith("/") ? "" : "/"}${urlPath}`;
}
