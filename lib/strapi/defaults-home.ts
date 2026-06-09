import type { HomePageViewModel } from "@/types/homepage";

/** Usado solo si Strapi no responde o faltan campos (evita sitio roto en desarrollo). */
export const HOME_PAGE_DEFAULTS: HomePageViewModel = {
  metaTitle: "Inicio",
  metaDescription: "Descubre nuestra colección de jabones y resinas artesanales",
  heroEmptyMessage:
    "Aún no hay diapositivas en Strapi. Creá entradas en «Página de inicio» → «heroSlides».",
  heroSlides: [],
  heroPrimaryCta: { label: "Ver productos", href: "/productos" },
  heroSecondaryCta: { label: "Explorar colección", href: "/productos" },
  featuredSectionTitle: "Productos destacados",
  featuredSectionSubtitle: "Nuestras piezas más populares, hechas a mano con amor",
  contactSectionTitle: "Contáctanos",
  contactSectionSubtitle:
    "Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos pronto.",
  contactForm: {
    nameLabel: "Nombre",
    namePlaceholder: "Tu nombre",
    emailLabel: "Email",
    emailPlaceholder: "tu@email.com",
    messageLabel: "Mensaje",
    messagePlaceholder: "Escribe tu mensaje aquí...",
    submitLabel: "Enviar mensaje",
    submittingLabel: "Enviando...",
    validation: {
      nameMin: "El nombre debe tener al menos 2 caracteres",
      emailInvalid: "Ingresa un email válido",
      messageMin: "El mensaje debe tener al menos 10 caracteres",
    },
    toastSuccess: {
      title: "Mensaje enviado",
      description: "Gracias por contactarnos. Te responderemos pronto.",
    },
    toastError: {
      title: "Error",
      description: "No se pudo enviar el mensaje. Por favor, intenta nuevamente.",
    },
  },
  emptyProductsMessage: "No se encontraron productos",
  productsLoadErrorMessage: "Error al cargar productos",
};
