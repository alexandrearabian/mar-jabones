"use client";

import { useCallback, useState } from "react";
import type { SanityImage as SanityImageData } from "@/sanity/queries";
import { cn } from "@/lib/utils";

// Sanity's CDN resizes and serves AVIF/WebP; fit=max never upscales past the original.
// Few widths on purpose: visitors share the same renders, so they're usually already cached at the CDN edge.
const WIDTHS = [400, 640, 960, 1280, 1600];
const at = (url: string, width: number) => `${url}?w=${width}&q=72&fit=max&auto=format`;

interface SanityImageProps {
  image: SanityImageData;
  /** Rendered width, e.g. "(min-width: 1024px) 33vw, 50vw". Drives which srcset entry the browser picks. */
  sizes: string;
  /** Above-the-fold hero/LCP image: load immediately with high priority. */
  priority?: boolean;
  /** Shimmering sand placeholder while loading; off where the photo sits on its own dark backdrop. */
  skeleton?: boolean;
  className?: string;
}

/**
 * Fills its positioned parent. While the photo loads, a sand skeleton shimmers in its place; once it has
 * fully loaded, it fades in (no blurry preview snapping into focus).
 */
export function SanityImage({ image, sizes, priority = false, skeleton = true, className }: SanityImageProps) {
  const [loaded, setLoaded] = useState(false);
  // Photos that finished before React hydrated never fire onLoad again, so check on mount
  const checkComplete = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);
  const focus = image.hotspot ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%` : "50% 50%";

  return (
    <>
      {skeleton ? <span aria-hidden className="skeleton" data-done={loaded || undefined} /> : null}
      <img
        ref={checkComplete}
        src={at(image.url, 960)}
        srcSet={WIDTHS.map((w) => `${at(image.url, w)} ${w}w`).join(", ")}
        sizes={sizes}
        alt={image.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        // A failed photo shouldn't shimmer forever; the alt text shows instead
        onError={() => setLoaded(true)}
        data-img-fade
        className={cn(
          "absolute inset-0 size-full object-cover transition-opacity duration-700 ease-(--ease-out-expo)",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
        style={{ objectPosition: focus }}
      />
    </>
  );
}
