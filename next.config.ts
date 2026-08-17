import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ── Image optimization ── */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.visitsaudi.com",
      },
    ],
  },

  /* ── Compiler optimizations ── */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  /* ── Experimental features ── */
  experimental: {
    optimizeCss: true,
  },

  /* ── Redirects for clean URLs ── */
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
