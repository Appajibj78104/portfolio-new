import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true
  },
  // Remove static export and base path for Vercel deployment
  experimental: {
    optimizePackageImports: ['three', '@react-three/fiber', '@react-three/drei']
  }
};

export default nextConfig;
