import { CategoryShowcase } from "@/components/home/category-showcase";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { StoryTeaser } from "@/components/home/story-teaser";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";
import { getCategories, getHomePage } from "@/sanity/queries";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function HomePage() {
  const [home, categories] = await Promise.all([getHomePage(), getCategories()]);

  return (
    <>
      <JsonLd
        data={{
          "@type": "Organization",
          name: site.name,
          url: site.url,
          logo: new URL(site.logo, site.url).href,
          description: site.description,
          foundingDate: String(site.foundedYear),
          foundingLocation: site.city,
          sameAs: [site.instagram.profileUrl, site.facebookUrl],
        }}
      />
      {home?.images.length ? (
        <HeroCarousel title={home.title} eyebrow={home.eyebrow} description={home.description} images={home.images} />
      ) : null}
      {categories.length > 0 ? <CategoryShowcase categories={categories} /> : null}
      {home?.featured.length ? <FeaturedProducts products={home.featured} /> : null}
      <StoryTeaser />
    </>
  );
}
