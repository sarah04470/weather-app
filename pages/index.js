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
  const [loading, setLoading] = useState(false);
  const [locationName, setLocationName] = useState("위치 찾기");

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
          setLatitude(37.5665); // 서울 기본값
          setLongitude(126.978);
        },
      );
    }
  }, []);

  // ✅ 🔍 검색 실행 함수
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    const { latitude, longitude, error } =
      await getCoordinatesFromLocation(searchQuery);

    if (error) {
      alert("검색 결과를 찾을 수 없습니다.");
      return;
    }

    setLatitude(latitude);
    setLongitude(longitude);
    setSearchOpen(false); // 검색창 닫기
  };

  return (
    <PageContainer>
      <div className="container">
        {/* 검색 바 */}
        {/* <SearchContainer>
          <SearchInput
            type="text"
            placeholder="위치 찾기"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
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
        </SearchContainer> */}

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
