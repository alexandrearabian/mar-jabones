import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { PageTransition } from "./page-transition";

/** Public-site chrome (skip link, nav, footer, grain). Shared by the (shop) layout and the 404. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grain flex min-h-dvh flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-background focus:px-4 focus:py-2 focus:shadow-(--shadow-soft)"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido" className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
