import styled from "styled-components";

export const CurrentWeatherWrap = styled.div`
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
