"use client";

import React, { Fragment, useCallback, useMemo, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  PolylineF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { PlaceResult } from "@/service/google/places-dto";
import { MarkersByDay } from "../plan/trip-planner";
import GoogleMapLoading from "./google-map-loading";
import GoogleMapError from "./google-map-error";

interface GoogleMapComponentProps {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  containerStyle?: React.CSSProperties;
  options?: google.maps.MapOptions;
  children?: React.ReactNode;
  className?: string;
  markers: MarkersByDay;
}

const defaultContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 37.555946,
  lng: 126.972317,
};

const defaultOptions = {
  minZoom: 4,
  maxZoom: 18,
  cameraControl: false,
  zoomControl: false,
  mapTypeControl: false,
  streetViewControl: false,
};

const MARKERS_DAY_COLORS = [
  "#ff6b6b",
  "#4ecdc4",
  "#ffad60",
  "#abc4ff",
  "#a389d4",
];

export default function GoogleMapComponent({
  center = defaultCenter,
  zoom = 13,
  containerStyle = defaultContainerStyle,
  options = defaultOptions,
  markers = [],
  children,
}: GoogleMapComponentProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    language: "ko",
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  const onUnmount = useCallback(function callback(
    mapInstance: google.maps.Map
  ) {
    setMap(null);
  },
  []);

  if (loadError) {
    return <GoogleMapError />;
  }

  if (!isLoaded) {
    return <GoogleMapLoading />;
  }
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={options}
    >
      {Object.entries(markers).map(([dayIndex, dayMarkers]) => (
        <Fragment key={`${dayIndex}-1일차`}>
          {dayMarkers?.map((markerData: PlaceResult, index: number) => (
            <Fragment key={`${markerData.place_id}-${index}`}>
              <MarkerF
                position={{
                  lat: markerData.geometry.location.lat,
                  lng: markerData.geometry.location.lng,
                }}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor:
                    MARKERS_DAY_COLORS[
                      parseInt(dayIndex) % MARKERS_DAY_COLORS.length
                    ],
                  fillOpacity: 1,
                  strokeWeight: 0,
                  scale: 14,
                }}
                label={{
                  text: String(index + 1),
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
                title={`${markerData.name} (${parseInt(dayIndex) + 1}일차 ${
                  index + 1
                }번)`}
              />
              <PolylineF
                options={{
                  strokeColor:
                    MARKERS_DAY_COLORS[
                      parseInt(dayIndex) % MARKERS_DAY_COLORS.length
                    ],
                  strokeOpacity: 0,
                  icons: [
                    {
                      icon: {
                        path: "M 0,-1 0,1",
                        strokeOpacity: 1,
                        scale: 3,
                      },
                      offset: "0",
                      repeat: "20px",
                    },
                  ],
                }}
                path={dayMarkers.map((markerData: PlaceResult) => ({
                  lat: markerData.geometry.location.lat,
                  lng: markerData.geometry.location.lng,
                }))}
              />
            </Fragment>
          ))}
        </Fragment>
      ))}
    </GoogleMap>
  );
}
