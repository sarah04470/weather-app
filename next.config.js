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
        destination:
          process.env.NODE_ENV === "development"
            ? "http://localhost:5000/api/weather/:path*"
            : "https://weather-proxy-server-altl.onrender.com/api/weather/:path*",
      },
    ];
  },
};
module.exports = nextConfig;
