import Link from "next/link";
import { SocialIcons } from "./social-icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const shopLinks = [
    { href: "/productos", label: "Todos los productos" },
    { href: "/productos/jabones", label: "Jabones" },
    { href: "/productos/resinas", label: "Resinas" },
  ];

  const helpLinks = [
    { href: "/contacto", label: "Contacto" },
    { href: "/sobre-nosotros", label: "Sobre nosotros" },
  ];

  const socialLinks = [
    {
      href: "https://instagram.com/mard.jabones",
      label: "Instagram",
      iconName: "instagram",
    },
    {
      href: "https://facebook.com/mardjabones",
      label: "Facebook",
      iconName: "facebook",
    },
  ];

  return (
    <footer className="mt-auto border-t border-border/80 bg-muted/25">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <p className="text-lg font-semibold tracking-tight">Mar Jabones</p>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Jabones y resinas artesanales inspirados en el mar. Piezas únicas hechas a mano.
            </p>
            <SocialIcons links={socialLinks} />
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tienda
            </h4>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Ayuda
            </h4>
            <ul className="space-y-2.5">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Contacto
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Consultá por Instagram para pedidos y personalizaciones.
            </p>
            <Link
              href="https://instagram.com/mard.jabones"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
            >
              @mard.jabones
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Mar Jabones. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
