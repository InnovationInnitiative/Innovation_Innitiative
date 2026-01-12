import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://biguzgtauptfsnvunzyu.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "sb_publishable_O3iCyKElHMYx5m6bU_8hCA_ceZpZK72",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      // Allow loading images from Supabase
      {
        protocol: 'https',
        hostname: 'biguzgtauptfsnvunzyu.supabase.co',
      },
    ],
  },
};

export default nextConfig;
