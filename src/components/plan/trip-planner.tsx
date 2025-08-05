"use client";

import PlanSidebar from "@/components/plan/plan-sidebar";
import { PlaceResult } from "@/service/google/places-dto";
import { useActionState, useState } from "react";
import { LatLng } from "@/service/google/geocode-dto";
import PlanInfo from "./plan-info";
import { differenceInDays } from "date-fns";
import toast from "react-hot-toast";
import { extractError } from "@/lib/error";
import GoogleMapComponent from "../map/google-map";
import { savePlan } from "@/action/plan/api";

interface TripPlannerProps {
  defaultMarkers?: MarkersByDay;
  region: string;
  places?: PlaceResult[];
  location: LatLng;
  startDate: string;
  endDate: string;
}

export interface MarkersByDay {
  [key: number]: PlaceResult[];
}

export default function TripPlanner({
  defaultMarkers,
  region,
  places = [],
  location,
  startDate,
  endDate,
}: TripPlannerProps) {
  const daysCount = differenceInDays(new Date(endDate), new Date(startDate));
  const [markers, setMarkers] = useState<MarkersByDay>(defaultMarkers || {});
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [state, submit, pending] = useActionState(savePlan, undefined);

  const daysText =
    daysCount === 0 ? "당일치기" : `${daysCount}박 ${daysCount + 1}일`;
  const renderMarker =
    selectedDay !== null
      ? { [selectedDay]: markers[selectedDay] ?? [] }
      : markers;

  const togglePlace = (day: number, place: PlaceResult) => {
    setMarkers((prev) => {
      const newMarkers = { ...prev };
      const dayPlaces = newMarkers[day] || [];
      const placeIndex = dayPlaces.findIndex(
        (p) => p.place_id === place.place_id
      );

      if (placeIndex > -1) {
        // 삭제
        newMarkers[day] = dayPlaces.filter((_, index) => index !== placeIndex);
      } else {
        // 추가
        newMarkers[day] = [...dayPlaces, place];
      }
      return newMarkers;
    });
  };

  const handleSelectDay = (day: number | null) => {
    setSelectedDay(day);
  };

  const onSubmit = async () => {
    try {
      submit({
        places: markers,
        region,
        start_at: startDate,
        end_at: endDate,
      });

      if (state && state.success) {
        toast.success(state.message);
      }
    } catch (e) {
      const error = extractError(e);

      toast.error(error.message);
    }
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
        <PlanSidebar
          places={places}
          daysCount={daysCount + 1}
          markers={markers}
          onTogglePlace={togglePlace}
          selectedDay={selectedDay}
          onSelectedDay={handleSelectDay}
        />
        <div className="p-4">
          <button
            className="w-full mt-10 btn btn-lg bg-blue-500 text-white text-lg rounded-2xl px-10 hover:bg-blue-600"
            disabled={pending}
            onClick={onSubmit}
          >
            저장
          </button>
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
