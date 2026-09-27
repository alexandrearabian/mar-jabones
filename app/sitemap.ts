import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getSlugs } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getSlugs();
  const pages = ["", "/productos", "/sobre-nosotros", "/contacto"].map((path) => ({
    url: `${site.url}${path}`,
  }));
  const catalog = slugs.map(({ slug, _updatedAt }) => ({
    url: `${site.url}/productos/${slug}`,
    lastModified: _updatedAt,
  }));
  return [...pages, ...catalog];
}
