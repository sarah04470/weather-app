import { Card } from "@styles/WeatherCard.styles";

export default function WeatherCard({ title, children }) {
  return (
    <Card>
      {title && <h3>{title}</h3>}
      {children}
    </Card>
  );
}
