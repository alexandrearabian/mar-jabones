"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import { isPrivateOrLocalUrl } from "@/lib/is-private-url";

export interface HeroCarouselProps {
  title: string;
  subtitle?: string;
  description?: BlocksContent | null;
  images: string[];
  emptyMessage?: string;
}

const FADE_DURATION = 0.85;
const FADE_EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 3000;

export function HeroCarousel({
  title,
  subtitle,
  description,
  images,
  emptyMessage = "No hay imágenes para mostrar.",
}: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const activeIndex = images.length === 0 ? 0 : index % images.length;

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <section
        className="flex min-h-[min(75vh,520px)] w-full items-center justify-center bg-muted px-6 py-20"
        role="region"
        aria-label={emptyMessage}
      >
        <p className="max-w-lg text-center text-muted-foreground">{emptyMessage}</p>
      </section>
    );
  }

  return (
    <section
      className="relative h-[min(75vh,720px)] min-h-[520px] w-full overflow-hidden bg-foreground"
      aria-roledescription="carousel"
      aria-label={title}
    >
      <div className="absolute inset-0" aria-hidden>
        {images.map((src, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.div
              key={src}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.04,
              }}
              transition={{
                opacity: { duration: FADE_DURATION, ease: FADE_EASE },
                scale: { duration: FADE_DURATION * 1.4, ease: FADE_EASE },
              }}
              style={{ zIndex: isActive ? 2 : 1 }}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
                unoptimized={isPrivateOrLocalUrl(src)}
              />
            </motion.div>
          );
        })}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-foreground/75 via-foreground/25 to-foreground/10"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-hero-overlay" aria-hidden />

      <div className="absolute inset-0 z-20 flex items-end px-6 pb-16 pt-24 sm:items-center sm:px-10 sm:pb-0 md:px-14">
        <div className="max-w-3xl text-left text-hero-text">
          {subtitle ? (
            <p className="mb-3 text-xs font-medium tracking-[0.22em] text-hero-text-muted uppercase sm:text-sm">
              {subtitle}
            </p>
          ) : null}

          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>

          {description && description.length > 0 ? (
            <div className="mt-5 max-w-xl text-base leading-relaxed text-hero-text-subtle md:text-lg [&_a]:underline [&_a]:underline-offset-4 [&_ol]:ml-5 [&_ol]:list-decimal [&_p]:leading-relaxed [&_ul]:ml-5 [&_ul]:list-disc">
              <BlocksRenderer content={description} />
            </div>
          ) : null}
        </div>
      </div>

      {images.length > 1 ? (
        <div
          className="pointer-events-none absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-hero-button-outline-border bg-hero-control-bg px-3 py-2 backdrop-blur-md"
          aria-hidden
        >
          {images.map((src, i) => (
            <motion.span
              key={src}
              className="block rounded-full bg-hero-dot-inactive"
              initial={false}
              animate={{
                width: i === activeIndex ? 28 : 6,
                height: 6,
                opacity: i === activeIndex ? 1 : 0.45,
              }}
              transition={{ duration: 0.35, ease: FADE_EASE }}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
