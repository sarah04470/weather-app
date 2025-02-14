import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>{isClient ? <p>클라이언트에서만 보임</p> : <p>SSR에서 보임</p>}</div>
  );
}
