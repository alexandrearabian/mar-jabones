import type { Metadata } from "next";
import { ArrowUpRight, Instagram } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escribinos por Instagram para consultas, pedidos especiales o personalizaciones.",
};

export default function ContactoPage() {
  return (
    <PageShell narrow>
      <PageHeader
        title="Contacto"
        subtitle="Pedidos, precios y personalizaciones: escribinos por Instagram y te respondemos a la brevedad."
      />

      <Reveal className="mx-auto max-w-xl rounded-[2rem] bg-foreground/[0.03] p-1.5 ring-1 ring-foreground/5">
        <div className="flex flex-col items-center gap-6 rounded-[calc(2rem-0.375rem)] bg-card px-6 py-12 text-center shadow-[inset_0_1px_1px_oklch(1_0_0/0.6),var(--shadow-soft)] sm:px-10">
          <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Instagram className="size-6" strokeWidth={1.5} aria-hidden />
          </span>
          <div>
            <p className="text-xl font-semibold tracking-tight">@{site.instagram.handle}</p>
            <p className="mt-2 text-sm text-muted-foreground">Respondemos todos los mensajes directos.</p>
          </div>
          <Button asChild size="lg" className="group">
            <a href={site.instagram.messageUrl} target="_blank" rel="noopener noreferrer">
              Enviar mensaje
              <ArrowUpRight
                className="transition-transform duration-500 ease-(--ease-fluid) group-hover:-translate-y-px group-hover:translate-x-0.5"
                strokeWidth={1.75}
              />
            </a>
          </Button>
        </div>
      </Reveal>
    </PageShell>
  );
}
