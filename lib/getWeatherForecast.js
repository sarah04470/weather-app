import { fetchWeatherData, fetchMidWeatherData } from "@lib/fetchWeather";
import { convertToGrid } from "@lib/convertCoords";
import dayjs from "dayjs";
import "dayjs/locale/ko";

/**
 * ✅ 바람 방향 변환 함수
 */
function getWindDirection(degree) {
  if (!degree) return "정보 없음";
  const directions = ["북", "북동", "동", "남동", "남", "남서", "서", "북서"];
  return directions[Math.round(degree / 45) % 8];
}

/**
 * ✅ 하늘 상태(SKY) + 강수 상태(PTY)로 날씨 상태 변환
 */
function getWeatherCondition(sky, pty) {
  if (pty !== "0") {
    const ptyConditions = {
      1: "비",
      2: "비/눈",
      3: "눈",
      4: "소나기",
    };
    return ptyConditions[pty] || "알 수 없음";
  }

  const skyConditions = {
    1: "맑음",
    3: "구름 많음",
    4: "흐림",
  };

  return skyConditions[sky] || "알 수 없음";
}

function getKoreanDay(dateString) {
  return dayjs(dateString, "YYYYMMDD").locale("ko").format("dd");
}

export async function getCompleteForecast(lat, lon) {
  // ✅ 기본 위치 (서울) 설정
  const defaultLat = 37.5665;
  const defaultLon = 126.978;

  // ✅ 사용자의 위치 정보가 없으면 기본값(서울 좌표) 사용
  const latitude = lat || defaultLat;
  const longitude = lon || defaultLon;

  // ✅ 위도/경도를 기상청 격자 좌표(nx, ny)로 변환
  const { nx, ny } = convertToGrid(latitude, longitude);

  console.log(`📌 변환된 기상청 좌표: nx=${nx}, ny=${ny}`);

  const now = dayjs();
  const baseDate = now.format("YYYYMMDD");
  const currentHour = now.hour();

  console.log("📌 현재 시간:", now.format("YYYY-MM-DD HH:mm"));

  const shortTermData = await fetchWeatherData("getVilageFcst");
  const tempData = await fetchMidWeatherData("getMidTa");
  const weatherData = await fetchMidWeatherData("getMidLandFcst");

  if (!shortTermData.length)
    return { hourly: [], tenDay: [], detailedWeather: {} };

  if (!tempData.length || !weatherData.length)
    return { hourly: [], tenDay: [] };

  // ✅ 단기예보에서 날씨 상태 저장을 위한 객체 추가
  const dailyTemp = {};
  const dailyWeather = {};

  shortTermData.forEach((item) => {
    const date = item.fcstDate;
    if (!dailyTemp[date]) dailyTemp[date] = { min: Infinity, max: -Infinity };
    if (!dailyWeather[date])
      dailyWeather[date] = { sky: "1", pty: "0", pop: "0" };

    if (item.category === "TMP") {
      const temp = Number(item.fcstValue);
      dailyTemp[date].min = Math.min(dailyTemp[date].min, temp);
      dailyTemp[date].max = Math.max(dailyTemp[date].max, temp);
    }

    if (item.category === "SKY") dailyWeather[date].sky = item.fcstValue;
    if (item.category === "PTY") dailyWeather[date].pty = item.fcstValue;
    if (item.category === "POP") dailyWeather[date].pop = item.fcstValue; // 강수 확률
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

  // ✅ 기온(TMP) 데이터 가져오기
  const temperatureData = shortTermData.find((item) => item.category === "TMP");

  // ✅ 풍속(WSD) 데이터 가져오기
  const windSpeedData = shortTermData.find((item) => item.category === "WSD");

  // ✅ 체감온도 계산
  let feelsLikeTemp;
  if (temperatureData && windSpeedData) {
    const temp = parseFloat(temperatureData.fcstValue);
    const windSpeed = parseFloat(windSpeedData.fcstValue);
    feelsLikeTemp =
      windSpeed > 1.3 ? (temp - windSpeed * 0.7).toFixed(1) : temp.toFixed(1);
  } else {
    feelsLikeTemp = "정보 없음";
  }

  // ✅ 강수량(PCP) 데이터 가져오기
  const precipitationData = shortTermData.find(
    (item) => item.category === "PCP",
  );
  let precipitation;
  if (precipitationData) {
    precipitation =
      precipitationData.fcstValue === "강수없음"
        ? "0"
        : precipitationData.fcstValue;
  } else {
    precipitation = "정보 없음";
  }

  // 현재 온도
  let actualTemp = "N/A";
  if (temperatureData) {
    actualTemp = temperatureData.fcstValue;
  }

  console.log("🌡️ 현재 온도:", actualTemp);

  // ✅ 특정 데이터 항목 가져오기
  const detailedWeather = {
    actualTemp,
    feelsLikeTemp: feelsLikeTemp,
    precipitation: precipitation,
    precipitationProb:
      shortTermData.find((item) => item.category === "POP")?.fcstValue ?? "N/A",
    humidity:
      shortTermData.find((item) => item.category === "REH")?.fcstValue ?? "N/A",
    windSpeed:
      shortTermData.find((item) => item.category === "WSD")?.fcstValue ?? "N/A",
    windDirection: getWindDirection(
      shortTermData.find((item) => item.category === "VEC")?.fcstValue,
    ),
  };

  console.log("✅ 상세 날씨 데이터:", detailedWeather);
  console.log("체감온도 계산 결과 :", feelsLikeTemp);
  console.log("강수량 : ", precipitation);

  // ✅ 10일 예보 데이터 정리
  const tenDayForecast = [];

  for (let i = 1; i <= 10; i++) {
    const forecastDate = now.add(i, "day").format("YYYYMMDD");
    const dayLabel = getKoreanDay(forecastDate);

    let tempLow, tempHigh, weatherCondition, precipitation, humidity, windSpeed;

    if (i <= 2) {
      // ✅ 1~2일차 단기 예보 사용
      const tempInfo = dailyTemp[forecastDate] || {
        min: "정보 없음",
        max: "정보 없음",
      };
      const weatherInfo = dailyWeather[forecastDate] || {
        sky: "1",
        pty: "0",
        pop: "0",
      };

      tempLow = tempInfo.min !== Infinity ? tempInfo.min : "-";
      tempHigh = tempInfo.max !== -Infinity ? tempInfo.max : "-";
      weatherCondition = getWeatherCondition(weatherInfo.sky, weatherInfo.pty);
      precipitation =
        weatherInfo.pop !== "0" ? `${weatherInfo.pop}%` : "강수 없음";
      humidity =
        shortTermData.find(
          (item) => item.fcstDate === forecastDate && item.category === "REH",
        )?.fcstValue ?? "정보 없음";
      windSpeed =
        shortTermData.find(
          (item) => item.fcstDate === forecastDate && item.category === "WSD",
        )?.fcstValue ?? "정보 없음";
    } else {
      // ✅ 3~10일차 중기 예보 사용
      const adjustedIndex = i;

      tempLow = tempData?.[0]?.[`taMin${adjustedIndex}`] ?? "정보 없음";
      tempHigh = tempData?.[0]?.[`taMax${adjustedIndex}`] ?? "정보 없음";

      const morningCondition =
        weatherData?.[0]?.[`wf${adjustedIndex}Am`] || "맑음";
      const eveningCondition =
        weatherData?.[0]?.[`wf${adjustedIndex}Pm`] || "맑음";

      // ✅ 오전/오후 중 우선순위 높은 날씨 하나만 선택 (흐림 > 구름 많음 > 맑음)
      const priorityOrder = ["흐림", "구름 많음", "맑음"];
      weatherCondition = [morningCondition, eveningCondition].sort(
        (a, b) => priorityOrder.indexOf(a) - priorityOrder.indexOf(b),
      )[0]; // 우선순위가 높은 값을 선택

      const rainData = weatherData?.[0]?.[`rnSt${adjustedIndex}`];
      precipitation = rainData !== undefined ? `${rainData}%` : "강수 없음";

      humidity = "정보 없음"; // 중기예보에는 없음
      windSpeed = "정보 없음"; // 중기예보에는 없음
    }

    tenDayForecast.push({
      day: dayLabel,
      tempLow,
      tempHigh,
      weather: weatherCondition, // ✅ 오전/오후 대신 한 개만 표시
      icon: getWeatherIcon(weatherCondition),
      details: {
        precipitation,
        humidity,
        wind: windSpeed,
      },
    });
  }

  console.log("📌 최종 10일 예보 데이터:", tenDayForecast);

  return { hourly: hourlyForecast, tenDay: tenDayForecast, detailedWeather };
}

/**
 * ✅ 위도/경도를 기상청 격자 좌표(nx, ny)로 변환하는 함수
 */
function convertLatLonToXY(lat, lon) {
  // 간단한 변환 로직 (정확한 공식은 기상청 좌표 변환 API 참고)
  return { nx: Math.round(lon * 10), ny: Math.round(lat * 10) };
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
  const isNight = hour >= 19 || hour < 7; // 🌙 18시 이후 또는 06시 이전이면 밤

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
