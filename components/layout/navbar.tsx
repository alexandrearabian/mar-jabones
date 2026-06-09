"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const HEADER_OFFSET = "4.5rem";

const productLinks = [
  { href: "/productos/jabones", label: "Jabones" },
  { href: "/productos/resinas", label: "Resinas" },
];

const menuContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const menuItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.15 } },
};

function NavUnderline({ active = false }: { active?: boolean }) {
  return (
    <motion.span
      className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-foreground"
      initial={false}
      animate={{ scaleX: active ? 1 : 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.2 }}
    />
  );
}

export function Navbar() {
  const { status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileProductsOpen(false);
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const mobileMenu = (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          key="mobile-menu"
          className="fixed inset-0 z-60 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            aria-label="Cerrar menú"
            className="absolute inset-0 bg-background/75 backdrop-blur-md"
            style={{ top: HEADER_OFFSET }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
          />

          <motion.nav
            className="fixed inset-x-0 bottom-0 flex max-h-[calc(100dvh-4.5rem)] flex-col overflow-y-auto border-t bg-background px-6 pb-10 pt-8 shadow-2xl"
            style={{ top: HEADER_OFFSET }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
          >
            <motion.ul
              variants={menuContainer}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col gap-1"
            >
              <motion.li variants={menuItem}>
                <Link
                  href="/sobre-nosotros"
                  onClick={closeMobileMenu}
                  className="block rounded-xl px-3 py-4 text-2xl font-medium tracking-tight text-foreground transition-colors active:bg-muted"
                >
                  Sobre nosotros
                </Link>
              </motion.li>

              <motion.li variants={menuItem} className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileProductsOpen((open) => !open)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-4 text-left text-2xl font-medium tracking-tight text-foreground transition-colors active:bg-muted"
                  aria-expanded={mobileProductsOpen}
                >
                  Productos
                  <motion.span
                    animate={{ rotate: mobileProductsOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {mobileProductsOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden border-l border-border/60 pl-5"
                    >
                      {productLinks.map((link, index) => (
                        <motion.li
                          key={link.href}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.06, duration: 0.25 }}
                        >
                          <Link
                            href={link.href}
                            onClick={closeMobileMenu}
                            className="block rounded-lg px-3 py-3 text-lg text-muted-foreground transition-colors hover:text-foreground active:bg-muted"
                          >
                            {link.label}
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.li>

              <motion.li variants={menuItem}>
                <Link
                  href="/contacto"
                  onClick={closeMobileMenu}
                  className="block rounded-xl px-3 py-4 text-2xl font-medium tracking-tight text-foreground transition-colors active:bg-muted"
                >
                  Contacto
                </Link>
              </motion.li>

              {isAuthenticated && (
                <>
                  <motion.li variants={menuItem} className="mt-4 border-t border-border pt-4">
                    <Link
                      href="/dashboard"
                      onClick={closeMobileMenu}
                      className="block rounded-xl px-3 py-3 text-lg font-medium text-foreground transition-colors active:bg-muted"
                    >
                      Mi cuenta
                    </Link>
                  </motion.li>
                  <motion.li variants={menuItem}>
                    <Link
                      href="/dashboard/orders"
                      onClick={closeMobileMenu}
                      className="block rounded-xl px-3 py-3 text-lg font-medium text-foreground transition-colors active:bg-muted"
                    >
                      Mis pedidos
                    </Link>
                  </motion.li>
                  <motion.li variants={menuItem}>
                    <button
                      type="button"
                      onClick={() => {
                        signOut();
                        closeMobileMenu();
                      }}
                      className="block w-full rounded-xl px-3 py-3 text-left text-lg font-medium text-foreground transition-colors active:bg-muted"
                    >
                      Cerrar sesión
                    </button>
                  </motion.li>
                </>
              )}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-auto pt-10 text-center text-sm text-muted-foreground"
            >
              Artesanía inspirada en el mar
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header className="sticky top-0 z-70 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6"
        >
          <Link href="/" className="flex items-center gap-2">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="text-2xl font-semibold tracking-tight"
            >
              Mar Jabones
            </motion.span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/sobre-nosotros"
              className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Sobre nosotros
              <NavUnderline />
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setProductsMenuOpen(true)}
              onMouseLeave={() => setProductsMenuOpen(false)}
            >
              <button
                type="button"
                className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                aria-expanded={productsMenuOpen}
                aria-haspopup="true"
              >
                Productos
                <NavUnderline active={productsMenuOpen} />
              </button>

              <AnimatePresence>
                {productsMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
                  >
                    <div className="w-48 overflow-hidden rounded-lg border bg-background shadow-lg">
                      {productLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contacto"
              className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contacto
              <NavUnderline />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && !isLoading && (
              <DropdownMenu
                trigger={
                  <Button variant="ghost" size="icon" aria-label="Mi cuenta">
                    <User className="h-5 w-5" />
                  </Button>
                }
              >
                <DropdownMenuItem>
                  <Link href="/dashboard">Mi cuenta</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard/orders">Mis pedidos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>Cerrar sesión</DropdownMenuItem>
              </DropdownMenu>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex"
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex"
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </motion.nav>
      </header>

      {mounted ? createPortal(mobileMenu, document.body) : null}
    </>
  );
}
