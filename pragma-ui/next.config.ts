import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/auth/:path*",
        destination: `https://feed.devnet.pragma.build/v1/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
