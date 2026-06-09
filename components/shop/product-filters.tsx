"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  selectedCategory?: string;
}

const categories = [
  { id: "jabones", name: "Jabones" },
  { id: "resinas", name: "Resinas" },
];

function filterLinkClass(active: boolean) {
  return cn(
    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
    active
      ? "bg-primary text-primary-foreground shadow-sm"
      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
  );
}

function sidebarLinkClass(active: boolean) {
  return cn(
    "block rounded-lg px-3 py-2.5 text-sm transition-colors",
    active
      ? "bg-primary/10 font-medium text-primary"
      : "text-muted-foreground hover:bg-muted hover:text-foreground",
  );
}

export function ProductFilters({ selectedCategory }: ProductFiltersProps) {
  const searchParams = useSearchParams();

  const buildUrl = (category?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("categoria", category);
    } else {
      params.delete("categoria");
    }
    params.delete("pagina");
    const qs = params.toString();
    return qs ? `/productos?${qs}` : "/productos";
  };

  return (
    <>
      {/* Mobile: horizontal chips */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Link href={buildUrl()} className={cn(filterLinkClass(!selectedCategory), "shrink-0")}>
          Todas
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={buildUrl(category.id)}
            className={cn(
              filterLinkClass(selectedCategory === category.id),
              "shrink-0",
            )}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Desktop: sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Categorías
          </h2>
          <ul className="space-y-1">
            <li>
              <Link href={buildUrl()} className={sidebarLinkClass(!selectedCategory)}>
                Todas
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={buildUrl(category.id)}
                  className={sidebarLinkClass(selectedCategory === category.id)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
