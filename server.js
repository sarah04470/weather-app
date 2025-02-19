require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const morgan = require("morgan"); // ✅ HTTP 요청 로그 확인용

const app = express();
const PORT = process.env.PORT || 5000; // ✅ 기본 포트 5000
const API_ORIGIN = process.env.ORIGIN || 3000; // ✅ 프론트엔드 도메인
const API_TARGET = "http://apis.data.go.kr/1360000"; // ✅ 기상청 API 원본 주소

const cache = new Map();

// ✅ CORS 설정 (프론트엔드 도메인 허용)
app.use(
  cors({
    origin: API_ORIGIN, // 허용할 프론트엔드 주소
    credentials: true, // 쿠키 및 인증정보 포함 허용
    methods: "GET,POST,PUT,DELETE", // 허용할 HTTP 메서드
    allowedHeaders: "Content-Type,Authorization", // 허용할 헤더
  }),
);

// ✅ HTTP 요청 로그 출력 (디버깅용)
app.use(morgan("dev"));

// ✅ 프록시 미들웨어 설정 (기상청 API 요청을 프록시 처리)
app.use(
  "/api/weather",
  createProxyMiddleware({
    target: API_TARGET,
    changeOrigin: true,
    pathRewrite: (path, req) => {
      console.log("📌 원본 요청 URL:", path);
      return path.replace("/api/weather", ""); // "/api/weather" 부분을 제거
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`📡 [프록시 요청] ${req.method} ${req.url}`);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`✅ [프록시 응답] 상태 코드: ${proxyRes.statusCode}`);
    },
  }),
);

// ✅ 기본 서버 상태 확인용 엔드포인트
app.get("/", (req, res) => {
  res.send("🚀 프록시 서버가 정상 작동 중!");
});

// ✅ 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 프록시 서버가 http://localhost:${PORT} 에서 실행 중!`);
});
