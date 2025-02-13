import Layout from "@components/Layout";
import { getWeatherData } from "@lib/weather_data";
import WeatherCard from "@components/WeatherCard";

export async function getServerSideProps() {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
  const time = "0600"; // 기상청 기준 시간
  const nx = 60; // 서울
  const ny = 127;

  const weatherData = await getWeatherData(today, time, nx, ny);

  return {
    props: { weatherData },
  };
}

export default function WeatherPage({ weatherData }) {
  return (
    <Layout>
      <h1>서울 날씨</h1>
      {weatherData ? (
        <>
          <WeatherCard title="기온" value={`${weatherData.temperature}°C`} />
          <WeatherCard title="습도" value={`${weatherData.humidity}%`} />
          <WeatherCard title="풍속" value={`${weatherData.windSpeed}m/s`} />
          <WeatherCard title="날씨 상태" value={weatherData.description} />
        </>
      ) : (
        <p>날씨 데이터를 불러올 수 없습니다.</p>
      )}
    </Layout>
  );
}
