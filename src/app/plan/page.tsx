"use client";

import React, { useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import PlanSidebar from "@/components/planSiderbar";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 37.555946,
  lng: 126.972317,
};

const options = {
  minZoom: 4,
  maxZoom: 18,
  cameraControl: false,
  zoomControl: false,
  mapTypeControl: false,
  streetViewControl: false,
};

export default function PlanPage() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    language: "ko",
  });
  const [places, setPlaces] = useState([]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const region = formData.get("region");
    const response = await fetch(`/api/google/places/search?region=${region}`);
    const data = await response.json();

    setPlaces(data.results);
    console.log(data);
  };

  return isLoaded ? (
    <div className="flex h-full">
      <form className="flex flex-col gap-2" method="GET" onSubmit={handleSearch}>
        <button type="submit">검색</button>
      </form>
      <PlanSidebar places={places} />
      <div className="duration-500 w-full">
        <div className="h-full">
          <div className="w-full h-full">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16} options={options}>
              {/* Child components, such as markers, info windows, etc. */}
              <></>
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
