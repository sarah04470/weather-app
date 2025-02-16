/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      unoptimized: true, // Netlify에서 next/image 사용 가능하게 설정
    },
  };
  
  module.exports = nextConfig;
  