import { useState } from "react";
import QuestionHeader from "./question-header";
import QuestionTemplate from "./question-template";
import DateRangePicker from "../date/date-range-picker";
import { DateRange } from "react-day-picker";
import { formattedDate } from "@/utils/date";

interface QuestionDaysProps {
  onNext: (startDate: string, endDate: string) => void;
  stepCurrent: number;
  stepTotal: number;
}

export default function QuestionDays({
  onNext,
  stepCurrent,
  stepTotal,
}: QuestionDaysProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange>();

  const handleSelectDate = (range: DateRange | undefined) => {
    setSelectedRange(range);
  };

  return (
    <QuestionTemplate
      header={
        <QuestionHeader
          title="🗓️ 여행 기간을 선택해주세요."
          description="최대 10일 선택 가능해요."
          stepCurrent={stepCurrent}
          stepTotal={stepTotal}
        />
      }
      body={
        <div className="flex justify-center w-full">
          <DateRangePicker
            selected={selectedRange}
            onSelect={handleSelectDate}
          />
        </div>
      }
      footer={
        <button
          onClick={() =>
            onNext(
              formattedDate(selectedRange?.from, "date"),
              formattedDate(selectedRange?.to, "date")
            )
          }
          disabled={!selectedRange}
          className="w-full btn btn-lg bg-blue-500 text-white text-lg rounded-2xl px-10 hover:bg-blue-600"
        >
          다음
        </button>
      }
    />
  );
}
