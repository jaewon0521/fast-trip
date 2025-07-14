"use client";

import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

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

  return isLoaded ? (
    <div className="flex h-full">
      <aside className="flex flex-col w-[375px] min-w-[300px] max-w-[400px] h-full border-r border-gray-200 bg-white shadow-md z-999 overflow-hidden overflow-y-auto">
        <header className="flex flex-col px-6 py-8 border-b border-gray-100 bg-gray-50">
          <h1 className="text-lg font-semibold text-gray-800 mb-4">오사카 여행</h1>
          <span className="text-sm text-gray-600 mb-1">2박 3일</span>
          <span className="text-sm text-gray-600">2025.07.13 ~ 2025.07.15</span>
        </header>
        <section className="px-6 py-4 border-b border-gray-100">
          <div className="text-sm text-gray-600">장소 선택</div>
        </section>
        <nav className="flex-1 px-4 py-2">
          <span>1일차</span>
          <ul className="space-y-4">
            <li>
              <section className="rounded-lg bg-white px-4 py-3 shadow-sm">
                <span className="font-medium text-blue-700">List 1</span>
              </section>
            </li>
            <li>
              <section className="rounded-lg bg-white px-4 py-3 shadow-sm">
                <span className="font-medium text-blue-700">List 2</span>
              </section>
            </li>
            <li>
              <section className="rounded-lg bg-white px-4 py-3 shadow-sm">
                <span className="font-medium text-blue-700">List 3</span>
              </section>
            </li>
            <li>
              <section className="rounded-lg bg-white px-4 py-3 shadow-sm">
                <span className="font-medium text-blue-700">List 4</span>
              </section>
            </li>
            <li>
              <section className="rounded-lg bg-white px-4 py-3 shadow-sm">
                <span className="font-medium text-blue-700">List 5</span>
              </section>
            </li>
          </ul>
          <span>2일차</span>
          <ul className="space-y-4">
            <li>
              <section className="rounded-lg bg-white px-4 py-3 shadow-sm">
                <span className="font-medium text-blue-700">List 1</span>
              </section>
            </li>
            <li>
              <section className="rounded-lg bg-white px-4 py-3 shadow-sm">
                <span className="font-medium text-blue-700">List 2</span>
              </section>
            </li>
            <li>
              <section className="rounded-lg bg-white px-4 py-3 shadow-sm">
                <span className="font-medium text-blue-700">List 3</span>
              </section>
            </li>
            <li>
              <section className="rounded-lg bg-white px-4 py-3 shadow-sm">
                <span className="font-medium text-blue-700">List 4</span>
              </section>
            </li>
            <li>
              <section className="rounded-lg bg-white px-4 py-3 shadow-sm">
                <span className="font-medium text-blue-700">List 5</span>
              </section>
            </li>
          </ul>
          <span>3일차</span>
          <ul className="space-y-4">
            <li>
              <section className="rounded-lg bg-white px-4 py-3 shadow-sm">
                <span className="font-medium text-blue-700">List 1</span>
              </section>
            </li>
            <li>
              <section className="rounded-lg bg-white px-4 py-3 shadow-sm">
                <span className="font-medium text-blue-700">List 2</span>
              </section>
            </li>
            <li>
              <section className="rounded-lg bg-white px-4 py-3 shadow-sm">
                <span className="font-medium text-blue-700">List 3</span>
              </section>
            </li>
            <li>
              <section className="rounded-lg bg-white px-4 py-3 shadow-sm">
                <span className="font-medium text-blue-700">List 4</span>
              </section>
            </li>
            <li>
              <section className="rounded-lg bg-white px-4 py-3 shadow-sm">
                <span className="font-medium text-blue-700">List 5</span>
              </section>
            </li>
          </ul>
        </nav>
      </aside>
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
