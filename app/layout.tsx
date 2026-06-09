// Root layout with SEO metadata and global providers

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "@/components/providers/session-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mar Jabones - Jabones y Resinas Artesanales",
    template: "%s | Mar Jabones",
  },
  description:
    "Jabones y resinas artesanales inspirados en el mar. Piezas únicas hechas a mano.",
  keywords: [
    "jabones artesanales",
    "resinas",
    "productos naturales",
    "caribe",
    "hecho a mano",
  ],
  authors: [{ name: "Mar Jabones" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: process.env.NEXTAUTH_URL || "https://marjabones.com",
    siteName: "Mar Jabones",
    title: "Mar Jabones - Jabones y Resinas Artesanales",
    description:
      "Jabones y resinas artesanales inspirados en el mar. Piezas únicas hechas a mano.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mar Jabones",
    description: "Jabones y resinas artesanales inspirados en el mar",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Toaster>
            {children}
          </Toaster>
        </SessionProvider>
      </body>
    </html>
  );
}
