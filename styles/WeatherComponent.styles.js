import styled from "styled-components";

export const WeeklyForecastContainer = styled.div`
  width: 100%;
  max-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const WeeklyForecastList = styled.ul`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const WeeklyForecastItem = styled.li`
  padding: 2px 0px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:last-of-type .forecast-summary {
    border-bottom: 0;
  }

  .forecast-summary {
    display: grid;
    grid-template-columns: 22px 2fr 0.6fr 20px;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    padding-left: 6px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.2;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  }

  .forecast-date {
  }

  .forecast-icon {
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;

    img {
      width: 60px;
      height: 60px;
    }
  }

  .forecast-condition {
    width: 60px;
    text-align: center;
  }

  .forecast-temp {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;

    .temp-low,
    .temp-high {
      display: flex;
      flex-direction: row;
      gap: 2px;
    }
  }

  @media (max-width: 1200px) {
    .forecast-summary {
      padding: 0 20px;
      font-size: 14px;
    }
  }
  @media (max-width: 768px) {
  }
  @media (max-width: 480px) {
    .forecast-summary {
      padding: 0 8px;
      font-size: 12px;
      grid-template-columns: 22px 1.4fr 0.6fr 20px;
      gap: 0;
    }
    .forecast-icon {
      gap: 0;
    }
  }
`;

export const ForecastToggle = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  transition: all 0.3s ease-in-out;

  &.open {
    transform: rotate(180deg);
  }
`;

export const ForecastDetails = styled.div`
  margin-top: 10px;
  padding: 20px 15px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  font-size: 12px;
  color: #ccc;
`;
