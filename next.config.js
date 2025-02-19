const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // Next.js의 기본 SWC 설정 사용
  },
  experimental: {
    swcPlugins: [["styled-components", { ssr: true }]], // Babel 설정을 SWC로 대체
  },
  async rewrites() {
    return [
      {
        source: "/api/weather/:path*", // 요청 URL
        destination: "http://localhost:5000/api/weather/:path*", // 기상청 API URL
      },
    ];
  },
};
module.exports = nextConfig;
