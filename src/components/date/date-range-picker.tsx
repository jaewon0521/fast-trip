import { ko } from "date-fns/locale";
import { DayPicker } from "react-day-picker";

export default function DateRangePicker() {
  return <DayPicker locale={ko} />;
}
