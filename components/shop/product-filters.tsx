import Link from "next/link";
import type { Category } from "@/sanity/queries";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  categories: Category[];
  /** Slug of the category being viewed; null on the all-products page. */
  active: string | null;
}

export function ProductFilters({ categories, active }: ProductFiltersProps) {
  const total = categories.reduce((sum, c) => sum + c.productCount, 0);
  const links = [
    { href: "/productos", label: "Todos", count: total, current: active === null },
    ...categories.map((c) => ({
      href: `/productos/${c.slug}`,
      label: c.name,
      count: c.productCount,
      current: active === c.slug,
    })),
  ];

  return (
    <nav aria-label="Categorías" className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0">
      <ul className="flex gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={link.current ? "page" : undefined}
              className={cn(
                "inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-5 text-[15px] font-medium transition-colors duration-300",
                link.current
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/15 bg-card hover:border-foreground/35",
              )}
            >
              {link.label}
              <span className={cn("tabular-nums", link.current ? "text-background/60" : "text-muted-foreground")}>
                {link.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
