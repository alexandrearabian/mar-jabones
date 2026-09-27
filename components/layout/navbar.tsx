"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { ArrowUpRight, ChevronDown, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wave } from "@/components/ui/wave";
import { mainNav, productNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Longest exit transition in .menu (globals.css: 0.36s + 0.04s delay) plus a margin; fallback if transitionend never fires. */
const MENU_EXIT_FALLBACK_MS = 550;

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDialogElement>(null);
  const productsRef = useRef<HTMLLIElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [navigating, startNavigation] = useTransition();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // A new route has rendered: forget the pending link (render-time reset, no effect needed)
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    setPendingHref(null);
  }

  // Close with the sink animation: mark "closing", wait for the tide (the last layer to sink) to finish,
  // then really close the dialog (which also restores focus to the menu button).
  const closeMenu = useCallback(() => {
    const dialog = menuRef.current;
    if (!dialog?.open || dialog.dataset.state === "closing") return;
    dialog.dataset.state = "closing";
    const tide = dialog.querySelector<HTMLElement>(".menu-tide");
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      tide?.removeEventListener("transitionend", onEnd);
      delete dialog.dataset.state;
      dialog.close();
    };
    const onEnd = (e: TransitionEvent) => e.target === tide && e.propertyName === "transform" && finish();
    tide?.addEventListener("transitionend", onEnd);
    window.setTimeout(finish, MENU_EXIT_FALLBACK_MS);
  }, []);

  // ...and only once the new route has rendered, so the tide reveals the destination
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Desktop "Productos" menu: Escape or a click/tap outside closes it (hover alone fails on touch screens)
  useEffect(() => {
    if (!productsOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setProductsOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!productsRef.current?.contains(e.target as Node)) setProductsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [productsOpen]);

  // Mobile menu is a modal <dialog>: native focus trap, Escape to close, page behind is inert.
  const openMenu = () => {
    const dialog = menuRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    // showModal() focuses the first link while the panel is still below the screen; undo any scroll that
    // caused and move focus to the close button, which doesn't scroll anything
    dialog.scrollTop = 0;
    dialog.querySelector<HTMLElement>("[data-menu-close]")?.focus({ preventScroll: true });
    // Commit the start position and give the browser one frame to paint both layers there, so the rise
    // starts on an already-painted frame instead of painting and moving at once
    dialog.querySelector<HTMLElement>(".menu-panel")?.getBoundingClientRect();
    requestAnimationFrame(() => requestAnimationFrame(() => (dialog.dataset.state = "open")));
    setMenuOpen(true);
    // Warm up every destination so the switch is usually instant
    for (const link of [...mainNav, ...productNav]) router.prefetch(link.href);
  };

  // Navigate straight away and keep the menu up (the tapped row shows progress); the pathname effect
  // above closes it once the new page has rendered. New-tab clicks keep the default behaviour.
  const navigateFromMenu = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (href === pathname) return closeMenu();
    setPendingHref(href);
    startNavigation(() => router.push(href));
  };
  const isPending = (href: string) => navigating && pendingHref === href;

  const navLink = (active: boolean) =>
    cn(
      "relative inline-flex h-11 items-center gap-1 rounded-full px-4 text-[15px] font-medium transition-colors duration-300",
      "after:absolute after:inset-x-4 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-primary after:transition-transform after:duration-300 after:ease-(--ease-out-expo)",
      active
        ? "text-foreground after:scale-x-100"
        : "text-foreground/80 after:scale-x-0 hover:bg-foreground/5 hover:text-foreground",
      focusRing,
    );

  return (
    <header className="pointer-events-none sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <nav
        aria-label="Principal"
        className="glass animate-enter pointer-events-auto mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full pl-2 pr-2 md:pr-3"
      >
        <Brand className={focusRing} />

        <ul className="hidden items-center gap-1 md:flex">
          <li
            ref={productsRef}
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setProductsOpen((open) => !open)}
              className={navLink(isActive("/productos"))}
              aria-expanded={productsOpen}
              aria-controls="menu-productos"
            >
              Productos
              <ChevronDown
                className={cn("size-4 transition-transform duration-300", productsOpen && "rotate-180")}
                strokeWidth={1.75}
                aria-hidden
              />
            </button>
            <div
              id="menu-productos"
              data-open={productsOpen}
              className="absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-300 ease-(--ease-out-expo) data-[open=false]:invisible data-[open=false]:translate-y-1 data-[open=false]:opacity-0"
            >
              <ul className="glass w-60 rounded-2xl p-1.5">
                {productNav.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setProductsOpen(false)}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className={cn(
                        "flex h-11 items-center rounded-xl px-4 text-[15px] text-foreground/85 transition-colors hover:bg-foreground/5 hover:text-foreground aria-[current=page]:font-medium aria-[current=page]:text-primary",
                        focusRing,
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          {mainNav.slice(1).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={navLink(isActive(link.href))}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <MenuButton open={menuOpen} onClick={openMenu} label="Abrir menú" className={cn("md:hidden", focusRing)} />
      </nav>

      <dialog
        ref={menuRef}
        aria-label="Menú"
        aria-busy={navigating}
        onClose={() => setMenuOpen(false)}
        onCancel={(e) => {
          // Escape: animate out instead of the browser's instant close
          e.preventDefault();
          closeMenu();
        }}
        className="menu pointer-events-auto m-0 h-dvh max-h-none w-full max-w-none overflow-clip border-0 p-0 text-foreground"
      >
        {/* The tide: a sand wave leads, the foam panel follows with its own crest */}
        <div aria-hidden className="menu-tide absolute inset-0 bg-sand">
          <Wave tone="sand" edge="top" size="lg" />
        </div>

        <div className="menu-panel absolute inset-0 bg-background">
          <Wave tone="foam" edge="top" size="lg" />
          <div className="relative flex h-full flex-col overflow-y-auto overflow-x-hidden overscroll-contain px-3 pt-3 sm:px-4">
            {/* Mirrors the navbar, so the pill seems to open in place */}
            <div className="mx-auto flex h-16 w-full max-w-7xl shrink-0 items-center justify-between pl-2 pr-2">
              <Brand className={focusRing} onClick={(e) => navigateFromMenu(e, "/")} />
              <MenuButton open onClick={closeMenu} label="Cerrar menú" className={focusRing} data-menu-close />
            </div>

            <nav aria-label="Menú principal" className="flex-1 px-2 pt-8">
              <ul className="border-t border-foreground/10">
                {mainNav.map((link) => {
                  const active = isActive(link.href);
                  const pending = isPending(link.href);
                  return (
                    <li
                      key={link.href}
                      className="border-b border-foreground/10"
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => navigateFromMenu(e, link.href)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group relative flex min-h-16 items-center justify-between gap-4 py-4 transition-colors active:bg-foreground/5",
                          focusRing,
                        )}
                      >
                        <span>
                          <span
                            className={cn(
                              "block font-display text-[2rem] font-semibold leading-tight tracking-tight",
                              (active || pending) && "text-primary",
                            )}
                          >
                            {link.label}
                          </span>
                          <span className="mt-0.5 block text-[15px] text-muted-foreground">{link.description}</span>
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          strokeWidth={1.5}
                          className={cn(
                            "size-6 shrink-0 text-foreground/50 transition-transform duration-300 ease-(--ease-out-expo) group-active:translate-x-0.5",
                            pending && "-translate-y-1 translate-x-1 text-primary",
                          )}
                        />
                        {/* Tap acknowledged: a line sweeps under the row while the next page loads */}
                        {pending ? (
                          <span
                            aria-hidden
                            className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-primary animate-[progress_0.9s_var(--ease-out-expo)_both]"
                          />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8">
                <p className="text-sm text-muted-foreground">Explorá por categoría</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {productNav.slice(1).map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={(e) => navigateFromMenu(e, link.href)}
                        aria-current={pathname === link.href ? "page" : undefined}
                        className={cn(
                          "inline-flex h-11 items-center rounded-full px-5 text-[15px] font-medium ring-1 ring-inset ring-foreground/15 transition-colors active:bg-sand aria-[current=page]:bg-sand aria-[current=page]:ring-primary",
                          isPending(link.href) && "bg-sand ring-primary",
                          focusRing,
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* The site's main action, kept clear of the home indicator */}
            <div className="relative z-[2] px-2 pb-[max(6rem,calc(env(safe-area-inset-bottom)+5rem))] pt-10 md:pb-32">
              <Button asChild size="lg" className="w-full">
                <a href={site.instagram.messageUrl} target="_blank" rel="noopener noreferrer">
                  <Instagram strokeWidth={1.75} />
                  Escribime por Instagram
                </a>
              </Button>
              <p className="mt-3 text-center text-sm text-muted-foreground">@{site.instagram.handle}</p>
            </div>
            <Wave tone="deep" edge="inside" />
          </div>
        </div>
      </dialog>
    </header>
  );
}

function Brand({ className, onClick }: { className?: string; onClick?: React.MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <Link href="/" onClick={onClick} className={cn("group flex items-center gap-3 rounded-full pr-3", className)}>
      <img
        src={site.logo}
        alt=""
        width={44}
        height={44}
        className="size-11 rounded-full ring-1 ring-foreground/10 transition-transform duration-500 ease-(--ease-fluid) group-hover:-rotate-12"
      />
      <span className="font-display text-xl font-semibold tracking-tight">{site.name}</span>
    </Link>
  );
}

/** Two bars that sit as a hamburger or cross into an X. */
function MenuButton({
  open,
  label,
  className,
  onClick,
  ...rest
}: {
  open: boolean;
  label: string;
  className?: string;
  onClick: () => void;
  "data-menu-close"?: boolean;
}) {
  return (
    <button
      {...rest}
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-haspopup="dialog"
      aria-expanded={open}
      className={cn(
        "relative flex size-12 items-center justify-center rounded-full bg-foreground/5 transition-[background-color,transform] hover:bg-foreground/10 active:scale-95",
        className,
      )}
    >
      <span
        className={cn(
          "absolute h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-(--ease-fluid)",
          open ? "rotate-45" : "-translate-y-1",
        )}
      />
      <span
        className={cn(
          "absolute h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-(--ease-fluid)",
          open ? "-rotate-45" : "translate-y-1",
        )}
      />
    </button>
  );
}
