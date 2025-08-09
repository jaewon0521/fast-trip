import { PlaceResult } from "@/service/google/places-dto";
import PlanSchedule from "./plan-schedule";
import { MarkersByDay } from "../trip/type";

interface PlanScheduleListProps {
  region: string;
  daysCount: number;
  places: PlaceResult[];
  markers: MarkersByDay;
  onTogglePlace: (day: number, place: PlaceResult) => void;
  selectedDay?: number | null;
}

export default function PlanScheduleList({
  region,
  daysCount,
  places,
  markers,
  onTogglePlace,
  selectedDay,
}: PlanScheduleListProps) {
  const daysToRender =
    selectedDay !== null && selectedDay !== undefined
      ? [selectedDay]
      : Array.from({ length: daysCount }, (_, index) => index);

  return (
    <div className="py-2">
      {daysToRender.map((day) => (
        <PlanSchedule
          key={day}
          day={day}
          region={region}
          defaultPlaces={places}
          selectedPlaces={markers[day] || []}
          title={`${day + 1}일차`}
          onTogglePlace={onTogglePlace}
        />
      ))}
    </div>
  );
}
