export async function getCoordinatesFromLocation(location) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
    );
    const data = await response.json();

    if (data.length === 0) {
      return { latitude: null, longitude: null, error: "검색 결과 없음" };
    }

    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
      displayName: data[0].display_name, // 변환된 위치명 (예: 서울특별시 강남구)
    };
  } catch (error) {
    console.error("❌ 위치 검색 오류:", error);
    return { latitude: null, longitude: null, error: "위치 검색 실패" };
  }
}
