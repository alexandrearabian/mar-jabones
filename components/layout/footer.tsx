import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Wave } from "@/components/ui/wave";
import { mainNav, productNav, site } from "@/lib/site";
import { SocialIcons } from "./social-icons";

export function Footer() {
  return (
    <footer className="relative mt-auto bg-deep text-deep-foreground">
      <Wave tone="deep" edge="top" />

      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="space-y-6 md:col-span-5">
          <div className="flex items-center gap-3">
            <img src={site.logo} alt="" width={44} height={44} loading="lazy" className="size-11 rounded-full" />
            <p className="font-display text-2xl font-semibold tracking-tight">{site.name}</p>
          </div>
          <p className="max-w-sm leading-relaxed text-deep-foreground/70">{site.description}</p>
          <SocialIcons />
        </div>

        <nav aria-label="Pie de página" className="grid grid-cols-2 gap-8 md:col-span-4">
          <FooterList title="Tienda" links={productNav} />
          <FooterList title="Mar D" links={mainNav.slice(1)} />
        </nav>

        <div className="md:col-span-3">
          <p className="text-sm font-medium text-deep-foreground/60">Pedidos</p>
          <p className="mt-3 leading-relaxed text-deep-foreground/80">
            Precios, colores y pedidos especiales: escribime por mensaje directo.
          </p>
          <a
            href={site.instagram.messageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-4 inline-flex items-center gap-1.5 font-medium"
          >
            @{site.instagram.handle}
            <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden />
          </a>
        </div>
      </div>

      <div className="container-page flex flex-col gap-2 border-t border-deep-foreground/10 py-6 text-sm text-deep-foreground/55 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>Hecho a mano en {site.city}, Argentina</p>
      </div>
    </footer>
  );
}

function FooterList({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-sm font-medium text-deep-foreground/60">{title}</p>
      <ul className="mt-3 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-deep-foreground/85 transition-colors hover:text-deep-foreground">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
