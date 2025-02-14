export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error("위치 정보 가져오기 실패:", error);
          resolve({ latitude: 37.5665, longitude: 126.978 }); // 기본 위치: 서울
        },
      );
    } else {
      console.error("Geolocation을 지원하지 않는 브라우저입니다.");
      resolve({ latitude: 37.5665, longitude: 126.978 }); // 기본 위치: 서울
    }
  });
}
