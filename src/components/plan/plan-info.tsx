import { format } from "date-fns";

interface PlanInfoProps {
  region: string;
  days: [Date, Date];
  dayText: string;
}

export default function PlanInfo({ region, days, dayText }: PlanInfoProps) {
  return (
    <header className="flex flex-col px-6 py-8 border-b border-gray-100 bg-gray-50">
      <h1 className="text-lg font-semibold text-gray-800 mb-1">
        {region} 여행
      </h1>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">
          {format(days[0], "yyyy-MM-dd")} ~ {format(days[1], "yyyy-MM-dd")}
        </span>
        <span className="text-sm text-gray-500">{dayText}</span>
      </div>
    </header>
  );
}
