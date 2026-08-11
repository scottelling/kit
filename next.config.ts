import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/vanilla", destination: "/vanilla.html" }];
  },
};

export default nextConfig;
