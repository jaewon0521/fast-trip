
import PlaceDayButton from "./place-day-button";

interface PlanDayFilterButtonsProps {
  daysCount: number;
  selectedDay: number | null;
  onSelectedDay: (day: number | null) => void;
}

export default function PlanDayFilterButtons({
  daysCount,
  selectedDay,
  onSelectedDay,
}: PlanDayFilterButtonsProps) {
  return (
    <section className="border-b border-gray-100">
      <div className="flex gap-2 mt-2 overflow-x-auto">
        <PlaceDayButton
          dayNumber={0}
          isSelected={selectedDay === null}
          onClick={() => onSelectedDay(null)}
        >
          전체
        </PlaceDayButton>
        {Array.from({ length: daysCount }, (_, index) => (
          <PlaceDayButton
            key={index}
            dayNumber={index + 1}
            isSelected={selectedDay === index}
            onClick={() => onSelectedDay(index)}
          >
            {index + 1}일차
          </PlaceDayButton>
        ))}
      </div>
    </section>
  );
}
