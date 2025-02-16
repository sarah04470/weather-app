import styled from "styled-components";

export const WeatherDetailsContainer = styled.div`
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
`;
