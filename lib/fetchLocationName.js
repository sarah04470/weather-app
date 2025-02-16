export async function getLocationNameFromCoordinates(lat, lon) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
    );
    const data = await response.json();

    if (data && data.address) {
      return (
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "알 수 없음"
      );
    } else {
      return "알 수 없음";
    }
  } catch (error) {
    console.error("❌ 위치 변환 오류:", error);
    return "알 수 없음";
  }
}
