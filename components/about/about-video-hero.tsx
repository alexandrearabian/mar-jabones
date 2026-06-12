"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

const ABOUT_VIDEO_SRC = encodeURI("/WhatsApp Video 2026-05-28 at 15.31.19.mp4");

interface AboutVideoHeroProps {
  children: React.ReactNode;
}

export function AboutVideoHero({ children }: AboutVideoHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : 36],
  );
  const videoScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, prefersReducedMotion ? 1 : 1.06],
  );
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.9, 0.75]);
  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : -28],
  );
  const titleOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.85, 0]);
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : -40],
  );

  return (
    <section className="relative">
      {/* Scroll runway = hero height + small extra for parallax (no empty gap) */}
      <div
        ref={heroRef}
        className="relative h-[calc(52vh+5rem)] min-h-[360px] max-h-[560px] sm:h-[calc(58vh+5rem)] sm:max-h-[600px]"
      >
        <div className="sticky top-0 h-[52vh] min-h-[280px] max-h-[480px] overflow-hidden bg-black sm:h-[58vh] sm:max-h-[520px]">
          <motion.div
            className="absolute inset-0 -top-[8%] h-[116%] w-full"
            style={{ y: videoY, scale: videoScale }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              aria-label="Video sobre Mar D Jabones"
            >
              <source src={ABOUT_VIDEO_SRC} type="video/mp4" />
            </video>
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10"
            style={{ opacity: overlayOpacity }}
          />

          <motion.div
            className="absolute inset-x-0 bottom-0 px-4 pb-8 pt-12 sm:px-6 lg:px-8"
            style={{ y: titleY, opacity: titleOpacity }}
          >
            <div className="mx-auto max-w-5xl">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Sobre nosotros
              </h1>
              <p className="mt-3 max-w-2xl text-base text-white/90 sm:text-lg">
                Somos un equipo apasionado por crear piezas artesanales inspiradas en el mar.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative z-10 -mt-20 rounded-t-3xl bg-background shadow-[0_-16px_32px_-10px_rgba(0,0,0,0.15)]"
        style={{ y: contentY }}
      >
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">{children}</div>
      </motion.div>
    </section>
  );
}
