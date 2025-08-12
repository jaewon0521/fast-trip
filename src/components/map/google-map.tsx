"use client";

import { useGoogleMapAction } from "@/app/context/GoogleMapProvider";
import { PlaceResult } from "@/service/google/places-dto";
import {
  GoogleMap,
  MarkerF,
  PolylineF,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { Fragment } from "react";
import { MarkersByDay } from "../trip/type";
import GoogleMapError from "./google-map-error";
import GoogleMapLoading from "./google-map-loading";

interface GoogleMapComponentProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  containerStyle?: React.CSSProperties;
  options?: google.maps.MapOptions;
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

const defaultOptions: google.maps.MapOptions = {
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
  zoom = 10,
  containerStyle = defaultContainerStyle,
  options = defaultOptions,
  markers = {},
}: GoogleMapComponentProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    language: "ko",
  });
  const { initMap, clearMap } = useGoogleMapAction();

  const onLoad = (mapInstance: google.maps.Map) => {
    initMap(mapInstance);
  };

  const onUnmount = () => {
    clearMap();
  };

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
      {Object.entries(markers).map(([dayIndex, dayMarkers]) => {
        const color =
          MARKERS_DAY_COLORS[parseInt(dayIndex) % MARKERS_DAY_COLORS.length];
        return (
          <Fragment key={`${dayIndex}-1일차`}>
            {dayMarkers?.map((markerData: PlaceResult, index: number) => (
              <MarkerF
                key={`${markerData.place_id}-${index}`}
                position={{
                  lat: markerData.geometry.location.lat,
                  lng: markerData.geometry.location.lng,
                }}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: color,
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
            ))}
            <PolylineF
              options={{
                strokeColor: color,
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
        );
      })}
    </GoogleMap>
  );
}
