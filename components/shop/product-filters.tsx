"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  categories: { name: string; slug: string }[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const pathname = usePathname();
  const links = [
    { href: "/productos", label: "Todos" },
    ...categories.map((c) => ({ href: `/productos/${c.slug}`, label: c.name })),
  ];

  return (
    <nav aria-label="Categorías" className="mb-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative isolate shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
              active ? "text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:text-foreground",
            )}
          >
            {active && (
              // Shared-layout highlight that glides to the selected category
              <motion.span
                layoutId="category-pill"
                className="absolute inset-0 -z-10 rounded-full bg-primary shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
