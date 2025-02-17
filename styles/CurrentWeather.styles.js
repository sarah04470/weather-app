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
    border-radius: 20px;
    img {
      width: 100%;
      height: auto;
    }
  }

  @media (max-width: 1200px) {
  }
  @media (max-width: 768px) {
    height: fit-content;
    padding: 0;
    padding-left: 20px;
    .location {
      gap: unset;
      justify-content: space-between;
    }
    .title h3 {
      font-size: 28px;
    }

    .weather-img {
      width: 180px;
      height: 180px;
    }
  }
  @media (max-width: 480px) {
    padding-left: 10px;
    .title h3 {
      font-size: 24px;
    }
    .weather-img {
      width: 160px;
      height: 160px;
    }
  }
`;
