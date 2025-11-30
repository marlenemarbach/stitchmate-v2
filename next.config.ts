import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  experimental: {
    cacheComponents: true,  // Enable Cache Components (experimental in 16.0.0 stable)
  },
};

export default nextConfig;
