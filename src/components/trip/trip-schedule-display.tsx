import { MarkersByDay } from "./type";
import PlaceItem from "../place/place-item";

interface TripScheduleDisplayProps {
  daysCount: number;
  markers: MarkersByDay;
  selectedDay?: number | null;
}

export default function TripScheduleDisplay({
  daysCount,
  markers,
  selectedDay,
}: TripScheduleDisplayProps) {
  const daysToRender =
    selectedDay !== null && selectedDay !== undefined
      ? [selectedDay]
      : Array.from({ length: daysCount }, (_, index) => index);

  return (
    <div className="py-2">
      {daysToRender.map((day) => {
        const dayPlaces = markers[day] || [];

        if (dayPlaces.length === 0) return null;

        return (
          <div key={day} className="flex flex-col gap-2 my-4">
            <div className="divider">
              <span className="text-gray-600 font-bold">{day + 1}일차</span>
            </div>
            <ul className="space-y-4">
              {dayPlaces.map((place) => (
                <PlaceItem
                  key={place.place_id}
                  place={place}
                  number={dayPlaces.indexOf(place) + 1}
                />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
