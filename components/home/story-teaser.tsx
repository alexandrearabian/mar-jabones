import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wave } from "@/components/ui/wave";
import { site } from "@/lib/site";

/** Deep-sea block that flows straight into the footer: the page "walks into the sea". */
export function StoryTeaser() {
  const { quote, beachPhoto } = site;
  return (
    <section aria-labelledby="historia" className="relative bg-deep text-deep-foreground">
      <Wave tone="deep" edge="top" />
      <div className="container-page section-y grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="reveal relative aspect-[4/3] overflow-hidden rounded-[1.5rem] md:col-span-6">
          <img
            src={beachPhoto.src}
            alt={beachPhoto.alt}
            width={beachPhoto.width}
            height={beachPhoto.height}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <div className="md:col-span-6">
          <h2 id="historia" className="sr-only">
            Mi historia
          </h2>
          <figure className="reveal">
            <blockquote className="font-display text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] font-medium leading-[1.15] tracking-tight">
              “{quote.text}”
            </blockquote>
            <figcaption className="mt-4 text-deep-foreground/60">
              {quote.author}, {quote.context}
            </figcaption>
          </figure>
          <p className="mt-8 max-w-[52ch] leading-relaxed text-deep-foreground/80">
            {site.name} nació en {site.city} en {site.foundedYear} y creció entre ferias y talleres en Barcelona. Hoy sigo
            haciendo cada jabón a mano, en pequeñas tandas, con aromas a aire de mar.
          </p>
          <Button asChild variant="light" arrow className="mt-8">
            <Link href="/sobre-nosotros">Mi historia</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
