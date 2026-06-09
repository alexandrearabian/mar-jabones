"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  align = "center",
  as: Heading = "h1",
  className,
}: PageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-10 sm:mb-12",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <Heading className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </Heading>
      {subtitle ? (
        <p
          className={cn(
            "mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </motion.header>
  );
}
