"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SanityImage } from "@/components/sanity-image";
import { Button } from "@/components/ui/button";
import { Wave } from "@/components/ui/wave";
import type { SanityImage as SanityImageData } from "@/sanity/queries";
import { cn } from "@/lib/utils";

const SWIPE_PX = 50;

interface HeroCarouselProps {
  title: string;
  eyebrow?: string | null;
  description?: string | null;
  images: SanityImageData[];
}

/**
 * Full-bleed crossfading hero that always cycles. The active progress bar's CSS animation is the timer:
 * when it ends the next slide shows, holding a mouse button or finger down pauses it mid-way, and with
 * "reduce motion" on (animations disabled in globals.css) it never ends, so the carousel stays put.
 * Swipe, drag, trackpad, arrow keys and the controls all change slides.
 */
export function HeroCarousel({ title, eyebrow, description, images }: HeroCarouselProps) {
  const count = images.length;
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  // Load photos one slide ahead of the furthest one shown, instead of all at once
  const [furthest, setFurthest] = useState(0);
  if (active > furthest) setFurthest(active);

  const show = useCallback((index: number) => setActive(((index % count) + count) % count), [count]);

  const swipeStart = useRef<number | null>(null);
  const lastWheel = useRef(0);

  const words = title.split(" ");

  return (
    <section
      aria-roledescription="carrusel"
      aria-label={title}
      className="relative isolate -mt-(--header-h) flex min-h-[100svh] touch-pan-y items-end overflow-hidden bg-deep"
      onPointerDown={(e) => {
        setHeld(true);
        swipeStart.current = e.clientX;
      }}
      onPointerUp={(e) => {
        setHeld(false);
        if (swipeStart.current === null) return;
        const dx = e.clientX - swipeStart.current;
        swipeStart.current = null;
        if (Math.abs(dx) > SWIPE_PX) show(active + (dx < 0 ? 1 : -1));
      }}
      onPointerCancel={() => setHeld(false)}
      onPointerLeave={() => setHeld(false)}
      onWheel={(e) => {
        const now = Date.now();
        if (Math.abs(e.deltaX) < 30 || Math.abs(e.deltaX) < Math.abs(e.deltaY) || now - lastWheel.current < 700) return;
        lastWheel.current = now;
        show(active + (e.deltaX > 0 ? 1 : -1));
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") show(active + 1);
        if (e.key === "ArrowLeft") show(active - 1);
      }}
    >
      {images.map((image, i) => (
        <div
          key={image.url}
          aria-hidden={i !== active}
          className={cn(
            "absolute inset-0 -z-20 overflow-hidden transition-opacity duration-1000 ease-(--ease-out-expo)",
            i === active ? "opacity-100" : "opacity-0",
          )}
        >
          {i <= furthest + 1 ? (
            <SanityImage
              image={image}
              sizes="100vw"
              priority={i === 0}
              skeleton={false}
              className={cn(i === active && "animate-[drift_7s_var(--ease-out-expo)_both]")}
            />
          ) : null}
        </div>
      ))}
      <div aria-hidden className="hero-spotlight absolute inset-0 -z-10" />

      <div className="container-page pb-28 pt-32 md:pb-40 md:pt-40">
        <div className="max-w-4xl text-background">
          {eyebrow ? (
            <p className="mb-5 text-lg text-background/85 animate-enter [--delay:100ms] md:text-xl">{eyebrow}</p>
          ) : null}
          <h1 className="font-display text-[clamp(2.75rem,1.8rem+4.6vw,6.25rem)] font-semibold uppercase leading-[0.95] tracking-tight">
            {words.map((word, i) => (
              <span key={`${word}-${i}`}>
                <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <span className="inline-block animate-rise" style={{ "--delay": `${200 + i * 70}ms` } as React.CSSProperties}>
                    {word}
                  </span>
                </span>{" "}
              </span>
            ))}
          </h1>
          {description ? (
            <p className="mt-5 max-w-[45ch] text-lg leading-relaxed text-background/85 animate-enter [--delay:550ms] md:text-xl">
              {description}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3 animate-enter [--delay:700ms] md:mt-10 md:gap-4">
            <Button asChild variant="light" size="lg" arrow>
              <Link href="/productos">Ver productos</Link>
            </Button>
            <Button asChild variant="outlineLight" size="lg" arrow>
              <Link href="/sobre-nosotros">Mi historia</Link>
            </Button>
          </div>
        </div>

        {count > 1 ? (
          <div className="mt-10 flex items-center gap-4 animate-enter [--delay:850ms] md:mt-14 md:gap-6">
            <div className="flex flex-1 gap-1.5">
              {images.map((image, i) => (
                <button
                  key={image.url}
                  type="button"
                  onClick={() => show(i)}
                  aria-label={`Ver foto ${i + 1} de ${count}`}
                  aria-current={i === active}
                  className="group relative h-12 max-w-16 flex-1"
                >
                  <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-background/25 transition-colors group-hover:bg-background/45">
                    {i === active ? (
                      <span
                        key={active}
                        onAnimationEnd={() => show(active + 1)}
                        style={{ animationPlayState: held ? "paused" : "running" }}
                        className="absolute inset-0 origin-left rounded-full bg-sea animate-[progress_6s_linear_both]"
                      />
                    ) : null}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-2 text-background">
              <ArrowButton label="Foto anterior" onClick={() => show(active - 1)}>
                <ChevronLeft />
              </ArrowButton>
              <ArrowButton label="Foto siguiente" onClick={() => show(active + 1)}>
                <ChevronRight />
              </ArrowButton>
            </div>
          </div>
        ) : null}
      </div>

      <Wave tone="foam" edge="inside" size="lg" />
    </section>
  );
}

function ArrowButton({ label, ...props }: React.ComponentProps<"button"> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid size-12 place-items-center rounded-full ring-1 ring-inset ring-background/30 transition duration-300 ease-(--ease-out-expo) hover:bg-background/10 hover:ring-background/60 active:scale-[0.96] [&_svg]:size-5"
      {...props}
    />
  );
}
