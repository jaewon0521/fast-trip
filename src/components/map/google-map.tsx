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
import {
  DEFAULT_CENTER,
  DEFAULT_CONTAINER_STYLE,
  DEFAULT_MAP_OPTIONS,
  MARKER_ICON_BASE,
  MARKER_LABEL_BASE,
  MARKERS_DAY_COLORS,
  POLYLINE_OPTIONS_BASE,
} from "@/constants/map-style";

interface GoogleMapComponentProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  className?: string;
  markers: MarkersByDay;
}

export default function GoogleMapComponent({
  center = DEFAULT_CENTER,
  zoom = 10,
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
      mapContainerStyle={DEFAULT_CONTAINER_STYLE}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={DEFAULT_MAP_OPTIONS}
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
                  ...MARKER_ICON_BASE,
                  fillColor: color,
                }}
                label={{
                  ...MARKER_LABEL_BASE,
                  text: String(index + 1),
                }}
                title={`${markerData.name} (${parseInt(dayIndex) + 1}일차 ${
                  index + 1
                }번)`}
              />
            ))}
            <PolylineF
              options={{
                ...POLYLINE_OPTIONS_BASE,
                strokeColor: color,
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
