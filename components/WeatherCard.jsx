import { Card } from "@styles/WeatherCard.styles";

export default function WeatherCard({ title, className, children }) {
  return (
    <Card className={className}>
      {title && <h3>{title}</h3>}
      {children}
    </Card>
  );
}
