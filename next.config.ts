import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ibc/survey-results",
  assetPrefix: "/ibc/survey-results",
  images: { unoptimized: true },
};

export default nextConfig;
