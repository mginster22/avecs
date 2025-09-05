import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "", // оставь пустым
        pathname: "/**", // все пути
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
