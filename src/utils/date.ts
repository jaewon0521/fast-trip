import { format } from "date-fns";

type FormatType = "date" | "datetime";
/**
 * 주어진 Date 객체를 지정된 형식 으로 포맷팅합니다.
 * @param date Date 객체
 * @param type "date" | "datetime"
 * @returns
 */
export function formattedDate(date: Date | undefined, type: FormatType): string;
/**
 * date-fns의 formatStr 인자와 동일한 형식으로 포멧팅합니다.
 * @param date Date 객체
 * @param type 날짜 형식 변환
 * @returns
 */
export function formattedDate(date: Date | undefined, type: string): string;

export function formattedDate(
  date: Date = new Date(),
  type: FormatType | string
): string {
  const formatMap: Record<FormatType, string> = {
    date: "yyyy-MM-dd",
    datetime: "yyyy-MM-dd HH:mm:ss",
  };

  switch (type) {
    case "date":
      return format(date, formatMap[type]);
    case "datetime":
      return format(date, formatMap[type]);
    default:
      return format(date, type);
  }
}
