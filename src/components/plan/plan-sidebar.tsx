"use client";

import { PlaceResult } from "@/service/google/places-dto";
import PlanSchedule from "./plan-schedule";

interface PlanSidebarProps {
  places: PlaceResult[];
  daysCount: number;
  markers: PlaceResult[][];
  onTogglePlace: (day: number, place: PlaceResult) => void;
}

export default function PlanSidebar({
  places,
  daysCount,
  markers,
  onTogglePlace,
}: PlanSidebarProps) {
  return (
    <>
      <section className="px-6 py-4 border-b border-gray-100">
        <div className="text-sm text-gray-600">장소 선택</div>
      </section>
      <nav className="flex-1 px-4 py-2">
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
    </>
  );
}
