import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'github.com',
      },
      {
        hostname: 'avesis.aybu.edu.tr',
      },
    ],
  },
}

export default nextConfig
