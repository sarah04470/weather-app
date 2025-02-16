import styled from "styled-components";
import Link from "next/link";

export const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 1200px;
    height: 880px;
    border-radius: 20px;
    background: #0c121e;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background: #1e1e2e;
    border-radius: 10px;
  }
`;

// 검색 바 스타일
export const SearchContainer = styled.div`
  width: 520px;
  height: 60px;
  display: flex;
  align-items: center;
  background: #202c3c;
  border-radius: 10px;
  padding: 18px;
`;

export const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.5;
  padding-left: 2px;
`;

export const SearchButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
`;

// 검색 결과 드롭다운 스타일
export const Dropdown = styled.div`
  position: absolute;
  background: #202c3c;
  width: 200px;
  border-radius: 10px;
  margin-top: 5px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  bottom: 0;

  p {
    padding: 10px;
    margin: 0;
    color: white;
    cursor: pointer;
  }

  p:hover {
    background: #2c2c3c;
  }
`;

export const WeatherLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;

  .left {
    width: 680px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  .right {
    width: 400px;
    height: 100%;
  }

  .hourly-weather {
    .hourly-list {
      max-width: 100%;
      overflow-x: auto;
      display: flex;
      flex-direction: row;
      gap: 20px;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .hourly-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 6px;
      color: #fff;
      font-size: 12px;
      font-weight: 500;
      line-height: 1.2;
    }

    .hourly-temperature {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .weather-img {
      width: 60px;
      height: 60px;
      border-radius: 20px;
      img {
        width: 100%;
        height: auto;
      }
    }
    .time-label {
      text-align: center;
    }
  }

  .weather-details {
    .weather-details-list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 22px;
    }
    .weather-detail-item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 8px;
    }
    .weather-icon {
      width: 24px;
      height: 24px;
      display: flex;
    }
    .weather-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;

      color: rgba(255, 255, 255, 0.6);
      font-weight: 700;
      line-height: 1.2;
    }
    .weather-label {
      font-size: 12px;
    }
    .weather-value-container {
      display: flex;
      flex-direction: row;
      gap: 4px;
      font-size: 24px;
    }
  }

  .weekly-forecast {
    h3 {
      padding-left: 0;
    }
  }

  @media (max-width: 768px) {
  }
`;

export const CurrentWeather = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;

  .location {
    display: flex;
    flex-direction: column;
    gap: 65px;
  }

  .title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
    h3 {
      color: #fff;
      font-size: 32px;
      font-weight: 700;
      line-height: 1.5;
    }
    .location-icon {
      width: 24px;
      height: 24px;
      display: flex;
    }
  }

  .temperature-container {
    .temperature {
      display: flex;
      flex-direction: row;
      gap: 8px;
      color: #fff;
      font-size: 48px;
      font-weight: 700;
      line-height: 1.5;
    }
    .weather-details {
      display: flex;
      flex-direction: column;
      gap: 4px;
      color: rgba(255, 255, 255, 0.2);
      font-size: 14px;
      font-weight: 700;
      line-height: 1.2;
    }
  }

  .weather-img {
    width: 240px;
    height: 240px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    img {
      width: 100%;
      height: auto;
    }
  }
`;
