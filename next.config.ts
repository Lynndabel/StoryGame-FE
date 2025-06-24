import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'http',           // ← allow http
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/authenticate/:path*",
      },
    ];
  },
  env: {
    GIG_MARKET_PLACE: process.env.GIG_MARKET_PLACE,
    REGISTRY: process.env.REGISTRY,
    TOKEN: process.env.TOKEN,
    CRAFT_COIN: process.env.CRAFT_COIN,
    REVIEW_SYSTEM: process.env.REVIEW_SYSTEM,
    CHAT_SYSTEM: process.env.CHAT_SYSTEM,
    PROJECT_ID: process.env.PROJECT_ID,
    PAYMENT_PROCESSOR: process.env.PAYMENT_PROCESSOR,
    RPC_URL: process.env.RPC_URL,
    WSS_RPC_URL: process.env.WSS_RPC_URL,
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_SECRET_API_KEY: process.env.PINATA_SECRET_API_KEY,
    PINATA_URL: process.env.PINATA_URL,
    PINATA_JWT: process.env.PINATA_JWT,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    CLOUDINARY_PRESET: process.env.CLOUDINARY_PRESET,
    SERVER_URL: process.env.SERVER_URL,
    RELAYER_URL: process.env.RELAYER_URL,
  },
};

export default nextConfig;