import { site } from "@/lib/site";

/** Structured data for search engines. `<` is escaped so CMS text can't close the script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c") }}
    />
  );
}

/** Productos › ...trail, as a BreadcrumbList. */
export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  const items = [{ name: "Productos", path: "/productos" }, ...trail];
  return (
    <JsonLd
      data={{
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: new URL(item.path, site.url).href,
        })),
      }}
    />
  );
}
