"use client";

import { Fragment, useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SanityImage } from "@/components/sanity-image";
import type { SanityImage as SanityImageData } from "@/sanity/queries";

interface HeroCarouselProps {
  title: string;
  eyebrow?: string | null;
  description?: string | null;
  images: SanityImageData[];
}

const FADE_DURATION = 1.1;
const EASE = [0.16, 1, 0.3, 1] as const;
const AUTOPLAY_MS = 5000;

export function HeroCarousel({ title, eyebrow, description, images }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const activeIndex = images.length === 0 ? 0 : index % images.length;

  // Timeout keyed on the active slide so a manual jump restarts the countdown
  useEffect(() => {
    if (images.length <= 1) return;
    const t = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [activeIndex, images.length]);

  const words = title.split(" ");

  return (
    <section className="px-3 pt-3 sm:px-4" aria-roledescription="carousel" aria-label={title}>
      <div className="relative h-[calc(100dvh-5.75rem)] max-h-[860px] min-h-[540px] w-full overflow-hidden rounded-[2rem] bg-foreground">
        <div className="absolute inset-0" aria-hidden>
          {images.map((image, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={image.url}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 1.08 }}
                transition={{
                  opacity: { duration: FADE_DURATION, ease: EASE },
                  // Slow drift while the slide is on screen
                  scale: { duration: AUTOPLAY_MS / 1000 + FADE_DURATION, ease: "easeOut" },
                }}
                style={{ zIndex: isActive ? 2 : 1 }}
              >
                <SanityImage image={image} fill priority={i === 0} sizes="100vw" className="object-cover" />
              </motion.div>
            );
          })}
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-foreground/80 via-foreground/20 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.18_0.03_240/0.55),transparent_65%)]"
          aria-hidden
        />

        <div className="absolute inset-0 z-20 flex items-end px-6 pb-24 sm:px-10 sm:pb-16 md:px-14 md:pb-20">
          <div className="max-w-3xl text-left text-hero-text">
            {eyebrow ? (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-hero-text-muted backdrop-blur-md sm:text-xs"
              >
                {eyebrow}
              </motion.p>
            ) : null}

            <h1 className="text-[2.75rem] font-semibold leading-[1.02] tracking-tighter sm:text-6xl lg:text-7xl">
              {words.map((word, i) => (
                <Fragment key={`${word}-${i}`}>
                  <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.07, ease: EASE }}
                    >
                      {word}
                    </motion.span>
                  </span>{" "}
                </Fragment>
              ))}
            </h1>

            {description ? (
              <motion.p
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.55 + words.length * 0.07, ease: EASE }}
                className="mt-5 max-w-xl text-base leading-relaxed text-hero-text-subtle md:text-lg"
              >
                {description}
              </motion.p>
            ) : null}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 + words.length * 0.07, ease: EASE }}
              className="mt-8"
            >
              <Link
                href="/productos"
                className="group inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-6 pr-1.5 text-sm font-medium text-foreground shadow-[0_12px_40px_-12px_oklch(0.18_0.03_240/0.6)] transition-transform duration-500 ease-(--ease-fluid) hover:scale-[1.02] active:scale-[0.98]"
              >
                Ver productos
                <span className="flex size-9 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-500 ease-(--ease-fluid) group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105">
                  <ArrowUpRight className="size-4" strokeWidth={1.75} />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {images.length > 1 ? (
          <div className="absolute bottom-8 right-6 z-30 flex items-center gap-1.5 sm:right-10 md:bottom-10 md:right-14">
            {images.map((image, i) => (
              <button
                key={image.url}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir a la imagen ${i + 1}`}
                aria-current={i === activeIndex}
                className="group py-3"
              >
                <span className="relative block h-[3px] w-8 overflow-hidden rounded-full bg-white/30 transition-colors duration-300 group-hover:bg-white/50 sm:w-10">
                  {i === activeIndex ? (
                    <motion.span
                      key={activeIndex}
                      className="absolute inset-0 origin-left rounded-full bg-hero-dot-active"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    />
                  ) : null}
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
