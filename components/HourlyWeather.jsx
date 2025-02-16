import { useEffect, useState } from "react";
import Image from "next/image";
import WeatherCard from "@components/WeatherCard";
import { getCompleteForecast } from "@lib/getWeatherForecast";
import {
  HourlyWeatherContainer,
  HourlyList,
  HourlyItem,
} from "@styles/HourlyWeather.styles";

export default function HourlyWeather() {
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { hourly } = await getCompleteForecast();
      setHourlyForecast(hourly || []);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <WeatherCard title="시간별 날씨" className="hourly-weather">
      <HourlyWeatherContainer>
        {loading ? (
          <p>데이터를 불러오는 중...</p>
        ) : (
          <HourlyList className="hourly-list">
            {hourlyForecast.length > 0 ? (
              hourlyForecast.map((item, index) => (
                <HourlyItem key={index} className="hourly-item">
                  <div className="hourly-temperature">
                    <p className="temperature-value">{item.temp}</p>
                    <p className="temperature-unit">°</p>
                  </div>
                  <div className="weather-img">
                    <Image
                      src={item.icon}
                      alt={`${item.icon} 이미지`}
                      width={60}
                      height={60}
                    />
                  </div>
                  <p className="time-label">{item.time}</p>
                </HourlyItem>
              ))
            ) : (
              <p>데이터를 불러오는 중...</p>
            )}
          </HourlyList>
        )}
      </HourlyWeatherContainer>
    </WeatherCard>
  );
}
