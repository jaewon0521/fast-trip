"use client";

import GoogleMapProvider from "@/app/context/GoogleMapProvider";
import { LatLng } from "@/service/google/geocode-dto";
import { differenceInDays } from "date-fns";
import { useState } from "react";
import GoogleMapComponent from "../map/google-map";
import PlanDayFilterButtons from "../plan/plan-day-filter-button-list";
import PlanInfo from "../plan/plan-info";
import TripScheduleDisplay from "./trip-schedule-display";
import { MarkersByDay } from "./type";

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
    <GoogleMapProvider>
      <div className="flex h-[calc(100vh-80px)]">
        <aside className="flex flex-col w-[375px] min-w-[375px] h-full bg-white shadow-md z-999 overflow-y-auto max-md:w-full max-md:min-w-unset max-md:max-w-unset">
          <header className="flex flex-col py-8 bg-white">
            <div className="px-6">
              <PlanInfo
                region={region}
                startDate={startDate}
                endDate={endDate}
                dayText={daysText}
              />
            </div>
          </header>

          <div className="sticky top-0 z-10">
            {/* 모바일 버전 Goolge Map */}
            <div className="w-full h-[200px] px-6 bg-white md:hidden">
              <div className="relative w-full h-full overflow-hidden">
                <GoogleMapComponent center={location} markers={renderMarker} />
              </div>
            </div>
            <PlanDayFilterButtons
              daysCount={daysCount + 1}
              selectedDay={selectedDay}
              onSelectedDay={handleSelectDay}
            />
          </div>
          <div className="px-4">
            <TripScheduleDisplay
              daysCount={daysCount + 1}
              markers={markers}
              selectedDay={selectedDay}
            />
          </div>
        </aside>
        <div className="duration-500 w-full max-md:hidden">
          <div className="h-full">
            <div className="w-full h-full">
              <GoogleMapComponent center={location} markers={renderMarker} />
            </div>
          </div>
        </div>
      </div>
    </GoogleMapProvider>
  );
}
