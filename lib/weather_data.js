import axios from "axios";
import { API_KEY, BASE_URL } from "@constants/config";

export async function getWeatherData(date, time, nx, ny) {
  const url = `${BASE_URL}/getVilageFcst?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&dataType=JSON&base_date=${date}&base_time=${time}&nx=${nx}&ny=${ny}`;

  try {
    const response = await axios.get(url);
    const data = response.data.response.body.items.item;

    if (!data) throw new Error("No weather data received");

    // 필요한 데이터 필터링
    const weather = {
      temperature: data.find((item) => item.category === "TMP")?.fcstValue || "N/A",
      humidity: data.find((item) => item.category === "REH")?.fcstValue || "N/A",
      windSpeed: data.find((item) => item.category === "WSD")?.fcstValue || "N/A",
      description: data.find((item) => item.category === "SKY")?.fcstValue === "1" ? "맑음" : "흐림",
    };

    return weather;
  } catch (error) {
    console.error("API 요청 실패:", error);
    return null;
  }
}
