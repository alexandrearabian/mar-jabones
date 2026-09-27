import { Wave } from "@/components/ui/wave";
import { site } from "@/lib/site";

/**
 * Full-bleed sticky video that drifts and zooms as the page scrolls, while the title lifts and fades.
 * Pure CSS scroll-driven animation (see .about-* in globals.css): no JS, static where unsupported.
 */
export function AboutVideoHero() {
  return (
    <section className="about-runway relative -mt-(--header-h) h-[calc(72svh+2rem)] min-h-[472px]">
      <div className="sticky top-0 isolate h-[72svh] min-h-[440px] overflow-hidden bg-deep">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={site.beachPhoto.src}
          aria-label="Olas llegando a la orilla"
          className="about-video absolute inset-0 -z-20 size-full object-cover"
        >
          <source src="/videos/sobre-nosotros.mp4" type="video/mp4" />
        </video>
        <div aria-hidden className="hero-spotlight absolute inset-0 -z-10" />
        <div className="about-title container-page absolute inset-x-0 bottom-0 pb-24 md:pb-36">
          <h1 className="heading-1 text-background animate-enter [--delay:100ms]">Sobre mí</h1>
          <p className="lead mt-4 text-background/85 animate-enter [--delay:220ms]">
            Detrás de {site.name} estoy yo: cada pieza la hago a mano, inspirada en el mar.
          </p>
        </div>
        {/* On the photo's own edge (inside the sticky frame) so it's always visible, never a flat line */}
        <Wave tone="foam" edge="inside" size="lg" className="about-wave" />
      </div>
    </section>
  );
}
