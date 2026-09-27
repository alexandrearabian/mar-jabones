import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const paragraphs = [
  "Trabajo en pequeñas tandas y cuido cada detalle, desde los materiales hasta el moño del paquete. Me gusta partir de lo tradicional, como el jabón de Castilla, y jugar con colores y remolinos hasta llegar a diseños únicos.",
  `${site.name} nació en ${site.city} en ${site.foundedYear}. En Barcelona llegaron los primeros jabones naturales, cremas, perfumes, accesorios de decoración y bijou artesanal, junto con las ferias de Sarrià y los talleres de jabones de glicerina.`,
  `Pronto se convirtieron en regalos empresariales. ${site.quote.author} definió entonces:`,
];

export function AboutContent() {
  return (
    <div className="container-page max-w-3xl pb-20 pt-6 md:pb-28 md:pt-10">
      <p className="font-display text-[clamp(1.375rem,1.15rem+0.9vw,1.875rem)] font-medium leading-snug tracking-tight">
        Mi sensibilidad es el color que da forma a mis jabones, y mi expresividad, el aroma puro para nuestros sentidos.
      </p>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
        {paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>

      <blockquote className="reveal my-12 border-l-2 border-sea pl-6 font-display text-[clamp(1.5rem,1.2rem+1.3vw,2.25rem)] font-medium leading-[1.2] tracking-tight md:my-14 md:pl-8">
        “{site.quote.text}”
      </blockquote>

      <p className="text-lg leading-relaxed text-muted-foreground">
        Hoy, desde {site.city}, {site.name} sigue regalando aromas, colores y burbujas junto a las olas del Atlántico.
      </p>

      <Button asChild size="lg" arrow className="mt-12">
        <Link href="/productos">Ver productos</Link>
      </Button>
    </div>
  );
}
