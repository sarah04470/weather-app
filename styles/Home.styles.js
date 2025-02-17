import styled from "styled-components";
import Link from "next/link";

export const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    position: relative;
    width: 1200px;
    height: 780px;
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

  @media (max-width: 1200px) {
    .container {
      width: fit-content;
      height: 85%;
      gap: 20px;
      padding: 40px 40px 20px 40px;
      margin-bottom: 40px;
    }
  }
  @media (max-width: 768px) {
    .container {
      width: fit-content;
      height: 85%;
      gap: 20px;
      padding: 30px;
      margin-bottom: 40px;
    }
  }
  @media (max-width: 480px) {
    .container {
      height: 70%;
      padding: 30px 24px 24px;
      margin-bottom: 80px;
    }
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

  .weekly-forecast {
    max-height: 700px;
    gap: 10px;
    padding: 20px 20px 10px;
    h3 {
      padding-left: 0;
    }
  }

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }

    .right {
      width: 680px;
      height: 100%;
    }

    .weekly-forecast {
      h3 {
        padding-left: 5px;
      }
    }
  }
  @media (max-width: 768px) {
    gap: 24px;
    .left {
      width: 420px;
      gap: 24px;
    }
    .right {
      width: 420px;
    }
  }
  @media (max-width: 480px) {
    gap: 20px;
    .left {
      width: 300px;
      gap: 20px;
    }
    .right {
      width: 300px;
    }
  }
`;

export const FooterContainer = styled.footer`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px 0;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);

  .api-wrap {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
    align-items: center;
    font-size: 12px;
  }

  a {
    color: rgba(255, 255, 255, 0.4);
    text-decoration: none;
    cursor: pointer;
  }

  @media (max-width: 1200px) {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -60px;
    padding: 0;
    margin: 0;
  }
  @media (max-width: 768px) {
  }
  @media (max-width: 480px) {
    .api-wrap {
      flex-direction: column;
      gap: 2px;
    }
    bottom: -80px;
  }
`;
