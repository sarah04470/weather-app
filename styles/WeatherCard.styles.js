import styled from "styled-components";

export const Card = styled.div`
  background: #202c3c;
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%; /* 추가 */
  height: auto; /* 추가 */

  h3 {
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    padding-left: 10px;
  }
`;
