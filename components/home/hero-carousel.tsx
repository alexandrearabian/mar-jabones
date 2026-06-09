"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";

export interface HeroCarouselProps {
  title: string;
  subtitle?: string;
  description?: BlocksContent | null;
  images: string[];
  emptyMessage?: string;
}

export function HeroCarousel({
  title,
  subtitle,
  description,
  images,
  emptyMessage = "No hay imágenes para mostrar.",
}: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(t);
  }, [images.length]);

  useEffect(() => {
    if (images.length === 0) {
      setIndex(0);
      return;
    }
    setIndex((i) => i % images.length);
  }, [images.length]);

  const goToSlide = (newIndex: number) => {
    if (images.length === 0) return;
    const newDirection = newIndex > index ? 1 : -1;
    setDirection(newDirection);
    setIndex(newIndex);
  };

  const goToPrevious = () => {
    if (images.length === 0) return;
    goToSlide(index === 0 ? images.length - 1 : index - 1);
  };

  const goToNext = () => {
    if (images.length === 0) return;
    goToSlide((index + 1) % images.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.05,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)",
    }),
  };

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

  const currentImage = images[index]!;

  const bypassOptimization = (() => {
    try {
      const u = new URL(currentImage);
      const host = u.hostname.toLowerCase();
      return (
        host === "localhost" ||
        host === "127.0.0.1" ||
        host === "::1" ||
        host.startsWith("192.168.") ||
        host.startsWith("10.") ||
        (host.startsWith("172.") &&
          (() => {
            const second = Number(host.split(".")[1]);
            return Number.isFinite(second) && second >= 16 && second <= 31;
          })())
      );
    } catch {
      return false;
    }
  })();

  return (
    <section className="relative h-[75vh] min-h-[520px] w-full overflow-hidden">
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={currentImage}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: {
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            },
            opacity: { duration: 0.3 },
            scale: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
            filter: { duration: 0.3 },
          }}
          className="absolute inset-0"
        >
          <Image
            src={currentImage}
            alt={title}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
            unoptimized={bypassOptimization}
          />

          <div className="absolute inset-0 bg-hero-overlay" />

          <div className="absolute inset-0 flex items-center justify-start px-6 sm:px-10 bg-foreground/40">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="max-w-3xl text-left text-popover"
            >
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="mb-3 text-sm tracking-widest uppercase"
                style={{
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.5)",
                }}
              >
                {subtitle ?? ""}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.4,
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="p-2 text-4xl font-semibold sm:text-5xl md:text-6xl"
                style={{
                  textShadow: "0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 6px rgba(0, 0, 0, 0.5)",
                }}
              >
                {title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="mt-5 max-w-xl text-base md:text-lg [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-hero-text [&_ol]:ml-5 [&_ol]:list-decimal [&_p]:leading-relaxed [&_ul]:ml-5 [&_ul]:list-disc"
              >
                {description && description.length > 0 ? (
                  <BlocksRenderer content={description} />
                ) : null}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {images.length > 1 ? (
        <>
          <motion.button
            type="button"
            onClick={goToPrevious}
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-hero-control-bg p-3 text-hero-text backdrop-blur-md transition-all hover:bg-hero-control-bg-hover hover:shadow-lg md:block"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>

          <motion.button
            type="button"
            onClick={goToNext}
            whileHover={{ scale: 1.1, x: 4 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-hero-control-bg p-3 text-hero-text backdrop-blur-md transition-all hover:bg-hero-control-bg-hover hover:shadow-lg md:block"
            aria-label="Slide siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>

          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {images.map((src, i) => (
              <motion.button
                key={src}
                type="button"
                onClick={() => goToSlide(i)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-8 bg-hero-dot-active"
                    : "w-3 bg-hero-dot-inactive hover:bg-hero-dot-active/60"
                }`}
                aria-label={`Ir al slide ${i + 1}`}
                animate={{
                  width: i === index ? 32 : 12,
                  opacity: i === index ? 1 : 0.4,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
