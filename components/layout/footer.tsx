import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
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
      href: site.instagram.profileUrl,
      label: "Instagram",
      iconName: "instagram",
    },
    {
      href: site.facebookUrl,
      label: "Facebook",
      iconName: "facebook",
    },
  ];

  return (
    <footer className="mt-auto px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-muted/60 px-6 py-14 ring-1 ring-foreground/5 sm:px-10 lg:px-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-5 sm:col-span-2 lg:col-span-6">
            <div className="flex items-center gap-3">
              <span className="relative size-11 overflow-hidden rounded-full ring-1 ring-foreground/5">
                <Image src="/logo-mar.jpg" alt="" fill sizes="44px" className="object-cover" />
              </span>
              <p className="text-2xl font-semibold tracking-tighter">{site.name}</p>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
            <SocialIcons links={socialLinks} />
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-medium text-muted-foreground">Tienda</h4>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors duration-300 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-medium text-muted-foreground">Ayuda</h4>
            <ul className="space-y-2.5">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors duration-300 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <h4 className="mb-4 text-sm font-medium text-muted-foreground">Contacto</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Consultá por Instagram para pedidos y personalizaciones.
            </p>
            <Link
              href={site.instagram.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              @{site.instagram.handle}
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-foreground/10 pt-8 text-sm text-muted-foreground">
          <p>© {currentYear} {site.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
