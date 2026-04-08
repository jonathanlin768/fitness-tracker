import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  // 使用自定义域名时，移除 basePath
  // basePath: process.env.NODE_ENV === 'production' ? '/fitness-tracker' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
