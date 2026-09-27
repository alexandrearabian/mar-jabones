/** Business facts and shared copy. Anything shown in more than one place lives here. */
export const site = {
  name: "Mar D Jabones",
  description: "Jabones y resinas hechos a mano en Buenos Aires, con aromas que perfuman el alma.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.mardjabones.com.ar",
  city: "Buenos Aires",
  foundedYear: 2008,
  instagram: {
    handle: "mard.jabones",
    profileUrl: "https://instagram.com/mard.jabones",
    messageUrl: "https://ig.me/m/mard.jabones",
  },
  facebookUrl: "https://facebook.com/mardjabones",
  quote: {
    text: "Los productos Mar D. Jabones son... especiales... porque te perfuman el alma.",
    author: "Nancy",
    context: "sobre mis primeros regalos empresariales",
  },
  beachPhoto: {
    src: "/videos/sobre-nosotros.jpg",
    alt: "El mar turquesa llegando a una playa de arena clara",
    width: 1024,
    height: 576,
  },
} as const;

/** Top-level pages. `description` is the one-line hint under each row of the mobile menu. */
export const mainNav = [
  { href: "/productos", label: "Productos", description: "Jabones y resinas hechos a mano" },
  // One person runs the brand, so "Sobre mí"; the URL stays for existing links and search results
  { href: "/sobre-nosotros", label: "Sobre mí", description: `Mi historia desde ${site.foundedYear}` },
  { href: "/contacto", label: "Contacto", description: "Pedidos y consultas por Instagram" },
] as const;

export const productNav = [
  { href: "/productos", label: "Todos los productos" },
  { href: "/productos/jabones", label: "Jabones" },
  { href: "/productos/resinas", label: "Resinas" },
] as const;
