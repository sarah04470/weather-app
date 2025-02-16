import { useEffect, useState } from "react";
// import WeatherCard from "@components/WeatherCard";
import {
  PageContainer,
  SearchContainer,
  SearchInput,
  SearchButton,
  Dropdown,
  WeatherLayout,
} from "@styles/Home.styles";
import { getCompleteForecast } from "@lib/getWeatherForecast";
import { getLocationNameFromCoordinates } from "@lib/fetchLocationName";
import CurrentWeather from "@components/CurrentWeather";
import HourlyWeather from "@components/HourlyWeather";
import WeatherDetails from "@components/WeatherDetails";
import WeatherComponent from "@components/WeatherComponent";

export default function Home() {
  // const [hourlyForecast, setHourlyForecast] = useState([]); // ✅ 기본값 [] 설정
  // const [tenDayForecast, setTenDayForecast] = useState([]);
  // const [loading, setLoading] = useState(true); // ✅ 로딩 상태 추가

  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("❌ 위치 정보 가져오기 실패:", error);
          // ✅ 위치 정보를 못 가져올 경우 기본값 (서울)
          setLatitude(37.5665);
          setLongitude(126.978);
        },
      );
    }
  }, []);

  return (
    <PageContainer>
      <div className="container">
        {/* 검색 바 */}
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="위치 찾기"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)} // 입력 클릭 시 검색창 열기
          />
          <SearchButton onClick={() => setSearchOpen(!searchOpen)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L16.65 16.65M11 6C13.7614 6 16 8.23858 16 11M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </SearchButton>
        </SearchContainer>

        {/* 검색 결과 Dropdown (검색창이 열렸을 때만 보이도록) */}
        {searchOpen && (
          <Dropdown>
            <p>서울</p>
            <p>부산</p>
            <p>대구</p>
            <p>인천</p>
            <p>광주</p>
          </Dropdown>
        )}

        <WeatherLayout>
          {/* 왼쪽 레이아웃 */}
          <div className="left">
            <CurrentWeather latitude={latitude} longitude={longitude} />
            <HourlyWeather />
            <WeatherDetails />
          </div>

          {/* 오른쪽 레이아웃 */}
          <div className="right">
            <WeatherComponent />
          </div>
        </WeatherLayout>
      </div>
    </PageContainer>
  );
}

export async function getStaticProps() {
  return {
    props: {
      seoData: {
        title: "Next.js Weather App",
        description: "기상청 API를 활용한 SSR 기반 날씨 예보 사이트입니다.",
        ogTitle: "Next.js Weather App",
        ogDescription: "기상청 API를 활용한 SSR 기반 날씨 예보 사이트입니다.",
        ogUrl: "https://your-weather-app.com",
        ogImage: "https://your-weather-app.com/images/og-image.png",
      },
    },
    revalidate: 60, // 60초마다 재생성
  };
}
