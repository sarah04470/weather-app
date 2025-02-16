import { useEffect, useState } from "react";
import WeatherCard from "@components/WeatherCard";
import { getCompleteForecast } from "@lib/getWeatherForecast";
import { WeatherDetailsContainer } from "@styles/WeatherDetails.styles";

export default function WeatherDetails() {
  const [detailedWeather, setDetailedWeather] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { detailedWeather } = await getCompleteForecast();  // ✅ 데이터 받아올 때 변수명 맞추기
      console.log('받아온 데이터 확인 : ', detailedWeather)
      setDetailedWeather(detailedWeather || {});
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <WeatherCard title="날씨 정보" className="weather-details">
      <WeatherDetailsContainer>
        <ul className="weather-details-list">
          {/* 체감온도 */}
          <li className="weather-detail-item">
            <div className="weather-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5V13.7578C8.29401 14.565 7.5 15.9398 7.5 17.5C7.5 19.9853 9.51472 22 12 22C14.4853 22 16.5 19.9853 16.5 17.5C16.5 15.9398 15.706 14.565 14.5 13.7578V4.5Z"
                  stroke="white"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="weather-info">
              <p className="weather-label">체감온도</p>
              <div className="weather-value-container">
                <p className="weather-value">
                  {loading ? "..." : `${detailedWeather.feelsLikeTemp || 0}`}
                </p>
                <p className="weather-unit">°</p>
              </div>
            </div>
          </li>

          {/* 강수 확률 */}
          <li className="weather-detail-item">
            <div className="weather-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12.56 6.08C13.2478 4.98112 13.7353 3.76904 14 2.5C14.5 5 16 7.4 18 9C20 10.6 21 12.5 21 14.5C21.0057 15.8823 20.6009 17.2352 19.8368 18.3871C19.0727 19.539 17.9838 20.4382 16.7081 20.9705C15.4324 21.5028 14.0274 21.6444 12.6712 21.3773C11.3149 21.1101 10.0685 20.4463 9.09 19.47M7 15.78C9.2 15.78 11 13.95 11 11.73C11 10.57 10.43 9.47 9.29 8.54C8.15 7.61 7.29 6.23 7 4.78C6.71 6.23 5.86 7.62 4.71 8.54C3.56 9.46 3 10.58 3 11.73C3 13.95 4.8 15.78 7 15.78Z"
                  stroke="white"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="weather-info">
              <p className="weather-label">강수 확률</p>
              <div className="weather-value-container">
                <p className="weather-value">
                  {loading ? "..." : `${detailedWeather.precipitationProb || 0}`}
                </p>
                <p className="weather-unit">%</p>
              </div>
            </div>
          </li>

          {/* 바람 방향 */}
          <li className="weather-detail-item">
            <div className="weather-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M16.7639 6.5C17.3132 5.88625 18.1115 5.5 19 5.5C20.6569 5.5 22 6.84315 22 8.5C22 10.1569 20.6569 11.5 19 11.5H13M6.7639 4C7.31322 3.38625 8.1115 3 9 3C10.6569 3 12 4.34315 12 6C12 7.65685 10.6569 9 9 9H2M10.7639 20C11.3132 20.6137 12.1115 21 13 21C14.6569 21 16 19.6569 16 18C16 16.3431 14.6569 15 13 15H2"
                  stroke="white"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="weather-info">
              <p className="weather-label">바람 방향</p>
              <div className="weather-value-container">
                <p className="weather-value">{detailedWeather.windDirection ?? "정보 없음"}</p>
              </div>
            </div>
          </li>

          {/* 강수량 */}
          <li className="weather-detail-item">
            <div className="weather-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12.56 6.08C13.2478 4.98112 13.7353 3.76904 14 2.5C14.5 5 16 7.4 18 9C20 10.6 21 12.5 21 14.5C21.0057 15.8823 20.6009 17.2352 19.8368 18.3871C19.0727 19.539 17.9838 20.4382 16.7081 20.9705C15.4324 21.5028 14.0274 21.6444 12.6712 21.3773C11.3149 21.1101 10.0685 20.4463 9.09 19.47M7 15.78C9.2 15.78 11 13.95 11 11.73C11 10.57 10.43 9.47 9.29 8.54C8.15 7.61 7.29 6.23 7 4.78C6.71 6.23 5.86 7.62 4.71 8.54C3.56 9.46 3 10.58 3 11.73C3 13.95 4.8 15.78 7 15.78Z"
                  stroke="white"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="weather-info">
              <p className="weather-label">강수량</p>
              <div className="weather-value-container">
                <p className="weather-value">
                  {loading ? "..." : `${detailedWeather.precipitation || 0}`}
                </p>
                <p className="weather-unit">mm</p>
              </div>
            </div>
          </li>

          {/* 습도 */}
          <li className="weather-detail-item">
            <div className="weather-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 18C3 18 4.19041 18.4695 5 18.6979C6.985 19.258 8.76547 18.9569 10.5 18.4624M3 12C3 12 4.19041 12.4695 5 12.6979C7.94412 13.5286 10.4383 12.4649 13 11.6853M21 6C21 6 19.8096 5.53048 19 5.30206C13.8797 3.85739 10.1203 8.14261 5 6.69794C4.19041 6.46952 3 6 3 6"
                  stroke="white"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 21C19.2 21 21 19.17 21 16.95C21 15.79 20.43 14.69 19.29 13.76C18.15 12.83 17.29 11.45 17 10C16.71 11.45 15.86 12.84 14.71 13.76C13.56 14.68 13 15.8 13 16.95C13 19.17 14.8 21 17 21Z"
                  stroke="white"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="weather-info">
              <p className="weather-label">습도</p>
              <div className="weather-value-container">
                <p className="weather-value">
                  {loading ? "..." : `${detailedWeather.humidity || 0}`}
                </p>
                <p className="weather-unit">%</p>
              </div>
            </div>
          </li>
          {/* 바람 속도 */}
          <li className="weather-detail-item">
            <div className="weather-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M16.7639 6.5C17.3132 5.88625 18.1115 5.5 19 5.5C20.6569 5.5 22 6.84315 22 8.5C22 10.1569 20.6569 11.5 19 11.5H13M6.7639 4C7.31322 3.38625 8.1115 3 9 3C10.6569 3 12 4.34315 12 6C12 7.65685 10.6569 9 9 9H2M10.7639 20C11.3132 20.6137 12.1115 21 13 21C14.6569 21 16 19.6569 16 18C16 16.3431 14.6569 15 13 15H2"
                  stroke="white"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="weather-info">
              <p className="weather-label">바람 속도</p>
              <div className="weather-value-container">
                <p className="weather-value">
                  {loading ? "..." : `${detailedWeather.windSpeed || 0}`}
                </p>
                <p className="weather-unit">km/h</p>
              </div>
            </div>
          </li>
        </ul>
      </WeatherDetailsContainer>
    </WeatherCard>
  );
}
