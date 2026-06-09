// Sheet component for mobile navigation
// Slide-in panel from side

"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "left" | "right" | "top" | "bottom";
  children: React.ReactNode;
}

export function Sheet({
  open = false,
  onOpenChange,
  side = "right",
  children,
}: SheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/40"
            onClick={() => onOpenChange?.(false)}
            aria-hidden="true"
          />
          {children}
        </>
      )}
    </AnimatePresence>
  );
}

interface SheetContentProps {
  className?: string;
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
}

export function SheetContent({
  className,
  children,
  side = "right",
}: SheetContentProps) {
  const variants = {
    left: { x: "-100%" },
    right: { x: "100%" },
    top: { y: "-100%" },
    bottom: { y: "100%" },
  };

  return (
    <motion.div
      initial={variants[side]}
      animate={{ x: 0, y: 0 }}
      exit={variants[side]}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={cn(
        "fixed z-50 flex h-full flex-col bg-background p-6 shadow-lg",
        {
          "left-0 top-0": side === "left",
          "right-0 top-0": side === "right",
          "top-0 left-0 right-0": side === "top",
          "bottom-0 left-0 right-0": side === "bottom",
        },
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

export function SheetTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-lg font-semibold text-foreground", className)}
      {...props}
    />
  );
}

export function SheetClose({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <button
      onClick={onClose}
      className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
      aria-label="Cerrar"
    >
      <X className="h-4 w-4" />
    </button>
  );
}


