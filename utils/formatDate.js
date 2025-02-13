import dayjs from "dayjs";

export function formatDate(dateString) {
  return dayjs(dateString).format("YYYY년 MM월 DD일");
}
