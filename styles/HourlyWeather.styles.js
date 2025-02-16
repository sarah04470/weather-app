import styled from "styled-components";

export const HourlyWeatherContainer = styled.div``;

export const HourlyList = styled.ul`
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
`;

export const HourlyItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;

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
`;
