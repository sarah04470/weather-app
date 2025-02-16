import { API_KEY, BASE_URL, DEFAULT_X, DEFAULT_Y } from "@constants/config";
import dayjs from "dayjs";

export async function fetchWeatherData(type) {
  // ✅ base_date를 오늘 날짜로 설정 (미래 날짜 방지)
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

  const url = `${BASE_URL}/${type}?serviceKey=${API_KEY}&numOfRows=250&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${DEFAULT_X}&ny=${DEFAULT_Y}`;

  console.log("📌 API 요청 URL:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("🔍 API 응답 데이터:", data);

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
