"use client";

import PlanSidebar from "@/components/plan/plan-sidebar";
import GoogleMapComponent from "@/components/map/google-map";
import { PlaceResult } from "@/service/google/places-dto";
import { Fragment, useState } from "react";
import { LatLng } from "@/service/google/geocode-dto";
import PlanInfo from "./plan-info";
import { addDays, differenceInDays } from "date-fns";

interface TripPlannerProps {
  region: string;
  places: PlaceResult[];
  location: LatLng;
}

export default function TripPlanner({
  region,
  places,
  location,
}: TripPlannerProps) {
  const [days] = useState<[Date, Date]>([new Date(), addDays(new Date(), 3)]);
  const [markers, setMarkers] = useState<PlaceResult[][]>([]);
  const daysCount = differenceInDays(days[1], days[0]) + 1;
  const daysText =
    daysCount === 1 ? "당일치기" : `${daysCount - 1}박${daysCount}일`;

  const togglePlace = (day: number, place: PlaceResult) => {
    setMarkers((prev) => {
      const newMarkers = [...prev];
      const dayPlaces = newMarkers[day] || [];
      const placeIndex = dayPlaces.findIndex(
        (p) => p.place_id === place.place_id
      );

      if (placeIndex > -1) {
        newMarkers[day] = dayPlaces.filter((_, index) => index !== placeIndex);
      } else {
        newMarkers[day] = [...dayPlaces, place];
      }
      return newMarkers;
    });
  };

  return (
    <div className="flex h-full">
      <aside className="flex flex-col w-[375px] min-w-[375px] max-w-[375px] h-full border-r border-gray-200 bg-white shadow-md z-999 overflow-hidden overflow-y-auto">
        <PlanInfo region={region} days={days} dayText={daysText} />
        <PlanSidebar
          places={places}
          daysCount={daysCount}
          markers={markers}
          onTogglePlace={togglePlace}
        />
      </aside>
      <div className="duration-500 w-full">
        <div className="h-full">
          <div className="w-full h-full">
            <GoogleMapComponent center={location} markers={markers.flat()} />
          </div>
        </div>
      </div>
    </div>
  );
}
