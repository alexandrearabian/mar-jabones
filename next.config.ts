import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy URLs from earlier versions of the site
      {
        source: "/shop",
        has: [{ type: "query", key: "category", value: "(?<category>.+)" }],
        destination: "/productos/:category",
        permanent: true,
      },
      { source: "/shop", destination: "/productos", permanent: true },
      {
        source: "/productos",
        has: [{ type: "query", key: "categoria", value: "(?<category>.+)" }],
        destination: "/productos/:category",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
