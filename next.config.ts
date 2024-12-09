import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // This enables static HTML export
  images: {
    unoptimized: true  // Required for static export
  }
}

export default nextConfig;
