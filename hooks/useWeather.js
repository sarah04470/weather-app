import { useState, useEffect } from "react";
import { getWeatherData } from "@lib/weather_data";

export default function useWeather(nx, ny) {
  const [weather, setWeather] = useState(null);
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const time = "0600"; // 기준 시간

  useEffect(() => {
    async function fetchWeather() {
      const data = await getWeatherData(today, time, nx, ny);
      setWeather(data);
    }
    fetchWeather();
  }, [nx, ny]);

  return weather;
}
