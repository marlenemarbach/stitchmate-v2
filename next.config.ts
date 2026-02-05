import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  serverExternalPackages: ["@libsql/client", "libsql", "drizzle-orm"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
