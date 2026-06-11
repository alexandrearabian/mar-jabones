import type { NextConfig } from "next";

function strapiRemotePatterns(): NonNullable<NextConfig["images"]>["remotePatterns"] {
  const raw = process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!raw) return [];
  try {
    const u = new URL(raw);
    const protocol = u.protocol === "https:" ? "https" : "http";
    const port = u.port ? { port: u.port } : {};
    const hostnames = new Set<string>([u.hostname]);
    if (u.hostname === "localhost") hostnames.add("127.0.0.1");
    if (u.hostname === "127.0.0.1") hostnames.add("localhost");

    // Strapi Cloud serves media from a separate CDN host (*.media.strapiapp.com).
    if (u.hostname.endsWith(".strapiapp.com") && !u.hostname.includes(".media.")) {
      hostnames.add(u.hostname.replace(".strapiapp.com", ".media.strapiapp.com"));
    }

    return [...hostnames].flatMap((hostname) => {
      const isMediaCdn = hostname.endsWith(".media.strapiapp.com");
      return [
        {
          protocol,
          hostname,
          ...port,
          pathname: isMediaCdn ? "/**" : "/uploads/**",
        },
      ];
    });
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: strapiRemotePatterns(),
  },
  async redirects() {
    return [
      {
        source: "/shop",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/shop",
        has: [{ type: "query", key: "category", value: "jabones" }],
        destination: "/productos?categoria=jabones",
        permanent: true,
      },
      {
        source: "/shop",
        has: [{ type: "query", key: "category", value: "resinas" }],
        destination: "/productos?categoria=resinas",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
