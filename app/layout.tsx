import type { Metadata } from "next";
import localFont from "next/font/local";
import { preconnect } from "react-dom";
import { site } from "@/lib/site";
import "./globals.css";

const body = localFont({
  src: "./fonts/figtree.woff2",
  weight: "300 900",
  variable: "--font-body",
  display: "swap",
});

const display = localFont({
  src: "./fonts/bricolage-grotesque.woff2",
  weight: "500 700",
  variable: "--font-display-face",
  display: "swap",
});

const title = `${site.name} - Jabones y resinas artesanales`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  icons: { icon: "/logo-mar.jpg", apple: "/logo-mar.jpg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Open the connection to the image CDN while the HTML is still arriving
  preconnect("https://cdn.sanity.io");
  return (
    <html lang="es" className={`${body.variable} ${display.variable} scroll-smooth`}>
      <head>
        {/* Photos fade in once loaded (sanity-image.tsx); without JavaScript, just show them */}
        <noscript>
          <style>{"[data-img-fade]{opacity:1!important}.skeleton{display:none}"}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
