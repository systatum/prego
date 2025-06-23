import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : "standalone",
  /* config options here */
};

export default nextConfig;
