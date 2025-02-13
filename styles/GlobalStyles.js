import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }
  * { 
    box-sizing: border-box;
    font-family: 'Pretendard', 'Apple SD Gothic Neo',  '돋움', Dotum, 'Arial', 'Helvetica', Sans-serif;
    text-decoration: none;
  }
  body {
    font-family: 'Pretendard', 'Apple SD Gothic Neo', '돋움', Dotum, 'Arial', 'Helvetica', Sans-serif;
    z-index: 0;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  /* CSS Reset */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-size: 16px;
    line-height: 1.5;
    font-family: Arial, sans-serif;
    background-color: #fff;
    color: #333;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }

  button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;

export default GlobalStyles;
