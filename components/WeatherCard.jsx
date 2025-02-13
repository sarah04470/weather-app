import { Card, Title, Value } from "@styles/WeatherCard.styles";

export default function WeatherCard({ title, value }) {
  return (
    <Card>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </Card>
  );
}
