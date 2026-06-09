// Sobre nosotros page - server component

import { AboutVideoHero } from "@/components/about/about-video-hero";
import { AboutContent } from "@/components/about/about-content";

export const metadata = {
  title: "Sobre nosotros",
  description: "Conocé nuestra historia y cómo creamos jabones y resinas artesanales.",
};

export default function AboutPage() {
  return (
    <AboutVideoHero>
      <AboutContent />
    </AboutVideoHero>
  );
}
