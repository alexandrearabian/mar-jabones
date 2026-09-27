"use client";

import { useState } from "react";
import { Check, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

interface InstagramCtaProps {
  productName: string;
  /** "inline" in the product column on desktop; "sticky" bar pinned to the bottom on mobile. */
  variant: "inline" | "sticky";
}

/**
 * Instagram DMs can't be prefilled, so the click also copies a ready-to-paste message
 * that names the product. Navigation happens either way, even if the clipboard is blocked.
 */
export function InstagramCta({ productName, variant }: InstagramCtaProps) {
  const [copied, setCopied] = useState(false);
  const message = `¡Hola! Me interesa "${productName}". ¿Me pasás precio y disponibilidad?`;
  const copyMessage = () => {
    navigator.clipboard?.writeText(message).then(
      () => setCopied(true),
      () => {},
    );
  };
  const link = (label: string) => (
    <a href={site.instagram.messageUrl} target="_blank" rel="noopener noreferrer" onClick={copyMessage}>
      <Instagram strokeWidth={1.75} />
      {label}
    </a>
  );

  if (variant === "sticky") {
    return (
      <div
        data-sticky-cta
        className="glass fixed inset-x-3 bottom-3 z-30 flex items-center gap-3 rounded-full p-1.5 pl-5 lg:hidden"
      >
        <p aria-live="polite" className="min-w-0 flex-1 truncate text-sm font-medium">
          {copied ? "Mensaje copiado: pegalo en el chat" : productName}
        </p>
        <Button asChild>{link("Escribime")}</Button>
      </div>
    );
  }

  return (
    <div className="hidden lg:block">
      <Button asChild size="lg">
        {link("Escribime por Instagram")}
      </Button>
      <p aria-live="polite" className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
        {copied ? (
          <>
            <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2} aria-hidden />
            Mensaje copiado: pegalo en el chat de Instagram.
          </>
        ) : (
          "Al tocar el botón se copia un mensaje con el nombre del producto, listo para pegar en el chat."
        )}
      </p>
    </div>
  );
}
