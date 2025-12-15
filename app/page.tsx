"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Instagram, Facebook, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Product = {
  id: string;
  name: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
};

const heroSlides = [
  {
    id: "jabones-marinos",
    title: "Jabones inspirados en el mar",
    description:
      "Piezas únicas con formas de ballenas, tortugas y faros, hechas a mano en pequeños lotes.",
    imageSrc:
      "/WhatsApp Image 2025-12-11 at 18.08.35.jpeg",
  },
  {
    id: "olas-azules",
    title: "Texturas de ola y espuma",
    description:
      "Barras de jabón con capas que recuerdan al océano, brillo sutil y detalles dorados.",
    imageSrc:
      "/WhatsApp Image 2025-12-11 at 18.08.36 (1).jpeg",
  },
  {
    id: "resinas-coloridas",
    title: "Resinas llenas de color",
    description:
      "Piezas de resina cristalina con miniaturas y patrones juguetones, ideales para decorar o regalar.",
    imageSrc:
      "/WhatsApp Image 2025-12-11 at 18.17.58 (1).jpeg",
  },
];

const featuredProducts: Product[] = [
  {
    id: "olas-dorado",
    name: "Jabón Olas Doradas",
    price: "$12.000",
    imageSrc:
      "/WhatsApp Image 2025-12-11 at 18.08.36 (1).jpeg",
    imageAlt: "Jabón artesanal con capas azules y detalles dorados en forma de ola.",
  },
  {
    id: "marino-infantil",
    name: "Set Marino Infantil",
    price: "$18.000",
    imageSrc:
      "/WhatsApp Image 2025-12-11 at 18.08.35.jpeg",
    imageAlt: "Set de jabones azules con formas de faro, ballena y árbol.",
  },
  {
    id: "resina-confetti",
    name: "Resina Confetti",
    price: "$20.000",
    imageSrc:
      "/WhatsApp Image 2025-12-11 at 18.17.58 (1).jpeg",
    imageAlt: "Piezas de resina transparente con figuras y colores vivos en su interior.",
  },
  {
    id: "resina-luna",
    name: "Resina Luna Marina",
    price: "$16.000",
    imageSrc:
      "/WhatsApp Image 2025-12-11 at 18.17.58.jpeg",
    imageAlt: "Resina circular con pequeños motivos florales formando una media luna.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);

    return () => window.clearInterval(id);
  }, []);

  const currentHero = heroSlides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-amber-50 text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-100/80 bg-white/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a
            href="#inicio"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-800"
          >
            <span className="hidden sm:inline text-2xl">
              Mar&nbsp;Jabones
            </span>
          </a>

          <div className="flex items-center gap-6 text-sm font-medium">
            <a
              href="#inicio"
              className="text-slate-700 transition-colors hover:text-sky-700"
            >
              Inicio
            </a>
            <a
              href="#productos"
              className="text-slate-700 transition-colors hover:text-sky-700"
            >
              Productos
            </a>
            <a
              href="#contacto"
              className="text-slate-700 transition-colors hover:text-sky-700"
            >
              Contacto
            </a>
          </div>

          <button
            type="button"
            aria-label="Ver carrito"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-sky-200 hover:text-sky-700"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        </nav>
      </header>

      <main id="inicio" className="mx-auto max-w-6xl px-0 pb-16 pt-4 sm:px-0">
        {/* Hero / Carousel full width */}
        <section className="relative mb-16 -mx-0">
          <div className="relative w-full">
            <div className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentHero.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentHero.imageSrc}
                    alt={currentHero.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Overlapping brand title */}
              <div className="pointer-events-none absolute inset-x-4 top-10 flex justify-start sm:top-12 sm:inset-x-8">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-left text-5xl font-semibold leading-none tracking-tight text-white drop-shadow-[0_18px_40px_rgba(0,0,0,0.7)] sm:text-7xl md:text-8xl"
                >
                  Mar&nbsp;Jabones
                </motion.h1>
              </div>

              {/* Hero copy / CTA near bottom */}
              <div className="pointer-events-auto absolute inset-x-4 bottom-10 flex flex-col gap-4 text-left text-slate-50 sm:inset-x-10 sm:max-w-lg">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur"
                >
                  Hecho a mano en el Caribe
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.16 }}
                  className="text-sm leading-relaxed text-slate-100 sm:text-base"
                >
                  Jabones y resinas artesanales con texturas de ola, espuma y arena. Piezas únicas
                  para regalar o cuidar tu ritual diario.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.22 }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <Button
                    asChild
                    className="rounded-full bg-sky-700 px-6 py-2 text-sm font-medium text-white shadow-md shadow-sky-900/40 transition hover:bg-sky-800"
                  >
                    <a href="#productos">Ver colección</a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-white/60 bg-white/10 px-5 py-2 text-xs font-medium text-slate-50 backdrop-blur hover:bg-white/20"
                  >
                    <a href="#contacto">Encargar a medida</a>
                  </Button>
                </motion.div>
              </div>

              {/* Slide indicator & controls */}
              <div className="pointer-events-auto absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-slate-900/50 px-4 py-1.5 text-[11px] text-slate-100 backdrop-blur">
                <span>
                  {currentSlide + 1} / {heroSlides.length}
                </span>
                <div className="flex gap-1.5">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentSlide
                          ? "w-4 bg-sky-400"
                          : "w-2 bg-slate-400/70 hover:bg-slate-200"
                      }`}
                      aria-label={`Ir al slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main content container */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Featured products */}
        <section id="productos" className="mb-16 space-y-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-2"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              Colección destacada
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Piezas que capturan el movimiento del mar.
            </h2>
            <p className="text-sm text-slate-600 sm:text-base">
              Jabones y resinas listos para llevar, disponibles en cantidades
              limitadas. Si te enamoras de alguno, puedes escribir para
              reservarlo.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
            className="grid gap-6 pt-2 sm:grid-cols-2 lg:grid-cols-4"
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{
                  y: -6,
                  boxShadow:
                    "0 20px 40px rgba(15, 23, 42, 0.12)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group"
              >
                <Card className="flex h-full flex-col overflow-hidden border-slate-100 bg-white/90">
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 220px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-80" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(251,191,36,0.24),transparent_50%)] opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold text-slate-900">
                      {product.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between gap-3 pt-0">
                    <p className="text-sm font-semibold text-sky-800">
                      {product.price}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full rounded-full border-sky-100 bg-sky-600/90 text-xs font-medium text-white shadow-sm transition hover:bg-sky-700"
                    >
                      Añadir al carrito
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Contact section */}
        <section
          id="contacto"
          className="mb-12 rounded-3xl border border-slate-100 bg-white/80 p-5 shadow-sm shadow-sky-50 sm:p-8"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start"
          >
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                Hablemos
              </p>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                ¿Querés un pedido especial o tenés una idea en mente?
              </h2>
              <p className="text-sm text-slate-600 sm:text-base">
                Completá el formulario y contanos qué querés crear. También
                podés escribirnos por Instagram.
              </p>

              <div className="mt-4 space-y-2 text-xs text-slate-700 sm:text-sm">
                <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-sky-50 px-3 py-2 text-sky-800">
                  <Instagram className="h-4 w-4" />
                  <span className="font-medium">Instagram:</span>
                  <a
                    href="https://instagram.com/mardjabones.jabones"
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    @mardjabones.jabones
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-sky-50 px-3 py-2 text-sky-900">
                  <Facebook className="h-4 w-4" />
                  <span className="font-medium">Facebook:</span>
                  <a
                    href="https://facebook.com/mardjabones"
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    mardjabones
                  </a>
                </div>
<div className="flex flex-wrap items-center gap-2 rounded-2xl bg-sky-50 px-3 py-2 text-sky-800">
                  <Mail className="h-4 w-4" />
                  <span className="font-medium">Correo:</span>
                  <a
                    href="mailto:mardjabones@hotmail.com"
                    className="underline-offset-4 hover:underline"
                  >
                    mardjabones@hotmail.com
                  </a>
                </div>
              </div>
            </div>

            <form className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-medium text-slate-700 sm:text-sm"
                >
                  Nombre
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="¿Cómo te llamás?"
                  autoComplete="name"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-slate-700 sm:text-sm"
                >
                  Correo electrónico
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-medium text-slate-700 sm:text-sm"
                >
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Contame qué tipo de jabones o resinas estás buscando, cantidades aproximadas y fechas."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="mt-1 w-full rounded-full bg-sky-700 text-sm font-medium text-white shadow-md shadow-sky-200 transition hover:bg-sky-800"
              >
                Enviar mensaje
              </Button>

              <p className="text-[11px] leading-relaxed text-slate-500">
                Respondo normalmente en menos de 24 horas. Los pedidos
                personalizados requieren al menos 7 días de anticipación.
              </p>
            </form>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col gap-3 border-t border-slate-100 pt-4 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
          <p>© {new Date().getFullYear()} Mar Jabones. Hecho a mano con amor.</p>
          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <a
              href="https://instagram.com/mardjabones.jabones"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-sky-700"
            >
              <Instagram className="h-3.5 w-3.5" />
              <span>@mardjabones.jabones</span>
            </a>
            <a
              href="https://facebook.com/mardjabones"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-sky-700"
            >
              <Facebook className="h-3.5 w-3.5" />
              <span>Facebook</span>
            </a>
            <a
              href="mailto:mardjabones@hotmail.com"
              className="inline-flex items-center gap-1 hover:text-sky-700"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Mail</span>
            </a>
          </div>
        </footer>
        </div>
      </main>
    </div>
  );
}

