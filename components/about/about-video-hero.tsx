"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

const ABOUT_VIDEO_SRC = "/videos/sobre-nosotros.mp4";
const ABOUT_VIDEO_POSTER = "/videos/sobre-nosotros.jpg";

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
    <section className="relative px-3 pt-3 sm:px-4">
      {/* Scroll runway = hero height + small extra for parallax (no empty gap) */}
      <div
        ref={heroRef}
        className="relative h-[calc(52vh+5rem)] min-h-[360px] max-h-[560px] sm:h-[calc(58vh+5rem)] sm:max-h-[600px]"
      >
        <div className="sticky top-0 h-[52vh] min-h-[280px] max-h-[480px] overflow-hidden rounded-[2rem] bg-foreground sm:h-[58vh] sm:max-h-[520px]">
          <motion.div
            className="absolute inset-0 -top-[8%] h-[116%] w-full"
            style={{ y: videoY, scale: videoScale }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={ABOUT_VIDEO_POSTER}
              className="h-full w-full object-cover"
              aria-label="Video sobre Mar D Jabones"
            >
              <source src={ABOUT_VIDEO_SRC} type="video/mp4" />
            </video>
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-linear-to-t from-foreground/85 via-foreground/30 to-foreground/5"
            style={{ opacity: overlayOpacity }}
          />

          <motion.div
            className="absolute inset-x-0 bottom-0 px-4 pb-8 pt-12 sm:px-6 lg:px-8"
            style={{ y: titleY, opacity: titleOpacity }}
          >
            <div className="mx-auto max-w-5xl">
              <motion.h1
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl font-semibold tracking-tighter text-white sm:text-5xl lg:text-6xl"
              >
                Sobre nosotros
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 max-w-2xl text-base text-white/90 sm:text-lg"
              >
                Somos un equipo apasionado por crear piezas artesanales inspiradas en el mar.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative z-10 -mt-20 rounded-t-[2rem] bg-background shadow-[0_-24px_48px_-24px_oklch(0.25_0.05_240/0.25)]"
        style={{ y: contentY }}
      >
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">{children}</div>
      </motion.div>
    </section>
  );
}
