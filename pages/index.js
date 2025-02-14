import { useState } from "react";
import WeatherCard from "@components/WeatherCard";
import {
  PageContainer,
  SearchContainer,
  SearchInput,
  SearchButton,
  Dropdown,
  WeatherLayout,
  CurrentWeather,
} from "@styles/Home.styles";

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
            <CurrentWeather className="current-weather">
              <div className="location">
                <div className="title">
                  <h3>현재 위치</h3>
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
                    <span className="temperature-value">3</span>
                    <span className="temperature-unit">°</span>
                  </h2>
                  <div className="weather-details">
                    <p className="rainfall">강수량</p>
                    <p className="wind-speed">풍량풍속</p>
                  </div>
                </div>
              </div>
              <div className="weather-img"></div>
            </CurrentWeather>
            <WeatherCard
              title="시간별 날씨"
              className="hourly-weather"
            ></WeatherCard>
            <WeatherCard
              title="오늘 날씨"
              className="daily-weather"
            ></WeatherCard>
          </div>

          {/* 오른쪽 레이아웃 */}
          <div className="right">
            <WeatherCard
              title="10일간의 일기예보"
              className="weekly-forecast"
            ></WeatherCard>
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
