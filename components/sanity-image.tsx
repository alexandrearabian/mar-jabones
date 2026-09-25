"use client";

import Image, { type ImageLoader, type ImageProps } from "next/image";
import type { SanityImage as SanityImageData } from "@/sanity/queries";

// Sanity's CDN resizes and picks the format, so Next doesn't re-optimize.
const sanityLoader: ImageLoader = ({ src, width, quality }) =>
  `${src}?w=${width}&q=${quality ?? 75}&fit=max&auto=format`;

type Props = Omit<ImageProps, "src" | "alt" | "loader" | "placeholder" | "blurDataURL"> & {
  image: SanityImageData;
};

export function SanityImage({ image, style, ...props }: Props) {
  return (
    <Image
      {...props}
      src={image.url}
      alt={image.alt}
      loader={sanityLoader}
      placeholder={image.lqip ? "blur" : "empty"}
      blurDataURL={image.lqip ?? undefined}
      // Keep the editor's hotspot in frame when object-cover crops the photo
      style={
        image.hotspot
          ? { objectPosition: `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`, ...style }
          : style
      }
    />
  );
}
