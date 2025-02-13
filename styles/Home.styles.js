import styled from "styled-components";
import Link from "next/link";

export const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

export const Button = styled(Link)`
  display: block;
  text-align: center;
  padding: 10px;
  background: #0070f3;
  color: white;
  border-radius: 5px;
  margin-top: 20px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #005bb5;
  }
`;
