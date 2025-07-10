import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "img1.kakaocdn.net",
      },
    ],
  },
};

export default nextConfig;
