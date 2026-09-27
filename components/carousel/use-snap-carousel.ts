"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/reduced-motion";

/**
 * Native scroll-snap carousel: swipe, trackpad and keyboard scrolling come from the browser.
 * The active slide is tracked with an IntersectionObserver (no scroll listeners).
 * Slides must be direct children of the track with a `data-slide={index}` attribute.
 */
export function useSnapCarousel(count: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.slide));
        }
      },
      { root: track, threshold: 0.6 },
    );
    track.querySelectorAll("[data-slide]").forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [count]);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track || count === 0) return;
      const target = ((index % count) + count) % count;
      track.scrollTo({ left: target * track.clientWidth, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    },
    [count],
  );

  return { trackRef, active, goTo };
}
