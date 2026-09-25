"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SanityImage } from "@/components/sanity-image";
import type { SanityImage as SanityImageData } from "@/sanity/queries";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProductGallery({ images }: { images: SanityImageData[] }) {
  const [selected, setSelected] = useState(0);
  const current = images[selected];

  return (
    <div>
      <div className="rounded-[2rem] bg-foreground/[0.03] p-1.5 ring-1 ring-foreground/5">
        <div className="relative aspect-square w-full overflow-hidden rounded-[calc(2rem-0.375rem)] bg-muted">
          {current ? (
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={selected}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <SanityImage
                  image={current}
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">Sin imagen</div>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:gap-4">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              onClick={() => setSelected(index)}
              aria-label={`Ver foto ${index + 1}`}
              aria-pressed={selected === index}
              className={`relative aspect-square overflow-hidden rounded-2xl ring-offset-2 ring-offset-background transition-[opacity,box-shadow,transform] duration-500 ease-(--ease-fluid) active:scale-[0.97] ${
                selected === index
                  ? "opacity-100 ring-2 ring-primary"
                  : "opacity-60 ring-1 ring-foreground/5 hover:opacity-100"
              }`}
            >
              <SanityImage image={image} fill sizes="160px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
