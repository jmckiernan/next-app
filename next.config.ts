import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  experimental: {
    turbo: true, 
    legacyBrowsers: false,
    modern: true,
  },
};

export default nextConfig;
