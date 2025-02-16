import { fetchWeatherData } from "@lib/fetchWeather";
import dayjs from "dayjs";

export async function getWeeklyForecast(displayCount = 25) {
  const now = dayjs();
  const baseDate = now.format("YYYYMMDD");
  const baseTime = now.format("HH00"); // ✅ HH00 형식으로 요청
  const currentHour = now.hour(); // ✅ 현재 시간 가져오기

  console.log("📌 현재 시간:", now.format("HH:mm"));
  console.log("📌 API 요청 base_date:", baseDate);
  console.log("📌 API 요청 base_time:", baseTime);

  // 🔥 API 데이터 가져오기
  const forecastData = await fetchWeatherData("getVilageFcst", now, baseDate, baseTime);
  console.log("🔍 API 응답 데이터:", forecastData);

  if (!forecastData || forecastData.length === 0) {
    console.error("❌ API 응답 오류: 데이터를 가져올 수 없습니다.");
    return [];
  }

  // 🔥 TMP 데이터 필터링 및 정렬
  let tmpDataCheck = forecastData.filter(item => item.category === "TMP");
  tmpDataCheck = tmpDataCheck.sort((a, b) => a.fcstTime - b.fcstTime); // ✅ 시간 순서 정렬
  console.log("📌 TMP 데이터 개수:", tmpDataCheck.length);
  console.log("📌 TMP 데이터 샘플:", tmpDataCheck.slice(0, 5));

  if (tmpDataCheck.length === 0) {
    console.error("❌ TMP(기온) 데이터를 가져오지 못했습니다.");
    return [];
  }

  // 🔥 현재 시간 이후의 데이터를 먼저 배치하고, 그 이전 데이터를 뒤에 추가
  const sortedTmpData = tmpDataCheck.filter(item => parseInt(item.fcstTime.substring(0, 2)) >= currentHour)
    .concat(tmpDataCheck.filter(item => parseInt(item.fcstTime.substring(0, 2)) < currentHour));

  console.log("📌 정렬된 TMP 데이터:", sortedTmpData);

  // 🔥 시간별 날씨 데이터 생성
  const hourlyForecast = sortedTmpData
    .map((item, index) => {
      const hour = parseInt(item.fcstTime.substring(0, 2));
      const isNow = index === 0;

      return {
        time: isNow ? "지금" : formatHour(hour),
        temp: item.fcstValue,
        icon: getWeatherIcon(item.fcstValue),
      };
    })
    .slice(0, displayCount);

  return hourlyForecast;
}

/**
 * ✅ 12시간제 포맷 변경
 */
function formatHour(hour) {
  const period = hour < 12 ? "오전" : "오후";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${period} ${formattedHour}시`;
}

/**
 * ✅ 날씨 코드에 따라 아이콘 매핑
 */
function getWeatherIcon(skyValue) {
  const weatherIcons = {
    "1": "/images/sunny.png",
    "3": "/images/cloudy.png",
    "4": "/images/rainy.png",
    "5": "/images/snowy.png",
  };
  return weatherIcons[skyValue] || "/images/sunny.png";
}
