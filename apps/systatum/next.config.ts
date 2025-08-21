import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async headers() {
    const headers = [
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
      {
        key: "Content-Security-Policy",
        value: "frame-ancestors 'self'",
      },
    ];
    return [
      {
        source: "/((?!admin/).*)",
        headers,
      },
    ];
  },
  env: {
    NEXT_PUBLIC_TINA_MODE: process.env.NEXT_PUBLIC_TINA_MODE,
  },
};

export default withNextIntl(nextConfig);
