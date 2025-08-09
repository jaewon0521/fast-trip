"use client";

import { LatLng } from "@/service/google/geocode-dto";
import { differenceInDays } from "date-fns";
import GoogleMapComponent from "../map/google-map";
import PlanInfo from "../plan/plan-info";
import PlanDayFilterButtons from "../plan/plan-day-filter-button-list";
import { MarkersByDay } from "./type";
import { useState } from "react";
import TripScheduleDisplay from "./trip-schedule-display";

interface TripViewerProps {
  markers: MarkersByDay;
  region: string;
  location: LatLng;
  startDate: string;
  endDate: string;
}

export default function TripViewer({
  markers,
  region,
  location,
  startDate,
  endDate,
}: TripViewerProps) {
  const daysCount = differenceInDays(new Date(endDate), new Date(startDate));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const daysText =
    daysCount === 0 ? "당일치기" : `${daysCount}박 ${daysCount + 1}일`;

  const renderMarker =
    selectedDay !== null
      ? { [selectedDay]: markers[selectedDay] ?? [] }
      : markers;

  const handleSelectDay = (day: number | null) => {
    setSelectedDay(day);
  };

  return (
    <div className="flex h-full">
      <aside className="flex flex-col w-[375px] min-w-[375px] h-full border-r border-gray-200 bg-white shadow-md z-999 overflow-y-auto">
        <PlanInfo
          region={region}
          startDate={startDate}
          endDate={endDate}
          dayText={daysText}
        />
        <div className="flex flex-col px-4">
          <PlanDayFilterButtons
            daysCount={daysCount + 1}
            selectedDay={selectedDay}
            onSelectedDay={handleSelectDay}
          />
          <TripScheduleDisplay
            daysCount={daysCount + 1}
            markers={markers}
            selectedDay={selectedDay}
          />
        </div>
      </aside>
      <div className="duration-500 w-full">
        <div className="h-full">
          <div className="w-full h-full">
            <GoogleMapComponent center={location} markers={renderMarker} />
          </div>
        </div>
      </div>
    </div>
  );
}
