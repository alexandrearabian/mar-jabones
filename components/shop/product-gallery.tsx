"use client";

import { useSnapCarousel } from "@/components/carousel/use-snap-carousel";
import { SanityImage } from "@/components/sanity-image";
import type { SanityImage as SanityImageData } from "@/sanity/queries";
import { cn } from "@/lib/utils";

/** Swipeable photo strip (native scroll-snap) with thumbnails that jump to each photo. */
export function ProductGallery({ images, name }: { images: SanityImageData[]; name: string }) {
  const { trackRef, active, goTo } = useSnapCarousel(images.length);

  if (images.length === 0) {
    return <div className="aspect-square rounded-[1.5rem] bg-sand" />;
  }

  return (
    <div>
      <div
        ref={trackRef}
        tabIndex={images.length > 1 ? 0 : -1}
        aria-label={images.length > 1 ? `Fotos de ${name} (deslizá para ver más)` : undefined}
        className="flex aspect-square snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-[1.5rem] bg-sand outline-none ring-offset-4 ring-offset-background [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, i) => (
          <div key={image.url} data-slide={i} className="relative h-full w-full shrink-0 snap-center">
            <SanityImage image={image} sizes="(min-width: 1280px) 700px, (min-width: 1024px) 55vw, 100vw" priority={i === 0} />
          </div>
        ))}
      </div>

      {images.length > 1 ? (
        <div className="mt-3 grid grid-cols-5 gap-2 sm:mt-4 sm:gap-3">
          {images.map((image, i) => (
            <button
              key={image.url}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "relative aspect-square overflow-hidden rounded-[1rem] bg-sand ring-offset-2 ring-offset-background transition-[opacity,box-shadow] duration-300",
                i === active ? "ring-2 ring-foreground" : "opacity-60 hover:opacity-100",
              )}
            >
              <SanityImage image={image} sizes="120px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
