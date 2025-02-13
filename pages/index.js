import Layout from "@components/Layout";
import { Title, Button } from "@styles/Home.styles";

export default function Home() {
  return (
    <Layout>
      <Title>Next.js Weather App</Title>
      <p>기상청 API를 활용한 SSR 기반 날씨 정보</p>
      <Button href="/weather">날씨 확인하기</Button>
    </Layout>
  );
}
