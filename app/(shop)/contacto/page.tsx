import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Instagram } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cómo hacer un pedido: escribime por Instagram para precios, colores y pedidos especiales.",
  alternates: { canonical: "/contacto" },
};

const STEPS = [
  { title: "Elegí", body: "Recorré el catálogo y anotá los nombres de las piezas que te gustaron." },
  { title: "Escribime", body: "Mandame un mensaje directo por Instagram con el producto, el tamaño y la cantidad." },
  { title: "Coordinamos", body: "Te confirmo precio, colores disponibles y la forma de entrega." },
];

export default function ContactoPage() {
  const { beachPhoto, instagram } = site;
  return (
    <>
      <PageHeader
        title="Hablemos por Instagram"
        subtitle="Atiendo todos los pedidos y consultas por mensaje directo, así te ayudo a elegir colores, tamaños y aromas."
      />
      <PageShell belowHeader>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ol className="space-y-8">
              {STEPS.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[2.75rem_1fr] gap-x-4">
                  <span
                    aria-hidden
                    className="flex size-11 items-center justify-center rounded-full bg-sand font-display text-lg font-semibold text-primary"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h2 className="heading-3">{step.title}</h2>
                    <p className="mt-1.5 max-w-[48ch] leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Button asChild size="lg">
                <a href={instagram.messageUrl} target="_blank" rel="noopener noreferrer">
                  <Instagram strokeWidth={1.75} />
                  Escribime por Instagram
                </a>
              </Button>
              <a
                href={instagram.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1.5 text-[15px] font-medium"
              >
                Ver @{instagram.handle}
                <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden />
              </a>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-sand lg:aspect-[4/5]">
              <img
                src={beachPhoto.src}
                alt={beachPhoto.alt}
                width={beachPhoto.width}
                height={beachPhoto.height}
                decoding="async"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
            <div className="mt-5 rounded-[1.5rem] bg-sand p-6 sm:p-8">
              <h2 className="heading-3">Regalos y pedidos especiales</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Hago recuerdos perfumados para bautismos, casamientos, cumpleaños y regalos empresariales, con tamaños,
                colores y aromas a tu gusto.
              </p>
              <Link href="/productos" className="link-underline mt-4 inline-block text-[15px] font-medium">
                Ver productos
              </Link>
            </div>
          </aside>
        </div>
      </PageShell>
    </>
  );
}
