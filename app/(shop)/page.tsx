import { CategoryShowcase } from "@/components/home/category-showcase";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { StoryTeaser } from "@/components/home/story-teaser";
import { getCategories, getHomePage } from "@/sanity/queries";

export default async function HomePage() {
  const [home, categories] = await Promise.all([getHomePage(), getCategories()]);

  return (
    <>
      {home?.images.length ? (
        <HeroCarousel title={home.title} eyebrow={home.eyebrow} description={home.description} images={home.images} />
      ) : null}
      {categories.length > 0 ? <CategoryShowcase categories={categories} /> : null}
      {home?.featured.length ? <FeaturedProducts products={home.featured} /> : null}
      <StoryTeaser />
    </>
  );
}
