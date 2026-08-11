import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/vanilla", destination: "/vanilla.html" },
      // Sourced-kit showrooms (docs/KIT-INTAKE.md) — one rewrite per kit.
      { source: "/kit/space", destination: "/kit-space.html" },
    ];
  },
};

export default nextConfig;
