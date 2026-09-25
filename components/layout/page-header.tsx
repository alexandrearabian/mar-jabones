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
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "mb-10 sm:mb-12",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <Heading className="text-4xl font-semibold tracking-tighter text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </Heading>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 max-w-[60ch] text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </motion.header>
  );
}
