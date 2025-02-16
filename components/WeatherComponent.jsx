import { useEffect, useState } from "react";
import { getWeeklyForecast } from "@lib/getWeatherForecast";
import WeatherCard from "@components/WeatherCard";
import {
  WeeklyForecastContainer,
  WeeklyForecastList,
  WeeklyForecastItem,
  ForecastDetails,
  ForecastToggle,
} from "@styles/WeatherComponent.styles";
import Image from "next/image";

export default function WeatherComponent() {
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  console.log("getWeeklyForecast:", getWeeklyForecast); // 🔥 콘솔에서 undefined인지 확인

  useEffect(() => {
    async function fetchData() {
      if (!getWeeklyForecast) {
        console.error("getWeeklyForecast is not defined!"); // ❌ 함수가 없으면 오류 출력
        return;
      }
      const data = await getWeeklyForecast();
      setWeeklyForecast(data);
    }
    fetchData();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <WeatherCard title="10일간의 일기예보" className="weekly-forecast">
      <WeeklyForecastContainer>
        <WeeklyForecastList>
          {weeklyForecast.map((item, index) => (
            <WeeklyForecastItem key={index}>
              <div
                className="forecast-summary"
                onClick={() => handleToggle(index)}
              >
                <p className="forecast-date">{item.date}</p>
                <div className="forecast-icon">
                  <Image
                    src={item.icon}
                    alt={`${item.weather} 이미지`}
                    width={60}
                    height={60}
                  />
                  <p className="forecast-condition">{item.weather}</p>
                </div>
                <div className="forecast-temp">
                  <p className="temp-low">
                    <span>{item.tempLow}</span>
                    <span>°</span>
                  </p>
                  <p className="temp-high">
                    <span>{item.tempHigh}</span>
                    <span>°</span>
                  </p>
                </div>
                <ForecastToggle className={openIndex === index ? "open" : ""}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="white"
                      strokeOpacity="0.4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ForecastToggle>
              </div>

              {openIndex === index && (
                <ForecastDetails>
                  <p>강수량: {item.details.precipitation}</p>
                  <p>습도: {item.details.humidity}</p>
                  <p>바람: {item.details.wind}</p>
                </ForecastDetails>
              )}
            </WeeklyForecastItem>
          ))}
        </WeeklyForecastList>
      </WeeklyForecastContainer>
    </WeatherCard>
  );
}
