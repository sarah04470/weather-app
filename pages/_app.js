import GlobalStyles from "@styles/GlobalStyles";
import { DefaultSeo } from "next-seo";
import seoConfig from "seo.config";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...seoConfig} />
      <GlobalStyles /> {/* 전역 스타일 적용 */}
      <Component {...pageProps} />
    </>
  );
}
