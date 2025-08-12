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
    <>
      <h1 className="text-lg font-semibold text-gray-800 mb-1">
        {region} 여행
      </h1>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 font-semibold">
          {startDate} ~ {endDate}
        </span>
        <span className="text-sm text-gray-500">{dayText}</span>
      </div>
    </>
  );
}
