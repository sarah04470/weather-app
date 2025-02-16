import { fetchWeatherData, fetchMidWeatherData } from "@lib/fetchWeather";
import dayjs from "dayjs";

/**
 * ✅ 날씨 상태 코드 변환 함수
 */
function getWeatherCondition(weatherCode) {
  if (!weatherCode || weatherCode.trim() === "") return "알 수 없음";

  const weatherConditions = {
    맑음: "맑음",
    구름많음: "구름 많음",
    흐림: "흐림",
    비: "비",
    눈: "눈",
    "비/눈": "비 또는 눈",
  };
  return weatherConditions[weatherCode] || "알 수 없음";
}

export async function getCompleteForecast() {
  const now = dayjs();
  const baseDate = now.format("YYYYMMDD");
  const currentHour = now.hour();

  console.log("📌 현재 시간:", now.format("YYYY-MM-DD HH:mm"));

  // ✅ 단기예보 (1~2일 예보)
  const shortTermData = await fetchWeatherData("getVilageFcst");
  if (!shortTermData.length) return { hourly: [], tenDay: [] };

  // ✅ 중기예보 (3~10일 예보)
  const tempData = await fetchMidWeatherData("getMidTa");
  const weatherData = await fetchMidWeatherData("getMidLandFcst");
  if (!tempData.length || !weatherData.length)
    return { hourly: [], tenDay: [] };

  // ✅ 1~2일치 기온 데이터 단기 예보에서 가져오기
  const dailyTemp = {};
  shortTermData.forEach((item) => {
    if (item.category === "TMP") {
      const date = item.fcstDate;
      if (!dailyTemp[date]) dailyTemp[date] = { min: Infinity, max: -Infinity };

      const temp = Number(item.fcstValue);
      dailyTemp[date].min = Math.min(dailyTemp[date].min, temp);
      dailyTemp[date].max = Math.max(dailyTemp[date].max, temp);
    }
  });

  // ✅ 시간별 날씨 데이터 정리
  let tmpDataCheck = shortTermData.filter((item) => item.category === "TMP");
  tmpDataCheck = tmpDataCheck.sort((a, b) => a.fcstTime - b.fcstTime);

  const sortedTmpData = tmpDataCheck
    .filter((item) => parseInt(item.fcstTime.substring(0, 2)) >= currentHour)
    .concat(
      tmpDataCheck.filter(
        (item) => parseInt(item.fcstTime.substring(0, 2)) < currentHour,
      ),
    );

  // ✅ 🚀 **hourlyForecast 변수를 선언** (이제 ReferenceError 발생 안 함!)
  const hourlyForecast = sortedTmpData.map((item, index) => {
    const hour = parseInt(item.fcstTime.substring(0, 2));
    const isNow = index === 0;

    return {
      time: isNow ? "지금" : formatHour(hour),
      temp: item.fcstValue,
      icon: getWeatherIcon(item.fcstValue, hour), // 🌙 밤이면 달 아이콘 적용
    };
  });

  // ✅ 10일 예보 데이터 정리
  const tenDayForecast = [];
  for (let i = 1; i <= 10; i++) {
    const forecastDate = now.add(i, "day").format("MM/DD (dd)");
    let tempLow, tempHigh, weatherCondition, precipitation;

    if (i <= 2) {
      // ✅ 1~2일치 단기예보에서 가져오기
      const targetDate = now.add(i, "day").format("YYYYMMDD");
      const tempInfo = dailyTemp[targetDate] || { min: "N/A", max: "N/A" };
      tempLow = tempInfo.min !== Infinity ? tempInfo.min : "정보 없음";
      tempHigh = tempInfo.max !== -Infinity ? tempInfo.max : "정보 없음";
      weatherCondition = "알 수 없음"; // 단기예보에서 기상 상태 가져오려면 추가 로직 필요
      precipitation = "정보 없음"; // 강수량 정보 없음
    } else {
      // ✅ 3~10일 중기예보에서 가져오기 (5일부터 시작하는 데이터 매칭!)
      const adjustedIndex = i + 2; // 중기 예보는 5일부터 시작하므로 보정
      tempLow = tempData[0][`taMin${adjustedIndex}`] ?? "정보 없음";
      tempHigh = tempData[0][`taMax${adjustedIndex}`] ?? "정보 없음";
      weatherCondition = getWeatherCondition(
        weatherData[0][`wf${adjustedIndex}`],
      );
      precipitation =
        weatherData[0][`rnSt${adjustedIndex}`] ?? "0% / 강수 없음";
    }

    tenDayForecast.push({
      date: forecastDate,
      tempLow,
      tempHigh,
      weather: weatherCondition,
      icon: getWeatherIcon(weatherCondition),
      details: {
        precipitation: precipitation,
        humidity: "정보 없음",
        wind: "정보 없음",
      },
    });
  }

  return { hourly: hourlyForecast, tenDay: tenDayForecast };
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
function getWeatherIcon(condition, hour) {
  const isNight = hour >= 18 || hour < 6; // 🌙 18시 이후 또는 06시 이전이면 밤

  const weatherIcons = {
    맑음: isNight ? "/images/moonlight.png" : "/images/sunny.png",
    "구름 많음": isNight ? "/images/moon-cloudy.png" : "/images/cloudy.png",
    흐림: "/images/cloudy.png",
    비: "/images/rainy.png",
    눈: "/images/snowy.png",
    "비 또는 눈": "/images/rain-snow.png",
  };

  return (
    weatherIcons[condition] ||
    (isNight ? "/images/moonlight.png" : "/images/sunny.png")
  );
}
