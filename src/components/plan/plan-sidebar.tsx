"use client";

import { PlaceResult } from "@/service/google/places-dto";
import PlanSchedule from "./plan-schedule";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import PlaceDayButton from "./place-day-button";

interface PlanSidebarProps {
  places: PlaceResult[];
  daysCount: number;
  markers: PlaceResult[][];
  onTogglePlace: (day: number, place: PlaceResult) => void;
  selectedDay: number | null;
  setSelectedDay: Dispatch<SetStateAction<number | null>>;
}

export default function PlanSidebar({
  places,
  daysCount,
  markers,
  onTogglePlace,
  selectedDay,
  setSelectedDay,
}: PlanSidebarProps) {
  return (
    <>
      <section className="px-6 py-4 border-b border-gray-100">
        <div className="flex gap-2 mt-2 overflow-x-auto">
          <PlaceDayButton
            dayNumber={0}
            isSelected={selectedDay === null}
            onClick={() => setSelectedDay(null)}
          >
            전체
          </PlaceDayButton>
          {Array.from({ length: daysCount }, (_, index) => (
            <PlaceDayButton
              key={index}
              dayNumber={index + 1}
              isSelected={selectedDay === index}
              onClick={() => setSelectedDay(index)}
            >
              {index + 1}일차
            </PlaceDayButton>
          ))}
        </div>
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
