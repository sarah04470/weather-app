import {
  API_KEY,
  BASE_URL,
  MID_BASE_URL,
  DEFAULT_X,
  DEFAULT_Y,
} from "@constants/config";
import dayjs from "dayjs";

export async function fetchAllWeatherData() {
  const [shortTerm, midTerm] = await Promise.all([
    fetchWeatherData("VilageFcstInfoService_2.0/getVilageFcst"),
    fetchMidWeatherData("MidFcstInfoService/getMidTa"),
  ]);

  return { shortTerm, midTerm };
}

/**
 * ✅ 단기예보 데이터 가져오기 (시간별 날씨)
 */
export async function fetchWeatherData(type) {
  let now = dayjs();
  let baseDate = now.format("YYYYMMDD");

  // ✅ 가장 최근의 유효한 base_time 찾기 (기상청은 3시간 간격으로 데이터 제공)
  const hour = now.hour();
  let baseTime = "0200"; // 기본값

  if (hour >= 23) baseTime = "2300";
  else if (hour >= 20) baseTime = "2000";
  else if (hour >= 17) baseTime = "1700";
  else if (hour >= 14) baseTime = "1400";
  else if (hour >= 11) baseTime = "1100";
  else if (hour >= 8) baseTime = "0800";
  else if (hour >= 5) baseTime = "0500";
  else {
    // 새벽 5시 이전이면 전날 2300 데이터를 사용
    now = now.subtract(1, "day");
    baseDate = now.format("YYYYMMDD");
    baseTime = "2300";
  }

  const isLocal = window.location.hostname === "localhost"; // ✅ 로컬 체크
  const baseUrl = isLocal
    ? "http://localhost:5000/api/weather/VilageFcstInfoService_2.0" // ✅ 개발 환경
    : "https://wx-proxy/api/weather/VilageFcstInfoService_2.0"; // ✅ 배포 환경

  const url = `${baseUrl}/${type}?serviceKey=${API_KEY}&numOfRows=250&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${DEFAULT_X}&ny=${DEFAULT_Y}`;

  // console.log("📌 [단기예보] API 요청 URL:", url);

  try {
    // const response = await fetch(url);
    const response = await fetch(url, {});
    const data = await response.json();

    if (!data.response?.body?.items?.item) {
      console.error("❌ API 응답이 올바르지 않습니다:", data);
      return [];
    }

    return data.response.body.items.item;
  } catch (error) {
    console.error("❌ API 요청 실패:", error);
    return [];
  }
}

/**
 * ✅ 중기예보 데이터 가져오기 (6~10일 예보)
 */
export async function fetchMidWeatherData(type) {
  // const midBaseUrl = "/api/weather/MidFcstInfoService";
  let now = dayjs();
  let baseDate = now.format("YYYYMMDD");

  // ✅ 중기예보는 하루 2번 (06:00, 18:00) 갱신됨 → 올바른 시간 선택
  const hour = now.hour();
  let baseTime = hour >= 18 ? "1800" : "0600";

  // ✅ 만약 현재 시간이 06시 이전이면, 전날 18:00 데이터 요청
  if (hour < 6) {
    baseDate = now.subtract(1, "day").format("YYYYMMDD");
    baseTime = "1800";
  }

  // ✅ 환경에 따라 API URL 동적 설정
  const isLocal = window.location.hostname === "localhost";
  const baseUrl = isLocal
    ? "http://localhost:5000/api/weather/MidFcstInfoService"
    : "https://wx-proxy/api/weather/MidFcstInfoService";

  const url = `${baseUrl}/${type}?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&dataType=JSON&regId=11B10101&tmFc=${baseDate}${baseTime}`;

  // console.log("📌 [중기예보] API 요청 URL:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.response?.body?.items?.item) {
      console.error("❌ 중기예보 API 응답 오류:", data);
      return [];
    }

    return data.response.body.items.item;
  } catch (error) {
    console.error("❌ 중기예보 API 요청 실패:", error);
    return [];
  }
}
