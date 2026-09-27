import type { Metadata } from "next";
import { AboutContent } from "@/components/about/about-content";
import { AboutVideoHero } from "@/components/about/about-video-hero";
import { getAboutPage } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "La historia de Mar D Jabones y cómo hago cada jabón y resina a mano.",
  alternates: { canonical: "/sobre-nosotros" },
};

export default async function AboutPage() {
  const about = await getAboutPage();
  return (
    <>
      <AboutVideoHero />
      <AboutContent techniques={about?.techniques ?? []} />
    </>
  );
}
