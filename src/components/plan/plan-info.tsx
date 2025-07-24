import { format } from "date-fns";

interface PlanInfoProps {
  region: string;
  dayText: string;
  startDate: string;
  endDate: string;
}

export default function PlanInfo({
  region,
  startDate,
  endDate,
  dayText,
}: PlanInfoProps) {
  return (
    <header className="sticky top-0 z-9999 flex flex-col px-6 py-8 border-b border-gray-100 bg-white shadow-sm">
      <h1 className="text-lg font-semibold text-gray-800 mb-1">
        {region} 여행
      </h1>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 font-semibold">
          {startDate} ~ {endDate}
        </span>
        <span className="text-sm text-gray-500">{dayText}</span>
      </div>
    </header>
  );
}
