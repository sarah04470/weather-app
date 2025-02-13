import Head from "next/head";
import Layout from "@components/Layout";

export default function Home({ seoData }) {
  return (
    <Layout>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta property="og:title" content={seoData.ogTitle} />
        <meta property="og:description" content={seoData.ogDescription} />
        <meta property="og:url" content={seoData.ogUrl} />
        <meta property="og:image" content={seoData.ogImage} />
      </Head>
      <h1>Next.js Weather App</h1>
      <p>기상청 API를 활용한 SSR 기반 날씨 정보</p>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      seoData: {
        title: "Next.js Weather App",
        description: "기상청 API를 활용한 SSR 기반 날씨 예보 사이트입니다.",
        ogTitle: "Next.js Weather App",
        ogDescription: "기상청 API를 활용한 SSR 기반 날씨 예보 사이트입니다.",
        ogUrl: "https://your-weather-app.com",
        ogImage: "https://your-weather-app.com/images/og-image.png",
      },
    },
    revalidate: 60, // 60초마다 재생성
  };
}
