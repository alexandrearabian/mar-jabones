"use client";

import Link from "next/link";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { createPortal } from "react-dom";
import { site } from "@/lib/site";

const subscribeNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const EASE = [0.16, 1, 0.3, 1] as const;

const productLinks = [
  { href: "/productos", label: "Ver todo" },
  { href: "/productos/jabones", label: "Jabones" },
  { href: "/productos/resinas", label: "Resinas" },
];

const menuContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

// Mask reveal: each row slides up from inside an overflow-hidden wrapper
const menuItem = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.7, ease: EASE } },
  exit: { y: "110%", transition: { duration: 0.3, ease: EASE } },
};

const desktopLink =
  "relative isolate rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300";

function ActivePill() {
  return (
    <motion.span
      layoutId="nav-active-pill"
      className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.06]"
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
    />
  );
}

function MobileRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="overflow-hidden">
      <motion.div variants={menuItem}>{children}</motion.div>
    </li>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const mounted = useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const productsActive = isActive("/productos");

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileProductsOpen(false);
  };

  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
      return;
    }
    setMobileMenuOpen(true);
  };

  const mobileLink =
    "flex items-center justify-between py-3 text-4xl font-medium tracking-tighter text-foreground transition-colors active:text-primary";

  const mobileMenu = (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          key="mobile-menu"
          className="fixed inset-0 z-60 flex flex-col bg-background/85 px-6 pb-10 pt-28 backdrop-blur-2xl md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.1 } }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <motion.nav
            aria-label="Menú principal"
            className="flex-1 overflow-y-auto"
            variants={menuContainer}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <ul className="flex flex-col">
              <MobileRow>
                <Link href="/sobre-nosotros" onClick={closeMobileMenu} className={mobileLink}>
                  Sobre nosotros
                </Link>
              </MobileRow>

              <MobileRow>
                <button
                  type="button"
                  onClick={() => setMobileProductsOpen((open) => !open)}
                  className={`${mobileLink} w-full text-left`}
                  aria-expanded={mobileProductsOpen}
                >
                  Productos
                  <motion.span
                    animate={{ rotate: mobileProductsOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="flex size-10 items-center justify-center rounded-full bg-foreground/5"
                  >
                    <ChevronDown className="size-5 text-muted-foreground" strokeWidth={1.5} />
                  </motion.span>
                </button>
              </MobileRow>

              <AnimatePresence initial={false}>
                {mobileProductsOpen && (
                  <motion.li
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <ul className="mb-2 ml-1 border-l border-border pl-5">
                      {productLinks.map((link, index) => (
                        <motion.li
                          key={link.href}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 + index * 0.06, duration: 0.4, ease: EASE }}
                        >
                          <Link
                            href={link.href}
                            onClick={closeMobileMenu}
                            className="block py-2.5 text-xl text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {link.label}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.li>
                )}
              </AnimatePresence>

              <MobileRow>
                <Link href="/contacto" onClick={closeMobileMenu} className={mobileLink}>
                  Contacto
                </Link>
              </MobileRow>

            </ul>
          </motion.nav>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.45, duration: 0.6, ease: EASE }}
            className="text-sm text-muted-foreground"
          >
            Artesanía inspirada en el mar
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header className="pointer-events-none sticky top-0 z-70 px-3 pt-3 sm:px-4">
        <motion.nav
          aria-label="Principal"
          initial={{ y: -32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="pointer-events-auto mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border border-white/70 bg-background/70 pl-2 pr-2 shadow-[inset_0_1px_0_oklch(1_0_0/0.7),var(--shadow-soft)] backdrop-blur-xl"
        >
          <Link href="/" className="group flex items-center gap-2.5 rounded-full pr-3">
            <span className="relative size-10 overflow-hidden rounded-full ring-1 ring-foreground/5 transition-transform duration-500 ease-(--ease-fluid) group-hover:rotate-[-8deg] group-hover:scale-105">
              <Image src="/logo-mar.jpg" alt="" fill sizes="40px" className="object-cover" priority />
            </span>
            <span className="text-lg font-semibold tracking-tight">{site.name}</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/sobre-nosotros"
              className={`${desktopLink} ${isActive("/sobre-nosotros") ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {isActive("/sobre-nosotros") && <ActivePill />}
              Sobre nosotros
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setProductsMenuOpen(true)}
              onMouseLeave={() => setProductsMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setProductsMenuOpen((open) => !open)}
                className={`${desktopLink} flex items-center gap-1 ${productsActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                aria-expanded={productsMenuOpen}
                aria-haspopup="true"
              >
                {productsActive && <ActivePill />}
                Productos
                <ChevronDown
                  className={`size-3.5 transition-transform duration-300 ease-(--ease-fluid) ${productsMenuOpen ? "rotate-180" : ""}`}
                  strokeWidth={1.75}
                />
              </button>

              <AnimatePresence>
                {productsMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 6, scale: 0.98, filter: "blur(4px)" }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
                  >
                    <div className="w-56 rounded-[1.25rem] bg-foreground/[0.04] p-1.5 ring-1 ring-foreground/5 backdrop-blur-xl">
                      <div className="overflow-hidden rounded-[calc(1.25rem-0.375rem)] bg-background p-1 shadow-[inset_0_1px_0_oklch(1_0_0/0.8),var(--shadow-soft)]">
                        {productLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setProductsMenuOpen(false)}
                            className="group/item flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm text-foreground transition-colors duration-200 hover:bg-muted"
                          >
                            {link.label}
                            <ArrowUpRight
                              className="size-4 -translate-x-1 translate-y-1 text-muted-foreground opacity-0 transition-all duration-300 ease-(--ease-fluid) group-hover/item:translate-x-0 group-hover/item:translate-y-0 group-hover/item:opacity-100"
                              strokeWidth={1.5}
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contacto"
              className={`${desktopLink} ${isActive("/contacto") ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {isActive("/contacto") && <ActivePill />}
              Contacto
            </Link>
          </div>

          <div className="flex items-center gap-1">
            {/* Hamburger: two bars morph into an X */}
            <button
              type="button"
              className="relative flex size-10 items-center justify-center rounded-full bg-foreground/5 transition-colors duration-300 active:scale-95 md:hidden"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`absolute h-[1.5px] w-4 rounded-full bg-foreground transition-transform duration-500 ease-(--ease-fluid) ${mobileMenuOpen ? "rotate-45" : "-translate-y-[3.5px]"}`}
              />
              <span
                className={`absolute h-[1.5px] w-4 rounded-full bg-foreground transition-transform duration-500 ease-(--ease-fluid) ${mobileMenuOpen ? "-rotate-45" : "translate-y-[3.5px]"}`}
              />
            </button>
          </div>
        </motion.nav>
      </header>

      {mounted ? createPortal(mobileMenu, document.body) : null}
    </>
  );
}
