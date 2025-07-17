"use client";

import PlanSidebar from "@/components/plan/plan-sidebar";
import GoogleMapComponent from "@/components/map/google-map";
import { PlaceResult } from "@/service/google/places-dto";
import { Fragment, useState } from "react";
import { LatLng } from "@/service/google/geocode-dto";
import { Marker, MarkerF } from "@react-google-maps/api";

interface TripPlannerProps {
  region: string;
  places: PlaceResult[];
  location: LatLng;
}

interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  type: "restaurant" | "place"; // 장소 타입 구분
  name: string;
}

export default function TripPlanner({
  region,
  places,
  location,
}: TripPlannerProps) {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  return (
    <Fragment>
      <PlanSidebar region={region} places={places} />
      <div className="duration-500 w-full">
        <div className="h-full">
          <div className="w-full h-full">
            <GoogleMapComponent center={location} markers={markers} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
