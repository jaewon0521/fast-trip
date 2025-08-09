"use client";

import PlanSidebar from "@/components/plan/plan-sidebar";
import { PlaceResult } from "@/service/google/places-dto";
import { useState } from "react";
import { LatLng } from "@/service/google/geocode-dto";
import { differenceInDays } from "date-fns";
import toast from "react-hot-toast";
import GoogleMapComponent from "../map/google-map";
import { savePlan } from "@/action/plan/api";
import PlanInfo from "../plan/plan-info";
import PlanDayFilterButtons from "../plan/plan-day-filter-button-list";
import PlanScheduleList from "../plan/plan-shcedule-list";
import { useRouter } from "next/navigation";
import { PATH } from "@/constants/path";
import { MarkersByDay } from "./type";

interface TripEditorProps {
  defaultMarkers?: MarkersByDay;
  region: string;
  places?: PlaceResult[];
  location: LatLng;
  startDate: string;
  endDate: string;
}

export default function TripEditor({
  defaultMarkers,
  region,
  places = [],
  location,
  startDate,
  endDate,
}: TripEditorProps) {
  const daysCount = differenceInDays(new Date(endDate), new Date(startDate));
  const [markers, setMarkers] = useState<MarkersByDay>(defaultMarkers || {});
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

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
      const exists = dayPlaces.some((p) => p.place_id === place.place_id);

      newMarkers[day] = exists
        ? dayPlaces.filter((p) => p.place_id !== place.place_id)
        : [...dayPlaces, place];

      return newMarkers;
    });
  };

  const handleSelectDay = (day: number | null) => {
    setSelectedDay(day);
  };

  const onSubmit = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const res = await savePlan({
        places: markers,
        region,
        start_at: startDate,
        end_at: endDate,
      });

      if (res.success) {
        toast.success(res.message);
        router.push(PATH.MY_PLAN);
      } else if (!res.success) {
        toast.error(res.message);
      }
    } finally {
      setIsSaving(false);
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
        <PlanSidebar>
          <PlanDayFilterButtons
            daysCount={daysCount + 1}
            selectedDay={selectedDay}
            onSelectedDay={handleSelectDay}
          />
          <PlanScheduleList
            region={region}
            daysCount={daysCount + 1}
            places={places}
            markers={markers}
            onTogglePlace={togglePlace}
            selectedDay={selectedDay}
          />
        </PlanSidebar>
        <div className="p-4">
          <button
            className="w-full mt-10 btn btn-lg bg-blue-500 text-white text-lg rounded-2xl px-10 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onSubmit}
            disabled={isSaving}
          >
            {isSaving ? "저장 중..." : "저장"}
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
