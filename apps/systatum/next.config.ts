import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.BUILD_ENV === "production" ? "export" : "standalone",
  distDir: "out",
  /* config options here */
};

export default nextConfig;
