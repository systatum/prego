import type { NextConfig } from "next";

const isProdBuild = process.env.BUILD_ENV === "production";
const nextConfig: NextConfig = {
  // output: isProdBuild ? "export" : "standalone",
  // reactStrictMode: isProdBuild,
  // distDir: "out",
  /* config options here */
};

export default nextConfig;
