import { useEffect, useState } from "react";
import { getLocationNameFromCoordinates } from "@lib/fetchLocationName";
import { getCompleteForecast } from "@lib/getWeatherForecast";
import { CurrentWeatherWrap } from "@styles/CurrentWeather.styles";
import Image from "next/image";

export default function CurrentWeather() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationName, setLocationName] = useState("위치 불러오는 중...");
  const [temperature, setTemperature] = useState("N/A");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData(lat, lon) {
      setLoading(true);

      try {
        // ✅ 현재 위치 기반으로 날씨 API 호출
        const { detailedWeather } = await getCompleteForecast(lat, lon);

        console.log("✅ 현재 위치 날씨 데이터:", detailedWeather);

        setTemperature(detailedWeather.actualTemp); // ✅ 현재 온도 적용
      } catch (error) {
        console.error("❌ 날씨 데이터 가져오기 오류:", error);
      }

      setLoading(false);
    }

    async function updateLocationName(lat, lon) {
      try {
        const name = await getLocationNameFromCoordinates(lat, lon);
        setLocationName(name || "알 수 없음"); // ✅ 기본값 설정
      } catch (error) {
        console.error("❌ 위치 변환 오류:", error);
        setLocationName("알 수 없음");
      }
    }

    function getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`📌 현재 위치: 위도 ${latitude}, 경도 ${longitude}`);

            setLatitude(latitude);
            setLongitude(longitude);

            // ✅ 현재 위치로 날씨 데이터 가져오기
            fetchData(latitude, longitude);
            updateLocationName(latitude, longitude);
          },
          (error) => {
            console.error("❌ 위치 권한이 거부됨:", error);
            setLocationName("서울"); // 기본 위치
            fetchData(37.5665, 126.978); // ✅ 서울 좌표로 날씨 데이터 가져오기
          },
        );
      } else {
        console.error("❌ 이 브라우저에서는 위치 정보가 지원되지 않습니다.");
        setLocationName("서울");
        fetchData(37.5665, 126.978); // ✅ 서울 좌표로 날씨 데이터 가져오기
      }
    }

    getUserLocation();
  }, []);

  return (
    <CurrentWeatherWrap className="current-weather">
      <div className="location">
        <div className="title">
          <h3>{loading ? "날씨 불러오는 중..." : locationName}</h3>
          <p className="location-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 12C20 16.4183 16.4183 20 12 20M20 12C20 7.58172 16.4183 4 12 4M20 12H22M12 20C7.58172 20 4 16.4183 4 12M12 20V22M4 12C4 7.58172 7.58172 4 12 4M4 12H2M12 4V2M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
        </div>
        <div className="temperature-container">
          <h2 className="temperature">
            <span className="temperature-value">
              {loading ? "..." : temperature}
            </span>
            <span className="temperature-unit">°</span>
          </h2>
          <div className="weather-details">
            <p className="rainfall">강수량</p>
            <p className="wind-speed">풍량풍속</p>
          </div>
        </div>
      </div>
      <div className="weather-img">
        <Image
          src="/images/sunny.png"
          alt="맑음 이미지"
          width={60}
          height={60}
          priority
        />
      </div>
    </CurrentWeatherWrap>
  );
}
