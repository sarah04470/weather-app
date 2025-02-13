import GlobalStyles from "@styles/GlobalStyles";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles /> {/* 전역 스타일 적용 */}
      <Component {...pageProps} />
    </>
  );
}
