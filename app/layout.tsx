import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Providers } from "@/components/providers";
import { site } from "@/lib/site";
import "./globals.css";

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
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${GeistSans.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
