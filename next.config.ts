import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  typescript: {
    ignoreBuildErrors: true, 
  },
};

export default nextConfig;


