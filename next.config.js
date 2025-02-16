const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // Next.js의 기본 SWC 설정 사용
  },
  experimental: {
    swcPlugins: [["styled-components", { ssr: true }]], // Babel 설정을 SWC로 대체
  },
};
module.exports = nextConfig;
