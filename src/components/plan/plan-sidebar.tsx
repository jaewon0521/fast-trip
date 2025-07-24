"use client";

import { PlaceResult } from "@/service/google/places-dto";
import PlanSchedule from "./plan-schedule";
import PlaceDayButton from "./place-day-button";

interface MarkersByDay {
  [key: number]: PlaceResult[];
}

interface PlanSidebarProps {
  places: PlaceResult[];
  daysCount: number;
  markers: MarkersByDay;
  onTogglePlace: (day: number, place: PlaceResult) => void;
  selectedDay: number | null;
  onSelectedDay: (day: number | null) => void;
}

export default function PlanSidebar({
  places,
  daysCount,
  markers,
  onTogglePlace,
  selectedDay,
  onSelectedDay,
}: PlanSidebarProps) {
  return (
    <div className="flex flex-col px-4">
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
      <nav className="py-2">
        {Array.from({ length: daysCount }, (_, index) => (
          <PlanSchedule
            key={index}
            day={index}
            defaultPlaces={places}
            selectedPlaces={markers[index] || []}
            title={`${index + 1}일차`}
            onTogglePlace={onTogglePlace}
          />
        ))}
      </nav>
    </div>
  );
}
