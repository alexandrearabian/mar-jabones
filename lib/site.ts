export const site = {
  name: "Mar D Jabones",
  description: "Jabones y resinas artesanales inspirados en el mar. Piezas únicas hechas a mano.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.mardjabones.com.ar",
  instagram: {
    handle: "mard.jabones",
    profileUrl: "https://instagram.com/mard.jabones",
    messageUrl: "https://ig.me/m/mard.jabones",
  },
  facebookUrl: "https://facebook.com/mardjabones",
} as const;
